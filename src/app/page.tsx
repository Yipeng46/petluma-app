import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { RecentlyRegisteredSection } from "@/components/home/RecentlyRegisteredSection";
import { SiteHeader } from "@/components/home/SiteHeader";
import { fetchCommunityRegistryHallRecords } from "@/lib/community-registry-server";

const RECENTLY_REGISTERED_LIMIT = 6;

export default async function HomePage() {
  const communityRecords = await fetchCommunityRegistryHallRecords();
  const recentlyRegistered = communityRecords.slice(0, RECENTLY_REGISTERED_LIMIT);

  return (
    <div className="registry-home min-h-screen font-sans antialiased">
      <SiteHeader />

      <main className="relative text-[#2e2820]">
        <HeroSection />
        <RecentlyRegisteredSection records={recentlyRegistered} />
        <FinalCtaSection />
      </main>

      <HomeFooter />
    </div>
  );
}
