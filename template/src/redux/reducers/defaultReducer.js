

const initialState = { new: 'butt' };
const reducer = function(state = initialState, action) {
	switch(action.type) {
		case 'ACTION':
			return Object.assign({}, state, {
				addingToState: action.new,
				moreNewState: action.more
			});
	}
}

export default reducer


