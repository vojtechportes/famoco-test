import * as React from "react";
import { rgba } from "polished";
import styled from "src/client/theme/index";

const StyledError = styled<IProps, "div">("div")`
  padding: 15px 20px;
  color: ${({ theme }) => theme.colors.white};  
  font-weight: 600;  
  background-color: ${({ theme }) => rgba(theme.colors.red, 0.7)};
`;

interface IProps {
  className?: string;
  children: React.ReactNode | React.ReactNodeArray;
}

export const ErrorBar = ({ className, children }: IProps) => {
  return <StyledError className={className}>{children}</StyledError>;
};

ErrorBar.defaultProps = {
  className: ""
};
