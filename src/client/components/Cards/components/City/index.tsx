import * as React from "react";
import { Card } from "@material-ui/core";

interface IProps {
  children: React.ReactNode | React.ReactNodeArray;
}

export const CityCard = ({ children }: IProps) => {
  return (
    <Card>
      {children}
    </Card>
  );
};