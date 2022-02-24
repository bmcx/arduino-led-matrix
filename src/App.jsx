import { useEffect, useState } from "react";
import GeneratedCode from "./components/GeneratedCode";
import MiniPreview from "./components/MiniPreview";
import emptyGrid from "./utils/emptyGrid";

function App() {
  const [rows, setRows] = useState(window.localStorage.getItem("rows") ?? 8);
  const [cols, setCols] = useState(window.localStorage.getItem("cols") ?? 8);
  const lsBase = window.localStorage.getItem("base");
  const [base, setBase] = useState(lsBase ? JSON.parse(lsBase) : []);
  const lsSaved = window.localStorage.getItem("saved");
  const [saved, setSaved] = useState(lsSaved ? JSON.parse(lsSaved) : []);

  const updateBase = (data) => {
    setBase(data);
    window.localStorage.setItem("base", JSON.stringify(data));
  };

  const updateRows = (val) => {
    setRows(parseInt(val ?? "0"));
    window.localStorage.setItem("rows", val ?? "0");
  };

  const updateCols = (val) => {
    setCols(parseInt(val ?? "0"));
    window.localStorage.setItem("cols", val ?? "0");
  };

  useEffect(() => {
    if (!isNaN(rows) && !isNaN(cols)) {
      const out = [];
      for (let i = 0; i < rows; i++) {
        const c = [];
        for (let j = 0; j < cols; j++) {
          c.push(base && base[i] && base[i][j] ? base[i][j] : false);
        }
        out.push(c);
      }
      updateBase(out);
    }
  }, [rows, cols]);

  const toggleItem = (row, col, state) => {
    const out = [];
    for (let i = 0; i < rows; i++) {
      const c = [];
      for (let j = 0; j < cols; j++) {
        c.push(i == row && j == col ? !base[row][col] : base[i][j]);
      }
      out.push(c);
    }
    updateBase(out);
  };

  const addToSaved = () => {
    const items = [...saved];
    items.push(base);
    setSaved(items);
    window.localStorage.setItem("saved", JSON.stringify(items));
  };

  const deleteFromSaved = async (index) => {
    const ans = await window.confirm(
      "This will remove selected item, Are you sure?"
    );
    if (ans) {
      const items = [...saved];
      items.splice(index, 1);
      setSaved(items);
      window.localStorage.setItem("saved", JSON.stringify(items));
    }
  };

  const resetDesign = async () => {
    const ans = await window.confirm(
      "This will reset the design, Are you sure?"
    );
    if (ans) {
      setBase(emptyGrid(rows, cols));
      window.localStorage.setItem(
        "base",
        JSON.stringify(emptyGrid(rows, cols))
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center max-w-5xl mx-auto space-y-4">
        <div className="flex flex-row items-center px-3 py-2 space-x-4">
          <div>
            Rows:{" "}
            <input
              type="number"
              className="text-right rounded-md bg-sky-50"
              min={0}
              max={100}
              value={rows}
              onChange={(e) => updateRows(e.target.value)}
            />
          </div>
          <div>
            Cols:{" "}
            <input
              type="number"
              className="text-right rounded-md bg-sky-50"
              min={0}
              max={100}
              value={cols}
              onChange={(e) => updateCols(e.target.value)}
            />
          </div>
          <button
            onClick={resetDesign}
            className="px-2 py-1 rounded-md hover:bg-red-200"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col space-y-1">
          {base &&
            base?.map((row, i) => (
              <div key={`r${i}`} className="flex flex-row space-x-1">
                {row &&
                  row.map((col, j) => (
                    <div
                      key={`c${i}${j}`}
                      className={`h-8 w-8 cursor-pointer rounded-full ${
                        col ? "bg-black" : "bg-gray-300"
                      }`}
                      onClick={() => toggleItem(i, j)}
                    ></div>
                  ))}
              </div>
            ))}
        </div>
        <GeneratedCode base={base} />
        <button
          className="px-3 py-2 text-white rounded-md bg-sky-400 hover:bg-sky-500"
          onClick={addToSaved}
        >
          Save
        </button>
        <div>
          {saved && saved.length > 0 && (
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center space-x-1">
                {" "}
                <span>Saved</span>{" "}
                <span className="text-sm">[{saved.length}]</span>:{" "}
              </div>
              {saved.map((s, i) => (
                <div
                  key={`s${i}`}
                  className="flex flex-row items-center pr-2 rounded-md bg-sky-50"
                >
                  <MiniPreview base={s} />
                  <GeneratedCode base={s} />
                  <button
                    onClick={() => deleteFromSaved(i)}
                    className="px-2 py-1 rounded-md select-none hover:bg-red-200"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
