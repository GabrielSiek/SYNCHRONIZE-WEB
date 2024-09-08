import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    text: {
      primary: "#111111",
    },
    primary: {
      main: "#3E91F3",
    },
    secondary: {
      main: "#777777",
    },
  },
  typography: {
    fontFamily: "Poppins",
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Poppins",
          "&.Mui-selected": {
            color: "#3E91F3",
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
          borderRadius: "12px",
        },
        columnHeaders: {
          borderRadius: "12px 12px 0 0",
          color: "#111111",
        },
        footerContainer: {
          borderRadius: "0 0 12px 12px",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            "&:hover": {
              backgroundColor: "#4ea1ff",
            },
          },
        },
      ],
    },
  },
});

export default Theme;
