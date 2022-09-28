module.exports = (error, req, res, next) => {
  console.log('errorHandler', error);
  res.sendStatus(500);
};
