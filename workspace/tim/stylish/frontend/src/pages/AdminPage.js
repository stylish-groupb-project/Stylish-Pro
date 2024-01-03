import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Cookies from "js-cookie";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  padding-top: 6.375rem;
  flex-grow: 1;

  @media (min-width: 1024px) {
    padding-top: 8.875rem;
  }
`;

const OrderContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 0;
`;

const OrderItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

const OrderDetail = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25rem 0;

  p {
    margin: 0.625rem 0;
  }
`;

const Button = styled.button`
  width: 10rem;
  height: 3rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #f9a109;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const AdminPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [updateOrder, setUpdateOrder] = useState(false);

  const handleChangeShippingStatus = async (orderId, shippingStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/1.0/order/manage/${orderId}`,
        {
          shipping_status: shippingStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data.data);
      setUpdateOrder(!updateOrder);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    const fetchOrderList = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/1.0/order/manage",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data.data);
      setOrderList(res.data.data.orderData);
    };
    fetchOrderList();
  }, [updateOrder]);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <OrderContainer>
          {orderList.length > 0 ? (
            orderList.map((order) => (
              <OrderItem key={order.id}>
                <OrderDetail>
                  <p>{"Order ID: " + order.id}</p>
                  <p>{"User ID: " + order.user_id}</p>
                  <p>
                    {"Payment status: " + order.isPaid ? "Paid" : "Not Paid"}
                  </p>
                  <p>{"Delivery status: " + order.shipping_status}</p>
                </OrderDetail>
                <Button
                  onClick={() =>
                    handleChangeShippingStatus(
                      order.id,
                      order.shipping_status === "Processing"
                        ? "Shipping"
                        : order.shipping_status === "Shipping"
                        ? "Delivered"
                        : "Processing"
                    )
                  }
                  // disabled={order.shipping_status === "Delivered"}
                  style = {{backgroundColor: order.shipping_status === "Delivered" ? "#e0e0e0" : "#f9a109"}}
                >
                  {order.shipping_status === "Processing" ? "Ship" : order.shipping_status === "Shipping" ? "Delivery" : "Delivered"}
                </Button>
              </OrderItem>
            ))
          ) : (
            <OrderItem>
              <p>No order</p>
            </OrderItem>
          )}
        </OrderContainer>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default AdminPage;
