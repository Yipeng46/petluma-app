import Link from "next/link";

type TermsConfirmationFieldProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const legalLinkClass =
  "text-[#4a433b] underline decoration-[#C8A97E]/40 underline-offset-2 transition-colors hover:text-[#111827]";

export function TermsConfirmationField({
  checked,
  onChange,
}: TermsConfirmationFieldProps) {
  return (
    <div className="mt-5 rounded-2xl border border-[#E6DED2]/80 bg-[#FFFDF8]/70 px-4 py-4">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#C8A97E]/45 text-[#111827] focus:ring-[#C8A97E]/30"
        />
        <span className="text-sm leading-relaxed text-[#6E6A64]">
          <span className="block font-medium text-[#4a433b]">I confirm that:</span>
          <ul className="mt-2 list-none space-y-1.5">
            <li>• I own or have permission to use any images I upload.</li>
            <li>• The information provided is accurate to the best of my knowledge.</li>
            <li>
              • I have read and agree to the{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className={legalLinkClass}
                onClick={(event) => event.stopPropagation()}
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={legalLinkClass}
                onClick={(event) => event.stopPropagation()}
              >
                Privacy Policy
              </Link>
              .
            </li>
          </ul>
        </span>
      </label>
    </div>
  );
}
