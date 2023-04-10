import { DomainObject } from "../../../shared/domain-object";
import { CategoryId } from "./category-id.vo";
import { Description } from "./description.vo";
import { ImageUrl } from "./image-url.vo";
import { Name } from "./name.vo";

interface CategoryConstructorParams {
  id: CategoryId;
  name: Name;
  image: ImageUrl;
  icon: ImageUrl;
  description: Description;
}

export class Category extends DomainObject<"Category"> {
  readonly id: CategoryId;
  readonly name: Name;
  readonly image: ImageUrl;
  readonly icon: ImageUrl;
  readonly description: Description;

  constructor({
    id,
    name,
    image,
    icon,
    description,
  }: CategoryConstructorParams) {
    super();
    this.id = id;
    this.name = name;
    this.image = image;
    this.icon = icon;
    this.description = description;
  }
}
