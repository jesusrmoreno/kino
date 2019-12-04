import React, { useEffect, useState } from "react";
import { getDocuments } from "api/document";
import styled, { css } from "styled-components";
import { FaFileAlt, FaCross, FaTimes, FaChevronLeft } from "react-icons/fa";
import moment from "moment";

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${"" /* background: white; */}
`;

const DocumentTitle = styled.span`
  font-weight: 500;
`;

const Title = styled.input`
  font-weight: 400;

  width: 100%;
  border: none;
  color: rgba(27, 39, 50, 1);
  outline: none;
  padding: 8px 10px;
  border-radius: 8px;

  background: transparent;
  border: 1px solid #dadce0;
  font-size: 15px;
  transition: all 150ms;
  &:focus,
  &:hover {
    border-color: #0070e0;
  }
`;

const DocumentContainer = styled.div`
  padding: 12px 24px;
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

const Meta = styled.div`
  color: #637282;
  font-size: 12px;
  line-height: 16px;
  padding-top: 4px;
  display: flex;
`;

const Toolbar = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  padding: 0px 24px;
`;

const ToolbarItem = styled.div`
  border-bottom: 1px solid transparent;
  padding: 0px 16px;
  height: 32px;

  text-align: center;

  margin-bottom: -1px;
  user-select: none;
  cursor: pointer;
  ${props =>
    props.selected &&
    css`
      border-bottom: 1px solid #0070e0;
      color: #0070e0;
    `}

  &:hover {
    color: #0070e0;
  }
`;

const Sidebar = styled.div`
  transition: all 250ms;
  width: 64px;
  border-right: 1px solid #ebebeb;
  z-index: 1;
  background: white;
`;

const DocumentList = ({ onDocumentSelect, onCancel }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      const docs = await getDocuments();
      setDocuments(docs);
    })();
  }, []);

  return (
    <Container>
      <div
        style={{
          padding: "24px 24px 16px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ebebeb"
        }}
      >
        <div
          style={{
            width: 32,
            marginLeft: -8,
            display: "flex",
            alignItems: "center"
          }}
          onClick={onCancel}
        >
          <FaTimes />
        </div>
        <Title placeholder="Search" />
      </div>
      <div style={{ overflow: "auto", flex: 1, padding: "12px 0px" }}>
        {documents.map(d => {
          const title = d.title !== "" ? d.title : "Untitled";
          return (
            <DocumentContainer
              key={d._id}
              onClick={() => onDocumentSelect(d._id)}
            >
              <div className="icon">
                <FaFileAlt />
              </div>
              <div>
                <DocumentTitle>{title}</DocumentTitle>
                <Meta>
                  <div>
                    Created {moment(d.createdAt).format("MMM. DD YYYY")}
                  </div>
                  <div style={{ padding: "0px 6px" }}>|</div>
                  <div>Edited {moment(d.updatedAt).fromNow()}</div>
                </Meta>
              </div>
            </DocumentContainer>
          );
        })}
      </div>
    </Container>
  );
};

export default DocumentList;
