import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled, { css } from "styled-components";
import { useDocuments } from "api/document";
import * as d3 from "d3";
import useDimensions from "react-use-dimensions";

import Actions from "./Actions";
import { Line } from "react-lineto";

import {
  useEditorState,
  setMode,
  setConnectionSource,
  setConnectionTarget
} from "./state";

const ToolboxContainer = styled.div`
  height: 128px;
  width: 128px;
  bottom: 32px;
  right: 32px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  background-color: rgba(255, 255, 255, 0.06);
  position: absolute;
`;

const useForceUpdate = () => {
  const [t, s] = useState(0);
  return [t, () => s(v => v + 1)];
};

class Collection {
  nodes = new Map();
  getId = n => n._id;
  revision = 0;
  constructor(n) {
    n.forEach(({ revision, ...n }) => {
      this.nodes.set(this.getId(n), { revision, ...n });
    });
  }

  updateNode = (id, values = {}) => {
    const current = this.nodes.get(id);

    Object.keys(values).forEach(key => {
      current[key] = values[key];
      this.revision++;
    });
  };

  setIdFunc = fn => (this.getId = fn);

  update = next => {
    for (const current of this.nodes.values()) {
      const isInNextSet = !!next.filter(
        n => this.getId(n) === this.getId(current)
      ).length;
      if (!isInNextSet) {
        this.nodes.delete(this.getId(current));
        this.revision++;
      }
    }
    for (const node of next) {
      if (this.nodes.has(this.getId(node))) {
        this.updateNode(this.getId(node), node);
      } else {
        this.revision++;
        this.nodes.set(this.getId(node), {
          ...node,
          revision: node.revision
        });
      }
    }
  };

  toArray = () => Array.from(this.nodes.values());
}

const useTheForce = (nodes, edges) => {
  const [tick, setTick] = useForceUpdate();
  const force = useRef(null);

  useEffect(() => {
    force.current = d3.forceSimulation().on("tick", () => {
      setTick(t => t + 1);
    });

    return () => force.current.stop();
  }, []);

  useEffect(() => {
    force.current
      .nodes(nodes.current.toArray())
      .force("charge", d3.forceManyBody().strength(-100))
      .force("collide", d3.forceCollide(72))
      .force("x", d3.forceX(0).strength(0.01))
      .force("y", d3.forceY(0).strength(0.01))
      .force(
        "link",
        d3
          .forceLink()
          .links(edges)
          .distance(100)
          .id(d => d._id)
      );

    force.current.alpha(0.5).restart();
    setTick();

    return () => force.current.stop();
  }, [nodes.current.revision, edges]);
};

const Toolbox = () => {
  return <ToolboxContainer></ToolboxContainer>;
};

const Circle = styled.div`
  width: 56px;
  height: 56px;

  background-color: #ecf1fc;
  opacity: 0;
  transition: all 250ms;
  position: absolute;
  left: calc(50% - 28px);
  top: -14px;
  border: 1px dashed #5573da;
  border-radius: 56px;
`;

const Label = styled.div`
  background-color: #f2f3f5;
  height: 28px;
  min-width: 84px;
  z-index: 10;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
  border-radius: 16px;
  background-color: #e9ebef;
  box-shadow: 0 2px 8px -5px #414a54;
  white-space: nowrap;
  user-select: none;
  color: #333c44;
`;

const Node = styled.div`
  cursor: pointer;
  ${props =>
    !props.selected &&
    css`
      &:hover {
        ${Circle} {
          opacity: 1;
          background: transparent;
          border: 1px dashed #5573da;
          transition: all 250ms;
        }

        ${Label} {
          transition: all 250ms;
          background-color: #f2f3f5;
          box-shadow: 0 5px 10px -5px #132436;
        }
      }
    `}

  &:active {
    ${Circle} {
      opacity: 1;
      background-color: #edf1fb;
      transition: all 150ms;
      border: 1px dashed #5573da;
    }

    ${Label} {
      transition: all 150ms;
      background-color: #d9dee5;
      box-shadow: 0 2px 8px -5px #414a54;
    }
  }

  ${props =>
    props.selected &&
    css`
      ${Circle} {
        opacity: 1;
        background-color: #ecf1fc;
        transition: all 150ms;
        border: 1px solid #5573da;
      }

      ${Label} {
        transition: all 150ms;
        background-color: #e9ebef;
        box-shadow: 0 5px 10px -5px #132436;
      }
    `}
`;

const ConnectionEditor = ({nodes}) => {
  const [ref, { width, height }] = useDimensions();
  const chart = useRef(null);
  const graph = useRef(null);
  const link = useRef(null);
  const node = useRef(null);
  const force = useRef(null);

  // const [nodes, setNodes] = useState([
  //   {
  //     _id: "uwu",
  //     label: "Click Me!",
  //     revision: 0
  //   }
  // ]);

  const [edges, setEdges] = useState([]);
  const collection = useRef(new Collection(nodes));

  const [selectedNode, setSelectedNode] = useState("");
  // const links = useRef(new Collection(edges));

  // useEffect(() => {
  //   setInterval(() => {
  //     setNodes(n => [...n, { _id: Date.now(), revision: Date.now() }]);
  //   }, 10000);
  // }, []);

  useEffect(() => {
    collection.current.update(nodes);
  }, [nodes]);

  useTheForce(collection, edges);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "inherit",
        position: "relative",
        background: "rgba(16, 16, 16, 0)"
      }}
      ref={ref}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute"
        }}
      >
        {edges.map(e => {
          const x0 = e.source.x;
          const x1 = e.target.x;
          const y0 = e.source.y;
          const y1 = e.target.y;
          const w = width / 2;
          const h = height / 2;

          return (
            <Line
              borderColor="rgba(0, 0, 0, .12)"
              borderWidth={2}
              key={e._id}
              x0={w + x0}
              y0={h + y0}
              x1={w + x1}
              y1={h + y1}
            />
          );
        })}
      </div>
      <div style={{ position: "relative" }}>
        {collection.current.toArray().map(n => {
          return (
            <div
              key={n._id}
              style={{
                width: 128,
                height: 128,
                zIndex: 10,
                position: "absolute",
                top: `calc(${(height - 128) / 2}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                left: `calc(${(width - 128) / 2}px)`,
                transform: `translate3d(${n.x}px, ${n.y}px, 0)`
              }}
            >
              <Node
                style={{ position: "relative" }}
                selected={n._id === selectedNode}
                onClick={() => setSelectedNode(n._id)}
              >
                <Circle />
                <Label>{n.label || n._id}</Label>
              </Node>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectionEditor;
