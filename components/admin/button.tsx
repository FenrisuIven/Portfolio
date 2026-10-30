import { ComponentProps } from "react";
import clsx from "clsx";

import { Slot } from "../slot";

export default function Button({
  children,
  asChild,
  variant,
  ...props
}: ComponentProps<"button"> & {
  asChild?: boolean,
  variant?: "primary" | "secondary" | "outline",
}) {
  const Component = asChild ? Slot : "button";

  return (<Component
    {...props}
    className={clsx(
      "py-1 px-4 rounded-md transition-all",
      variant == "primary" && "bg-p-200 text-p-800 hover:bg-p-400",
      variant == "secondary" && "bg-s-200 text-s-800 hover:bg-s-400 hover:text-s-950",
      variant == "outline" && "border-1 border-p-700 text-p-700 bg-p-50 hover:bg-p-200 hover:text-p-900 hover:border-p-900",
      props.className
    )}
  >
    {children}
  </Component>);
}
