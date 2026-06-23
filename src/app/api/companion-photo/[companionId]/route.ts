import { NextResponse } from "next/server";
import { parseInlinePhotoDataUrl } from "@/lib/companion-photo-url";
import { fetchCompanionPhotoUrlByCompanionId } from "@/lib/community-registry-server";

export const runtime = "nodejs";

type CompanionPhotoRouteProps = {
  params: Promise<{ companionId: string }>;
};

export async function GET(_request: Request, { params }: CompanionPhotoRouteProps) {
  const { companionId } = await params;
  const photoUrl = await fetchCompanionPhotoUrlByCompanionId(companionId);

  if (!photoUrl) {
    return new NextResponse(null, { status: 404 });
  }

  const trimmed = photoUrl.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return NextResponse.redirect(trimmed, 307);
  }

  const inlinePhoto = parseInlinePhotoDataUrl(trimmed);

  if (!inlinePhoto) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(inlinePhoto.buffer, {
    headers: {
      "Content-Type": inlinePhoto.contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
