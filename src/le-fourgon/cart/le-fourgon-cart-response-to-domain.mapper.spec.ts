import { LeFourgonCartResponseToDomainMapper } from "./le-fourgon-cart-response-to-domain.mapper";
import { LeFourgonCartResponse } from "./le-fourgon-cart.response";
import { Cart } from "./domain/cart.aggregate";
import { AbilityToValidate } from "./domain/ability-to-validate.vo";
import { CartPackagingWithProducts } from "./domain/cart-packaging-with-products.vo";
import { ProductPackaging } from "../products/domain/product-packaging.vo";
import { Name } from "../domain/name.vo";
import { ProductPackagingId } from "../products/domain/product-packaging-id.vo";
import { ProductQuantity } from "../products/domain/product-quantity.vo";
import { Price } from "../products/domain/price.vo";
import { Vat } from "../products/domain/vat.vo";
import { Amount } from "../products/domain/amount.vo";
import { PackageQuantity } from "./domain/package-quantity.vo";
import { CartProduct } from "./domain/cart-product.vo";
import { ProductId } from "../products/domain/product-id.vo";
import { ImageUrl } from "../domain/image-url.vo";
import { AlcoholLevel } from "../products/domain/alcohol-level.vo";
import { Availability } from "../products/domain/availability.vo";
import { ProductVolume } from "../products/domain/product-volume.vo";
import { CartResume } from "./domain/cart-resume";
import { CartProductLine } from "./domain/cart-product-line.entity";

describe("toDomainCart", () => {
  it("maps a response to domain entity", () => {
    const mapper = new LeFourgonCartResponseToDomainMapper();

    const aLeFourgonCartResponse: LeFourgonCartResponse = {
      isValidable: false,
      cart: [
        {
          package: {
            packageType: {
              id: 6,
              name: "Petits Formats (x20)",
              capacity: 20,
              depositPrice: 3,
            },
            nbItems: 1,
            nbPackages: 1,
            nbSpaceLeft: 19,
            products: [
              {
                product: {
                  image1:
                    "https://static.lefourgon.com/product_image/62a350b525328543369600.png",
                  thumb150:
                    "https://static.lefourgon.com/cdn-cgi/image/width=150,quality=100/product_image/62a350b525328543369600.png",
                  id: 86,
                  name: "Jupiler Blonde",
                  price: 0.96,
                  tva: 0.2,
                  volume: 25,
                  priceTTC: 1.15,
                  maxOrderable: 500,
                  totalDepositPrice: 0.1,
                  unit: "cl",
                  alcoholLevel: 5.2,
                  isAvailable: true,
                },
                quantity: 1,
                nbItems: 1,
                total: 0.96,
                totalTTC: 1.15,
                totalDeposit: 0.1,
              },
            ],
          },
        },
      ],
      total: {
        ht: 50.55,
        ttc: 60.65,
        deposit: 8.1,
        ttcWithDeposit: 68.75,
      },
    };

    const result = mapper.toDomainCart(aLeFourgonCartResponse);
    expect(result).toBeInstanceOf(Cart);
    expect(result.abilityToValidate).toStrictEqual(
      AbilityToValidate.CANNOT_BE_VALIDATED
    );
    expect(result.packagingWithProducts).toHaveLength(1);
    const [packagingWithProducts] = result.packagingWithProducts;

    expect(packagingWithProducts).toBeInstanceOf(CartPackagingWithProducts);
    expect(packagingWithProducts.packaging).toBeInstanceOf(ProductPackaging);
    expect(packagingWithProducts.packaging.name).toStrictEqual(
      Name.of("Petits Formats (x20)")
    );
    expect(packagingWithProducts.packaging.id).toStrictEqual(
      ProductPackagingId.of(6)
    );
    expect(packagingWithProducts.packaging.capacity).toStrictEqual(
      ProductQuantity.of(20)
    );
    expect(packagingWithProducts.packaging.depositPrice).toStrictEqual(
      new Price({ amountExcludingVat: Amount.of(3), vat: Vat.NO_VAT })
    );

    expect(packagingWithProducts.nbProducts).toStrictEqual(
      ProductQuantity.of(1)
    );
    expect(packagingWithProducts.nbPackages).toStrictEqual(
      PackageQuantity.of(1)
    );
    expect(packagingWithProducts.nbSpaceLeft).toStrictEqual(
      ProductQuantity.of(19)
    );

    expect(packagingWithProducts.productLines).toHaveLength(1);
    const [productLine] = packagingWithProducts.productLines;
    expect(productLine).toBeInstanceOf(CartProductLine)
    expect(productLine.quantity).toStrictEqual(ProductQuantity.of(1));
    expect(productLine.totalExludingVat).toStrictEqual(Amount.of(0.96));
    expect(productLine.totalIncludingVat).toStrictEqual(Amount.of(1.15));
    expect(productLine.totalDeposit).toStrictEqual(Amount.of(0.1));

    const product = productLine.product;

    expect(product).toBeInstanceOf(CartProduct);
    expect(product.id).toStrictEqual(ProductId.of(86));
    expect(product.name).toStrictEqual(Name.of("Jupiler Blonde"));
    expect(product.image).toStrictEqual(
      ImageUrl.of(
        "https://static.lefourgon.com/product_image/62a350b525328543369600.png"
      )
    );
    expect(product.thumbnail).toStrictEqual(
      ImageUrl.of(
        "https://static.lefourgon.com/cdn-cgi/image/width=150,quality=100/product_image/62a350b525328543369600.png"
      )
    );
    expect(product.maxOrderable).toStrictEqual(ProductQuantity.of(500));
    expect(product.price).toBeInstanceOf(Price);
    expect(product.price.vat).toStrictEqual(Vat.of(0.2));
    expect(product.price.amountExcludingVat).toStrictEqual(Amount.of(0.96));
    expect(product.depositPrice).toBeInstanceOf(Price);
    expect(product.depositPrice.vat).toStrictEqual(Vat.NO_VAT);
    expect(product.depositPrice.amountExcludingVat).toStrictEqual(
      Amount.of(0.1)
    );
    expect(product.alcoholLevel).toStrictEqual(AlcoholLevel.of(5.2));
    expect(product.availability).toStrictEqual(Availability.IS_AVAILABLE);

    expect(product.volume).toBeInstanceOf(ProductVolume);
    expect(product.volume.quantity).toEqual(25);
    expect(product.volume.unit).toEqual("cl");

    const cartResume = result.resume;
    expect(cartResume).toBeInstanceOf(CartResume);

    expect(cartResume.totalProductsExcludingVat).toStrictEqual(
      Amount.of(50.55)
    );
    expect(cartResume.totalProductsIncludingVat).toStrictEqual(
      Amount.of(60.65)
    );
    expect(cartResume.totalDeposit).toStrictEqual(Amount.of(8.1));
    expect(cartResume.totalProductsWithDepositIncludingVat).toStrictEqual(
      Amount.of(68.75)
    );
  });
});
