import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from './Table.module.css'
import arrowDown from '../../assets/images/icons/arrDown.svg'
import arrowUp from '../../assets/images/icons/arrUp.svg'
import CreateUserForm from "./CreateUserForm/CreateUserForm";
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator";
import SearchReduxForm from "../Search/Search";
import Preloader from "../common/Preloader/Preloader";

const Table = (props) => {

    return <div>
        {props.firstTime ? <div className={styles.firstScreen}>
                <h2>Сколько пользователей нужно?</h2>
                <div>
                    <button onClick={() => {
                        props.setFirstTime(false)
                        props.getUsers(32)
                    }} className={`btn btn-primary ${styles.firstScreenBtn}`}>Мало пользователей
                    </button>
                    <button onClick={() => {
                        props.setFirstTime(false)
                        props.getUsers(1000)
                    }} className='btn btn-primary'>Много пользователей
                    </button>
                </div>
            </div>
            : <>
                <SearchReduxForm onSubmit={props.onSubmitSearch} initialValues={props.initialValues}/>
                <div className={styles.aboveTheTable}>
                    <div className={styles.divFix}></div>
                    <h2 className={styles.header}>Пользователи</h2>
                    {!props.editMode ? <button onClick={() => {
                            props.setEditMode(true)
                        }} className={`btn btn-primary ${styles.addBtn}`}>Добавить</button>
                        : <div className={styles.divFix}></div>
                    }
                </div>
                {props.editMode && <CreateUserForm onSubmit={props.onSubmit}/>}
                {props.isFetching ? <Preloader/>
                    : <table className={`table table-bordered ${styles.table}`}>
                    <thead>
                    <tr>
                        <th scope="col" onMouseOver={() => props.onMouseOver('prop1')} onMouseOut={() => props.onMouseOut('prop1')}
                            onClick={() => props.filteredById ? props.filterByDescending("id") : props.filterByAscending("id")}>
                            <div className={styles.property}>
                                <span>id</span>
                                <img src={!props.filteredById ? arrowDown : arrowUp} alt="arrow" className={styles.arrow}/>
                            </div>
                        </th>
                        <th scope="col" onMouseOver={() => props.onMouseOver('prop2')} onMouseOut={() => props.onMouseOut('prop2')}
                            onClick={() => props.filteredByFirstName ? props.filterWordsDescending("firstName") : props.filterWordsAscending("firstName")}>
                            <div className={styles.property}>
                                <span>Имя</span>
                                <img src={!props.filteredByFirstName ? arrowDown : arrowUp} alt="arrowDown"
                                     className={styles.arrow}/>
                            </div>
                        </th>
                        <th scope="col" onMouseOver={() => props.onMouseOver('prop3')} onMouseOut={() => props.onMouseOut('prop3')}
                            onClick={() => props.filteredByLastName ? props.filterWordsDescending("lastName") : props.filterWordsAscending("lastName")}>
                            <div className={styles.property}>
                                <span>Фамилия</span>
                                <img src={!props.filteredByLastName ? arrowDown : arrowUp} alt="arrowDown"
                                     className={styles.arrow}/>
                            </div>
                        </th>
                        <th scope="col" onMouseOver={() => props.onMouseOver('prop4')} onMouseOut={() => props.onMouseOut('prop4')}
                            onClick={() => props.filteredByEmail ? props.filterWordsDescending("email") : props.filterWordsAscending("email")}>
                            <div className={styles.property}>
                                <span>Электронная почта</span>
                                <img src={!props.filteredByEmail ? arrowDown : arrowUp} alt="arrowDown"
                                     className={styles.arrow}/>
                            </div>
                        </th>
                        <th scope="col" onMouseOver={() => props.onMouseOver('prop5')} onMouseOut={() => props.onMouseOut('prop5')}
                            onClick={() => props.filteredByPhone ? props.filterByDescending("phone") : props.filterByAscending("phone")}>
                            <div className={styles.property}>
                                <span>Номер телефона</span>
                                <img src={!props.filteredByPhone ? arrowDown : arrowUp} alt="arrow" className={styles.arrow}/>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    {props.isFetching ? undefined
                        : <tbody>
                        {props.portionOfUsers.length === 0
                            ? <tr>
                                <th colSpan="5" scope="row" className={styles.notFound}>Пользователи не найдены!</th>
                            </tr>
                            : props.portionOfUsers.map(u => <User u={u} key={(u.id + 1) * Math.random()}
                                                             setChosenUser={props.setChosenUser}/>)}
                        </tbody>}
                </table>}

                <Paginator onPageChanged={props.onPageChanged} pageSize={props.pageSize} totalCount={props.users.length}
                           portionSize={props.portionSize} currentPage={props.currentPage}/>
            </>}
    </div>
}

export default Table