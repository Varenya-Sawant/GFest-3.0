const connection = require('../mysql');

// Add product to cart
const addToCart = async (req, res) => {
  const { product_id, quantity, email: user_email } = req.body;

  try {

    // Validate product
    const [product] = await connection.query(
      'SELECT product_stock, product_isAvailable FROM products WHERE product_id = ?',
      [product_id]
    );
    if (product.length === 0 || !product[0].product_isAvailable) {
      return res.status(404).json({ message: 'Product not found or not available' });
    }
    if (quantity > product[0].product_stock) {
      return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
    }

    // Check if the product is already in the cart
    const [cartItem] = await connection.query(
      'SELECT cart_item_id, cart_quantity FROM cart_items WHERE user_email = ? AND product_id = ?',
      [user_email, product_id]
    );

    if (cartItem.length > 0) {
      // Update quantity if product already in cart
      const newQuantity = cartItem[0].cart_quantity + quantity;
      if (newQuantity > product[0].product_stock) {
        return res.status(400).json({ message: 'Total quantity exceeds available stock' });
      }
      await connection.query(
        'UPDATE cart_items SET cart_quantity = ? WHERE cart_item_id = ?',
        [newQuantity, cartItem[0].cart_item_id]
      );
    } else {
      // Add new cart item
      await connection.query(
        'INSERT INTO cart_items (user_email, product_id, cart_quantity) VALUES (?, ?, ?)',
        [user_email, product_id, quantity]
      );
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error adding to cart', error: error.message });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  const { email: user_email } = req.query;

  const query = `
    SELECT
      ci.cart_item_id,
      ci.cart_quantity,
      ci.user_email,
      p.product_id,
      p.product_name,
      p.product_description,
      p.product_price,
      p.product_stock,
      p.product_isAvailable,
      p.product_category_id,
      p.seller_email,
      p.createdAt,
      pin.product_media_link AS image_link
    FROM
        cart_items ci
    JOIN
        products p ON ci.product_id = p.product_id
    JOIN
        product_image_name pin ON p.product_id = pin.product_id
    WHERE
        ci.user_email = ?;
    `;

  try {
    const [cartItems] = await connection.query(
      query,
      [user_email]
    );

    const formattedCart = cartItems.map((cartItem) => ({
      ...cartItem,
      image_link: `http://localhost:3000/uploads/product/${cartItem.image_link}`,
    }));

    res.status(200).json(formattedCart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error fetching cart', error: error.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  const { cart_item_id, quantity, product_id } = req.body;

  try {
    // Validate cart item and check available stock
    const [cartItems] = await connection.query(
      `SELECT 
        ci.cart_item_id,
        ci.cart_quantity,
        ci.user_email,
        p.product_id,
        p.product_name,
        p.product_description,
        p.product_price
    FROM 
        cart_items ci
    JOIN 
        products p ON ci.product_id = ?;`,
      [product_id]
    );

    // Check if the cart item exists (cartItems should return an array of rows)
    if (cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Validate that the requested quantity does not exceed stock
    const cartItem = cartItems[0]; // Get the first (and only) result
    if (quantity > cartItem.product_stock) {
      return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
    }

    // Update the cart item with the new quantity
    await connection.query(
      'UPDATE cart_items SET cart_quantity = ? WHERE cart_item_id = ?',
      [quantity, cart_item_id]
    );

    // Send a success response
    res.status(200).json({ message: 'Cart item updated successfully' });

  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Server error updating cart item', error: error.message });
  }
};


// Checkout
const checkout = async (req, res) => {
  const { delivery_address, email: user_email } = req.body;

  try {
    // Get cart items
    const [cartItems] = await connection.query(
      'SELECT ci.cart_item_id, ci.product_id, p.product_name, ci.cart_quantity, p.product_price, p.product_stock FROM cart_items ci JOIN products p ON ci.product_id = p.product_id WHERE ci.user_email = ?',
      [user_email]
    );
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate stock
    for (const item of cartItems) {
      if (item.cart_quantity > item.product_stock) {
        return res.status(400).json({ message: `Insufficient stock for product ID ${item.product_id}` });
      }
    }

    // Create order
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_email, order_date, order_delivery_address, order_status) VALUES (?, NOW(), ?, ?)',
      [user_email, delivery_address, 'PLACED']
    );
    const order_id = orderResult.insertId;

    // Add order items
    for (const item of cartItems) {
      await connection.query(
        'INSERT INTO order_contains_products (order_id, product_id, order_quantity) VALUES (?, ?, ?)',
        [order_id, item.product_id, item.cart_quantity]
      );
      // Update product stock
      await connection.query(
        'UPDATE products SET product_stock = product_stock - ? WHERE product_id = ?',
        [item.cart_quantity, item.product_id]
      );
    }

    // Clear cart
    await connection.query('DELETE FROM cart_items WHERE user_email = ?', [user_email]);

    // Generate bill (simplified response for now)
    const bill = {
      order_id,
      user_email,
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.cart_quantity,
        price: item.product_price,
        total: item.cart_quantity * item.product_price,
      })),
      total_amount: cartItems.reduce((sum, item) => sum + item.cart_quantity * item.product_price, 0),
      delivery_address,
    };

    res.status(200).json({ message: 'Checkout successful', bill });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Server error during checkout', error: error.message });
  }
};
// ... (previous imports and functions remain unchanged)

const removeCartItem = async (req, res) => {
  const { cart_item_id, email: user_email } = req.body; // Get cart_item_id and user_email from the request body

  // Validate that cart_item_id and user_email are provided
  if (!cart_item_id || !user_email) {
    return res.status(400).json({ message: 'Cart item ID and user email are required' });
  };

  try {
    // Step 1: Check if the cart item exists for the given user
    const [cartItem] = await connection.query(
      'SELECT cart_item_id FROM cart_items WHERE cart_item_id = ? AND user_email = ?',
      [cart_item_id, user_email]
    );

    // If cart item doesn't exist, return an error response
    if (cartItem.length === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Step 2: Remove the cart item from the database
    await connection.query(
      'DELETE FROM cart_items WHERE cart_item_id = ? AND user_email = ?',
      [cart_item_id, user_email]
    );

    // Step 3: Respond with success
    res.status(200).json({ message: 'Cart item removed successfully' });

  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ message: 'Server error removing cart item', error: error.message });
  }
};


// Export 
module.exports = { addToCart, getCart, updateCartItem, checkout, removeCartItem };
