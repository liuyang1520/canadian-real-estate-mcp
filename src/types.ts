import { z } from "zod";

export const PropertySchema = z.object({
  id: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  price: z.number(),
  listingDate: z.string(),
  propertyType: z.string(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  sqft: z.number().nullable(),
  lotSize: z.number().nullable(),
  yearBuilt: z.number().nullable(),
  status: z.enum(["active", "sold", "pending", "withdrawn"]),
  images: z.array(z.string()),
  description: z.string().nullable(),
  mlsNumber: z.string().nullable(),
  agentName: z.string().nullable(),
  agentPhone: z.string().nullable(),
  brokerage: z.string().nullable(),
  priceHistory: z.array(
    z.object({
      date: z.string(),
      price: z.number(),
      event: z.string(),
    }),
  ),
  taxes: z.number().nullable(),
  features: z.array(z.string()),
  parking: z.string().nullable(),
  heating: z.string().nullable(),
  cooling: z.string().nullable(),
});

export const MarketStatsSchema = z.object({
  city: z.string(),
  period: z.string(),
  averagePrice: z.number(),
  medianPrice: z.number(),
  totalSales: z.number(),
  averageDaysOnMarket: z.number(),
  priceChangePercent: z.number(),
  inventoryCount: z.number(),
});

export const SearchFiltersSchema = z.object({
  city: z.string().optional(),
  province: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minBedrooms: z.number().optional(),
  maxBedrooms: z.number().optional(),
  minBathrooms: z.number().optional(),
  maxBathrooms: z.number().optional(),
  propertyType: z.string().optional(),
  status: z.enum(["active", "sold", "pending", "withdrawn"]).optional(),
  minSqft: z.number().optional(),
  maxSqft: z.number().optional(),
  daysOnMarket: z.number().optional(),
  features: z.array(z.string()).optional(),
  sortBy: z.enum(["price", "date", "sqft", "bedrooms"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  limit: z.number().min(1).max(100).default(20),
});

export type Property = z.infer<typeof PropertySchema>;
export type MarketStats = z.infer<typeof MarketStatsSchema>;
export type SearchFilters = z.infer<typeof SearchFiltersSchema>;
