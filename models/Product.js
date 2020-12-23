import Model from "~/models/Model"

export default class Product extends Model {
  resource() {
    return "v1/products"
  }
}
