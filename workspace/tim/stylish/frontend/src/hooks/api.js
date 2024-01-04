import axios from "axios";

const elasticIp = process.env.REACT_APP_ELASTIC_IP || "localhost";

export async function fetchProducts(endpoint, keyword, pageParam) {
  const url = keyword
    ? `https://${elasticIp}/api/1.0/products/search`
    : `https://${elasticIp}/api/1.0/products/${endpoint}`;

  const params = keyword
    ? { keyword, paging: pageParam }
    : { paging: pageParam };
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
export async function GetOrderList ()  {
    try {
        const response = await axios.get(
            `https://${elasticIp}/api/1.0/monitor`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export async function getBotMessage(type) {
  try {
    const response = await axios.get(`https://${elasticIp}/api/1.0/chatBot`, {
      params: {
        MsgType: type,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
