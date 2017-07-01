// @flow
import axios from "axios";
import { reset } from "redux-form";
import { push } from "react-router-redux";
import * as types from "../constants/authTypes";
import getFormData from "../utils/getFormData";
import axiosSettings from "../axiosSettings";
import routes from "../routes";

/**
 * Logs out the user
 *
 * @returns {{type: string}}
 */
export const logoutUser = (dispatch) => {
    console.log("we are in the action");
    console.log(dispatch);
    localStorage.removeItem("token");
    dispatch({ type: types.LOGOUT });
    dispatch(push(routes.login));
};

/**
 * Ajax request to fetch current user info
 *
 * @param navigate
 */
export const userInfo = (navigate = false) => (dispatch) => {
    dispatch({ type: types.USER_INFO });
    axios
        .get("api/user/jwt")
        .then((response) => {
            dispatch({
                type: types.USER_INFO_SUCCESS,
                payload: response.data,
            });
            dispatch({ type: types.AUTHENTICATE });
            if (response.data.business) {
                dispatch({
                    type: types.BUSINESS_SUCCESS,
                    payload: response.data.business,
                });
                if (response.data.business.review_accounts.length > 0) {
                    dispatch({
                        type: types.ACCOUNTS_SUCCESS,
                        payload: response.data.business.review_accounts,
                    });
                }
            }
            if (navigate) {
                dispatch(push(routes.dashboard));
            }
        })
        .catch((error) => {
            console.log(error);
            dispatch(logoutUser);
        });
};

export const updateUser = data => (dispatch) => {
    console.log("uoeau", data);
    axios
        .post("api/user/update", { ...data, _method: "PATCH" })
        .then((response) => {
            console.log(response);
            dispatch(userInfo());
        })
        .catch((error) => {
            console.log(error);
        });
};

export const deleteUser = (dispatch) => {
    axios
        .delete("api/user/delete")
        .then((response) => {
            console.log(response);
            dispatch(logoutUser);
        })
        .catch(error => console.log(error));
};

export const updatePassword = data => () => {
    console.log(data);
    axios
        .post("api/user/update", { ...data, _method: "PATCH" })
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

/**
 * Login the user
 *
 * @param email
 * @param password
 * @param navigate
 */
export const loginUser = ({ email, password, navigate }) => (dispatch) => {
    axios
        .post("api/login", { email, password })
        .then((response, store) => {
            console.log(store);
            dispatch({
                type: types.LOGIN_TOKEN,
                payload: response.data,
            });
            console.log(response.data);
            localStorage.setItem("token", response.data);
            dispatch({ type: types.AUTHENTICATE });
            axiosSettings(dispatch);
            dispatch(userInfo(navigate));
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 * Register a new user
 *
 * @param data = { name, email, password, password_confirmation }
 */
export const registerUser = data => (dispatch) => {
    axios
        .post("api/register", data)
        .then((response) => {
            console.log(response.data);
            dispatch({ type: types.AUTHENTICATE });
            localStorage.setItem("token", response.data);
            dispatch({
                type: types.LOGIN_TOKEN,
                payload: response.data,
            });
            axiosSettings(dispatch);
            dispatch(userInfo());
            dispatch(push(routes.businessCreate));
        })
        .catch((error) => {
            if (error.data === "EMAIL_EXISTS") {
                console.log("error duplicate email");
            } else {
                console.log(error.data);
            }
        });
};

/**
 * Creates the users business
 *
 * @param data = { name, address, email, city, phone_number, state, zip, image }
 */
export const createBusiness = data => (dispatch) => {
    axios
        .post("api/business/store", getFormData(data), {
            headers: {
                "content-type": ["application/json", "multipart/form-data"],
            },
        })
        .then((response) => {
            console.log(response.data);
            dispatch(push(routes.businessAccountsCreate));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const updateBusiness = data => (dispatch) => {
    const formData = getFormData(data);
    formData.set("_method", "PATCH");
    axios
        .post("api/business/update", formData, {
            headers: {
                "content-type": ["multipart/form-data"],
            },
        })
        .then((response) => {
            console.log(response);
            dispatch(userInfo());
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 * Creates the users review accounts
 *
 * @param data = { business_name-*, name-*, priority-* }
 * // * = google || yelp || facebook
 */
export const createAccounts = data => (dispatch) => {
    const formData = getFormData(data);
    if (data["business_name-google"]) {
        formData.set("name-google", "google");
    }
    if (data["business_name-facebook"]) {
        formData.set("name-facebook", "facebook");
    }
    if (data["business_name-yelp"]) {
        formData.set("name-yelp", "yelp");
    }
    axios
        .post("api/account/store", formData)
        .then((response) => {
            console.log(response.data);
            dispatch(push(routes.businessSubscription));
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 * Updates the users review accounts
 *
 * @param data = { business_name-*, name-*, priority-* }
 * // * = google || yelp || facebook
 */
export const updateAccounts = data => (dispatch) => {
    const formData = getFormData(data);
    if (data["business_name-google"]) {
        formData.set("name-google", "google");
    }
    if (data["business_name-facebook"]) {
        formData.set("name-facebook", "facebook");
    }
    if (data["business_name-yelp"]) {
        formData.set("name-yelp", "yelp");
    }
    formData.set("_method", "PATCH");
    axios
        .post("api/account/update", formData)
        .then((response) => {
            console.log(response.data);
            dispatch(userInfo());
        })
        .catch((error) => {
            console.log(error);
        });
};

export const storeInitialReviews = () => (dispatch, getState) => {
    const data = {};
    getState().auth.accounts.accounts.forEach((account) => {
        data[account.name] = account.name;
    });
    console.log(data);
    axios
        .post("api/review/store", data)
        .then((response) => {
            dispatch(userInfo(true));
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 * Subscribes a user to a subscription
 *
 * @param token = StripeToken
 */
export const subscribeUser = token => (dispatch) => {
    axios
        .post("api/business/subscription/store", token)
        .then((response) => {
            dispatch(storeInitialReviews());
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const updateCard = token => (dispatch) => {
    axios
        .post("api/business/subscription/update/card", token)
        .then((response) => {
            dispatch(reset("updateCreditCard"));
            dispatch(userInfo());
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 * Gets all possible review accounts a user can have
 *
 * @param dispatch
 */
export const getEnumAccounts = (dispatch) => {
    axios
        .get("api/account/create")
        .then((response) => {
            console.log(response);
            dispatch({
                type: types.ENUMS,
                payload: response.data,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
