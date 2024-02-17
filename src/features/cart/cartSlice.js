import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: "Mediterranean",
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizzaToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removePizzaFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload.pizzaId,
      );
    },
    incrementPizzaQuantity: (state, action) => {
      const pizza = state.cart.findIndex(
        (pizza) => pizza.pizzaId === action.payload.pizzaId,
      );

      pizza.quantity++;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;
    },
    decreasePizzaQuantity: (state, action) => {
      const pizza = state.cart.findIndex(
        (pizza) => pizza.pizzaId === action.payload.pizzaId,
      );

      if (!pizza.quantity > 1) return;

      pizza.quantity--;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addPizzaToCart,
  removePizzaFromCart,
  incrementPizzaQuantity,
  decreasePizzaQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);