import React from "react";

const addEmptyPans = (filledPans, maxPans, paletteName) => {
    const extraElements = Math.max(0, maxPans - filledPans.length);
    const placeholders = Array.from({ length: extraElements }, (_, index) => ({
        uid: `${index + filledPans.length + Math.random()}`,
        colour: "EmptyPan", 
        palette: paletteName
        }));
    return filledPans.concat(placeholders);
}

export default addEmptyPans;