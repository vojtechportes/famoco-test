import * as React from "react";
import { IEventsDataItem } from "src/client/services/index";
import { StringsContext } from "src/client/strings/index";
import {
  default as CardHeader,
  CardHeaderProps
} from "@material-ui/core/CardHeader";
import {
  default as CardContent,
  CardContentProps
} from "@material-ui/core/CardContent";
import { default as CardBase } from "@material-ui/core/Card";
import styled, { css } from "src/client/theme/index";
import { truncate } from "src/client/utils/truncate/index";
import { format } from "date-fns";
import Place from "@material-ui/icons/Place";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { lighten } from "polished";
import { CardButton } from "../CardButton/index";
import { Margin, Line } from "src/client/components/index";

const Icon = css`
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.gray4};
`;

const PlaceIcon: any = styled(Place)`
  ${Icon};
`;

const CalendarTodayIcon: any = styled(CalendarToday)`
  ${Icon} position: relative;
  top: -1px;
`;

const StyledCard: any = styled(CardBase)`
  height: 100%;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;

const StyledCardHeader = styled<CardHeaderProps>(CardHeader)`
  padding: 24px;
  background-color: ${({ theme }) => lighten(0.4, theme.colors.blue)};

  & > div > span {
    font-size: 18px;
    font-weight: 600;
  }

  ${StyledCard}:hover & {
    background-color: ${({ theme }) => lighten(0.3, theme.colors.blue)};
  }
`;

const StyledCardContent = styled<CardContentProps>(CardContent)`
  padding: 24px;
`;

interface IProps {
  item: IEventsDataItem;
  onClick: (event: any, eventId: number) => void;
}

export const Card = ({ item, onClick }: IProps) => {
  const artists = item.performance.map(
    performanceItem => performanceItem.displayName
  );

  return (
    <StringsContext.Consumer>
      {({
        strings: {
          scenes: {
            region: {
              components: { card }
            }
          }
        }
      }) => {
        return (
          <StyledCard onClick={onClick}>
            <StyledCardHeader
              title={truncate(artists.join(card.titleSeparator), 35, false)}
            />
            <StyledCardContent>
              <Line>
                <PlaceIcon fontSize="small" />
                {item.venue.displayName}, {item.venue.metroArea.displayName}
              </Line>
              <Line>
                <CalendarTodayIcon fontSize="small" />
                {format(item.start.date, card.dateFormat)}
              </Line>
              <Margin margin="20px 0 0">
                <CardButton />
              </Margin>
            </StyledCardContent>
          </StyledCard>
        );
      }}
    </StringsContext.Consumer>
  );
};
