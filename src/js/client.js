var downloadColormapDialog = $("#downloadColormapDialog").dialog({
autoOpen: false,
modal: true,
resizable: false,
buttons: {
    XML: function () {
    downloadColormapDialog.dialog("close");
    saveColormapXML();
    },
    JSON: function () {
    downloadColormapDialog.dialog("close");
    saveColormapJSON();
    },
    PNG: function () {
    downloadColormapDialog.dialog("close");
    saveColormapPNG();
    },
},
});
var downloader = document.getElementById("aDownload");

var imageCanvas, colorMapCanvas;
var colormapPicker;
var cvAll = [];
var lblHistogramH = [],
lblHistogramV = [];

var actionManager;

var COLOR_MAP_SIZE = 1024; //32;
var HISTOGRAM_SIZE = 200.0;
var colorMaps = [];

var fileDropIsCopy = false;

function onLoad() {
lblHistogramH.push(document.getElementById("lblHistogramH0"));
lblHistogramH.push(document.getElementById("lblHistogramH1"));
lblHistogramH.push(document.getElementById("lblHistogramH2"));
lblHistogramH.push(document.getElementById("lblHistogramH3"));
lblHistogramH.push(document.getElementById("lblHistogramH4"));
lblHistogramH.push(document.getElementById("lblHistogramH5"));
lblHistogramH.push(document.getElementById("lblHistogramH6"));
lblHistogramH.push(document.getElementById("lblHistogramH7"));
lblHistogramH.push(document.getElementById("lblHistogramH8"));
lblHistogramH.push(document.getElementById("lblHistogramH9"));
lblHistogramH.push(document.getElementById("lblHistogramH10"));

lblHistogramV.push(document.getElementById("lblHistogramV0"));
lblHistogramV.push(document.getElementById("lblHistogramV1"));
lblHistogramV.push(document.getElementById("lblHistogramV2"));
lblHistogramV.push(document.getElementById("lblHistogramV3"));
lblHistogramV.push(document.getElementById("lblHistogramV4"));
lblHistogramV.push(document.getElementById("lblHistogramV5"));
lblHistogramV.push(document.getElementById("lblHistogramV6"));
lblHistogramV.push(document.getElementById("lblHistogramV7"));
lblHistogramV.push(document.getElementById("lblHistogramV8"));
lblHistogramV.push(document.getElementById("lblHistogramV9"));
lblHistogramV.push(document.getElementById("lblHistogramV10"));

actionManager = new ActionManager(
    document.getElementById("cmdUndo"),
    document.getElementById("cmdUndo2"),
    document.getElementById("cmdRedo"),
    document.getElementById("cmdRedo2"),
);

var tableColorMapPicker = document.getElementById(
    "tableColorMapPicker",
);
tableColorMapPicker.ondrop = handleColorMapDrop;
tableColorMapPicker.ondragover = function (event) {
    if (event.dataTransfer.types == null) return;
    for (var i = 0; i < event.dataTransfer.types.length; ++i)
    if (event.dataTransfer.types[i] === "Files") {
        event.preventDefault();
        return;
    }
};

var cvImage = document.getElementById("cvImage");
cvAll.push(
    (imageCanvas = new ImageCanvas(
    cvImage,
    document.getElementById("ImageSection"),
    )),
);
cvImage.ondrop = handleFileDrop;
cvImage.ondragleave = function (event) {
    imageCanvas.hideHighlight();
};
cvImage.ondragover = function (event) {
    if (event.dataTransfer.types == null) return;
    for (var i = 0; i < event.dataTransfer.types.length; ++i)
    if (event.dataTransfer.types[i] === "Files") {
        fileDropIsCopy = event.ctrlKey || event.metaKey;
        event.preventDefault();
        var targetRect = event.target.getBoundingClientRect();
        imageCanvas.showHighlight(
        event.clientX - targetRect.left,
        event.clientY - targetRect.top,
        );
        return;
    }
};

var cvColorMap = document.getElementById("cvColorMap");
cvAll.push(
    (colorMapCanvas = new ColorMapCanvas(
    cvColorMap,
    document.getElementById("divColorMap"),
    document.getElementById("divColorMapBounds"),
    )),
);
onHistogramAlphaButtonPressed();

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
cvAll.forEach(function (canvas) {
    canvas.canvas.onmousedown = handleMouseDown;
    canvas.canvas.onmouseleave = handleMouseLeave;
    if (canvas.onTouchStart != null)
    canvas.canvas.addEventListener(
        "touchstart",
        canvas.onTouchStart,
        false,
    );
    if (canvas.onTouchMove != null)
    canvas.canvas.addEventListener(
        "touchmove",
        canvas.onTouchMove,
        false,
    );
    if (canvas.onTouchEnd != null)
    canvas.canvas.addEventListener(
        "touchend",
        canvas.onTouchEnd,
        false,
    );
});
document.onmouseup = handleMouseUp;
document.onmousemove = handleMouseMove;

// Add mouse wheel handler
// Code block from "http://www.javascriptkit.com/javatutors/onmousewheel.shtml"
var mousewheelevt = /Firefox/i.test(navigator.userAgent)
    ? "DOMMouseScroll"
    : "mousewheel";
if (document.attachEvent)
    document.attachEvent("on" + mousewheelevt, handleMouseWheel);
else if (document.addEventListener)
    document.addEventListener(mousewheelevt, handleMouseWheel, false);
// End code block from "http://www.javascriptkit.com/javatutors/onmousewheel.shtml"

cvAll.forEach(function (canvas) {
    // Prevent context menu from showing up on right mouse button click
    // Code block from "http://stackoverflow.com/questions/8370213/block-right-clicks-in-canvas-with-webgl-context"
    canvas.canvas.addEventListener(
    "contextmenu",
    function (event) {
        if (event.button === 2) {
        event.preventDefault();
        return false;
        }
    },
    false,
    );
    // End code block from "http://stackoverflow.com/questions/8370213/block-right-clicks-in-canvas-with-webgl-context"
});

// >>> Create color picker table

colormapPicker = new ColorMapPicker();
readColorMapsFromXml(
    "xml/ColorMaps.xml",
    COLOR_MAP_SIZE,
    onColorMapsLoaded,
);

var solidColorMaps = [];
/*solidColorMaps.Red = {name: "Red", group: 'Solid', nanclr: [0.0, 0.0, 0.0], bytes: [255, 0, 0, 255]};
solidColorMaps.Orange = {name: "Orange", group: 'Solid', nanclr: [0.0, 0.0, 0.0], bytes: [255, 128, 0, 255]};
solidColorMaps.Yellow = {name: "Yellow", group: 'Solid', nanclr: [0.0, 0.0, 0.0], bytes: [255, 255, 0, 255]};
solidColorMaps.Green = {name: "Green", group: 'Solid', nanclr: [0.0, 0.0, 0.0], bytes: [0, 255, 0, 255]};
solidColorMaps.Blue = {name: "Blue", group: 'Solid', nanclr: [0.0, 0.0, 0.0], bytes: [0, 0, 255, 255]};
solidColorMaps.White = {name: "White", group: 'Solid', nanclr: [0.0, 0.0, 0.0], bytes: [255, 255, 255, 255]};
solidColorMaps.Gray = {name: "Gray", group: 'Solid', nanclr: [0.0, 0.0, 0.0], bytes: [128, 128, 128, 255]};
solidColorMaps.Black = {name: "Black", group: 'Solid', nanclr: [0.5, 0.5, 0.5], bytes: [0, 0, 0, 255]};*/

solidColorMaps.Blue = {
    name: "Blue",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [45, 81, 163, 255],
};
solidColorMaps.LightBlue = {
    name: "Light Blue",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [142, 183, 255, 255],
};
solidColorMaps.Green = {
    name: "Green",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [17, 140, 77, 255],
};
solidColorMaps.LightGreen = {
    name: "Light Green",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [150, 186, 122, 255],
};
solidColorMaps.Purple = {
    name: "Purple",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [86, 38, 85, 255],
};
solidColorMaps.Pink = {
    name: "Pink",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [206, 155, 196, 255],
};
solidColorMaps.Yellow = {
    name: "Yellow",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [244, 229, 83, 255],
};
solidColorMaps.LightYellow = {
    name: "Light Yellow",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [242, 235, 148, 255],
};
solidColorMaps.Orange = {
    name: "Orange",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [247, 158, 67, 255],
};
solidColorMaps.LightOrange = {
    name: "Light Orange",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [249, 187, 123, 255],
};
solidColorMaps.Red = {
    name: "Red",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [232, 62, 36, 255],
};
solidColorMaps.LightRed = {
    name: "Light Red",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [239, 127, 109, 255],
};
solidColorMaps.Black = {
    name: "Black",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [35, 31, 32, 255],
};
solidColorMaps.Brown = {
    name: "Brown",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [115, 85, 32, 255],
};
solidColorMaps.DarkGray = {
    name: "Dark Gray",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [90, 87, 82, 255],
};
solidColorMaps.Gray = {
    name: "Gray",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [150, 145, 137, 255],
};
solidColorMaps.LightGray = {
    name: "Light Gray",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [188, 184, 167, 255],
};
solidColorMaps.White = {
    name: "White",
    group: "Solid",
    nanclr: [0.0, 0.0, 0.0],
    bytes: [255, 255, 255, 255],
};

onColorMapsLoaded(solidColorMaps);

// >>> Register actions

actionManager.register(
    "ImportColormaps",
    onColorMapsLoaded,
    onColorMapsUnloaded,
);

/*var image = new Image();
image.onload = function() {
    imageCanvas.loadImage("DEBUG.png", image, null, false);
    setHistogramResolution();
};
image.src = "DEBUG.png";*/

/*var image = new Image();
image.src = 'debug_bg.png';
image.onload = function() {
imageCanvas.loadImage('debug_bg.png', image, null, false, false);

image = new Image();
image.src = 'debug_layer3.png';
image.onload = function() {
imageCanvas.loadImage('debug_layer3.png', image, null, true, true);

image = new Image();
image.src = 'debug_layer2.png';
image.onload = function() {
    imageCanvas.loadImage('debug_layer2.png', image, null, true, true);

    image = new Image();
    image.src = 'debug_layer1.png';
    image.onload = function() {
        imageCanvas.loadImage('debug_layer1.png', image, null, true, true);

        image = new Image();
        image.src = 'debug_layer0.png';
        image.onload = function() {
            imageCanvas.loadImage('debug_layer0.png', image, null, true, true);
            setHistogramResolution();
        };
    };
};
};
};*/

showColorPicker();
}

