import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  // Implement your state changes based on the action type
  switch (action.type) {
    // Add different cases based on your requirements
    case"ADD":
            return [...state,{id:action._id ,name:action.name, price:action.price,img:action.img ,qty:action.qty ,size:action.size}]
   
    case "REMOVE":
              let newArr = [...state];
              newArr.splice(action.index, 1); // Use action.index instead of index
              return newArr;

  case "UPDATE":
  return state.map((food) => {
    if (food.id === action.id && food.size === action.size) {
      return {
        ...food,
        qty: parseInt(action.qty),
        price: action.price,
      };


    } else {
      return food;
    }
  });

     case"DROP":
     let empArry=[]         
     return empArry
     default:
      console.log("Error in Reducer")
  }


};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
