import * as React from 'react';
import {
	AppBar,
	Box,
	Container,
	Toolbar,
	Typography
} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';
import SearchInput from './search-input';

function ResponsiveAppBar() {
	return (
		<AppBar position="fixed">
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Box sx={{ flexGrow: 1, mr: 1 }}>
					<AdbIcon sx={{ mr: 1 }} />

					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 1,
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
						}}
						>
						{`Recipe`}
					</Typography>
				</Box>

				<SearchInput />
			</Toolbar>
		</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;
