/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';

const app = express();
app.use(express.json());

let equipment = [
  { name: 'USB Microphone', category: 'audio', brand: 'AudioLab', year: 2021, quantity: 5 },
  { name: 'LED Panel', category: 'lighting', brand: 'BrightWorks', year: 2022, quantity: 4 },
  { name: 'Network Switch', category: 'networking', brand: 'NetCore', year: 2020, quantity: 3 },
  { name: 'Cable Tester', category: 'tools', brand: 'TestPro', year: 2019, quantity: 6 },
  { name: 'Studio Headphones', category: 'audio', brand: 'SoundCraft', year: 2023, quantity: 8 },

  { name: 'Iphone', category: 'mobile', brand: 'Apple', year: 2006, quantity: 2 },
  { name: 'PlayStation 2', category: 'console', brand: 'Sony', year: 2000, quantity: 3 }
];

app.get('/api/equipment', (req, res) => {
  // DONE: Return the full equipment array. DONE
  res.status(200).json(equipment);
});

// Keep the filter route before /:id.
app.get('/api/equipment/filter', (req, res) => {
  // DONE: Return equipment matching the category query. DONE
  const category = req.query.category;

  const filteredEquipment = equipment.filter(
    item => item.category === category
  );
  res.status(200).json(filteredEquipment);
});

app.get('/api/equipment/:id', (req, res) => {
  // done: Return the equipment at this array index.
  const id = Number(req.params.id);

  if (id < 0 || id >= equipment.length) {
    return res.status(404).json({ message: 'Equipment not found'});
  }
  res.status(200).json(equipment[id]);
});

app.post('/api/equipment', (req, res) => {
  // DONE: Add an equipment item to the array.
  const newItem = req.body;

  equipment.push(newItem);

  res.status(201).json(newItem);
});

app.put('/api/equipment/:id', (req, res) => {
  // Done: Update the equipment at this array index.
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 0 || id >= equipment.length) {
    return res.status(404).json({ message: 'Equipment not found'});
  }

  equipment[id] = req.body;

  res.status(200).json(equipment[id]);
});

app.delete('/api/equipment/:id', (req, res) => {
  // Done: Remove the equipment at this array index.
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 0 || id>= equipment.length) {
    return res.status(404).json({ message: 'Equipment not found'});
  }

  const removedItem = equipment.splice(id,1)[0];

  res.status(200).json(removedItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
