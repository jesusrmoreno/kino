import React, { useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
// import Editor from "components/Editor/indexv2";
// import EditorOld from "components/Editor";
// import DocumentList from "components/DocumentList";
// import Location from "components/Location";
// import ToolsPanel from "components/ToolsPanel";
import ConnectionEditor from "components/ConnectionEditor";
import { swap, Atom, useAtom } from "@dbeining/react-atom";

// import DocumentPanel from "components/DocumentPanel";
// import VerticalPanel from "components/VerticalPanel";
// import Draggable from "react-draggable";
// import PanelSectionHeader from "./components/PanelSectionHeader";

const Input = styled.input`
  background-color: rgb(255, 255, 255);
  font-size: 13px;
  color: rgb(75, 75, 75);
  outline: none;
  border: 1px solid rgb(225, 225, 225);
  padding: 3px 12px 5px;
  height: 32px;
  max-height: 32px;
  transition: all 250ms;
  width: 100%;
  border-radius: 3px;
  &::placeholder {
    font-style: italic;
    font-weight: 300;
  }

  &:focus {
    border-color: rgb(20, 115, 230);
  }
`;

const ItemContainer = styled.div`
  height: 38px;
  width: 100%;
  font-size: 13px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 4px 8px;
  user-select: none;
`;

const InnerItemContainer = styled.div`
  padding: 0px 12px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: all 250ms;
  overflow: hidden;
  color: rgb(44, 44, 44);
  &:hover {
    background-color: rgba(44, 44, 44, 0.06);
  }
`;

const MenuItem = ({ label, onClick }) => {
  return (
    <ItemContainer onClick={onClick}>
      <InnerItemContainer>{label}</InnerItemContainer>
    </ItemContainer>
  );
};

const SidebarItem = () => {
  return <div />;
};

const Bar = () => {
  return (
    <div
      style={{
        overflow: "auto",
        width: 256,
        height: "100vh"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 64
        }}
      >
        <div style={{ padding: "0px 12px", width: "100%" }}>
          <button
            style={{ width: "100%" }}
            className="spectrum-Button spectrum-Button--cta"
          >
            <span className="spectrum-Button-label">Create Item</span>
          </button>
        </div>
      </div>
      <SidebarItem />
      <SidebarItem />
      <SidebarItem />
      <SidebarItem />
      <SidebarItem />
    </div>
  );
};

const defaultValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "A line of text in a paragraph.",
        marks: []
      }
    ]
  }
];

const Editor = ({ documentId }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) {
      setLoading(false);
    } else {
      setLoading(true);

      setLoading(false);
    }
  }, [documentId]);

  return (
    <Slate
      editor={editor}
      defaultValue={defaultValue}
      onChange={(...args) => {
        console.log(args);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100%"
        }}
      >
        <Header placeholder="Untitled" className="h5-quiet" />
        <Editable
          style={{
            height: "100%",
            width: "100%",
            padding: "8px 12px"
          }}
        />
      </div>
    </Slate>
  );
};

const Header = styled.input`
  display: flex;
  align-items: center;

  font-weight: 400;
  border: none;
  outline: none;
  height: 64px;
  flex-shrink: 0;
  padding: 0px 12px;

  background: transparent;
  width: 100%;
  transition: all 250ms;
`;

const Panel = styled.div`
  position: absolute;
  background: white;
  border-radius: 3px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  width: 212px;
`;

const Section = styled.div`
  background: rgba(14, 14, 15, 1);
  color: white;
  bottom: 44px;
  ${"" /* box-shadow: 0px 4px 10px 2px rgba(40, 40, 40, 0.05); */}
  overflow: hidden;
  width: 414px;
  border-radius: 4px;
`;

const CollectionAtom = Atom.of({});

const createNode = id => {
  swap(CollectionAtom, s => {
    return {
      ...s,
      [Date.now()]: {
        _id: Date.now()
      }
    };
  });
};

const useCollection = () => {
  const items = useAtom(CollectionAtom);

  return Object.values(items);
};

const App = () => {
  const [documentId, setDocumentId] = useState();
  const nodes = useCollection();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f7f8fa",
        display: "flex"
      }}
    >
      <div style={{ flex: 1 }}>
        <ConnectionEditor nodes={nodes} />
      </div>

      <Panel
        style={{ padding: 8, left: 24, bottom: 24, height: 500, width: 414 }}
      >
        <Editor />
      </Panel>
      <Panel style={{ padding: 8, right: 24, bottom: 24 }}>
        <MenuItem label="Create New" onClick={createNode} />
        <MenuItem label="Manage Relationships" />
      </Panel>

      {/* <Location />

        <VerticalPanel width={48} dark>
          <PanelSectionHeader>Items</PanelSectionHeader>
          <PanelSectionHeader>Relationships</PanelSectionHeader>
        </VerticalPanel>

        
       */}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
