const request = require('supertest');
const app = require('../src/app'); 
const jwt = require('jsonwebtoken');

let token;

const testEmail = "tomas@test.com"

describe('Authentication Endpoints', () => {
  it('dovrebbe registrare un utente', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: testEmail,
        password: 'password'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Utente registrato con successo');
  });

  it('dovrebbe loggare un utente', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: testEmail,
        password: 'password'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });
});

describe('User Endpoints', () => {
  it('dovrebbe creare un nuovo utente', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tomas Silva',
        email: "test" + testEmail,
        password: 'password'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('dovrebbe recuperare un utente tramite ID', async () => {
    const getRes = await request(app)
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    
    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body).toHaveProperty('id', 1);
  });

  it('dovrebbe ritornare 401 se viene fornito un token non valido', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toEqual(401);
  });

  it('dovrebbe ritornare 403 se viene fornito un token non valido', async () => {
    const res = await request(app)
      .get('/users/1')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toEqual(403);
  });
});
