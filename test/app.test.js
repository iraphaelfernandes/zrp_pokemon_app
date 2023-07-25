const request = require('supertest');
const app = require('../app');

describe('Tests for the application', () => {
  test('Should return abilities in alphabetical order', async () => {
    const mockResponse = {
      data: {
        abilities: [
          { ability: { name: 'ability2' } },
          { ability: { name: 'ability1' } },
        ],
      },
    };

    jest.spyOn(require('axios'), 'get').mockResolvedValue(mockResponse);

    const response = await request(app).get('/pokemon/testpokemon');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(['ability1', 'ability2']);
  });

  test('Should return status 404 for non-existent pokemon', async () => {
  
    jest.spyOn(require('axios'), 'get').mockRejectedValue({ response: { status: 404 } });

    const response = await request(app).get('/pokemon/nonexistentpokemon');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Pokemon not found' });
  });
});
