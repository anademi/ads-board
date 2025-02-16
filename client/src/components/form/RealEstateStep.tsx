import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { RealEstateAd } from "../../types/ad";
import { PROPERTY_TYPES } from "../../constants/ad";

export type StepProps = {
  state: RealEstateAd;
  updateFields: (data: Partial<RealEstateAd>) => void;
};

export const RealEstateStep = ({ state, updateFields }: StepProps) => {
  const { propertyType, area, rooms, price } = state;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({
      [event.target.name]:
        event.target.type === "number"
          ? +event.target.value
          : event.target.value,
    });
  };

  const isValidType = !!propertyType;
  const isValidArea = !!area && area > 0;
  const isValidRooms = !!rooms && rooms > 0;
  const isValidPrice = !!price && price > 0;
  const isButtonDisabled =
    !isValidType || !isValidArea || !isValidRooms || !isValidPrice;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Характеристики недвижимости
      </Typography>
      <TextField
        select
        fullWidth
        label="Тип недвижимости"
        name="propertyType"
        value={propertyType || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      >
        {PROPERTY_TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Площадь, (м²)"
        name="area"
        type="number"
        inputMode="numeric"
        value={area || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Количество комнат"
        name="rooms"
        type="number"
        inputMode="numeric"
        value={rooms || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Цена, (₽)"
        name="price"
        type="number"
        inputMode="numeric"
        value={price || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      />
      <Button
        variant="contained"
        type="submit"
        disabled={isButtonDisabled}
        endIcon={<SendIcon />}
      >
        Сохранить
      </Button>
    </Box>
  );
};
