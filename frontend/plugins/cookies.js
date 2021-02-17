import cookies from "../api/cookie";

export default  ({app}, inject) => {
  inject ('apiCookies', cookies)
}
