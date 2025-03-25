import React from 'react'
import { useState, useEffect } from 'react'

import { getFromID } from '../../services/utils.tsx'

function Details({displayedFields, target}) {

    const [data, setData] = useState([])
    const [id, setId] = useState(window.location.href.split('/')[4])

    useEffect(() => {
        const handleSearch = async (target, id) => {
            let response = await getFromID(target, id)
            setData(response)
        }
        handleSearch("orders", id)
    }, [])

  return (
    <>
      <h1>{data.id}</h1>
      <h1>{data.name}</h1>
      <h1>{data.description}</h1>
      <h1>{data.purchase_date}</h1>
      <h1>{data.purchase_price}</h1>
      <h1>{data.spirce}</h1>
      <h1>{data.img_path}</h1>
      <h1>{data.status}</h1>
      <h1>{data.items}</h1>
    </>
  )
}

export default Details