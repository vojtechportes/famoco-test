import * as React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { ILocationDataItem } from "src/client/services/index";
import styled from "src/client/theme/index";

interface IProps {
  item: ILocationDataItem;
  onClick: (areaId: number, locationData: any) => void;
}

const StyledTableRow: any = styled(TableRow)`
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;

export const ListRow = ({ item, onClick }: IProps) => {
  return (
    <StyledTableRow onClick={onClick}>
      <TableCell>{item.city.displayName}</TableCell>
      <TableCell>{item.city.country.displayName}</TableCell>
      <TableCell align="right">{String(item.metroArea.id)}</TableCell>
    </StyledTableRow>
  );
};
