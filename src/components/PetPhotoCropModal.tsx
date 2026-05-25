"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { cropPassportPhoto } from "@/lib/crop-passport-photo";
import { PASSPORT_PHOTO_ASPECT } from "@/lib/passport-photo-frame";

type PetPhotoCropModalProps = {
  imageSrc: string;
  onConfirm: (croppedImageDataUrl: string) => void;
  onCancel: () => void;
};

export function PetPhotoCropModal({
  imageSrc,
  onConfirm,
  onCancel,
}: PetPhotoCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  async function handleConfirm() {
    if (!croppedAreaPixels || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const croppedImageDataUrl = await cropPassportPhoto(
        imageSrc,
        croppedAreaPixels,
      );
      onConfirm(croppedImageDataUrl);
    } catch {
      alert("Could not crop photo. Please try another image.");
      setIsSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#081526]/42 p-0 sm:items-center sm:p-4"
      data-testid="photo-crop-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-crop-title"
    >
      <div className="flex max-h-[100dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.25rem] border border-[#E6DED2] bg-[#FFFDF8] shadow-[0_28px_80px_rgba(8,21,38,0.18)] sm:rounded-[1.25rem]">
        <div className="border-b border-[#E6DED2]/80 px-5 py-4 sm:px-6">
          <p
            id="photo-crop-title"
            className="text-xs font-semibold uppercase tracking-[0.32em] text-[#C8A97E]"
          >
            Crop Passport Photo
          </p>
          <p className="mt-2 text-sm leading-6 text-[#6E6A64]">
            Adjust the frame so your companion&apos;s portrait fits the passport
            identity page.
          </p>
        </div>

        <div className="relative h-[min(52dvh,26rem)] w-full min-h-[14rem] bg-[#111827]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={PASSPORT_PHOTO_ASPECT}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
            showGrid={false}
          />
        </div>

        <div className="border-t border-[#E6DED2]/80 px-5 py-4 sm:px-6">
          <label className="mb-4 block">
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7a6656]">
              Zoom
            </span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="w-full accent-[#111827]"
              aria-label="Photo zoom"
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              data-testid="photo-crop-cancel"
              className="inline-flex items-center justify-center rounded-full border border-[#E6DED2] bg-[#FFFDF8] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#6E6A64] transition hover:border-[#C8A97E]/50 hover:text-[#111827] disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSaving || !croppedAreaPixels}
              data-testid="photo-crop-confirm"
              className="inline-flex items-center justify-center rounded-full border border-[#C8A97E]/35 bg-[#111827] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#FFFDF8] shadow-[0_12px_32px_rgba(17,24,39,0.16)] transition hover:bg-[#1E293B] disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Confirm Crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
