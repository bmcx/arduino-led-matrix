const emptyGrid = (rows, cols) => {
  const out = [];
  if (!isNaN(rows) && !isNaN(cols)) {
    for (let i = 0; i < rows; i++) {
      const c = [];
      for (let j = 0; j < cols; j++) {
        c.push(false);
      }
      out.push(c);
    }
  }
  return out;
};

export default emptyGrid