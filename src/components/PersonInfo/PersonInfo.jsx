import React from "react";
import styles from "./PersonInfo.module.css";
import {connect} from "react-redux";

const PersonInfo = ({chosenUser}) => {
    return <>
        {Object.keys(chosenUser).length === 0 ? undefined
        : <div>
                <h4>Выбран пользователь: <b>{chosenUser.firstName} {chosenUser.lastName}</b></h4>
                <div>Электронная почта: <b>{chosenUser.email}</b></div>
                <div>Номер телефона: <b>
                    ({chosenUser.phone.toString().slice(0, 3)}){chosenUser.phone.toString().slice(3, 6)}-{chosenUser.phone.toString().slice(6,10)}
                </b></div>
                <div>Описание:</div>
                {chosenUser.address && <>
                    <textarea className={styles.description} value={chosenUser.description} onChange={() => undefined}/>
                    <div>Адрес проживания: {chosenUser.address.streetAddress && <b>{chosenUser.address.streetAddress}</b>}</div>
                    <div>Город: {chosenUser.address.city && <b>{chosenUser.address.city}</b>}</div>
                    <div>Провинция/штат: {chosenUser.address.state && <b>{chosenUser.address.state}</b>}</div>
                    <div>Индекс: {chosenUser.address.zip && <b>{chosenUser.address.zip}</b>}</div>
                </>}
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