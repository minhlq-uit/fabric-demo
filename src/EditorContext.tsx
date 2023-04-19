import { FC, createContext, useState } from "react";
import { fabric } from "fabric";

export interface IEditorContext {
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas) => void;
  positionFloatMenu: { top: number | null; left: number | null };
  setPositionFloatMenu: ({
    top,
    left,
  }: {
    top: number | null;
    left: number | null;
  }) => void;
  activeObject: fabric.Object | null;
  setActiveObject: (object: fabric.Object | null) => void;
}

export const EditorContext = createContext<IEditorContext>({
  canvas: null,
  setCanvas: () => {},
  positionFloatMenu: { top: null, left: null },
  setPositionFloatMenu: () => {},
  activeObject: null,
  setActiveObject: () => {},
});
export const EditorProvider = ({ children }: { children: JSX.Element }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [positionFloatMenu, setPositionFloatMenu] = useState<{
    top: number | null;
    left: number | null;
  }>({ top: null, left: null });
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  const context = {
    canvas,
    setCanvas,
    positionFloatMenu,
    setPositionFloatMenu,
    activeObject,
    setActiveObject,
  };

  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
};
