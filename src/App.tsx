import React, { useState, useEffect, useRef } from "react";
import MyCanvas from "./MyCanvas";
import { useEditorContext } from "./useEditorContext";
import FloatMenu from "./FloatMenu";
import Footer from "./Footer";
import AddObject from "./Interactive/AddObject";
import Group from "./Interactive/Group";
import { fabric } from "fabric";
import { isEqual } from "lodash";

function App() {
  const {
    canvas,
    positionFloatMenu,
    setPositionFloatMenu,
    setActiveObject,
    activeObject,
  } = useEditorContext();

  const inputJSON = useRef<HTMLInputElement>(null);

  const [sidebarActive, setSidebarActive] = useState<number | null>(1);
  const [jsonData, setJsonData] = useState<any>(null);
  useEffect(() => {
    if (!canvas) {
      return;
    }
    canvas.on("mouse:down", (e) => {
      if (setPositionFloatMenu) {
        setPositionFloatMenu({ top: null, left: null });
      }

      if (e.button === 1) {
        if (e.target) {
          setActiveObject(e.target);
        } else {
          setActiveObject(null);
        }
      }

      if (e.button === 3 && e.target) {
        if (e.pointer) {
          setPositionFloatMenu({ top: e.pointer.y, left: e.pointer.x });
        }
        setActiveObject(e.target);
        canvas.renderAll();
      }
    });

    return () => {
      canvas.off("mouse:down");
    };
  }, [canvas, setActiveObject, setPositionFloatMenu]);

  useEffect(() => {
    if (activeObject) {
      canvas?.setActiveObject(activeObject);
    }
  }, [activeObject, canvas]);

  // prevent right click default
  useEffect(() => {
    const handleContextmenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  const setPattern = (url: string) => {
    fabric.util.loadImage(url, (img) => {
      activeObject?.set(
        "fill",
        new fabric.Pattern({
          source: img,
          repeat: "repeat",
          offsetX: 200,
          offsetY: 0,
          crossOrigin: "anonymous",
        })
      );

      canvas?.requestRenderAll();
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (res) => {
        const result = res.target!.result as string;
        canvas?.clear();
        canvas?.loadFromJSON(result, () => {
          setTimeout(() => {
            canvas.renderAll();
          }, 1);
        });
      };
      reader.onerror = (err) => {
        console.log(err);
      };

      reader.readAsText(file);
    }
  };

  const handleExportJson = () => {
    // let data = canvas?.toJSON();
    // let data = JSON.stringify(canvas);

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(canvas));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "test-template.json";
    a.click();
  };

  return (
    <div className="flex flex-col bg-[#EBCA71] text-[#9C5C42] h-screen overflow-hidden">
      <h1 className="text-3xl font-bold my-5 text-center ">
        This is fabric demo
      </h1>

      <div className="flex bg-gray-100 relative">
        <MyCanvas />
        <FloatMenu top={positionFloatMenu.top} left={positionFloatMenu.left} />
        <div
          id="side-bar"
          className="p-2 flex flex-row flex-wrap gap-4 flex-1 self-start "
        >
          <div>
            <h2
              onClick={() => setSidebarActive((pre) => (pre !== 1 ? 1 : null))}
            >
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 hover:text-[#EBCA71]"
              >
                <span>Add Object to canvas</span>
              </button>
            </h2>
            {sidebarActive === 1 && (
              <div>
                <div className="flex flex-wrap gap-2 py-5 border-b border-gray-200">
                  <AddObject />
                </div>
              </div>
            )}
            {/* <h2
              onClick={() => setSidebarActive((pre) => (pre !== 2 ? 2 : null))}
            >
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
              >
                <span>Group</span>
              </button>
            </h2>
            {sidebarActive === 2 && (
              <div>
                <div className="flex flex-wrap gap-2 py-5 border-b border-gray-200 dark:border-gray-700">
                  <Group />
                </div>
              </div>
            )} */}
            <h2
              onClick={() => setSidebarActive((pre) => (pre !== 3 ? 3 : null))}
            >
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 hover:text-[#EBCA71]"
              >
                <span>Import / Export</span>
              </button>
            </h2>
            {sidebarActive === 3 && (
              <div>
                <div className="flex flex-wrap gap-2 py-5 border-b border-gray-200 dark:border-gray-700">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md "
                    onClick={(e) => handleExportJson()}
                  >
                    Export to json
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={(e) => {
                      inputJSON.current?.click();
                    }}
                  >
                    Import from json
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    multiple={false}
                    ref={inputJSON}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
            )}
            {/* patterns */}
            {activeObject && (
              <h2
                onClick={() =>
                  setSidebarActive((pre) => (pre !== 3 ? 3 : null))
                }
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                >
                  <span>Patterns</span>
                </button>
              </h2>
            )}
            {sidebarActive === 3 && activeObject && (
              <div>
                <div className="flex flex-wrap gap-2 py-5 border-b border-gray-200 dark:border-gray-700">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-md"
                    onClick={(e) => {
                      setPattern(
                        "https://i.pinimg.com/564x/23/17/f5/2317f526fa1e7757e1237980555287ce.jpg"
                      );
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/564x/23/17/f5/2317f526fa1e7757e1237980555287ce.jpg"
                      alt=""
                      style={{
                        width: "80px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-md"
                    onClick={(e) => {
                      setPattern(
                        "https://i.pinimg.com/564x/a4/4f/19/a44f197958fb1fcc2de6d04d33e2828b.jpg"
                      );
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/564x/a4/4f/19/a44f197958fb1fcc2de6d04d33e2828b.jpg"
                      alt=""
                      style={{
                        width: "80px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-md"
                    onClick={(e) => {
                      setPattern(
                        "https://i.pinimg.com/564x/c3/a2/4d/c3a24d669f7023eaae3132d40b7181e7.jpg"
                      );
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/564x/c3/a2/4d/c3a24d669f7023eaae3132d40b7181e7.jpg"
                      alt=""
                      style={{
                        width: "80px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
