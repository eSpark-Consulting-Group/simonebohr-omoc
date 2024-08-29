import { createSlice } from '@reduxjs/toolkit';

const AddressSlice = createSlice({
    name: 'selectedAddress',
    initialState: null,
    reducers: {
      setSelectedAddress: (state, action) => {
        return action.payload;
      },
    },
  });
  
  export const { setSelectedAddress } = AddressSlice.actions;
  
  export default AddressSlice.reducer;