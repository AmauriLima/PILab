module.exports = function errorHandler(error, request, response, next) {
  response.sendStatus(500);
};
