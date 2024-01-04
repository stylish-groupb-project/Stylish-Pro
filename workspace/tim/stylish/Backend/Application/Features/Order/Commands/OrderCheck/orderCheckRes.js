module.exports = {
  customize: async (result) => {
    const orderId = result.insertId;
    const response = {
      data: {
        number: orderId,
      },
    };
    return response;
  },
};
