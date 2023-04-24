export interface LeFourgonCartResponse {
  isValidable: boolean;
  cart: {
    package: {
      packageType: LeFourgonPackageType;
      nbItems: number;
      nbPackages: number;
      nbSpaceLeft: number;
    };
    products: LeFourgonCartProductLine[];
  }[];
  total: {
    ht: number;
    ttc: number;
    deposit: number;
    ttcWithDeposit: number;
  };
}

interface LeFourgonPackageType {
  name: string;
  id: number;
  capacity: number;
  depositPrice: number;
}

interface LeFourgonCartProductLine {
  product: LeFourgonCartProduct;
  quantity: number;
  nbItems: number;
  total: number;
  totalTTC: number;
  totalDeposit: number;
}

interface LeFourgonCartProduct {
  id: number;
  name: string;
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
