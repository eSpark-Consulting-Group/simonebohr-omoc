
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    subHeaderNav: "",
   
}

const SubheaderReducer = createSlice({
    name: "subheader",
    initialState,
    reducers: {
        handleNav: (state, action) => {
            state.subHeaderNav = action.payload
        }}
})

export default SubheaderReducer.reducer
export const { handleNav } = SubheaderReducer.actions
