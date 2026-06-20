export type F1Driver = {
  id: string;
  name: string;
  code: string;
  position: number;
  points: number;
  team: string;
};

export type F1Constructor = {
  id: string;
  name: string;
  position: number;
  points: number;
};

export type F1Standings = {
  season: string;
  round: string;
  drivers: F1Driver[];
  constructors: F1Constructor[];
};

type ErgastDriverStanding = {
  position: string;
  points: string;
  Driver: { driverId: string; code: string; givenName: string; familyName: string };
  Constructors: { name: string }[];
};

type ErgastConstructorStanding = {
  position: string;
  points: string;
  Constructor: { constructorId: string; name: string };
};

type ErgastStandingsResponse = {
  MRData: {
    StandingsTable: {
      StandingsLists: {
        season: string;
        round: string;
        DriverStandings?: ErgastDriverStanding[];
        ConstructorStandings?: ErgastConstructorStanding[];
      }[];
    };
  };
};

const TRACKED_DRIVER_IDS = ["hamilton", "leclerc", "sainz"];
const TRACKED_CONSTRUCTOR_IDS = ["ferrari", "williams"];

export async function fetchF1Standings(): Promise<F1Standings> {
  const [driverRes, constructorRes] = await Promise.all([
    fetch("https://api.jolpi.ca/ergast/f1/current/driverStandings.json"),
    fetch("https://api.jolpi.ca/ergast/f1/current/constructorStandings.json"),
  ]);

  if (!driverRes.ok || !constructorRes.ok) {
    throw new Error("F1 standings request failed");
  }

  const driverJson: ErgastStandingsResponse = await driverRes.json();
  const constructorJson: ErgastStandingsResponse = await constructorRes.json();

  const driverList = driverJson.MRData.StandingsTable.StandingsLists[0];
  const constructorList = constructorJson.MRData.StandingsTable.StandingsLists[0];

  const drivers: F1Driver[] = (driverList.DriverStandings ?? [])
    .filter((s) => TRACKED_DRIVER_IDS.includes(s.Driver.driverId))
    .map((s) => ({
      id: s.Driver.driverId,
      name: `${s.Driver.givenName} ${s.Driver.familyName}`,
      code: s.Driver.code,
      position: Number(s.position),
      points: Number(s.points),
      team: s.Constructors[0].name,
    }))
    .sort((a, b) => a.position - b.position);

  const constructors: F1Constructor[] = (constructorList.ConstructorStandings ?? [])
    .filter((s) => TRACKED_CONSTRUCTOR_IDS.includes(s.Constructor.constructorId))
    .map((s) => ({
      id: s.Constructor.constructorId,
      name: s.Constructor.name,
      position: Number(s.position),
      points: Number(s.points),
    }))
    .sort((a, b) => a.position - b.position);

  return {
    season: driverList.season,
    round: driverList.round,
    drivers,
    constructors,
  };
}

export type F1RaceLocation = {
  raceName: string;
  locality: string;
  country: string;
};

export type F1LastRace = F1RaceLocation & {
  podium: { position: number; code: string; name: string; time: string }[];
};

export type F1NextRace = F1RaceLocation & {
  date: string;
};

type ErgastResult = {
  position: string;
  status: string;
  Driver: { code: string; givenName: string; familyName: string };
  Time?: { time: string };
};

type ErgastRace = {
  raceName: string;
  date: string;
  Circuit: { Location: { locality: string; country: string } };
  Results?: ErgastResult[];
};

type ErgastRaceResponse = {
  MRData: { RaceTable: { Races: ErgastRace[] } };
};

export async function fetchF1LastRace(): Promise<F1LastRace> {
  const res = await fetch("https://api.jolpi.ca/ergast/f1/current/last/results.json");
  if (!res.ok) throw new Error("F1 last race request failed");

  const json: ErgastRaceResponse = await res.json();
  const race = json.MRData.RaceTable.Races[0];

  const podium = (race.Results ?? [])
    .slice(0, 3)
    .map((r) => ({
      position: Number(r.position),
      code: r.Driver.code,
      name: `${r.Driver.givenName} ${r.Driver.familyName}`,
      time: r.Time?.time ?? r.status,
    }));

  return {
    raceName: race.raceName,
    locality: race.Circuit.Location.locality,
    country: race.Circuit.Location.country,
    podium,
  };
}

