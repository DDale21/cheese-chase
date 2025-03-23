import { useEffect, useState } from 'react';
import axios from "axios"
import './App.css'

function App() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderId = "67dfeb1956c79fc431717398";
        const response = await axios.get(`http://localhost:3000/api/v1/orders/${orderId}`);
        console.log(response.data.order)
        setOrder(response.data.order);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  

  return (
    <>
      <h1>Order Details</h1>
      {order ? (
        <div>
          <p><strong>Order ID: </strong>{order._id}</p>
          <p><strong>Items</strong></p>
          {order.pizzas.map(pizza => {
            return (
            <>
              <p><strong>Pizza: </strong>{pizza.name}</p>
              <p><strong>Size: </strong>{pizza.size}</p>
              <p><strong>Quantity: </strong>{pizza.quantity}</p>
            </>
          )})}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App
