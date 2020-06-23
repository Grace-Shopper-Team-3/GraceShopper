import {render} from 'enzyme'
import React from 'react'
import {connect} from 'react-redux'

const AddressForm = props => {
  return (
    <div onChange={props.handleChange}>
      <div htmlFor={`${props.name}Address`}>
        <small> Address: </small>
        <input
          name={`${props.name}Address`}
          type="text"
          value={props.state.Address}
        />
      </div>
      <div htmlFor={`${props.name}City`}>
        {' '}
        <small>City: </small>
        <input
          name={`${props.name}City`}
          type="text"
          value={props.state.City}
        />
      </div>
      <div htmlFor={`${props.name}State`}>
        {' '}
        <small>State: </small>
        <input
          name={`${props.name}State`}
          type="text"
          value={props.state.State}
        />
      </div>
      <div htmlFor={`${props.name}Zip`}>
        {' '}
        <small>Zip Code: </small>
        <div name={`${props.name}Zip`} type="text" value={props.state.Zip} />
      </div>
    </div>
  )
}

export class OrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      email: '',

      shippingAddress: '',
      shipCity: '',
      shipState: '',
      shipZip: 12345,

      billName: '',
      billAddress: '',
      billCity: '',
      billState: '',
      billZip: 12345,

      shippingBillingSame: false
    }
  }
  // retireving the name value of the input the event is called on
  handleChange = event => {
    const defaultState = {...this.state}
    if (event.target.name === 'shippingBillingSame') {
      this.setState({shippingBillingSame: !defaultState.shippingBillingSame})
    } else {
      this.setState({
        ...defaultState,
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const orderProps = {...this.state}
    if (orderProps.shippingBillingSame) {
      orderProps.billAddress = this.state.shipAddress
      orderProps.billCity = this.state.shipCity
      orderProps.billState = this.state.shipState
      orderProps.billZip = this.state.shipZip
    }
  }

  render() {
    return (
      <div>
        <h2> Please complete the form below</h2>
        <form
          onSubmit={this.handleSubmit}
          name="order-form"
          onChange={this.handleChange}
        >
          <div htmlFor="fullName">
            <label> Full Name: </label>
            <input name="fullName" type="text" value={this.state.fullName} />
          </div>
          <div htmlFor="email">
            <label> Email address: </label>
            <input name="email" type="text" value={this.state.email} />
            <header> Shipping Address </header>
            <AddressForm
              onChange={this.handleChange}
              name="shippingAddress"
              state={this.state}
            />
            <label htmlFor="shippingBillingSame">
              <input
                id="shippingBillingSame"
                name="shippingBillingSame"
                type="checkbox"
              />
              <small>Billing address and shipping address are the same</small>
            </label>
            {!this.state.shipBillSame && (
              <div>
                <header>Billing Address</header>
                <AddressForm
                  onChange={this.handleChange}
                  name="person"
                  state={this.state}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.order
  }
}

const mapDispatchToProps = dispatch => {
  // should i have a dsiapcth to checkout thunk here that grabs 'new' cart and info details?

  return {
    setOrder: orderDetails => {
      return dispatch(setOrderThunk(orderDetails))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
