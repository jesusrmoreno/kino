import { useEffect, useState } from "react";
import { Atom, useAtom, deref, swap as baseSwap } from "@dbeining/react-atom";
import { generate as shortId } from "shortid";

import get from "lodash/get";
import lf from "localforage";

const items = Atom.of({});

const swap = async (atom, stateFn) => {
  
  const newState = stateFn(deref(atom));
  console.log(newState);
  await lf.setItem("v1", newState);
  swap(atom, () => newState);
};

export const writeItem = ({ id, value, title, createdAt = Date.now() }) => {
  swap(items, s => {
    return {
      ...s,
      [id]: {
        value,
        title,
        createdAt,
        id,
        updatedAt: Date.now()
      }
    };
  });
};

export const useDocuments = () => [];
export const setSelectedDocument = id => {};
