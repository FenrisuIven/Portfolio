import { Input as HeadlessInput } from "@headlessui/react"
import clsx from "clsx"
import { InputHTMLAttributes } from "react"

export const SubmitInput = ({
  type,
  name,
  variant
}: InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary" | "secondary" | "outline"
}) => {
  if (variant == null || variant.length === 0) variant = "primary";

  return <>
    <span className={clsx(
      "flex flex-1 justify-items-stretch w-min rounded-xl transition-all",
      variant === "primary" && [
        "bg-p-100 font-medium text-p-700",
        "border-solid border-3 border-t-p-50 border-l-p-50 border-r-p-300 border-b-p-300",
        "hover:bg-p-200 hover:border-r-p-400 hover:border-b-p-400 hover:text-p-800",
        ""
      ],
    )}>
      <HeadlessInput type={type} name={name} className={clsx(
        "px-4 py-2"
      )} />
    </span>
  </>
}
