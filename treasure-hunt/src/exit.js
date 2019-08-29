function exit(exitHandler) {
  process.on("exit", exitHandler.bind(null));
  process.on("SIGINT", exitHandler.bind(null));
  process.on("SIGUSR1", exitHandler.bind(null));
  process.on("SIGUSR2", exitHandler.bind(null));
  process.on("uncaughtException", exitHandler.bind(null));
}

module.exports = exit;
