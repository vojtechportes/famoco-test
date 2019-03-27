import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Card } from "../Card/index";
import { IEventsData, IEventsDataItem } from "src/client/services/index";
import { Grid } from "@material-ui/core";
import styled from "src/client/theme/index";

const Container = styled.div`
  padding: 14px 0 24px;
`;

interface IProps extends RouteComponentProps {
  items: IEventsData;
}

class CardList extends React.PureComponent<IProps> {
  public render() {
    return (
      <Container>
        <Grid container spacing={24}>
          {this.props.items.resultsPage.results.event.map(
            (item: IEventsDataItem, key) => {
              return (
                <Grid item lg={3} md={4} sm={12} xs={12} key={key}>
                  <Card
                    item={item}
                    onClick={this.handleClick.bind(this, item.id)}
                  />
                </Grid>
              );
            }
          )}
        </Grid>
      </Container>
    );
  }

  private handleClick = (id: number) => {
    this.props.history.push(`/event/${id}`);
  };
}

export default withRouter(CardList);
