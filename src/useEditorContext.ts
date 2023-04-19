import { useContext } from "react";
import { EditorContext } from "./EditorContext";

export function useEditorContext() {
  const {
    setCanvas,
    canvas,
    positionFloatMenu,
    setPositionFloatMenu,
    activeObject,
    setActiveObject,
  } = useContext(EditorContext);

  return {
    setCanvas,
    canvas,
    positionFloatMenu,
    setPositionFloatMenu,
    activeObject,
    setActiveObject,
  };
}
