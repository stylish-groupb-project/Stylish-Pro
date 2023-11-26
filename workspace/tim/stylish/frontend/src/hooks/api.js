import axios from "axios";

const elasticIp = process.env.REACT_APP_ELASTIC_IP;

export async function fetchProducts(endpoint, keyword, pageParam) {
    const url = keyword
      ? `https://${elasticIp}/api/1.0/products/search`
      : `https://${elasticIp}/api/1.0/products/${endpoint}`;
  
    const params = keyword ? { keyword, paging: pageParam } : { paging: pageParam };
    const response = await axios.get(url, { params });
    return response.data;
}

export async function GetProductDetail (id)  {
    try {
        const response = await axios.get(
            `https://${elasticIp}/api/1.0/products/details`, {
            params: {
                id,
            },
        });
        
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};