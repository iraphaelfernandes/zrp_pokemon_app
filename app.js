const axios = require('axios');
const express = require('express');
const app = express();


app.get('/pokemon/:name', async (req, res) => {
  try {
    const pokemonName = req.params.name.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    const response = await axios.get(url);

    
    const abilities = response.data.abilities.map((ability) => ability.ability.name).sort();

    res.json(abilities);
  } catch (error) {
    res.status(404).json({ message: 'Pokemon not found' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});