import instance from "./instance";

import authModule from './auth'
import productModule from './product'
import emailModule from './email'
import orderModule from './order'
import categoryModule from './categories'

export default {
  auth: authModule(instance),
  product: productModule(instance),
  email: emailModule(instance),
  order: orderModule(instance),
  categories: categoryModule(instance)
}
