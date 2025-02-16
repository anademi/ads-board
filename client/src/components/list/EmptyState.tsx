import { Box, Typography, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

export const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "calc(100vh - 500px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "text.secondary",
        p: 1,
      }}
    >
      <InfoOutlinedIcon sx={{ fontSize: 50, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Объявлений пока нет
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Станьте первым, кто разместит объявление!
      </Typography>
      <Button
        variant="contained"
        // size="large"
        onClick={() => navigate("/form")}
      >
        Создать объявление
      </Button>
    </Box>
  );
};