function onColorMapsLoaded(newColorMaps) {
// Make colormap name unique
var pickerChanged = false;
for (var key in newColorMaps) {
    if (key === "_default") colorMaps._default = newColorMaps._default;
    else {
    // Find unique key
    var uniquekey = key;
    var idx = 1;
    while (colorMaps[uniquekey] != null)
        uniquekey = key + " [" + ++idx + "]";

    // Update name field of colormap
    newColorMaps[key].name = uniquekey;

    // Append newColorMaps[key] to colorMaps under uniquekey
    colorMaps[uniquekey] = newColorMaps[key];

    if (newColorMaps[key].inPicker) pickerChanged = true;
    }
}

// Replace colormap names of embedded colormap sections with colormaps
for (var colorMapName in newColorMaps)
    if (
    colorMapName !== "_default" &&
    newColorMaps[colorMapName].sections
    ) {
    // If the loaded colormap contains sections and splitters
    var colormap = newColorMaps[colorMapName];
    colormap.sections.forEach(function (section) {
        var cm = colorMaps[section.colorMap]; // Find section colormap by name
        if (cm)
        // If a colormap with the same name exists, ...
        section.colorMap = cm; // Use existing colormap
        // If colormap wasn't found by name
        else {
        if (section.colorMap.interpolatedColorMap == null) {
            // If section.colorMap == solid color, ...
            // Try to reproduce this solid-color colormap by its name
            var clrstr = section.colorMap;
            if (
            (clrstr.length =
                8 && clrstr[0] === "0" && clrstr[1] === "x")
            ) {
            var r = parseInt(clrstr.substr(2, 2), 16);
            var g = parseInt(clrstr.substr(4, 2), 16);
            var b = parseInt(clrstr.substr(6, 2), 16);
            if (
                r >= 0 &&
                r < 256 &&
                g >= 0 &&
                g < 256 &&
                b >= 0 &&
                b < 256
            ) {
                var recreatedColormap = {
                name: section.colorMap,
                group: "Solid",
                nanclr: [0.0, 0.0, 0.0],
                bytes: [r, g, b, 255],
                inPicker: false,
                };
                var recreatedColormaps = [];
                recreatedColormaps[recreatedColormap.name] =
                recreatedColormap;
                onColorMapsLoaded(recreatedColormaps);
                section.colorMap = recreatedColormap;
                return;
            }
            }
        }

        // Recreate colormap from control points
        var colorTable = new InterpolatedColorMap();
        var controlPointKeys = colormap.interpolatedColorMap.getKeys();
        var controlPoints = colormap.interpolatedColorMap.getSamples();
        controlPointKeys.forEach(function (controlPointKey) {
            var controlPoint = controlPoints[controlPointKey];
            if (
            controlPointKey >= section.start.pos &&
            controlPointKey <= section.end.pos
            )
            colorTable.AddColor(
                controlPointKey,
                controlPoint[0],
                controlPoint[1],
                controlPoint[2],
            );
        });

        var recreatedColormap = {
            name: section.colorMap,
            group: "Recreated",
            nanclr: colormap.nanColor,
            bytes: colorTable.Create(COLOR_MAP_SIZE),
            flipped: 0,
            inPicker: false,
            interpolatedColorMap: colorTable,
            //controlPoints: colorTable.getSamples(),
            //controlPointKeys: colorTable.getKeys(),
            sections: null,
            splitters: null,
        };
        var recreatedColormaps = [];
        recreatedColormaps[recreatedColormap.name] = recreatedColormap;
        onColorMapsLoaded(recreatedColormaps);
        section.colorMap = recreatedColormap;

        // Information about flipping and cropped regions is lost for recreated colormaps
        section.flipped = false;
        section.startValue = 0.0;
        section.endValue = 1.0;
        }
    });
    }

// Create colormap textures
imageCanvas.loadColorMapTextures(COLOR_MAP_SIZE);
colorMapCanvas.loadColorMapTextures(COLOR_MAP_SIZE);

if (pickerChanged) colormapPicker.recreatePicker();

return newColorMaps;
}

