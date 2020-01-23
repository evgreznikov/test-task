import React from "react";
import styles from "../Table.module.css"
import {reduxForm} from "redux-form";
import {CreateField, Text} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators/validators";

const CreateUserForm = (props) => {
    return <form onSubmit={props.handleSubmit} className={styles.form}>
            {CreateField("Id", "input", Text, "id",
                [required], styles.item)}
            {CreateField("First name", "input", Text, "firstName",
                [required], styles.item)}
            {CreateField("Last name", "input", Text, "lastName",
                [required], styles.item)}
            {CreateField("Email", "input", Text, "email",
                [required], styles.item)}
            {CreateField("Phone", "input", Text, "phone",
                [required], styles.item)}
        <button className={`btn btn-primary`}>Добавить</button>
    </form>
}

export default reduxForm({form: 'createUser'})(CreateUserForm)
