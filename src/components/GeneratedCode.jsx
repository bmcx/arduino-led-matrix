import React from "react";

const GeneratedCode = ({ base }) => {
  const getCode = () => {
    // start the line
    let out = `byte design[${base.length}] = { `;
    for (let i = 0; i < base.length; i++) {
      for (let j = 0; j < base[i].length; j++) {
        // prepend every binary line with b
        if (j === 0) out += "B";
        // append 0 or 1 based on the current value
        out += base[i][j] ? 1 : 0;
      }
      // add comma for all lines except the last
      if (i !== base.length - 1) out += ", ";
    }
    // close the declaration
    out += " };";
    return out;
  };
  return (
    <pre className="px-2 py-1 font-mono text-sm whitespace-pre-wrap rounded-md bg-sky-50">{getCode()}</pre>
  );
};

export default GeneratedCode;
