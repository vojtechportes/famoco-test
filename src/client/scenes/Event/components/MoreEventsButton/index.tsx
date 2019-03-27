import * as React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { StringsContext } from "src/client/strings/index";
import styled from "src/client/theme/index";
import { darken } from "polished";

const StyledButton = styled<ButtonProps>(Button)`
  && {
    padding: 8px 20px;
    border-radius: 3px;
    border-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};
    font-weight: bold;
    text-align: center;

    &:hover {
      border-color: ${({ theme }) => darken(0.15, theme.colors.blue)};
      color: ${({ theme }) => darken(0.15, theme.colors.blue)};
    }
  }
`;

interface IProps {
  areaName: string;
  className?: string;
  onClick: any;
}

export const MoreEventsButton = ({ areaName, className, onClick }: IProps) => {
  return (
    <StringsContext.Consumer>
      {({
        strings: {
          scenes: {
            event: {
              components: { moreEvents }
            }
          }
        }
      }) =>
        moreEvents && (
          <StyledButton variant="outlined" className={className} onClick={onClick}>
            {moreEvents.value} {areaName}
          </StyledButton>
        )
      }
    </StringsContext.Consumer>
  );
};

MoreEventsButton.defaultProps = {
  className: ""
};
