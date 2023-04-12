import {
  LeFourgonProduct,
  LeFourgonProductPackageType,
  LeFourgonProductsResponse,
} from "./le-fourgon-products.response";
import { ProductsResult } from "./domain/products-result.vo";
import { Product } from "./domain/product.vo";
import { ProductId } from "./domain/product-id.vo";
import { Description } from "../domain/description.vo";
import { ImageUrl } from "../domain/image-url.vo";
import { Price } from "./domain/price.vo";
import { Amount } from "./domain/amount.vo";
import { Vat } from "./domain/vat.vo";
import { AlcoholLevel } from "./domain/alcohol-level.vo";
import { ProductQuantity } from "./domain/product-quantity.vo";
import { Name } from "../domain/name.vo";
import { Availability } from "./domain/availability.vo";
import { ProductVolume } from "./domain/product-volume.vo";
import { PaginatedResult } from "./domain/paginated-result.vo";
import { ProductPackaging } from "./domain/product-packaging.vo";
import { ProductPackagingId } from "./domain/product-packaging-id.vo";

export function leFourgonProductPackagingToDomain(
  packageType: LeFourgonProductPackageType
) {
  return new ProductPackaging({
    id: ProductPackagingId.of(packageType.id),
    name: Name.of(packageType.name),
    depositPrice: new Price({
      amountExcludingVat: Amount.of(packageType.depositPrice),
      vat: Vat.NO_VAT,
    }),
    capacity: ProductQuantity.of(packageType.capacity),
  });
}

export function leFourgonProductToDomainMapper(
  product: LeFourgonProduct
): Product {
  return new Product({
    id: ProductId.of(product.id),
    name: Name.of(product.name),
    description: Description.of(product.description),
    image: ImageUrl.of(product.image1),
    thumbnail: ImageUrl.of(product.thumb150),
    price: new Price({
      amountExcludingVat: Amount.of(product.price),
      vat: Vat.of(product.tva),
    }),
    depositPrice: new Price({
      amountExcludingVat: Amount.of(product.totalDepositPrice),
      vat: Vat.NO_VAT,
    }),
    alcoholLevel: AlcoholLevel.of(product.alcoholLevel || 0),
    maxOrderable: ProductQuantity.of(product.maxOrderable),
    availability: Availability.of(product.isAvailable),
    volume: new ProductVolume({
      quantity: product.volume,
      unit: product.unit,
    }),
    packaging: leFourgonProductPackagingToDomain(product.packageType),
  });
}

export class LeFourgonProductsResponseToDomainMapper {
  toDomainProductsResult(
    leFourgonProductsResponse: LeFourgonProductsResponse
  ): ProductsResult {
    const products = leFourgonProductsResponse.products.map(
      leFourgonProductToDomainMapper
    );

    const pagination = new PaginatedResult({
      limit: leFourgonProductsResponse.limit,
      offset: leFourgonProductsResponse.offset,
      count: leFourgonProductsResponse.count,
    });

    return new ProductsResult(products, pagination);
  }
}
