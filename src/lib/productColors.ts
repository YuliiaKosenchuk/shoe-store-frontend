export const PRODUCT_COLORS = [
  "Black",
  "White",
  "Brown",
  "Dark Brown",
  "Chocolate",
  "Pecan Brown",
  "Tortoiseshell",
  "Red",
  "Wineberry Red",
  "Burgundy",
  "Maroon",
  "Pink",
  "Blush",
  "Light Pink",
  "Mauve",
  "Blue",
  "Dark Blue",
  "Grey",
  "Shell Grey",
  "Silver",
  "Beige",
  "Taupe",
  "Chalk",
  "Cream",
  "Gold",
  "Lilac",
  "Mint Green",
  "Butter Yellow",
  "Multi color",
] as const;

const COLOR_HEX: Record<string, string> = {
  BLACK: "#111111",
  WHITE: "#F5F0EB",
  BROWN: "#7B5B3A",
  GREEN: "#8B9B7A",
  SAGE: "#A3B18A",
  BEIGE: "#D4B896",
  GRAY: "#9E9E9E",
  GREY: "#9E9E9E",
  RED: "#8B2520",
  BLUE: "#2C4A6E",
  CREAM: "#F0EAD6",
  CHALK: "#EDE8DE",
  BLUSH: "#E3B9B6",
  PINK: "#E3A9B8",
  "DARK BLUE": "#1B2A44",
  BURGUNDY: "#5E1F2E",
  LILAC: "#C7B8DE",
  SILVER: "#C7C7C7",
  MAROON: "#5E1620",
  "LIGHT PINK": "#F0C9D2",
  MAUVE: "#B98C96",
  "DARK BROWN": "#4A3423",
  "BUTTER YELLOW": "#E8D08A",
  "MINT GREEN": "#A9D3BC",
  CHOCOLATE: "#4A2C1D",
  "WINEBERRY RED": "#5C1A26",
  TORTOISESHELL: "#6B4A2A",
  "PECAN BROWN": "#835C3B",
  GOLD: "#C7A24A",
  TAUPE: "#B4A491",
  "SHELL GREY": "#C9C6C0",
};

const MULTI_COLOR_GRADIENT = "linear-gradient(90deg, #8B2520, #E8D08A, #2C4A6E, #4A3423)";

export function toSwatchBackground(color: string): string {
  if (color.startsWith("#")) return color;
  const key = color.toUpperCase();
  if (key === "MULTI COLOR" || key === "MULTICOLOR") return MULTI_COLOR_GRADIENT;
  return COLOR_HEX[key] ?? "#C8C0B8";
}
