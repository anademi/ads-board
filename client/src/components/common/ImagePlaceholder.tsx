import { Box, Typography } from "@mui/material";

export const ImagePlaceholder = () => (
  <Box
    sx={{
      height: 120,
      bgcolor: "#eee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography variant="caption" color="text.secondary">
      Нет изображения
    </Typography>
  </Box>
);
