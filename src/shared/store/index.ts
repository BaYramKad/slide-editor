import { configureStore } from '@reduxjs/toolkit'
import { slideSlice } from '../../features/create-bulet'

export const store = configureStore({
  reducer: {
    slideData: slideSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch