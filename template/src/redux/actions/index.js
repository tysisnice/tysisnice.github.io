
export function defaultAction(x, y) {

	const n = y + 'poop';

	return {
		type: 'DEFAULT',
		new: x,
		more: n
	}
}
