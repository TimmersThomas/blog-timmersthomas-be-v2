/* eslint-disable react/jsx-no-useless-fragment */
import { FC, ReactNode } from "react";

export type ConditionalWrapperProps = {
  condition: boolean;
  renderWrapper: (children: ReactNode) => JSX.Element;
};

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  condition,
  renderWrapper,
  children,
}) => (condition ? renderWrapper(children) : <>{children}</>);
