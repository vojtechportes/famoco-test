import * as React from "react";
import { AxiosResponse } from "axios";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  getEvent,
  IEventData,
  IEventDataDetail
} from "src/client/services/index";
import {
  Container,
  Margin,
  Line,
  Width,
  NoResults
} from "src/client/components/index";
import { Typography } from "@material-ui/core";
import { MoreEventsButton } from "./components/MoreEventsButton/index";
import { Card } from "./components/Card/index";
import { StringsContext } from "src/client/strings/index";
import { Grid, Divider } from "@material-ui/core";
import Phone from "@material-ui/icons/Phone";
import Place from "@material-ui/icons/Place";
import Link from "@material-ui/icons/Link";
import styled, { css } from "src/client/theme/index";

const Icon = css`
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.gray4};
`;

const PhoneIcon: any = styled(Phone)`
  ${Icon};
`;

const PlaceIcon: any = styled(Place)`
  ${Icon};
`;

const LinkIcon: any = styled(Link)`
  ${Icon};
`;

interface IMatchParams {
  id?: string;
}

interface IState {
  data: IEventData;
  loading: boolean;
}

class EventDetail extends React.PureComponent<
  RouteComponentProps<IMatchParams>,
  IState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: {},
      loading: false
    };
  }

  public componentWillMount() {
    const eventId = parseInt(this.props.match.params.id, 10);

    this.setState({ ...this.state, loading: true });

    getEvent(eventId)
      .then((response: AxiosResponse<IEventData>) => {
        this.setState({ ...this.state, data: response.data, loading: false });
      })
      .catch(reason => {
        this.setState({ ...this.state, loading: false });
      });
  }

  public render() {
    const { data, loading } = this.state;

    if (loading) {
      return <>Loading...</>;
    }

    return (
      <StringsContext.Consumer>
        {({
          strings: {
            scenes: { event }
          }
        }) =>
          event && (
            <>
              {data.resultsPage ? (
                <>{this.renderEvent(data.resultsPage.results.event)}</>
              ) : (
                <NoResults>{event.noResults}</NoResults>
              )}
            </>
          )
        }
      </StringsContext.Consumer>
    );
  }

  private renderEvent = (item: IEventDataDetail) => {
    return (
      <StringsContext.Consumer>
        {({
          strings: {
            scenes: { event }
          }
        }) =>
          event && (
            <>
              <Container>
                <Margin margin="0 0 48px">
                  <Margin margin="0 0 24px">
                    <Typography variant="h3" color="inherit">
                      {item.displayName}
                    </Typography>
                  </Margin>
                  <Divider />
                </Margin>
                <Grid container spacing={24}>
                  <Grid item lg={3} md={4} sm={12}>
                    <Card>
                      <Typography variant="h6" color="inherit">
                        {event.venueHd}
                      </Typography>

                      <Line>
                        <PlaceIcon fontSize="small" />
                        <Typography variant="body1" color="inherit">
                          {item.venue.street && <>{item.venue.street}, </>}
                          {item.location.city}
                          {item.venue.zip && (
                            <>
                              <br />
                              {item.venue.zip}
                            </>
                          )}
                        </Typography>
                      </Line>
                      {item.venue.website && (
                        <Line>
                          <LinkIcon fontSize="small" />
                          <Typography variant="body1" color="inherit">
                            {item.venue.website}
                          </Typography>
                        </Line>
                      )}
                      {item.venue.phone && (
                        <Line>
                          <PhoneIcon fontSize="small" />
                          <Typography variant="body1" color="inherit">
                            {item.venue.phone}
                          </Typography>
                        </Line>
                      )}

                      <Margin margin="20px 0 0">
                        <MoreEventsButton
                          onClick={this.handleMoreEventsClick.bind(
                            this,
                            item.venue.city.displayName,
                            item.venue.metroArea.id
                          )}
                          areaName={item.location.city}
                        />
                      </Margin>
                    </Card>
                  </Grid>
                  <Grid item lg={9} md={8} sm={12}>
                    <Margin margin="0 0 16px">
                      <Typography variant="h6" color="inherit">
                        {event.ageRestriction}
                      </Typography>
                    </Margin>
                    <Margin margin="16px 0">
                      <Typography variant="body1" color="inherit">
                        {item.ageRestriction === null ? event.no : event.yes}
                      </Typography>
                    </Margin>
                    <Margin margin="16px 0">
                      <Typography variant="h6" color="inherit">
                        {event.hasEnded}
                      </Typography>
                    </Margin>
                    <Typography variant="body1" color="inherit">
                      {item.flaggedAsEnded ? event.yes : event.no}
                    </Typography>
                    <Margin margin="16px 0">
                      <Typography variant="h6" color="inherit">
                        {event.description}
                      </Typography>
                    </Margin>
                    <Width maxWidth="800px">
                      <Typography variant="body1" color="inherit">
                        {/* This would be event description, unfortunately, songkick API doesn't provide such information */}
                        Nunc dapibus tortor vel mi dapibus sollicitudin. Quis
                        autem vel eum iure reprehenderit qui in ea voluptate
                        velit esse quam nihil molestiae consequatur, vel illum
                        qui dolorem eum fugiat quo voluptas nulla pariatur?
                        Morbi scelerisque luctus velit. Curabitur bibendum justo
                        non orci. Nullam at arcu a est sollicitudin euismod.
                        Integer in sapien. Cum sociis natoque penatibus et
                        magnis dis parturient montes, nascetur ridiculus mus.
                        Fusce tellus odio, dapibus id fermentum quis, suscipit
                        id erat. Morbi leo mi, nonummy eget tristique non,
                        rhoncus non leo. Praesent dapibus. In sem justo, commodo
                        ut, suscipit at, pharetra vitae, orci. Nunc dapibus
                        tortor vel mi dapibus sollicitudin. Praesent in mauris
                        eu tortor porttitor accumsan. Nunc auctor. Proin pede
                        metus, vulputate nec, fermentum fringilla, vehicula
                        vitae, justo. Etiam dui sem, fermentum vitae, sagittis
                        id, malesuada in, quam. Pellentesque pretium lectus id
                        turpis.
                      </Typography>
                    </Width>
                  </Grid>
                </Grid>
              </Container>
            </>
          )
        }
      </StringsContext.Consumer>
    );
  };

  private handleMoreEventsClick = (name: string, id: number) => {
    this.props.history.push(`/region/${id}/${name}`);
  };
}

export default withRouter(EventDetail);
