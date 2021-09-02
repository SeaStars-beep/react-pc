module.exports = (app) => {
  require('./user')(app);

  // app.use('/api/v1/admin/user', (req, res) => {
  //   res.send({ id: '123', name: 'tony' });
  // });
};
