import { Atom, useAtom, swap } from "@dbeining/react-atom";

const mode = {
  view: "view-only",
  connect: "connect"
};

const state = Atom.of({
  mode: mode.view,
  connect_source: null,
  connect_target: null
});

export const setMode = mode => swap(state, s => ({ ...s, mode }));

export const setConnectionSource = source =>
  swap(state, s => ({ ...s, connect_source: source }));

export const setConnectionTarget = source =>
  swap(state, s => ({ ...s, connect_target: source }));

export const useEditorState = () => {
  const { mode, connect_source, connect_target } = useAtom(state);

  return {
    mode,
    connect_source,
    connect_target
  };
};
