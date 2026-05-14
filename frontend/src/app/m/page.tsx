import { MobileNav } from "@/components/mobile/MobileNav";
import { MobileHero } from "@/components/mobile/MobileHero";
import { MobileStory } from "@/components/mobile/MobileStory";
import { MobileProjects } from "@/components/mobile/MobileProjects";
import { MobileExperience } from "@/components/mobile/MobileExperience";
import { MobileSkills } from "@/components/mobile/MobileSkills";
import { MobileContact } from "@/components/mobile/MobileContact";

export default function MobilePage() {
  return (
    <>
      <MobileNav />
      <main className="relative z-10">
        <MobileHero />
        <MobileStory />
        <MobileProjects />
        <MobileExperience />
        <MobileSkills />
        <MobileContact />
      </main>
    </>
  );
}
