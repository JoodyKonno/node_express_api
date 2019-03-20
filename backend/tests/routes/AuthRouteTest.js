const jwt = require('jsonwebtoken');

describe('Route /auth', () => {

  let existingUsers = [
    {
      name: 'pera',
      email: 'pera@pera',
      password: 'pera',
    }
  ];
  let users;

  let expectedToken;

  before(async () => {
    users = await app.globals.db.UsersModel.insertMany(existingUsers);
  });

  before(() => {
    expectedToken = jwt.sign({
      id: users[0].id,
      email: users[0].email,
    }, process.env.JWT_SECRET);
  });

  after(async () => {
    await app.globals.db.UsersModel.deleteMany({});
  });

  describe('POST /auth', () => {

    let authRequest = {
      email: 'pera@pera',
      password: 'pera'
    };

    it('should return a new user token', () => {
      return request
        .post('/auth')
        .set('content-type', 'application/json')
        .send(authRequest)
        .expect(201)
        .then(res => {
          const body = res.body;

          expect(body).to.be.an('Object')
            .and.to.have.property('data');

          const authToken = body.data;

          expect(authToken).to.have.property('token')
            .and.to.be.equals(expectedToken);
        });
    });

  });

});