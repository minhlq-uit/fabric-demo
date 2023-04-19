import React, { useEffect, useRef } from "react";
import { useEditorContext } from "./useEditorContext";
import { fabric } from "fabric";

function FloatMenu({ top, left }: { top: number | null; left: number | null }) {
  const floatMenu = useRef<HTMLDivElement>(null);
  const { canvas, setPositionFloatMenu, setActiveObject, activeObject } =
    useEditorContext();
  useEffect(() => {
    if (floatMenu.current && top !== null && left !== null) {
      floatMenu.current.style.top = `${top}px`;
      floatMenu.current.style.left = `${left}px`;
    }
  }, [top, left]);

  const sendBackward = () => {
    var activeObject = canvas?.getActiveObject();

    if (activeObject) {
      canvas?.sendBackwards(activeObject);
      canvas?.discardActiveObject();
      canvas?.renderAll();
      setPositionFloatMenu({ top: null, left: null });
    }
  };

  const bringForward = () => {
    var activeObject = canvas?.getActiveObject();

    if (activeObject) {
      canvas?.bringForward(activeObject);
      canvas?.discardActiveObject();
      canvas?.renderAll();
      setPositionFloatMenu({ top: null, left: null });
    }
  };

  const duplicate = () => {
    var obj = canvas?.getActiveObject();
    var clone = fabric.util.object.clone(obj);
    clone.set({ left: 100, top: 100 });
    canvas?.add(clone);
    canvas?.discardActiveObject();
    setPositionFloatMenu({ top: null, left: null });
  };

  const deleteObject = () => {
    var obj = canvas?.getActiveObject();
    if (obj) {
      canvas?.remove(obj);
      setActiveObject(null);
    }
    setPositionFloatMenu({ top: null, left: null });
  };

  return (
    <div
      ref={floatMenu}
      className={` ${
        top !== null && left !== null ? "absolute" : "hidden"
      }  z-1 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44`}
    >
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
        <li
          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => bringForward()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="bring-front"
            className="inline-block w-[20px] h-[20px]"
          >
            <path
              fill="#000"
              d="M11.29,17.3,10,18.59V7A1,1,0,0,0,8,7v11.6L6.71,17.3a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l3,3a1,1,0,0,0,1.42,0l3-3a1,1,0,0,0,0-1.41A1,1,0,0,0,11.29,17.3ZM22,3a1,1,0,0,0-1-1H3A1,1,0,0,0,2,3V9a1,1,0,0,0,1,1H5A1,1,0,0,0,5,8H4V4H20V8H13a1,1,0,0,0,0,2h1v5a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V9h0ZM20,14H16V10h4Z"
            ></path>
          </svg>
          Bring Forward
        </li>
        <li
          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => sendBackward()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="bring-bottom"
            className="inline-block w-[20px] h-[20px]"
          >
            <path
              fill="#000"
              d="M21,14H19a1,1,0,1,0,0,2h1v4H4V16h7a1,1,0,0,0,0-2H10V9A1,1,0,0,0,9,8H3A1,1,0,0,0,2,9v6H2v6a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V15A1,1,0,0,0,21,14ZM4,10H8v4H4ZM12.71,6.7,14,5.41V17a1,1,0,1,0,2,0V5.41L17.29,6.7A1,1,0,0,0,18,7a1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-3-3a1,1,0,0,0-1.42,0l-3,3a1,1,0,0,0,0,1.41A1,1,0,0,0,12.71,6.7Z"
            ></path>
          </svg>
          Send Backward
        </li>
        <li
          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => duplicate()}
        >
          <i className="fa-solid fa-copy w-[20px] h-[20px]"></i>Duplicate
        </li>
        <li
          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => deleteObject()}
        >
          <i className="fa-solid fa-trash w-[20px] h-[20px]"></i>Delete
        </li>
      </ul>
    </div>
  );
}

export default FloatMenu;
