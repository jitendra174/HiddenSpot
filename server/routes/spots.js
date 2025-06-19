const express = require('express');
const router = express.Router();
const Spot = require('../models/Spot');

// Default image URLs by category
const defaultImages = {
  Romantic: "https://images.unsplash.com/photo-1666694421187-75957423ee77?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Serene: "https://images.unsplash.com/photo-1581309553233-a6d8e331c921?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Creative: "https://images.unsplash.com/photo-1701195617130-a16e1b794ccc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

// POST /api/spots
router.post('/', async (req, res) => {
  try {
    const { name, description, category, latitude, longitude } = req.body;

    const spot = new Spot({
      name,
      description,
      category,
      latitude,
      longitude,
      image: defaultImages[category] || defaultImages['Romantic']
    });

    const saved = await spot.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving spot:', err);
    res.status(500).json({ message: 'Error saving spot', error: err.message });
  }
});

// GET /api/spots
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.find().sort({ createdAt: -1 });
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching spots' });
  }
});

module.exports = router;
