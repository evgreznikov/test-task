import React from "react";
import {reduxForm} from "redux-form";
import {CreateField, Text} from "../common/FormsControl/FormsControl";
import {maxLength} from "../../utils/validators/validators";
import styles from './Search.module.css'
import 'bootstrap/dist/css/bootstrap.css';

const maxLength200 = maxLength(200)

const Search = (props) => {

    return <div>
        <h2 className={styles.title}>Найти пользователя</h2>
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <div>
                {CreateField("Введите данные...", "input", Text, "search",
                    [maxLength200], styles.input)}
            </div>
            {CreateField("", "select", Text, "select")}
            <button className="btn btn-info">Найти</button>
        </form>
    </div>
}

const SearchReduxForm = reduxForm({ form: 'search' })(Search)

export default SearchReduxForm