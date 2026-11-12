import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { Field, Input as HeadlessInput, Label as HeadlessLabel } from "@headlessui/react";

export const Input = ({
  type,
  name,
  label
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}) => {
  return <>
    <Field>
      {label && <HeadlessLabel className="font-semibold text-p-600">
        {label}
      </HeadlessLabel>}
      <span className={clsx(
        "flex flex-1 justify-items-stretch w-min bg-p-100 rounded-xl",
        "border-solid border-3 border-t-p-50 border-l-p-50 border-r-p-300 border-b-p-300"
      )}>
        <HeadlessInput name={name} type={type} className={clsx(
          "px-4 py-2 font-medium text-p-800",
          "focus:outline-0",
          "autofill:rounded-lg"
        )} />
      </span>
    </Field>
  </>
};

