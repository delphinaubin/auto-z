import { LeFourgonProductsResponse } from "./le-fourgon-products.response";
import { LeFourgonProductsResponseToDomainMapper } from "./le-fourgon-products-response-to-domain.mapper";
import { ProductsResult } from "./domain/products-result.vo";
import { ProductId } from "./domain/product-id.vo";
import { Name } from "../domain/name.vo";
import { Description } from "../domain/description.vo";
import { ImageUrl } from "../domain/image-url.vo";
import { ProductQuantity } from "./domain/product-quantity.vo";
import { Price } from "./domain/price.vo";
import { Vat } from "./domain/vat.vo";
import { Amount } from "./domain/amount.vo";
import { AlcoholLevel } from "./domain/alcohol-level.vo";
import { Availability } from "./domain/availability.vo";
import { ProductVolume } from "./domain/product-volume.vo";
import { PaginatedResult } from "./domain/paginated-result.vo";
import { ProductPackaging } from "./domain/product-packaging.vo";
import { ProductPackagingId } from "./domain/product-packaging-id.vo";
import { strict as assert } from "assert";

describe("toDomainProductsResult", () => {
  let mapper: LeFourgonProductsResponseToDomainMapper;
  let aLeFourgonProductsResponse: LeFourgonProductsResponse;

  beforeEach(() => {
    aLeFourgonProductsResponse = {
      offset: 0,
      limit: 10,
      count: 2,
      products: [
        {
          image1:
            "https://static.lefourgon.com/product_image/6422e86ab0ea5650464882.png",
          thumb150:
            "https://static.lefourgon.com/cdn-cgi/image/width=150,quality=100/product_image/6422e86ab0ea5650464882.png",
          id: 1,
          name: "Moulins d'Ascq Printemps Bio",
          description: "Product 1 description",
          price: 2,
          tva: 0.2,
          volume: 33,
          unit: "cl",
          priceTTC: 2.4,
          maxOrderable: 121,
          totalDepositPrice: 0.1,
          alcoholLevel: 4.5,
          isAvailable: true,
          packageType: {
            id: 1,
            name: "Grands Formats (x12)",
            capacity: 12,
            depositPrice: 3,
          },
        },
      ],
    };

    mapper = new LeFourgonProductsResponseToDomainMapper();
  });

  it("maps a response to domain entities", () => {
    const result = mapper.toDomainProductsResult(aLeFourgonProductsResponse);

    expect(result).toBeInstanceOf(ProductsResult);

    expect(result.pagination).toEqual(
      new PaginatedResult({
        offset: 0,
        limit: 10,
        count: 2,
      })
    );

    expect(result.products).toHaveLength(1);

    const [product] = result.products;

    expect(product.id).toStrictEqual(ProductId.of(1));
    expect(product.name).toStrictEqual(Name.of("Moulins d'Ascq Printemps Bio"));
    expect(product.description).toStrictEqual(
      Description.of("Product 1 description")
    );
    expect(product.image).toStrictEqual(
      ImageUrl.of(
        "https://static.lefourgon.com/product_image/6422e86ab0ea5650464882.png"
      )
    );
    expect(product.thumbnail).toStrictEqual(
      ImageUrl.of(
        "https://static.lefourgon.com/cdn-cgi/image/width=150,quality=100/product_image/6422e86ab0ea5650464882.png"
      )
    );
    expect(product.maxOrderable).toStrictEqual(ProductQuantity.of(121));
    expect(product.price).toBeInstanceOf(Price);
    expect(product.price.vat).toStrictEqual(Vat.of(0.2));
    expect(product.price.amountExcludingVat).toStrictEqual(Amount.of(2));
    expect(product.depositPrice).toBeInstanceOf(Price);
    expect(product.depositPrice.vat).toStrictEqual(Vat.NO_VAT);
    expect(product.depositPrice.amountExcludingVat).toStrictEqual(
      Amount.of(0.1)
    );
    expect(product.alcoholLevel).toStrictEqual(AlcoholLevel.of(4.5));
    expect(product.availability).toStrictEqual(Availability.IS_AVAILABLE);

    expect(product.volume).toBeInstanceOf(ProductVolume);
    expect(product.volume.quantity).toEqual(33);
    expect(product.volume.unit).toEqual("cl");

    expect(product.packaging).toBeInstanceOf(ProductPackaging);
    assert(product.packaging !== null);
    expect(product.packaging.id).toStrictEqual(ProductPackagingId.of(1));
    expect(product.packaging.name).toStrictEqual(
      Name.of("Grands Formats (x12)")
    );
    expect(product.packaging.capacity).toStrictEqual(ProductQuantity.of(12));
    expect(product.packaging.depositPrice).toBeInstanceOf(Price);
    expect(product.packaging.depositPrice.vat).toStrictEqual(Vat.NO_VAT);
    expect(product.packaging.depositPrice.amountExcludingVat).toStrictEqual(
      Amount.of(3)
    );
  });

  it("handles a null package", () => {
    aLeFourgonProductsResponse.products[0].packageType = null;
    const result = mapper.toDomainProductsResult(aLeFourgonProductsResponse);
    const [product] = result.products;
    expect(product.packaging).toBeNull();
  });
});
