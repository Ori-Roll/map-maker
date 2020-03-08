import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { calcObjectsDistance, calcPointHeight } from "./helpers";
import { mtnShape, mtnRangeShape } from "./shapes";

const canvasSize = { width: "1000", height: "1000" };
const mtnRanges = []; // RENAME THIS TO "elevation"
const mountains = [];

function App() {
	const canvas = useRef(null);
	const [mtnsAmount, setMtnsAmount] = useState(10); // APROX 1-30
	const [heightFactor, setheightFactor] = useState(1.2); // APROX 0-2
	const mtnsHeight = mtnsAmount / 20 + heightFactor;

	function makeCanvas(canvasRef) {
		console.log("canvasRef is: ", canvasRef);
		const ctx = canvasRef.current.getContext("2d");

		for (let i = 0; i < (canvasSize.width * canvasSize.height) / ((1 / mtnsAmount) * 100000); i++) {
			mtnRanges.push({
				x: Math.random() * canvasSize.width,
				y: Math.random() * canvasSize.height,

				spread: Math.random() * 160 + 30, //160 40
				key: i
			});
			mtnRanges[i].z = Math.floor(mtnRanges[i].y);
			mtnRanges[i].height =
				(Math.random() + 0.5) * mtnsHeight * (mtnRanges[i].spread / 10) +
				Math.random() * mtnsHeight +
				3;
		}
		console.log("mtnRanges", mtnRanges);

		for (let j = 0; j < (canvasSize.width * canvasSize.height) / 10000; j++) {
			const proposedMtnX = Math.random() * canvasSize.width;
			const proposedMtnY = Math.random() * canvasSize.height;
			const pointHeight = calcPointHeight({ x: proposedMtnX, y: proposedMtnY }, mtnRanges);

			const mtnProbability = pointHeight.pointGroundHeight; /* + (Math.random() + 0.2) */
			/* console.log("mtn probability: " + mtnProbability); */

			if (mtnProbability > 30) {
				console.log("pointHeight", pointHeight.pointGroundHeight);
				mountains.push({
					x: proposedMtnX,
					y: proposedMtnY,
					height: Math.random() * 5 + 5,
					spread: Math.random() * 5 + 5,
					keyOfMtnRange: pointHeight.pointIsOnMtnKey,
					key: j
				});
				/* console.log(j);
				console.log("!!!!!!!!!!!!!!mountains[j].y : " + mountains[mountains.length - 1].y); */
				mountains[mountains.length - 1].z = Math.floor(mountains[mountains.length - 1].y);
			}
		}
		mountains.sort((a, b) => a.z - b.z);
		mtnRanges.forEach(range => mtnRangeShape(ctx, range));
		mountains.forEach(mtn => mtnShape(ctx, mtn));

		/* let thirdMtn = { x: 500, y: 500 };
		thirdMtn.height = 100;
		thirdMtn.spread = 100;
		mtnShape(ctx, thirdMtn); */
		/* let aa = calcObjectsDistance(mountains[0], mountains[1]); */
	}

	useEffect(() => {
		makeCanvas(canvas);
	}, []);

	return (
		<div className='App'>
			<canvas
				ref={canvas}
				style={{ backgroundColor: "#c2bb99" }}
				width={canvasSize.width}
				height={canvasSize.width}></canvas>
		</div>
	);
}

export default App;
