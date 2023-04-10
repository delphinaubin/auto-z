interface LeFourgonCategory {
  id: number;
  name: string;
  image: string;
  icon: string;
  description: string;
}

export type LeFourgonCategoriesResponse = LeFourgonCategory[];
