import { cn } from "@/lib/utils";

/**
 * Consorcio Kick brand artwork.
 *
 * Each piece ships in two cuts: the original navy/black artwork for
 * light surfaces, and a reversed cut (lightened blue, white wordmark)
 * for dark ones. That is a legibility requirement, not a preference —
 * the brand navy #004A87 clears only ~1.9:1 against the dark sidebar,
 * well under the 4.5:1 floor, while the reversed blue clears ~4.7:1.
 *
 * Both cuts are rendered and CSS hides the one that doesn't apply.
 * Picking in JS instead would flash the wrong cut on first paint,
 * because the mode is replayed from localStorage by the boot script
 * in `src/app/layout.tsx`. The swap itself is the `[data-brand-logo]`
 * block in `globals.css` — it keys off `html[data-mode]`, which the
 * `dark:` Tailwind variant (bound to a `.dark` class) can't reach.
 *
 * Both images are decorative; callers own the accessible name (the
 * sidebar puts it on the wrapping link).
 */

// Intrinsic pixel sizes of the source artwork, used for the aspect
// ratio so the row doesn't reflow while the PNG loads.
const LOGO = { src: "/brand/consorcio-kick-logo", w: 360, h: 123 };
const MARK = { src: "/brand/consorcio-kick-mark", w: 186, h: 123 };

interface BrandArtProps {
  /** Tailwind sizing for the artwork. Set a height; width follows. */
  className?: string;
}

function Pair({
  art,
  className,
}: BrandArtProps & { art: typeof LOGO }) {
  const shared = cn("w-auto max-w-full object-contain", className);
  // Plain <img>: these are ~8 KB static PNGs that render at a fixed
  // small size, so the next/image optimizer would add a request hop
  // and a build-time dependency for no gain.
  /* eslint-disable @next/next/no-img-element */
  return (
    <>
      <img
        src={`${art.src}.png`}
        alt=""
        aria-hidden
        width={art.w}
        height={art.h}
        decoding="async"
        data-brand-logo="light"
        className={shared}
      />
      <img
        src={`${art.src}-dark.png`}
        alt=""
        aria-hidden
        width={art.w}
        height={art.h}
        decoding="async"
        data-brand-logo="dark"
        className={shared}
      />
    </>
  );
  /* eslint-enable @next/next/no-img-element */
}

/** Full lockup: the "CK" mark plus the CONSORCIO KICK wordmark. */
export function BrandLogo({ className = "h-8" }: BrandArtProps) {
  return <Pair art={LOGO} className={className} />;
}

/** The "CK" mark alone — for square or compact slots where the
 *  wordmark would be too small to read. */
export function BrandMark({ className = "h-8" }: BrandArtProps) {
  return <Pair art={MARK} className={className} />;
}
