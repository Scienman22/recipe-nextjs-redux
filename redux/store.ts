
import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '@/redux/slices/recipes-slice';
import sortByReducer from '@/redux/slices/sort-slice';
import filterByReducer from '@/redux/slices/filter-slice';

export const rootStore = () => {
    return configureStore({
        reducer: {
            recipes: recipeReducer,
            sortBy: sortByReducer,
            filteredBy: filterByReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof rootStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']