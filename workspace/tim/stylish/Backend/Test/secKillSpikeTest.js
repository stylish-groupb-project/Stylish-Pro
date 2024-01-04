import http from "k6/http";
import { check } from "k6";

const totalUsers = 5000;
const apiUrl = `https://localhost/api/1.0/order/checkout`;

export const options = {
  stages: [{ duration: "1s", target: totalUsers }],
};

export default function () {
  const userId = __VU;

  if (userId <= totalUsers) {
    const requestBody = {
      prime: "test",
      order: {
        userId: userId,
        shipping: "delivery",
        payment: "credit_card",
        subtotal: 100,
        freight: 10,
        total: 110,
        recipient: {
          name: "Test",
          phone: "0912345678",
          email: "test@email.com",
          address: "123 Main St",
          time: "08:00-12:00",
        },
        list: [
          {
            id: 99,
            name: "日系暖男上衣",
            price: "90.00",
            color: {
              code: "000000",
              name: "Black",
            },
            size: "S",
            qty: 1,
          },
        ],
      },
      isSeckill: true,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer access token", // your user id access token
    };

    const response = http.post(apiUrl, JSON.stringify(requestBody), {
      headers: headers,
    });

    check(response, {
      "Status is 200": (r) => r.status === 200,
    });
  }
}
