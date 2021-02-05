import axios from '../api/axios/index'
import cookies from '../api/cookie/index'

export default  ({app}, inject) => {
  inject ('apiAxios', axios)
}
export default  ({app}, inject) => {
  inject ('apiCookies', cookies)
}
