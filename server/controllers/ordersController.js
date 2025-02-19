

export const getAllOrders = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Orders',
  });
}

export const getOrderById = (req, res) => {
  const { id } = req.param;
  res.status(200).json({
    success: true,
    message: `Order with ID: ${id}`,
  });
}

export const createOrder = (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Successfully created an order',
  });
}

export const updateOrderById = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Successfully updated an order',
  });
}

export const deleteOrderById = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Successfully created an order',
  });
}