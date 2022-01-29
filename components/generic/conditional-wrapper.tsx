import { FC, ReactNode } from "react";

export type ConditionalWrapperProps = {
  condition: boolean;
  wrap: (children: ReactNode) => JSX.Element;
};

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  condition,
  wrap,
  children,
}) => (condition ? wrap(children) : <>{children}</>);
