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

  let objColor = {
    colorScheme: "Default",
    colorName: "black",
    colorValue: "black"
  };
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
    ["Pink Colors", "MediumVioletRed", "#C71585"],
    ["Purple Colors", "Lavender", "#E6E6FA"],
    ["Purple Colors", "Thistle", "#D8BFD8"],
    ["Purple Colors", "Plum", "#DDA0DD"],
    ["Purple Colors", "Orchid", "#DA70D6"],
    ["Purple Colors", "Violet", "#EE82EE"],
    ["Purple Colors", "Fuchsia", "#FF00FF"],
    ["Purple Colors", "Magenta", "#FF00FF"],
    ["Purple Colors", "MediumOrchid", "#BA55D3"],
    ["Purple Colors", "DarkOrchid", "#9932CC"],
    ["Purple Colors", "DarkViolet", "#9400D3"],
    ["Purple Colors", "BlueViolet", "#8A2BE2"],
    ["Purple Colors", "DarkMagenta", "#8B008B"],
    ["Purple Colors", "Purple", "#800080"],
    ["Purple Colors", "MediumPurple", "#9370DB"],
    ["Purple Colors", "MediumSlateBlue", "#7B68EE"],
    ["Purple Colors", "SlateBlue", "#6A5ACD"],
    ["Purple Colors", "DarkSlateBlue", "#483D8B"],
    ["Purple Colors", "RebeccaPurple", "#663399"],
    ["Purple Colors", "Indigo", "#4B0082"],
    ["Red Colors", "LightSalmon", "#FFA07A"],
    ["Red Colors", "Salmon", "#FA8072"],
    ["Red Colors", "DarkSalmon", "#E9967A"],
    ["Red Colors", "LightCoral", "#F08080"],
    ["Red Colors", "IndianRed", "#CD5C5C"],
    ["Red Colors", "Crimson", "#DC143C"],
    ["Red Colors", "Red", "#FF0000"],
    ["Red Colors", "FireBrick", "#B22222"],
    ["Red Colors", "DarkRed", "#8B0000"],
    ["Orange Colors", "Orange", "#FFA500"],
    ["Orange Colors", "DarkOrange", "#FF8C00"],
    ["Orange Colors", "Coral", "#FF7F50"],
    ["Orange Colors", "Tomato", "#FF6347"],
    ["Orange Colors", "OrangeRed", "#FF4500"],
    ["Yellow Colors", "Gold", "#FFD700"],
    ["Yellow Colors", "Yellow", "#FFFF00"],
    ["Yellow Colors", "LightYellow", "#FFFFE0"],
    ["Yellow Colors", "LemonChiffon", "#FFFACD"],
    ["Yellow Colors", "LightGoldenRodYellow", "#FAFAD2"],
    ["Yellow Colors", "PapayaWhip", "#FFEFD5"],
    ["Yellow Colors", "Moccasin", "#FFE4B5"],
    ["Yellow Colors", "PeachPuff", "#FFDAB9"],
    ["Yellow Colors", "PaleGoldenRod", "#EEE8AA"],
    ["Yellow Colors", "Khaki", "#F0E68C"],
    ["Yellow Colors", "DarkKhaki", "#BDB76B"],
    ["Green Colors", "GreenYellow", "#ADFF2F"],
    ["Green Colors", "Chartreuse", "#7FFF00"],
    ["Green Colors", "LawnGreen", "#7CFC00"],
    ["Green Colors", "Lime", "#00FF00"],
    ["Green Colors", "LimeGreen", "#32CD32"],
    ["Green Colors", "PaleGreen", "#98FB98"],
    ["Green Colors", "LightGreen", "#90EE90"],
    ["Green Colors", "MediumSpringGreen", "#00FA9A"],
    ["Green Colors", "SpringGreen", "#00FF7F"],
    ["Green Colors", "MediumSeaGreen", "#3CB371"],
    ["Green Colors", "SeaGreen", "#2E8B57"],
    ["Green Colors", "ForestGreen", "#228B22"],
    ["Green Colors", "Green", "#008000"],
    ["Green Colors", "DarkGreen", "#006400"],
    ["Green Colors", "YellowGreen", "#9ACD32"],
    ["Green Colors", "OliveDrab", "#6B8E23"],
    ["Green Colors", "DarkOliveGreen", "#556B2F"],
    ["Green Colors", "MediumAquaMarine", "#66CDAA"],
    ["Green Colors", "DarkSeaGreen", "#8FBC8F"],
    ["Green Colors", "LightSeaGreen", "#20B2AA"],
    ["Green Colors", "DarkCyan", "#008B8B"],
    ["Green Colors", "Teal", "#008080"],
    ["Cyan Colors", "Aqua", "#00FFFF"],
    ["Cyan Colors", "Cyan", "#00FFFF"],
    ["Cyan Colors", "LightCyan", "#E0FFFF"],
    ["Cyan Colors", "PaleTurquoise", "#AFEEEE"],
    ["Cyan Colors", "Aquamarine", "#7FFFD4"],
    ["Cyan Colors", "Turquoise", "#40E0D0"],
    ["Cyan Colors", "MediumTurquoise", "#48D1CC"],
    ["Cyan Colors", "DarkTurquoise", "#00CED1"],
    ["Blue Colors", "CadetBlue", "#5F9EA0"],
    ["Blue Colors", "SteelBlue", "#4682B4"],
    ["Blue Colors", "LightSteelBlue", "#B0C4DE"],
    ["Blue Colors", "LightBlue", "#ADD8E6"],
    ["Blue Colors", "PowderBlue", "#B0E0E6"],
    ["Blue Colors", "LightSkyBlue", "#87CEFA"],
    ["Blue Colors", "SkyBlue", "#87CEEB"],
    ["Blue Colors", "CornflowerBlue", "#6495ED"],
    ["Blue Colors", "DeepSkyBlue", "#00BFFF"],
    ["Blue Colors", "DodgerBlue", "#1E90FF"],
    ["Blue Colors", "RoyalBlue", "#4169E1"],
    ["Blue Colors", "Blue", "#0000FF"],
    ["Blue Colors", "MediumBlue", "#0000CD"],
    ["Blue Colors", "DarkBlue", "#00008B"],
    ["Blue Colors", "Navy", "#000080"],
    ["Blue Colors", "MidnightBlue", "#191970"],
    ["Brown Colors", "Cornsilk", "#FFF8DC"],
    ["Brown Colors", "BlanchedAlmond", "#FFEBCD"],
    ["Brown Colors", "Bisque", "#FFE4C4"],
    ["Brown Colors", "NavajoWhite", "#FFDEAD"],
    ["Brown Colors", "Wheat", "#F5DEB3"],
    ["Brown Colors", "BurlyWood", "#DEB887"],
    ["Brown Colors", "Tan", "#D2B48C"],
    ["Brown Colors", "RosyBrown", "#BC8F8F"],
    ["Brown Colors", "SandyBrown", "#F4A460"],
    ["Brown Colors", "GoldenRod", "#DAA520"],
    ["Brown Colors", "DarkGoldenRod", "#B8860B"],
    ["Brown Colors", "Peru", "#CD853F"],
    ["Brown Colors", "Chocolate", "#D2691E"],
    ["Brown Colors", "Olive", "#808000"],
    ["Brown Colors", "SaddleBrown", "#8B4513"],
    ["Brown Colors", "Sienna", "#A0522D"],
    ["Brown Colors", "Brown", "#A52A2A"],
    ["Brown Colors", "Maroon", "#800000"],
    ["White Colors", "White", "#FFFFFF"],
    ["White Colors", "Snow", "#FFFAFA"],
    ["White Colors", "HoneyDew", "#F0FFF0"],
    ["White Colors", "MintCream", "#F5FFFA"],
    ["White Colors", "Azure", "#F0FFFF"],
    ["White Colors", "AliceBlue", "#F0F8FF"],
    ["White Colors", "GhostWhite", "#F8F8FF"],
    ["White Colors", "WhiteSmoke", "#F5F5F5"],
    ["White Colors", "SeaShell", "#FFF5EE"],
    ["White Colors", "Beige", "#F5F5DC"],
    ["White Colors", "OldLace", "#FDF5E6"],
    ["White Colors", "FloralWhite", "#FFFAF0"],
    ["White Colors", "Ivory", "#FFFFF0"],
    ["White Colors", "AntiqueWhite", "#FAEBD7"],
    ["White Colors", "Linen", "#FAF0E6"],
    ["White Colors", "LavenderBlush", "#FFF0F5"],
    ["White Colors", "MistyRose", "#FFE4E1"],
    ["Grey Colors", "Gainsboro", "#DCDCDC"],
    ["Grey Colors", "LightGray", "#D3D3D3"],
    ["Grey Colors", "Silver", "#C0C0C0"],
    ["Grey Colors", "DarkGray", "#A9A9A9"],
    ["Grey Colors", "DimGray", "#696969"],
    ["Grey Colors", "Gray", "#808080"],
    ["Grey Colors", "LightSlateGray", "#778899"],
    ["Grey Colors", "SlateGray", "#708090"],
    ["Grey Colors", "DarkSlateGray", "#2F4F4F"],
    ["Grey Colors", "Black", "#000000"]
  ];

  let objColorScheme = { name: "default", colors: arrColors };
  const arrColorSchemes = [
    { name: "default", colors: arrColors },
    { name: "RGB", colors: arrColorsRGB },
    { name: "Pink Colors", colors: arrColorGroups },
    { name: "Purple Colors", colors: arrColorGroups },
    { name: "Red Colors", colors: arrColorGroups },
    { name: "Orange Colors", colors: arrColorGroups },
    { name: "Yellow Colors", colors: arrColorGroups },
    { name: "Green Colors", colors: arrColorGroups },
    { name: "Cyan Colors", colors: arrColorGroups },
    { name: "Blue Colors", colors: arrColorGroups },
    { name: "Brown Colors", colors: arrColorGroups },
    { name: "White Colors", colors: arrColorGroups },
    { name: "Grey Colors", colors: arrColorGroups }
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
      // if (curStampObj.name === "nostamp") {
      applyColor(evt.target);
      // }
    }
  };
  const applyColor = box => {
    // console.log("box.id: " + box.id + " " + color);
    box.style.backgroundColor = objColor.colorValue;
  };

  /* Sets the color scheme to fill the color palette */
  const setColorScheme = () => {
    if (colorSchemeDropDown.value) {
      objColorScheme = arrColorSchemes.find(
        x => x.name === colorSchemeDropDown.value
      );
      const colorName = objColorScheme.name;
      console.log(colorName);
      const arrFiltered = [];
      if (objColorScheme.name.includes("Color")) {
        arrFiltered.push(
          objColorScheme.colors
            .filter(x => x[0] == colorName)
            .map(x => {
              x.shift();
              return x;
            })
        );
      }
      const objFiltered = {};
      objFiltered["name"] = colorName;
      objFiltered["colors"] = arrFiltered[0];
      objColorScheme = objFiltered;
      console.log(objColorScheme);
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
      // console.log(array);
      const arr = [];
      arr.push(...arrColorPalette);
      // console.log(arr[0][index]);
      // console.log("a[" + index + "] = " + el.innerHTML);
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
      objColor.colorScheme = "Custom";
      objColor.colorName = evt.target.value;
      objColor.colorValue = evt.target.value;
    } else {
      objColor.colorScheme = objColorScheme.name;
      objColor.colorName = evt.target.title;
      objColor.colorValue = evt.target.style.backgroundColor;
    }
    console.log(objColor);
    colorStatusBox.style.backgroundColor = objColor.colorValue;
    colorNameLabel.innerHTML = objColor.colorName;
    schemeStatusLabel.innerHTML = objColor.colorScheme;
  };

  /* Sets the stamp being used */
  const setStamp = evt => {
    // alert("test");
    while (stampStatusBox.firstChild) {
      stampStatusBox.removeChild(stampStatusBox.firstChild);
    }
    stampClass = evt.target.classList;
    stampStatusBox.style.color = objColor.colorValue;
    const icon = document.createElement("i");
    icon.classList = stampClass;
    stampStatusBox.appendChild(icon);
    curStampObj = arrStamps.find(x => x.name === evt.target.id);
    console.log(evt.target);
    console.log(curStampObj);
    console.log("stamp: " + curStampObj.name);
  };

  /* Sets the shape being used */
  /*   const setShape = evt => {
    color = evt.target.style.backgroundColor;
    paintBox.style.backgroundColor = color;
    // paintBoxLabel.innerHTML = color;
  }; */

  const toggleMouseClick = e => {
    bMouseClicked = !bMouseClicked;
  };

  const toggleOrientation = e => {
    bPortraitOrientation = !bPortraitOrientation;
  };

  /* Changes the color being used to white */
  const erase = () => {
    color = "white";
    colorStatusBox.style.backgroundColor = color;
    colorNameLabel.innerHTML = color;
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
  colorStatusLabel.innerHTML = "Using:";
  statusPanel.appendChild(colorStatusLabel);

  const schemeStatusLabel = document.createElement("label");
  schemeStatusLabel.id = "schemeStatusLabel";
  schemeStatusLabel.for = "colorStatusBox";
  schemeStatusLabel.innerHTML = objColor.colorScheme;
  statusPanel.appendChild(schemeStatusLabel);

  const colorNameLabel = document.createElement("label");
  colorNameLabel.id = "colorNameLabel";
  colorNameLabel.for = "colorStatusBox";
  colorNameLabel.innerHTML = objColor.colorName;
  statusPanel.appendChild(colorNameLabel);

  const colorStatusBox = createBox("box colorPaletteBox");
  colorStatusBox.id = "colorStatusBox";
  colorStatusBox.style.backgroundColor = objColor.colorValue;
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
