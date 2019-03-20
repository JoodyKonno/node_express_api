describe("Route /users", () => {

  let userRequest = {
    name: 'pera pera',
    email: 'pera@pera.com',
    password: 'pera pera'
  }

  after(async () => {
    await app.globals.db.UsersModel.deleteMany({});
  });

  describe("POST /users", () => {

    it("should save a new user and return it", () => {
      return request
        .post('/users')
        .set('content-type', 'application/json')
        .send(userRequest)
        .expect(201)
        .then(res => {
          const body = res.body;
          
          expect(body).to.be.an('Object')
            .and.to.have.property('data');

          const user = body.data;

          expect(user).to.be.an('Object');

          expect(user).to.have.property('id')

          expect(user).to.have.property('name')
            .and.to.be.equals(userRequest.name);
          expect(user).to.have.property('email')
            .and.to.be.equals(userRequest.email);
          expect(user).to.not.have.property('password');
          expect(user).to.have.property('href')
            .and.to.be.equals(`/users/${user.id}`);
        });
    });

  });

});