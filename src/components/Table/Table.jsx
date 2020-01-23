import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from './Table.module.css'
import arrowDown from '../../assets/images/icons/arrDown.svg'
import arrowUp from '../../assets/images/icons/arrUp.svg'
import CreateUserForm from "./CreateUserForm/CreateUserForm";
import {addNewUser, getUsers, setChosenUser, usersReducer} from "../../redux/users-reducer";
import {connect} from "react-redux";
import User from "./User/User";

const Table = (props) => {

    let [editMode, setEditMode] = useState(false)

    useEffect(() => {
        props.getUsers(props.rows)
    }, [])

    const onSubmit = (formData) => {
        let user = {
            id: formData.id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
        }
        props.addNewUser(user)
        setEditMode(false)
    }

    return <div>
        <div className={styles.aboveTheTable}>
            <div className={styles.divFix}></div>
            <h2 className={styles.header}>Пользователи</h2>
            {!editMode ? <button onClick={() => {setEditMode(true)}}
                                  className={`btn btn-primary ${styles.addBtn}`}>Добавить</button>
                : <div className={styles.divFix}></div>
            }
        </div>
        {editMode && <CreateUserForm onSubmit={onSubmit}/>}

        <table className={`table table-bordered ${styles.table}`}>
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
            </tr>
            </thead>
            <tbody>
            {props.users.map(u => <User u={u} key={u.id} setChosenUser={props.setChosenUser}/>)}

            </tbody>
        </table>
        <nav aria-label="..." className={styles.paginator}>
            <ul className="pagination">
                <li className="page-item disabled">
                    <span className="page-link">Previous</span>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active" aria-current="page">
      <span className="page-link">
        2
        <span className="sr-only">(current)</span>
      </span>
                </li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    </div>
}

const mapStateToProps = (state) => {
    let usersReducer = state.usersReducer
    return {
        rows: usersReducer.rows,
        users: usersReducer.users,
        chosenUser: usersReducer.chosenUser,
    }
}

export default connect(mapStateToProps, {getUsers, setChosenUser, addNewUser})(Table)