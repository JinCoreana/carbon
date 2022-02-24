import styled from "styled-components";

const StyledSelectListContainer = styled.div`
  background-color: white;
  box-shadow: var(--boxShadow100);
  position: absolute;
  ${({ placement }) => placement === "top-start" && "bottom: 0"};
  min-width: 100%;
  max-width: 870px;
  height: ${({ height }) => height};
  overflow: hidden;
  animation: fadeIn 250ms ease-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default StyledSelectListContainer;
