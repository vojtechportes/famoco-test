import styled from "src/client/theme/index";

export const Hr = styled.hr`
  margin: 20px 0;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;