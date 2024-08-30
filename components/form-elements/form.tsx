import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
	Box,
	Typography
} from '@mui/material'

function Form({id, defaultValues, children, onSubmit, style}: any) {
	const methods = useForm({ defaultValues: {...defaultValues} });
	const { handleSubmit, formState: { errors } }:any = methods;

	const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === 'Enter') e.preventDefault();
	};

	return (
		<FormProvider {...methods} >
			<form id={id} onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)} {...style}>
				{
					React.Children.map(children, (child, _index) => {
						if (!child) {
							return null;
						}
						
						return (
							<div key={child.props.name}>
								<Typography variant="h6">
									{child.props?.label}{child.props?.rule?.required ? ' *':''}
								</Typography>

								<Box sx={{ maxWidth: '100%' }}>
									{ child }
								</Box>

								{errors[child.props.name] && <Typography variant="subtitle1" sx={{color:'red'}}>
									{errors[child.props.name]?.message}
								</Typography>}
							</div>
						);
					})
				}
			</form>
		</FormProvider>
	)
}

export default Form