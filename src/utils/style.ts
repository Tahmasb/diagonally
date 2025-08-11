import { twMerge } from "tailwind-merge";

function cn(...classes: string[]): string {
  return twMerge(classes.join(" "));
}

export { cn };
