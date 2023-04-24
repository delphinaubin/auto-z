import { ProductId } from "./product-id.vo";
import { Name } from "../../domain/name.vo";
import { Description } from "../../domain/description.vo";
import { ImageUrl } from "../../domain/image-url.vo";
import { Price } from "./price.vo";
import { ProductQuantity } from "./product-quantity.vo";
import { AlcoholLevel } from "./alcohol-level.vo";
import { DomainObject } from "../../../shared/domain-object";
import { Availability } from "./availability.vo";
import { ProductVolume } from "./product-volume.vo";
import { ProductPackaging } from "./product-packaging.vo";

interface ProductConstructorParams {
  id: ProductId;
  name: Name;
  description: Description;
  image: ImageUrl;
  thumbnail: ImageUrl;
  price: Price;
  depositPrice: Price;
  maxOrderable: ProductQuantity;
  alcoholLevel: AlcoholLevel;
  availability: Availability;
  volume: ProductVolume;
  packaging: ProductPackaging | null;
}

export class Product extends DomainObject<"Product"> {
  readonly id: ProductId;
  readonly name: Name;
  readonly description: Description;
  readonly image: ImageUrl;
  readonly thumbnail: ImageUrl;
  readonly price: Price;
  readonly depositPrice: Price;
  readonly maxOrderable: ProductQuantity;
  readonly alcoholLevel: AlcoholLevel;
  readonly availability: Availability;
  readonly volume: ProductVolume;
  readonly packaging: ProductPackaging | null;

  constructor({
    id,
    name,
    description,
    image,
    thumbnail,
    price,
    depositPrice,
    maxOrderable,
    alcoholLevel,
    availability,
    volume,
    packaging,
  }: ProductConstructorParams) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.thumbnail = thumbnail;
    this.price = price;
    this.depositPrice = depositPrice;
    this.maxOrderable = maxOrderable;
    this.alcoholLevel = alcoholLevel;
    this.availability = availability;
    this.volume = volume;
    this.packaging = packaging;
  }
}
