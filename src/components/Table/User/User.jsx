import React from "react";
import styles from "../Table.module.css";

const User = ({u}) => {
    return <tr className={styles.row1}>
        <th scope="row">{u.id}</th>
        <td>{u.firstName}</td>
        <td>{u.lastName}</td>
        <td>{u.email}</td>
        <td>{u.phone}</td>
    </tr>
}

export default User