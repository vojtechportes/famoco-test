import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Margin } from "src/client/components/index";
import { default as AppBarBase, AppBarProps } from "@material-ui/core/AppBar";
import { StringsContext } from "src/client/strings/index";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Typography,
  IconButton,
  Toolbar,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import List, { ListProps } from "@material-ui/core/List";
import { default as HomeIcon } from "@material-ui/icons/Home";
import styled from "src/client/theme/index";

const StyledAppBar = styled<AppBarProps>(AppBarBase)`
  && {
    margin-bottom: 20px;
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

const StyledList = styled<ListProps>(List)`
  width: 300px;
`;

interface IState {
  open: boolean;
}

class AppBar extends React.PureComponent<RouteComponentProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      open: false
    };
  }

  public render() {
    return (
      <StringsContext.Consumer>
        {({
          strings: {
            components: { appBar }
          }
        }) =>
          appBar && (
            <>
              <Drawer open={this.state.open} onClose={this.handleDrawerToggle}>
                <StyledList>
                  <Margin margin="0 0 10px">
                    <ListItem>
                      <Margin margin="-4px 0 4px">
                        <Typography variant="h6" color="inherit">
                          {appBar.title}
                        </Typography>
                      </Margin>
                    </ListItem>
                    <Divider />
                  </Margin>
                  <ListItem
                    button
                    onClick={this.handleListItemClick.bind(this, "/")}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={appBar.drawer.list.homepage} />
                  </ListItem>
                </StyledList>
              </Drawer>
              <StyledAppBar position="static" onClick={this.handleDrawerToggle}>
                <Toolbar>
                  <IconButton color="inherit" aria-label={appBar.menuTitle}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit">
                    {appBar.title}
                  </Typography>
                </Toolbar>
              </StyledAppBar>
            </>
          )
        }
      </StringsContext.Consumer>
    );
  }

  private handleDrawerToggle = () => {
    this.setState({ ...this.state, open: !this.state.open });
  };

  private handleListItemClick = (url: string) => {
    this.setState({ ...this.state, open: false }, () => {
      this.props.history.push(url);
    });
  };
}

export default withRouter(AppBar);
