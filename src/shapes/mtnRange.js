export function mtnRangeShape(ctx, mtnRange) {
	let grd = ctx.createRadialGradient(
		mtnRange.x,
		mtnRange.y,
		1,
		mtnRange.x,
		mtnRange.y,
		mtnRange.spread
	);

	grd.addColorStop(0, `rgba(55, 45, 30, ${mtnRange.height / 120})`);
	grd.addColorStop(0.35, `rgba(55, 45, 30, ${mtnRange.height / 190})`);
	grd.addColorStop(1, "rgba(194, 187, 153, 0)");
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, ctx.canvas.scrollWidth, ctx.canvas.scrollWidth);
}
