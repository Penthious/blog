import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import reviewReducer from "./reviewsReducer";
import sentHistoryReducer from "./sentHistoryReducer";
import feedbackReducer from "./feedbackReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    reviews: reviewReducer,
    sentHistory: sentHistoryReducer,
    feedback: feedbackReducer,
    routing: routerReducer,
    form: formReducer.plugin({
        contact: (state, action) => {
            switch (action.type) {
                case "ACCOUNT_SAVE_SUCCESS":
                    return undefined;
                default:
                    return state;
            }
        },
    }),
});

export default rootReducer;
