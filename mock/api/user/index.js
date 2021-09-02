module.exports = (app) => {
  app.use('/api/v1/admin/user/:uid', (req, res) => {
    res.send({ id: req.params.uid, name: 'tony' });
  });
};
