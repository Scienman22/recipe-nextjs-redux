import React from "react";
import { styled } from '@mui/material/styles';

import SortByName from "@/components/sort-by-name";
import RecipeFilter from "@/components/recipe-filter";
import RecipeList from "@/components/recipe-list";

import {
	Box,
	Container,
	Fab,
	Grid,
	Paper,
	Typography
} from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

function Home() {
	return (
		<Container maxWidth="xl">
			<Grid container spacing={4}>
				<Grid item xs={3}>
					<Item sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
						<Typography variant="h5" component="h5">{`Sort`}</Typography>
						<Box component="section" sx={{ width: '100%', p: 2, mb:2, border: '1px dashed grey' }}>
							<SortByName />
						</Box>

						<Typography variant="h5" component="h5">{`Filter`}</Typography>
						<Box component="section" sx={{ width: '100%', p: 2, mb:2, border: '1px dashed grey' }}>
							<RecipeFilter />
						</Box>
					</Item>
				</Grid>

				<Grid item xs={9} sx={{position:'relative'}}>
					<Link href="/create">
						<Fab color="primary" aria-label="add" 
							sx={{position: 'absolute', float: 'right', top: 60, right: 20}}>
							<AddIcon />
						</Fab>
					</Link>

					<Item sx={{height: `calc(100vh - 200px)`, overflowY:'scroll', p: 5, position: 'relative'}}>
						<RecipeList />
					</Item>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Home;