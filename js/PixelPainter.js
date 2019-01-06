const pixelPainter = ((iWidth, iHeight) => {
  const pp = document.getElementById("pixelPainter");
  const leftPanel = document.createElement("div"); // contains colorPalette and buttons
  leftPanel.id = "leftPanel";
  let paintColor = "black";
  arrColors = [
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
  // const canvas = document.createElement("div"); // Box width and height
  // const colorPalette = document.createElement("div");
  // const iiSquareWidth = 5;
  // const iSquareWidth = iiSquareWidth + "px";
  // canvas.id = "canvas";
  // canvas.className = "container";
  // colorPalette.id = "colorPalette";
  // colorPalette.className = "container";

  // canvas.width = iiSquareWidth * iWidth;
  // canvas.height = iiSquareWidth * iHeight;

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
    const box = document.createElement("div");
    box.classList = boxClass;
    return box;
  }
  function changeColor(e) {
    if (bMouseReleased === false) {
      this.style.backGroundColor = paintColor;
    }
  }
  function setColor(e) {
    paintColor = this.style.backGroundColor = "blue";
    document.querySelector("#paintBox").style.backGroundColor = paintColor;
  }
  function toggleMouseClick(e) {
    bMouseClicked = !bMouseClicked;
  }
  function erase() {
    paintColor = "white";
  }
  function clear() {
    arrCanvasBoxes = document.querySelectorAll(".canvas");
    arrCanvasBoxes.map(x => (x.style.backGroundColor = "white"));
  }
  const canvas = createGrid(iWidth, iHeight, "box", "canvas");
  const colorPalette = createGrid(5, 5, "box smBox", "palette");
  leftPanel.appendChild(colorPalette);
  const btnErase = document.createElement("button");
  btnErase.innerHTML = "Erase";
  btnErase.addEventListener("click", erase);
  const btnClear = document.createElement("button");
  btnClear.innerHTML = "Clear";
  btnClear.addEventListener("click", clear);
  leftPanel.appendChild(btnErase);
  leftPanel.appendChild(btnClear);
  const colorBox = document.createElement("span");
  const paintBox = createBox("box smBox");
  paintBox.id = "paintBox";
  colorBox.appendChild(paintBox);
  colorBox.innerHTML = "Paint Color";
  leftPanel.appendChild(colorBox);
  pp.appendChild(leftPanel);
  pp.appendChild(canvas);
})(15, 20);
