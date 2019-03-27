import * as React from "react";
import { getMetroAreaEvents, IEventsData } from "src/client/services/index";
import { LoadMore, Container } from "src/client/components/index";
import { StringsContext } from "src/client/strings/index";
import { RouteComponentProps } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Typography } from "@material-ui/core";
import CardList from "./components/CardList/index";

const Bottom = Container.extend`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

interface IMatchParams {
  id?: string;
  name?: string;
}

interface IState {
  data: IEventsData;
  page: number;
  loading: boolean;
}

class Region extends React.PureComponent<
  RouteComponentProps<IMatchParams>,
  IState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: {},
      page: 1,
      loading: false
    };
  }

  public componentWillMount() {
    const areaId = parseInt(this.props.match.params.id, 10);

    getMetroAreaEvents(areaId, 12).then(
      (response: AxiosResponse<IEventsData>) => {
        this.setState({ ...this.state, data: response.data });
      }
    );
  }

  public render() {
    const { data } = this.state;

    return (
      <StringsContext.Consumer>
        {({
          strings: {
            scenes: { region }
          }
        }) =>
          region && (
            <>
              <Container>
                <Typography variant="h3" color="inherit">
                  {region.hd} {this.props.match.params.name}
                </Typography>
              </Container>
              {data.resultsPage && (
                <>
                  {data.resultsPage.totalEntries === 0 ? (
                    <p>Nothing :(</p>
                  ) : (
                    <>{this.renderList(data)}</>
                  )}
                </>
              )}
            </>
          )
        }
      </StringsContext.Consumer>
    );
  }

  private renderList = (data: IEventsData) => {
    const total = Math.ceil(
      data.resultsPage.totalEntries / data.resultsPage.perPage
    );

    return (
      <Container>
        <CardList items={data} />
        <Bottom>
          <LoadMore
            onClick={this.handleLoadMore}
            page={this.state.page}
            total={total}
            disabled={this.state.page === total}
          />
        </Bottom>
      </Container>
    );
  };

  private handleLoadMore = () => {
    const areaId = parseInt(this.props.match.params.id, 10);

    this.setState({ ...this.state, loading: true });

    getMetroAreaEvents(areaId, 12, this.state.page + 1)
      .then((response: AxiosResponse<IEventsData>) => {
        this.setState(
          {
            ...this.state,
            page: response.data.resultsPage.page,
            data: {
              ...this.state.data,
              resultsPage: {
                ...this.state.data.resultsPage,
                results: {
                  ...this.state.data.resultsPage.results,
                  event: [
                    ...this.state.data.resultsPage.results.event,
                    ...response.data.resultsPage.results.event
                  ]
                }
              }
            }
          },
          () => {
            this.setState({ ...this.state, loading: false });
          }
        );
      })
      .catch((err: any) => {
        this.setState({ ...this.state, loading: false });
      });
  };
}

export default Region;
