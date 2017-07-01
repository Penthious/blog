import axios from "axios";
import * as types from "../constants/reviewsTypes";
import { logoutUser } from "./authActions";

export const retrieveReviews = (dispatch) => {
    dispatch({ type: types.FACEBOOK_REVIEWS_LOADING });
    dispatch({ type: types.GOOGLE_REVIEWS_LOADING });
    dispatch({ type: types.YELP_REVIEWS_LOADING });
    axios
        .get("api/review")
        .then((response) => {
            console.log(response);
            if (response.data.facebook_reviews) {
                dispatch({
                    type: types.FACEBOOK_REVIEWS_SUCCESS,
                    payload: response.data.facebook_reviews,
                });
            }
            if (response.data.google_reviews) {
                dispatch({
                    type: types.GOOGLE_REVIEWS_SUCCESS,
                    payload: response.data.google_reviews,
                });
            }
            if (response.data.yelp_reviews) {
                dispatch({
                    type: types.YELP_REVIEWS_SUCCESS,
                    payload: response.data.yelp_reviews,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const reviewsSuccess = () => {};
