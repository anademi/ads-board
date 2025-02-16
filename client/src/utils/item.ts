import { Ad, AutoAd, RealEstateAd, ServiceAd } from "../types/ad";

export const getCategoryFields = (ad: Ad) => {
  switch (ad.type) {
    case "Недвижимость":
      const { propertyType, area, rooms, price } = ad as RealEstateAd;
      return [
        { label: "Тип недвижимости", value: propertyType },
        { label: "Площадь", value: `${area} м²` },
        { label: "Комнат", value: rooms },
        { label: "Цена", value: `${price} ₽` },
      ];
    case "Авто":
      const { brand, model, year, mileage } = ad as AutoAd;
      return [
        { label: "Марка", value: brand },
        { label: "Модель", value: model },
        { label: "Год выпуска", value: year },
        {
          label: "Пробег",
          value: mileage ? `${mileage} км` : "Не указан",
        },
      ];
    case "Услуги":
      const { serviceType, experience, cost, workSchedule } = ad as ServiceAd;
      return [
        { label: "Тип услуги", value: serviceType },
        { label: "Опыт", value: `${experience} лет` },
        { label: "Стоимость", value: `${cost} ₽` },
        { label: "График работы", value: workSchedule || "Не указан" },
      ];
    default:
      return [];
  }
};
