// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_IS_CYPRESS !== 'true'
  ) {
    app.use(
      '/brightid',
      createProxyMiddleware({
        target: 'https://recovery.brightid.org',
        changeOrigin: true,
        pathRewrite: {
          '^/brightid/?(.*)': '/$1',
        },
        secure: process.env.NODE_ENV !== 'development',
      }),
    );
    app.use(
      '/auranode',
      createProxyMiddleware({
        target: 'https://aura-node.brightid.org',
        changeOrigin: true,
        pathRewrite: {
          '^/auranode/?(.*)': '/$1',
        },
        secure: process.env.NODE_ENV !== 'development',
      }),
    );
    app.use(
      '/auranode-test',
      createProxyMiddleware({
        target: 'https://aura-test.brightid.org',
        changeOrigin: true,
        pathRewrite: {
          '^/auranode-test/?(.*)': '/$1',
        },
        secure: process.env.NODE_ENV !== 'development',
      }),
    );
  }
};
