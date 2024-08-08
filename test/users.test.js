import request from 'supertest';
import express from 'express'
import userRoutes from '../routes/users.js';

// Creamos una instancia de express y la configuramos para que pueda parsear JSON
// Esta instancia dentro de un test es para simular el servidor y que los test trabajen en un ambiente propio
const app = express();
app.use(express.json());
app.use('/users', userRoutes);

// Describe sirve para agrupar los tests
describe('Users API', () => {
  describe('GET /users', () => {
    // it es un test para un caso específico
    it('should return all users', (done) => {
      // request es una función de supertest que realiza una petición HTTP a la aplicación de express
      request(app)
        .get('/users')
        // expect es una función de supertest que verifica el resultado de la petición
        .expect(200)
        // end es una función de supertest que finaliza la petición y recibe un callback con el resultado de la petición
        .end((err, res) => {
          if (err) return done(err);
          if (res.body.length !== 5) {
            return done(new Error(`Expected 5 users, but got ${res.body.length}`));
          }
          // done es una función que se llama para indicar que el test ha finalizado
          done();
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should return the user with the given id', (done) => {
      request(app)
        .get('/users/1')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          if (res.body.id !== 1 || res.body.name !== 'Adrian') {
            return done(new Error('Expected user with id 1 and name Adrian'));
          }
          done();
        });
    });

    it('should return 404 if user not found', (done) => {
      request(app)
        .get('/users/999')
        .expect(404)
        .end(done);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const newUser = { name: 'John Doe' };
      request(app)
        .post('/users')
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          if (!res.body.id || res.body.name !== 'John Doe') {
            return done(new Error('Expected new user with id and name John Doe'));
          }
          done();
        });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', (done) => {
      const updatedUser = { name: 'Adrian Updated' };
      request(app)
        .put('/users/1')
        .send(updatedUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          if (res.body.id !== 1 || res.body.name !== 'Adrian Updated') {
            return done(new Error('Expected updated user with id 1 and name Adrian Updated'));
          }
          done();
        });
    });

    it('should return 404 if user not found', (done) => {
      const updatedUser = { name: 'Nonexistent User' };
      request(app)
        .put('/users/999')
        .send(updatedUser)
        .expect(404)
        .end(done);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete an existing user', (done) => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return 404 if user not found', (done) => {
      request(app)
        .delete('/users/999')
        .expect(404)
        .end(done);
    });
  });
});
