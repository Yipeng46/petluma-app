"use client";

import { forwardRef, useEffect, useState } from "react";
import { getPassportDisplay } from "@/lib/passport-display";
import type { PassportData } from "@/lib/passport-data";
import { resolveImageDataUrl } from "@/lib/resolve-image-data-url";
import { wrapSvgText } from "@/lib/svg-text-wrap";

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 620;
const FRAME_PAD = 24;
const COVER_WIDTH = 392;
const COVER_X = FRAME_PAD;
const COVER_Y = FRAME_PAD;
const COVER_HEIGHT = SVG_HEIGHT - FRAME_PAD * 2;
const IDENTITY_X = COVER_X + COVER_WIDTH;
const IDENTITY_Y = FRAME_PAD;
const IDENTITY_WIDTH = SVG_WIDTH - FRAME_PAD - IDENTITY_X;
const IDENTITY_HEIGHT = COVER_HEIGHT;
const FIELD_COLUMN_GAP = 24;
const FIELD_COLUMN_WIDTH = 240;

const KINGDOM_EMBLEM_SRC = "/petluma-kingdom-gate-emblem.png";
const VALUE_FONT_FAMILY = "Cormorant Garamond, Georgia, serif";
const LABEL_FONT_FAMILY = "Inter, Arial, sans-serif";

type PassportSVGProps = {
  passportData: PassportData;
};

type FieldProps = {
  x: number;
  y: number;
  width: number;
  label: string;
  value: string;
  large?: boolean;
  official?: boolean;
  wrapValue?: boolean;
};

