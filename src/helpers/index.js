function calcObjectsDistance(objA, objB) {
	return Math.sqrt((objA.x - objB.x) ** 2 + (objA.y - objB.y) ** 2);
}

function calcPointHeight(point, mountainsArr) {
	let pointGroundHeight = 0;
	let pointIsOnMtnKey = 0;

	mountainsArr.forEach(mtn => {
		let pointToMtnDistance = calcObjectsDistance(point, mtn);
		if (pointToMtnDistance < mtn.spread) {
			let pointHeightInMtn = mtn.height * ((mtn.spread - pointToMtnDistance) / mtn.spread);
			pointGroundHeight =
				pointHeightInMtn > pointGroundHeight ? pointHeightInMtn : pointGroundHeight;
			pointIsOnMtnKey = pointHeightInMtn > pointGroundHeight ? mtn.key : pointIsOnMtnKey;
		}
	});
	return { pointGroundHeight: pointGroundHeight, pointIsOnMtnKey: pointIsOnMtnKey };
}

export { calcObjectsDistance, calcPointHeight };

/* 
console.log("-----------valid mountain-----------");
			console.log("height is :" + mtn.height);
			console.log("spread is:" + mtn.spread);
			console.log("pointToMtnDistance is:" + pointToMtnDistance); 

console.log("height precent is is ", (mtn.spread - pointToMtnDistance) / mtn.spread);
			console.log("pointHeightInMtn is ", pointHeightInMtn);
 */

/* console.log(
	"YEA: ",
	calcPointHeight({ x: 10, y: 0 }, [
		{ x: 0, y: 0, height: 20, spread: 40, key: 0 },
		{ x: 20, y: 0, height: 40, spread: 40, key: 1 }
	])
); */
