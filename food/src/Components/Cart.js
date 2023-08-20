import React from 'react';
import { useCart, useDispatchCart } from '../Components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  

  const handleCheckOut = async () => {

    let userEmail = localStorage.getItem('userEmail');
     console.log(data); 
    try {
      let response = await fetch("http://localhost:5000/api/v1/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email:userEmail,
          order_date: new Date().toDateString()
        })
      });

      console.log('JSON RESPONSE:::::', response);
      if (response.status === 200) {
        dispatch({ type: 'DROP' });
      } else {
        console.log('Error: Response status:', response.status);
      }
    } catch (error) {
      console.log('Error: ', error.message);
    }



  };
  

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center text-white fs-1'>The Cart is Empty!</div>
      </div>
    );
  }
  
  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-white fs-4 text-center bg-success'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="text-center">
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type='button' className='btn bg-danger' onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-1 text-white'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-white mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