function onColorMapsUnloaded(unloadedColorMaps) {
var pickerChanged = false;
for (var key in unloadedColorMaps)
    if (key !== "_default") {
    var colormap = unloadedColorMaps[key];

    if (colormap.inPicker) pickerChanged = true;

    if (colormap.sections)
        // If the loaded colormap contains sections and splitters
        // Replace colormaps of embedded colormap sections with colormap names
        colormap.sections.forEach(function (section) {
        section.colorMap = section.colorMap.name;
        });

    // Remove colormap from colorMaps
    delete colorMaps[key];
    }

if (pickerChanged) colormapPicker.recreatePicker();
}

function colorMap_onDragStart(event) {
event.dataTransfer.setData("ColorMapName", event.target.tag_id);
colorMapCanvas.showTrashButtons();
}

function colorMap_onDragEnd() {
colorMapCanvas.hideTrashButtons();
}

function colorMap_onFlipClick(event) {
var canvas = event.target.tag_canvas;
var colorMap = event.target.tag_colorMap;

colorMap.flipped = !colorMap.flipped;

var ctx = canvas.getContext("2d");
var imgdata = ctx.getImageData(0, 0, COLOR_MAP_SIZE, 1);
var colorMap_numpixels = Math.floor(colorMap.bytes.length / 4);
for (var i = 0; i < colorMap_numpixels; ++i) {
    var j = colorMap.flipped == 1 ? colorMap_numpixels - 1 - i : i;
    imgdata.data[j * 4 + 0] = colorMap.bytes[i * 4 + 0];
    imgdata.data[j * 4 + 1] = colorMap.bytes[i * 4 + 1];
    imgdata.data[j * 4 + 2] = colorMap.bytes[i * 4 + 2];
    imgdata.data[j * 4 + 3] = colorMap.bytes[i * 4 + 3];
}
for (var y = 0; y < canvas.height; ++y)
    for (var x = 0; x < COLOR_MAP_SIZE; x += colorMap_numpixels)
    ctx.putImageData(imgdata, x, y);
}

