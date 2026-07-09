import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/product.js";

const products = [
  { name: "Wireless Bluetooth Headphones", price: 79.99, description: "Noise-cancelling over-ear headphones with 30hr battery life.", category: "electronics", rating: 4.5 },
  { name: "Slim Fit Cotton T-Shirt", price: 24.99, description: "Comfortable 100% organic cotton tee available in 5 colors.", category: "clothing", rating: 4.2 },
  { name: "The Art of Clean Code", price: 34.99, description: "A practical guide to writing maintainable and elegant code.", category: "books", rating: 4.8 },
  { name: "Stainless Steel Water Bottle", price: 19.99, description: "Double-walled vacuum insulated, keeps drinks cold 24hrs.", category: "home", rating: 4.6 },
  { name: "Yoga Mat Premium", price: 39.99, description: "Non-slip, eco-friendly TPE material, 6mm thick.", category: "sports", rating: 4.3 },
  { name: "Smart Watch Pro", price: 199.99, description: "Heart rate monitor, GPS, 7-day battery, waterproof.", category: "electronics", rating: 4.4 },
  { name: "Denim Jacket Classic", price: 89.99, description: "Timeless vintage wash denim with a modern fit.", category: "clothing", rating: 4.1 },
  { name: "JavaScript: The Good Parts", price: 29.99, description: "Deep dive into the best features of JavaScript.", category: "books", rating: 4.7 },
  { name: "Scented Candle Set", price: 27.99, description: "Set of 3 hand-poured soy candles - vanilla, lavender, citrus.", category: "home", rating: 4.0 },
  { name: "Resistance Bands Set", price: 14.99, description: "5 levels of resistance for home workouts.", category: "sports", rating: 4.5 },
  { name: "USB-C Hub 7-in-1", price: 45.99, description: "HDMI 4K, USB 3.0, SD card, PD 100W charging.", category: "electronics", rating: 4.3 },
  { name: "Wool Blend Beanie", price: 18.99, description: "Soft warm beanie perfect for cold weather.", category: "clothing", rating: 4.0 },
  { name: "Atomic Habits", price: 16.99, description: "Tiny changes, remarkable results - James Clear bestseller.", category: "books", rating: 4.9 },
  { name: "Ceramic Coffee Mug", price: 12.99, description: "Handcrafted 12oz mug with minimalist design.", category: "home", rating: 4.2 },
  { name: "Jump Rope Speed", price: 9.99, description: "Adjustable steel cable with foam handles.", category: "sports", rating: 4.1 },
  { name: "Portable Bluetooth Speaker", price: 49.99, description: "Waterproof, 360° sound, 12hr battery.", category: "electronics", rating: 4.6 },
  { name: "Linen Shirt Lightweight", price: 44.99, description: "Breathable linen perfect for summer days.", category: "clothing", rating: 4.3 },
  { name: "Clean Code", price: 39.99, description: "Robert C. Martin's guide to agile software craftsmanship.", category: "books", rating: 4.6 },
  { name: "Plant Pot Set", price: 22.99, description: "Set of 3 ceramic pots with drainage holes.", category: "home", rating: 4.4 },
  { name: "Adjustable Dumbbells", price: 149.99, description: "Space-saving 5-52.5 lbs adjustable pair.", category: "sports", rating: 4.7 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const inserted = await Product.insertMany(products);
    console.log(`Seeded ${inserted.length} products`);

    await mongoose.disconnect();
    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
