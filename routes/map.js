const express = require('express');
const mapRouter = express.Router();
const axios = require('axios')

/* GET Data from Google API. */
mapRouter.post('/', async (req, res) => {
  const { lat, lng } = req.body;
  const glutenFreeQuery = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=30000&sensor=true&types=restaurant&keyword=gluten&key=${process.env.GOOGLE_MAPS_API_KEY}`

  try {
     const { data: { results } } =  await axios.get(glutenFreeQuery)
     res.status(200).send(results)
  } catch(e){
      console.log(e.message)
      res.status(404).send('Oppps! There is no matching Places!')
  } 
});

module.exports = mapRouter;
