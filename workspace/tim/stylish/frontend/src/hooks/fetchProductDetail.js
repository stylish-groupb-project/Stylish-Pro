import axios from "axios";

const elasticIp = process.env.REACT_APP_ELASTIC_IP;
const GetProductDetail = async (id) => {
    try {
        const response = await axios.get(
            `${elasticIp}/api/1.0/products/details`, {
            params: {
                id,
            },
        });
        
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export default GetProductDetail;