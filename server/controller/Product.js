const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs/promises");
const path = require("path");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, quantity, sold, price, categoryId } = req.body;
    const image = req.files;

    const checkName = await prisma.product.findFirst({
      where: {
        name: name,
      },
    });

    if (checkName) {
      image.forEach((item) => {
        const filePath = path.join(__dirname, "../uploads", item.filename);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", filePath);
        });
      });

      return res.json({ message: "มีสินค้านี้ในระบบแล้ว" });
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        description: description,
        quantity: Number(quantity),
        sold: Number(sold),
        price: Number(price),
        categoryId: Number(categoryId),
      },
    });

    const productId = await prisma.product.findFirst({
      where: {
        name: name,
      },
    });

    const result = await Promise.all(
      image.map((item) =>
        prisma.productImage.create({
          data: {
            productId: Number(productId.id),
            imageUrl: item.filename,
          },
        })
      )
    );

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CREATE_PRODUCT_ERROR",
      message: "Create product error",
    });
  }
};

exports.listProduct = async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      include: {
        images: true,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "List_PRODUCT_ERROR",
      message: "list product error",
    });
  }
};

exports.listProductBy = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        images: true,
      },
    });

    res.status(200).json(product);
  } catch (err) {
    console.log;
    return res.status(500).json({
      success: false,
      error: "LIST_PRODUCT_BY",
      message: "list product by error",
    });
  }
};

const handleName = async (req, res, name) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "HANDLE_NAME_ERROR",
      message: "Handle name error",
    });
  }
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: price[0],
          lte: price[1],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    res.status(200).json(handlePrice);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "HANDLE_PRICE_ERROR",
      message: "Handle price error",
    });
  }
};

const handleCategory = async (req, res, categoryId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "HANDLE_CATEGORY_ERROR",
      message: "Handle category error",
    });
  }
};

exports.filters = async (req, res) => {
  try {
    const { name, categoryId, price } = req.body;

    if (name) {
      await handleName(req, res, name);
    }
    if (categoryId) {
      await handleCategory(req, res, categoryId);
    }
    if (price) {
      await handlePrice(req, res, price);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "FILTERS_ERROR",
      message: "Filters error",
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, quantity, sold, price, categoryId } = req.body;
    const image = req.files;

    const data = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        description: description,
        quantity: Number(quantity),
        sold: Number(sold),
        price: Number(price),
        categoryId: Number(categoryId),
      },
    });

    const uploadImage = await Promise.all(
      image.map((item) =>
        prisma.productImage.create({
          data: {
            productId: Number(id),
            imageUrl: item.filename,
          },
        })
      )
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "EDIT_PRODUCT_ERROR",
      message: "Edit product error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "DELETE_PRODUCT_ERROR",
      message: "Delete product error",
    });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nameImage } = req.body;
    const result = await prisma.productImage.deleteMany({
      where: {
        productId: id,
      },
    });

    await Promise.all(nameImage.map((item) => fs.unlink("./uploads/" + item)));

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "DELETE_PRODUCT_IMAGE_ERROR",
      message: "Delete product image error",
    });
  }
};

exports.deleteProductImageBy = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nameImage } = req.body;
    const result = await prisma.productImage.deleteMany({
      where: {
        productId: id,
        imageUrl: nameImage,
      },
    });

    await fs.unlink("./uploads/" + nameImage);

    res.status(200).json(nameImage);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "DELETE_PRODUCT_IMAGE_BY",
      message: "Delete product image by error",
    });
  }
};
