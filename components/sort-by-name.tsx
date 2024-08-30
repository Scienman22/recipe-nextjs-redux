"use client";
import React from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sortValue, sortBy } from "@/redux/slices/sort-slice";

import {
    InputLabel,
    MenuItem,
    FormControl
} from '@mui/material/';
import Select from '@mui/material/Select';

const SORTING = {
    asc: 'Ascending',
    desc: 'Descending'
}

export default function SortByName() {
    const sortByValue = useAppSelector(sortValue);
    const dispatch = useAppDispatch();

    const handleOnSort = (nameSort: 'asc'|'desc') => {
        dispatch(sortBy({name: nameSort}));
    };

    return (
        <FormControl sx={{ minWidth: '100%' }} size="small">
            <InputLabel id="sort-by-name-label">{`By Name`}</InputLabel>

            <Select
                labelId="sort-by-name-label"
                id="sort-by-name-select"
                value={sortByValue.name}
                label="Sort By Name"
                onChange={({target}:any) => handleOnSort(target?.value)}
            >
                {
                    Object.entries(SORTING).map(([key, value]) => {
                        return (
                            <MenuItem key={key} value={key}>{value}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    );
}
