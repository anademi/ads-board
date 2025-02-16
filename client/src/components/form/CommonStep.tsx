import { TextField, Box, MenuItem, Typography, Button } from "@mui/material";
import { CATEGORIES } from "../../constants/ad";
import { Ad } from "../../types/ad";

type StepProps = {
  state: Ad;
  updateFields: (data: Partial<Ad>) => void;
  onChangeType: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CommonStep = ({
  state,
  updateFields,
  onChangeType,
}: StepProps) => {
  const { name, description, location, type, image } = state;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ [event.target.name]: event.target.value });
  };

  const isValidType = !!type;
  const isValidName = !!name && name.length > 0;
  const isValidDescription = !!description && description.length > 0;
  const isValidLocation = !!location && location.length > 0;
  const isButtonDisabled =
    !isValidType || !isValidName || !isValidDescription || !isValidLocation;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Основная информация
      </Typography>
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Название"
        name="name"
        margin="normal"
        value={name || ""}
        onChange={onChangeHandler}
      />
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Описание"
        name="description"
        margin="normal"
        multiline
        rows={4}
        value={description || ""}
        onChange={onChangeHandler}
      />
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Локация"
        name="location"
        margin="normal"
        value={location || ""}
        onChange={onChangeHandler}
      />
      <TextField
        fullWidth
        id="outlined-required"
        label="Фото"
        name="image"
        type="url"
        inputMode="url"
        margin="normal"
        value={image || ""}
        onChange={onChangeHandler}
      />
      <TextField
        select
        fullWidth
        label="Категория"
        name="type"
        value={type || ""}
        onChange={onChangeType}
        margin="normal"
        required
      >
        {CATEGORIES.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" type="submit" disabled={isButtonDisabled}>
        Далее
      </Button>
    </Box>
  );
};
