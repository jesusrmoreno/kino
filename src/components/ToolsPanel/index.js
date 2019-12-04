import React from "react";

import styled from "styled-components";
import { FaFile } from "react-icons/fa";

const Container = styled.div`
  height: 100vh;
  width: 56px;
  background: white;
  z-index: 1000;
  position: relative;
  border-right: 1px solid #ebebeb;
`;

const Tool = styled.div`
  width: 56px;
  height: 56px;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #0070e0;
  }
`;

const ToolsPanel = () => {
  return (
    <Container>
      
    </Container>
  );
};

export default ToolsPanel;
