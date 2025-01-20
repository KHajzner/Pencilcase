import React from "react";

const addEmptyPans = (filledPans, maxPans) => {
    if(!filledPans || filledPans?.length >= maxPans){
        return filledPans;
    }
    const extraElements = Math.max(0, maxPans - filledPans.length);
    const placeholders = Array.from({ length: extraElements }, (_, index) => ({
        uid: `${index + filledPans.length}`,
        colour: "EmptyPan", 
        }));
    return filledPans.concat(placeholders);
}

export default addEmptyPans;