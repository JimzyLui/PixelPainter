const pixelPainter = ((iWidth, iHeight) => {
  const arrMemory = [];
  const pp = document.getElementById("pixelPainter");

  /* topOuterPanel will contain left & right panels */
  const topOuterPanel = document.createElement("div");
  topOuterPanel.id = "topOuterPanel";

  /* bottomOuterPanel will contain saved grids and diagnostic info */
  const bottomOuterPanel = document.createElement("div");
  bottomOuterPanel.id = "bottomOuterPanel";

  /* leftPanel will contain colorPalette and buttons */
  const leftPanel = document.createElement("div");
  leftPanel.id = "leftPanel";

  /* rightPanel will contain the grid and save/load buttons */
  const rightPanel = document.createElement("div");
  rightPanel.id = "rightPanel";

  /* define orientation */
  /*   let bPortraitOrientation = false;
  if (iWidth > iHeight) {
    bPortraitOrientation = false;
  } else {
    bPortraitOrientation = true;
  } */

  let color = "black";
  let curStampObj = { name: "nostamp", iconClass: "" }; // if no stamp then color
  let stampClass = "";

  const arrColorsRGB = [
    ["RED", "#FE2712"],
    ["R-O", "#FC600A"],
    ["ORANGE", "#FB9902"],
    ["Y-O", "#FCCC1A"],
    ["YELLOW", "#FEFE33"],
    ["Y-G", "#B2D732"],
    ["GREEN", "#66B032"],
    ["B-G", "#347C98"],
    ["BLUE", "#0247FE"],
    ["B-P", "#4424D6"],
    ["PURPLE", "#8601AF"],
    ["R-P", "#C21460"]
  ];
  const arrColors = [
    ["red", "red"],
    ["green", "green"],
    ["blue", "blue"],
    ["purple", "purple"],
    ["orange", "orange"],
    ["yellow", "yellow"],
    ["white", "white"],
    ["pink", "pink"],
    ["lightblue", "lightblue"],
    ["gray", "gray"],
    ["lightgray", "lightgray"],
    ["brown", "brown"],
    ["violet", "violet"],
    ["lightgreen", "lightgreen"],
    ["darkgreen", "darkgreen"],
    ["darkblue", "darkblue"],
    ["aquamarine", "aquamarine"],
    ["darkgray", "darkgray"],
    ["black", "black"],
    ["skyblue", "skyblue"],
    ["cyan", "cyan"],
    ["darkred", "darkred"],
    ["turquoise", "turquoise"],
    ["beige", "beige"],
    ["gold", "gold"]
  ];
  const arrColorGroups = [
    ["Pink Colors", "Pink", "#FFC0CB"],
    ["Pink Colors", "LightPink", "#FFB6C1"],
    ["Pink Colors", "HotPink", "#FF69B4"],
    ["Pink Colors", "DeepPink", "#FF1493"],
    ["Pink Colors", "PaleVioletRed", "#DB7093"],
    ["Pink Colors", "MediumVioletRed", "#C71585"]
  ];

  let objColorScheme = { name: "default", colors: arrColors };
  const arrColorSchemes = [
    { name: "default", colors: arrColors },
    { name: "RGB", colors: arrColorsRGB }
  ];

  /* define stamps */
  const nostamp = {
    name: "nostamp",
    iconClass: ""
  };
  const circle = {
    name: "circle",
    iconClass: "far fa-circle",
    arrTemplate: [[0, -1], [1, 0], [0, 1], [-1, 0]]
  };
  const square = {
    name: "square",
    iconClass: "far fa-square",
    arrTemplate: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0]
    ]
  };
  const smile = {
    name: "smile",
    iconClass: "far fa-smile"
  };

  const rightArrow = {
    name: "rightArrow",
    iconClass: "fas fa-arrow-right"
  };

  const leftArrow = {
    name: "leftArrow",
    iconClass: "fas fa-arrow-left"
  };

  const upArrow = {
    name: "upArrow",
    iconClass: "fas fa-arrow-up"
  };

  const downArrow = {
    name: "downArrow",
    iconClass: "fas fa-arrow-down"
  };

  const star = {
    name: "star",
    iconClass: "far fa-star"
  };
  const plus = {
    name: "plus",
    iconClass: "fas fa-plus",
    arrTemplate: [[0, -1], [1, 0], [0, 1], [0, 0], [-1, 0]]
  };
  const times = {
    name: "times",
    iconClass: "fas fa-times",
    arrTemplate: [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]]
  };

  const arrStamps = [
    nostamp,
    // smile,
    circle,
    // star,
    square,
    plus,
    times
    // leftArrow,
    // downArrow
  ];

  /*  Uses a template to return a stamp */
  const generateStampMapping = arrPositionCurrent => {
    // console.log("Generating ", curStampObj.name, " stamp.");
    // console.log("arrPositionCurrent: " + arrPositionCurrent);
    // console.log("typeof arrPositionCurrent: " + typeof arrPositionCurrent);
    arrNew = curStampObj.arrTemplate.map(arrTuple => {
      // console.log("arrTemplate: " + x);
      // console.log("arrTemplate[0]: " + x[0]);
      // console.log("arrPositionCurrent[0]: " + arrPositionCurrent[0]);
      let x = [];
      x.push(...arrTuple); //copied so we don't change original array
      x[0] += +arrPositionCurrent[0];
      // console.log("newMapping[0]: " + x[0]);

      x[1] += +arrPositionCurrent[1];
      // console.log("newMapping: " + x);
      if (x[0] < 0 || x[1] < 0 || x[0] >= iHeight || x[1] >= iWidth) {
        return;
      }
      //conv
      const id = convArrLocationToId(x);
      const objBox = document.getElementById(id);
      return objBox;
    });

    // console.log("arrNew: " + arrNew);

    // console.log("arrNewFiltered: " + arrNew.filter(x => typeof x === "object"));

    return arrNew.filter(x => typeof x == "object");
  };
  const convArrLocationToId = arrLocation => {
    console.log("arrLocation: " + arrLocation);

    let id = arrLocation.join("col");
    id = "row" + id;
    return id;
  };
  const convIdToArrLocation = id => {
    // console.log("id: " + id);
    // console.log("typeof id: " + typeof id);

    const arrLocation = id.split("col");
    // console.log("arrLocation 1: " + arrLocation);
    // console.log("typeof arrLocation: " + typeof arrLocation);
    // console.log(Object.prototype.toString.call(arrLocation));

    arrLocation[0] = arrLocation[0].replace("row", "");
    // console.log("arrLocation 2: " + arrLocation);
    // console.log("arrLocation |: " + arrLocation.join("|"));

    return arrLocation;
  };
  const applyStamp = evt => {
    if (curStampObj.name === "nostamp") {
      return;
    }
    //convert target coordinates
    console.log("target selected: " + evt.target.id);

    const arrLocation = convIdToArrLocation(evt.target.id);
    console.log("target coordinates: " + arrLocation);
    console.log("template: " + curStampObj.arrTemplate);
    //get new customized stamp
    const arrStampMappingBoxes = generateStampMapping(arrLocation);
    console.log("arrStampMappingIds: " + arrStampMappingBoxes.map(x => x.id));
    //paste stamp at the target location
    arrStampMappingBoxes.forEach(x => applyColor(x));
  };

  /* Shape definitions */
  const arrShapes = [circle];

  // Padding
  const p = 0;

  let bMouseClicked = false;
  let bMouseReleased = true;

  /* Makes deep copy of grid */
  const cloneGrid = oldGrid => {
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
  };

  /* Creates a box using boxClass type */
  const createBox = boxClass => {
    let box = document.createElement("span");
    box.classList = boxClass;
    return box;
  };

  /* Creates a new grid */
  const createGrid = (
    iColumns,
    iRows,
    gridClass,
    boxClass,
    id,
    bAddEventListeners = false
  ) => {
    const grid = document.createElement("div"); // Box width and height
    grid.id = id;
    grid.classList = "container " + gridClass;
    grid.dataset["gridClass"] = gridClass;
    grid.dataset["boxClass"] = boxClass;
    grid.dataset["iColumns"] = iColumns;
    grid.dataset["iRows"] = iRows;
    let iBoxCounter = 0;
    // create row
    for (let y = 0; y < iRows; y++) {
      const row = document.createElement("div");
      row.id = "row" + y;
      row.classList = "row Y" + y;
      row.width = grid.width;
      for (let x = 0; x < iColumns; x++) {
        let box = createBox(boxClass);
        switch (gridClass) {
          case "canvas":
            // box.id = "box" + iBoxCounter.toString();
            box.id = "row" + y + "col" + x;
            box.classList = "box canvas Y" + y + " X" + x;
            if (bAddEventListeners) {
              box.addEventListener("mouseover", applyColorEvent);
              box.addEventListener("click", applyStamp);
              box.addEventListener("click", applyColorEvent);
              box.addEventListener("mousedown", onMouseDown);
              box.addEventListener("mouseup", onMouseUp);
              box.setAttribute("paintable", "");
            }
            break;
          case "colors":
            const colorName = arrColors[iBoxCounter][0];
            const colorValue = arrColors[iBoxCounter][1];
            box.style = "background-color:" + colorValue;
            box.title =
              colorName == colorValue
                ? colorName
                : colorName + ": " + colorValue;
            box.addEventListener("click", setColor);
            break;
          case "stamps":
            if (iBoxCounter < arrStamps.length) {
              box.id = arrStamps[iBoxCounter].name;
              box.style = "background-color: white";
              const icon = document.createElement("i");
              icon.id = arrStamps[iBoxCounter].name;
              icon.classList = arrStamps[iBoxCounter].iconClass;
              box.appendChild(icon);
              box.addEventListener("click", setStamp);
            }
            break;
        }
        row.appendChild(box);
        iBoxCounter++;
      }
      grid.appendChild(row);
    }
    return grid;
  };

  const onMouseDown = () => {
    bMouseReleased = false;
  };

  const onMouseUp = () => {
    bMouseReleased = true;
  };

  /* Applies color to boxes */
  const applyColorEvent = evt => {
    if (bMouseReleased === false || evt.type == "click") {
      if (curStampObj.name === "nostamp") {
        applyColor(evt.target);
      }
    }
  };
  const applyColor = box => {
    // console.log("box.id: " + box.id + " " + color);
    box.style.backgroundColor = color;
  };

  /* Sets the color scheme to fill the color palette */
  const setColorScheme = () => {
    if (colorSchemeDropDown.value) {
      objColorScheme = arrColorSchemes.find(
        x => x.name === colorSchemeDropDown.value
      );
      changeColorPalette();
    }
    console.log("colorScheme: " + objColorScheme.name);
  };

  const changeColorPalette = () => {
    clearColorPalette();
    //get color scheme
    const arrColorPalette = [];
    arrColorPalette.push(objColorScheme.colors);
    const arrColorBoxes = document.querySelectorAll(".colorPaletteBox");
    const changeColor = (el, index, array) => {
      console.log(array);
      const arr = [];
      arr.push(...arrColorPalette);
      console.log(arr[0][index]);
      console.log("a[" + index + "] = " + el.innerHTML);
      if (index < arr[0].length) {
        const colorName = arr[0][index][0];
        const colorValue = arr[0][index][1];
        const colorTitle =
          colorName == colorValue ? colorName : colorName + ": " + colorValue;
        el.style = "background-color:" + arr[0][index][1];
        el.title = colorTitle;
      }
    };
    arrColorBoxes.forEach(changeColor);
  };
  const clearColorPalette = () => {
    const arrColorBoxes = document.querySelectorAll(".colorPaletteBox");
    arrColorBoxes.forEach(x => (x.style.backgroundColor = "white"));
  };
  /* Sets the color being used */
  const setColor = evt => {
    if (evt.target.id === "colorPicker") {
      color = evt.target.value;
    } else {
      color = evt.target.style.backgroundColor;
    }
    colorStatusBox.style.backgroundColor = color;
    colorNameLabel.innerHTML = color;
  };

  /* Sets the stamp being used */
  const setStamp = evt => {
    // alert("test");
    while (stampStatusBox.firstChild) {
      stampStatusBox.removeChild(stampStatusBox.firstChild);
    }
    stampClass = evt.target.classList;
    stampStatusBox.style.color = color;
    const icon = document.createElement("i");
    icon.classList = stampClass;
    stampStatusBox.appendChild(icon);
    curStampObj = arrStamps.find(x => x.name === evt.target.id);
    console.log(evt.target);
    console.log(curStampObj);
    console.log("stamp: " + curStampObj.name);
  };

  /* Sets the shape being used */
  const setShape = evt => {
    color = evt.target.style.backgroundColor;
    paintBox.style.backgroundColor = color;
    // paintBoxLabel.innerHTML = color;
  };

  const toggleMouseClick = e => {
    bMouseClicked = !bMouseClicked;
  };

  const toggleOrientation = e => {
    bPortraitOrientation = !bPortraitOrientation;
  };

  /* Changes the color being used to white */
  const erase = () => {
    color = "white";
    paintBox.style.backgroundColor = color;
    paintBoxLabel.innerHTML = color;
  };

  /* Clears the canvas by setting all boxes to white */
  const clear = () => {
    arrCanvasBoxes = document.querySelectorAll("span[paintable].box.canvas");

    arrCanvasBoxes.forEach(x => {
      x.style.backgroundColor = "white";
    });
  };

  /* Saves the canvas into the bottom panel */
  const saveGrid = () => {
    let snapshot = {};
    snapshot["timestamp"] = Date.now();
    const x = cloneGrid(canvas);
    console.log("canvas:", canvas);
    console.log("clone:", x);
    bottomOuterPanel.appendChild(x);

    btnLoadLastGrid.disabled = false;
  };

  /* Loads the saved grid back into the canvas */
  const loadGrid = () => {
    if (arrMemory.length > 0) {
      let snapshot = arrMemory.pop();
      rightPanel.removeChild(canvas);
      rightPanel.appendChild(snapshot);
    }
  };

  const leftPanelLabel = document.createElement("div");
  leftPanelLabel.innerHTML = "Drawing Tools";
  leftPanelLabel.id = "leftPanelLabel";
  leftPanel.appendChild(leftPanelLabel);

  const colorSchemeLabel = document.createElement("label");
  colorSchemeLabel.innerHTML = "Color Scheme";
  colorSchemeLabel.for = "colorSchemeDropDown";
  const colorSchemeDropDown = document.createElement("select");
  colorSchemeDropDown.id = "colorSchemeDropDown";
  colorSchemeDropDown.className = "selectable";
  arrColorSchemes.forEach(x => {
    const opt = document.createElement("option");
    opt.id = x.name;
    opt.value = x.name;
    opt.innerHTML = x.name;
    colorSchemeDropDown.appendChild(opt);
  });
  colorSchemeDropDown.addEventListener("input", setColorScheme);
  leftPanel.appendChild(colorSchemeLabel);
  leftPanel.appendChild(colorSchemeDropDown);

  const colorPaletteLabel = document.createElement("label");
  colorPaletteLabel.innerHTML = "Color Palette";
  colorPaletteLabel.for = "colorPalette";
  const colorPalette = createGrid(
    5,
    5,
    "colors",
    "box colorPaletteBox selectable",
    "colorPalette"
  );
  changeColorPalette();
  colorPalette.classList += " selectable";
  leftPanel.appendChild(colorPaletteLabel);
  leftPanel.appendChild(colorPalette);

  const colorPickerLabel = document.createElement("label");
  colorPickerLabel.innerHTML = "Color Picker";
  colorPickerLabel.for = "colorPicker";
  const colorPicker = document.createElement("input");
  colorPicker.className = "selectable";
  colorPicker.setAttribute("list", "presetColors");
  const dataList = document.createElement("datalist");
  dataList.id = "presetColors";
  const arrPresetColors = ["#ff0000", "#00ff00", "#0000ff"];
  arrPresetColors.forEach(x => {
    let opt = document.createElement("option");
    opt.innerHTML = x;
    dataList.appendChild(opt);
  });

  colorPicker.id = "colorPicker";
  colorPicker.type = "color";
  colorPicker.title = "Color Picker";
  colorPicker.addEventListener("change", setColor);
  colorPicker.classList += " selectable";
  colorPicker.appendChild(dataList);
  // colorPickerLabel.appendChild(colorPicker);
  leftPanel.appendChild(colorPickerLabel);
  leftPanel.appendChild(colorPicker);
  // leftPanel.appendChild(dataList);

  const stampPaletteLabel = document.createElement("label");
  stampPaletteLabel.innerHTML = "Stamp Palette";
  stampPaletteLabel.for = "stampPalette";
  const stampPalette = createGrid(
    5,
    1,
    "stamps",
    "box stampPaletteBox selectable",
    "stampPalette"
  );
  stampPalette.classList += " selectable";
  leftPanel.appendChild(stampPaletteLabel);
  leftPanel.appendChild(stampPalette);

  const buttonPanel = document.createElement("div");
  buttonPanel.id = "buttonPanel";
  const btnErase = document.createElement("button");
  btnErase.innerHTML = "Erase";
  btnErase.addEventListener("click", erase);
  buttonPanel.appendChild(btnErase);

  const btnClear = document.createElement("button");
  btnClear.innerHTML = "Clear";
  btnClear.addEventListener("click", clear);
  buttonPanel.appendChild(btnClear);
  leftPanel.appendChild(buttonPanel);

  /* Display what's being used  */
  const statusPanel = document.createElement("div");
  statusPanel.id = "statusPanel";

  const colorStatusLabel = document.createElement("label");
  colorStatusLabel.id = "colorStatusLabel";
  colorStatusLabel.for = "colorNameLabel";
  colorStatusLabel.innerHTML = "Currently Using:";
  statusPanel.appendChild(colorStatusLabel);

  const colorNameLabel = document.createElement("label");
  colorNameLabel.id = "colorNameLabel";
  colorNameLabel.for = "colorStatusBox";
  colorNameLabel.innerHTML = color;
  statusPanel.appendChild(colorNameLabel);

  const colorStatusBox = createBox("box colorPaletteBox");
  colorStatusBox.id = "colorStatusBox";
  statusPanel.appendChild(colorStatusBox);

  const stampStatusBox = createBox("box stampPaletteBox");
  stampStatusBox.id = "stampStatusBox";
  statusPanel.appendChild(stampStatusBox);

  /*
  const paintBoxRow = document.createElement("div");
  paintBoxRow.id = "paintBoxRow";
  paintBoxRow.appendChild(paintBoxLabel);
  paintBoxRow.appendChild(paintBox);
  statusPanel.appendChild(paintBoxRow);
  */

  const btnSave = document.createElement("button");
  btnSave.id = "btnSave";
  btnSave.innerHTML = "Save Image";
  btnSave.addEventListener("click", saveGrid);

  const btnLoadLastGrid = document.createElement("button");
  btnLoadLastGrid.id = "btnLoadLastGrid";
  btnLoadLastGrid.innerHTML = "Load Image";
  btnLoadLastGrid.disabled = true;
  btnLoadLastGrid.addEventListener("click", loadGrid);

  /* Load the RIGHT PANEL */
  const canvasLabel = document.createElement("div");
  canvasLabel.id = "canvasLabel";
  canvasLabel.innerHTML = "Canvas";
  rightPanel.appendChild(canvasLabel);

  /* Create the Canvas */
  let canvas = createGrid(
    iWidth,
    iHeight,
    "canvas",
    "box canvas canvasBox",
    "canvas",
    true
  );
  canvas.classList += " selectable";
  rightPanel.appendChild(canvas);

  rightPanel.appendChild(statusPanel);

  /* Save Panel contains the save/load buttons */
  const savePanel = document.createElement("div");
  savePanel.id = "savePanel";
  savePanel.appendChild(btnSave);
  savePanel.appendChild(btnLoadLastGrid);
  rightPanel.appendChild(savePanel);

  /* Add the left & right panels to the top panel */
  topOuterPanel.appendChild(leftPanel);
  topOuterPanel.appendChild(rightPanel);

  /* Add the top & bottom panels */
  pp.appendChild(topOuterPanel);
  pp.appendChild(bottomOuterPanel);

  // diagnostics: show window sizing
  const showWindowSize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let deviceType = "mini-mobile";
    console.log(typeof w);
    switch (true) {
      case w < 247:
        deviceType = "mini-mobile"; //w < 480
        break;
      case w < 768:
        deviceType = "mobile";
        break;
      case w < 960:
        deviceType = "tablet";
        break;
      case w < 1141:
        deviceType = "desktop";
        break;
      default:
        // deviceType = "large unknown device";
        deviceType = "desktop";
    }
    const wSize = w + "w x " + h + "h";
    pWindowSize.innerHTML = wSize + "<br>" + deviceType;
  };

  const pWindowSize = document.createElement("p");
  pWindowSize.id = "pWindowSize";
  pp.appendChild(pWindowSize);
  window.addEventListener("resize", showWindowSize);
  showWindowSize();

  // use to show section borders when configuring new features
  const addBorderTest = () => {
    canvas.classList += " borderTest";
    colorPalette.classList += " borderTest";
    savePanel.classList += " borderTest";
    statusPanel.classList += " borderTest";
    leftPanel.classList += " borderTest";
    rightPanel.classList += " borderTest";
    paintBoxRow.classList += " borderTest";
    topOuterPanel.classList += " borderTest";
    bottomOuterPanel.classList += " borderTest";
    pp.classList += " container borderTest";
  };

  // addBorderTest();
})(35, 20);
