import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { calcObjectsDistance, calcPointHeight } from "./helpers";
import { mtnShape } from "./shapes";

const canvasSize = { width: "1000", height: "1000" };
const mtnRanges = [];
const mountains = [];

function App() {
	const canvas = useRef(null);

	function makeCanvas(canvasRef) {
		console.log("canvasRef is: ", canvasRef);
		const ctx = canvasRef.current.getContext("2d");

		for (let i = 0; i < (canvasSize.width * canvasSize.height) / 80000; i++) {
			mtnRanges.push({
				x: Math.random() * canvasSize.width,
				y: Math.random() * canvasSize.height,
				height: Math.random() * 10 + 15,
				spread: Math.random() * 120 + 60,
				key: i
			});
			mtnRanges[i].z = Math.floor(mtnRanges[i].y);
		}

		for (let j = 0; j < (canvasSize.width * canvasSize.height) / 4000; j++) {
			const proposedMtnX = Math.random() * canvasSize.width;
			const proposedMtnY = Math.random() * canvasSize.height;
			const pointHeight = calcPointHeight({ x: proposedMtnX, y: proposedMtnY }, mtnRanges);
			const mtnProbability = pointHeight.pointGroundHeight + (Math.random() + 0.2);
			console.log("mtn probability: " + mtnProbability);

			if (mtnProbability > 2.5) {
				mountains.push({
					x: proposedMtnX,
					y: proposedMtnY,
					height: Math.random() * 10 + 15,
					spread: Math.random() * 40 + 30,
					keyOfMtnRange: pointHeight.pointIsOnMtnKey,
					key: j
				});
				console.log(j);
				console.log("!!!!!!!!!!!!!!mountains[j].y : " + mountains[mountains.length - 1].y);
				mountains[mountains.length - 1].z = Math.floor(mountains[mountains.length - 1].y);
			}
		}
		mountains.sort((a, b) => a.z - b.z);
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