/*function getHistogramResolution()
{
var rangeHistogramResolution = document.getElementById('rangeHistogramResolution');
return Math.pow(2, rangeHistogramResolution.value);
}*/
function setHistogramResolution() {
var rangeHistogramResolution = document.getElementById(
    "rangeHistogramResolution",
);
var lblHistogramResolution = document.getElementById(
    "lblHistogramResolution",
);
var resolution = Math.pow(2, rangeHistogramResolution.value);

//lblHistogramResolution.innerHTML = resolution;
rangeHistogramResolution.style.visibility = "visible";
lblHistogramResolution.style.visibility = "visible";
var histograms = imageCanvas.createHistograms(resolution);
if (histograms.length !== 0) colorMapCanvas.updateHistogram(histograms);
}

function showColorPicker() {
var divColorMapPicker = document.getElementById("divColorMapPicker");
var divWorkArea = document.getElementById("divWorkArea");

divColorMapPicker.style.display = "inline-block";

var ColorMapPickerWidth = divColorMapPicker.offsetWidth;
divWorkArea.style.left = ColorMapPickerWidth + "px";
divWorkArea.style.width =
    "-moz-calc(100% - " + divWorkArea.style.left + ")";
divWorkArea.style.width =
    "-webkit-calc(100% - " + divWorkArea.style.left + ")";
divWorkArea.style.width = "calc(100% - " + divWorkArea.style.left + ")";

onResize();
}

