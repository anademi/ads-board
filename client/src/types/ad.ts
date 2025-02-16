import {
  AUTO_TYPES,
  CATEGORIES,
  PROPERTY_TYPES,
  SERVICE_TYPES,
} from "../constants/ad";
import { ValueOf } from "./utils";

export type AdType = ValueOf<typeof CATEGORIES>;
export type PropertyType = ValueOf<typeof PROPERTY_TYPES>;
export type BrandType = ValueOf<typeof AUTO_TYPES>;
export type ServiceType = ValueOf<typeof SERVICE_TYPES>;

export interface CommonAd {
  id?: number;
  name: string;
  description: string;
  location: string;
  type: AdType;
  image?: string;
}

export interface RealEstateAd extends CommonAd {
  propertyType: PropertyType;
  area: number;
  rooms: number;
  price: number;
}

export interface AutoAd extends CommonAd {
  brand: BrandType;
  model: string;
  year: number;
  mileage?: number;
}

export interface ServiceAd extends CommonAd {
  serviceType: ServiceType;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export type Ad = RealEstateAd | AutoAd | ServiceAd;
