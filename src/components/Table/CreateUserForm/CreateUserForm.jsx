import React from "react";
import styles from "../Table.module.css"
import {reduxForm} from "redux-form";
import {CreateField, Text} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators/validators";

const CreateUserForm = (props) => {
    return <form onSubmit={props.handleSubmit} className={styles.form}>
            {CreateField("id", "input", Text, "id",
                [required], styles.item)}
            {CreateField("Имя", "input", Text, "firstName",
                [required], styles.item)}
            {CreateField("Фамилия", "input", Text, "lastName",
                [required], styles.item)}
            {CreateField("Почта", "input", Text, "email",
                [required], styles.item)}
            {CreateField("Телефон", "tel", Text, "phone",
                [required], styles.item)}
        <button className={`btn btn-primary`}>Добавить</button>
    </form>
}

export default reduxForm({form: 'createUser'})(CreateUserForm)
