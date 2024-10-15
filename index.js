const express = require('express');
const app = express();
const port = 3000;

// Middleware สำหรับแปลง request body เป็น JSON
app.use(express.json());

// Mock data (ใช้ในหน่วยความจำ)
let mockData = [
    { id: 1, name: 'Item 1', description: 'Description for item 1' },
    { id: 2, name: 'Item 2', description: 'Description for item 2' },
    { id: 3, name: 'Item 3', description: 'Description for item 3' },
];

// GET - อ่านข้อมูลทั้งหมด http://localhost:3000/items
app.get('/items', (req, res) => {
    res.json(mockData);
});

// GET - อ่านข้อมูลชิ้นเดียวโดยใช้ id
app.get('/items/:id', (req, res) => {
    const item = mockData.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// POST - สร้างข้อมูลใหม่
app.post('/items', (req, res) => {
    const newItem = {
        id: mockData.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    mockData.push(newItem);
    res.status(201).json(newItem);
});

// PUT - แก้ไขข้อมูล
app.put('/items/:id', (req, res) => {
    const item = mockData.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.name = req.body.name;
    item.description = req.body.description;
    res.json(item);
});

// DELETE - ลบข้อมูล
app.delete('/items/:id', (req, res) => {
    const itemIndex = mockData.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

    const deletedItem = mockData.splice(itemIndex, 1);
    res.json(deletedItem);
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
