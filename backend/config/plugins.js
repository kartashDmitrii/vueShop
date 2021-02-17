module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: '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',
    },
    settings: {
      defaultFrom: 'cheloveche3@gmail.com',
      defaultReplyTo: 'cheloveche3@gmail.com',
    },
  },
  // ...
});
