import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ServiceAd } from "../../types/ad";
import { SERVICE_TYPES } from "../../constants/ad";

export type StepProps = {
  state: ServiceAd;
  updateFields: (data: Partial<ServiceAd>) => void;
};

export const ServiceStep = ({ state, updateFields }: StepProps) => {
  const { serviceType, experience, cost, workSchedule } = state;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({
      [event.target.name]:
        event.target.type === "number"
          ? +event.target.value
          : event.target.value,
    });
  };

  const isValidType = !!serviceType;
  const isValidExperiencer = !!experience && experience > 0;
  const isValidCost = !!cost && cost > 0;
  const isButtonDisabled = !isValidType || !isValidExperiencer || !isValidCost;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Характеристики услуги
      </Typography>
      <TextField
        select
        fullWidth
        label="Тип услуги"
        name="serviceType"
        value={serviceType || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      >
        {SERVICE_TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Опыт работы, (лет)"
        name="experience"
        type="number"
        inputMode="numeric"
        value={experience || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Стоимость, (₽)"
        name="cost"
        type="number"
        inputMode="numeric"
        value={cost || ""}
        onChange={onChangeHandler}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="График работы"
        name="workSchedule"
        value={workSchedule || ""}
        onChange={onChangeHandler}
        margin="normal"
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
