import { default as CardBase, CardProps } from "@material-ui/core/Card";
import styled from "src/client/theme/index";

export const Card = styled<CardProps>(CardBase)`
  padding: 24px;
  border-radius: 3px;
`;