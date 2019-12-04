import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FaChevronUp, FaChevronDown, FaFileAlt } from "react-icons/fa";
import {
  createDocument,
  useDocuments,
  useDocument,
  setSelectedDocument
} from "state/documents";
import moment from "moment";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 500px;
  width: calc(100vw - 480px);
  background: white;
  border-top: 1px solid #ebebeb;
  border-right: none;
  transform: translate3d(0, 500px, 0);
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translate3d(0px, 0, 0);
    `}

  transition: all 250ms;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding: 12px;
  user-select: none;
`;

const PanelToggle = styled.div`
  width: 100%;
  height: 44px;
  background: white;
  position: absolute;

  top: -44px;

  cursor: pointer;

  border: 1px solid #ebebeb;
  border-right: none;
  ${"" /* border-bottom: none; */}

  display: flex;
  align-items: center;
  padding: 0px 12px;
  ${"" /* justify-content: center; */}
  font-size: 12px;
`;

const PanelControl = ({ isOpen, onRequestToggle }) => {
  return (
    <PanelToggle onClick={onRequestToggle}>
      <div style={{ position: "relative", top: 2, paddingRight: 8 }}>
        {isOpen ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      <div>Documents</div>
    </PanelToggle>
  );
};

const DocumentContainer = styled.div`
  padding: 12px 12px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;

  .icon {
    padding: 0px 12px 0px 6px;
    color: rgba(0, 0, 0, 0.47);
  }
  &:hover {
    color: #0070e0;
    .icon {
      color: inherit;
    }
  }
`;

const DocumentTitle = styled.span`
  font-weight: 500;
`;

const Meta = styled.div`
  color: #637282;
  font-size: 12px;
  line-height: 16px;
  padding-top: 4px;
  display: flex;
`;

const DocumentDisplay = ({ id, title, createdAt, updatedAt, preview }) => {
  return (
    <DocumentContainer onClick={() => setSelectedDocument(id)}>
      <div>
        <DocumentTitle className="h5">{title || "Untitled"}</DocumentTitle>
        <Meta>
          <div>Created {moment(createdAt).format("MMM. DD YYYY")}</div>
          <div style={{ padding: "0px 6px" }}>|</div>
          <div>Edited {moment(updatedAt).format("MMM. DD YYYY hh:mm A")}</div>
        </Meta>
      </div>
    </DocumentContainer>
  );
};

const DocumentPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const docs = useDocuments();
  console.log(docs);
  return (
    <Container isOpen={isOpen}>
      <Content>
        <PanelControl
          isOpen={isOpen}
          onRequestToggle={() => {
            setIsOpen(!isOpen);
          }}
        />
        <div style={{ flex: 1, overflow: "auto" }}>
          {docs.map(d => (
            <DocumentDisplay key={d.id} {...d} />
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default DocumentPanel;
