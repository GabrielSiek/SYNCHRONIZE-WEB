import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
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
          textTransform: 'none', // Desabilita todas as letras maiúsculas nas tabs
          fontFamily: 'Poppins',
          '&.Mui-selected': {
            color: '#3E91F3', // Define a cor da tab selecionada
          },
        },
      },
      defaultProps: {
        disableRipple: true, // Desabilita o ripple nas tabs
      },
    },

    MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius: '12px', // Define o arredondamento das bordas
          },
          columnHeaders: {
            borderRadius: '12px 12px 0 0', // Arredonda apenas o topo
          },
          footerContainer: {
            borderRadius: '0 0 12px 12px', // Arredonda apenas a parte inferior
          },
        },
      },
  },
});

export default Theme;
