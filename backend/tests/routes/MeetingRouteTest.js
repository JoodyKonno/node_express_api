describe("Route /meetings", () => {

  let existingMeeting = {};

  before(async () => {
    existingMeeting = await app.globals.db.MeetingsModel.create({
      title: "test meeting 1",
      content: "test content 1"
    });
  });

  after(async () => {
    await app.globals.db.MeetingsModel.deleteMany({});
  });

  describe("GET /meetings/:id", () => {
    
    it("should return the specified meeting", () => {
      return request
        .get(`/meetings/${existingMeeting.id}`)
        .set('Content-type', 'application/json')
        .expect(200)
        .then(res => {
          const body = res.body;

          expect(body).to.be.an("Object")
            .and.to.have.property("data");

          const meeting = body.data;

          expect(meeting).to.be.an("Object");

          expect(meeting).to.have.property("id")
            .and.to.be.equals(existingMeeting.id);
          expect(meeting).to.have.property("title")
            .and.to.be.equals(existingMeeting.title);
          expect(meeting).to.have.property("content")
            .and.to.be.equals(existingMeeting.content);
          expect(meeting).to.have.property("href")
            .and.to.be.equals(`/meetings/${existingMeeting.id}`);
            
        });
    });

  });

  describe('POST /meetings', () => {

    let meetingRequest = {
      title: "meeting 1",
      content: "pera pera",
    };

    it('should save a new meeting and return it', () => {
      return request
        .post('/meetings')
        .set('Content-type', 'application/json')
        .send(meetingRequest)
        .expect(201)
        .then(res => {
          const body = res.body;

          expect(body).to.be.an('Object')
            .and.to.have.property('data');

          const meeting = body.data;

          expect(meeting).to.be.an('Object');

          expect(meeting).to.have.property('id');

          expect(meeting).to.have.property('title')
            .and.to.be.equals(meetingRequest.title);
          expect(meeting).to.have.property('content')
            .and.to.be.equals(meetingRequest.content);
          expect(meeting).to.have.property('href')
            .and.to.be.equals(`/meetings/${meeting.id}`);
        });
    });

    describe('when a empty body is sent', () => {

      it('should return a bad request', () => {
        return request
          .post('/meetings/')
          .set('Content-type', 'application/json')
          .send({})
          .expect(400);
      });

    });

    describe('when a request with empty title ', () => {

      let invalidMeetingRequest = {
        title: "",
        content: "pera pera",
      }

      it('should return a bad request', () => {
        return request
          .post('/meetings/')
          .set('Content-type', 'application/json')
          .send(invalidMeetingRequest)
          .expect(400);
      });

    });

  });

});