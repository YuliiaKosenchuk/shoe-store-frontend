import { z } from "zod";

export const CATEGORIES = ["SHOES", "BAGS", "ACCESSORIES"] as const;
export const GENDERS = ["MALE", "FEMALE", "UNISEX"] as const;
export const SEASONS = ["SPRING", "SUMMER", "AUTUMN", "WINTER", "ALL_SEASON"] as const;
export const MATERIALS = [
  "Nappa Calf Leather",
  "Natural Pu",
  "Mesh",
  "Printed Fabric",
  "Patent Pu",
  "Embroidered Mesh",
  "Tweed",
  "Recycled Polyester",
  "Satin",
  "Lace",
  "Crochet",
  "Woven Fabric",
  "Raffia",
  "Mirror Metallic Pu",
  "Box Pu",
  "Linen",
  "Faux Suede",
  "Faux Leather",
  "Calf Pu",
  "Canvas",
  "Recycled Leather",
  "Nappa Pu",
  "Wrinkled Pu",
  "Polypropylene Fiber",
  "Nappa Sheep Leather",
  "Recycled Acetate",
  "Brass",
  "Stainless Steel",
  "Saffiano Pu",
  "Caviar Pu",
  "Tumble Pu",
] as const;

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Product name must be less than 255 characters"),
  category: z.enum(CATEGORIES, { message: "Category is required" }),
  description: z.string().min(1, "Description is required"),
  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be positive")
    .max(999999.99, "Price must be less than 1,000,000"),
  priceOld: z
    .number({ error: "Old price must be a number" })
    .positive("Old price must be positive")
    .max(999999.99, "Old price must be less than 1,000,000")
    .optional(),
  gender: z.enum(GENDERS, { message: "Gender is required" }),
  season: z.enum(SEASONS, { message: "Season is required" }),
  material: z.enum(MATERIALS, { message: "Material is required" }),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;

export const createVariantSchema = z.object({
  size: z.string().min(1, "Size is required"),
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
