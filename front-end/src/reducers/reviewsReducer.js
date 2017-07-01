import * as types from "../constants/reviewsTypes";

const INITIAL_STATE = {
    facebook: { reviews: [], errors: null, loading: false },
    google: { reviews: [], errors: null, loading: false },
    yelp: { reviews: [], errors: null, loading: false },
};
export default function reviewReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGOUT:
            return {
                ...state,
                ...INITIAL_STATE,
            };
        case types.FACEBOOK_REVIEWS_SUCCESS:
            return {
                ...state,
                facebook: { reviews: action.payload, errors: null, loading: false },
            };
        case types.FACEBOOK_REVIEWS_LOADING:
            return {
                ...state,
                facebook: { reviews: [], errors: null, loading: true },
            };
        case types.FACEBOOK_REVIEWS_ERROR:
            return {
                ...state,
                facebook: { reviews: [], errors: action.payload, loading: false },
            };
        case types.GOOGLE_REVIEWS_SUCCESS:
            return {
                ...state,
                google: { reviews: action.payload, errors: null, loading: false },
            };
        case types.GOOGLE_REVIEWS_LOADING:
            return {
                ...state,
                google: { reviews: [], errors: null, loading: true },
            };
        case types.GOOGLE_REVIEWS_ERROR:
            return {
                ...state,
                google: { reviews: [], errors: action.payload, loading: false },
            };
        case types.YELP_REVIEWS_SUCCESS:
            return {
                ...state,
                yelp: { reviews: action.payload, errors: null, loading: false },
            };
        case types.YELP_REVIEWS_LOADING:
            return {
                ...state,
                yelp: { reviews: [], errors: null, loading: true },
            };
        case types.YELP_REVIEWS_ERROR:
            return {
                ...state,
                yelp: { reviews: [], errors: action.payload, loading: false },
            };
        default:
            return { ...state };
    }
}
