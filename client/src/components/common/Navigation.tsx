import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FORM_ROUTE, LIST_ROUTE } from "../../constants/routes";

export const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickFormPage = () => {
    navigate(FORM_ROUTE, { state: null });
    if (pathname === FORM_ROUTE) {
      navigate(0);
    }
  };

  return (
    <AppBar position="static">
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            p: 1,
          }}
        >
          <Button color="inherit" component={Link} to={LIST_ROUTE}>
            Список объявлений
          </Button>
          <Button color="inherit" component="a" onClick={onClickFormPage}>
            Создать объявление
          </Button>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
