const express = require('express');
const router = express.Router();

module.exports = params => {
  const { scoreService } = params;
  router.get('/', async (req, res, next) => {
    try {
      const scores = await scoreService.fetchData();
      res.render('layout', { template: 'index', scores });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const { name, score } = req.body;
      await scoreService.writeData({ name, score });
      return res.redirect('./');
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
