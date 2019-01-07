const pixelPainter = ((iWidth, iHeight) => {
  const arrMemory = [];
  const pp = document.getElementById("pixelPainter");
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

  function createGrid(iColumns, iRows, boxClass, id) {
    const grid = document.createElement("div"); // Box width and height
    grid.className = "container";
    grid.id = id;
    let iBoxCounter = 0;
    // create row
    for (let y = 0; y < iRows; y++) {
      const row = document.createElement("div");
      row.className = "row";
      row.width = grid.width;
      for (let x = 0; x < iColumns; x++) {
        const box = createBox(boxClass);
        switch (grid.id) {
          case "canvas":
            box.id = "box" + iBoxCounter.toString();

            box.addEventListener("mouseover", changeColor);
            box.addEventListener("click", changeColor);
            box.addEventListener("mousedown", onMouseDown);
            box.addEventListener("mouseup", onMouseUp);
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
    // pp.appendChild(canvas);
  }

  function createBox(boxClass) {
    const box = document.createElement("span");
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
    arrCanvasBoxes = document.querySelectorAll(".box.canvas");
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
    const snapshot = {
      timestamp: Date.now(),
      canvas: canvas
    };
    arrMemory.push(snapshot);
    btnLoadLastGrid.disabled = false;
  }
  function loadGrid() {
    if (arrMemory.length > 0) {
      const snapshot = arrMemory.pop();
      canvas = snapshot;
    }
  }
  let canvas = createGrid(iWidth, iHeight, "box canvas", "canvas");
  const colorPalette = createGrid(5, 5, "box paletteBox", "palette");
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
  pp.appendChild(leftPanel);
  pp.appendChild(rightPanel);
})(35, 20);
