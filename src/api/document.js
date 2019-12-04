import { Atom, useAtom, swap } from "@dbeining/react-atom";
import { useState, useEffect } from "react";

const stateAtom = Atom.of({
  updated: Date.now()
});

export const useDocuments = () => {
  const { updated } = useAtom(stateAtom);
  const [res, setRes] = useState([]);

  useEffect(() => {
    getDocuments().then(docs => {
      setRes(docs);
    });
  }, [updated]);
  return res;
};

export const useDocumentById = id => {
  const { updated } = useAtom(stateAtom);
  const [v, s] = useState(null);

  useEffect(() => {
    getDocumentById(id).then(doc => {
      s(doc);
    });
  }, [updated, id]);
  return v;
};

const updateEndpoint = "http://localhost:8000/api/v1/document";
const collectionEndpoint = "http://localhost:8000/api/v1/documents";
const decodeDocument = doc => {
  try {
    return {
      ...doc,
      content: JSON.parse(doc.content)
    };
  } catch (e) {
    throw new Error("Corrupt Document");
  }
};

const post = async (endpoint, body) =>
  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

export const saveDocument = async ({ title, content, text, _id = null }) => {
  try {
    const res = await post(updateEndpoint, {
      title,
      content,
      text,
      _id
    }).then(r => r.json());

    swap(stateAtom, s => ({ updated: Date.now() }));
    return decodeDocument(res);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getDocumentById = async id => {
  try {
    const res = await fetch(collectionEndpoint).then(r => r.json());
    const d = res.filter(r => r._id === id)[0];
    return decodeDocument(d);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const getDocuments = async () => {
  try {
    const res = await fetch(collectionEndpoint).then(r => r.json());
    return res;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
