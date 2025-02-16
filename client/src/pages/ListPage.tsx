import {
  CircularProgress,
  Box,
  Pagination,
  TextField,
  MenuItem,
  Grid2 as Grid,
} from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";
import { CATEGORIES } from "../constants/ad";
import { Ad } from "../types/ad";
import { ApiService } from "../services/api";
import { AdList } from "../components/list/AdList";
import { EmptyState } from "../components/list/EmptyState";

const ITEMS_PER_PAGE = 5;
const apiService = new ApiService();

export const ListPage = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);
      const ads = await apiService.getAds();
      setAds(ads);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const filteredAds = useMemo(
    () =>
      ads.filter((ad) => {
        const matchesSearch = ad.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory = !category || ad.type === category;

        return matchesSearch && matchesCategory;
      }),
    [ads, searchQuery, category],
  );

  const paginatedAds = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAds.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAds, currentPage]);

  const onChangeCategory: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid sx={{ maxWidth: 1200, m: "auto", p: 3 }}>
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <TextField
          label="Поиск по названию"
          value={searchQuery}
          type="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300, mr: 2 }}
        />

        <TextField
          select
          value={category}
          onChange={onChangeCategory}
          label="Категория"
          sx={{ width: 200 }}
        >
          <MenuItem value="">Все категории</MenuItem>
          {CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {filteredAds.length > 0 ? <AdList ads={paginatedAds} /> : <EmptyState />}

      {filteredAds.length > ITEMS_PER_PAGE && (
        <Pagination
          count={Math.ceil(filteredAds.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        />
      )}
    </Grid>
  );
};
