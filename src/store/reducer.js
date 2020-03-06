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

const getSplitParts = (text, highlight, matchCase) => {
    let regex = new RegExp(`(${highlight})`, "gi");
    if (matchCase) {
        regex = new RegExp(`(${highlight})`);
    }
    return text.split(regex);
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
        default: 
            return state;
    }
}

export default reducer;
