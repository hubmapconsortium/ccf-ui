try {
  require('ccf-api').startServer();
} catch (e) {
  console.error(e.name + ': ' + e.message);
  console.error(e.stack);
}
