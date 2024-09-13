const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product'); // Adjust path based on your structure
dotenv.config();
const connectDB = require('./config/db');

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.error('MongoDB connection error:', error));

const products = [
  {
    name: "Running Shoes",
    category: "Footwear",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    color: ["Black", "White", "Blue"],
    price: 79.99,
    gender: "Unisex",
    description: "High-performance running shoes",
    image: "/running-shoes.jpg",
    code: "001"
  }
,
  {
    name: "Performance T-Shirt",
    category: "Tops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: ["Red", "Green", "Blue", "White"],
    price: 24.99,
    gender: "Unisex",
    description: "Lightweight and moisture-wicking performance t-shirt",
    image:"/performance-t-shirt.jpg",
    code: "003"
  }
  ,
  {
    name: "Gym Shorts",
    price: 79.99,
    image: "/gym-shorts.jpg", // Correct image path
    description: "Comfortable gym shorts with moisture-wicking fabric",
    category: "Bottoms", // Add the category field
    gender: "Men",
    sizes: ["S", "M", "L", "XL"],
    color: ["Black", "White", "Blue"],
    code: "008"
  }
  ,
  {
    name: "Athletic Socks",
    category: "Footwear",
    sizes: ["S", "M", "L"],
    color: ["Black", "White", "Gray"],
    price: 15.99,
    gender: "Unisex",
    image:"/athletic-socks.jpg",
    description: "Comfortable athletic socks for everyday training",
    code: "004"
  }
  ,
  {
    name: "Yoga Pants",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL"],
    color: ["Black", "Purple", "Pink"],
    price: 34.99,
    gender: "Women",
    image:"yoga-pants.jpg",
    description: "Stretchable yoga pants for maximum flexibility",
    code: "005"
  }
  ,
  
  { 
    name: "Yoga Pants",
    price: 89.99,
    image: "/pink-yoga-pants.jpg", // Correct image path
    description: "Flexible and comfortable yoga pants with a high waistband.",
    category: "Bottoms", // Add the category field
    gender: "Women",
    sizes: ["S", "M", "L", "XL"],
    color: ["Black", "Gray", "Purple","Pink"],
    code: "026"
  }
  ,
  {
    name: "Running Jacket",
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: ["Black", "Gray", "Red"],
    price: 89.99,
    gender: "Unisex",
    description: "Wind-resistant running jacket for all weather",
    image: "/running-jacket.jpg",
    code: "007"
  }
  ,

  {
    name: "Sweatband",
    category: "Accessories",
    sizes: ["One Size"],
    color: ["Black", "White", "Blue"],
    price: 9.99,
    gender: "Unisex",
    description: "Absorbent sweatband to keep sweat out of your eyes",
    image: "/sweatband.jpg",
    code: "009"
  }
  ,
  {
    name: "Training Gloves",
    category: "Accessories",
    sizes: ["S", "M", "L"],
    color: ["Black", "Red", "Gray"],
    price: 18.99,
    gender: "Unisex",
    description: "Durable training gloves for enhanced grip",
    image: "/training-gloves.jpg",
    code: "010"
  }
  ,
  {
    name: "Cycling Jersey",
    category: "Tops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: ["Yellow", "Black", "Red"],
    price: 59.99,
    gender: "Unisex",
    description: "Breathable cycling jersey with reflective details",
    image: "/cycling-jersy.jpg",
    code: "011"
  }
  ,
  {
    name: "Basketball Shorts",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: ["Blue", "Black", "White"],
    price: 32.99,
    gender: "Men",
    description: "Lightweight basketball shorts for unrestricted movement",
    code: "012",
    image: "/basketball-shorts.jpg",
  }
  ,
  {
    name: "Gym Bag",
    category: "Accessories",
    sizes: ["One Size"],
    color: ["Black", "Gray", "Red"],
    price: 45.99,
    gender: "Unisex",
    description: "Spacious gym bag with multiple compartments",
    image: "/gym-bag.jpg",
    code: "013"
  }
  ,
  {
    name: "Track Pants",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: ["Black", "Gray", "Navy"],
    price: 39.99,
    gender: "Unisex",
    description: "Comfortable track pants for training and casual wear",
    image: "/track-pants.jpg",
    code: "014"
  }
  ,
  {
    name: "Swimming Trunks",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL"],
    color: ["Blue", "Black", "Green"],
    price: 25.99,
    gender: "Men",
    description: "Quick-drying swimming trunks for the pool",
    code: "015",
    image: "/swimming-trunks.jpg",
  }
  ,
  {
    name: "Hooded Sweatshirt",
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: ["Black", "Gray", "Maroon"],
    price: 64.99,
    gender: "Unisex",
    description: "Cozy hooded sweatshirt with a front pocket",
    image: "/hooded-sweatshit.jpg",
    code: "016"
  }
  ,
  {
    name: "Sports Watch",
    category: "Accessories",
    sizes: ["One Size"],
    color: ["Black", "Silver", "Gold"],
    price: 149.99,
    gender: "Unisex",
    description: "Feature-packed sports watch with fitness tracking",
    image: "/sports-watch.jpg",
    code: "017"
  }
  ,
  {
    name: "Tennis Skirt",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL"],
    color: ["White", "Navy", "Pink"],
    price: 28.99,
    gender: "Women",
    description: "Stylish tennis skirt with built-in shorts",
    image: "/tennis-skirt.jpg",
    code: "018"
  }
  ,
  {
    name: "Compression Sleeves",
    category: "Accessories",
    sizes: ["S", "M", "L"],
    color: ["Black", "Blue", "Gray"],
    price: 17.99,
    gender: "Unisex",
    description: "Supportive compression sleeves for improved circulation",
    image: "/compression-sleeves.jpg",
    code: "019"
  }
  ,
  {
    name: "Baseball Cap",
    category: "Accessories",
    sizes: ["One Size"],
    color: ["Black", "White", "Red"],
    price: 14.99,
    gender: "Unisex",
    image: "/baseball-cap.jpg",
    description: "Adjustable baseball cap with breathable fabric",
    image: "/baseball-cap.jpg",
    code: "020"
  }
  ,
  { 
    name: "Breathable Running Shoes",
    price: 129.99,
    image: "/breathable-running-shoes.jpg", // Correct image path
    description: "Lightweight running shoes with excellent ventilation and cushioning.",
    category: "Footwear", // Add the category field
    gender: "Men",
    sizes: ["8", "9", "10", "11", "12"],
    color: ["Gray", "Blue", "Black"],
    code: "021"
  }
  ,
  { 
    name: "Sports Compression Shirt",
    price: 64.99,
    image: "/sports-compression-shirt.jpg", // Correct image path
    description: "Compression shirt designed for optimal muscle support and flexibility.",
    category: "Tops", // Add the category field
    gender: "Men",
    sizes: ["S", "M", "L", "XL"],
    color: ["Black", "White", "Red"],
    code: "022"
  }
  ,
  { 
    name: "Workout Joggers",
    price: 89.99,
    image: "/workout-joggers.jpg", // Correct image path
    description: "Comfortable joggers with a tapered fit and moisture-wicking properties.",
    category: "Bottoms", // Add the category field
    gender: "Men",
    sizes: ["S", "M", "L", "XL"],
    color: ["Navy", "Black", "Olive"],
    code: "023"
  }
  ,
  { 
    name: "Outdoor Training Vest",
    price: 74.99,
    image: "/outdoor-training-vest.jpg", // Correct image path
    description: "Durable vest with multiple pockets and weather-resistant fabric for outdoor workouts.",
    category: "Tops", // Add the category field
    gender: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    color: ["Camouflage", "Black", "Gray"],
    code: "024"
  }
  ,
  { 
    name: "Lightweight Sports Cap",
    price: 29.99,
    image: "/lightweight-sports-cap.jpg", // Correct image path
    description: "Breathable sports cap with adjustable strap and UV protection.",
    category: "Accessories", // Add the category field
    gender: "Men",
    sizes: ["One Size"],
    color: ["Black", "White", "Blue"],
    code: "025"
  }
  ,
  { 
    name: "Running Tank Top",
    price: 54.99,
    image: "/running-tank-top.jpg", // Correct image path
    description: "Lightweight tank top with moisture-wicking fabric and built-in support.",
    category: "Tops", // Add the category field
    gender: "Women",
    sizes: ["S", "M", "L", "XL"],
    color: ["White", "Pink", "Teal"],
    code: "027"
  }
  ,
  { 
    name: "Sports Bra",
    price: 39.99,
    image: "/sports-bra.jpg", // Correct image path
    description: "Supportive sports bra with adjustable straps and breathable material.",
    category: "Tops", // Add the category field
    gender: "Women",
    sizes: ["S", "M", "L", "XL"],
    color: ["Black", "Beige", "Navy"],
    code: "028"
  }
  , 
  { 
    name: "Athletic Skirt",
    price: 74.99,
    image: "/athletic-skirt.jpg", // Correct image path
    description: "Stylish athletic skirt with built-in shorts and moisture-wicking fabric.",
    category: "Bottoms", // Add the category field
    gender: "Women",
    sizes: ["S", "M", "L", "XL"],
    color: ["Black", "Blue", "Gray"],
    code: "029"
  }
  ,
  { 
    name: "Training Jacket",
    price: 99.99,
    image: "/training-jacket.jpg", // Correct image path
    description: "Lightweight jacket with a zip closure and reflective details for outdoor training.",
    category: "Tops", // Add the category field
    gender: "Women",
    sizes: ["S", "M", "L", "XL"],
    color: ["Red", "Charcoal", "Green"],
    code: "030"
  }
  ,
  { 
    name: "Compression Socks",
    price: 34.99,
    image: "/compression-socks.jpg", // Correct image path
    description: "Compression socks designed for better circulation and support during workouts.",
    category: "Accessories", // Add the category field
    gender: "Women",
    sizes: ["S/M", "L/XL"],
    color: ["Black", "White", "Pink"],
    code: "031"
  }
  ,
  {
    name:"Tennis Shoes",
    price: 299,
    image:"/tennis-shoes.jpg",
    description: "A flexible and durable construction to withstand movement",
    category: "Footwear",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    color: ["Black", "White", "Blue"],
    gender: "Women",
    code: "032"

  }
  
  
];

const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Clear the products collection
    await Product.insertMany(products); // Insert the products array into the database
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data", error);
    process.exit(1);
  }
};

seedProducts();
