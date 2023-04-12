import { DomainObject } from "../../../shared/domain-object";
import { ProductId } from "../../products/domain/product-id.vo";
import { Name } from "../../domain/name.vo";
import { ImageUrl } from "../../domain/image-url.vo";
import { ProductQuantity } from "../../products/domain/product-quantity.vo";
import { Price } from "../../products/domain/price.vo";
import { AlcoholLevel } from "../../products/domain/alcohol-level.vo";
import { Availability } from "../../products/domain/availability.vo";
import { ProductVolume } from "../../products/domain/product-volume.vo";

interface CartProductConstructorParams {
  id: ProductId;
  name: Name;
  image: ImageUrl;
  thumbnail: ImageUrl;
  maxOrderable: ProductQuantity;
  price: Price;
  depositPrice: Price;
  alcoholLevel: AlcoholLevel;
  availability: Availability;
  volume: ProductVolume;
}

export class CartProduct extends DomainObject<"CartProduct"> {
  readonly id: ProductId;
  readonly name: Name;
  readonly image: ImageUrl;
  readonly thumbnail: ImageUrl;
  readonly maxOrderable: ProductQuantity;
  readonly price: Price;
  readonly depositPrice: Price;
  readonly alcoholLevel: AlcoholLevel;
  readonly availability: Availability;
  readonly volume: ProductVolume;

  constructor({
    id,
    name,
    image,
    thumbnail,
    maxOrderable,
    price,
    depositPrice,
    alcoholLevel,
    availability,
    volume,
  }: CartProductConstructorParams) {
    super();
    this.id = id;
    this.name = name;
    this.image = image;
    this.thumbnail = thumbnail;
    this.maxOrderable = maxOrderable;
    this.price = price;
    this.depositPrice = depositPrice;
    this.alcoholLevel = alcoholLevel;
    this.availability = availability;
    this.volume = volume;
  }
}
