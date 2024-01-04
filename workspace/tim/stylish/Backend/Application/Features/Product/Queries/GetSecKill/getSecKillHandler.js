const productService = require("../../../../../Service/productService");
module.exports = {
  handle: async (res) => {
    result = await productService.getSecKill(res);
    return result;
  },
};
