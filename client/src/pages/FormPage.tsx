import { Box, Grid2 as Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useMultiStepForm } from "../hooks/useMultistepForm";
import { useEffect, useState } from "react";
import { Ad, AutoAd, RealEstateAd, ServiceAd } from "../types/ad";
import { ApiService } from "../services/api";
import { CommonStep } from "../components/form/CommonStep";
import { RealEstateStep } from "../components/form/RealEstateStep";
import { AutoStep } from "../components/form/AutoStep";
import { ServiceStep } from "../components/form/ServiceStep";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidNumber } from "../utils/index";
import { ITEM_ROUTE } from "../constants/routes";

const DRAFT_KEY = "ad_draft";

export const FormPage = () => {
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState<Ad>(() => {
    if (mode === "create") {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        return JSON.parse(savedDraft);
      }
    }
    return {};
  });

  const { state: navigationState } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (navigationState && isValidNumber(navigationState.id)) {
      setMode("edit");
      setFormData(navigationState);
    }
  }, [navigationState]);

  useEffect(() => {
    if (mode === "create") {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));

      return () => {
        localStorage.removeItem(DRAFT_KEY);
      };
    }
  }, [mode, formData]);

  const updateFields = (data: Partial<Ad>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const onChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;

    if (type !== formData.type) {
      const { id, name, description, location, image } = formData;
      setFormData({ id, name, description, location, type, image } as Ad);
    }
  };

  const getCategoryStep = (ad: Ad) => {
    switch (ad.type) {
      case "Недвижимость":
        return (
          <RealEstateStep
            state={ad as RealEstateAd}
            updateFields={updateFields}
          />
        );
      case "Авто":
        return <AutoStep state={ad as AutoAd} updateFields={updateFields} />;
      case "Услуги":
        return (
          <ServiceStep state={ad as ServiceAd} updateFields={updateFields} />
        );
      default:
        return null;
    }
  };

  const steps = [
    <CommonStep
      state={formData}
      updateFields={updateFields}
      onChangeType={onChangeType}
    />,
    getCategoryStep(formData),
  ];
  const { currentStep, isLastStep, next, back, isFirstStep } =
    useMultiStepForm(steps);

  const onBackButton = () => {
    back();
  };

  const apiService = new ApiService();
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isLastStep) {
      return next();
    }
    try {
      const result =
        mode === "edit" && formData.id
          ? await apiService.updateAdById(formData.id, formData)
          : await apiService.createAd(formData);
      navigate(`${ITEM_ROUTE}/${result.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Grid container>
        {!isFirstStep && (
          <IconButton aria-label="delete" onClick={onBackButton}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        <Typography variant="h4" component="h1">
          {mode === "create"
            ? "Создать объявление"
            : "Редактировать объявление"}
        </Typography>
      </Grid>
      <form onSubmit={onSubmit}>{currentStep}</form>
    </Box>
  );
};
