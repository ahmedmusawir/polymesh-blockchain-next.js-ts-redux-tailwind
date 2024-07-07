import { apiPost } from "@/features/posts/apiPosts";
import { apiPolymesh } from "../features/polymesh/apiPolymesh";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiPost.reducerPath]: apiPost.reducer,
    [apiPolymesh.reducerPath]: apiPolymesh.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiPost.middleware)
      .concat(apiPolymesh.middleware),
});

setupListeners(store.dispatch);
