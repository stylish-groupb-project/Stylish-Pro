
# STYLiSH-API-Doc

## API Version

1.0

### Response Object

* `User Object`

| Field | Type | Description |
| :---: | :---: | :--- |
| id | Number | User's id. |
| provider | String | Service provider. |
| name | String | User's name. |
| email | String | User's email. |
| picture | String | User's picture. |

---

### User Sign Up API

* **End Point:** `/user/signup`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Content-Type | String | Only accept `application/json`. |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| name | String | Required |
| email | String | Required |
| password | String | Required |

* **Request Body Example:**

```
{
  "name":"test",
  "email":"test@test.com",
  "password":"test"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| access_token | String | Access token from server. |
| access_expired | Number | Access token expired time in seconds. |
| user | `User Object` | User information |

* **Success Response Example:**

```
{
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6joiYXJ0aHVIjoxNjEzNTY3MzA0fQ.6EPCOfBGynidAfpVqlvbHGWHCJ5LZLtKvPaQ",
    "access_expired": 3600,
    "user": {
      "id": 11245642,
      "provider": "facebook",
      "name": "Pei",
      "email": "pei@appworks.tw",
      "picture": "https://schoolvoyage.ga/images/123498.png"
    }
  }
}
```

* **Email Already Exists: 409**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

---

### User Sign In API

* **End Point:** `/user/signin`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Content-Type | String | Only accept `application/json`. |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| provider | String | Only accept `native` or `facebook` |
| email | String | Required if provider set to `native` |
| password | String | Required if provider set to `native` |
| access_token | String | Access token from facebook. Required if provider set to `facebook` |

* **Request Body Example:**

```
{
  "provider":"native",
  "email":"test@test.com",
  "password":"test"
}
```
or
```
{
  "provider":"facebook",
  "access_token": "EAACEdEose0cBAHc6hv9kK8bMNs4XTrT0kVC1RgDZCVBptXW12AI"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| access_token | String | Access token from server. |
| access_expired | Number | Access token expired time in seconds. |
| user | `User Object` | User information |

* **Success Response Example:**

```
{
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6joiYXJ0aHVIjoxNjEzNTY3MzA0fQ.6EPCOfBGynidAfpVqlvbHGWHCJ5LZLtKvPaQ",
    "access_expired": 3600,
    "user": {
      "id": 11245642,
      "provider": "facebook",
      "name": "Pei",
      "email": "pei@appworks.tw",
      "picture": "https://schoolvoyage.ga/images/123498.png"
    }
  }
}
```

* **Sign In Failed: 403**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

---

### User Profile API

>Authorization

* **End Point:** `/user/profile`

* **Method:** `GET`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| data | `User Object` | User info. |

* **Success Response Example:**

```
{
  "data": {
    "provider": "facebook",
    "name": "Pei",
    "email": "pei@appworks.tw",
    "picture": "https://schoolvoyage.ga/images/123498.png"
  }
}
```

* **Client Error (No token) Response: 401**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Client Error (Wrong token) Response: 403**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

----

### Order Check Out API

* **End Point:** `/order/checkout`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Content-Type | String | Only accept `application/json`. |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S`. |

* **Request Body**

  Check Out Details.

* **Request Body Example:**

**Definition**
```
{
  "prime": [Prime Key from TapPay],
  "order": {
    "shipping": "delivery",
    "payment": "credit_card",
    "subtotal": [Price excluded Freight Fee],
    "freight": [Freight Fee],
    "total": [Final Price],
    "recipient": {
      "name": [Name],
      "phone": [Phone],
      "email": [Email],
      "address": [Post Address],
      "time": "morning"|"afternoon"|"anytime"
    },
    "list": [
      {
        "id": [Product ID],
        "name": [Product Name],
        "price": [Product Unit Price],
        "color": {
          "name": [Product Variant Color Name],
          "code": [Product Variant Color HexCode]
        },
        "size": [Product Variant Size],
        "qty": [Quantity]
      },
      ...
    ]
  }
}
```

**Example**
```
{
  "prime": "ccc1491581661f700bcc1cafec673c741f0665ca77550fe828ef38ee1437a2b8",
  "order": {
    "shipping": "delivery",
    "payment": "credit_card",
    "subtotal": 1234,
    "freight": 14,
    "total": 1300,
    "recipient": {
      "name": "Luke",
      "phone": "0987654321",
      "email": "luke@gmail.com",
      "address": "市政府站",
      "time": "morning"
    },
    "list": [
      {
        "id": "201807202157",
        "name": "活力花紋長筒牛仔褲",
        "price": 1299,
        "color": {
        	"code": "DDF0FF",
            "name": "淺藍"
        },
        "size": "M",
        "qty": 1
      }
    ]
  }
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| data | `Order Object` | Order number. |

* **Success Response Example:**

```
{
  "data": {
    "number":"4465123465"
  }
}
```

* **Client Error (No token) Response: 401**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Client Error (Wrong token) Response: 403**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |