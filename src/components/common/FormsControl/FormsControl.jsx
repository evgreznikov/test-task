import React from 'react'
import styles from './FormsControl.module.css'
import {Field} from "redux-form";
import 'bootstrap/dist/css/bootstrap.css';

export const Text = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : undefined}`}>
            <div>
                {props.type === "textarea"
                    ? <textarea {...input} {...props} /> : undefined}
                {props.type === "input" || props.type === "password" || props.type === "checkbox"
                    ? <input {...input} {...props}/> : undefined}
                {props.type === "select" &&
                <div className="form-group" style={{marginBottom: "0px"}} {...input} {...props}>
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option value={"id"}>Id</option>
                        <option value={"firstName"}>First name</option>
                        <option value={"lastName"}>Last name</option>
                        <option value={"email"}>Email</option>
                        <option value={"phone"}>Phone number</option>
                    </select>
                </div>}
            </div>
            {hasError ? <span>{meta.error}</span> : undefined}
        </div>
    )
}


export const CreateField = (placeholder, type, component, name, validate, className = null) =>
    (<Field type={type} component={component} name={name} placeholder={placeholder} validate={validate}
            className={className}/>)