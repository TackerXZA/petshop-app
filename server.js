const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// 🟢 สำคัญมาก: เปิดรับ Request ข้าม Domain จาก HTML
app.use(cors());
app.use(express.json());

// ข้อมูลจำลองสินค้า
const products = [
    { id: 1, name: "อาหารสุนัขพันธุ์เล็ก สูตรไก่และข้าว 3kg", category: "dog", price: 390, rating: 4.8, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500" },
    { id: 2, name: "อาหารแมวโฮลิสติก ลดก้อนขน 1.2kg", category: "cat", price: 450, rating: 4.9, image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500" },
    { id: 3, name: "หญ้าไทโมธีพรีเมียม สำหรับกระต่าย 1kg", category: "small", price: 220, rating: 4.7, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500" },
    { id: 4, name: "อาหารนกแก้ว ธัญพืชรวม 9 อย่าง 500g", category: "bird", price: 165, rating: 4.6, image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500" },
    { id: 5, name: "อาหารปลาสวยงาม เม็ดเร่งสี 100g", category: "fish", price: 95, rating: 4.5, image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500" }
];

// API ดึงรายการสินค้า + รองรับ Query Category
app.get('/api/products', (req, res) => {
    const { category } = req.query;
    if (category && category !== 'all') {
        const filtered = products.filter(p => p.category === category);
        return res.json(filtered);
    }
    res.json(products);
});

// API สร้างคำสั่งซื้อ (Checkout)
app.post('/api/checkout', (req, res) => {
    const { items, total } = req.body;
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    
    console.log(`[Order Created] ID: ${orderId}, Total: ${total} THB`);
    res.json({
        success: true,
        orderId,
        total
    });
});

app.listen(PORT, () => {
    console.log(`Server Node.js running on http://localhost:${PORT}`);
});