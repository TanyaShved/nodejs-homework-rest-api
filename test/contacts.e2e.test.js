const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, contacts, newContact } = require('../model/__mocks__/data');
const app = require('../app');

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock('../model/contacts.js');
jest.mock('../model/users.js');

describe('Testing the route api/contacts', () => {
    let idNewContact;
    
    describe('Testing get request all contacts', () => {
        it('Should return status 200 for get all contacts', async (done) => {
            const res = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.data.contacts).toBeInstanceOf(Array);
            done();
        })

            it('Should return status 200 for get contact by ID', async done => {
                const contact = contacts[0];
                const res = await request(app)
                    .get(`/api/contacts/${contact._id}`)
                    .set('Authorization', `Bearer ${token}`);
                expect(res.status).toEqual(200);
                expect(res.body).toBeDefined();
                expect(res.body.data.contact).toHaveProperty('_id');
                expect(res.body.data.contact._id).toBe(contact._id);
                done();
            })
        
         it('Should return status 404 for get contact by wrong ID', async done => {
      const wrongId = 77777;
      const res = await request(app)
        .get(`/api/contacts/${wrongId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(404);
      done();
         }); 
    })
    
    describe('Testing post request for create contact', () => {
          it('Should return status 201 for add contact', async (done) => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .set('Accept', 'application/json');

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewContact = res.body.data.contact._id;
      done();
    });
        
          it('Should return status 400 for wrong fild', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
          });
        
        it('Should return 400 status without required field', async done => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set('Accept', 'application/json');
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    })
    
    describe('Testing patch request for update contact', () => {
        it('Should return 200 status for update contact', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'KyKy' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.name).toBe('KyKy');
      done();
    });

    it('Should return 400 status for wrong field', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ subscription: 'abc' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 404 status with wrong id', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${123}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Alla' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 400 status for empty request', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

        })

    describe('Testing delete request for delete contact', () => {
            it('Should return 200 status for remove contact', async done => {
      const res = await request(app)
        .delete(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 404 status with wrong id', async done => {
      const res = await request(app)
        .delete(`/api/contacts/${123}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });

    it('Unauthorized error should return 401 status', async done => {
      const res = await request(app)
        .delete(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${123}`);

      expect(res.status).toEqual(401);
      expect(res.body).toBeDefined();
      done();
    });
         })
    })