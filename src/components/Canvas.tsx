import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface Point {
  x: number;
  y: number;
}

interface DrawingState {
  lines: Point[][];
  currentLine: Point[];
  undoneLines: Point[][];
}

const Canvas = ({
  setSelectedImage,
}: {
  setSelectedImage: Dispatch<SetStateAction<File | undefined>>;
}) => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>({
    lines: [],
    currentLine: [],
    undoneLines: [],
  });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;

    const draw = () => {
      const context = canvas.getContext("2d");

      if (!context) return;

      // Clear the canvas with a white fill
      context.fillStyle = "#ffffff"; // Set to white
      context.fillRect(0, 0, canvas.width, canvas.height);

      drawingState.lines.forEach((line) => {
        context.beginPath();
        line.forEach(({ x, y }, index) => {
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.stroke();
      });

      if (drawingState.currentLine.length > 0) {
        context.beginPath();
        drawingState.currentLine.forEach(({ x, y }, index) => {
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.stroke();
      }
    };

    draw();
  }, [drawingState]);

  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    setDrawingState((prevState) => ({
      ...prevState,
      currentLine: [{ x: offsetX, y: offsetY }],
    }));
    setIsDrawing(true);
  };

  const continueDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    setDrawingState((prevState) => ({
      ...prevState,
      currentLine: [...prevState.currentLine, { x: offsetX, y: offsetY }],
    }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      setDrawingState((prevState) => ({
        lines: [...prevState.lines, prevState.currentLine],
        currentLine: [],
        undoneLines: [],
      }));
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dataUrl = canvas.toDataURL("image/png");
      const randomString = Math.random().toString(36).substring(7);
      const file = dataURLtoFile(dataUrl, `drawing_${randomString}.png`);

      setSelectedImage(file);
    }
  };

  const undo = () => {
    setDrawingState((prevState) => ({
      lines: prevState.lines.slice(0, -1),
      currentLine: [],
      undoneLines: [...prevState.undoneLines, prevState.lines.slice(-1)[0]],
    }));
  };

  const redo = () => {
    if (drawingState.undoneLines.length === 0) return;

    setDrawingState((prevState) => ({
      lines: [...prevState.lines, prevState.undoneLines.slice(-1)[0]],
      currentLine: [],
      undoneLines: prevState.undoneLines.slice(0, -1),
    }));
  };

  const erase = () => {
    setDrawingState({
      lines: [],
      currentLine: [],
      undoneLines: [],
    });
  };

  const save = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/jpeg"); // Use 'image/jpeg' instead of 'image/png'
    const link = document.createElement("a");
    link.href = dataUrl;
    const randomString = Math.random().toString(36).substring(7);
    link.download = `drawing_${randomString}.jpg`; // Use '.jpg' as the file extension
    link.click();
  };

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    const canvas = canvasRef.current;

    if (canvasContainer && canvas) {
      canvas.width = canvasContainer.clientWidth;
    }
  }, [canvasContainerRef]);

  return (
    <div
      ref={canvasContainerRef}
      style={{ position: "relative", width: "100%" }}
    >
      <canvas
        ref={canvasRef}
        height={300}
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        style={{ border: "2px solid #000", width: "100%" }}
      />
      <div className="space-x-2 mt-1">
        <button className="canvas-button" onClick={undo}>
          Undo
        </button>
        <button className="canvas-button" onClick={redo}>
          Redo
        </button>
        <button className="canvas-button" onClick={erase}>
          Erase
        </button>
        <button className="canvas-button" onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Canvas;
