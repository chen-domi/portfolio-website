import Masthead from "@/components/Masthead";
import MetaLine from "@/components/MetaLine";
import Abstract from "@/components/Abstract";
import SectionHeading from "@/components/SectionHeading";
import AboutSection from "@/components/AboutSection";
import BuiltEntryCard from "@/components/BuiltEntryCard";
import CurrentEntryCard from "@/components/CurrentEntryCard";
import SkillsGrid from "@/components/SkillsGrid";
import ReadingTable from "@/components/ReadingTable";
import Footer from "@/components/Footer";
import { builtEntries, currentEntry, skills, reading } from "@/lib/data";

export default function Home() {
  return (
    <main className="max-w-190 mx-auto px-9 py-16 pb-24">
      <Masthead />
      <MetaLine />
      <Abstract />

      <SectionHeading numeral="I">About</SectionHeading>
      <AboutSection />

      <SectionHeading numeral="II">Built</SectionHeading>
      {builtEntries.map((entry) => (
        <BuiltEntryCard key={entry.title} entry={entry} />
      ))}

      <SectionHeading numeral="III">Building</SectionHeading>
      <CurrentEntryCard
        title={currentEntry.title}
        tools={currentEntry.tools}
        body={currentEntry.body}
      />

      <SectionHeading numeral="IV">Skills</SectionHeading>
      <SkillsGrid skills={skills} />

      <SectionHeading numeral="V">Reading</SectionHeading>
      <ReadingTable items={reading} />

      <Footer />
    </main>
  );
}
