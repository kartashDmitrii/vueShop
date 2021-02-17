import axios from '../api/axios/index'

export default  ({app}, inject) => {
  inject ('apiAxios', axios)
}
