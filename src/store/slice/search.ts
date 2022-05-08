import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearch } = searchSlice.actions
export type TypeSearch = { search: ReturnType<typeof searchSlice.reducer> }
export default searchSlice.reducer
