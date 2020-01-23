import React from "react";
import styles from "./PersonInfo.module.css";

const PersonInfo = (props) => {
    return <div>
            <h4>Выбран пользователь: <b>Sue Corson</b></h4>
            <div>Описание:</div>
            <textarea disabled className={styles.description}>et lacus magna dolor...</textarea>
            <div>Адрес проживания: <b>9792 Mattis Ct</b></div>
            <div>Город: <b>Waukesha</b></div>
            <div>Провинция/штат: <b>WI</b></div>
            <div>Индекс: <b>22178</b></div>
    </div>
}

export default PersonInfo