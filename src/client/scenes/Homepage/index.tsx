import * as React from "react";
import { getLocation, ILocationData } from "src/client/services";
import { Search, LoadMore, Container } from "src/client/components";
import List from "./components/List/index";
import { AxiosResponse } from "axios";

const Bottom = Container.extend`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

interface IState {
  data: ILocationData;
  loading: boolean;
  page: number;
  searchValue: string;
}

class Homepage extends React.PureComponent<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: {},
      loading: false,
      page: 1,
      searchValue: ""
    };
  }

  public render() {
    const { data } = this.state;

    return (
      <>
        <Search onSearch={this.handleSearch} onReset={this.handleReset} />
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
    );
  }

  private renderList = (data: ILocationData) => {
    const total = Math.ceil(
      data.resultsPage.totalEntries / data.resultsPage.perPage
    );

    return (
      <Container>
        <List items={data} />
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

  private handleSearch = (value: string) => {
    this.setState({ ...this.state, loading: true, page: 1 });

    getLocation(value)
      .then((response: AxiosResponse<ILocationData>) => {
        this.setState({ ...this.state, data: response.data }, () => {
          this.setState({ ...this.state, loading: false, searchValue: value });
        });
      })
      .catch((err: any) => {
        this.setState({ ...this.state, loading: false });
      });
  };

  private handleReset = () => {
    this.setState({ ...this.state, data: {}, page: 1, searchValue: "" });
  };

  private handleLoadMore = () => {
    this.setState({ ...this.state, loading: true });

    getLocation(this.state.searchValue, 10, this.state.page + 1)
      .then((response: AxiosResponse<ILocationData>) => {
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
                  location: [
                    ...this.state.data.resultsPage.results.location,
                    ...response.data.resultsPage.results.location
                  ]
                }
              }
            }
          },
          () => {
            console.log(this.state);
            this.setState({ ...this.state, loading: false });
          }
        );
      })
      .catch((err: any) => {
        this.setState({ ...this.state, loading: false });
      });
  };
}

export default Homepage;
