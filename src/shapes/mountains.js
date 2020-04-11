import { calcPointHeight, calcObjectsDistance } from "../helpers";

export function makeMtnArr(canvasSize, mtnsAmount, mtnClampiness, mtnsHeight) {
	const newMtnsArr = [];

	for (let i = 0; i < (canvasSize.width * canvasSize.height * mtnsAmount) / 80000; i++) {
		const proposedMtnX = Math.random() * canvasSize.width;
		const proposedMtnY = Math.random() * canvasSize.height;
		const pointHeight = calcPointHeight({ x: proposedMtnX, y: proposedMtnY }, newMtnsArr);
		const mtnProbability =
			Math.random() * 10 + pointHeight.pointGroundHeight * 2 + 3000 / mtnClampiness / i;
		const tooCloseToOtherMtn = (() => {
			if (newMtnsArr[pointHeight.pointIsOnMtnKey]) {
				/* console.log(newMtnsArr); */
				if (
					calcObjectsDistance(
						{ x: proposedMtnX, y: proposedMtnY },
						{
							x: newMtnsArr[pointHeight.pointIsOnMtnKey].x,
							y: newMtnsArr[pointHeight.pointIsOnMtnKey].y
						}
					) < 80
				) {
					console.log("too close");
					return true;
				} else {
					return false;
				}
			} else {
				console.log("its 0");
				return false;
			}
		})();
		if (mtnProbability > 40 /* && tooCloseToOtherMtn */) {
			const newKey = i;
			const newX = proposedMtnX;
			const newY = proposedMtnY;
			const newSpread = Math.floor(Math.random() * 64 + 16);
			const newHeight = (Math.random() + 2) * mtnsHeight * (newSpread / 8) + 5; // MAKE AFFECTED BY INITIAL HEIGHT !!!
			const newZ = Math.floor(newY);

			newMtnsArr.push({
				key: newKey,
				x: newX,
				y: newY,
				z: newZ,
				spread: newSpread,
				height: newHeight
			});
		}
	}

	return newMtnsArr;
}

export function mtnShape(ctx, mtnObj) {
	if (typeof mtnObj !== "object") {
		console.log("no mtnObj provided");
	}

	let height = mtnObj.height ? mtnObj.height : 40;
	let spread = mtnObj.spread ? mtnObj.spread : 100;
	let x = mtnObj.x ? mtnObj.x : 100;
	let y = mtnObj.y ? mtnObj.y : 100;

	ctx.beginPath();
	ctx.moveTo(x - spread / 2, y);
	ctx.lineTo(x, y - height);
	ctx.lineTo(x + spread / 2, y);
	ctx.lineWidth = 6;
	ctx.strokeStyle = "#968372";
	ctx.stroke();
	ctx.fillStyle = "#c2bb99";
	ctx.fill();
}

/* let mtnGradient = ctx.createRadialGradient(110, 90, 30, 100, 100, 70);
	mtnGradient.addColorStop(0, "rgba(255, 255, 255)");
	mtnGradient.addColorStop(0.7, "lightGray");
	mtnGradient.addColorStop(0.9, "rgba(0, 0, 0)");
	ctx.fillStyle = mtnGradient;
	ctx.strokeRect(x, y, spread, spread); */

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
