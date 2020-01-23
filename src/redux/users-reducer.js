import {api} from "../api/api"
import React from "react";

const SET_USERS = 'SET-USERS'

let initialState = {
   users: [],
    rows: 32,
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, users})

export const getUsers = (rows) =>
    async (dispatch) => {
    try {
        let data = await api.getUsers(rows)
        dispatch(setUsers(data))
    } catch (error) {
        alert(error.message)
    }
}
