import {connect} from "../redux";

export const userSelector = (state) => ({
    user: state.user
})
export const userDispatcher = (dispatch) => ({
    updateUserInfo: (info) => dispatch({type: 'updateUserInfo', payload: info})
})
export const connectToUser = connect(userSelector, userDispatcher)
