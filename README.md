# E-Commerce-Site-for-Sportswear-with-chatbot-
Project for Advanced project (NIT6150)

E-Commerce Site for Sportswear with Chatbot
This is a full-stack e-commerce web application for sportswear products, integrated with a chatbot to assist users with navigation, product inquiries, and cart management. The platform includes a product search, user authentication, a shopping cart, and an admin dashboard.
Contents
Features	1
Technologies Used	1
System Requirements	1
Installation and Setup	2
How to Use	2
Chatbot Features	2
Admin Features	3
Project Structure and their functions	3
Screenshots	4



________________________________________
Features
•	E-commerce functionality: Browse products, add/remove items to/from the cart, checkout, and manage orders.
•	User authentication: Register and log in as a customer, including persistent login sessions.
•	Chatbot integration: Chatbot helps with navigation, answering product-related questions, and adding/removing items from the cart.
•	Product categories: Separate product collections for Men and Women.
•	Admin dashboard: Manage product listings and view customer orders.
________________________________________
Technologies Used
•	Frontend: React.js
•	Backend: Node.js, Express.js
•	Database: MongoDB (Mongoose ORM)
•	Authentication: JWT (JSON Web Tokens)
•	NLP Library: Compromise.js (for chatbot natural language processing)
•	Version Control: Git, GitHub
•	Styling: CSS, Font Awesome for icons
________________________________________
System Requirements
•	Node.js: Version 14 or above
•	MongoDB: Local instance or a MongoDB cloud service like MongoDB Atlas
•	NPM: Installed along with Node.js
________________________________________
Installation and Setup
1.	Clone the repository:
 

 
2.	Install dependencies:

For the backend:
 
 
For the frontend:


3.	Set up environment variables: Create a .env file in the server/ directory with the following variables:
 

4.	Run the backend: From the server/ directory:

 

5.	Run the frontend: From the client/ directory:
 



________________________________________
How to Use
1.	Visit the homepage: Open http://localhost:3000 in your browser.
2.	Browse products: Use the navigation to view Men's and Women's collections.
3.	Chatbot interaction: Open the chatbot widget to ask questions, navigate the site, or add items to the cart.
4.	Shopping cart: Add items to the cart, update quantities, and proceed to checkout.
5.	Login/Register: Create an account or log in to manage your cart and checkout.
________________________________________
Chatbot Features
•	Product Search: Ask the chatbot to show specific products (e.g., "Show me socks").
•	Cart Management: Add or remove items from the cart through chatbot commands (e.g., "Add socks to the cart").
•	Navigation: The chatbot can navigate to different sections of the site (e.g., "Go to Men's section").
________________________________________
Admin Features
1.	Login as admin to manage products and orders.
o	Admin can add, update, and delete products.
o	View customer orders and update their status.
User Credentials:
Username: Subash@example.com
Password: 123456

________________________________________
Project Structure and their functions
/client       # Frontend code (React)
  /public   # Publicly accessible files (images, index.html)
  /src        # React source files
    /components     # React components (e.g., ProductCard, Chatbot)
    /pages         # React pages (e.g., Men, Women, Cart)
    /context     # Context providers (e.g., CartContext)
  
/server       # Backend code (Node.js, Express)
  /controllers    # Express route controllers
  /models      # Mongoose models
  /routes     # API routes
  /middleware    # Authentication and other middleware
  /config    # Configuration files (e.g., MongoDB connection)
  /seeder.js   # Seed data into MongoDB
  .env       # Environment variables (backend)
  
.gitignore      # Files to ignore in Git
README.md       # Project documentation
________________________________________
Screenshots
1.	Homepage:
o	A stylish homepage with a brand logo, search bar, and chatbot widget.
 

2.	Men's & Women's Pages:
o	Product collections with product images, prices, and descriptions.
 
3.	Shopping Cart:
o	Cart page showing selected products with quantities, prices, and sizes.
 
4.	Chatbot:
o	A chatbot that interacts with users for product searches, cart management, and navigation.
 

link to folders and file : https://github.com/Cubsub/E-Commerce-Site-for-Sportswear-with-chatbot-/tree/master
