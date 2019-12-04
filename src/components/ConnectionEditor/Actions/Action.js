import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
  background: #fafafa;

  user-select: none;
  padding: 0px 8px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  color: #6e6e6e;
  transition: all 150ms;

  &:hover {
    background: #eaeaea;
  }
  .icon {
    display: flex;

    align-items: center;
    padding-right: 6px;
  }
  margin-left: 8px;
`;

const Action = ({ label, onClick, icon }) => {
  return (
    <Container className="h5-quiet" onClick={onClick}>
      {icon ? <div className="icon">{icon}</div> : null}
      <label>{label}</label>
    </Container>
  );
};

export default Action;
