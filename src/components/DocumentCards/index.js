import React from "react";
import styled from "styled-components";
import { useDocuments } from "api/document";
import { FaFileAlt, FaCross, FaTimes, FaChevronLeft } from "react-icons/fa";
import moment from "moment";
import get from "lodash/get";

const DocumentTitle = styled.span`
  font-weight: 500;
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

const DocumentCards = ({ filter = "", onDocumentSelect = () => {} }) => {
  const allDocs = useDocuments();
  const documents = allDocs.filter(d =>
    get(d, "title", "")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
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
              <DocumentTitle className="h5">{title}</DocumentTitle>
              <Meta>
                <div>Created {moment(d.createdAt).format("MMM. DD YYYY")}</div>
                <div style={{ padding: "0px 6px" }}>|</div>
                <div>Edited {moment(d.updatedAt).fromNow()}</div>
              </Meta>
            </div>
          </DocumentContainer>
        );
      })}
    </div>
  );
};

export default DocumentCards;
