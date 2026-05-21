import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/pet-identity";
import { savePet, type SupabaseInsertError } from "@/lib/supabase";

export const runtime = "nodejs";

type CreatePetPayload = {
  owner_email?: unknown;
  pet_name?: unknown;
  species?: unknown;
  date_of_birth?: unknown;
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
    const ownerEmail = readText(body.owner_email, 320);
    const petName = readText(body.pet_name, 100);
    const species = readText(body.species, 100) || "Companion";
    const dateOfBirth = readText(body.date_of_birth, 10);
    const breed = readText(body.breed, 100);
    const photoUrl = readText(body.photo_url, 8_000_000);

    console.log("[PetLuma] POST /api/pets normalized payload", {
      owner_email: ownerEmail,
      pet_name: petName,
      species,
      date_of_birth: dateOfBirth,
      breed,
      photo_url: photoUrl
        ? {
            length: photoUrl.length,
            prefix: photoUrl.slice(0, 80),
          }
        : null,
    });

    if (!ownerEmail || !isValidEmail(ownerEmail)) {
      return NextResponse.json(
        { error: "A valid owner email is required." },
        { status: 400 },
      );
    }

    if (!petName) {
      return NextResponse.json(
        { error: "Pet name is required." },
        { status: 400 },
      );
    }

    const result = await savePet({
      owner_email: ownerEmail,
      pet_name: petName,
      species,
      date_of_birth: dateOfBirth,
      breed,
      photo_url: photoUrl || null,
    });

    console.log("[PetLuma] POST /api/pets result", {
      duplicate: result.duplicate,
      companion_id: result.pet.companion_id,
    });

    return NextResponse.json(
      {
        pet: result.pet,
        duplicate: result.duplicate,
        message: result.message,
      },
      { status: result.duplicate ? 200 : 201 },
    );
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