function Field({
  x,
  y,
  width,
  label,
  value,
  large = false,
  official = false,
  wrapValue = false,
}: FieldProps) {
  const labelSize = official ? 8 : 8.5;
  const valueSize = large ? 34 : official ? 13 : 14;
  const valueY = y + (large ? 38 : 22);
  const displayValue = large ? value : value.toUpperCase();
  const valueLines = wrapValue
    ? wrapSvgText(displayValue, width, valueSize, VALUE_FONT_FAMILY, large ? 700 : 600)
    : [displayValue];
  const lineHeight = valueSize * 1.38;
  const valueBlockHeight = valueLines.length * lineHeight;
  const underlineY = valueY + valueBlockHeight - lineHeight + 10;

  return (
    <g>
      <text
        x={x}
        y={y}
        fill="rgba(43, 36, 32, 0.48)"
        fontFamily={LABEL_FONT_FAMILY}
        fontSize={labelSize}
        fontWeight={600}
        letterSpacing="2.2"
      >
        {label.toUpperCase()}
      </text>
      <text
        x={x}
        y={valueY}
        fill="rgba(43, 36, 32, 0.93)"
        fontFamily={VALUE_FONT_FAMILY}
        fontSize={valueSize}
        fontWeight={large ? 700 : 600}
        letterSpacing={large ? 0.5 : 1}
      >
        {valueLines.map((line, index) => (
          <tspan key={`${label}-${index}`} x={x} dy={index === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
      {!large ? (
        <line
          x1={x}
          y1={underlineY}
          x2={x + width}
          y2={underlineY}
          stroke="rgba(43, 36, 32, 0.1)"
          strokeWidth={0.75}
        />
      ) : null}
    </g>
  );
}

export const PassportSVG = forwardRef<SVGSVGElement, PassportSVGProps>(
  function PassportSVG({ passportData }, ref) {
    const display = getPassportDisplay(passportData);
    const [emblemDataUrl, setEmblemDataUrl] = useState("");
    const [photoDataUrl, setPhotoDataUrl] = useState("");

    useEffect(() => {
      let active = true;

      void resolveImageDataUrl(KINGDOM_EMBLEM_SRC).then((url) => {
        if (active) {
          setEmblemDataUrl(url);
        }
      });

      if (display.photo) {
        void resolveImageDataUrl(display.photo).then((url) => {
          if (active) {
            setPhotoDataUrl(url);
          }
        });
      } else {
        setPhotoDataUrl("");
      }

      return () => {
        active = false;
      };
    }, [display.photo]);

    const photoX = IDENTITY_X + 36;
    const photoY = IDENTITY_Y + 92;
    const photoW = 150;
    const photoH = 194;
    const fieldsX = photoX + photoW + 34;
    const fieldLeftX = fieldsX;
    const fieldRightX = fieldsX + FIELD_COLUMN_WIDTH + FIELD_COLUMN_GAP;
    const fieldLeftWidth = FIELD_COLUMN_WIDTH;
    const fieldRightWidth = FIELD_COLUMN_WIDTH;
    const fieldsW = fieldLeftWidth + FIELD_COLUMN_GAP + fieldRightWidth;

    return (
      <svg
        ref={ref}
        id="petluma-passport-result"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        width="100%"
        role="img"
        aria-label={`PetLuma Passport for ${display.name}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cover-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a1830" />
            <stop offset="44%" stopColor="#08182b" />
            <stop offset="100%" stopColor="#071426" />
          </linearGradient>
          <linearGradient id="identity-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f2eadc" />
            <stop offset="42%" stopColor="#ece3d2" />
            <stop offset="100%" stopColor="#e7decc" />
          </linearGradient>
          <radialGradient id="cover-glow" cx="50%" cy="18%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="identity-glow" cx="18%" cy="8%" r="70%">
            <stop offset="0%" stopColor="rgba(248,241,228,0.35)" />
            <stop offset="100%" stopColor="rgba(248,241,228,0)" />
          </radialGradient>
        </defs>

        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#081526" rx={22} />
        <rect
          x={8}
          y={8}
          width={SVG_WIDTH - 16}
          height={SVG_HEIGHT - 16}
          fill="none"
          stroke="rgba(184,148,77,0.35)"
          strokeWidth={1.5}
          rx={18}
        />

        <g>
          <rect
            x={COVER_X}
            y={COVER_Y}
            width={COVER_WIDTH}
            height={COVER_HEIGHT}
            fill="url(#cover-bg)"
            rx={16}
          />
          <rect
            x={COVER_X}
            y={COVER_Y}
            width={COVER_WIDTH}
            height={COVER_HEIGHT}
            fill="url(#cover-glow)"
            rx={16}
          />
          <rect
            x={COVER_X}
            y={COVER_Y}
            width={3}
            height={COVER_HEIGHT}
            fill="rgba(0,0,0,0.35)"
          />

          <text
            x={COVER_X + COVER_WIDTH / 2}
            y={COVER_Y + 56}
            textAnchor="middle"
            fill="#c9a45c"
            fontFamily="Inter, Arial, sans-serif"
            fontSize={9}
            fontWeight={600}
            letterSpacing="4.5"
          >
            PETLUMA KINGDOM
          </text>
          <text
            x={COVER_X + COVER_WIDTH / 2}
            y={COVER_Y + 108}
            textAnchor="middle"
            fill="#c9a45c"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize={54}
            fontWeight={500}
            letterSpacing="8"
          >
            PETLUMA
          </text>
          <text
            x={COVER_X + COVER_WIDTH / 2}
            y={COVER_Y + 142}
            textAnchor="middle"
            fill="#c9a45c"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize={24}
            fontWeight={500}
            letterSpacing="7"
          >
            PASSPORT
          </text>

          {emblemDataUrl ? (
            <image
              href={emblemDataUrl}
              x={COVER_X + 36}
              y={COVER_Y + 170}
              width={COVER_WIDTH - 72}
              height={COVER_HEIGHT - 250}
              preserveAspectRatio="xMidYMid meet"
            />
          ) : (
            <rect
              x={COVER_X + 72}
              y={COVER_Y + 220}
              width={COVER_WIDTH - 144}
              height={COVER_HEIGHT - 320}
              fill="rgba(201,164,92,0.08)"
              rx={8}
            />
          )}

          <text
            x={COVER_X + COVER_WIDTH / 2}
            y={COVER_Y + COVER_HEIGHT - 48}
            textAnchor="middle"
            fill="#c9a45c"
            fontFamily="Inter, Arial, sans-serif"
            fontSize={9}
            fontWeight={600}
            letterSpacing="3.5"
          >
            OFFICIAL COMPANION DOCUMENT
          </text>
          <text
            x={COVER_X + COVER_WIDTH / 2}
            y={COVER_Y + COVER_HEIGHT - 24}
            textAnchor="middle"
            fill="rgba(143,155,176,0.82)"
            fontFamily="Courier New, monospace"
            fontSize={9}
            letterSpacing="2.5"
          >
            {display.passportNo.toUpperCase()}
          </text>
        </g>

        <g>
          <rect
            x={IDENTITY_X}
            y={IDENTITY_Y}
            width={IDENTITY_WIDTH}
            height={IDENTITY_HEIGHT}
            fill="url(#identity-bg)"
            rx={16}
          />
          <rect
            x={IDENTITY_X}
            y={IDENTITY_Y}
            width={IDENTITY_WIDTH}
            height={IDENTITY_HEIGHT}
            fill="url(#identity-glow)"
            rx={16}
          />

          <text
            x={IDENTITY_X + 36}
            y={IDENTITY_Y + 42}
            fill="rgba(43, 36, 32, 0.48)"
            fontFamily="Inter, Arial, sans-serif"
            fontSize={8.5}
            fontWeight={600}
            letterSpacing="2.4"
          >
            PETLUMA PASSPORT
          </text>
          <text
            x={IDENTITY_X + 36}
            y={IDENTITY_Y + 68}
            fill="rgba(43, 36, 32, 0.93)"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize={24}
            fontWeight={600}
            letterSpacing="2"
          >
            IDENTITY PAGE
          </text>
          <line
            x1={IDENTITY_X + 36}
            y1={IDENTITY_Y + 78}
            x2={IDENTITY_X + IDENTITY_WIDTH - 36}
            y2={IDENTITY_Y + 78}
            stroke="rgba(43, 36, 32, 0.1)"
            strokeWidth={0.75}
          />
          <line
            x1={IDENTITY_X + 36}
            y1={IDENTITY_Y + 78}
            x2={IDENTITY_X + 78}
            y2={IDENTITY_Y + 78}
            stroke="rgba(132, 118, 98, 0.28)"
            strokeWidth={0.75}
          />

          <rect
            x={photoX}
            y={photoY}
            width={photoW}
            height={photoH}
            fill="#ddd3c2"
            stroke="rgba(43, 36, 32, 0.18)"
            strokeWidth={1}
          />
          {photoDataUrl ? (
            <image
              href={photoDataUrl}
              x={photoX + 3}
              y={photoY + 3}
              width={photoW - 6}
              height={photoH - 6}
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <text
              x={photoX + photoW / 2}
              y={photoY + photoH / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(26, 22, 18, 0.2)"
              fontFamily="Inter, Arial, sans-serif"
              fontSize={8}
              letterSpacing="3"
            >
              PORTRAIT
            </text>
          )}

          <rect
            x={photoX - 4}
            y={photoY + photoH + 14}
            width={photoW + 8}
            height={58}
            fill="rgba(236, 227, 210, 0.45)"
            stroke="rgba(43, 36, 32, 0.08)"
            strokeWidth={0.75}
          />
          <text
            x={photoX + photoW / 2}
            y={photoY + photoH + 34}
            textAnchor="middle"
            fill="rgba(43, 36, 32, 0.48)"
            fontFamily="Inter, Arial, sans-serif"
            fontSize={8}
            fontWeight={600}
            letterSpacing="2"
          >
            COMPANION ID
          </text>
          <text
            x={photoX + photoW / 2}
            y={photoY + photoH + 56}
            textAnchor="middle"
            fill="rgba(43, 36, 32, 0.93)"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize={13}
            fontWeight={600}
            letterSpacing="1.5"
          >
            {display.companionId.toUpperCase()}
          </text>

          <Field
            x={fieldsX}
            y={IDENTITY_Y + 92}
            width={fieldsW}
            label="Pet Name"
            value={display.name}
            large
          />
          <Field
            x={fieldLeftX}
            y={IDENTITY_Y + 168}
            width={fieldLeftWidth}
            label="Species"
            value={display.species}
            wrapValue
          />
          <Field
            x={fieldRightX}
            y={IDENTITY_Y + 168}
            width={fieldRightWidth}
            label="Breed"
            value={display.breed}
            wrapValue
          />
          <Field
            x={fieldLeftX}
            y={IDENTITY_Y + 226}
            width={fieldLeftWidth}
            label="Gender"
            value={display.gender}
            wrapValue
          />
          <Field
            x={fieldRightX}
            y={IDENTITY_Y + 226}
            width={fieldRightWidth}
            label="Date of Birth"
            value={display.birthdate}
            wrapValue
          />
          <Field
            x={fieldLeftX}
            y={IDENTITY_Y + 284}
            width={fieldLeftWidth}
            label="Place of Origin"
            value={display.placeOfOrigin}
            wrapValue
          />
          <Field
            x={fieldRightX}
            y={IDENTITY_Y + 284}
            width={fieldRightWidth}
            label="Passport No."
            value={display.passportNo}
            wrapValue
          />
          <Field
            x={fieldLeftX}
            y={IDENTITY_Y + 352}
            width={fieldLeftWidth}
            label="Registry"
            value={display.registry}
            official
            wrapValue
          />
          <Field
            x={fieldRightX}
            y={IDENTITY_Y + 352}
            width={fieldRightWidth}
            label="Classification"
            value={display.classification}
            official
            wrapValue
          />
          <Field
            x={fieldLeftX}
            y={IDENTITY_Y + 422}
            width={fieldLeftWidth}
            label="Issued By"
            value={display.issuedBy}
            official
            wrapValue
          />
          <Field
            x={fieldRightX}
            y={IDENTITY_Y + 422}
            width={fieldRightWidth}
            label="Registered"
            value={display.registered}
            official
            wrapValue
          />

          <line
            x1={fieldsX}
            y1={IDENTITY_Y + IDENTITY_HEIGHT - 118}
            x2={fieldsX + fieldsW - 90}
            y2={IDENTITY_Y + IDENTITY_HEIGHT - 118}
            stroke="rgba(43, 36, 32, 0.1)"
            strokeWidth={0.75}
          />
          <text
            x={fieldsX}
            y={IDENTITY_Y + IDENTITY_HEIGHT - 96}
            fill="rgba(43, 36, 32, 0.48)"
            fontFamily={LABEL_FONT_FAMILY}
            fontSize={8}
            fontWeight={600}
            letterSpacing="2.2"
          >
            NOTES
          </text>
          <text
            x={fieldsX}
            y={IDENTITY_Y + IDENTITY_HEIGHT - 72}
            fill="rgba(43, 36, 32, 0.93)"
            fontFamily={VALUE_FONT_FAMILY}
            fontSize={13}
            fontWeight={600}
            letterSpacing="1"
          >
            <tspan x={fieldsX} dy={0}>
              Officially registered under PetLuma Kingdom.
            </tspan>
          </text>

          <g
            transform={`translate(${IDENTITY_X + IDENTITY_WIDTH - 96}, ${IDENTITY_Y + IDENTITY_HEIGHT - 132}) rotate(-13)`}
            opacity={0.22}
          >
            <circle cx={0} cy={0} r={42} fill="none" stroke="rgba(128,106,68,0.35)" strokeWidth={0.75} />
            <circle cx={0} cy={0} r={34} fill="none" stroke="rgba(128,106,68,0.25)" strokeWidth={0.75} />
            <text
              x={0}
              y={-10}
              textAnchor="middle"
              fill="rgba(128,106,68,0.8)"
              fontFamily="Inter, Arial, sans-serif"
              fontSize={6}
              letterSpacing="1.5"
            >
              REGISTRY
            </text>
            <text
              x={0}
              y={8}
              textAnchor="middle"
              fill="rgba(128,106,68,0.8)"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize={22}
              fontWeight={500}
            >
              PL
            </text>
            <text
              x={0}
              y={24}
              textAnchor="middle"
              fill="rgba(128,106,68,0.8)"
              fontFamily="Inter, Arial, sans-serif"
              fontSize={6}
              letterSpacing="1.5"
            >
              PETLUMA
            </text>
          </g>

          <rect
            x={IDENTITY_X}
            y={IDENTITY_Y + IDENTITY_HEIGHT - 54}
            width={IDENTITY_WIDTH}
            height={54}
            fill="#071426"
            rx={0}
          />
          <text
            x={IDENTITY_X + 36}
            y={IDENTITY_Y + IDENTITY_HEIGHT - 34}
            fill="rgba(198, 190, 172, 0.68)"
            fontFamily="Courier New, monospace"
            fontSize={8.5}
            letterSpacing="0.6"
          >
            {display.mrz.line1}
          </text>
          <text
            x={IDENTITY_X + 36}
            y={IDENTITY_Y + IDENTITY_HEIGHT - 22}
            fill="rgba(198, 190, 172, 0.68)"
            fontFamily="Courier New, monospace"
            fontSize={8.5}
            letterSpacing="0.6"
          >
            {display.mrz.line2}
          </text>
          <text
            x={IDENTITY_X + 36}
            y={IDENTITY_Y + IDENTITY_HEIGHT - 10}
            fill="rgba(198, 190, 172, 0.68)"
            fontFamily="Courier New, monospace"
            fontSize={8.5}
            letterSpacing="0.6"
          >
            {display.mrz.line3}
          </text>
        </g>
      </svg>
    );
  },
);
