import React from 'react'

import Form from '../../components/form/form'
import RecentFeed from '../../components/feed/recentFeed'


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
            {name: 'img_path', type: 'file'},
        ]} method={"post"} target={"orders"}></Form>
        <RecentFeed displayedFields={[
          "name", 
          "description", 
          "purchase_date", 
          "purchase_price", 
          "delivered_date", 
          "source"
        ]} title="Recently Added" target="orders"></RecentFeed>
    </div>
  )
}

export default AddOrders