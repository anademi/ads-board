import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ApiService } from "../services/api";
import { Ad } from "../types/ad";
import { ImagePlaceholder } from "../components/common/ImagePlaceholder";
import { getCategoryFields } from "../utils/item";
import { FORM_ROUTE, LIST_ROUTE } from "../constants/routes";
import { isValidNumber } from "../utils/index";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const apiService = new ApiService();

export const ItemPage = () => {
  const { id: idParams } = useParams<{ id: string }>();

  const [ad, setAd] = useState<Ad | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchAd = useCallback(async () => {
    const id = Number(idParams);
    if (!isValidNumber(id)) {
      setError(`Неккоректный id: ${idParams}`);
      return;
    }

    try {
      setLoading(true);
      const data = await apiService.getAdById(id);
      setAd(data);
    } catch (error) {
      console.error(error);
      setError("Ошибка загрузки объявления");
    } finally {
      setLoading(false);
    }
  }, [idParams]);

  useEffect(() => {
    fetchAd();
  }, [fetchAd]);

  const onEdit = () => {
    navigate(FORM_ROUTE, { state: ad });
  };

  const onDelete = async () => {
    const id = Number(idParams);

    if (window.confirm("Вы уверены, что хотите удалить объявление?")) {
      try {
        await apiService.deleteAdById(id);
        navigate(LIST_ROUTE);
      } catch (error) {
        console.error(error);
        setError("Ошибка при удалении объявления");
      }
    }
  };

  if (error)
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 1 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  if (isLoading || !ad)
    return (
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ mt: 4 }} />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button
          component={Link}
          to={LIST_ROUTE}
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon fontSize="small" />}
        >
          Назад к списку
        </Button>
        <Box>
          <Button
            variant="contained"
            onClick={onEdit}
            sx={{ mr: 2 }}
            startIcon={<EditIcon />}
          >
            Редактировать
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onDelete}
            startIcon={<DeleteIcon />}
          >
            Удалить
          </Button>
        </Box>
      </Box>

      <Card>
        {ad.image ? (
          <CardMedia
            component="img"
            height="400"
            image={ad.image}
            alt={ad.name}
          />
        ) : (
          <ImagePlaceholder />
        )}

        <CardContent>
          <Chip
            label={ad.type as string}
            color="primary"
            sx={{ mb: 2, verticalAlign: "middle" }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            {ad.name}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {ad.location}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 2,
              mt: 3,
              mb: 3,
            }}
          >
            {getCategoryFields(ad).map((field, index) => (
              <Box
                key={index}
                sx={{ p: 2, border: "1px solid #eee", borderRadius: 1 }}
              >
                <Typography variant="caption" color="text.secondary">
                  {field.label}
                </Typography>
                <Typography variant="body1">{field.value as string}</Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="h6" component="h2" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {ad.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
