import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SortBySliceType {
    name: 'asc' | 'desc'
}

const initialState: SortBySliceType = {
    name: 'asc',
}

export const sortBySlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        sortBy: (state, action: PayloadAction<SortBySliceType>) => {
            const {name} = action.payload;
            state.name = name;
        }
    }
})

export const { sortBy } = sortBySlice.actions;
export const sortValue = (state: RootState) => (state.sortBy);
export default sortBySlice.reducer;