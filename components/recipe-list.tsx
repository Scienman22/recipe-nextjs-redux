import React from 'react'
import _ from 'lodash';

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { recipeList, fetchRecipeList } from "@/redux/slices/recipes-slice";
import { sortValue } from "@/redux/slices/sort-slice";
import { filterValue } from "@/redux/slices/filter-slice";

import RecipeItem from '@/components/recipe-item';

import {
	Alert,
} from '@mui/material/';

export default function RecipeList() {
	const dispatch = useAppDispatch();

	const {recipes, isLoading} = useAppSelector(recipeList);
	const sortByValue = useAppSelector(sortValue);
	const filterByValue = useAppSelector(filterValue);

	React.useEffect(() => {
		let isSubscribed = true;

		const fetchData = async () => {
			dispatch(fetchRecipeList());
		}

		if (isSubscribed && !recipes.length) {
			// Note: deleting all the recipe will run this and repopulate the list.
			fetchData().catch(console.error);
		}

		return () => {isSubscribed = false};
	}, [recipes])

	const allRecipes = React.useMemo(() => {
		const filteredList = _.filter(recipes, recipe => {
			return _.toLower(recipe.title).indexOf(_.toLower(filterByValue.search)) >- 1 && (
				(filterByValue.favourite==='yes') ? 
					recipe.favourite === true 
				: (filterByValue.favourite==='no') ? 
					!recipe.favourite 
				: true );
		})

		return _.orderBy(filteredList, ['title'], [sortByValue.name]);
	}, [recipes, sortByValue, filterByValue])

	return (
		<React.Fragment>
			{
				allRecipes.length ? 
					allRecipes.map((recipe) => (<RecipeItem key={recipe.id} recipe={recipe} />))
				: (
					<Alert variant="outlined" severity="info">
						{`No Record Found !`}
					</Alert>
				)
			}
		</React.Fragment>
	)
}
