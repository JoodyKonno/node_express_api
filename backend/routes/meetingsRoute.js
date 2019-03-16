const { Router } = require('express');

module.exports = globals => {
  const router = new Router();

  router.post('/meetings', async (req, res) => {

    try {

      const meetingModel = new globals.db.MeetingsModel({
        title: req.body.title,
        content: req.body.content,
      });  

      const newMeeting = await meetingModel.save();

      res
        .status(201)
        .json({
          data: {
            title: newMeeting.title,
            content: newMeeting.content,
            href: globals.helpers.hypermedia.singleResource('meetings', newMeeting.id)
          }
        });

    } catch (err) {
      
      res
        .status(400)
        .json({
          error: err
        });

    }

  });

  router.get('/meetings/:id', async (req, res) => {

    try {

      const meeting = await globals.db.MeetingsModel.findOne({
        _id: req.params.id,
      });

      if (!meeting) {

        res
          .status(404)
          .json({
            error: 'Not Found'
          });

      }

      res
        .status(200)
        .json({
          data: {
            id: meeting._id,
            title: meeting.title,
            content: meeting.content,
            href: globals.helpers.hypermedia.singleResource('meetings', meeting._id)
          }
        });

    } catch (err) {

      res
        .status(404)
        .json({
          error: 'Not Found',
        })

    }

  });

  return router;

}