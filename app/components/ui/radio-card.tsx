import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "~/lib/utils";

export function RadioCardGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-card-group"
      className={cn("max-w-sm w-full grid grid-cols-3 gap-3", className)}
      {...props}
    />
  );
}

export function RadioCardItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-card-item"
      className={cn(
        "flex flex-col items-center gap-1 py-1 px-3 text-xs rounded",
        "ring-[1px] ring-border data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500",
        "[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}
