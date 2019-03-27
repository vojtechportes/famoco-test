import * as React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { StringsContext } from "src/client/strings/index";
import { ILocationData, ILocationDataItem } from "src/client/services/index";
import { ListRow } from "../ListRow/index";

interface IProps extends RouteComponentProps {
  items: ILocationData;
}

class List extends React.PureComponent<IProps> {
  public render() {
    return (
      <StringsContext.Consumer>
        {({
          strings: {
            scenes: {
              homepage: {
                components: { list }
              }
            }
          }
        }) =>
          list && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{list.city}</TableCell>
                  <TableCell>{list.country}</TableCell>
                  <TableCell align="right">{list.regionId}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.items.resultsPage.results.location.map(
                  (item: ILocationDataItem, key) => {
                    const {
                      city,
                      metroArea,
                      metroArea: { id }
                    } = item;
                    return (
                      <ListRow
                        item={item}
                        key={key}
                        onClick={this.handleClick.bind(this, id, {
                          city,
                          metroArea
                        })}
                      />
                    );
                  }
                )}
              </TableBody>
            </Table>
          )
        }
      </StringsContext.Consumer>
    );
  }

  private handleClick = (
    id: number,
    areaInfo: { city: any; metroArea: any }
  ) => {
    this.props.history.push(
      `/region/${id}/${areaInfo.city.displayName}`,
      areaInfo
    );
  };
}

export default withRouter(List);
