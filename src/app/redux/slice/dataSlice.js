import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "currentItem",
  initialState: { value: false, search: "", filter: ["All"] },
  reducers: {
    selectItem(state, action) {
      state.value = action.payload;
    },
    removeItem(state) {
      state.value = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    }
  }
});

export const {
  selectItem,
  removeItem,
  setFilter,
  setSearch
} = dataSlice.actions;
export default dataSlice.reducer;
