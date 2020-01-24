import React from "react";
import styles from "./PersonInfo.module.css";
import {connect} from "react-redux";

const PersonInfo = ({chosenUser}) => {

    return <>
        {Object.keys(chosenUser).length === 0 ? undefined
        : <div>
                <h4>Выбран пользователь: <b>{chosenUser.firstName} {chosenUser.lastName}</b></h4>
                <div>Электронная почта: <b>{chosenUser.email}</b></div>
                <div>Номер телефона: <b>{chosenUser.phone}</b></div>
                <div>Описание:</div>
                <textarea className={styles.description} value={chosenUser.description && chosenUser.description}/>
                <div>Адрес проживания: <b>{chosenUser.address.streetAddress && chosenUser.address.streetAddress}</b></div>
                <div>Город: <b>{chosenUser.address.city && chosenUser.address.city}</b></div>
                <div>Провинция/штат: <b>{chosenUser.address.state && chosenUser.address.state}</b></div>
                <div>Индекс: <b>{chosenUser.address.zip && chosenUser.address.zip}</b></div>
            </div>
        }
    </>
}

const mapStateToProps = (state) => {
    return {
        chosenUser: state.usersReducer.chosenUser
    }
}

export default connect(mapStateToProps, {})(PersonInfo)