try {
  (await import('ccf-api')).startServer();
} catch (e) {
  console.error(JSON.stringify({
    name: e.name,
    message: e.message,
    stack: e.stack
  }));
}
