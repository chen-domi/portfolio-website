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

export type TeamRecord = {
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
    displayName: team.displayName,
    standingSummary: team.standingSummary,
    overallSummary: overall?.summary,
    winPercent: winPercentStat?.value,
    streak: streakStat?.value,
    nextEvent: nextEvent ? { name: nextEvent.name, date: nextEvent.date } : undefined,
  };
}
