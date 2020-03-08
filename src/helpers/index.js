function calcObjectsDistance(objA, objB) {
	return Math.sqrt((objA.x - objB.x) ** 2 + (objA.y - objB.y) ** 2);
}

function calcPointHeight(point, mountainsArr) {
	let pointGroundHeight = 0;
	let pointIsOnMtnKey = 0;

	mountainsArr.forEach(mtn => {
		let pointToMtnDistance = calcObjectsDistance(point, mtn);
		if (pointToMtnDistance < mtn.spread) {
			console.log("valid mountain: spread is:" + mtn.spread + "height is :" + mtn.height);
			console.log("pointToMtnDistance is:" + pointToMtnDistance);
			let pointHeightInMtn = mtn.height * (pointToMtnDistance / mtn.spread);
			pointGroundHeight =
				pointHeightInMtn > pointGroundHeight ? pointHeightInMtn : pointGroundHeight;
			pointIsOnMtnKey = pointHeightInMtn > pointGroundHeight ? mtn.key : pointIsOnMtnKey;
		}
		console.log("pointGroundHeight: " + pointGroundHeight);
	});
	return { pointGroundHeight: pointGroundHeight, pointIsOnMtnKey: pointIsOnMtnKey };
}

/* console.log(
	"YEA: ",
	calcPointHeight({ x: 10, y: 0 }, [
		{ x: 0, y: 0, height: 20, spread: 40, key: 0 },
		{ x: 20, y: 0, height: 40, spread: 40, key: 1 }
	])
); */

export { calcObjectsDistance, calcPointHeight };
