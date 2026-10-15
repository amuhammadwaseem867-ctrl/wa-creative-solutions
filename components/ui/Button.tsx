import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  magnetic?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children">;

/** Internal routes use next/link; external or mailto/tel links use <a>. */
export function ButtonLink({ href, children, variant = "primary", icon = true, magnetic = false, className = "", ...rest }: ButtonLinkProps) {
  const cls = `btn btn-${variant} ${className}`;
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight aria-hidden size={16} strokeWidth={2} />}
    </>
  );
  const el = external ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
