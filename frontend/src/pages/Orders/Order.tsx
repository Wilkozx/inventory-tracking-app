import React from 'react'
import Details from '../../components/details/details'

function Order() {


  return (
    <>
    <Details displayedFields={[
          "name", 
          "description", 
          "purchase_date", 
          "purchase_price", 
          "delivered_date", 
          "source"
        ]} target={"orders"}></Details>
    </>
  )
}

export default Order