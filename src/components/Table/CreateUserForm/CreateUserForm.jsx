import React from "react";
import {CreateField, Text} from "../../common/FormsControl/FormsControl";
import styles from "../Table.module.css"
import {reduxForm} from "redux-form";

const CreateUserForm = (props) => {
    return  <form onSubmit={props.handleSubmit} className={styles.createUser}>
        {CreateField('Id', 'input', Text, 'id', [require], styles.id)}
        {CreateField('First name', 'input', Text, 'firstName', [require], styles.firstName)}
        {CreateField('Last name', 'input', Text, 'lastName', [require], styles.lastName)}
        {CreateField('Email', 'input', Text, 'email', [require], styles.email)}
        {CreateField('Phone number', 'input', Text, 'number', [require], styles.number)}
        <button>Добавить</button>
    </form>
}

const CreateUserReduxForm = reduxForm({form: 'createUser'})(CreateUserForm)

export default CreateUserReduxForm