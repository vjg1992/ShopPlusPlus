ShopPlusPlus ShopPlusPlus is an online shopping website project that I made as part of my capstone project for UpGrad. It lets users create accounts, browse products, add them to a cart or wishlist, and make secure purchases. The website is built using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js.

Table of Contents : Introduction Features Requirements Installation Running the Project Using the Website Contributing License

Introduction This project is an online shopping website that I created for my UpGrad capstone project. It includes features like user registration, product browsing, cart management, and order tracking.

Features User Accounts: Users can sign up, log in, and manage their profile. Add addresses and maintain info in Account Info section. Product Browsing: Users can explore products by category and search for what they need. For this feature, no need to login. Wishlist: Users can add products to their wishlist for future purchases. For this feature one needs to login/signup first, if not then it will redirect to login page. Cart Management: Users can add items to their cart and proceed to checkout. For this feature one needs to login/signup first, if not then it will redirect to login page. Checkout : After adding products to cart, users can checkout. Or users can checkout directly by using the Buy Now option. On successful order placement, users will get email of the order placed. Order History: Users can view their order history. Reviews : Users can add reviews with photos and videos after purchasing a product only. One review per product and see others reviews as well.

Requirements Before setting up the project, make sure you have these installed:

Node.js npm (Node Package Manager) MongoDB (You can use MongoDB Atlas) Installation Follow these steps to set up the project on your computer: Clone the repository: git clone https://github.com/yourusername/ShopPlusPlus.git cd ShopPlusPlus

Install the necessary packages: For the backend: npm install

For the frontend: npm install

Set up environment variables: Create a .env file in the backend folder and add: env Copy code DB_CONNECTION= JWT_SECRET= PORT=8001

Build the frontend: npm run build Running the Project

Start the backend server: npm start

Serve the frontend: Make sure the React build files are in the backend/public folder so that the backend can serve them.

Access the website: Open your browser and go to http://localhost:8001.

Using the Website Sign Up and Log In: Create an account or log in with your email and password. Browse Products: Explore different categories and use search bar to find products. Manage Cart and Wishlist: Add products to your wishlist or cart and proceed to checkout or Buy Now Checkout.

Contributing If you want to contribute to this project, you can fork the repository and submit a pull request with your changes.

License This project is licensed under the MIT License. See the LICENSE file for details.