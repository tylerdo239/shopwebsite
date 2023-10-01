import { createSlice, configureStore } from "@reduxjs/toolkit";

// Take data from localstorage if it have
const onLogin = localStorage.getItem("loginArr");
const loginArr = onLogin ? JSON.parse(onLogin) : null;
const login = loginArr ? true : false;

const cartData = localStorage.getItem("cartArr");
const cartArr = cartData ? JSON.parse(cartData) : [];

const initialState = { show: false, data: null };
const loginState = {
  user: loginArr,
  login: login,
};
const cartState = {
  cartList: cartArr,
};

// Login slice handle state of user login and user action log in, log out
const loginSlice = createSlice({
  name: "login",
  initialState: loginState,
  reducers: {
    ON_LOGIN(state, action) {
      state.login = true;
      state.user = action.payload;
    },
    ON_LOGOUT(state) {
      state.login = false;
      state.user = null;
    },
  },
});

// Popup slice handle state of popup data and action show or close the popup
const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    SHOW_POPUP(state, action) {
      state.show = true;
      state.data = action.payload;
    },
    HIDE_POPUP(state) {
      state.show = false;
      state.data = null;
    },
  },
});

// Cart slice handel state of cshopping cart data and action add, delete or update an item in shopping cart
const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    ADD_CART(state, action) {
      state.cartList.push(action.payload);
      localStorage.setItem("cartArr", JSON.stringify(state.cartList));
    },
    UPDATE_CART(state, action) {
      const index = action.payload.index;
      state.cartList[index].quantity =
        state.cartList[index].quantity + action.payload.change;
    },
    DELETE_CART(state, action) {
      const index = action.payload;
      state.cartList.splice(index, 1);
      localStorage.setItem("cartArr", JSON.stringify(state.cartList));
    },
  },
});

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    login: loginSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const popupActions = popupSlice.actions;
export const loginActions = loginSlice.actions;
export const cartActions = cartSlice.actions;

export default store;
