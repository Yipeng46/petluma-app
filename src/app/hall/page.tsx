import { RegistryHallArchives } from "@/components/registry-hall/RegistryHallArchives";
import { fetchCommunityRegistryHallRecords } from "@/lib/community-registry-server";
import "@/styles/registry-hall.css";

export default async function RegistryHallPage() {
  const communityRecords = await fetchCommunityRegistryHallRecords();

  return <RegistryHallArchives communityRecords={communityRecords} />;
}
