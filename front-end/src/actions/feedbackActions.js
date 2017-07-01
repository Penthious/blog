/* @flow */
import axios from "axios";
import * as types from "../constants/feedbackTypes";
import { logoutUser } from "./authActions";
import type { Action, Dispatch, GlobalState, ThunkAction } from "../flowTypes";

export const retrieveFeedback = (dispatch: Dispatch) => {
    dispatch({ type: types.FEEDBACK_LOADING, payload: {} });
    axios
        .get("api/feedback")
        .then((response) => {
            dispatch({
                type: types.FEEDBACK_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            dispatch({
                type: types.FEEDBACK_ERROR,
                payload: error.data,
            });
        });
};

export const resolveFeedback = (feedback: Object) => (dispatch: Dispatch) => {
    axios
        .post(`api/feedback/update/${feedback.id}`)
        .then((response) => {
            dispatch({
                type: types.FEEDBACK_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            dispatch({
                type: types.FEEDBACK_ERROR,
                payload: error.data,
            });
        });
};
