export interface LeFourgonProductsResponse {
  products: LeFourgonProduct[];
  offset: number;
  limit: number;
  count: number;
}

interface LeFourgonProduct {
  id: number;
  name: string;
  description: string;
  image1: string;
  thumb150: string;

  price: number;
  priceTTC: number;
  totalDepositPrice: number;
  tva: number;

  volume: number;
  unit: string;

  alcoholLevel: number;

  maxOrderable: number;

  isAvailable: boolean;
}
