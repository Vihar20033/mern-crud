// routes/itemRoutes.js
import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const create = new Item({
      name: req.body.name,
    });
    const saved = await create.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const update = await Item.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!update) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted', deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
