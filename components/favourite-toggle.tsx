import React from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ToggleButton from '@mui/material/ToggleButton';

export default function FavouriteToggle({
	isFavourite, 
	setFavourite
} : {
	isFavourite : boolean, 
	setFavourite : (e:boolean) => void
}) {
	return (
		<ToggleButton
			value="check"
			size="small"
			selected={isFavourite}
			onChange={() => setFavourite(!isFavourite)}
			sx={{position:'absolute', top:5, right:5}}
		>
			{
				isFavourite ? (
					<StarIcon sx={{color: 'yellow'}} />
				) : (
					<StarBorderIcon sx={{color: 'yellow'}} />
				)
			}
		</ToggleButton>
	);
}