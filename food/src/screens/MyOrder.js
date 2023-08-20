import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/myOrderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order data.');
      }

      const data = await response.json();
      setOrderData(data.orderData?.order_data || []);
    } catch (error) {
      console.log('Error fetching order data:', error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className='select1' >
        <div className='row  ' style={{"margin-top":"100px"}}>
          {Array.isArray(orderData) && orderData.length === 0 ? (
            <div className='m-5 w-100 text-center  text-white fs-1'>No Orders Yet!</div>
          ) : (
            orderData.map((item, index) => (
              <div key={index} className=' mb-5 col-sm-12 col-md-4 col-lg- col-12'>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                  <img src={item.img} className="card-img-top" alt='...' style={{ height: '200px', objectFit: 'fill' }} />
                  <div className="card-body text-start">
                    <h5 className="card-title font-weight-bolder mb-3"><strong>{item.name}</strong></h5>
                    <div className='container w-100 p-0' style={{ height: '100px' }}>
                      <span className='m-1 mb-3'>Quantity: {item.qty}</span>
                      <span className='m-3 '>Size: {item.size}</span><br /><br />
                      <div className='d-inline ms-2 h-100 w-20 fs-5 '>Price:{"  "}₹{item.price}/-</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer  className='fixed-bottom'/>
    </div>
  );
}
