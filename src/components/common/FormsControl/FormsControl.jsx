import React from 'react'
import styles from './FormsControl.module.css'
import {Field} from "redux-form";

export const Text = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : undefined}`}>
            <div>
                {props.type === "textarea"
                    ? <textarea {...input} {...props} /> : undefined}
                {props.type === "input" || props.type === "password" || props.type === "checkbox"
                    ? <input {...input} {...props}/> : undefined}
            </div>
            {hasError ? <span>{meta.error}</span> : undefined}
        </div>
    )
}

export const CreateField = (placeholder, type, component, name, validate, className = null) =>
    (<Field type={type} component={component} name={name} placeholder={placeholder} validate={validate}
            className={className}/>)