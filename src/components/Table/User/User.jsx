import React from "react";
import styles from "../Table.module.css";

const User = ({u, setChosenUser}) => {

    return <tr className={styles.row} onClick={() => setChosenUser(u)}>
        <th className={'prop1'} scope="row">{u.id}</th>
        <td className={'prop2'}>{u.firstName}</td>
        <td className={'prop3'}>{u.lastName}</td>
        <td className={'prop4'}>{u.email}</td>
        <td className={'prop5'}>({u.phone.toString().slice(0, 3)}){u.phone.toString().slice(3, 6)}-{u.phone.toString().slice(6,10)}</td>
    </tr>
}

export default User