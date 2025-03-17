const { log } = require('console');
const connection = require('../mysql');
const path = require('path');
const fs = require('fs').promises;

const addProduct = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);

  const {
    product_name,
    product_description,
    product_price,
    product_stock,
    product_isAvailable,
    product_category_name,
    seller_email,
  } = req.body;

  const product_image_link_details = JSON.parse(req.body.product_image_link_details);

  try {
    // Convert data types
    const parsedPrice = parseInt(product_price, 10);
    const parsedStock = parseInt(product_stock, 10);
    const parsedIsAvailable = product_isAvailable === 'true' || product_isAvailable === true ? 1 : 0;

    if (isNaN(parsedPrice) || parsedPrice <= 0) throw new Error('Invalid product price');
    if (isNaN(parsedStock) || parsedStock < 0) throw new Error('Invalid product stock');

    // Validate seller
    console.log('Checking seller:', seller_email);
    const [seller] = await connection.query(
      'SELECT seller_email FROM sellers WHERE seller_email = ? AND seller_status = ?',
      [seller_email, 'APPROVED']
    );
    console.log('Seller query result:', seller);
    if (seller.length === 0) {
      console.log('Seller validation failed: Unauthorized or seller not approved');
      return res.status(403).json({ message: 'Unauthorized or seller not approved' });
    }

    // Check or create category
    console.log('Checking category:', product_category_name);
    let [category] = await connection.query(
      'SELECT product_category_id FROM product_categories WHERE product_category_name = ?',
      [product_category_name]
    );
    let product_category_id;
    if (category.length === 0) {
      console.log('Category does not exist, creating new category...');
      const [result] = await connection.query(
        'INSERT INTO product_categories (product_category_name) VALUES (?)',
        [product_category_name]
      );
      product_category_id = result.insertId;
      console.log('New category created with ID:', product_category_id);
    } else {
      product_category_id = category[0].product_category_id;
      console.log('Existing category ID:', product_category_id);
    }

    // Insert product
    console.log('Inserting product with values:', {
      product_name,
      product_description,
      product_price: parsedPrice,
      product_stock: parsedStock,
      product_isAvailable: parsedIsAvailable,
      product_category_id,
      seller_email,
    });
    const [result] = await connection.query(
      'INSERT INTO products (product_name, product_description, product_price, product_stock, product_isAvailable, product_category_id, seller_email) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        product_name,
        product_description,
        parsedPrice,
        parsedStock,
        parsedIsAvailable,
        product_category_id,
        seller_email,
      ]
    );
    if (!result.insertId) {
      console.log('Product insertion failed: No insertId returned');
      throw new Error('Failed to insert product into database');
    }
    const product_id = result.insertId;
    console.log('Product inserted with ID:', product_id);

    // Handle image upload
    // if (product_media_link_details) {
    // console.log('Handling image upload...');
    // const uploadDir = path.join(__dirname, '../uploads/product');
    // if (!fs.existsSync(uploadDir)) {
    // console.log('Creating upload directory:', uploadDir);
    // await fs.mkdir(uploadDir, { recursive: true });
    // }

    // const fileName = `${product_id}_${Date.now()}_${product_media_link.name}`;
    // const filePath = path.join(uploadDir, fileName);
    // await product_media_link.mv(filePath);
    // console.log('Image saved to:', filePath);

    const [imageResult] = await connection.query(
      'INSERT INTO product_image_name (product_id, product_media_link) VALUES (?, ?)',
      [product_id, product_image_link_details.name]
    );
    if (imageResult.affectedRows !== 1) {
      console.log('Image insertion failed');
      throw new Error('Failed to insert image into database');
    }
    console.log('Image link inserted into product_image_name');
    // }

    res.status(201).json({ message: 'Product added successfully', product_id });
  } catch (error) {
    console.error('Error adding product:', error.message, error.stack);
    if (error.message === 'Only images and videos are allowed') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error adding product', error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    /* let query = `
      SELECT p.product_id, p.product_name, p.product_description, p.product_price, p.product_stock, p.product_isAvailable, p.seller_email, p.createdAt,
             pc.product_category_name,
             GROUP_CONCAT(pin.product_media_link) AS image_links
      FROM products p
      LEFT JOIN product_categories pc ON p.product_category_id = pc.product_category_id
      LEFT JOIN product_image_name pin ON p.product_id = pin.product_id
      WHERE p.product_isAvailable = 1
    `; */


    let query = `
    SELECT 
    p.product_id,
    p.product_name,
    p.product_description,
    p.product_price,
    p.product_stock,
    p.product_isAvailable,
    p.product_category_id,
    pc.product_category_name,  -- Added category name from product_categories table
    p.seller_email,
    p.createdAt,
    pin.product_media_link
FROM 
    products p
JOIN 
    product_image_name pin ON p.product_id = pin.product_id
JOIN
    product_categories pc ON p.product_category_id = pc.product_category_id;  -- Join with product_categories table

    `

    /*  const conditions = [];
     const params = [];
 
     // Add filter conditions
     if (req.query.category) {
       conditions.push('pc.product_category_name = ?');
       params.push(req.query.category);
     }
     if (req.query.minPrice) {
       conditions.push('p.product_price >= ?');
       params.push(parseFloat(req.query.minPrice));
     }
     if (req.query.maxPrice) {
       conditions.push('p.product_price <= ?');
       params.push(parseFloat(req.query.maxPrice));
     }
     if (req.query.isAvailable) {
       conditions.push('p.product_isAvailable = ?');
       params.push(parseInt(req.query.isAvailable));
     }
 
     if (conditions.length > 0) {
       query += ' AND ' + conditions.join(' AND ');
     }
 
     query += ' GROUP BY p.product_id'; */

    const [products] = await connection.query(query, /* params */);


    const formattedProducts = products.map((product) => ({
      ...product,
      image_link: `http://localhost:3000/uploads/product/${product.product_media_link}`,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const [products] = await connection.query(
      `SELECT p.product_id, p.product_name, p.product_description, p.product_price, p.product_stock, p.product_isAvailable, p.seller_email, p.createdAt,
              pc.product_category_name,
              GROUP_CONCAT(pin.product_media_link) AS image_link
       FROM products p
       LEFT JOIN product_categories pc ON p.product_category_id = pc.product_category_id
       LEFT JOIN product_image_name pin ON p.product_id = pin.product_id
       WHERE p.product_id = ?
       GROUP BY p.product_id`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const formattedProducts = products.map((product) => ({
      ...product,
      image_link: `http://localhost:3000/uploads/product/${product.image_link}`,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Error fetching product:', error.message, error.stack);
    res.status(500).json({ message: 'Server error fetching product', error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const [categories] = await connection.query(
      'SELECT product_category_id, product_category_name FROM product_categories'
    );
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

module.exports = { addProduct, getAllProducts, getProductById, getCategories };