import { Grid2 as Grid } from "@mui/material";
import { AdCard } from "./AdCard";
import type { Ad } from "../../types/ad";

type Props = {
  ads: Ad[];
};

export const AdList = ({ ads }: Props) => (
  <Grid
    container
    spacing={2}
    sx={{
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
    }}
  >
    {ads.map((ad) => (
      <Grid key={ad.id}>
        <AdCard state={ad} />
      </Grid>
    ))}
  </Grid>
);
