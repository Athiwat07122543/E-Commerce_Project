const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addAddress = async (req, res) => {
  try {
    const { recipientName, addressDetail, phone } = req.body;

    const userId = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
      select: {
        id: true,
      },
    });

    const checkAddress = await prisma.address.findFirst({
      where: {
        userId: Number(userId.id),
      },
    });

    if (checkAddress) {
      const address = await prisma.address.create({
        data: {
          userId: Number(userId.id),
          recipientName,
          addressDetail,
          phone,
          isDefault: false,
        },
      });
      return res.status(200).json(address);
    } else {
      const address = await prisma.address.create({
        data: {
          userId: Number(userId.id),
          recipientName,
          addressDetail,
          phone,
          isDefault: true,
        },
      });
      return res.status(200).json(address);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "ADD_ADDRESS_ERROR",
      message: "Add address error",
    });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const userId = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
      select: {
        id: true,
      },
    });

    const address = await prisma.address.findMany({
      where: {
        userId: Number(userId.id),
      },
    });
    return res.status(200).json(address);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "GET_ADDRESS_ERROR",
      message: "Get Address error",
    });
  }
};

exports.changeAddress = async (req, res) => {
  try {
    const { addressId } = req.body;
    const userId = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
      select: {
        id: true,
      },
    });

    const defaultId = await prisma.address.findFirst({
      where: {
        userId: Number(userId.id),
        isDefault: true,
      },
      select: {
        id: true,
      },
    });

    const changeDefault = await prisma.address.update({
      where: {
        id: Number(defaultId.id),
      },
      data: {
        isDefault: false,
      },
    });

    const changeAddress = await prisma.address.update({
      where: {
        userId: Number(userId.id),
        id: Number(addressId),
      },
      data: {
        isDefault: true,
      },
    });

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "CHANGE_ADDRESS_ERROR",
      message: "Change address error",
    });
  }
};

exports.addCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
      select: {
        id: true,
      },
    });

    const cart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
      },
    });

    // สร้าง cart ถ้ายังไม่มี
    let cartId = cart?.id;
    if (!cartId) {
      const newCart = await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });
      cartId = newCart.id;
    }

    const product = await prisma.product.findFirst({
      where: {
        id: Number(productId),
      },
    });

    const detail = await prisma.detailCart.findFirst({
      where: {
        cartId: cartId,
        productId: product.id,
      },
    });

    if (!detail) {
      await prisma.detailCart.create({
        data: {
          product: {
            connect: { id: product.id },
          },
          price: product.price,
          quantity: 1,
          cart: {
            connect: { id: cartId },
          },
        },
      });
    } else {
      await prisma.detailCart.updateMany({
        where: {
          cartId: cartId,
          productId: product.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    }
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "ADD_CART_ERROR",
      message: "Add cart error",
    });
  }
};

exports.reduceCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const quantityProduct = await prisma.detailCart.findFirst({
      where: {
        productId: productId.id,
      },
    });

    if (!quantityProduct) {
      return res.send("ERROR");
    }

    if (quantityProduct.quantity > 1) {
      await prisma.detailCart.updateMany({
        where: {
          productId: Number(productId),
        },
        data: {
          quantity: {
            increment: -1,
          },
        },
      });
      return res.json({ message: "-1" });
    } else {
      await prisma.detailCart.deleteMany({
        where: {
          productId: Number(productId),
        },
      });
      return res.json({ message: "0" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "REDUCE_CART_ERROR",
      message: "Reduct cart error",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
      select: {
        id: true,
      },
    });

    const cart = await prisma.cart.findMany({
      where: {
        userId: Number(user.id),
      },
      select: {
        cartDetails: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
    const cartDetails = cart.map((item) => item.cartDetails).flat();
    res.status(200).json(cartDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "GET_CART_ERROR",
      message: "Get cart error",
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
      include: {
        cart: {
          include: {
            cartDetails: true,
          },
        },
      },
    });
    const cart = user.cart.cartDetails;
    for (const item of cart) {
      const id = item.id;
      const detail = item;
      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          quantity: {
            decrement: Number(item.quantity),
          },
          sold: {
            increment: Number(item.quantity),
          },
        },
      });

      const res = await prisma.detailCart.deleteMany({
        where: {
          cartId: Number(item.cartId),
        },
      });
    }

    res.status(200).json({ mesage: "success" });
  } catch (err) {
    console.error(" clearCart error:", err);
    return res.status(500).json({
      success: false,
      error: "CLEART_CART_ERROR",
      message: "Cleart cart error",
    });
  }
};
