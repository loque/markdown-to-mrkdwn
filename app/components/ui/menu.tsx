import { cn } from "~/lib/utils";

export function MenuContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menu-container"
      className={cn("p-4 flex flex-col gap-12", className)}
      {...props}
    />
  );
}

export function MenuSection({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menu-section"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

export function MenuSectionTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="menu-section-title"
      className={cn("text-sm font-semibold pb-2", className)}
      {...props}
    />
  );
}

export function MenuSectionDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="menu-section-description"
      className={cn("text-xs text-muted-foreground pb-6", className)}
      {...props}
    />
  );
}
