import {
  CardContent,
  Card,
  Typography,
  Chip,
  Button,
  CardActions,
} from "@mui/material";
import { Ad } from "../../types/ad";
import { CardImage } from "./CardImage";
import { ITEM_ROUTE } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

type Props = {
  state: Ad;
};

export const AdCard = ({ state }: Props) => {
  const navigate = useNavigate();
  const { id, name, location, type, image } = state;

  return (
    <Card>
      <CardImage src={image} />
      <CardContent>
        <Chip
          label={type as string}
          color="primary"
          size="small"
          variant="outlined"
          sx={{ mb: 2, verticalAlign: "middle" }}
        />
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          color="text.secondary"
          gutterBottom
        >
          {location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={() => navigate(`${ITEM_ROUTE}/${id}`)}>
          Открыть
        </Button>
      </CardActions>
    </Card>
  );
};
