## Server API

### Get product info
  * GET `/api/products/:id`

**Path Parameters:**
  * `id` product id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "id": "Number",
      "name": "String",
      "themes": [ "Strings" ],
      "salesCategories": [ "Strings" ],
      "reviews" : {
        "reviewCount": "Number",
        "reviewScore": "Number"
      },
      "price": "Number",
      "availability": [
        {
          "storeName": "String",
          "address": {
            "Street": "String",
            "City": "String",
            "State": "String",
            "Zipcode": "Number",
            "latitude": "Number",
            "longitude": "Number",
          },
          "quantity": "Number",
          "restockInterval": "Number",
        }
      ],
      "wishlist": "Boolean",
      "orderQty" : "Number"
    }
```

### Add product
  * POST `/api/products`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.  

```json
    {
      "id": "Number",
      "name": "String",
      "themes": [ "Strings" ],
      "salesCategories": [ "Strings" ],
      "price": "Number",
      "availability": [
        {
          "storeId": "Number",
          "quantity": "Number",
          "restockInterval": "Number"
        }
      ]
    }
```

### Update product info
  * PATCH `/api/product/:id`

**Path Parameters:**
  * `id` product id

**Success Status Code:** `204`

**Request Body**: Expects JSON with at least one of the following keys (include only keys to be updated).

```json
    {
      "id": "Number",
      "name": "String",
      "themes": [ "Strings" ],
      "salesCategories": [ "Strings" ],
      "price": "Number",
      "availability": [
        {
          "storeId": "Number",
          "quantity": "Number",
          "restockInterval": "Number"
        }
      ]
    }
```

### Delete product
  * DELETE `/api/product/:id`

**Path Parameters:**
  * `id` product id

**Success Status Code:** `204`

### Add product to cart
  * POST `/api/products/:id/cart`
**Path Parameters:**

  * `id` product id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "id": "Number",
      "session": "String",
      "quantity": "Number",
    }
```

### Add product to wishlist
  * POST `/api/products/:id/wishlist`
**Path Parameters:**

  * `id` product id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "productId": "Number",
      "session": "String",
    }
```

### Check product availability
  * GET `/api/products/:id/geolocate`
**Path Parameters:**

  * `id` product id

**Success Stauts Code:** `200`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "productId": "Number",
      "radius": "Number (miles)",
      "latitude": "Number",
      "longitude": "Number"      
    }
```

**Returns:** JSON

```json 
{ "availability": [
        {
          "storeName": "String",
          "address": {
            "Street": "String",
            "City": "String",
            "State": "String",
            "Zipcode": "Number",
            "latitude": "Number",
            "longitude": "Number",
          },
          "quantity": "Number",
          "restockInterval": "Number",
        }
      ],
}
```
