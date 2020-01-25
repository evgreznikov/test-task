import React from "react";
import styles from '../common.module.css'
import loading from '../../../assets/images/loading.gif'

const Preloader = (props) => {
    return <img src={loading} alt="loading" className={styles.preloader}/>
}

export default Preloader