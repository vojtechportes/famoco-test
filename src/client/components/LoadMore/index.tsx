import * as React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { StringsContext } from "src/client/strings/index";
import styled from "src/client/theme/index";
import { darken } from "polished";

const StyledButton = styled<ButtonProps>(Button)`
  && {
    padding: 14px 30px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;

    &:hover {
      background-color: ${({ theme }) => darken(0.15, theme.colors.blue)}; 
    }
  }
`;

interface IProps {
  onClick: any;
  page?: number;
  total?: number;
  disabled?: boolean;
  className?: string;
}

export const LoadMore = ({
  onClick,
  page,
  total,
  disabled,
  className
}: IProps) => {
  return (
    <StringsContext.Consumer>
      {({
        strings: {
          components: { loadMore }
        }
      }) =>
        loadMore && (
          <StyledButton
            onClick={onClick}
            className={className}
            disabled={disabled}
          >
            {loadMore.value} ({page}/{total})
          </StyledButton>
        )
      }
    </StringsContext.Consumer>
  );
};

LoadMore.defaultProps = {
  page: 0,
  total: 0,
  disabled: false,
  className: ""
};
