import express from 'express';
const router = express.Router();

// Mock data
const users = [
  { id: 1, name: 'Adrian' },
  { id: 2, name: 'Daniel' },
  { id: 3, name: 'Marcos' },
  { id: 4, name: 'Richard' },
  { id: 4, name: 'Rolfi' },
];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Create a new user
router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user by ID
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

export default router;