import { NextResponse } from "next/server";
import { savePet, type SupabaseInsertError } from "@/lib/supabase";

export const runtime = "nodejs";

type CreatePetPayload = {
  pet_name?: unknown;
  breed?: unknown;
  photo_url?: unknown;
};

function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function readError(error: unknown): SupabaseInsertError {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return {
      code:
        "code" in error && typeof error.code === "string"
          ? error.code
          : undefined,
      message: error.message,
      details:
        "details" in error && typeof error.details === "string"
          ? error.details
          : null,
      hint:
        "hint" in error && typeof error.hint === "string"
          ? error.hint
          : null,
    };
  }

  return {
    message: "Could not save pet.",
  };
}

export async function POST(request: Request) {
  console.log("[PetLuma] POST /api/pets called", {
    cwd: process.cwd(),
    hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  });

  try {
    const body = (await request.json()) as CreatePetPayload;
    const petName = readText(body.pet_name, 100);
    const breed = readText(body.breed, 100);
    const photoUrl = readText(body.photo_url, 8_000_000);

    console.log("[PetLuma] POST /api/pets request body", {
      pet_name: body.pet_name,
      breed: body.breed,
      photo_url:
        typeof body.photo_url === "string"
          ? {
              length: body.photo_url.length,
              prefix: body.photo_url.slice(0, 80),
            }
          : body.photo_url,
    });

    console.log("[PetLuma] POST /api/pets normalized payload", {
      pet_name: petName,
      breed,
      photo_url: photoUrl
        ? {
            length: photoUrl.length,
            prefix: photoUrl.slice(0, 80),
          }
        : null,
    });

    if (!petName) {
      return NextResponse.json(
        { error: "Pet name is required." },
        { status: 400 },
      );
    }

    const pet = await savePet({
      pet_name: petName,
      breed,
      photo_url: photoUrl || null,
    });

    console.log("[PetLuma] POST /api/pets saved pet", pet);

    return NextResponse.json({ pet }, { status: 201 });
  } catch (error) {
    console.error("[PetLuma] POST /api/pets full error", error);

    const insertError = readError(error);

    return NextResponse.json(
      {
        error: insertError.message,
        details: insertError,
      },
      { status: 500 },
    );
  }
}
