import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterBySliceType {
    favourite: 'yes'|'no'|null
    search: string
}

const initialState: FilterBySliceType = {
    favourite: null,
    search: ""
}

export const filterBySlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterByFavourite: (state, action: PayloadAction<FilterBySliceType>) => {
            const {favourite} = action.payload;
            state.favourite = favourite;
        },
        filterBySearch: (state, action: PayloadAction<FilterBySliceType>) => {
            const {search} = action.payload;
            state.search = search;
        },
    }
})

export const { filterByFavourite, filterBySearch } = filterBySlice.actions;
export const filterValue = (state: RootState) => (state.filteredBy);
export default filterBySlice.reducer;