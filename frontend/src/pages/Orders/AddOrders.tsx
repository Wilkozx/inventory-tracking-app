import React from 'react'

import Form from '../../components/form/form'

function AddOrders() {

  return (
    <div>
        <Form inputs={[
            {name: 'name', type: 'text'},
            {name: 'description', type: 'text'},
            {name: 'purchase_date', type: 'date'},
            {name: 'purchase_price', type: 'number'},
            {name: 'delivered_date', type: 'date'},
            {name: 'source', type: 'options', options: ["Ebay", "Other"]},
            {name: 'status', type: 'text'},
            {name: 'img', type: 'file'},
        ]} action={"post"} endpoint={"/api/orders/"}></Form>
    </div>
  )
}

export default AddOrders