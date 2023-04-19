import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";
import { useEditorContext } from "./useEditorContext";

function MyCanvas() {
  const { canvas, setCanvas } = useEditorContext();

  useEffect(() => {
    setCanvas(initCanvas());

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "blue";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.padding = 10;

    fabric.Object.prototype.controls.mtr = new fabric.Control({
      ...fabric.Object.prototype.controls.mtr,
      cursorStyle: "grabbing",
    });
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 1500,
      backgroundColor: "white",
      fireRightClick: true,
    });
  return <canvas id="canvas" style={{ border: "1px solid #EBCA71" }} />;
}

export default MyCanvas;
