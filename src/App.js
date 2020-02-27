import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { mtnShape } from "./shapes";

const canvasSize = { width: "1000", height: "1000" };
const mountains = [];

function App() {
	const canvas = useRef(null);

	function makeCanvas(canvasRef) {
		console.log("canvasRef is: ", canvasRef);
		const ctx = canvasRef.current.getContext("2d");

		for (let i = 0; i < (canvasSize.width * canvasSize.height) / 10000; i++) {
			mountains.push({
				size: Math.random() * 50 + 5,
				x: Math.random() * canvasSize.width,
				y: Math.random() * canvasSize.height
			});
			mountains[i].z = Math.floor(mountains[i].y);
			console.log("Mount = ", mountains[i]);
		}
		mountains.sort((a, b) => a.z - b.z);
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
