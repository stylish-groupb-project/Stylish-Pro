# STYLiSH-API-Doc

## API Version

1.0

### Response Object

* `Product Object`

| Field | Type | Description |
| :---: | :---: | :--- |
| id | Number | Product id. |
| category | String | Product category |
| title | String | Product title. |
| description | String | Product description. |
| price | Number | Product price. |
| texture | String | Product texture. |
| wash | String | The way we can wash the product. |
| place | String | Place of production. |
| note | String | The note of product. |
| story | String | Product multiline story. |
| colors | Array of `Color Object` | Possible color choices. |
| sizes | Array of String | Possible size choices. |
| variants | Array of `Variant Object` | Possible variants, including stock records. |
| main_image | String | Main image. |
| images | Array of String | Other images. |

* `Color Object`

| Field | Type | Description |
| :---: | :---: | :--- |
| name | String |  Color's name. |
| code | String | Color's hex code. |

* `Variant Object`

| Field | Type | Description |
| :---: | :---: | :--- |
| color_code | String | Hex Color Code. |
| size | String | Size. |
| stock | Number | Stock. |

* `User Object`

| Field | Type | Description |
| :---: | :---: | :--- |
| id | Number | User's id. |
| provider | String | Service provider. |
| name | String | User's name. |
| email | String | User's email. |
| picture | String | User's picture. |

### Product List API

* **End Point:**

  `/products/all` for 全部  
  `/products/women` for 女裝  
  `/products/men` for 男裝  
  `/products/accessories` for 配件  

* **Method:** `GET`

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| paging (Optional) | String | Paging for request next page. |

* **Request Example:**

  `https://[HOST_NAME]/api/[API_VERSION]/products/women`  
  `https://[HOST_NAME]/api/[API_VERSION]/products/men?paging=1`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| data | Array | Array of `Product Object`. |
| next_paging (Optional) | Number | Next page number. If there are no more pages, server won't return next_paging parameter. |

* **Success Response Example:**

```
{
  "data": [
    {
      "id": 1234,
      "category": "men",
      "title": "厚實毛呢格子外套",
      "description": "高抗寒素材選用，保暖也時尚有型",
      "price": 2200,
      "texture": "棉、聚脂纖維",
      "wash": "手洗（水溫40度",
      "place": "韓國",
      "note": "實品顏色以單品照為主",
      "story": "你絕對不能錯過的超值商品",
      "colors": [
        {
          "code":"334455",
          "name":"深藍"
        },
        {
          "code":"FFFFFF",
          "name":"白色"
        }
      ],
      "sizes": ["S", "M"],
      "variants":[
        {
          "color_code":"334455",
          "size":"S",
          "stock":5
        },
        {
          "color_code":"334455",
          "size":"M",
          "stock":10
        },
        {
          "color_code":"FFFFFF",
          "size":"S",
          "stock":0
        },
        {
          "color_code":"FFFFFF",
          "size":"M",
          "stock":2
        }
      ],
      "main_image":"https://stylish.com/main.jpg",
      "images": [
        "https://stylish.com/0.jpg",
        "https://stylish.com/1.jpg",
        "https://stylish.com/2.jpg"
      ]
    },
    {
      "id": 5678,
      "category": "men",
      "title": "厚實毛呢格子外套",
      "description": "高抗寒素材選用，保暖也時尚有型",
      "price": 2200,
      "texture": "棉、聚脂纖維",
      "wash": "手洗（水溫40度",
      "place": "韓國",
      "note": "實品顏色以單品照為主",
      "story": "你絕對不能錯過的超值商品",
      "colors": [
        {
          "code":"334455",
          "name":"深藍"
        }
      ],
      "sizes": ["S", "M", "L"],
      "variants":[
        {
          "color_code":"334455",
          "size":"S",
          "stock":5
        },
        {
          "color_code":"334455",
          "size":"M",
          "stock":10
        },
        {
          "color_code":"334455",
          "size":"L",
          "stock":0
        }
      ],
      "main_image":"https://stylish.com/main.jpg",
      "images": [
        "https://stylish.com/0.jpg",
        "https://stylish.com/1.jpg",
        "https://stylish.com/2.jpg"
      ]
    }
  ],
  "next_paging":1
}
```

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

----

### Product Search API

