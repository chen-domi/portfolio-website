import Masthead from "@/components/Masthead";
import MetaLine from "@/components/MetaLine";
import Abstract from "@/components/Abstract";
import AboutSection from "@/components/AboutSection";
import BuiltEntryCard from "@/components/BuiltEntryCard";
import SkillsGrid from "@/components/SkillsGrid";
import InterestsSection from "@/components/InterestsSection";
import SectionNav from "@/components/SectionNav";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import { builtEntries, skills } from "@/lib/data";

export default function Home() {
  return (
    <main className="max-w-190 mx-auto px-9 py-16 pb-24">
      <Masthead />
      <MetaLine />
      <Abstract />

      <SectionNav
        sections={[
          { id: "about", numeral: "I", label: "About" },
          { id: "built", numeral: "II", label: "Built" },
          { id: "skills", numeral: "III", label: "Skills" },
          { id: "interests", numeral: "IV", label: "Interests" },
        ]}
      />

      <section id="about" className="scroll-mt-20 mt-10">
        <SectionHeading numeral="I" label="About" />
        <AboutSection />
      </section>

      <section id="built" className="scroll-mt-20 mt-12">
        <SectionHeading numeral="II" label="Built" />
        {builtEntries.map((entry) => (
          <BuiltEntryCard key={entry.title} entry={entry} />
        ))}
      </section>

      <section id="skills" className="scroll-mt-20 mt-12">
        <SectionHeading numeral="III" label="Skills" />
        <SkillsGrid skills={skills} />
      </section>

      <section id="interests" className="scroll-mt-20 mt-12">
        <SectionHeading numeral="IV" label="Interests" />
        <InterestsSection />
      </section>

      <Footer />
    </main>
  );
}
