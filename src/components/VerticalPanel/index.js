import styled from "styled-components";

const VerticalPanel = styled.div`
  width: ${({ width = 0 }) => width * 4}px;
  height: 100%;
  overflow-y: auto;
  background: ${props =>
    props.dark ? `rgba(47, 49, 53, 1)` : `rgba(251, 251, 251, 1)`};
  flex-shrink: 0;
  border-right: 1px solid rgba(221, 221, 221, 1);
  color: ${props => (props.dark ? "white" : "#444444")};
`;

export default VerticalPanel;
