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

export function mtnShape(ctx, mtnObj) {
	if (typeof mtnObj !== "object") {
		console.log("no mtnObj provided");
	}

	let height = mtnObj.height ? mtnObj.height : 40;
	let spread = mtnObj.spread ? mtnObj.spread : 100;
	let x = mtnObj.x ? mtnObj.x - spread / 2 : 100;
	let y = mtnObj.y ? mtnObj.y - spread / 2 : 100;

	ctx.beginPath();
	ctx.moveTo(x - spread / 2, y);
	ctx.lineTo(x, y - height);
	ctx.lineTo(x + spread / 2, y);
	ctx.stroke();
	ctx.fillStyle = "#c2bb99";
	ctx.fill();
	/* let mtnGradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);
	mtnGradient.addColorStop(0, "rgba(255, 255, 255)");
	mtnGradient.addColorStop(0.7, "lightGray");
	mtnGradient.addColorStop(0.9, "rgba(0, 0, 0)");
	ctx.fillStyle = mtnGradient;
	ctx.strokeRect(x, y, spread, spread); */
}
