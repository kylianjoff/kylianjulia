import { cn } from "@/lib/utils";

export interface TimelineItem {
  title: string;
  subtitle?: string;
  period: string;
  tags?: string[];
  description?: string;
  details?: string[];
  link?: { label: string; href: string };
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  /** offset from top for sticky (should match header height, default 96px) */
  stickyTop?: string;
}

function formatPeriod(period: string) {
  // Split "09/2024 - En cours" into two lines
  const parts = period.split(" - ");
  if (parts.length === 2) {
    return (
      <>
        <span className="block">{parts[0]}</span>
        <span className="block">{parts[1]}</span>
      </>
    );
  }
  return <span>{period}</span>;
}

export function Timeline({ items, className, stickyTop = "6rem" }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Single continuous vertical line spanning ALL items */}
      {/* Mobile: left = half of w-6 = 0.75rem | sm+: left = w-36 + half w-6 = 9.75rem */}
      <div className="absolute top-0 bottom-0 w-px bg-border left-3 sm:left-[9.75rem]" />

      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex pb-24 last:pb-0"
        >
          {/* Left: period — sticky */}
          <div
            className="hidden sm:block w-36 shrink-0 text-right pr-6 pt-0.5"
            style={{ position: "sticky", top: stickyTop, alignSelf: "flex-start" }}
          >
            <span className="text-sm font-medium text-muted-foreground leading-relaxed">
              {formatPeriod(item.period)}
            </span>
          </div>

          {/* Center: dot only — line is on the wrapper above */}
          <div className="w-6 shrink-0">
            {/* Sticky centering wrapper */}
            <div
              className="flex justify-center"
              style={{ position: "sticky", top: stickyTop }}
            >
              <div className="z-10 flex size-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                <div className="size-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="flex-1 pl-8 pb-2">
            {/* Period (mobile only) */}
            <p className="sm:hidden text-xs font-medium text-muted-foreground mb-2">
              {item.period}
            </p>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground leading-snug">
              {item.title}
            </h3>

            {/* Subtitle */}
            {item.subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {item.description && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Details list */}
            {item.details && item.details.length > 0 && (
              <ul className="mt-3 flex flex-col gap-2">
                {item.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}

            {/* Link */}
            {item.link && (
              <a
                href={item.link.href}
                className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {item.link.label}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
