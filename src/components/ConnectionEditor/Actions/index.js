import React from "react";
import styled from "styled-components";
import Action from "./Action";
import { FaFile, FaLink } from "react-icons/fa";

const Container = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;

  display: flex;
`;

const Actions = ({ onStartConnection }) => {
  return (
    <Container>
      <Action label="New Document" icon={<FaFile />} />
      <Action
        onClick={onStartConnection}
        label="New Relationship"
        icon={<FaLink />}
      />
    </Container>
  );
};

export default Actions;
