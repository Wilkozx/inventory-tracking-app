import React from 'react'

import { useEffect, useState } from "react"
import { getSearch } from '../../services/utils.tsx'

import styles from './recentFeed.module.css'

function RecentFeed({displayedFields, target, title}) {
  const [data, setData] = useState([])

  useEffect(() => {
    let sortBy = "newest"
    const handleSearch = async () => {
      let response = await getSearch(target, "", sortBy, 0, 5)
      setData(response.data)
    }

    handleSearch()

    window.addEventListener('componentRefresh', handleSearch)
    return () => {
      window.removeEventListener('componentRefresh', handleSearch)
    }
  }, [])

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.feed}>
        {data.length >= 1 && (
            data.map((item, index) => (              
              <a href={"/" + target + "/" + item.id} key={item.id}>
                <div className={styles.item}>
                  {displayedFields.map((field, index) => (
                    field === "purchase_price" ? (
                      <p>£{item[field]}</p>
                    ) : (
                      <p>{item[field]}</p>
                    )
                  ))}
                </div>
              </a>
            ))
        )}
      </div>
    </div>
  )
}

export default RecentFeed