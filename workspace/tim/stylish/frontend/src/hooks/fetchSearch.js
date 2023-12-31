import axios from "axios";

const elasticIp = process.env.REACT_APP_ELASTIC_IP || "localhost";

const GetProductSearch = async (keyword, page = "0") => {
  try {
    const response = await axios.get(
      `https://${elasticIp}/api/1.0/products/search`,
      {
        params: {
          keyword: keyword,
          paging: page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default GetProductSearch;
