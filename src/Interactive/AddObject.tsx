import React from "react";
import { useEditorContext } from "../useEditorContext";
import { fabric } from "fabric";

function AddObject() {
  const { canvas, setActiveObject } = useEditorContext();
  const addRect = () => {
    var rect = new fabric.Rect({
      left: 80,
      top: 80,
      fill: "red",
      width: 150,
      height: 150,
    });
    canvas?.add(rect);
    setActiveObject(rect);
  };
  const addCircle = () => {
    var circle = new fabric.Circle({
      left: 70,
      top: 70,
      radius: 50,
      fill: "green",
    });
    canvas?.add(circle);
    setActiveObject(circle);
  };
  const addImage = () => {
    fabric.Image.fromURL(
      "https://i.pinimg.com/564x/3e/c6/ef/3ec6efd19559dcee5ed8471075ba907a.jpg",
      function (img) {
        img.scale(0.3);
        canvas?.add(img);
        setActiveObject(img);
      },
      {
        left: 100,
        top: 100,
        crossOrigin: "anonymous",
      }
    );
  };

  const addText = () => {
    var text = new fabric.StaticText({
      text: "This is TEXT!!!!!!",
      fill: "#000",
      top: 100,
      left: 100,
      textAlign: "center",
      fontFamily: "Helvetica",
      fontWeight: "bold",
      // statefullCache: true,
      scaleX: 1,
      scaleY: 1,
      fontSize: 100,
    });
    canvas?.add(text);
    setActiveObject(text);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={() => addRect()}
      >
        add rect
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={() => addCircle()}
      >
        add circle
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={() => addImage()}
      >
        add image
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={() => addText()}
      >
        add text
      </button>
    </>
  );
}

export default AddObject;
