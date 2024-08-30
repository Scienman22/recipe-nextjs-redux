"use client";
import React from 'react'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterValue, filterByFavourite } from "@/redux/slices/filter-slice";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const FAVOURITE = {
	yes: "Yes",
	no: "No"
}

export default function FilterRecipes() {
	const filterByValue = useAppSelector(filterValue);
    const dispatch = useAppDispatch();

	const handleOnFilter = (favourite: 'yes'|'no'|null) => {
        dispatch(filterByFavourite({
			...filterByValue,
			favourite: favourite
		}));
    };

	return (
		<FormControl>
			<FormLabel id="filter-group-label">{`Favourite`}</FormLabel>
			<RadioGroup
				aria-labelledby="filter-group-label"
				name="filter-buttons-group"
				value={filterByValue.favourite}
				onChange={({target}:any) => handleOnFilter(target?.value)}
			>
				{
                    Object.entries(FAVOURITE).map(([key, value]) => {
                        return (
                            <FormControlLabel key={key} value={key} control={<Radio />} label={value} />
                        )
                    })
                }
			</RadioGroup>
		</FormControl>
	)
}
