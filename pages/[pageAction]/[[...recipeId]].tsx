import React from 'react'
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { recipeList, fetchRecipeList } from "@/redux/slices/recipes-slice";

import {
	Button,
	Container,
	Grid,
	Paper
} from '@mui/material/';

import RecipeForm from '@/components/recipe-form';
import InputFileUpload from '@/components/form-elements/file-upload';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

interface RecipePageProps {
	params: {
		pageAction: string
		recipeId?: string
	}
}

function RecipePage({params}: RecipePageProps) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {recipes, isLoading} = useAppSelector(recipeList);

	const [recipeImage, setRecipeImage] =  React.useState<string>();

	React.useEffect(() => {
		let isSubscribed = true;

		const fetchData = async () => {
			dispatch(fetchRecipeList());
		}

		if (isSubscribed && !recipes.length) {
			fetchData().catch(console.error);
		}

		return () => {isSubscribed = false};
	}, [recipes])

	const recipeData = React.useMemo(() => {
		if (params?.recipeId) {
			const recipeIndex = _.findIndex(recipes, recipe => recipe.id === _.toNumber(params.recipeId));
			if (recipeIndex !== -1) {
				return recipes[recipeIndex];
			}
		}
		return undefined;
	}, [params?.recipeId, recipes])

	return (
		<Container maxWidth="xl">
			<Button type="button" variant="contained" onClick={() => router.back()}>
				{`Back`}
			</Button>

			<Grid container spacing={4}>
				<Grid item xs={3}>
					<Item sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
						<InputFileUpload imageUrl={recipeImage ?? recipeData?.image} attachLogo={(imgPath) => setRecipeImage(imgPath)} />
					</Item>
				</Grid>

				<Grid item xs={9}>
					<Item sx={{height: '100%', p: 5, ml: 2, position: 'relative'}}>
						<RecipeForm defaultData={recipeData} imageUrl={recipeImage ?? recipeData?.image} />
					</Item>
				</Grid>
			</Grid>
		</Container>
	)
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: false
  };
}

export async function getStaticProps({ params }: RecipePageProps) {
	if (!['create', 'update'].includes(params?.pageAction)) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
  
    return {
        props: {
            params
        }
    };
}

export default RecipePage