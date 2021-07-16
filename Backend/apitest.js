const express = require('express');
const router = express.Router();
const Restaurant = require('./models/Restaurant')

router.get('/restaurant', (req, res) => {
  console.log('restaurant route')
  return (res.send('restaurant route testing'))
});

router.get('/getall', (req, res) => {
      Restaurant.find()
      .then(restaurants => {
        return res.json(restaurants)
      })
      .catch(err => {
        res.status(404).json({ norestaurantsfound: 'No Restaurants found' })
      });
  });

  router.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id)
      .then(restaurant => res.json(restaurant))
      .catch(err => res.status(404).json({ norestaurantsfound: 'No Restaurants found' }));
  });

  router.post('/addrestaurant', (req, res) => {
    Restaurant.create(req.body)
      .then(restaurant => res.json({ msg: 'Restaurant added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this Restaurant' }));
  });

  router.put('/:id', (req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, req.body)
      .then(restaurant => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

  router.delete('/:id', (req, res) => {
    Restaurant.findByIdAndRemove(req.params.id, req.body)
      .then(restaurant => res.json({ mgs: 'Restaurant entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such Restaurant' }));
  });
  
  module.exports = router;