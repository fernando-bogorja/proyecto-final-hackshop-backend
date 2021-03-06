const { Product } = require("../dbInitialSetup");

/**
 * Obtiene todos los productos de la base de datos.
 * @param  req Request object
 * @param  res Response object
 * @return req.json() with all the data
 */
async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate("category");
    return res.json(products);
  } catch (error) {
    return res.json({ error: error.message });
  }
}

/**
 * Obtiene un producto de la base de datos.
 * @param  req Request object
 * @param  res Response object
 * @[Request Body] id: String
 * @return req.json() with the product data
 */
async function getProductByQuery(req, res) {
  const query = req.query;
  const { action } = req.params;

  switch (Object.keys(query)[0]) {
    case "id":
      return getProductById(req, res);
    case "category":
      return getProductsByCategory(req, res);
    case "slug":
      return getProductBySlug(req, res);
    default:
      return getAllProducts(req, res);
  }
}

async function getProductBySlug(req, res) {
  const { slug } = req.query;
  try {
    const products = await Product.findOne({ slug });
    if (!products) return res.json({ message: "Product not found", data: {} });
    return res.json({ message: "Product found", data: products });
  } catch (error) {
    return res.json({
      message: "Error finding the product",
      error: error.message,
    });
  }
}

async function getProductsByCategory(req, res) {
  const { category } = req.query;
  try {
    const products = await Product.find({ where: { category } });
    if (!products) return res.json({ message: "Product not found", data: {} });
    return res.json({ message: "Product found", data: products });
  } catch (error) {
    return res.json({
      message: "Error finding the product",
      error: error.message,
    });
  }
}

async function getProductById(req, res) {
  const { id } = req.query;
  try {
    const product = await Product.findById(id);
    if (!product) return res.json({ message: "Product not found", data: {} });
    return res.json({ message: "Product found", data: product });
  } catch (error) {
    return res.json({
      message: "Error finding the product",
      error: error.message,
    });
  }
}

async function getProductByMadeIn(req, res) {
  const { made } = req.query;
  try {
    const products = await Product.find({ made });
    if (!products) return res.json({ message: "Product not found", data: {} });
    return res.json({ message: "Product found", data: products });
  } catch (error) {
    return res.json({
      message: "Error finding the product",
      error: error.message,
    });
  }
}

/**
 * Elimina un producto de la base de datos.
 * @param  req Request object
 * @param  res Response object
 * @[Request Body] id: String
 * @return req.json() with the related data
 */
async function deleteOne(req, res) {
  const { id } = req.body;
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.json({ message: "Product not found", data: {} });

    return res.json({ message: "Product deleted successfully", data: product });
  } catch (error) {
    return res.json({
      message: "Error deleting the product",
      error: error.message,
    });
  }
}

async function deleteMany(req, res) {
  const { products } = req.body;
  try {
    const deletedProducts = await Product.deleteMany({
      _id: { $in: products },
    });
    return res.json({
      message: "Products deleted successfully",
      data: { deleted_quantity: deletedProducts.deletedCount },
    });
  } catch (error) {
    return res.json({
      message: "Error deleting the products",
      error: error.message,
    });
  }
}

async function deleteAll(req, res) {
  try {
    const deletedProducts = await Product.deleteMany();
    return res.json({
      message: "Products deleted successfully",
      data: { deleted_quantity: deletedProducts.deletedCount },
    });
  } catch (error) {
    return res.json({
      message: "Error deleting the products",
      error: error.message,
    });
  }
}

/**
 * Actualiza un producto de la base de datos.
 * @param  req Request object
 * @param  res Response object
 * @ [Request Body]
 * @ id: String,
 * @ name: String(100),
 * @ price: String(100),
 * @ description: String(200)
 * @ stock: String(50),
 * @ featured: Boolean
 * @return req.json() with the related data
 */
async function updateOne(req, res) {
  const { id, name, price, images, description, featured, stock } =
    req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, {
      name,
      price: String(price),
      images,
      description,
      featured,
      stock: String(stock),
    });

    if (!product) return res.json({ message: "Product not found", data: {} });

    return res.json({ message: "Product updated successfully", data: product });
  } catch (error) { }
}

async function createOne(req, res) {
  const {
    name,
    price,
    images,
    description,
    featured,
    stock,
    size,
    made_in,
    length,
    tall,
    category,
    upholstery,
  } = req.body;

  try {
    const product = new Product({
      name,
      price: String(price),
      images,
      description,
      upholstery,
      featured,
      stock: String(stock),
      size,
      made_in,
      length,
      tall,
      category,
    });
    await product.save();
    return res.json({ message: "Product created successfully", data: product });
  } catch (error) {
    return res.json({
      message: "error creating the product",
      error: error.message,
    });
  }
}

async function importProducts(req, res) {
  //Products from body is an array of object and each object is a product
  const { products } = req.body;
  //console.log(products);
  try {
    const newProducts = await Product.insertMany(products);
    return res.json({
      message: "Products imported successfully",
      data: { imported_quantity: newProducts.length },
    });
  } catch (error) {
    return res.json({
      message: "Error importing the products",
      error: error.message,
    });
  }
}

/**
 * Compra varios productos de la base de datos.
 * @param  req Request object
 * @param  res Response object
 * @ [Request Body]
 * @ boughtBy: String,
 * @ products: Array
 * @return req.json() with the related data
 *
 **/
async function buy(req, res) { }

module.exports = {
  getAllProducts,
  getProductByQuery,
  getProductsByCategory,
  deleteOne,
  deleteMany,
  deleteAll,
  updateOne,
  createOne,
  importProducts,
  buy,
};
