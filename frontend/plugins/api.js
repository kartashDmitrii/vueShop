import api from '../api/index'

export default  ({app}, inject) => {
  inject ('api', api)
}
