"use client";
import React from 'react';
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RecipeSlice, saveRecipe, deleteRecipe, recipeList } from "@/redux/slices/recipes-slice";

import Form from '@/components/form-elements/form';
import { RecipeFormSchema } from '@/schemas';

import RECIPE_FORM from '@/constants/recipe-form';
import Input from './form-elements/input';

import {
	Alert,
	Box,
	Button,
	Snackbar
} from '@mui/material';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

export default function RecipeForm({
	defaultData,
	imageUrl
}:{
	defaultData?:RecipeSlice
	imageUrl?:string
}) {
	const formId = React.useId();
	const router = useRouter();
	const {isLoading} = useAppSelector(recipeList);
	const dispatch = useAppDispatch();

	const [submitStatus, setSubmitStatus] = React.useState<{message:string, data:any, status:boolean}|null>(null);

	const handleOnSubmit = React.useCallback(async (formData: any) => {
		try {
			const validatedFields = RecipeFormSchema.safeParse(formData);

			if (validatedFields.success && imageUrl) {
				await dispatch(saveRecipe({data: validatedFields.data, image: imageUrl, id: defaultData?.id}))
					.unwrap()
					.then((responseData:any) => {
						// handle result here
						if (responseData?.redirect) {
							router.push('/');
						}

						setSubmitStatus(responseData);
					})
					.catch((responseData) => {
						// handle error here
						setSubmitStatus(responseData);
					});
			} else if (!imageUrl) {
				setSubmitStatus({message: "Image is required!", status: false, data: {}});
			}

		} catch (error) {
			console.error('Saving Recipe Failed. >>>', error);
		}
	}, [defaultData, imageUrl])

	const handleOnDelete = React.useCallback(async (recipeId: number) => {
		try {
			await dispatch(deleteRecipe(recipeId))
				.unwrap()
				.then(() => {
					// handle result here
					router.push('/');
				})
				.catch((responseData) => {
					// handle error here
					setSubmitStatus(responseData);
				});
			
		} catch (error) {
			console.error('Deleting Recipe Failed. >>>', error);
		}
	}, [])

	const handleClose = React.useCallback((
		event?: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason,
	  ) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setSubmitStatus(null);
	}, []);

	return (
		<React.Fragment>
			<Form id={formId} defaultValues={{...defaultData, ...defaultData?.author}} onSubmit={handleOnSubmit}>
				{
					RECIPE_FORM.map((inputElement:any) => {
						switch (inputElement.meta.datatype) {
							case 'text':
							case 'email':
								return (
									<Input key={inputElement.key} 
										type={inputElement.meta.datatype} 
										label={inputElement.value} 
										name={inputElement.name} 
										required={inputElement.meta.required}
										disabled={
											inputElement.name === 'title' && defaultData ? true : false
										}
										rule={
											inputElement.meta.required ? { required: `Please input ${inputElement.name}` } : null
										}
									/>
								)
							case 'textarea':
								return (
									<Input key={inputElement.key} 
										type={inputElement.meta.datatype} 
										label={inputElement.value} 
										name={inputElement.name} 
										required={inputElement.meta.required}
										rule={
											inputElement.meta.required ? { required: `Please input ${inputElement.name}` } : null
										}
										multiline
										rows={4}
									/>
								)
						}
					})
				}

				<Box sx={{display:'flex', justifyContent:'space-between'}}>
					{defaultData?.id ? <Button type="button" variant="contained" color="error" sx={{mt: 5}}
						onClick={() => handleOnDelete(defaultData?.id)}
						disabled={isLoading}
					>
						{`Delete Recipe`}
					</Button> : <div></div>}

					<Button type="submit" variant="contained" sx={{mt: 5}}
						disabled={isLoading}
					>
						{`Save Recipe`}
					</Button>
				</Box>
			</Form>

			<Snackbar open={!!submitStatus} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={!submitStatus?.status ? "error" : "success"}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{submitStatus?.message}
				</Alert>
			</Snackbar>
		</React.Fragment>
	)
}
