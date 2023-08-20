import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useRef,useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { useCart, useDispatchCart } from "../Components/ContextReducer";

function BasicExample(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let dispatch = useDispatchCart();
  let data=useCart()
  let priceRef=useRef()


  
  const handleAddtoCart = () => {
    const finalPrice = qty * parseInt(options[size]);
    const newItem = {
      id: props.food_items.id,
      name: props.food_items.name,
      price: finalPrice,
      img: props.food_items.img,
      qty: qty,
      size: size,
    };
  
    // Check if the same item with the same size is already in the cart
    const existingItem = data.find(
      (item) => item.id === newItem.id && item.size === newItem.size
    );
  
    if (existingItem) {
      // Item with the same size already exists, update its quantity
      dispatch({
        type: "UPDATE",
        id: newItem.id,
        price: finalPrice,
        qty: qty + existingItem.qty,
      });
    } else {
      // Item with the same size does not exist, add a new item to the cart
      dispatch({
        type: "ADD",
        ...newItem,
      });
    }
  };
  
  let finalPrice=qty*parseInt( options[size])
  useEffect(()=>{
       setSize(priceRef.current.value)
  },[])

  return (
    <Card style={{ width: '20rem' }} className="mt-3 ">
      <Card.Img variant="top" src={props.food_items.img} width="250px" height="250px" />
      <Card.Body>
        <Card.Title className="">{props.food_items.name}</Card.Title>
        <Card.Text className="">{props.food_items.description} </Card.Text>
        <select className="m-2 p-1 h-200 bg-success"  onChange={(e) => setQty(e.target.value)}>
          {Array.from(Array(6), (e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          className="m-2 h-200 bg-success p-1" ref={priceRef}
          onChange={(e) => setSize(e.target.value)}
          value={size}
        >
          {priceOptions.map((data) => {
            return <option key={data} value={data}>{data}</option>;
          })}
        </select>
        <div className="d-inline h-100 fs-5 ">
        ₹{finalPrice}/-
        </div>
        <hr />
        <button className="btn  bg-danger justify-center mx-5" onClick={handleAddtoCart}>
          Add to Cart
        </button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
