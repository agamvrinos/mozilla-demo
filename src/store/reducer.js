import actions from './actions';

const initialState = {
    visibleMessages: ["1", "2", "3"],
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
    if (state.caretIndex === state.totalMatches - 1) {
        return state;
    }
    return {
        ...state,
        caretIndex: state.caretIndex + 1
    };
}

const decrementCaret = (state, action) => {
    if (state.caretIndex === 0) {
        return state;
    }
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

const toggleMatchCase = (state, action) => {
    let count = 0;
    if (state.input) {
        state.output.forEach(out => {
            const parts = getSplitParts(out, state.input, !state.matchCase);
            parts.forEach(part => {
                if (part.toLowerCase() === state.input.toLowerCase()) {
                    count += 1;
                }
            })
        })
    }
    return {
        ...state,
        totalMatches: count,
        caretIndex: 0,
        matchCase: !state.matchCase
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
        case (actions.TOGGLE_MATCH_CASE): return toggleMatchCase(state, action);
        default: return state;
    }
}

export default reducer;
