import actions from './actions';

const initialState = {
    input: 'a',
    output: [
        "This is a random text to be highlighted in the demo app",
        "Guess what, this is another random text to be highlighted in the demo app",
        "Just some more output"
    ],
    matchCase: false,
    caretIndex: 0,
    totalMatches: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actions.INCREMENT_CARET): 
            return {
                ...state,
                caretIndex: state.caretIndex + 1
            };
        case (actions.DECREMENT_CARET): 
            return {
                ...state,
                caretIndex: state.caretIndex - 1
            };
        case (actions.UPDATE_INPUT): 
            return {
                ...state,
                input: action.input
            };
        default: 
            return state;
    }
}

export default reducer;
