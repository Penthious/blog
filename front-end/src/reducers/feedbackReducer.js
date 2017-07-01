import * as types from "../constants/feedbackTypes";

const INITIAL_STATE = {
    feedback: { feedback: [], error: null, loading: false },
};
export default function feedbackReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.FEEDBACK_LOADING:
            return {
                ...state,
                feedback: { feedback: [], error: null, loading: true },
            };
        case types.FEEDBACK_ERROR:
            return {
                ...state,
                feedback: { feedback: [], error: action.payload, loading: false },
            };
        case types.FEEDBACK_SUCCESS:
            return {
                ...state,
                feedback: { feedback: action.payload, error: null, loading: false },
            };
        default:
            return { ...state };
    }
}
