/* import { createSlice } from "@reduxjs/toolkit";

// ذخیره‌سازی سبد در localStorage
const saveBasketToLocalStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

// بازیابی سبد از localStorage
const loadBasketFromLocalStorage = () => {
  const savedBasket = localStorage.getItem("basket");
  return savedBasket
    ? JSON.parse(savedBasket)
    : {
        items: [],
        invoice: {
          totalPrice: 0,
          totalQuantity: 0,
        },
      };
};

// وضعیت اولیه
const initData = loadBasketFromLocalStorage();

const basketSlice = createSlice({
  name: "basket",
  initialState: initData,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((_item) => _item.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // به‌روزرسانی قیمت کل و تعداد کل
      state.invoice.totalPrice = state.items.reduce(
        (total, _item) => total + _item.price * _item.quantity,
        0
      );
      state.invoice.totalQuantity = state.items.reduce(
        (total, _item) => total + _item.quantity,
        0
      );

      // ذخیره‌سازی تغییرات در localStorage
      saveBasketToLocalStorage(state);
    },
    removeItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((_item) => _item.id === item.id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((_item) => _item.id !== item.id);
        } else {
          existingItem.quantity -= 1;
        }
      }

      // به‌روزرسانی قیمت کل و تعداد کل
      state.invoice.totalPrice = state.items.reduce(
        (total, _item) => total + _item.price * _item.quantity,
        0
      );
      state.invoice.totalQuantity = state.items.reduce(
        (total, _item) => total + _item.quantity,
        0
      );

      // ذخیره‌سازی تغییرات در localStorage
      saveBasketToLocalStorage(state);
    },
  },
});

const { actions, reducer } = basketSlice;
export const { addItem, removeItem } = actions;
export const basketState = (state) => state.basket;
export default reducer; */


///////////////////////////////////////////روش درست
import { createSlice } from "@reduxjs/toolkit";

// بازیابی آیتم‌های ذخیره‌شده در localStorage یا استفاده از مقادیر پیش‌فرض
const initialState = {
    items: JSON.parse(localStorage.getItem("basketItems")) || [],
    invoice: {
        totalPrice: 0,
    }
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addItem(state, action) {
            const item = action.payload;
            const alreadyExist = state.items.some((_item) => _item.id === item.id);

            if (alreadyExist) {
                state.items = state.items.map((_item) => {
                    if (_item.id === item.id) {
                        return {
                            ..._item,
                            quantity: _item.quantity + 1,
                        };
                    }
                    return _item;
                });
            } else {
                state.items = [...state.items, { ...item, quantity: 1 }];
            }
            state.invoice.totalPrice += item.price;

            // ذخیره در localStorage بعد از هر تغییر
            localStorage.setItem("basketItems", JSON.stringify(state.items));
            
        },
        removeItem(state, action) {
            const item = action.payload;
            const itemToRemove = state.items.find((_item) => _item.id === item.id);

            if (itemToRemove) {
                if (itemToRemove.quantity > 1) {
                    state.items = state.items.map((_item) => {
                        if (_item.id === item.id) {
                            return {
                                ..._item,
                                quantity: _item.quantity - 1,
                            };
                        }
                        return _item;
                    });
                } else {
                    state.items = state.items.filter((_item) => _item.id !== item.id);
                }
                state.invoice.totalPrice - item.price;

                // ذخیره در localStorage بعد از هر تغییر
                localStorage.setItem("basketItems", JSON.stringify(state.items));
                
            }
        },
    },
});

const { actions, reducer } = basketSlice;
export const { addItem, removeItem } = actions;
export const basketState = (state) => state.basket;
export default reducer;

