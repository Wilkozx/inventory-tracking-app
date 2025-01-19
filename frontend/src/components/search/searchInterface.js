import React from "react";
import { useEffect, useState } from "react"
import { getSearch } from "../../services/utils.tsx"

import styles from "./searchInterface.module.css";

function SearchInterface({target}) {
    const[filter, setFilter] = useState("")
    const[sortBy, setSortBy] = useState("newest")
    const[page, setPage] = useState(1)

    const[data, setData] = useState([])
    const[total, setTotal] = useState(0)
    
    const handleSearch = async () => {
        let response = await getSearch(target, filter, sortBy, (page - 1))
        setData(response.data)
        setTotal(response.total)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSearch();
    };

    const handleSort = (e) => {
        setSortBy(e.target.value)
    }

    const handleAddition = (e) => {
        window.location.replace("/"+ target + "/add")
    }

    function handlePageChange(e) {
        setPage(e.target.value)
    }

    let timeoutId;
    function delayedSearch(delay) {
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            setPage(0)
            handleSearch()
        }, delay);
    }

    useEffect(() => {
       delayedSearch(300)

       return () => {
        clearTimeout(timeoutId)
       }
    }, [filter])

    useEffect(() => {
        handleSearch()
    }, [sortBy, page])

    return (
        <div>
            <div className={styles.search_container}>
                <div className={styles.search_top}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Search..." value={filter} onChange={(e) => setFilter(e.target.value)}></input>
                        </form>
                    </div>
                    <div>
                        <select id="sort_by" className={styles.sort_by} onChange={handleSort}>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="date_descending">Date Descending</option>
                            <option value="date_ascending">Date Ascending</option>
                        </select>
                        <button className={styles.add_button} onClick={handleAddition}>+</button>
                    </div>
                </div>
                <div className={styles.search_data}>
                    {data.length >= 1 && (
                        data.map((item, index) => (
                            <a href={"/" + target + "/" + item.id} key={item.id}>
                                <div className={styles.data}>
                                    <img src="/placeholder.png"></img>
                                    <div className={styles.data_details}>
                                        <p>name: {item.name}</p>
                                        <p>description: {item.description}</p>
                                        <p>price:{item.purchase_price}</p>
                                        {/* <p>source: {item.source}</p> */}
                                        <p>purchased: {item.purchase_date}</p>
                                        <p>delivered: {item.delivered_date}</p>
                                    </div>
                                </div>
                            </a>
                        ))   
                    )}
                </div>
                <div className={styles.search_bottom}>
                    {
                        [...Array(Math.ceil(total/20))].map((e, x) => <button value={x + 1} onClick={handlePageChange}>{x + 1}</button>)
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchInterface