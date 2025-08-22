import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "~/lib/utils";

export function RadioCardGroup<T extends string>({
  className,
  value,
  onValueChange,
  ...props
}: Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>,
  "value" | "onValueChange"
> & {
  value?: T;
  onValueChange?: (value: T) => void;
}) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-card-group"
      className={cn("max-w-sm w-full flex justify-around gap-3", className)}
      value={value}
      onValueChange={onValueChange}
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
        "flex flex-col items-center gap-2 text-xs rounded cursor-pointer",
        "w-[6rem] py-3 px-4",
        "hover:bg-foreground/2",
        "ring-[1px] ring-transparent data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500",
        "[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}
