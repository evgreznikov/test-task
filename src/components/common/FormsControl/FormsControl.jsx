import React from 'react'
import styles from './FormsControl.module.css'
import {Field} from "redux-form";
import 'bootstrap/dist/css/bootstrap.css';

export const Text = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${styles.formControl} ${hasError && styles.error}`}>
            <div>
                {props.type === "textarea" && <textarea {...input} {...props} />}
                {props.type === "input" || props.type === "password" || props.type === "checkbox" && <input {...input} {...props}/>}
                {props.type === "select" && input.name === "select" &&
                <div className="form-group" style={{marginBottom: "0px"}} {...input} {...props}>
                    <select className="form-control">
                        <option value={"id"}>id</option>
                        <option value={"firstName"}>Имя</option>
                        <option value={"lastName"}>Фамилия</option>
                        <option value={"email"}>Почта</option>
                        <option value={"phone"}>Телефон</option>
                    </select>
                </div>}
                {props.type === "select" && input.name === "coincidence" &&
                <div className="form-group" style={{marginBottom: "0px"}} {...input} {...props}>
                    <select className="form-control">
                        <option value={"partial"}>Частичное совпадение</option>
                        <option value={"complete"}>Полное совпадение</option>
                    </select>
                </div>}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}


export const CreateField = (placeholder, type, component, name, validate, className = null) =>
    (<Field type={type} component={component} name={name} placeholder={placeholder} validate={validate}
            className={className}/>)