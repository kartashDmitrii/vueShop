module.exports = {
  index: async ctx => {
    await strapi.plugins['email'].services.email.send({
      to: ctx.request.body.to,
      from: ctx.request.body.from,
      replyTo: ctx.request.body.replyTo,
      subject: ctx.request.body.subject,
      html: ctx.request.body.html,
    });
    ctx.send('Send');
  }
};
