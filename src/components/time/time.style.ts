import styled from "styled-components";
import Label from "../../__internal__/label";

export const StyledLabel = styled(Label)`
  label {
    font-weight: var(--fontWeights500);
  }
`;

export const StyledHintText = styled.div<{
  isDisabled?: boolean;
  hasError?: boolean;
}>`
  ::after {
    content: " ";
  }

  margin-top: 0px;
  margin-bottom: var(--spacing150);
  color: ${({ isDisabled }) =>
    isDisabled ? "var(--colorsUtilityYin030)" : "var(--colorsUtilityYin055)"};
  font-size: 14px;
`;
