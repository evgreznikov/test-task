import React from "react";
import {reduxForm} from "redux-form";
import {CreateField, Text} from "../common/FormsControl/FormsControl";
import {maxLength, required} from "../../utils/validators/validators";
import styles from './Search.module.css'


const maxLength200 = maxLength(200)

const Search = (props) => {
    return <div>
        <h2 className={styles.title}>Найти пользователя</h2>
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <div>
                {CreateField("Введите данные...", "input", Text, "search",
                    [required, maxLength200], styles.input)}
            </div>
            <div className="form-group" style={{marginBottom: "0px"}}>
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>Id</option>
                    <option>First name</option>
                    <option>Last name</option>
                    <option>Email</option>
                    <option>Phone number</option>
                </select>
            </div>
            <button className="btn btn-info">Найти</button>
        </form>
    </div>
}

const SearchReduxForm = reduxForm({ form: 'search' })(Search)

export default SearchReduxForm