function hideColorPicker() {
var divColorMapPicker = document.getElementById("divColorMapPicker");
var divWorkArea = document.getElementById("divWorkArea");

divColorMapPicker.style.display = "none";

var ColorMapPickerWidth = divColorMapPicker.offsetWidth;
divWorkArea.style.left = "0px";
divWorkArea.style.width = "100%";

onResize();
}

function toggleColorPicker() {
var divColorMapPicker = document.getElementById("divColorMapPicker");
if (divColorMapPicker.style.display == "inline-block")
    hideColorPicker();
else showColorPicker();
}

function setValueRange() {
var histogramH0 = document.getElementById("lblHistogramH0").value;
var histogramH10 = document.getElementById("lblHistogramH10").value;
colorMapCanvas.setValueRange(histogramH0, histogramH10);
}

function onHistogramButtonPressed() {
document.getElementById("cmdHistogram").style.display = "none";
document.getElementById("cmdAlpha").style.display = "inline-block";
document.getElementById("cmdHistogramAlpha").style.display = "none";
colorMapCanvas.hideHistogram();
colorMapCanvas.showAlphaCurve();
}

function onAlphaButtonPressed() {
document.getElementById("cmdHistogram").style.display = "none";
document.getElementById("cmdAlpha").style.display = "none";
document.getElementById("cmdHistogramAlpha").style.display =
    "inline-block";
colorMapCanvas.showHistogram();
colorMapCanvas.showAlphaCurve();
}

function onHistogramAlphaButtonPressed() {
document.getElementById("cmdHistogram").style.display = "inline-block";
document.getElementById("cmdAlpha").style.display = "none";
document.getElementById("cmdHistogramAlpha").style.display = "none";
colorMapCanvas.showHistogram();
colorMapCanvas.hideAlphaCurve();
}

function onResize() {
var ImageSection = document.getElementById("ImageSection");
var ColorMapSection = document.getElementById("ColorMapSection");
var divColorMapPicker = document.getElementById("divColorMapPicker");

//var cmHeight = window.innerHeight > 2 * HISTOGRAM_SIZE ? HISTOGRAM_SIZE : Math.floor(window.innerHeight / 2);

//var cmHeight = window.innerHeight > 2 * HISTOGRAM_SIZE ? Math.floor(window.innerHeight / 4) : Math.floor(window.innerHeight / 2);

var cmHeightMin = 128,
    MinHeight = 512;
var cmHeightMax = 256,
    MaxHeight = 1024;
var f = (window.innerHeight - MinHeight) / (MaxHeight - MinHeight);
f = Math.max(Math.min(f, 1), 0);
//console.log(f);
var cmHeight = cmHeightMax * f + cmHeightMin * (1 - f);

ImageSection.style.height = window.innerHeight - cmHeight - 20;
ColorMapSection.style.top = window.innerHeight - cmHeight;
ColorMapSection.style.height = cmHeight - 4;

//divColorMapPicker.style["max-height"] = window.innerHeight - cmHeight - 10;

//ImageSection.style.width = window.innerWidth - 16;
//ColorMapSection.style.width = window.innerWidth ;//- 16;

var y = 0;
var h = cmHeight - 12;
var rangeHistogramResolution = document.getElementById(
    "rangeHistogramResolution",
);
if (h > 16) {
    rangeHistogramResolution.style.top = y;
    rangeHistogramResolution.style.height = h;
    rangeHistogramResolution.style.visibility =
    lblHistogramResolution.style.visibility;
} else rangeHistogramResolution.style.visibility = "hidden";

cvAll.forEach(function (canvas) {
    if (typeof canvas.onResize == "function") canvas.onResize();
});
}
onResize();

