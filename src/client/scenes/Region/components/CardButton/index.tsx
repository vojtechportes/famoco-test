import * as React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { StringsContext } from "src/client/strings/index";
import styled from "src/client/theme/index";
import { darken } from "polished";

const StyledButton = styled<ButtonProps>(Button)`
  && {
    width: 100%;
    padding: 8px 20px;
    color: ${({ theme }) => theme.colors.blue};
    font-weight: 600;
    text-align: center;
    border-color: ${({ theme }) => theme.colors.blue};
    border-radius: 3px;

    &:hover {
      color: ${({ theme }) => darken(0.15, theme.colors.blue)};
      border-color: ${({ theme }) => darken(0.15, theme.colors.blue)};
    }
  }
`;

interface IProps {
  className?: string;
}

export const CardButton = ({ className }: IProps) => {
  return (
    <StringsContext.Consumer>
      {({
        strings: {
          scenes: {
            region: {
              components: { cardButton }
            }
          }
        }
      }) =>
        cardButton && (
          <StyledButton variant="outlined" className={className}>
            {cardButton.value}
          </StyledButton>
        )
      }
    </StringsContext.Consumer>
  );
};

CardButton.defaultProps = {
  className: ""
};
