import React, {useState} from 'react';
import styles from './Paginator.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import './../common.css'

const Paginator = ({totalCount, pageSize, currentPage, onPageChanged, portionSize}) => {
    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <nav aria-label="..." className={styles.paginator}>

        <ul className="pagination">
            {portionNumber > 1 ?
                <li className="page-item" onClick={() => (setPortionNumber(portionNumber - 1))}>
                    <span className="page-link">Назад</span>
                </li> : undefined}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <li key={p} className={`page-item ${currentPage === p && "active"}`} onClick={(e) => {
                        currentPage !== p ? onPageChanged(p) : void (0)
                    }}>
                        {!currentPage
                            ? <a className="page-link" href="#">{p}</a>
                            : <span className="page-link">{p}<span className="sr-only">(current)</span></span>}
                    </li>
                })}

            {portionCount > portionNumber ?
                <li className="page-item" onClick={() => (setPortionNumber(portionNumber + 1))}>
                    <span className="page-link">Далее</span>
                </li> : undefined}
        </ul>
    </nav>
}

export default Paginator