import { NextResponse } from "next/server";
import { getRandomPublicCompanion } from "@/lib/random-companions";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const exclude = new URL(request.url).searchParams.get("exclude")?.trim() ?? "";
  const randomCompanion = await getRandomPublicCompanion(exclude || undefined);

  if (!randomCompanion) {
    return NextResponse.redirect(new URL("/hall", request.url));
  }

  return NextResponse.redirect(
    new URL(`/companion/${encodeURIComponent(randomCompanion.companionId)}`, request.url),
  );
}
