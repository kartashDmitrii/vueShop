let ejs = require('ejs');
import html from './templates/abc.html';

export default {
  testMail(payload) {
    return ejs.render(html, payload)
  }
}
