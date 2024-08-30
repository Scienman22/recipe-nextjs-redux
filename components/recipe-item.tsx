import React from 'react';
import { useAppDispatch } from "@/redux/hooks";
import { RecipeSlice, toggleRecipeFavourite } from '@/redux/slices/recipes-slice';

import FavouriteToggle from '@/components/favourite-toggle';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	CardMedia,
	Typography
} from '@mui/material/';
import Link from 'next/link';

export default function RecipeItem({
	recipe
}: {
	recipe : RecipeSlice
}) {
	const dispatch = useAppDispatch();

	return (
		<Card sx={{ display: 'flex', mb:2, width: '100%' }}>
			<Box display="flex" sx={{position:'relative'}}>
				<FavouriteToggle 
					isFavourite={recipe.favourite} 
					setFavourite={() => dispatch(toggleRecipeFavourite(recipe.id))} 
				/>

				<CardMedia
					component="img"
					sx={{ width: 151 }}
					image={recipe.image}
					alt="Live from space album cover"
				/>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{recipe.title}
					</Typography>
					
					<Typography variant="body2" color="text.secondary">
						{recipe.description}
					</Typography>

					<Link href={`/update/${recipe.id}`}>
						<Button size="small">See More</Button>
					</Link>
				</CardContent>

				<CardActions sx={{display: "flex", justifyContent:'space-between', ml:1, mr:1}}>
					<Typography variant="body2">{`Added By: ${recipe.author.name}`}</Typography>

					<Typography variant="body2">{`Date: ${recipe.date_added}`}</Typography>
				</CardActions>
			</Box>
		</Card>
	);
}
