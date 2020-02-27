/* import React, { useState, useEffect } from "react";

function mountain() {
    const mtnSize = useState(10);
    const mtnPosition = useState(100, 100);

    useEffect(
        ()=>{}
        ,[mtnSize, mtnPosition]
    )
}
 */

export function mtnShape(ctx, sizeOrMtnObj = 50, xPos = 100, yPos = 100) {
	let size = sizeOrMtnObj;
	let x = xPos;
	let y = yPos;

	if (typeof sizeOrMtnObj === "object") {
		size = sizeOrMtnObj.size;
		x = sizeOrMtnObj.x;
		y = sizeOrMtnObj.y;
	}

	ctx.beginPath();
	ctx.moveTo(x - size / 2, y);
	ctx.lineTo(x, y - size);
	ctx.lineTo(x + size / 2, y);
	ctx.stroke();
	ctx.fillStyle = "#c2bb99";
	ctx.fill();
}