export async function fetchF1NextRace(): Promise<F1NextRace> {
  const res = await fetch("https://api.jolpi.ca/ergast/f1/current/next.json");
  if (!res.ok) throw new Error("F1 next race request failed");

  const json: ErgastRaceResponse = await res.json();
  const race = json.MRData.RaceTable.Races[0];

  return {
    raceName: race.raceName,
    locality: race.Circuit.Location.locality,
    country: race.Circuit.Location.country,
    date: race.date,
  };
}

export type TeamRecord = {
  id: string;
  displayName: string;
  standingSummary?: string;
  overallSummary?: string;
  winPercent?: number;
  streak?: number;
  nextEvent?: { name: string; date: string };
};

type EspnStat = { name: string; value: number };
type EspnRecordItem = { type: string; summary: string; stats: EspnStat[] };
type EspnTeamResponse = {
  team: {
    id: string;
    displayName: string;
    standingSummary?: string;
    record?: { items?: EspnRecordItem[] };
    nextEvent?: { name: string; date: string }[];
  };
};

export async function fetchTeamRecord(
  sport: "basketball" | "football",
  league: "nba" | "nfl",
  slug: string
): Promise<TeamRecord> {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams/${slug}`
  );

  if (!res.ok) {
    throw new Error(`Team record request failed for ${slug}`);
  }

  const json: EspnTeamResponse = await res.json();
  const team = json.team;

  const overall = team.record?.items?.find((item) => item.type === "total");
  const winPercentStat = overall?.stats?.find((s) => s.name === "winPercent");
  const streakStat = overall?.stats?.find((s) => s.name === "streak");
  const nextEvent = team.nextEvent?.[0];

  return {
    id: team.id,
    displayName: team.displayName,
    standingSummary: team.standingSummary,
    overallSummary: overall?.summary,
    winPercent: winPercentStat?.value,
    streak: streakStat?.value,
    nextEvent: nextEvent ? { name: nextEvent.name, date: nextEvent.date } : undefined,
  };
}

export type LastGame = {
  opponent: string;
  isHome: boolean;
  result: "W" | "L";
  teamScore: string;
  opponentScore: string;
  date: string;
};

type EspnCompetitor = {
  homeAway: "home" | "away";
  winner?: boolean;
  team: { id: string; displayName: string };
  score?: { displayValue: string };
};

type EspnEvent = {
  date: string;
  competitions: {
    status: { type: { completed: boolean } };
    competitors: EspnCompetitor[];
  }[];
};

type EspnScheduleResponse = {
  events?: EspnEvent[];
};

async function fetchSchedule(
  sport: "basketball" | "football",
  league: "nba" | "nfl",
  slug: string,
  seasonParam?: number
): Promise<EspnEvent[]> {
  const url = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams/${slug}/schedule${
    seasonParam ? `?season=${seasonParam}` : ""
  }`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json: EspnScheduleResponse = await res.json();
  return json.events ?? [];
}

export async function fetchLastGame(
  sport: "basketball" | "football",
  league: "nba" | "nfl",
  slug: string,
  teamId: string
): Promise<LastGame | null> {
  const year = new Date().getFullYear();
  const attempts = [undefined, year, year - 1];

  let completed: EspnEvent[] = [];
  for (const seasonParam of attempts) {
    const events = await fetchSchedule(sport, league, slug, seasonParam);
    completed = events.filter((e) => e.competitions[0]?.status.type.completed);
    if (completed.length > 0) break;
  }

  const last = completed[completed.length - 1];
  if (!last) return null;

  const competitors = last.competitions[0].competitors;
  const us = competitors.find((c) => c.team.id === teamId);
  const them = competitors.find((c) => c.team.id !== teamId);
  if (!us || !them) return null;

  return {
    opponent: them.team.displayName,
    isHome: us.homeAway === "home",
    result: us.winner ? "W" : "L",
    teamScore: us.score?.displayValue ?? "",
    opponentScore: them.score?.displayValue ?? "",
    date: last.date,
  };
}
