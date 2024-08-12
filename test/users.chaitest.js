import { use, expect, assert, should } from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';

import userRoutes from '../routes/users.js';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

// Extiende chai con chai-http para poder hacer peticiones HTTP
const chai = use(chaiHttp);
should(); // Habilita el uso de should en los tests

// Test cases
describe('Users API', () => {
  describe('GET /users', () => {
    it('should return all users', (done) => {
      // Inicializa el request a la app de express
      chai.request(app)
        .get('/users')
        // end finalizes the request and receives a callback with the result where we can make assertions
        .end((err, res) => {
          if (err) return done(err);
          // Use expect for assertions with some examples
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(5);
          done();
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should return the user with the given id', (done) => {
      chai.request(app)
        .get('/users/1')
        .end((err, res) => {
          if (err) return done(err);
          // Ejemplo de "assert" para assertions y su anatomia:
          // Parameters
          // actual: El value que estamos testeando (el value que obtenemos del codigo).
          // expected: El value que esperamos (El value contra el que comparamos).
          // message (optional): Un mensaje custom si es que el assertion falla.
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.isObject(res.body, 'Response body should be an object');
          assert.propertyVal(res.body, 'id', 1, 'User ID should be 1');
          assert.propertyVal(res.body, 'name', 'Adrian', 'User name should be Adrian');
          expect(res.body.id).to.equal(1);
          done();
        });
    });

    it('should return 404 if user not found', (done) => {
      chai.request(app)
        .get('/users/999')
        .end((err, res) => {
          if (err) return done(err);
          // Ejemplo de "should" para assertions
          // Anatomia de should:
          // res es el objeto que estamos testeando.
          // should es el metodo que usamos para acceder a las funciones de assertion.
          // status es una funcion de should que verifica si el status de la respuesta es igual al valor que le pasamos.
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const newUser = { name: 'John Doe' };
      chai.request(app)
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('name', 'John Doe');
          done();
        });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', (done) => {
      const updatedUser = { name: 'Adrian Updated' };
      chai.request(app)
        .put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id', 1);
          expect(res.body).to.have.property('name', 'Adrian Updated');
          done();
        });
    });

    it('should return 404 if user not found', (done) => {
      const updatedUser = { name: 'Nonexistent User' };
      chai.request(app)
        .put('/users/999')
        .send(updatedUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete an existing user', (done) => {
      chai.request(app)
        .delete('/users/1')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(204);
          done();
        });
    });

    it('should return 404 if user not found', (done) => {
      chai.request(app)
        .delete('/users/999')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
