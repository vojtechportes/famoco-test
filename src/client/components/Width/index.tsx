import * as React from "react";
import styled from "src/client/theme/index";

const StyledWith = styled<IProps, "div">("div")`
  width: ${({ width }) => width};
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
`;

interface IProps {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNodeArray;
}

export const Width = ({
  width,
  maxWidth,
  minWidth,
  className,
  children
}: IProps) => {
  return (
    <StyledWith
      width={width}
      maxWidth={maxWidth}
      minWidth={minWidth}
      className={className}
    >
      {children}
    </StyledWith>
  );
};

Width.defaultProps = {
  width: "initial",
  maxWidth: "initial",
  minWidth: "initial",
  className: ""
};
