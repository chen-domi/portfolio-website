import Masthead from "@/components/Masthead";
import MetaLine from "@/components/MetaLine";
import Abstract from "@/components/Abstract";
import AboutSection from "@/components/AboutSection";
import BuiltEntryCard from "@/components/BuiltEntryCard";
import SkillsGrid from "@/components/SkillsGrid";
import Tabs from "@/components/Tabs";
import Footer from "@/components/Footer";
import { builtEntries, skills } from "@/lib/data";

export default function Home() {
  return (
    <main className="max-w-190 mx-auto px-9 py-16 pb-24">
      <Masthead />
      <MetaLine />
      <Abstract />

      <Tabs
        tabs={[
          { id: "about", numeral: "I", label: "About", content: <AboutSection /> },
          {
            id: "built",
            numeral: "II",
            label: "Built",
            content: (
              <>
                {builtEntries.map((entry) => (
                  <BuiltEntryCard key={entry.title} entry={entry} />
                ))}
              </>
            ),
          },
          {
            id: "skills",
            numeral: "III",
            label: "Skills",
            content: <SkillsGrid skills={skills} />,
          },
        ]}
      />

      <Footer />
    </main>
  );
}
