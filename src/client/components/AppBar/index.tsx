import * as React from "react";
import { default as AppBarBase, AppBarProps } from "@material-ui/core/AppBar";
import { StringsContext } from "src/client/strings/index";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography, IconButton, Toolbar } from "@material-ui/core";
import styled from "src/client/theme/index";

const StyledAppBar = styled<AppBarProps>(AppBarBase)`
  && {
    margin-bottom: 20px;
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

export const AppBar = () => {
  return (
    <StringsContext.Consumer>
      {({
        strings: {
          components: { appBar }
        }
      }) =>
        appBar && (
          <StyledAppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label={appBar.menuTitle}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                {appBar.title}
              </Typography>
            </Toolbar>
          </StyledAppBar>
        )
      }
    </StringsContext.Consumer>
  );
};
