import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { calcObjectsDistance, calcPointHeight } from "./helpers";
import { mtnShape, mtnRangeShape, makeMtnArr } from "./shapes";

const canvasSize = { width: "1000", height: "1000" };
let mountains;

function App() {
	const canvas = useRef(null);
	const [mtnsAmount, setMtnsAmount] = useState(15); // APROX 1-30
	const [mtnClampiness, setMtnClampiness] = useState(6); // APROX 2-8
	const [heightFactor, setheightFactor] = useState(1); // APROX 0-2
	const mtnsHeight = mtnsAmount / 20 + heightFactor;

	function makeCanvas(canvasRef) {
		const ctx = canvasRef.current.getContext("2d");
		mountains = makeMtnArr(canvasSize, mtnsAmount, mtnClampiness, mtnsHeight);
		mountains.sort((a, b) => a.y - b.y);
		mountains.forEach(mtn => mtnShape(ctx, mtn));
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

/* for (let j = 0; j < (canvasSize.width * canvasSize.height) / 3000; j++) {
	const proposedMtnX = Math.random() * canvasSize.width;
	const proposedMtnY = Math.random() * canvasSize.height;
	const pointHeight = calcPointHeight({ x: proposedMtnX, y: proposedMtnY }, mtnRanges);
	const mtnProbability = pointHeight.pointGroundHeight;

	if (mtnProbability > 39) {
		mountains.push({
			x: proposedMtnX,
			y: proposedMtnY,
			height: Math.random() * 5 + 5,
			spread: Math.random() * 5 + 5,
			keyOfMtnRange: pointHeight.pointIsOnMtnKey,
			key: j
		});
		mountains[mountains.length - 1].z = Math.floor(mountains[mountains.length - 1].y);
	}
}

mountains.forEach(mtn => mtnRangeShape(ctx, mtn));
 */

/* let thirdMtn = { x: 500, y: 500 };
		thirdMtn.height = 100;
		thirdMtn.spread = 100;
		mtnShape(ctx, thirdMtn); */
/* let aa = calcObjectsDistance(mountains[0], mountains[1]); */
