import { LeFourgonCartResponse } from "./le-fourgon-cart.response";
import { Cart } from "./domain/cart.aggregate";
import { AbilityToValidate } from "./domain/ability-to-validate.vo";
import { CartPackagingWithProducts } from "./domain/cart-packaging-with-products.vo";
import { ProductQuantity } from "../products/domain/product-quantity.vo";
import { PackageQuantity } from "./domain/package-quantity.vo";
import { ProductPackaging } from "../products/domain/product-packaging.vo";
import { ProductPackagingId } from "../products/domain/product-packaging-id.vo";
import { Name } from "../domain/name.vo";
import { Price } from "../products/domain/price.vo";
import { Vat } from "../products/domain/vat.vo";
import { CartProduct } from "./domain/cart-product.vo";
import { ProductId } from "../products/domain/product-id.vo";
import { CartProductLine } from "./domain/cart-product-line.entity";
import { Amount } from "../products/domain/amount.vo";
import { AlcoholLevel } from "../products/domain/alcohol-level.vo";
import { ProductVolume } from "../products/domain/product-volume.vo";
import { ImageUrl } from "../domain/image-url.vo";
import { Availability } from "../products/domain/availability.vo";
import { CartResume } from "./domain/cart-resume";

export class LeFourgonCartResponseToDomainMapper {
  toDomainCart(leFourgonCartResponse: LeFourgonCartResponse) {
    const { cart, total, isValidable } = leFourgonCartResponse;

    const packagingWithProducts = cart.map(
      ({ package: packaging }): CartPackagingWithProducts => {
        return new CartPackagingWithProducts({
          nbProducts: ProductQuantity.of(packaging.nbItems),
          nbPackages: PackageQuantity.of(packaging.nbPackages),
          packaging: new ProductPackaging({
            id: ProductPackagingId.of(packaging.packageType.id),
            name: Name.of(packaging.packageType.name),
            capacity: ProductQuantity.of(packaging.packageType.capacity),
            depositPrice: new Price({
              amountExcludingVat: Amount.of(packaging.packageType.depositPrice),
              vat: Vat.NO_VAT,
            }),
          }),
          nbSpaceLeft: ProductQuantity.of(packaging.nbSpaceLeft),
          productLines: packaging.products.map((line) => {
            const product = line.product;
            return new CartProductLine({
              totalExludingVat: Amount.of(line.total),
              totalIncludingVat: Amount.of(line.totalTTC),
              totalDeposit: Amount.of(line.totalDeposit),
              quantity: ProductQuantity.of(line.quantity),
              product: new CartProduct({
                id: ProductId.of(product.id),
                name: Name.of(product.name),
                image: ImageUrl.of(product.image1),
                thumbnail: ImageUrl.of(product.thumb150),
                alcoholLevel: AlcoholLevel.of(product.alcoholLevel),
                depositPrice: new Price({
                  amountExcludingVat: Amount.of(product.totalDepositPrice),
                  vat: Vat.NO_VAT,
                }),
                price: new Price({
                  amountExcludingVat: Amount.of(product.price),
                  vat: Vat.of(product.tva),
                }),
                volume: new ProductVolume({
                  quantity: product.volume,
                  unit: product.unit,
                }),
                maxOrderable: ProductQuantity.of(product.maxOrderable),
                availability: Availability.of(product.isAvailable),
              }),
            });
          }),
        });
      }
    );
    const resume = new CartResume({
      totalDeposit: Amount.of(total.deposit),
      totalProductsExcludingVat: Amount.of(total.ht),
      totalProductsIncludingVat: Amount.of(total.ttc),
      totalProductsWithDepositIncludingVat: Amount.of(total.ttcWithDeposit),
    });

    return new Cart({
      abilityToValidate: AbilityToValidate.of(isValidable),
      packagingWithProducts,
      resume,
    });
  }
}
