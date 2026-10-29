import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

type BrowserProps = {
  image: ProjectImage;
  /** Tall capture of the page; scrolls through the viewport while the parent `.group` is hovered. */
  scroll?: ProjectImage;
  url?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** A dark browser window around a desktop screenshot. */
export function BrowserFrame({ image, scroll, url, sizes, priority, className = "" }: BrowserProps) {
  return (
    <div className={`overflow-hidden rounded-[10px] border border-white/[0.12] bg-[#111] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ${className}`}>
      <div className="flex h-7 items-center gap-3 border-b border-white/[0.08] bg-[#161616] px-3 sm:h-8" aria-hidden>
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        {url && (
          <span className="mx-auto flex min-w-0 items-center gap-1.5 truncate rounded-full bg-white/[0.06] px-3 py-0.5 text-[0.62rem] text-white/45 sm:text-[0.68rem]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3ddc84]" />
            <span className="truncate">{hostOf(url)}</span>
          </span>
        )}
        {url && <span className="w-[2.6rem]" />}
      </div>
      <div className="shot-viewport bg-ink-3 relative aspect-[16/10] overflow-hidden">
        {scroll ? (
          <Image
            src={scroll.src}
            alt={image.alt}
            width={scroll.width}
            height={scroll.height}
            sizes={sizes}
            priority={priority}
            className="shot-scroll absolute inset-x-0 top-0 h-auto w-full"
          />
        ) : (
          <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        )}
      </div>
    </div>
  );
}

/** A phone around a mobile screenshot. */
export function PhoneFrame({ image, sizes, className = "" }: { image: ProjectImage; sizes: string; className?: string }) {
  return (
    <div className={className}>
      {/* Percentage padding resolves against the wrapper's width, so the bezel scales with the phone */}
      <div className="rounded-[16%/7.5%] border border-white/[0.16] bg-[#0c0c0c] p-[4%] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.95)]">
        <div className="relative aspect-[585/1266] overflow-hidden rounded-[13%/6%] bg-ink-3">
          <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover object-top" />
          <span className="absolute top-[1.6%] left-1/2 h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden />
        </div>
      </div>
    </div>
  );
}
