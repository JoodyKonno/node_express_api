const { Router } = require('express');

const jwt = require('jsonwebtoken');

module.exports = globals => {
  const router = new Router();

  router.post('/auth', async (req, res) => {

    try {

      const user = await globals.db.UsersModel.findOne({
        email: req.body.email,
        password: req.body.password
      });

      res
        .status(201)
        .json({
          data: {
            token: jwt.sign({
              id: user.id,
              email: user.email,
            }, process.env.JWT_SECRET)
          }
        });

    } catch (err) {
      
      res
        .status(400)
        .json({
          errors: err
        });
      
    }

  });

  return router;
};
