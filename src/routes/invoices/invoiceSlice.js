import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoice: {},
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: initialState,
  reducers: {
    setInvoice: (state, action) => {
      state.invoice = action.payload.invoice || action.payload;
    },
    clearInvoice: (state) => {
      state.invoice = {};
    },
  },
});

export const { setInvoice, clearInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer; 
