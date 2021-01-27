import React, { Component } from 'react'
import styles from './stylesheets/checkout.module.sass'
import CheckoutTable from './components/CheckoutTable'
import Subtotal from './components/Subtotal'
import Header from '../../components/header/headerContainer'
import Footer from '../../components/footer/Footer'
import jumpTo from '../../modules/Navigation'
export default class Checkout extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    if (Object.keys(this.props.cart).length < 1) {
      this.props.getCartByUserId()
    } else {
      this.props.getCheckoutUrl(this.props.cart._id)
    }
  }
  componentDidUpdate() {
    if (!this.props.url && Object.keys(this.props.cart).length > 1) {
      this.props.getCheckoutUrl(this.props.cart._id)
    }
  }
  render() {
    return (
      <div>
      <div className={styles.outbox}>
        <Header />
        <div className={styles.box}>
          <div className={styles.content}>
            {/* title */}
            <div className={styles.title}>
              Checkout
            <div className={styles.sub_title}>
                Hi <b>{this.props.name}</b> Please review your items and press the confirm checkout button. You will enter your address information while your paying on PayPal
              </div>
            </div>
            {/* table */}
            {Object.keys(this.props.cart).length > 0 &&
              <div>
                <div className={styles.table}>
                  <CheckoutTable
                    items={this.props.cart.items}
                  />
                </div>
                {/* prices */}
                <div className={styles.prices}>
                  <Subtotal
                    subtotal={this.props.cart.totalPrice}
                  />
                </div>
              </div>
            }
            {/* button */}
            <div className={styles.btn}>
              {/* <button><a  href={this.props.url}>Confirm checkout</a></button> */}
              <button onClick={() => jumpTo('/success_page')} disabled={this.props.cart.items === undefined || this.props.cart.items.length == 0}>
                Confirm checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Footer*/}
      <Footer />
      </div>
    )
  }
}

