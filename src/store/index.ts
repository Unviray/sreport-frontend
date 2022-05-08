import { configureStore } from "@reduxjs/toolkit"

import searchReducer from "./slice/search"

export default configureStore({
  reducer: {
    search: searchReducer,
  },
})
