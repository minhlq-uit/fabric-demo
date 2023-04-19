import React, { useEffect, useState } from "react";
import { useEditorContext } from "./useEditorContext";
import { HexColorPicker } from "react-colorful";
import { fabric } from "fabric";
function Footer() {
  const { activeObject, canvas, setActiveObject } = useEditorContext();
  const [colorFill, setColorFill] = useState<string | undefined>("#000");
  const [colorBg, setColorBg] = useState<string | undefined>("#000");
  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const [fontSize, setFontSize] = useState<number | undefined>(undefined);
  const [brightness, setBrightness] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (
      activeObject?.type === "rect" ||
      activeObject?.type === "circle" ||
      activeObject?.type === "text" ||
      activeObject?.type === "StaticText" ||
      activeObject?.type === "textbox" ||
      activeObject?.type === "image"
    ) {
      setIsShowColorPicker(true);
    }

    if (activeObject && typeof activeObject.fill === "string") {
      // @ts-ignore
      setColorFill(activeObject.fill);
    }
    if (activeObject && typeof activeObject.backgroundColor === "string") {
      // @ts-ignore
      setColorBg(activeObject.backgroundColor);
    }
  }, [activeObject]);

  const updateFill = (color: string) => {
    if (activeObject) {
      activeObject.set("fill", color);
      canvas?.renderAll();
    }
    setColorFill(color);
  };
  const updateBg = (color: string) => {
    if (activeObject) {
      activeObject.set("backgroundColor", color);
      canvas?.renderAll();
    }
    setColorBg(color);
  };

  const flipX = () => {
    if (activeObject) {
      activeObject.set("flipX", !activeObject.flipX);
      canvas?.renderAll();
    }
  };

  const flipY = () => {
    if (activeObject) {
      activeObject.set("flipY", !activeObject.flipY);
      canvas?.renderAll();
    }
  };
  return (
    <div className="flex-1 py-2 px-6 flex flex-row gap-24 items-center">
      {isShowColorPicker && activeObject && activeObject.type !== "image" && (
        <div className="flex flex-col gap-2 text-center">
          <HexColorPicker color={colorFill} onChange={(e) => updateFill(e)} />
          <span className="font-bold text-xl">Change Fill</span>
        </div>
      )}

      {isShowColorPicker &&
        activeObject &&
        activeObject.type !== "rect" &&
        activeObject.type !== "circle" &&
        activeObject.type !== "image" && (
          <div className="flex flex-col gap-2 text-center">
            <HexColorPicker color={colorBg} onChange={(e) => updateBg(e)} />
            <span className="font-bold text-xl">Change Background</span>
          </div>
        )}
      {activeObject &&
        (activeObject.type === "image" ||
          activeObject.type === "textbox" ||
          activeObject.type === "StaticText" ||
          activeObject.type === "text") && (
          <>
            <div className="flex flex-col gap-2 text-center">
              <button
                onClick={() => flipY()}
                className="w-[100px] h-[100px] hover:scale-[1.1]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="flip-h"
                >
                  <path
                    fill="#000"
                    d="M21,11H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2ZM10.93,9h1.5a1,1,0,0,0,0-2h-1.5a1,1,0,0,0,0,2Zm4.5-1a1,1,0,0,0,1,1H17a1,1,0,0,0,.92-.62,1,1,0,0,0-.21-1.09l-.66-.65a1,1,0,0,0-1.41,0,1,1,0,0,0-.19,1.15A1.49,1.49,0,0,0,15.43,8ZM11.65,4.77,12,4.41l.81.81a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41L13.16,2.75a.91.91,0,0,0-.26-.19,1,1,0,0,0-1.61-.27L10.23,3.35a1,1,0,0,0,1.42,1.42ZM17,15H7a1,1,0,0,0-.92.62,1,1,0,0,0,.21,1.09l5,5a1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-1.09A1,1,0,0,0,17,15Zm-5,4.59L9.41,17h5.18ZM7.05,9a1,1,0,0,0,.71-.29L8.82,7.6A1,1,0,0,0,7.4,6.18L6.34,7.24a1,1,0,0,0,0,1.42A1,1,0,0,0,7.05,9Z"
                  ></path>
                </svg>
              </button>
              <span className="font-bold text-xl">Flip Y</span>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <button
                onClick={() => flipX()}
                className="w-[100px] h-[100px] hover:scale-[1.1]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="flip-v"
                >
                  <path
                    fill="#000"
                    d="M7.6,15.18A1,1,0,0,0,6.18,16.6l1.06,1.06a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM3.81,9.78,2.75,10.84a.91.91,0,0,0-.19.26,1,1,0,0,0-.27,1.61l1.06,1.06a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L4.41,12l.81-.81A1,1,0,0,0,3.81,9.78ZM8,10.57a1,1,0,0,0-1,1v1.5a1,1,0,0,0,2,0v-1.5A1,1,0,0,0,8,10.57Zm13.71.72-5-5a1,1,0,0,0-1.09-.21A1,1,0,0,0,15,7V17a1,1,0,0,0,.62.92A.84.84,0,0,0,16,18a1,1,0,0,0,.71-.29l5-5A1,1,0,0,0,21.71,11.29ZM17,14.59V9.41L19.59,12ZM12,2a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V3A1,1,0,0,0,12,2ZM8.38,6.08a1,1,0,0,0-1.09.21L6.64,7a1,1,0,0,0,0,1.41,1,1,0,0,0,.7.3,1,1,0,0,0,.45-.11A1,1,0,0,0,9,7.57V7A1,1,0,0,0,8.38,6.08Z"
                  ></path>
                </svg>
              </button>
              <span className="font-bold text-xl">Flip X</span>
            </div>
            {activeObject.type === "image" && (
              <div className="flex flex-col gap-2 text-center">
                <input
                  type="range"
                  value={brightness}
                  min={-1}
                  max={1}
                  step={0.1}
                  onChange={(e) => {
                    var filter = new fabric.Image.filters.Brightness({
                      brightness: +e.target.value,
                    });
                    // @ts-ignore
                    activeObject.filters = [];
                    // @ts-ignore
                    activeObject.filters.push(filter);
                    // @ts-ignore
                    activeObject.applyFilters();
                    canvas?.renderAll();
                    setBrightness(+e.target.value);
                    console.log(activeObject);
                  }}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer "
                />
                <span className="font-bold text-xl">Change Brightness</span>
              </div>
            )}
          </>
        )}

      {activeObject &&
        (activeObject.type === "textbox" ||
          activeObject.type === "StaticText") && (
          <>
            <div className="flex flex-col gap-2 text-center">
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => {
                    // @ts-ignore
                    activeObject.set("textAlign", "left");
                    canvas?.renderAll();
                  }}
                  className="w-[50px] h-[50px] hover:scale-[1.1]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="align-left"
                  >
                    <path
                      fill="#000"
                      d="M3,7H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,7Zm0,4H17a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm18,2H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-4,4H3a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    // @ts-ignore
                    activeObject.set("textAlign", "center");
                    canvas?.renderAll();
                  }}
                  className="w-[50px] h-[50px] hover:scale-[1.1]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="align-center-alt"
                  >
                    <path
                      fill="#000"
                      d="M5,8H19a1,1,0,0,0,0-2H5A1,1,0,0,0,5,8Zm16,3H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-2,5H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    // @ts-ignore
                    activeObject.set("textAlign", "right");
                    canvas?.renderAll();
                  }}
                  className="w-[50px] h-[50px] hover:scale-[1.1]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="align-right"
                  >
                    <path
                      fill="#000"
                      d="M3,7H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,7ZM21,17H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-8H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0,4H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                    ></path>
                  </svg>
                </button>
              </div>
              <span className="font-bold text-xl">Text align</span>
            </div>

            <div className="flex flex-col gap-2 text-center relvative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={fontSize}
                onChange={(e) => {
                  // @ts-ignore
                  activeObject.set("fontSize", +e.target.value);
                  canvas?.renderAll();
                  setFontSize(+e.target.value);
                }}
              />
              <span className="font-bold text-xl">Font size</span>
            </div>
          </>
        )}
    </div>
  );
}

export default Footer;
