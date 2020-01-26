import React, {useState} from "react";
import {connect} from "react-redux";
import {
    addNewUser, find,
    getUsers, refreshUsers,
    setChosenUser,
    setFilteredUsers,
    setNewActivePage,
    setPartOfUsers
} from "../../redux/users-reducer";
import Table from "./Table";

const TableContainer = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [filteredById, setFilteredById] = useState(false)
    let [filteredByPhone, setFilteredByPhone] = useState(false)
    let [filteredByFirstName, setFilteredByFirstName] = useState(false)
    let [filteredByLastName, setFilteredByLastName] = useState(false)
    let [filteredByEmail, setFilteredByEmail] = useState(false)
    let [firstTime, setFirstTime] = useState(true)

    const onSubmit = (formData) => {
        let user = {
            id: formData.id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
        }
        props.addNewUser(user)
        props.setPartOfUsers()
        setEditMode(false)
    }

    const onPageChanged = (pageNumber) => {
        props.setNewActivePage(pageNumber)
        props.setPartOfUsers()
    }

    const onMouseOver = (className) => {
        let elements = document.getElementsByClassName(className)
        for (let elem of elements) {
            elem.style.backgroundColor = "lightgrey"
        }
    }

    const onMouseOut = (className) => {
        let elements = document.getElementsByClassName(className)
        for (let elem of elements) {
            elem.style.backgroundColor = "transparent";
        }
    }

    const filterByAscending = (prop) => {
        let users = props.users.sort((a, b) => {
            if (prop === "id") {
                return a.id - b.id
            } else {
                return a.phone - b.phone
            }
        })
        props.setFilteredUsers(users)
        prop === "id" ? setFilteredById(true) : setFilteredByPhone(true)
        props.setPartOfUsers()
    }

    const filterByDescending = (prop) => {
        let users = props.users.sort((a, b) => {
            if (prop === "id") {
                return a.id - b.id
            } else {
                return a.phone - b.phone
            }
        })
        props.setFilteredUsers(users.reverse())
        prop === "id" ? setFilteredById(false) : setFilteredByPhone(false)
        props.setPartOfUsers()
    }

    const sortingWords = (usersFromProps, prop) => {
        return usersFromProps.sort((a, b) => {
            let nameA, nameB
            if (prop === "firstName") {
                nameA = a.firstName.toLowerCase()
                nameB = b.firstName.toLowerCase()
            } else if (prop === "lastName") {
                nameA = a.lastName.toLowerCase()
                nameB = b.lastName.toLowerCase()
            } else if (prop === "email") {
                nameA = a.email.toLowerCase()
                nameB = b.email.toLowerCase()
            }
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        })
    }

    const filterWordsAscending = (prop) => {
        let users = sortingWords(props.users, prop)
        props.setFilteredUsers(users)
        if (prop === "firstName") {
            setFilteredByFirstName(true)
        } else if (prop === "lastName") {
            setFilteredByLastName(true)
        } else if (prop === "email") {
            setFilteredByEmail(true)
        }
        props.setPartOfUsers()
    }

    const filterWordsDescending = (prop) => {
        let users = sortingWords(props.users, prop)
        props.setFilteredUsers(users.reverse())
        if (prop === "firstName") {
            setFilteredByFirstName(false)
        } else if (prop === "lastName") {
            setFilteredByLastName(false)
        } else if (prop === "email") {
            setFilteredByEmail(false)
        }
        props.setPartOfUsers()
    }

    const onSubmitSearch = (formData) => {
        if (!formData.search) {
            props.refreshUsers()
            props.setPartOfUsers()
        } else {
            props.refreshUsers()
            props.find(formData.search, formData.select, formData.coincidence)
            props.setPartOfUsers()
        }
    }

    let initialValues = {
        select: "id",
        coincidence: "partial"
    }

    return <Table initialValues={initialValues} onSubmitSearch={onSubmitSearch}
                  filterWordsDescending={filterWordsDescending} filterWordsAscending={filterWordsAscending}
                  filterByDescending={filterByDescending} filterByAscending={filterByAscending} onMouseOut={onMouseOut}
                  onMouseOver={onMouseOver} onPageChanged={onPageChanged} onSubmit={onSubmit} editMode={editMode}
                  filteredById={filteredById} filteredByPhone={filteredByPhone} filteredByFirstName={filteredByFirstName}
                  filteredByLastName={filteredByLastName} filteredByEmail={filteredByEmail} firstTime={firstTime}
                  setFirstTime={setFirstTime} setEditMode={setEditMode} {...props}
    />
}

const mapStateToProps = (state) => {
    let usersReducer = state.usersReducer
    return {
        rows: usersReducer.rows,
        users: usersReducer.users,
        chosenUser: usersReducer.chosenUser,
        currentPage: usersReducer.currentPage,
        portionSize: usersReducer.portionSize,
        pageSize: usersReducer.pageSize,
        portionOfUsers: usersReducer.portionOfUsers,
        isFetching: usersReducer.isFetching,
    }
}



export default connect(mapStateToProps, {
    getUsers,
    setChosenUser,
    addNewUser,
    setNewActivePage,
    setPartOfUsers,
    setFilteredUsers,
    refreshUsers, find,
})(TableContainer)