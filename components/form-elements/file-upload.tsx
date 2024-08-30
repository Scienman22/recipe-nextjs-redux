import * as React from 'react';

import { styled } from '@mui/material/styles';
import {
	Button,
	Card,
	CardMedia,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export default function InputFileUpload({
	imageUrl,
	attachLogo
} : {
	imageUrl?: string
	attachLogo: (d:any) => void
}) {
	const [pictureFile, setpictureFile] = React.useState<any>();
	const handleUpload = React.useCallback(async (imageFiles:any[]) => {
		const file = imageFiles[0];

		if (file) {
			const url = URL.createObjectURL(file);
			setpictureFile(url);

			const fornData = new FormData();
			fornData.append('image', file);

			const response = await fetch(`/api/upload`, {
				method: "POST",
				body: fornData
			});

			if (response.ok) {
				const result = await response.json();

				attachLogo(result.imageUrl)
			}
		}
	}, [])

	return (
		<React.Fragment>
			 <Card sx={{ maxWidth: 345, mb:1 }}>
				<CardMedia
					sx={{ height: 245 }}
					image={pictureFile ?? imageUrl ?? "/images/placeholder.png"}
					title="Recipe Image"
				/>
			</Card>

			<Button
				component="label"
				role={undefined}
				variant="contained"
				tabIndex={-1}
				startIcon={<CloudUploadIcon />}
				fullWidth
			>
				Upload file
				<VisuallyHiddenInput type="file" 
					accept="image/png, image/jpeg"
					onChange={(event:any) => handleUpload(event.target.files)} />
			</Button>

		</React.Fragment>
	);
}
