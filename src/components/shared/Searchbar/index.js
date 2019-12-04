import React from "react";
import styled from "styled-components";
import SearchIcon from "icons/search.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  background-color: #eff1f5;
  border-radius: 4px;
  overflow: hidden;
`;

const Input = styled.input`
  height: 40px;
  background-color: #eff1f5;
  width: 100%;
  outline: none;
  border: none;

  padding: 0px 12px 0px 0px;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const Searchbar = props => {
  return (
    <Container>
      <Icon>
        <img src={SearchIcon} />
      </Icon>
      <Input
        {...props}
        className="h5-quiet"
        placeholder={props.placeholder || "Search"}
      />
    </Container>
  );
};

export default Searchbar;