function handleFileSelect(event) {
var files = event.target.files;
if (files.length >= 1) {
    var reader = new FileReader();
    reader.onload = function (e) {
    var image = new Image();
    image.onload = function () {
        imageCanvas.loadImage(files[0], image, null, false);
        setHistogramResolution();
    };
    image.src = this.result;
    };
    reader.readAsDataURL(files[0]);
}
}

function handleFileDrop(event) {
event.preventDefault();
event = event || window.event;
imageCanvas.hideHighlight();
var files = event.files || event.dataTransfer.files;
if (files) {
    fileDropIsCopy = fileDropIsCopy || event.ctrlKey || event.metaKey;
    var targetRect = event.target.getBoundingClientRect();
    var eventX = event.clientX - targetRect.left;
    var eventY = event.clientY - targetRect.top;
    var fileExt = files[0].name;
    if (fileExt != null) {
    var lastdot = fileExt.lastIndexOf(".");
    if (lastdot != -1) fileExt = fileExt.substring(lastdot + 1);
    else fileExt = null;
    }
    if (fileExt == "im") {
    var reader = new FileReader();
    reader.onload = function (e) {
        var image = readImImage(new Uint8Array(reader.result));
        var view = imageCanvas.getOrCreateView(eventX, eventY);
        imageCanvas.loadImageFromByteArray(
        files[0].name,
        image.bytes,
        image.width,
        image.height,
        view,
        fileDropIsCopy,
        );
        setHistogramResolution();
        colorMapCanvas.setValueRange(image.vmin, image.vmax, "");
    };
    reader.readAsArrayBuffer(files[0]);
    }
    if (fileExt == "fits") {
    /*var fits = new astro.FITS(files[0], function() {
                var dataunit = this.getDataUnit();
                console.log("width = " + dataunit.width);
                console.log("height = " + dataunit.height);
                console.log("depth = " + dataunit.depth);
                console.log("bzero = " + dataunit.bzero);
                console.log("bscale = " + dataunit.bscale);
                console.log("bitpix = " + dataunit.bitpix);
                dataunit.getFrame(0, function(array) {
                    var vmin = Number.MAX_VALUE, vmax = Number.MIN_VALUE;
                    array.forEach(function(value) {
                        vmin = Math.min(vmin, value);
                        vmax = Math.max(vmax, value);
                    });
                    var vscale = 1 / (vmax - vmin), numpixels = array.length;
                    for(var i = 0; i < numpixels; ++i)
                        array[i] = (array[i] - vmin) * vscale;
                    //array = new Float32Array(dataunit.width * dataunit.height);
                    var view = imageCanvas.getOrCreateView(eventX, eventY);
                    imageCanvas.loadImageFromFloatArray(files[0].name, array, dataunit.width, dataunit.height, view, fileDropIsCopy);
                    setHistogramResolution();
                    colorMapCanvas.setValueRange(vmin, vmax, '');
                });
            });*/
    readFitsImage(
        files[0],
        function (err) {
        alert(err);
        },
        function (bytes, width, height, vmin, vmax) {
        var view = imageCanvas.getOrCreateView(eventX, eventY);
        imageCanvas.loadImageFromByteArray(
            files[0].name,
            bytes,
            width,
            height,
            view,
            fileDropIsCopy,
        );
        setHistogramResolution();
        colorMapCanvas.setValueRange(vmin, vmax, "");
        },
        function (floats, width, height, vmin, vmax) {
        var view = imageCanvas.getOrCreateView(eventX, eventY);
        imageCanvas.loadImageFromFloatArray(
            files[0].name,
            floats,
            width,
            height,
            view,
            fileDropIsCopy,
        );
        setHistogramResolution();
        colorMapCanvas.setValueRange(vmin, vmax, "");
        },
    );
    } // Default extension: png
    else {
    // Load image
    var reader = new FileReader();
    reader.onload = function (e) {
        var image = new Image();
        image.onload = function () {
        var view = imageCanvas.getOrCreateView(eventX, eventY);
        imageCanvas.loadImage(
            files[0].name,
            image,
            view,
            fileDropIsCopy,
        );
        setHistogramResolution();
        };
        image.src = this.result;
    };
    reader.readAsDataURL(files[0]);

    // Load value range from PNG tEXt chunks
    reader = new FileReader();
    reader.onload = function () {
        var chunks = readPngChunks(new Uint8Array(reader.result));
        //printPngChunks(chunks);
        if (chunks != null) {
        // If PNG chunks were found:
        var meta = getPngMetaData(chunks); // Read tEXt chunks into meta
        var minValue = meta.MinValue,
            maxValue = meta.MaxValue;
        if (minValue != null && maxValue != null) {
            //var suffix = (minValue.endsWith('%') && maxValue.endsWith('%')) ? '%' : '';
            var suffix = minValue.substring(
            ("" + parseFloat(minValue)).length,
            );
            colorMapCanvas.setValueRange(
            parseFloat(minValue),
            parseFloat(maxValue),
            suffix,
            );
        } else colorMapCanvas.setValueRange(0, 100, "%"); // Default to (0%; 100%)
        } else colorMapCanvas.setValueRange(0, 100, "%"); // Default to (0%; 100%)
    };
    reader.readAsArrayBuffer(files[0]);
    }
}
}

