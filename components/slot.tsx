import clsx from "clsx";
import { isValidElement, cloneElement, Children } from "react";

export const Slot = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}) => {
  if (isValidElement<{
    className?: string,
    [key: string]: unknown,
  }>(children)) {
    return cloneElement(children, {
      ...props,
      ...children.props,
      className: clsx(children?.props.className, props.className),
    });
  }
  if (Children.count(children) > 1) {
    Children.only(null);
  }
  return null;
};
