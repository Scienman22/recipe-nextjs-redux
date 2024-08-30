import { RootState } from "@/redux/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { parseISO, format } from 'date-fns';

import _ from 'lodash';

const apiURL = `http://localhost:3000/api/recipes`;

export interface RecipeSlice {
    id: number
    title: string
    description?: string
    ingredients: string
    instructions: string
    favourite: boolean
    image: string
    author: {
        name: string
        email: string
    }
    date_added: string
}

export const fetchRecipeList = createAsyncThunk(
    'recipes/fetchRecipeList',
    async () => {
        try {
            const data = await fetch(apiURL);
            return await data.json();
        } catch (error) {
            return console.log(`Something went wrong fetching recipe list >> ${error}`);
        }
    },
)

export const saveRecipe = createAsyncThunk(
    'recipes/saveRecipe',
    async (data: any, {getState, rejectWithValue}) => {
        const recipeState = getState();

        try {
            // if !data.id means create then call create API else update API
            //@ts-ignore
            const isRecipeExist = _.find(recipeState?.recipes?.recipes, (recipe:{title:string}) => recipe.title === data.data.title);
            if ((isRecipeExist && isRecipeExist?.id === data?.id) || !isRecipeExist) {
                //@ts-ignore
                const dataId = !data?.id ? recipeState?.recipes?.recipes.length+1 : data.id;

                return {
                    status: true, 
                    data: {...data, id: dataId}, 
                    message: "Recipe has been successfully saved.",
                    ...(!data?.id) ? {redirect:true} : null
                };
            }

            return rejectWithValue({status: false, data: {}, message: "Recipe already existed."});
            
        } catch (error) {
            console.log(`Something went wrong fetching recipe list >>`, error);
        }
    },
)

export const deleteRecipe = createAsyncThunk(
    'recipe/deleteRecipe',
    async (recipeId: number, {getState}) => {
        try {
            const response = true; //assuming a success response
            if (response) {
                return recipeId;
            }
            
        } catch (error) {
            console.log(`Something went wrong deleting recipe >>`, error);
        }
    }
)

export const toggleRecipeFavourite = createAsyncThunk(
    'recipe/toggleRecipeFavourite',
    async (recipeId: number) => {
        try {
            const response = true; //assuming a success response
            if (response) {
                return recipeId;
            }
            
        } catch (error) {
            console.log(`Something went wrong toggling recipe as favourite >>`, error);
        }
    }
)

const initialState : {
    recipes: RecipeSlice[]
    isLoading: boolean
} = {
    recipes: [],
    isLoading: false
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // STORE FETCHED RECIPE LIST
        builder.addCase(fetchRecipeList.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchRecipeList.fulfilled, (state, action) => {
            state.recipes = action.payload;
            state.isLoading = false;
        }),
        // SAVE RECIPE
        builder.addCase(saveRecipe.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(saveRecipe.fulfilled, (state, action) => {
            const {id, image, data} = action.payload?.data;

            const findRecipeIndex = _.findIndex(state.recipes, recipe => recipe.id === id);
            if (findRecipeIndex < 0) { // means create
                const date = parseISO(new Date().toLocaleDateString());

                state.recipes.push({
                    id: id,
                    title: data.title,
                    description: data.description,
                    ingredients: data.ingredients,
                    instructions: data.instructions,
                    favourite: false,
                    image: image,
                    author: {
                        name: data.name,
                        email: data.email
                    },
                    date_added: format(date, 'LLLL d, yyyy')
                })
            } else {
                state.recipes[findRecipeIndex] = {
                    ...state.recipes[findRecipeIndex],
                    ...data,
                    ...image ? {image: image} : null
                }
            }

            state.isLoading = false;
        }),
        builder.addCase(saveRecipe.rejected, (state) => {
            state.isLoading = false;
        }),
        // FAVOURITE RECIPE
        builder.addCase(toggleRecipeFavourite.fulfilled, (state, action) => {
            const recipeIndex = state.recipes.findIndex(recipe => recipe.id === action.payload);

            if (recipeIndex >= 0) {
                state.recipes[recipeIndex].favourite = !state.recipes[recipeIndex].favourite;
            }
        }),
        // DELETE RECIPE
        builder.addCase(deleteRecipe.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(deleteRecipe.fulfilled, (state, action) => {
            const filteredRecipe = _.filter(state.recipes, recipe => recipe.id !== action.payload);
            state.recipes = filteredRecipe;
            state.isLoading = false;
        })
    },
})

export const recipeList = (state: RootState) => (state.recipes);

export default recipesSlice.reducer;