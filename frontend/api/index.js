import instance from "./instance";

import authModule from './auth'
import productModule from './product'

export default {
  auth: authModule(instance),
  product: productModule(instance)
}
