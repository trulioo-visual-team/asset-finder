import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "currentItem",
  initialState: { value: false, search: "", filter: "all", sort: "bm" },
  reducers: {
    selectItem(state, action) {
      state.value = action.payload;
    },
    removeItem(state) {
      state.value = false;
    },
    setSort(state, action) {
      state.sort = action.payload;
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
  setSearch,
  setSort
} = dataSlice.actions;
export default dataSlice.reducer;
