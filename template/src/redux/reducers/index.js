import defaultReducer from './defaultReducer'


// IF MORE THAN ONE REDUCER:

	// import { combineReducers } from 'redux';

	// Combine Reducers

	// const reducer = combineReducers({
	// 	miniState1: reducer1,
	// 	miniState2: reducer2
	// });


// IF ONLY ONE REDUCER
const reducer = defaultReducer;



export default reducer;
