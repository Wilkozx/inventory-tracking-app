import React from 'react'

import styles from './navbar.module.css'

function Navbar() {
  return (
        <div className={styles.navbar}>
          <a href="/"><img src="/logo.png"></img></a>
            <div className={styles.button_container}>
                <a className={styles.button} href="/orders">Orders</a>
                <a className={styles.button} href="/items">Items</a>
                <a className={styles.button} href="/parts">Parts</a>
            </div>
        </div>
  )
}

export default Navbar