import { z } from "zod";

export const CATEGORIES = ["SHOES", "BAGS", "ACCESSORIES"] as const;
export const GENDERS = ["MALE", "FEMALE", "UNISEX"] as const;
export const SEASONS = ["SPRING", "SUMMER", "AUTUMN", "WINTER", "ALL_SEASON"] as const;

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(CATEGORIES, { message: "Category is required" }),
  description: z.string().min(1, "Description is required"),
  price: z.number({ error: "Price must be a number" }).positive("Price must be positive"),
  priceOld: z.number({ error: "Old price must be a number" }).positive("Old price must be positive").optional(),
  gender: z.enum(GENDERS, { message: "Gender is required" }),
  season: z.enum(SEASONS, { message: "Season is required" }),
  material: z.string().min(1, "Material is required"),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;

export const createVariantSchema = z.object({
  size: z.number({ error: "Size must be a number" }).positive("Size must be positive"),
  color: z.string().min(1, "Color is required"),
  stockQty: z.number({ error: "Stock quantity must be a number" }).min(0, "Stock quantity must be 0 or more"),
  sku: z.string().optional(),
});

export type CreateVariantFormValues = z.infer<typeof createVariantSchema>;

export const createImageSchema = z.object({
  color: z.string().min(1, "Color is required"),
  mainUrl: z.string().url("Must be a valid URL"),
  urls: z.array(z.string().url()).optional(),
});

export type CreateImageFormValues = z.infer<typeof createImageSchema>;
