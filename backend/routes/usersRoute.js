const { Router } = require('express');

const md5 = require('crypto-js/md5');

module.exports = globals => {
  const router = new Router();

  router.post('/users', async (req, res) => {

    try {

      const userModel = new globals.db.UsersModel({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
      });

      const newUser = await userModel.save();

      res
        .status(201)
        .json({
          data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            href: globals.helpers.hypermedia.singleResource('users', newUser.id)
          }
        })

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
