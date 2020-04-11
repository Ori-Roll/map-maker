import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { calcObjectsDistance, calcPointHeight } from "./helpers";
import { mtnShape, mtnRangeShape, makeMtnArr } from "./shapes";

const canvasSize = { width: "1000", height: "1000" };
let mountains;

function App() {
	const canvas = useRef(null);
	const [mtnsAmount, setMtnsAmount] = useState(30); // APROX 1-60
	const [mtnClampiness, setMtnClampiness] = useState(1.5); // APROX 1-5
	const [heightFactor, setheightFactor] = useState(0.8); // APROX 0-2
	const [mtnsHeight] = useState(mtnsAmount / 30 + heightFactor);

	function makeCanvas(canvasRef) {
		const ctx = canvasRef.current.getContext("2d");
		mountains = makeMtnArr(canvasSize, mtnsAmount, mtnClampiness, mtnsHeight);
		mountains.sort((a, b) => a.y - b.y);
		mountains.forEach(mtn => mtnShape(ctx, mtn));

		makePrecipitationMap(ctx);
	}

	useEffect(() => {
		makeCanvas(canvas);
	}, []);

	function makePrecipitationMap(ctx) {
		let pointsDistance = 8;
		const pMap = [];
		const precipitationMap = new Array(6).fill({
			x: Math.random() * canvasSize.width,
			y: Math.random() * canvasSize.height
		});
		let xPos = pointsDistance / 2;
		let yPos = pointsDistance / 2;
		let mtnsWithBigSpread = mountains.map(item => {
			return { ...item, spread: item.spread * 4, height: item.height / 2 };
		});
		mtnsWithBigSpread = [...mtnsWithBigSpread, ...mountains];
		// Creates simple array, not a 2D array formation. Works better for this
		for (yPos; yPos < ctx.canvas.height; yPos += pointsDistance) {
			for (xPos; xPos < ctx.canvas.width; xPos += pointsDistance) {
				let position = { x: xPos, y: yPos };
				let height = Math.sqrt(calcPointHeight(position, mtnsWithBigSpread).pointGroundHeight);
				/* let precipitation = Math.floor(
					((Math.random() * precipitationFactor * 25 + height * 35) /
						(precipitationFactor / 0.4)) **
						2
				); */
				const precipitation =
					calcObjectsDistance(
						precipitationMap.reduce((a, b) => {
							return a > b ? a : b;
						}),
						position
					) / 5000;
				let waterBalance = precipitation;
				/* ctx.fillStyle = `rgba(0,0,255,${precipitation / 1000}`; */
				/* ctx.fillRect(position.x - 2, position.y - 2, 4, 4); */

				pMap.push({
					position: position,
					height: height,
					precipitation: precipitation,
					waterBalance: waterBalance
				});

				pMap[pMap.length - 1].getPointNeighbors = getPointNeighbors;
			}

			xPos = pointsDistance / 2;
		}

		function getPointNeighbors(point, pointArr) {
			/* console.log("getPointNeighbor, pointArr is", pointArr);
			console.log("getPointNeighbor, index", point); */
			let aboveIndex = pointArr.findIndex(neighbor => {
				return (
					neighbor.position.y === point.position.y - pointsDistance &&
					neighbor.position.x === point.position.x
				);
			});
			let belowIndex = pointArr.findIndex(neighbor => {
				return (
					neighbor.position.y === point.position.y + pointsDistance &&
					neighbor.position.x === point.position.x
				);
			});
			let onRightIndex = pointArr.findIndex(neighbor => {
				return (
					neighbor.position.y === point.position.y &&
					neighbor.position.x === point.position.x + pointsDistance
				);
			});
			let onLeftIndex = pointArr.findIndex(neighbor => {
				return (
					neighbor.position.y === point.position.y &&
					neighbor.position.x === point.position.x - pointsDistance
				);
			});
			return {
				above: pointArr[aboveIndex] ? pointArr[aboveIndex] : "none",
				below: pointArr[belowIndex] ? pointArr[belowIndex] : "none",
				onRight: pointArr[onRightIndex] ? pointArr[onRightIndex] : "none",
				right: pointArr[onRightIndex] ? pointArr[onRightIndex] : "none",
				onLeft: pointArr[onLeftIndex] ? pointArr[onLeftIndex] : "none",
				left: pointArr[onLeftIndex] ? pointArr[onLeftIndex] : "none"
			};
		}

		/* console.log("getPointNeighbors", getPointNeighbors(151, pMap)); */

		const pMapByHeight = [...pMap].sort((a, b) => {
			return a.height >= b.height ? -1 : 1;
		});

		function waterFlow() {
			xPos = pointsDistance / 2;
			yPos = pointsDistance / 2;

			pMapByHeight.forEach(point => {
				const pointNeighbors = [
					point.getPointNeighbors(point, pMap).above,
					point.getPointNeighbors(point, pMap).below,
					point.getPointNeighbors(point, pMap).right,
					point.getPointNeighbors(point, pMap).left
				];
				let allHeightDifference = 0;
				pointNeighbors.forEach(item => {
					if (!isNaN(item.height) && item.height < point.height) {
						allHeightDifference += point.height - item.height;
					}
				});
				let waterParts = point.height ? point.waterBalance / allHeightDifference : 0;
				waterParts = waterParts > 0 && waterParts < 700 ? waterParts : 1;

				pointNeighbors.forEach(neighbor => {
					if (neighbor !== "none" && neighbor.height <= point.height) {
						neighbor.waterBalance += waterParts * (point.height - neighbor.height);
						point.waterBalance -= neighbor.waterBalance / (0.4 / (point.height - neighbor.height));
					}
				});
				/* console.log(point.waterBalance); */
			});
		}
		/* console.log(pMap); */
		waterFlow();
		/* console.log(pMapByHeight); */
		pMapByHeight.forEach(point => {
			let pointColorIfOverflow = `rgba(100, 121, 140,0.8)`;
			let pointColorIfWaterAbsorbed = `rgba(152, 168, 114,${point.waterBalance * 0.1})`;
			let overflowThreshold = 8;
			ctx.fillStyle =
				point.waterBalance > overflowThreshold ? pointColorIfOverflow : pointColorIfWaterAbsorbed;

			if (point.waterBalance > overflowThreshold) {
				ctx.beginPath();
				ctx.arc(
					point.position.x + Math.random() * 4 - Math.random() * 4,
					point.position.y + Math.random() * 4 - Math.random() * 4 - point.height * 2,
					4,
					0,
					360
				);
				ctx.fill();
			} else if (
				point.waterBalance < overflowThreshold &&
				Math.random() + 1 > 2.3 / point.waterBalance
			) {
				ctx.beginPath();
				ctx.arc(
					point.position.x + Math.random() * 4 - Math.random() * 4,
					point.position.y + Math.random() * 4 - Math.random() * 4 - point.height * 2,
					8,
					0,
					360
				);
				ctx.fill();
			}
		});
	}

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
