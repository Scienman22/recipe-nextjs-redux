"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterValue, filterBySearch } from "@/redux/slices/filter-slice";

import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
	  padding: theme.spacing(1, 1, 1, 0),
	  // vertical padding + font size from searchIcon
	  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	  transition: theme.transitions.create('width'),
	  [theme.breakpoints.up('sm')]: {
		width: '20ch',
		'&:focus': {
		  width: '30ch',
		},
	  },
	},
}));

export default function SearchInput() {
	const filterByValue = useAppSelector(filterValue);
    const dispatch = useAppDispatch();

	const handleSearchFilter = (searchValue:string) => {
		dispatch(filterBySearch({
			...filterByValue,
			search: searchValue
		}));
	}

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>

			<StyledInputBase
				placeholder="Search here..."
				inputProps={{ 'aria-label': 'search' }}
				value={filterByValue.search}
				onChange={({target}) => handleSearchFilter(target.value)}
			/>
		</Search>
	)
}
