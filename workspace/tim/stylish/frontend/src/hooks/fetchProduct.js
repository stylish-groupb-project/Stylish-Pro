import axios from "axios";

const elasticIp = process.env.REACT_APP_ELASTIC_IP;

const GetProductList = async (category = "all", page = "0") => {
  try {
    
    const response = await axios.get(
      `https://${elasticIp}/api/1.0/products/${category}`,
      {
        params: {
          paging: page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default GetProductList;