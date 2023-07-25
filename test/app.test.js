const request = require('supertest');
const app = require('../app');

describe('Pokemon Skill Search API', () => {
  let server;

  beforeAll((done) => {

    server = app.listen(3000, () => {
      done();
    });
  });

  afterAll((done) => {
    
    server.close(() => {
      done();
    });
  });

  test('It should return an array with skills in alphabetical order', async () => {
    const response = await request(app).get('/pokemon/bulbasaur');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(expect.arrayContaining(["chlorophyll", "overgrow"]));
  });

  test('Should return an empty array for a pokemon not found', async () => {
    const response = await request(app).get('/pokemon/nonexistentpokemon');
    expect(response.status).toBe(404);

    if (response.status === 404) {
 
      expect(response.body.message).toBe('Pokemon not found');
    } else {
 
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toEqual([]);
    }
  });
});
