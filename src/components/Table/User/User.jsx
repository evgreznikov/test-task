import React from "react";
import styles from "../Table.module.css";

const User = ({u, setChosenUser}) => {

    return <tr className={styles.row1} onClick={() => setChosenUser(u)}>
        <th scope="row">{u.id}</th>
        <td>{u.firstName}</td>
        <td>{u.lastName}</td>
        <td>{u.email}</td>
        <td>{u.phone}</td>
    </tr>
}

export default User