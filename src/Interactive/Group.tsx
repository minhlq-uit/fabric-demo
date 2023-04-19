import React from "react";
import { useEditorContext } from "../useEditorContext";
import { fabric } from "fabric";

function Group() {
  const { canvas, setActiveObject } = useEditorContext();
  const addToGroup = () => {
    if (!canvas?.getActiveObject()) {
      return;
    }
    if (canvas?.getActiveObject()?.type !== "activeSelection") {
      return;
    }
    // @ts-ignore
    canvas?.getActiveObject()?.toGroup();
    canvas.requestRenderAll();
  };

  const unGroup = () => {
    if (!canvas?.getActiveObject()) {
      return;
    }
    if (canvas?.getActiveObject()?.type !== "group") {
      return;
    }
    // @ts-ignore
    canvas?.getActiveObject()?.toActiveSelection();
    canvas.requestRenderAll();
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={() => addToGroup()}
      >
        add to group
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => unGroup()}
      >
        ungroup
      </button>
    </>
  );
}

export default Group;