* **End Point:** `/products/search`

* **Method:** `GET`

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| keyword | String | Required |
| paging (Optional) | String | Paging for request next page. |


* **Request Example:**

  `https://[HOST_NAME]/api/[API_VERSION]/products/search?keyword=洋裝`
  `https://[HOST_NAME]/api/[API_VERSION]/products/search?keyword=洋裝&paging=1`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| data | Array | Array of `Product Object`. |
| next_paging (Optional) | Number | Next page number. If there are no more pages, server won't return next_paging parameter. |

* **Success Response Example:**

```
{
  "data": [
    {
      "id": 201807201824,
      "category": "women",
      "title": "前開衩扭結洋裝",
      "description": "厚薄：薄\r\n彈性：無",
      "price": 799,
      "texture": "棉 100%",
      "wash": "手洗，溫水",
      "place": "中國",
      "note": "實品顏色依單品照為主",
      "story": "O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.",
      "main_image": "https://stylish.com/assets/201807201824/main.jpg",
      "images": [
        "https://stylish.com/assets/201807201824/0.jpg",
        "https://stylish.com/assets/201807201824/1.jpg",
        "https://stylish.com/assets/201807201824/0.jpg",
        "https://stylish.com/assets/201807201824/1.jpg"
      ],
      "variants": [
        {
          "color_code": "FFFFFF",
          "size": "S",
          "stock": 2
        },
        {
          "color_code": "FFFFFF",
          "size": "M",
          "stock": 1
        },
        {
          "color_code": "FFFFFF",
          "size": "L",
          "stock": 2
        }
      ],
      "colors": [
        {
          "code": "FFFFFF",
          "name": "白色"
        }
      ],
      "sizes": [
        "S",
        "M",
        "L"
      ]
    },
    {
      "id": 201902191210,
      "category": "women",
      "title": "精緻扭結洋裝",
      "description": "厚薄：薄\r\n彈性：無",
      "price": 999,
      "texture": "棉 100%",
      "wash": "手洗",
      "place": "越南",
      "note": "實品顏色依單品照為主",
      "story": "O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.",
      "main_image": "https://stylish.com/assets/201902191210/main.jpg",
      "images": [
        "https://stylish.com/assets/201902191210/0.jpg",
        "https://stylish.com/assets/201902191210/1.jpg",
        "https://stylish.com/assets/201902191210/0.jpg",
        "https://stylish.com/assets/201902191210/1.jpg"
      ],
      "variants": [
        {
          "color_code": "FFFFFF",
          "size": "S",
          "stock": 0
        },
        {
          "color_code": "FFDDDD",
          "size": "M",
          "stock": 1
        }
      ],
      "colors": [
        {
          "code": "FFFFFF",
          "name": "白色"
        },
        {
          "code": "FFDDDD",
          "name": "粉紅"
        }
      ],
      "sizes": [
        "S",
        "M"
      ]
    }
  ]
}
```

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

----

### Product Details API

* **End Point:** `/products/details`

* **Method:** `GET`

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| id | Number | Product Id. Required |

* **Request Example:**

  `https://[HOST_NAME]/api/[API_VERSION]/products/details?id=2`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| data | `Product Object` | Single Product Information. |

* **Success Response Example:**

```
{
  "data": {
    "id": 1234,
    "category": "men",
    "title": "厚實毛呢格子外套",
    "description": "高抗寒素材選用，保暖也時尚有型",
    "price": 2200,
    "texture": "棉、聚脂纖維",
    "wash": "手洗（水溫40度",
    "place": "韓國",
    "note": "實品顏色以單品照為主",
    "story": "你絕對不能錯過的超值商品",
    "colors": [
      {
        "code":"334455",
        "name":"深藍"
      }
    ],
    "sizes": ["S", "M", "L"],
    "variants":[
      {
        "color_code":"334455",
        "size":"S",
        "stock":5
      },
      {
        "color_code":"334455",
        "size":"M",
        "stock":10
      },
      {
        "color_code":"334455",
        "size":"L",
        "stock":0
      }
    ],
    "main_image":"https://stylish.com/main.jpg",
    "images": [
      "https://stylish.com/0.jpg",
      "https://stylish.com/1.jpg",
      "https://stylish.com/2.jpg"
    ]
  }
}
```

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |
