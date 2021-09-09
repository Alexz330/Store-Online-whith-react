import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useHistory } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import '../styles/components/Payment.css';

const Payments = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const history = useHistory();
  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return Math.trunc(sum);
  }

  const paypalOptions = {
    clientId: 'AYqvzNlwwf9PhpSN7bQBQyiS7vWs5bbhT9CWsUPbA_bAb3kWzQHBfsAejldUogv7Gj6K6Wz2s3BfHDux',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === "COMPLETED") {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      }
      addNewOrder(newOrder);
      history.push('/checkout/success')
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {
          cart.map((item) => (
            <div className="Payment-item" key={item.title}>
              <div className="Payment-element">
                <h4>{item.title}</h4>
                <span>
                  $
                  {''}
                  {item.price}
                </span>
              </div>
            </div>
          ))
        }
        <div className='Payment-button'>
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Payments;


