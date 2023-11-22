import axios from "axios";

const elasticIp = process.env.REACT_APP_ELASTIC_IP;
const GetProductDetail = async (id) => {
    try {
        console.log("tttt");
        const response = await axios.get(
            `https://${elasticIp}/api/1.0/products/details`, {
            params: {
                id,
            },
        });
        
        console.log("check detail api: " +response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export default GetProductDetail;