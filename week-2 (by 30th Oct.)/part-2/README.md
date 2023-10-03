# Week 2 - Part 2

## Overview of What We Should Complete This Week

### Complete APIs for User

Refer to [Stylish UI](https://www.figma.com/file/sKhc4A0Gi427u1I5leT5ug/STYLiSH) and [API-Doc](../README.md), you should complete APIs listed below:

Based on your design of data schema, it's your job to create appropriate tables in MySQL server to support all the APIs.

* **User APIs.**
  * User Sign Up.
  * User Sign In.
  * User Profile API.

### Complete API for Order

From now on, you should start use [TapPay](https://www.tappaysdk.com/en/) as primary payment service for Stylish.
Based on your design of data schema, it's your job to create appropriate tables in MySQL server to support all the APIs.

* Build check out page for testing.
* Complete the check out API

## Today's Focus

### Build Check Out Page for Testing

Refer to [TapPay Document for Web](https://docs.tappaysdk.com/tutorial/zh/web/front.html#front).  
Refer to [Order Check Out API](../README.md#order-check-out-api).

Build a simple web page we can access through `http://[YOUR_PUBLIC_ELASTIC_IP]/admin/checkout.html` for testing.  

The whole payment flow in the front-end should be:

1. Load TapPay SDK
2. Initialize TapPay SDK.
3. Render card-number, expired, and ccv fields by TapPay SDK.
4. Get **prime** from TapPay server.
5. Send **prime** and other order information to **Order Check Out API** to complete payment.

You only need to build the front-end page and functionality in this part, and will build the backend API and finish the whole payment flow in the comming part.

**Hint:** You can derictly use the example code provided by TapPay.

#### Required Fields for TapPay Integration

|  Field  |                              Value                               |
| :-----: | :--------------------------------------------------------------: |
| App ID  |                              12348                               |
| App Key | app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF |

#### Get Prime from TapPay Server

Follow the [TapPay Document for Web](https://docs.tappaysdk.com/tutorial/zh/web/front.html#front) to get **prime** from TapPay server.

#### Test Credit Card for TapPay Testing

You should use test credit card listed below for testing. 

| Field | Value |
| :---: | :---: |
| Card Number | 4242 4242 4242 4242 |
| Expired Date | 04/24 |
| CCV | 242 |

### Build Order Check Out API

Refer to [TapPay Document for Backend](https://docs.tappaysdk.com/tutorial/en/back.html#pay-by-prime-api).  
Refer to [Order Check Out API](../README.md#order-check-out-api).

Follow steps below to complete check out procedure:

1. Receive **prime** and order data from front-end.
2. Create an unpaid order record and also the order deatails in the database.
3. Send **prime** and other necessary data to TapPay server for payment processing.
4. Receive payment result from TapPay server.
5. If payment is successful, create a payment record in the database and update existed unpaid order record to paid. Otherwise, send payment error message to front-end.

#### Required Fields for TapPay Integration

|    Field    |                              Value                               |
| :---------: | :--------------------------------------------------------------: |
| Partner Key | partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG |
| Merchant ID |                       AppWorksSchool_CTBC                        |

#### Authentication

The checkout API need to check the access token. Look at the different types of error status in API docs carefully.

#### Handle Order and Payment Data Carefully

Because check out feature is a very sensitive part in an e-commerce website, you should give special attention to order and payment records in the database.


## Advanced optional

### Authorization

To improve our security, we should not let anyone to access our admin page. We should give each user a `role` which can tell you its authority. In our website, we only need to set 2 `roles` which are `user` and `admin`. Set the `role` of your own account to be `admin` and set other accounts to be `user`.

When a user access the admin pages, there will be 3 situations.

1. User not sign in.
2. User already sign in but its role is not `admin`.
3. User already sign in and have `admin` role.

We should only allow the last one to access our 1 admin page.

* **/admin/checkout.html** for check out testing.

**Note:** We will have more admin pages in the comming front-end courses. You can also apply the authorization mechanism to those pages.

### More Challenge Way to Implement

There are three common authorization designs:

- ACL: Access Control List
- RBAC: Role-Based Access Control
- ABAC: Attribute-Based Access Control

Let's try to implement RBAC in your `stylish`.


## 💡 Recap
1. How to securely manage users' credit card information?
2. What is an SQL Transaction, and when should it be used?
3. What is the difference between Authentication and Authorization? What are some common permission design patterns (e.g., ACL, RBAC, ABAC, etc.)?
4. What is ORM? When do you choose one over the other?