function handleColorMapDrop(event) {
event.preventDefault();
event = event || window.event;
var files = event.files || event.dataTransfer.files;
if (files)
    for (var i = 0; i < files.length; ++i) {
    var reader = new FileReader();
    reader.onload = function (e) {
        readColorMapsFromXml(
        this.result,
        COLOR_MAP_SIZE,
        function (newcolormaps) {
            actionManager.perform("ImportColormaps", newcolormaps);
        },
        );
    };
    reader.readAsDataURL(files[i]);
    }
}

var ctrlPressed = false;
var CTRL = navigator.appVersion.indexOf("Mac") == -1 ? 17 : 224;

function handleKeyDown(event) {
if (event.keyCode === CTRL) ctrlPressed = true;

if (ctrlPressed)
    switch (event.keyCode) {
    case 90:
        event.preventDefault();
        actionManager.undo();
        return;
    case 89:
        event.preventDefault();
        actionManager.redo();
        return;
    }

switch (event.keyCode) {
    case 37: // Left arrow key
    imageCanvas.prevImage();
    setHistogramResolution();
    return;
    case 39: // Right arrow key
    imageCanvas.nextImage();
    setHistogramResolution();
    return;
}
}

function handleKeyUp(event) {
if (event.which === CTRL) ctrlPressed = false;
}

function onColorTableChanged(sections) {
imageCanvas.setColorMap(sections);
colorMapCanvas.setColorMap(sections);
}

function saveColormap() {
downloadColormapDialog.dialog("open");
}

function saveColormapXML() {
var cm = colorMapCanvas.serializeColorMap(new ColormapXmlSerializer());
//console.log(cm);
downloader.href = "data:application/xml;charset=utf-8," + cm;
downloader.download = "colormap.xml";
downloader.click();
}

function saveColormapJSON() {
var cm = colorMapCanvas.serializeColorMap(new ColormapJsonSerializer());
//console.log(cm);
downloader.href = "data:application/json;charset=utf-8," + cm;
downloader.download = "colormap.json";
downloader.click();
}

function saveColormapPNG() {
var cm = colorMapCanvas.serializeColorMap(
    new ColormapPngSerializer(1024, 32),
);
downloader.href = cm;
downloader.download = "colormap.png";
downloader.click();
}

function saveImages() {
var images = imageCanvas.save();

if (images.length === 1) {
    downloader.href = images[0].dataURL;
    downloader.download = images[0].name;
    downloader.click();
} else if (images.length > 1) {
    var zip = new JSZip();
    var filenameCounter = {};
    images.forEach(function (image) {
    // Convert base64-dataURL to base64
    image.dataURL = image.dataURL.substr(
        image.dataURL.indexOf("base64,") + "base64,".length,
    );

    // Rename duplicate files
    var filenameCount = ++filenameCounter[image.name];
    if (Number.isNaN(filenameCount)) filenameCounter[image.name] = 1;
    else
        image.name =
        image.name.substr(0, image.name.length - ".png".length) +
        " (" +
        filenameCount +
        ").png";

    zip.file(image.name, image.dataURL, {
        base64: true,
    });
    });
    zip
    .generateAsync({
        type: "base64",
    })
    .then(function (base64) {
        downloader.href = "data:application/zip;base64," + base64;
        downloader.download = "images.zip";
        downloader.click();
    });
}
}

var ofd = document.getElementById("ofd");
if (ofd !== null) ofd.addEventListener("change", handleFileSelect, false);
