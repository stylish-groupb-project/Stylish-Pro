# Week 2 - Part 1

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

* Build check out page for testing.
* Complete the check out API

## Today's Focus

It's time to build member system for our website.

### Build User Sign Up APIs

Refer to [Stylish UI](https://www.figma.com/file/sKhc4A0Gi427u1I5leT5ug/STYLiSH) and [API-Doc](../README.md), and build this API for front-end.

**Note:**

1. You should make sure that each email address can only be signed up once. You should not have two users with the same email address in your database.

2. You should insert **hashed password** to your database when users sign up a new account. Never store password in **plain text** in database for security concern.

3. If you have added any special rules for the account name, email or password, please make sure the account below can pass your rules for sign up. I will use it to test your functionality.

```
{
    "name": "stylishtest",
    "email": "stylishtest_<random generated 8 characters string>@test.com",
    "password": "1qaz@WSX"
}
```

### Build User Sign In APIs

Refer to [Stylish UI](https://www.figma.com/file/sKhc4A0Gi427u1I5leT5ug/STYLiSH) and [API-Doc](../README.md) to build this API for front-end.

#### Native Email/Password Authentication

In the end, you will build two method for user authentication; while we can only implement native email/password authentication mechanism just for now.

Every time user sign in successfully, you should update and response a [JSON Web Tokens](https://jwt.io/introduction) to front-end.

### Build User Profile APIs

Refer to [Stylish UI](https://www.figma.com/file/sKhc4A0Gi427u1I5leT5ug/STYLiSH) and [API-Doc](../README.md), build this API for front-end.  
We should parse the received JWT(JSON Web Token) to make sure it's an authorized request and get user information from the token without DB query.

### Prepare API Document for Current APIs

Use [swagger](https://swagger.io/docs/specification/about/) and [swagger-ui](https://www.npmjs.com/package/swagger-ui) to build the api-docs page of above APIs.  
Please note that you need to write down the proper config including, but not limited to `parameters`(with example), `requestBody`(with example) and `responses`.

## Advanced Optional

1. Try to obtain an SSL certificate from [SSL For Free](https://www.sslforfree.com/) and configure your server to be accessible via both HTTP and HTTPS. Alternatively, you can utilize [Let's encrypt](https://letsencrypt.org/zh-tw/docs/), which offers a simpler method to acquire the certificate. However, it does not support AWS-managed domain names, so you will need to purchase your own domain name first, typically costing NT$40 or more for the first year.
2. (You need to set up SSL first) Try to sign up by [Google Login](https://developers.google.com/identity/protocols/oauth2?hl=zh-tw).

## 💡 Recap
1. Encoding vs. Hashing vs. Encryption
2. What is JWT? What are its advantages and disadvantages?  
  a. Can others access the payload of a JWT?  
  b. Is it possible to maliciously modify a JWT's payload to achieve successful authentication?
3. What is SSL, and why is it essential?
4. What is OAuth2, and how does it work?
