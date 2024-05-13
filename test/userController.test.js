const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/userModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Controller', () => {
  beforeEach(async () => {
    // Clear user collection before each test
    await User.deleteMany({});
  });

  it('should get all users', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new user', (done) => {
    chai.request(app)
      .post('/api/users')
      .send({ username: 'testuser', email: 'test@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('username', 'testuser');
        expect(res.body).to.have.property('email', 'test@example.com');
        done();
      });
  });

  it('should update a user', async () => {
    const user = new User({ username: 'oldusername', email: 'old@example.com' });
    await user.save();

    chai.request(app)
      .put(`/api/users/${user._id}`)
      .send({ username: 'newusername' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('username', 'newusername');
      });
  });

  it('should delete a user', async () => {
    const user = new User({ username: 'todelete', email: 'delete@example.com' });
    await user.save();

    chai.request(app)
      .delete(`/api/users/${user._id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User deleted successfully');
      });
  });
});
