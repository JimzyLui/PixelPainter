const pixelPainter = ((iWidth, iHeight) => {
  const pp = document.getElementById("pixelPainter");
  const leftPanel = document.createElement("div"); // contains colorPalette and buttons
  leftPanel.id = "leftPanel";
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
  const canvas = createGrid(iWidth, iHeight, "box canvas", "canvas");
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
  const colorBoxPanel = document.createElement("div");
  const colorBoxLabel = document.createElement("div");
  colorBoxLabel.innerHTML = "Paint Color:";
  const paintBoxRow = document.createElement("div");
  paintBoxRow.id = "paintBoxRow";
  const paintBox = createBox("box smBox");
  const paintBoxLabel = document.createElement("label");
  colorBoxPanel.id = "colorBoxPanel";
  paintBoxLabel.innerHTML = paintColor;
  paintBox.id = "paintBox";
  paintBoxRow.appendChild(paintBoxLabel);
  paintBoxRow.appendChild(paintBox);
  colorBoxPanel.appendChild(colorBoxLabel);
  colorBoxPanel.appendChild(paintBoxRow);
  leftPanel.appendChild(colorBoxPanel);
  pp.appendChild(leftPanel);
  pp.appendChild(canvas);
})(80, 40);
