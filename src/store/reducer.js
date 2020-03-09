import actions from './actions';

const initialState = {
    input: '',
    output: [
        "This is a random text to be highlighted in the demo app",
        "Guess what, this is another random text to be highlighted in the demo app",
        "Just some more output"
    ],
    matchCase: false,
    caretIndex: 0,
    totalMatches: 0
}

const incrementCaret = (state, action) => {
    return {
        ...state,
        caretIndex: state.caretIndex + 1
    };
}

const decrementCaret = (state, action) => {
    return {
        ...state,
        caretIndex: state.caretIndex - 1
    };
}

const updateInput = (state, action) => {
    let count = 0;
    if (action.input) {
        state.output.forEach(out => {
            const parts = getSplitParts(out, action.input, state.matchCase);
            parts.forEach(part => {
                if (part.toLowerCase() === action.input.toLowerCase()) {
                    count += 1;
                }
            })
        })
    }
    return {
        ...state,
        input: action.input,
        totalMatches: count
    };
}

const getSplitParts = (text, highlight, matchCase) => {
    let regex = new RegExp(`(${highlight})`, "gi");
    if (matchCase) {
        regex = new RegExp(`(${highlight})`);
    }
    return text.split(regex);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actions.INCREMENT_CARET): return incrementCaret(state, action);
        case (actions.DECREMENT_CARET): return decrementCaret(state, action);
        case (actions.UPDATE_INPUT): return updateInput(state, action);
        default: return state;
    }
}

export default reducer;
