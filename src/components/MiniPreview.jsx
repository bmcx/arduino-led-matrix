import React from "react";

const MiniPreview = ({ base }) => {
  return (
    <div className="p-1 min-w-fit flex flex-col">
      {base &&
        base?.map((row, i) => (
          <div key={`r${i}`} className="flex flex-row">
            {row &&
              row.map((col, j) => (
                <div
                  key={`c${i}${j}`}
                  style={{
                    height: "6px",
                    width: "6px",
                    backgroundColor: col ? "black" : "#ccc",
                    borderRadius: "6px",
                  }}
                ></div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default MiniPreview;
