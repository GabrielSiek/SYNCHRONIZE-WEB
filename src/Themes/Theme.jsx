import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    text: {
      primary: "#111111"
    },
    primary: {
      main: '#3E91F3',
    },
  },
  typography: { 
    fontFamily: 'Poppins',
    button: {
      textTransform: 'none', // Desabilita todas as letras maiúsculas nos botões
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none', 
          fontFamily: 'Poppins',
          '&.Mui-selected': {
            color: '#3E91F3',
          },
        },
      },
      defaultProps: {
        disableRipple: true, 
      },
    },

    MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius: '12px', 
          },
          columnHeaders: {
            borderRadius: '12px 12px 0 0', 
            color: "#111111"
          },
          footerContainer: {
            borderRadius: '0 0 12px 12px', 
          },
        },
      },
  },
});

export default Theme;
