import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AutoAd } from "../../types/ad";
import { AUTO_TYPES } from "../../constants/ad";

export type StepProps = {
  state: AutoAd;
  updateFields: (data: Partial<AutoAd>) => void;
};

export const AutoStep = ({ state, updateFields }: StepProps) => {
  const { brand, model, year, mileage } = state;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({
      [event.target.name]:
        event.target.type === "number"
          ? +event.target.value
          : event.target.value,
    });
  };

  const isValidBrand = !!brand;
  const isValidModel = !!model && model.length > 0;
  const isValidYear = !!year && year > 0;
  const isValidMilage = !!mileage && mileage > 0;
  const isButtonDisabled =
    !isValidBrand || !isValidModel || !isValidYear || !isValidMilage;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Характеристики автомобиля
      </Typography>
      <TextField
        select
        fullWidth
        label="Марка"
        name="brand"
        value={brand || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      >
        {AUTO_TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Модель"
        name="model"
        value={model || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Год выпуска"
        name="year"
        type="number"
        inputMode="numeric"
        value={year || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Пробег, (км)"
        name="mileage"
        type="number"
        inputMode="numeric"
        value={mileage || ""}
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
