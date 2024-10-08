const mongoose = require('mongoose');
const DogProduct = require('../DogProduct');
const generateProductID = require('../../utils/generateProductID');

const dogProductsData = [
  new DogProduct({
      ProductName: 'Premium Dog Food',
      Category: 'Dog Products',
      SubCategory: 'Food',
      SubCategoryType: 'Dry Food',
      Brand: 'DoggyDelight',
      Description: 'High-quality dry dog food with essential nutrients.',
      SKU: 'DOGFOOD123',
      Price: 1200,
      DiscountedPrice: 1100,
      StockQuantity: 50,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.5,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '10kg',
      ageRange: 'Adult',
      flavor: 'Chicken',
      ingredients: 'Chicken, Rice, Vegetables'
  }),
  new DogProduct({
      ProductName: 'Grain-Free Dog Food',
      Category: 'Dog Products',
      SubCategory: 'Food',
      SubCategoryType: 'Dry Food',
      Brand: 'HealthyPaws',
      Description: 'Nutrient-rich grain-free dry dog food.',
      SKU: 'DOGFOOD124',
      Price: 1500,
      DiscountedPrice: 1400,
      StockQuantity: 30,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.7,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '8kg',
      ageRange: 'All Ages',
      flavor: 'Beef',
      ingredients: 'Beef, Sweet Potatoes, Peas'
  }),
  new DogProduct({
      ProductName: 'Canned Dog Food',
      Category: 'Dog Products',
      SubCategory: 'Food',
      SubCategoryType: 'Wet Food',
      Brand: 'WoofMeals',
      Description: 'Delicious canned wet dog food with real meat.',
      SKU: 'DOGFOOD125',
      Price: 2000,
      DiscountedPrice: 1800,
      StockQuantity: 40,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.3,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '5kg',
      ageRange: 'Puppy',
      flavor: 'Turkey',
      ingredients: 'Turkey, Carrots, Potatoes'
  }),
  new DogProduct({
      ProductName: 'Organic Wet Dog Food',
      Category: 'Dog Products',
      SubCategory: 'Food',
      SubCategoryType: 'Wet Food',
      Brand: 'PurePaws',
      Description: 'Organic wet dog food with premium ingredients.',
      SKU: 'DOGFOOD126',
      Price: 2200,
      DiscountedPrice: 2100,
      StockQuantity: 25,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.8,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '4kg',
      ageRange: 'Senior',
      flavor: 'Lamb',
      ingredients: 'Lamb, Peas, Carrots'
  }),
  new DogProduct({
      ProductName: 'Chicken Dog Treats',
      Category: 'Dog Products',
      SubCategory: 'Treats',
      SubCategoryType: 'Chewy Treats',
      Brand: 'TastyBones',
      Description: 'Chewy dog treats made with real chicken.',
      SKU: 'DOGTREAT127',
      Price: 800,
      DiscountedPrice: 750,
      StockQuantity: 100,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.6,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '500g',
      ageRange: 'Adult',
      flavor: 'Chicken',
      ingredients: 'Chicken, Rice Flour, Glycerin'
  }),
  new DogProduct({
      ProductName: 'Beef Dog Treats',
      Category: 'Dog Products',
      SubCategory: 'Treats',
      SubCategoryType: 'Chewy Treats',
      Brand: 'TastyBones',
      Description: 'Chewy dog treats made with real beef.',
      SKU: 'DOGTREAT128',
      Price: 850,
      DiscountedPrice: 800,
      StockQuantity: 80,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.4,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '500g',
      ageRange: 'Puppy',
      flavor: 'Beef',
      ingredients: 'Beef, Wheat Flour, Vegetable Glycerin'
  }),
  new DogProduct({
      ProductName: 'Dental Chew Sticks',
      Category: 'Dog Products',
      SubCategory: 'Treats',
      SubCategoryType: 'Dental Treats',
      Brand: 'CleanPaws',
      Description: 'Dental chew sticks for healthy teeth and gums.',
      SKU: 'DOGTREAT129',
      Price: 700,
      DiscountedPrice: 650,
      StockQuantity: 60,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.2,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '400g',
      ageRange: 'Adult',
      flavor: 'Mint',
      ingredients: 'Mint, Rice Flour, Chicken'
  }),
  new DogProduct({
      ProductName: 'Grain-Free Dental Treats',
      Category: 'Dog Products',
      SubCategory: 'Treats',
      SubCategoryType: 'Dental Treats',
      Brand: 'HealthyChews',
      Description: 'Grain-free dental treats for dogs.',
      SKU: 'DOGTREAT130',
      Price: 900,
      DiscountedPrice: 850,
      StockQuantity: 70,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.5,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '450g',
      ageRange: 'All Ages',
      flavor: 'Peanut Butter',
      ingredients: 'Peanut Butter, Rice Flour, Vegetable Glycerin'
  }),
  new DogProduct({
      ProductName: 'Nylon Chew Toy',
      Category: 'Dog Products',
      SubCategory: 'Toys',
      SubCategoryType: 'Chew Toys',
      Brand: 'PawPlay',
      Description: 'Durable nylon chew toy for dogs.',
      SKU: 'DOGTOY131',
      Price: 500,
      DiscountedPrice: 450,
      StockQuantity: 90,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.3,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '200g',
      ageRange: 'Adult',
      flavor: 'None',
      ingredients: 'Nylon'
  }),
  new DogProduct({
      ProductName: 'Rubber Chew Ball',
      Category: 'Dog Products',
      SubCategory: 'Toys',
      SubCategoryType: 'Chew Toys',
      Brand: 'PlayPaws',
      Description: 'Rubber chew ball for playful dogs.',
      SKU: 'DOGTOY132',
      Price: 600,
      DiscountedPrice: 550,
      StockQuantity: 100,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.6,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '300g',
      ageRange: 'Puppy',
      flavor: 'None',
      ingredients: 'Rubber'
  }),
  new DogProduct({
      ProductName: 'Plush Squeaky Toy',
      Category: 'Dog Products',
      SubCategory: 'Toys',
      SubCategoryType: 'Squeaky Toys',
      Brand: 'CuddlePaws',
      Description: 'Soft plush squeaky toy for dogs.',
      SKU: 'DOGTOY133',
      Price: 700,
      DiscountedPrice: 650,
      StockQuantity: 50,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.7,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '150g',
      ageRange: 'All Ages',
      flavor: 'None',
      ingredients: 'Plush, Squeaker'
  }),
  new DogProduct({
      ProductName: 'Interactive Squeaky Toy',
      Category: 'Dog Products',
      SubCategory: 'Toys',
      SubCategoryType: 'Squeaky Toys',
      Brand: 'FunPaws',
      Description: 'Interactive squeaky toy for engaging play.',
      SKU: 'DOGTOY134',
      Price: 800,
      DiscountedPrice: 750,
      StockQuantity: 60,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.5,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '250g',
      ageRange: 'Adult',
      flavor: 'None',
      ingredients: 'Rubber, Squeaker'
  }),
  new DogProduct({
      ProductName: 'Winter Dog Coat',
      Category: 'Dog Products',
      SubCategory: 'Clothing',
      SubCategoryType: 'Coats',
      Brand: 'PawFashion',
      Description: 'Warm winter coat for dogs.',
      SKU: 'DOGCOAT135',
      Price: 2500,
      DiscountedPrice: 2300,
      StockQuantity: 30,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.8,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '500g',
      ageRange: 'All Ages',
      flavor: 'None',
      ingredients: 'Polyester, Fleece'
  }),
  new DogProduct({
      ProductName: 'Rainproof Dog Jacket',
      Category: 'Dog Products',
      SubCategory: 'Clothing',
      SubCategoryType: 'Coats',
      Brand: 'WeatherGuard',
      Description: 'Rainproof jacket for dogs.',
      SKU: 'DOGCOAT136',
      Price: 2700,
      DiscountedPrice: 2500,
      StockQuantity: 20,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.7,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '600g',
      ageRange: 'Adult',
      flavor: 'None',
      ingredients: 'Nylon, Polyester'
  }),
  new DogProduct({
      ProductName: 'Cute Dog Sweater',
      Category: 'Dog Products',
      SubCategory: 'Clothing',
      SubCategoryType: 'Sweaters',
      Brand: 'PawFashion',
      Description: 'Adorable dog sweater for cold weather.',
      SKU: 'DOGSWEATER137',
      Price: 1500,
      DiscountedPrice: 1400,
      StockQuantity: 40,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.6,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '300g',
      ageRange: 'Puppy',
      flavor: 'None',
      ingredients: 'Wool, Cotton'
  }),
  new DogProduct({
      ProductName: 'Knitted Dog Sweater',
      Category: 'Dog Products',
      SubCategory: 'Clothing',
      SubCategoryType: 'Sweaters',
      Brand: 'CozyPaws',
      Description: 'Hand-knitted dog sweater for style and warmth.',
      SKU: 'DOGSWEATER138',
      Price: 1800,
      DiscountedPrice: 1700,
      StockQuantity: 35,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.9,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '350g',
      ageRange: 'All Ages',
      flavor: 'None',
      ingredients: 'Wool, Acrylic'
  }),
  new DogProduct({
      ProductName: 'Adjustable Dog Collar',
      Category: 'Dog Products',
      SubCategory: 'Accessories',
      SubCategoryType: 'Collars',
      Brand: 'PawGear',
      Description: 'Adjustable dog collar with a secure buckle.',
      SKU: 'DOGCOLLAR139',
      Price: 1200,
      DiscountedPrice: 1100,
      StockQuantity: 80,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.4,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '100g',
      ageRange: 'Adult',
      flavor: 'None',
      ingredients: 'Nylon, Plastic Buckle'
  }),
  new DogProduct({
      ProductName: 'Leather Dog Collar',
      Category: 'Dog Products',
      SubCategory: 'Accessories',
      SubCategoryType: 'Collars',
      Brand: 'StylishPaws',
      Description: 'Luxury leather dog collar with metal buckle.',
      SKU: 'DOGCOLLAR140',
      Price: 2500,
      DiscountedPrice: 2300,
      StockQuantity: 25,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.7,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '150g',
      ageRange: 'All Ages',
      flavor: 'None',
      ingredients: 'Leather, Metal Buckle'
  }),
  new DogProduct({
      ProductName: 'Retractable Dog Leash',
      Category: 'Dog Products',
      SubCategory: 'Accessories',
      SubCategoryType: 'Leashes',
      Brand: 'PawGear',
      Description: 'Retractable dog leash for comfortable walks.',
      SKU: 'DOGLEASH141',
      Price: 2000,
      DiscountedPrice: 1900,
      StockQuantity: 50,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.5,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '200g',
      ageRange: 'Adult',
      flavor: 'None',
      ingredients: 'Nylon, Plastic'
  }),
  new DogProduct({
      ProductName: 'Reflective Dog Leash',
      Category: 'Dog Products',
      SubCategory: 'Accessories',
      SubCategoryType: 'Leashes',
      Brand: 'SafetyPaws',
      Description: 'Reflective dog leash for night walks.',
      SKU: 'DOGLEASH142',
      Price: 2200,
      DiscountedPrice: 2100,
      StockQuantity: 40,
      AvailabilityStatus: 'In Stock',
      Images: ['/genricDogProducts.webp'],
      Rating: 4.6,
      UpdatedBy: new mongoose.Types.ObjectId('66ac2fbd188d36b237916ae2'),
      Vendor: { vendor_id: null },
      weight: '250g',
      ageRange: 'All Ages',
      flavor: 'None',
      ingredients: 'Nylon, Reflective Material'
  })
];

  const insertDogProducts = async () => {
    try {
      for (let productData of dogProductsData) {
        const existingProduct = await DogProduct.findOne({ SKU: productData.SKU });
        if (!existingProduct) {
          productData.ProductID = await generateProductID(productData.Category);
          const dogProduct = new DogProduct(productData);
          await dogProduct.save();
        } else {
          console.log(`Product with SKU ${productData.SKU} already exists`);
        }
      }
      console.log('Dog products inserted');
    } catch (error) {
      console.error('Error inserting dog products:', error);
    }
  };

module.exports = insertDogProducts;
