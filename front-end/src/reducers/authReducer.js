import * as types from "../constants/authTypes";

const INITIAL_STATE = {
    authenticated: false,
    userInfo: { user: [], error: null, loading: false },
    business: { business: {}, error: null, loading: false },
    accounts: { accounts: [], error: null, loading: false },
    token: null,
    enums: [],
};
export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.AUTHENTICATE:
            return { ...state, authenticated: true };
        case types.LOGIN_TOKEN:
            return { ...state, token: action.payload };
        case types.LOGOUT:
            return {
                ...state,
                ...INITIAL_STATE,
            };
        case types.USER_INFO:
            return {
                ...state,
                userInfo: { user: [], error: null, loading: true },
            };
        case types.USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: { user: action.payload, error: null, loading: false },
            };
        case types.USER_INFO_ERROR:
            return {
                ...state,
                userInfo: { user: [], error: action.payload, loading: false },
            };
        case types.BUSINESS_LOADING:
            return {
                ...state,
                business: { business: [], error: false, loading: true },
            };
        case types.BUSINESS_SUCCESS:
            return {
                ...state,
                business: { business: action.payload, error: false, loading: false },
            };
        case types.BUSINESS_ERROR:
            return {
                ...state,
                business: { business: [], error: false, loading: true },
            };
        case types.ACCOUNTS_LOADING:
            return {
                ...state,
                accounts: { accounts: [], error: false, loading: true },
            };
        case types.ACCOUNTS_SUCCESS:
            return {
                ...state,
                accounts: { accounts: action.payload, error: false, loading: false },
            };
        case types.ACCOUNTS_ERROR:
            return {
                ...state,
                accounts: { accounts: [], error: false, loading: true },
            };
        case types.ENUMS:
            return {
                ...state,
                enums: action.payload,
            };
        default:
            return { ...state };
    }
}
