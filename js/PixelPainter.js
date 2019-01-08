const pixelPainter = ((iWidth, iHeight) => {
  const arrMemory = [];
  const pp = document.getElementById("pixelPainter");

  const topOuterPanel = document.createElement("div");
  topOuterPanel.id = "topOuterPanel";
  const bottomOuterPanel = document.createElement("div");
  bottomOuterPanel.id = "bottomOuterPanel";
  const leftPanel = document.createElement("div"); // contains colorPalette and buttons
  leftPanel.id = "leftPanel";

  const rightPanel = document.createElement("div"); // contains the grid and save/load buttons
  rightPanel.id = "rightPanel";

  let bPortraitOrientation = false;
  if (iWidth > iHeight) {
    bPortraitOrientation = false;
  } else {
    bPortraitOrientation = true;
  }
  let paintColor = "black";
  const arrColors = [
    "red",
    "green",
    "blue",
    "purple",
    "orange",
    "yellow",
    "white",
    "pink",
    "lightblue",
    "gray",
    "lightgray",
    "brown",
    "violet",
    "lightgreen",
    "darkgreen",
    "darkblue",
    "aquamarine",
    "darkgray",
    "black",
    "skyblue",
    "cyan",
    "darkred",
    "turquoise",
    "beige",
    "gold"
  ];

  // Padding
  const p = 0;

  let bMouseClicked = false;
  let bMouseReleased = true;
  function cloneGrid(oldGrid) {
    // const id = grid.id;
    const id = oldGrid.id + bottomOuterPanel.children.length;
    const gridClass = oldGrid.dataset["gridClass"];
    const boxClass = oldGrid.dataset["boxClass"];
    // console.log("boxClass:", boxClass);
    const iColumns = oldGrid.dataset["iColumns"];
    const iRows = oldGrid.dataset["iRows"];
    const newGrid = createGrid(iColumns, iRows, gridClass, boxClass, id);
    // console.log("newGrid:", newGrid);
    leftPanel.appendChild(newGrid);
    let arrOldGrid = oldGrid.children;
    let arrNewGrid = newGrid.children;
    for (let row = 0; row < arrOldGrid.length; row++) {
      let arrNewGridRow = arrNewGrid[row];
      let arrOldGridRow = arrOldGrid[row];
      arrNewGridRow.backgroundColor = arrOldGridRow.backgroundColor;
      arrNewGridRow.id = arrOldGridRow.id;
      arrNewGridRow.classList = arrOldGridRow.classList;
      let arrOldGridCells = arrOldGridRow.children;
      let arrNewGridCells = arrNewGridRow.children;
      for (let col = 0; col < arrOldGridCells.length; col++) {
        let oldCell = arrOldGridCells[col];
        let newCell = arrNewGridCells[col];
        newCell.style.backgroundColor = oldCell.style.backgroundColor;
        newCell.id = oldCell.id;
        newCell.classList = oldCell.classList;
      }
    }
    return newGrid;
  }
  function createGrid(
    iColumns,
    iRows,
    gridClass,
    boxClass,
    id,
    bAddEventListeners = false
  ) {
    const grid = document.createElement("div"); // Box width and height
    grid.classList = "container " + gridClass;
    grid.id = id;
    grid.dataset["gridClass"] = gridClass;
    grid.dataset["boxClass"] = boxClass;
    grid.dataset["iColumns"] = iColumns;
    grid.dataset["iRows"] = iRows;
    let iBoxCounter = 0;
    // create row
    for (let y = 0; y < iRows; y++) {
      const row = document.createElement("div");
      row.id = "row" + y;
      row.className = "row";
      row.width = grid.width;
      for (let x = 0; x < iColumns; x++) {
        let box = createBox(boxClass);
        switch (gridClass) {
          case "canvas":
            box.id = "box" + iBoxCounter.toString();
            if (bAddEventListeners) {
              box.addEventListener("mouseover", changeColor);
              box.addEventListener("click", changeColor);
              box.addEventListener("mousedown", onMouseDown);
              box.addEventListener("mouseup", onMouseUp);
              box.setAttribute("paintable", "");
            }
            break;
          case "palette":
            box.style = "background-color:" + arrColors[iBoxCounter];
            box.addEventListener("click", setColor);
            break;
        }
        row.appendChild(box);
        iBoxCounter++;
      }
      grid.appendChild(row);
    }
    return grid;
  }

  function createBox(boxClass) {
    let box = document.createElement("span");
    box.classList = boxClass;
    return box;
  }
  function onMouseDown() {
    bMouseReleased = false;
  }
  function onMouseUp() {
    bMouseReleased = true;
  }
  function changeColor(evt) {
    if (bMouseReleased === false || evt.type == "click") {
      this.style.backgroundColor = paintColor;
    }
    // this.style.backgroundColor = paintColor;
  }
  function setColor() {
    paintColor = this.style.backgroundColor;
    paintBox.style.backgroundColor = paintColor;
    paintBoxLabel.innerHTML = paintColor;
  }
  function toggleMouseClick(e) {
    bMouseClicked = !bMouseClicked;
  }
  function toggleOrientation(e) {
    bPortraitOrientation = !bPortraitOrientation;
  }
  function erase() {
    paintColor = "white";
    paintBox.style.backgroundColor = paintColor;
    paintBoxLabel.innerHTML = paintColor;
  }
  function clear() {
    arrCanvasBoxes = document.querySelectorAll("span[paintable].box.canvas");
    console.log(arrCanvasBoxes);
    for (let i = 0; i < arrCanvasBoxes.length; i++) {
      arrCanvasBoxes[i].style.backgroundColor = "white";
    }
    // arrCanvasBoxes.map(obj => {
    //   obj.style.backgroundColor = "white";
    //   return obj;
    // });
  }
  function saveGrid() {
    let snapshot = {};
    snapshot["timestamp"] = Date.now();
    const x = cloneGrid(canvas);
    // snapshot["canvas"] =
    console.log("canvas:", canvas);
    console.log("clone:", x);
    bottomOuterPanel.appendChild(x);

    arrMemory.push(snapshot);
    // bottomOuterPanel.appendChild(snapshot);
    btnLoadLastGrid.disabled = false;
  }
  /*
  const mapCopy = (object, callback) => {
    return Object.keys(object).reduce(function(output, key) {
      output[key] = callback.call(this, object[key]);
      return output;
    }, {});
  };
  function shallowCopy(src) {
    return Object.assign({}, src);
  }*/
  function loadGrid() {
    if (arrMemory.length > 0) {
      let snapshot = arrMemory.pop();
      // canvas = snapshot;
      rightPanel.removeChild(canvas);
      rightPanel.appendChild(snapshot);
    }
  }
  function addBorderTest() {
    canvas.classList += " borderTest";
    colorPalette.classList += " borderTest";
    savePanel.classList += " borderTest";
    colorBoxPanel.classList += " borderTest";
    leftPanel.classList += " borderTest";
    rightPanel.classList += " borderTest";
    paintBoxRow.classList += " borderTest";
    topOuterPanel.classList += " borderTest";
    bottomOuterPanel.classList += " borderTest";
    pp.classList += " container borderTest";
  }
  let canvas = createGrid(
    iWidth,
    iHeight,
    "canvas",
    "box canvas",
    "canvas",
    true
  );
  const colorPalette = createGrid(5, 5, "palette", "box paletteBox", "palette");
  const paletteLabel = document.createElement("div");
  paletteLabel.innerHTML = "Color Palette";
  paletteLabel.id = "paletteLabel";
  leftPanel.appendChild(paletteLabel);
  leftPanel.appendChild(colorPalette);
  const btnErase = document.createElement("button");
  btnErase.innerHTML = "Erase";
  btnErase.addEventListener("click", erase);
  const btnClear = document.createElement("button");
  btnClear.innerHTML = "Clear";
  btnClear.addEventListener("click", clear);
  leftPanel.appendChild(btnErase);
  leftPanel.appendChild(btnClear);
  const colorBoxPanel = document.createElement("div");
  const colorBoxLabel = document.createElement("div");
  colorBoxLabel.id = "colorBoxLabel";
  colorBoxLabel.innerHTML = "Paint Color:";
  const paintBoxRow = document.createElement("div");
  paintBoxRow.id = "paintBoxRow";
  const paintBox = createBox("box paletteBox");
  const paintBoxLabel = document.createElement("label");
  paintBoxLabel.id = "paintBoxLabel";
  colorBoxPanel.id = "colorBoxPanel";
  paintBoxLabel.innerHTML = paintColor;
  paintBox.id = "paintBox";
  paintBoxRow.appendChild(paintBoxLabel);
  paintBoxRow.appendChild(paintBox);
  colorBoxPanel.appendChild(colorBoxLabel);
  colorBoxPanel.appendChild(paintBoxRow);
  leftPanel.appendChild(colorBoxPanel);
  const btnSave = document.createElement("button");
  const btnLoadLastGrid = document.createElement("button");
  btnSave.id = "btnSave";
  btnSave.innerHTML = "Save Image";
  btnSave.addEventListener("click", saveGrid);
  btnLoadLastGrid.id = "btnLoadLastGrid";
  btnLoadLastGrid.innerHTML = "Load Saved Image";
  btnLoadLastGrid.disabled = true;
  btnLoadLastGrid.addEventListener("click", loadGrid);
  rightPanel.appendChild(canvas);
  const savePanel = document.createElement("div");
  savePanel.id = "savePanel";
  savePanel.appendChild(btnSave);
  savePanel.appendChild(btnLoadLastGrid);
  rightPanel.appendChild(savePanel);

  topOuterPanel.appendChild(leftPanel);
  topOuterPanel.appendChild(rightPanel);
  pp.appendChild(topOuterPanel);
  pp.appendChild(bottomOuterPanel);
  addBorderTest();
})(35, 20);
