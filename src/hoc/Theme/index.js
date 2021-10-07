import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
	overrides: {
		MuiSelect: {
			select: {
				"&:focus": {
					backgroundColor: "white"
				}
			}
		}
	},
	palette: {
		primary: {
			main: '#7B5CD9',
			dark: '#7B5CD9',
			contrastText: '#fff',
		},
		neutral: {
			main: '#000',
			dark: '#000',
			contrastText: '#fff',
		},
	},
	typography: {
		fontSize: 15,
	},
});

export default function Palette({ children }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
