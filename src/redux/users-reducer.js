import {api} from "../api/api"
import React from "react";

const SET_USERS = 'SET-USERS'
const SET_CHOSEN_USER = 'SET-CHOSEN-USER'
const ADD_NEW_USER = 'ADD-NEW-USER'
const SET_NEW_ACTIVE_PAGE = 'SET-NEW-ACTIVE-PAGE'
const SET_PART_OF_USERS = 'SET-PART-OF-USERS'
const FILTER_ID = 'FILTER-ID'

let initialState = {
    users: [],
    rows: 32,
    chosenUser: {},
    pageSize: 5,
    portionSize: 3,
    currentPage: 1,
    portionOfUsers: [],
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users],
                portionOfUsers: action.users.slice(0, state.pageSize)
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
        case SET_NEW_ACTIVE_PAGE:{
            return{
                ...state,
                currentPage: action.pageNumber
            }
        }
        case SET_PART_OF_USERS:{
            return{
                ...state,
                portionOfUsers: state.users.slice(state.currentPage  * state.pageSize - state.pageSize,
                    state.currentPage  * state.pageSize)
            }
        }
        case FILTER_ID:{
            return{
                ...state,
               users: [...action.users]
            }
        }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, users})
export const setChosenUser = (user) => ({type: SET_CHOSEN_USER, user})
export const addNewUser = (user) => ({type: ADD_NEW_USER, user})
export const setNewActivePage = (pageNumber) => ({type: SET_NEW_ACTIVE_PAGE, pageNumber})
export const setPartOfUsers = () => ({type: SET_PART_OF_USERS})
export const setFilteredUsers = (users) => ({type: FILTER_ID, users})

export const getUsers = (rows) =>
    async (dispatch) => {
    try {
        let data = await api.getUsers(rows)
        let newData = data.map(u => {
            let phone = parseInt(u.phone.replace(/\D+/g,""))
            let user = {
                ...u,
                phone: phone
            }
            return user
        })
        dispatch(setUsers(newData))
    } catch (error) {
        alert(error.message)
    }
}
