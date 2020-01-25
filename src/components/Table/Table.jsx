import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from './Table.module.css'
import arrowDown from '../../assets/images/icons/arrDown.svg'
import arrowUp from '../../assets/images/icons/arrUp.svg'
import CreateUserForm from "./CreateUserForm/CreateUserForm";
import {
    addNewUser,
    setFilteredUsers,
    getUsers,
    setChosenUser,
    setNewActivePage,
    setPartOfUsers, refreshUsers, find
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator";
import SearchReduxForm from "../Search/Search";
import Preloader from "../common/Preloader/Preloader";

const Table = (props) => {

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

    const filterWordsAscending = (prop) => {
        let users = props.users.sort((a, b) => {
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
        let users = props.users.sort((a, b) => {
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
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        })
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
            props.find(formData.search, formData.select)
            props.setPartOfUsers()
        }
    }
    let initialValues = {
        select: "id"
    }

    return <div>
        {firstTime ? <div className={styles.firstScreen}>
                <h2>Сколько данных нужно?</h2>
                <div>
                    <button onClick={() => {
                        setFirstTime(false)
                        props.getUsers(32)
                    }} className={`btn btn-primary ${styles.firstScreenBtn}`}>Мало данных
                    </button>
                    <button onClick={() => {
                        setFirstTime(false)
                        props.getUsers(1000)
                    }} className='btn btn-primary'>Много данных
                    </button>
                </div>
            </div>
            : <>
                <SearchReduxForm onSubmit={onSubmitSearch} initialValues={initialValues}/>
                <div className={styles.aboveTheTable}>
                    <div className={styles.divFix}></div>
                    <h2 className={styles.header}>Пользователи</h2>
                    {!editMode ? <button onClick={() => {
                            setEditMode(true)
                        }} className={`btn btn-primary ${styles.addBtn}`}>Добавить</button>
                        : <div className={styles.divFix}></div>
                    }
                </div>
                {editMode && <CreateUserForm onSubmit={onSubmit}/>}
                {props.isFetching ? <Preloader/>
                    : <table className={`table table-bordered ${styles.table}`}>
                    <thead>
                    <tr>
                        <th scope="col" onMouseOver={() => onMouseOver('prop1')} onMouseOut={() => onMouseOut('prop1')}
                            onClick={() => filteredById ? filterByDescending("id") : filterByAscending("id")}>
                            <div className={styles.property}>
                                <span>id</span>
                                <img src={!filteredById ? arrowDown : arrowUp} alt="arrow" className={styles.arrow}/>
                            </div>
                        </th>
                        <th scope="col" onMouseOver={() => onMouseOver('prop2')} onMouseOut={() => onMouseOut('prop2')}
                            onClick={() => filteredByFirstName ? filterWordsDescending("firstName") : filterWordsAscending("firstName")}>
                            <div className={styles.property}>
                                <span>Имя</span>
                                <img src={!filteredByFirstName ? arrowDown : arrowUp} alt="arrowDown"
                                     className={styles.arrow}/>
                            </div>
                        </th>
                        <th scope="col" onMouseOver={() => onMouseOver('prop3')} onMouseOut={() => onMouseOut('prop3')}
                            onClick={() => filteredByLastName ? filterWordsDescending("lastName") : filterWordsAscending("lastName")}>
                            <div className={styles.property}>
                                <span>Фамилия</span>
                                <img src={!filteredByLastName ? arrowDown : arrowUp} alt="arrowDown"
                                     className={styles.arrow}/>
                            </div>
                        </th>
                        <th scope="col" onMouseOver={() => onMouseOver('prop4')} onMouseOut={() => onMouseOut('prop4')}
                            onClick={() => filteredByEmail ? filterWordsDescending("email") : filterWordsAscending("email")}>
                            <div className={styles.property}>
                                <span>Электронная почта</span>
                                <img src={!filteredByEmail ? arrowDown : arrowUp} alt="arrowDown"
                                     className={styles.arrow}/>
                            </div>
                        </th>
                        <th scope="col" onMouseOver={() => onMouseOver('prop5')} onMouseOut={() => onMouseOut('prop5')}
                            onClick={() => filteredByPhone ? filterByDescending("phone") : filterByAscending("phone")}>
                            <div className={styles.property}>
                                <span>Номер телефона</span>
                                <img src={!filteredByPhone ? arrowDown : arrowUp} alt="arrow" className={styles.arrow}/>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    {props.isFetching ? undefined
                        : <tbody>
                        {props.portionOfUsers.map(u => <User u={u} key={(u.id + 1) * Math.random()}
                                                             setChosenUser={props.setChosenUser}/>)}
                        </tbody>}

                </table>}

                <Paginator onPageChanged={onPageChanged} pageSize={props.pageSize} totalCount={props.users.length}
                           portionSize={props.portionSize} currentPage={props.currentPage}/>
            </>}
    </div>
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
})(Table)