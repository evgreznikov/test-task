import {api} from "../api/api"
import React from "react";

const SET_USERS = 'SET-USERS'
const SET_CHOSEN_USER = 'SET-CHOSEN-USER'
const ADD_NEW_USER = 'ADD-NEW-USER'

let initialState = {
    users: [],
    rows: 32,
    chosenUser: {},
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CHOSEN_USER:{
            return{
                ...state,
                chosenUser: action.user
            }
        }
        case ADD_NEW_USER:{
            return{
                ...state,
                users: [action.user, ...state.users]
            }
        }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, users})
export const setChosenUser = (user) => ({type: SET_CHOSEN_USER, user})
export const addNewUser = (user) => ({type: ADD_NEW_USER, user})

export const getUsers = (rows) =>
    async (dispatch) => {
    try {
        let data = await api.getUsers(rows)
        dispatch(setUsers(data))
    } catch (error) {
        alert(error.message)
    }
}
