// Mock data (replace with database query later)
const mockServices = [
    { id: 1, name: 'Guitar Lessons', description: 'Learn guitar from scratch.', price: 50 },
    { id: 2, name: 'Photography Session', description: 'Professional event photography.', price: 150 },
  ];
  
  // Simulate database logic for GET
  const getAllServices = (req, res) => {
    res.json(mockServices);
  };
  
  // Simulate database logic for POST
  const addNewService = (req, res) => {
    const { name, description, price } = req.body;
    
    const newService = {
      id: mockServices.length + 1,
      name,
      description,
      price,
    };
  
    mockServices.push(newService);
  
    res.status(201).json(newService);
  };
  
  module.exports = {
    getAllServices,
    addNewService,
  };
  