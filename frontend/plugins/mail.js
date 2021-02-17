import mail from "../api/mail/mailTemplates";

export default  ({app}, inject) => {
  inject ('apiMail', mail)
}
