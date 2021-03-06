# Backend Group 2
> this is document description for backend system

> You can replace http://localhost:8080 to https://tlcngroup2be.herokuapp.com

=======================================================================================

##  ==================>> Guest API <<========================= 

### Sign up
link: http://localhost:8080/signup

> POST
#### Request
```
{
    "name":"khang",
    "dateofbirth":"06-06-2000",
    "email":"abc",
    "address":"123, dadd",
    "gender":"male",
    "username":"khang",
    "password":"123"
}
```

#### Response
##### Success
status: 201
```
{
    "id": 8,
    "name": "khang",
    "dateofbirth": "06-06-2000",
    "email": "abc",
    "address": "123, dadd",
    "gender": "abc",
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZyIsImV4cCI6MTYzNDE1MTEzNiwiaWF0IjoxNjM0MTE1MTM2fQ.gGX83-8F4shYs5JvPhG0jxLDY3Ol4YvBeK7RCBoCT1M",
    "role": "ROLE_USER"
}
```

##### Failure: 400
```
{
"errName": "Username is existed" 
}
```

### Login
link: http://localhost:8080/login
> POST

#### Request
```
{
    "username":"khang",
    "password":"123"
}
```

#### Response
##### Success
status: 200
```
{
    "id": 2,
    "name": "khang",
    "dateofbirth": "06-06-2000",
    "email": "abc",
    "address": "123, dadd",
    "gender": "abc",
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlciIsImV4cCI6MTYzNDE1MDk3MiwiaWF0IjoxNjM0MTE0OTcyfQ.RRt7EZLMQfOCKvf8TBDs1P3WYw5R8eXZegs8KJP4dzg",
    "role": "ROLE_USER"
}
```

##### Failure: 
```
{
"errName": "Username or password incorrect"
}
```

#### Get category accessories in a product
link: https://tlcngroup2be.herokuapp.com/product/categoryaccessories/59

> GET

> 59 is product id

> Note: this is API for all users so you **don't need** jwt or this.
#### Request

#### Response
```
{
    "id": 60,
    "type": "binh-nuoc",
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "brand": "addidas",
    "origin": "Việt Nam",
    "material": "nhựa",
    "productId": 59
}
```

### Get category clothes in a product
link: https://tlcngroup2be.herokuapp.com/product/categoryclothes/55

> GET

> NOTE: 55 is product id

> Note: this is API for all users so you **don't need** jwt or this.
#### Request

#### Response
```
{
    "id": 56,
    "type": "ao-clb",
    "brand": "adidas",
    "origin": "vietnam",
    "size": [
        "S",
        "M",
        "L",
        "XL",
        "2XL"
    ],
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "material": "cotton",
    "gender": "nam",
    "productId": 55
}
```

### Get category shoes in a product
link: https://tlcngroup2be.herokuapp.com/product/categoryshoes/57

> GET

> 57 is a product id

> Note: this is API for all users so you **don't need** jwt or this.

#### Request

#### Response
```
{
    "id": 58,
    "style": "da-bong",
    "size": [
        "7",
        "7.5",
        "8",
        "8.5",
        "9",
        "9.5"
    ],
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "height": 15.0,
    "weight": 6.0,
    "material": "vải",
    "sole": "nhựa",
    "origin": "Việt Nam",
    "warranty": 12.0,
    "gender": "female",
    "productId": 57
}
```

### Get products by category
> link: https://tlcngroup2be.herokuapp.com/product/category/1

> 1 is category

> You have 3 category:

> 1: category clothes

> 2: category shoes

> 3: category accessories

#### Request

#### Response
```
[
    {
        "id": 50,
        "storeId": 48,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=11BP5Id17EwYgDbKSV_J1GGmRQv8wYjGp&export=download"
    },
    {
        "id": 51,
        "storeId": 48,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=1fNDhrpJMjT2EuexO7hXUJPRkCRTu4tg5&export=download"
    },
    {
        "id": 53,
        "storeId": 48,
        "category": 1,
        "name": "congtestupdate",
        "quantity": 1000,
        "price": 50000.0,
        "description": "congtest update 1",
        "image": "https://drive.google.com/uc?id=17_UgATKxyEyqylx8Qs8l6V9QI7Gvph75&export=download"
    },
    {
        "id": 55,
        "storeId": 48,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=1K6I259dYXOJv3ay8gIfmhxfCZ6Ed-C17&export=download"
    },
    {
        "id": 57,
        "storeId": 48,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=1157pUkRa_tPvZvBmM-_XPWJeBTVl1LYB&export=download"
    },
    {
        "id": 59,
        "storeId": 48,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=12XdB5zIcjd5jCobmQx1MpEQDK1kDoOMm&export=download"
    },
    {
        "id": 61,
        "storeId": 48,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=1at3PYQKHG6RJq7n-3KpBIG--BCEECXTo&export=download"
    },
    {
        "id": 63,
        "storeId": 48,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=1Cs1aTPHSYHTs6JVfHu78kK3nChm-nUlz&export=download"
    },
    {
        "id": 65,
        "storeId": 48,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=1H05kGmusFT0EY45b3ZQGcg2bSPt65GLz&export=download"
    }
]
```

### Get category clothes by type
link: https://tlcngroup2be.herokuapp.com/product/category/clothes/ao

> GET

> ao is type of clothes

#### Request

#### Response
```
[
    {
        "id": 77,
        "type": "ao",
        "brand": "adidas",
        "origin": "uk",
        "size": [
            "S",
            "M",
            "L"
        ],
        "color": [
            "Đỏ",
            "Vàng",
            "Lục"
        ],
        "material": "cotton",
        "gender": "male",
        "productId": 0
    },
    {
        "id": 79,
        "type": "ao",
        "brand": "adidas",
        "origin": "usuk",
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "color": [
            "Đỏ",
            "Vàng",
            "Cam"
        ],
        "material": "cotton",
        "gender": "male",
        "productId": 76
    }
]
```

### Get style of shoes 
link: https://tlcngroup2be.herokuapp.com/product/category/shoes/da-bong

> GET

> da-bong is a style of shoes

#### Request

#### Response
```
[
    {
        "id": 72,
        "style": "da-bong",
        "size": [
            7.0,
            7.5,
            8.0,
            8.5,
            9.0,
            9.5
        ],
        "color": [
            "đỏ",
            "cam",
            "vàng",
            "lục",
            "lam"
        ],
        "height": 15.0,
        "weight": 6.0,
        "material": "vải",
        "sole": "nhựa",
        "origin": "Việt Nam",
        "warranty": 12.0,
        "gender": "female",
        "productId": 70
    }
]
```

### Get type of accessories
link: https://tlcngroup2be.herokuapp.com/product/category/accessories/binh-nuoc

> GET

> binh-nuoc is one of accessories type

#### Request

#### Response
```
[
    {
        "id": 60,
        "type": "binh-nuoc",
        "color": [
            "đỏ",
            "cam",
            "vàng",
            "lục",
            "lam"
        ],
        "brand": "addidas",
        "origin": "Việt Nam",
        "material": "nhựa",
        "productId": 59
    },
    {
        "id": 69,
        "type": "binh-nuoc",
        "color": [
            "đỏ",
            "cam",
            "vàng",
            "lục",
            "lam"
        ],
        "brand": "addidas",
        "origin": "Việt Nam",
        "material": "nhựa",
        "productId": 65
    }
]
```

### Get product by product id
link: https://tlcngroup2be.herokuapp.com/product/1

> GET

> 1 is product id

#### Request

#### Response
```
{
    "id": 42,
    "storeId": 31,
    "category": 1,
    "name": "this is a product to test",
    "quantity": 10,
    "price": 350000.0,
    "description": "this is description",
    "image": "https://drive.google.com/uc?id=1nk8HYop7JIM0gopy_pjwLV2Dee_dKboq&export=download"
}
```

### Get comment by product id
link: https://tlcngroup2be.herokuapp.com/product/comment/1

> GET

#### Request

#### Response
```
[
    {
        "id": 46,
        "productId": 1,
        "username": "khang",
        "comment": "good product",
        "star": 3,
        "date": "01-11-2021"
    }
]
```

### Get all product names
> link: https://tlcngroup2be.herokuapp.com/product/productnames

> GET

#### Request

#### Response
```
[
    "Áo thể thao",
    "áo dài tay",
    "áo hoodie",
    "Quần ngủ",
    "Giày thể thao",
    "Giày thể thao 2",
    "Áo nike chất lượng caoo",
    "Giày dép chất lượng cao",
    "Bình nước chất lượng cao",
    "áo nike",
    "Băng cổ tay",
    "Ao",
    "Quan",
    "bình nước abccc",
    "asdasdasdasd"
]
```

### Get suggestion for product
link: https://tlcngroup2be.herokuapp.com/product/suggestions/name/Áo thể thao

> GET

#### Request

#### Response
```
[
    {
        "storeId": 4,
        "storeName": "Bán quần áo",
        "image": "https://drive.google.com/uc?id=1ChgK_Bgl8LFIobNGMYUprwfTyIBQNs4n&export=download",
        "productId": 5,
        "name": "Áo thể thao",
        "price": 100000.0
    }
]
```

### Guest login 
> link: https://tlcngroup2be.herokuapp.com/signup/guestsignup

> POST

#### Request
```
{
    "name":"khang",
    "phone":"0919910213",
    "address":"asdasdasd"
}
```

#### Response
```
{
    "id": 169,
    "name": "khang",
    "dateofbirth": "03-04-2022",
    "email": "laptrinhweb77@gmail.com",
    "address": "asdasdasd",
    "gender": "male",
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3WiQ2dFRPanIiLCJleHAiOjE2NTAxNTk3MTMsImlhdCI6MTY1MDA3MzMxM30.Z5hCz6ib6ag9acoAKLSR2ENl_oQXy6It3D7_L6HJvZo",
    "role": "ROLE_USER",
    "phone": "0919910213"
}
```

### Forgot password
> link: https://tlcngroup2be.herokuapp.com/forgotpassword

> POST 

### Request
```
{
    "username":"khanguser11"
}
```

### Response
```
{
    "mess": "Reset password successfully"
}
```

## Recommendation
link: https://tlcngroup2be.herokuapp.com/product/category/2/type/chay-bo

> GET

> 2 is category
 
> chay-bo is type
 
### Request

### Response
```
[
    {
        "id": 58,
        "storeId": 4,
        "category": 2,
        "name": "Giày thể thao",
        "quantity": 200,
        "price": 799000.0,
        "description": "Giày thể thao, mang nhẹ êm chân",
        "image": "https://drive.google.com/uc?id=1CyibR9tTAtNov3vQJWfhM9oX8joqvp1c&export=download",
        "discount": 0.0,
        "nameStore": "",
        "isDiscount": false
    },
    {
        "id": 60,
        "storeId": 4,
        "category": 2,
        "name": "Giày thể thao 2",
        "quantity": 80,
        "price": 879000.0,
        "description": "Giày thể thao nhẹ, chạy nhanh",
        "image": "https://drive.google.com/uc?id=1oN9Z5c_jUyvumOiEBNQcu3hnnijNqaWf&export=download",
        "discount": 0.0,
        "nameStore": "",
        "isDiscount": false
    },
    {
        "id": 72,
        "storeId": 71,
        "category": 2,
        "name": "Giày dép chất lượng cao",
        "quantity": 250,
        "price": 100000.0,
        "description": "Giày dép chất lượng cao",
        "image": "https://drive.google.com/uc?id=1xmoT23Q5TEHGr_-sN3yzWU6AstGsVBmw&export=download",
        "discount": 0.0,
        "nameStore": "",
        "isDiscount": false
    }
]
```

##  ===============>> User API <<====================

### Get active voucher by store Id
link: https://tlcngroup2be.herokuapp.com/voucher/storeid/1

#### Request

#### Response
```
[
    {
        "voucherId": 206,
        "storeId": 1,
        "voucherName": "dadasdad",
        "voucherDesc": "dasdasdasd",
        "discount": 100000.0,
        "bearerDiscount": 500000.0,
        "startDate": 1652517759765,
        "expireDate": 1652517759765,
        "active": true
    }
]
```

### Add item
link: https://utesharecode.herokuapp.com/item

> POST

#### Request
```
{
    "idUser": 157,
    "idProduct": 5,
	"storeId":1,
	"storeName":"abc",
    "image": "https://drive.google.com/uc?id=1xI9t6IZ24dummKkbqSZUnMv211pGKB2i&export=download",
    "name": "Áo thể thao",
    "description": "size x, màu xanh",
    "price": 100000.0,
    "amount": 1
}
```

#### Response
```
{
    "idUser": 157,
    "idProduct": 5,
	"storeId":1,
	"storeName":"abc"
    "image": "https://drive.google.com/uc?id=1xI9t6IZ24dummKkbqSZUnMv211pGKB2i&export=download",
    "name": "Áo thể thao",
    "description": "size x, màu xanh",
    "price": 100000,
    "amount": 1,
    "_id": "624af5b021a4f32323557035",
    "shareCode": "oFRdBAEL",
    "id": 8,
    "__v": 0
}
```

### Update amount item
link: https://cnpmmbe.herokuapp.com/item/4

> 4 is id of item

> PUT

#### Request
```
{
    "amount": 3
}
```

#### Response
```
{
    "_id": "624af0928734d3105ce7a19e",
    "idUser": 157,
    "idProduct": 5,
    "image": "https://drive.google.com/uc?id=1xI9t6IZ24dummKkbqSZUnMv211pGKB2i&export=download",
    "name": "Áo thể thao",
    "description": "size x, màu xanh",
    "price": 100000,
    "amount": 3,
    "shareCode": "2UNExdmX",
    "id": 4,
    "__v": 0
}
```

### Delete item
link: https://cnpmmbe.herokuapp.com/item/8

> 8 is item id

> DELETE

#### Request

#### Response
```
{
    "mess": "Delete item successfully"
}
```

### Get item
link: https://cnpmmbe.herokuapp.com/item/iduser/157

> 157 is id user

> GET

#### Request

#### Response
```
{
    "mess": "Chưa có sản phẩm trong giỏ hàng"
}
```
or
```
[
	{
		"idUser": 157,
		"idProduct": 5,
		"image": "https://drive.google.com/uc?id=1xI9t6IZ24dummKkbqSZUnMv211pGKB2i&export=download",
		"name": "Áo thể thao",
		"description": "size x, màu xanh",
		"price": 100000,
		"amount": 1,
		"_id": "624aff956cc2ec7255d05261",
		"shareCode": "fWQKJFO4",
		"id": 9,
		"__v": 0
	}
]
```

### Update share code
link: https://cnpmmbe.herokuapp.com/item/iduser/158/sharecode/2UNExdmX

> 158 is id user

> 2UNExdmX is share code

#### Request

#### Response
```
{
    "mess": "Update share code successfully"
}
```

### Delete all items
link: https://cnpmmbe.herokuapp.com/items/sharecode/2UNExdmX

> 2UNExdmX is share code

> Delete

#### Request

#### Response
```
{
    "mess": "Delete items successfully"
}
```


### Update user without password
link: https://tlcngroup2be.herokuapp.com/user/1

> Note: 1 is user id

> Note: You have to login with user account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "name":"khangupdate",
    "dateofbirth":"06-06-2000",
    "email":"abc",
    "address":"123, dadd",
    "gender":"male"
}
```

#### Response
```
{
    "id": 1,
    "name": "khangupdate",
    "dateofbirth": "06-06-2000",
    "email": "abc",
    "address": "123, dadd",
    "gender": "abc",
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlcjIiLCJleHAiOjE2MzQxNTAwNTQsImlhdCI6MTYzNDExNDA1NH0.LrKc3wzESxtuCSKO40m018LPvIj2LW-oBQHJb3YLHPs",
    "role": "ROLE_SELLER"
}
```

### Update user with password
link: https://tlcngroup2be.herokuapp.com/user/password/47

> Note: 47 is user id

> Note: You have to login with user account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "password":"1234"
}
```

#### Response
```
{
    "id": 47,
    "name": "khang",
    "dateofbirth": "06-06-2000",
    "email": "abc",
    "address": "123, dadd",
    "gender": "abc",
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlcjA0IiwiZXhwIjoxNjM0NjMzMDIzLCJpYXQiOjE2MzQ1NDY2MjN9.9DQ5RtTmpDBPLlPG7JlWUcYzYZAWOIrVmFa7jhQacQU",
    "role": "ROLE_SELLER"
}
```

### Order 
link: https://tlcngroup2be.herokuapp.com/user/order

> POST

> Note: You have to login with user account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "userId": 14,
    "total":350000,
    "listProducts":[1,2,3,4],
    "listQuantities":[1,1,1,1],
    "listDescription":["đỏ, cam","xanh, vàng","hồng","tím"]
}
```

#### Response
Status: 201

### Get order history by userId
link: http://localhost:8080/user/orderhistory/14

> GET

> Note: 14 is user id

> Note: You have to login with user account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request

#### Response
```
[
    {
        "id": 22,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 23,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 24,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 25,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 26,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 27,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 28,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 29,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 30,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 31,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 32,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 33,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 34,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 35,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 36,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 37,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    },
    {
        "id": 38,
        "userId": 14,
        "orderDate": "31-10-2021",
        "total": 350000.0,
        "orderStatus": "Ð?t hàng thành công",
        "paymentStatus": "chua thanh toán"
    }
]
```

### Get order detail history by orderId
link: https://tlcngroup2be.herokuapp.com/user/orderdetailhistory/38

> GET

> 38 is order id

> Note: You have to login with user account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> One order have many product

#### Request

#### Response
```
[
    {
        "id": 39,
        "orderId": 38,
        "productId": 1,
        "quantity": 1,
        "description": "d?, cam",
        "date": "31-10-2021"
    },
    {
        "id": 40,
        "orderId": 38,
        "productId": 2,
        "quantity": 1,
        "description": "xanh, vàng",
        "date": "31-10-2021"
    },
    {
        "id": 41,
        "orderId": 38,
        "productId": 3,
        "quantity": 1,
        "description": "h?ng",
        "date": "31-10-2021"
    },
    {
        "id": 42,
        "orderId": 38,
        "productId": 4,
        "quantity": 1,
        "description": "tím",
        "date": "31-10-2021"
    }
]
```

### Comment 
link: https://tlcngroup2be.herokuapp.com/user/comment

> POST

> Note: You have to login with user account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "productId": 1,
    "username": "khang",
    "comment": "good product",
    "star":3
}
```

#### Response
Status: 201




##  ===============>> Seller API <<====================

### Sign up
> This API for sign up seller

> POST

link: http://localhost:8080/seller/signup

#### Request
```
{
    "name":"khang",
    "dateofbirth":"06-06-2000",
    "email":"abc",
    "address":"123, dadd",
    "gender":"male",
    "username":"khangseller2",
    "password":"123"
}
```

#### Response
Status: 201
```
{
    "id": 6,
    "name": "khang",
    "dateofbirth": "06-06-2000",
    "email": "abc",
    "address": "123, dadd",
    "gender": "abc",
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ3NlbGxlcjIiLCJleHAiOjE2MzQxNTAwNTQsImlhdCI6MTYzNDExNDA1NH0.LrKc3wzESxtuCSKO40m018LPvIj2LW-oBQHJb3YLHPs",
    "role": "ROLE_SELLER"
}
```

### Create Store
link: http://localhost:8080/seller/store

> POST

> This API use to create a store

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> Having a form to do this
#### Request
```
    file,
    userId,
    nameStore,
    storeDescription
```

#### Response
Status: 201
```
{
    "id": 7,
    "userId": 2,
    "nameStore": "test3",
    "storeDescription": "this is a first test",
    "image": "https://drive.google.com/uc?id=1hrmUVHMMui6T4sMBax0jQJS32Nrfe2D8&export=download"
}
```

### View Store 
link: http://localhost:8080/seller/store/userid/2

> GET

> Note: 2 is userId (seller id)

> This API use to view all store of seller

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request

#### Response
Status: 200
```
[
    {
        "id": 3,
        "userId": 2,
        "nameStore": "test",
        "storeDescription": "this is a first step",
        "image": "https://drive.google.com/uc?id=16nV_4PANpiHhuTFyb7r68yML8cLfFEpL&export=download"
    },
    {
        "id": 4,
        "userId": 2,
        "nameStore": "\"test\"",
        "storeDescription": "\"this is a first test\"",
        "image": "https://drive.google.com/uc?id=1bGgdGcKFEq83HnM92e4h7q1pbXIApDyl&export=download"
    },
    {
        "id": 5,
        "userId": 2,
        "nameStore": "test2",
        "storeDescription": "this is a first test",
        "image": "https://drive.google.com/uc?id=1tNRs3EUhEW6J2dYLSgnGT38_pwGaa9Pk&export=download"
    }
]
```

### Delete store
link: http://localhost:8080/seller/store/3

> DELETE

> Note: 3 is store id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request

#### Response
Status: 200

### Update Store without image
link: http://localhost:8080/seller/store/4

> PUT

> Note: 4 this store id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt


#### Request
```
{
    "userId":2,
    "nameStore":"change name store",
    "storeDescription":"change store storeDescription"
}
```


#### Response
Status: 200
```
{
    "id": 4,
    "userId": 2,
    "nameStore": "change name store",
    "storeDescription": "change store storeDescription",
    "image": "https://drive.google.com/uc?id=1bGgdGcKFEq83HnM92e4h7q1pbXIApDyl&export=download"
}
```


### Update Store with image
link: http://localhost:8080/seller/store/image/4

> PUT

> Note: 4 this store id

> Having a form to do this

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
    file
```

#### Response
```
{
    "id": 4,
    "userId": 2,
    "nameStore": "change name store",
    "storeDescription": "change store storeDescription",
    "image": "https://drive.google.com/uc?id=1r3j1aupVzkhHTvRC4RNp9PBGOvrtbO_N&export=download"
}
```

### Create product 
link: https://tlcngroup2be.herokuapp.com/seller/product

> POST

> Having a form to do this

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

>Note: Category has 3 type:

> 1: Category clothes

> 2: Category shoes

> 3: Category accessories
#### Request
```
    storeid,
    category,
    name,
    quantity,
    price,
    description,
    file
```
#### Response
```
{
    "id": 42,
    "storeId": 31,
    "category": 1,
    "name": "this is a product to test",
    "quantity": 10,
    "price": 350000.0,
    "description": "this is description",
    "image": "https://drive.google.com/uc?id=1nk8HYop7JIM0gopy_pjwLV2Dee_dKboq&export=download"
}
```

### Get product by productId
link: https://tlcngroup2be.herokuapp.com/seller/product/42

> GET

> Note: 42 is product id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request

#### Response
```
{
    "id": 42,
    "storeId": 31,
    "category": 1,
    "name": "this is a product to test",
    "quantity": 10,
    "price": 350000.0,
    "description": "this is description",
    "image": "https://drive.google.com/uc?id=1nk8HYop7JIM0gopy_pjwLV2Dee_dKboq&export=download"
}
```

### Get products by store id
link: https://tlcngroup2be.herokuapp.com/seller/product/store/31

> GET

> Note: 31 is store id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request

#### Response
```
[
    {
        "id": 42,
        "storeId": 31,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=1nk8HYop7JIM0gopy_pjwLV2Dee_dKboq&export=download"
    },
    {
        "id": 43,
        "storeId": 31,
        "category": 1,
        "name": "this is a product to test",
        "quantity": 10,
        "price": 350000.0,
        "description": "this is description",
        "image": "https://drive.google.com/uc?id=1CxMtOzXqryuqaJGUhBoNa-qZPR34i4ce&export=download"
    }
]
```

### update product without image
link: https://tlcngroup2be.herokuapp.com/seller/product/43
> PUT

> Note: 43 is product id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "name":"this is update test",
    "quantity":20,
    "price":350000,
    "description":"this is update description"
}
```

#### Response
```
{
    "id": 43,
    "storeId": 31,
    "category": 1,
    "name": "this is update test",
    "quantity": 20,
    "price": 350000.0,
    "description": "this is update description",
    "image": "https://drive.google.com/uc?id=1CxMtOzXqryuqaJGUhBoNa-qZPR34i4ce&export=download"
}
```

### Update product with image
link: https://tlcngroup2be.herokuapp.com/seller/product/image/43

> PUT

> Note: 43 is product id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> You have a form to do this

#### Request
```
    file
```

#### Response
```
{
    "id": 43,
    "storeId": 31,
    "category": 1,
    "name": "this is update test",
    "quantity": 20,
    "price": 350000.0,
    "description": "this is update description",
    "image": "https://drive.google.com/uc?id=1i8YCeDnvzndWdUqjcN5xG6yBymgNZcas&export=download"
}
```

### Delete product by product id
link: https://tlcngroup2be.herokuapp.com/seller/product/43

> DELETE

> Note: 43 is product id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt


#### Request

#### Reponse
status: 200

### Create category clothes in a product
link: https://tlcngroup2be.herokuapp.com/seller/product/categoryclothes

> POST

> type is select with 3 options:

> 1: "ao"

> 2: "quan"

> 3: "ao-clb"

> 4: "khac"

> gender is select with 2 options:

> 1: male

> 2: female

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt
#### Request
```
{
    "type":"ao-clb",
    "brand":"adidas",
    "origin":"vietnam",
    "size":["S", "M", "L", "XL", "2XL"],
    "color":["đỏ","cam","vàng", "lục", "lam"],
    "material":"cotton",
    "gender":"nam",
    "productId":55
}
```
#### Response
```
{
    "id": 56,
    "type": "ao-clb",
    "brand": "adidas",
    "origin": "vietnam",
    "size": [
        "S",
        "M",
        "L",
        "XL",
        "2XL"
    ],
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "material": "cotton",
    "gender": "nam",
    "productId": 55
}
```


### Update detail category clothes in a product
link: https://tlcngroup2be.herokuapp.com/seller/product/categoryclothes/55

> PUT

> NOTE: 55 is product id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "type":"ao-clb",
    "brand":"adidas",
    "origin":"vietnam",
    "size":["S", "M", "L", "XL", "2XL"],
    "color":["đỏ","cam","vàng", "lục", "lam"],
    "material":"cotton",
    "gender":"female"
}
```

#### Response
```
{
    "id": 56,
    "type": "ao-clb",
    "brand": "adidas",
    "origin": "vietnam",
    "size": [
        "S",
        "M",
        "L",
        "XL",
        "2XL"
    ],
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "material": "cotton",
    "gender": "female",
    "productId": 55
}
```

### Create category shoes in a product
link: https://tlcngroup2be.herokuapp.com/seller/product/categoryshoes

> POST

> Note: Stype is a select with 4 options:

> 1: "da-bong"

> 2:  "chay-bo"

> 3: "bong-ro"

> 4: "cau-long"

> 5: "khac"

> Note: gender is a select with 2 options:

> 1: male

> 2: female

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt


#### Request
```
{
    "style":"da-bong",
    "size":[7,7.5,8,8.5,9,9.5],
    "color":["đỏ","cam","vàng", "lục", "lam"],
    "height": 15,
    "weight": 6,
    "material":"vải",
    "sole":"nhựa",
    "origin":"Việt Nam",
    "warranty": 12,
    "gender":"male",
    "productId":57
}
```

#### Response
```
{
    "id": 58,
    "style": "da-bong",
    "size": [
        7.0,
        7.5,
        8.0,
        8.5,
        9.0,
        9.5
    ],
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "height": 15.0,
    "weight": 6.0,
    "material": "vải",
    "sole": "nhựa",
    "origin": "Việt Nam",
    "warranty": 12.0,
    "gender": "male",
    "productId": 57
}
```

### Update category shoes in a product
link: https://tlcngroup2be.herokuapp.com/seller/product/categoryshoes/57

> PUT

> 57 is product id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "style":"da-bong",
    "size":[7,7.5,8,8.5,9,9.5],
    "color":["đỏ","cam","vàng", "lục", "lam"],
    "height": 15,
    "weight": 6,
    "material":"vải",
    "sole":"nhựa",
    "origin":"Việt Nam",
    "warranty": 12,
    "gender":"female"
}
```

#### Response
```
{
    "id": 58,
    "style": "da-bong",
    "size": [
        7.0,
        7.5,
        8.0,
        8.5,
        9.0,
        9.5
    ],
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "height": 15.0,
    "weight": 6.0,
    "material": "vải",
    "sole": "nhựa",
    "origin": "Việt Nam",
    "warranty": 12.0,
    "gender": "female",
    "productId": 57
}
```


### Create category accessories in a product
link: https://tlcngroup2be.herokuapp.com/seller/product/categoryaccessories

> POST

> Type is a select with 5 options:

> 1: "bang-tran"

> 2: "bang-co-tay"

> 3: "non"

> 4: "tui"

> 5: "binh-nuoc"

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "type":"binh-nuoc",
    "color":["đỏ","cam","vàng", "lục", "lam"],
    "brand":"addidas",
    "origin":"Việt Nam",
    "material":"nhựa",
    "productId":59
}
```

#### Response
```
{
    "id": 60,
    "type": "binh-nuoc",
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "brand": "addidas",
    "origin": "Việt Nam",
    "material": "nhựa",
    "productId": 59
}
```

### Update category accessories in a product
link: https://tlcngroup2be.herokuapp.com/seller/product/categoryaccessories/59

> PUT

> 59 is product id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt
#### Request
```
{
    "type":"binh-nuoc",
    "color":["đỏ","cam","vàng", "lục", "lam"],
    "brand":"addidas",
    "origin":"Việt Nam",
    "material":"nhựa"
}
```

#### Response
```
{
    "id": 60,
    "type": "binh-nuoc",
    "color": [
        "đỏ",
        "cam",
        "vàng",
        "lục",
        "lam"
    ],
    "brand": "addidas",
    "origin": "Việt Nam",
    "material": "nhựa",
    "productId": 59
}
```

### Get order by store id
link: https://tlcngroup2be.herokuapp.com/seller/order/4

> GET

> 4 is store id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> Default: get order in current day

#### Request

#### Response
```
[
    {
        "id": 39,
        "orderId": 38,
        "productId": 1,
        "quantity": 1,
        "description": "d?, cam",
        "date": "31-10-2021"
    },
    {
        "id": 40,
        "orderId": 38,
        "productId": 2,
        "quantity": 1,
        "description": "xanh, vàng",
        "date": "31-10-2021"
    },
    {
        "id": 41,
        "orderId": 38,
        "productId": 3,
        "quantity": 1,
        "description": "h?ng",
        "date": "31-10-2021"
    },
    {
        "id": 42,
        "orderId": 38,
        "productId": 4,
        "quantity": 1,
        "description": "tím",
        "date": "31-10-2021"
    }
]
```

### Get order by order id and day
link: https://tlcngroup2be.herokuapp.com/seller/order/4/date/31-10-2021

> GET

> 4 is store id

> 31-10-2021 is day which you want to choose

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request

#### Response
```
[
    {
        "id": 39,
        "orderId": 38,
        "productId": 1,
        "quantity": 1,
        "description": "d?, cam",
        "date": "31-10-2021"
    },
    {
        "id": 40,
        "orderId": 38,
        "productId": 2,
        "quantity": 1,
        "description": "xanh, vàng",
        "date": "31-10-2021"
    },
    {
        "id": 41,
        "orderId": 38,
        "productId": 3,
        "quantity": 1,
        "description": "h?ng",
        "date": "31-10-2021"
    },
    {
        "id": 42,
        "orderId": 38,
        "productId": 4,
        "quantity": 1,
        "description": "tím",
        "date": "31-10-2021"
    }
]
```

### Create a discount
link: https://tlcngroup2be.herokuapp.com/seller/coupon

> POST

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "productId":5,
    "couponName":"firsttest",
    "couponDesc":"thích thì giảm",
    "discount":20,
    "startDate":1647094536967,
    "expireDate":1647194539967
}
```

#### Response
```
{
    "couponId": 128,
    "productId": 5,
    "couponName": "firsttest",
    "couponDesc": "thích thì giảm",
    "discount": 20.0,
    "startDate": 1647094536967,
    "expireDate": 1647194539967
}
```

### Update coupon by coupon id
link: https://tlcngroup2be.herokuapp.com/seller/coupon/128
> PUT

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> Note: 128 is coupon id
#### Request
```
{
    "couponName":"firsttest",
    "couponDesc":"thích thì giảm",
    "discount":20,
    "startDate":1647094536967,
    "expireDate":1647194539967
}
```

#### Response
```
{
    "couponId": 128,
    "productId": 0,
    "couponName": "firsttest",
    "couponDesc": "thích thì giảmm",
    "discount": 20.0,
    "startDate": 1647094536967,
    "expireDate": 1647194539967
}
```

### Get all coupon by product id
link: https://tlcngroup2be.herokuapp.com/seller/coupon/productid/5

> GET

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> Note: 5 is product id

#### Request

#### Response
```
[
    {
        "couponId": 123,
        "productId": 5,
        "couponName": "firsttest",
        "couponDesc": "thích thì giảm",
        "discount": 20.0,
        "startDate": 1647094536967,
        "expireDate": 1647094539967
    },
    {
        "couponId": 124,
        "productId": 5,
        "couponName": "firsttest",
        "couponDesc": "thích thì giảm",
        "discount": 20.0,
        "startDate": 1647094536967,
        "expireDate": 1647094536967
    }
]
```

### Get coupon by coupon id
link: https://tlcngroup2be.herokuapp.com/seller/coupon/128

> GET

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> Note: 128 is coupon id

#### Request

#### Response
```
{
    "couponId": 128,
    "productId": 5,
    "couponName": "firsttest",
    "couponDesc": "thích thì giảm",
    "discount": 20.0,
    "startDate": 1647094536967,
    "expireDate": 1647194539967
}
```

### Change active coupon
link: https://tlcngroup2be.herokuapp.com/seller/coupon/active/124

> PUT

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> Note: 124 is coupon id

#### Request

#### Response
```
{
    "mess": "Update successfully"
}
```

### Delete coupon 
link: https://tlcngroup2be.herokuapp.com/seller/coupon/128

> DELETE

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

> Note: 128 is coupon id 

#### Request

#### Response
```
{
    "mess": "Delete successfully"
}
```

### Create voucher
link: https://tlcngroup2be.herokuapp.com/seller/voucher

> POST

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request
```
{
    "storeId":"1",
    "voucherName":"dadasdad",
    "voucherDesc":"dasdasdasd",
    "discount":100000,
    "bearerDiscount":500000,
    "startDate":123123123123,
    "expireDate":11321231234
}
```

#### Response
```
{
    "voucherId": 205,
    "storeId": 1,
    "voucherName": "dadasdad",
    "voucherDesc": "dasdasdasd",
    "discount": 100000.0,
    "bearerDiscount": 500000.0,
    "startDate": 123123123123,
    "expireDate": 11321231234,
    "active": false
}
```

### Update voucher
link: https://tlcngroup2be.herokuapp.com/seller/voucher/205

> PUT

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt
 
> 205 is id voucher

#### Request
```
{
    "voucherName":"dadasddddad",
    "voucherDesc":"dasdasdasd",
    "discount":100000,
    "bearerDiscount":500000,
    "startDate":123123123123,
    "expireDate":11321231234
}
```

#### Response
```
{
    "voucherId": 205,
    "storeId": 1,
    "voucherName": "dadasddddad",
    "voucherDesc": "dasdasdasd",
    "discount": 100000.0,
    "bearerDiscount": 500000.0,
    "startDate": 123123123123,
    "expireDate": 11321231234,
    "active": false
}
```

### Delete voucher
link: https://tlcngroup2be.herokuapp.com/seller/voucher/205

> Delete

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt
 
> 205 is id voucher

#### Request

#### Response
```
{
    "mess": "Delete successfully"
}
```

### Change active voucher
link: https://tlcngroup2be.herokuapp.com/seller/voucher/active/206

> PUT

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt
 
> 206 is voucher id
 
#### Request

#### Response
```
{
    "mess": "change active successfully"
}
```

### Get voucher by voucher id
link: https://tlcngroup2be.herokuapp.com/seller/voucher/206

> GET

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt
 
> 206 is voucher id

#### Request

#### Response
```
{
    "voucherId": 206,
    "storeId": 1,
    "voucherName": "dadasdad",
    "voucherDesc": "dasdasdasd",
    "discount": 100000.0,
    "bearerDiscount": 500000.0,
    "startDate": 1652517759765,
    "expireDate": 1652517759765,
    "active": false
}
```

### Get voucher by storeId
link: https://tlcngroup2be.herokuapp.com/seller/voucher/storeid/1

> GET

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt
 
> 1 is storeId
 
#### Request

#### Response
```
[
    {
        "voucherId": 206,
        "storeId": 1,
        "voucherName": "dadasdad",
        "voucherDesc": "dasdasdasd",
        "discount": 100000.0,
        "bearerDiscount": 500000.0,
        "startDate": 1652517759765,
        "expireDate": 1652517759765,
        "active": false
    }
]
```

## =======>> Admin API <<=======

### Get all username
link: https://tlcngroup2be.herokuapp.com/admin/usernames
> GET
> 
> Need JWT
> 

### Request

### Response
```
[
    "conguser",
    "congseller",
    "congshipper",
    "congadmin",
    "khangadmin",
    "khanguser",
    "khanguserdemo",
    "khangdemoseller"
]
```

### Get all store names
link: https://tlcngroup2be.herokuapp.com/admin/storenames
> GET
> 
> Need JWT
 
#### Request

#### Response
```
[
    "Bán quần áo",
    "Cửa hàng quần áo demoo",
    "Cửa hàng bán giày dép demo",
    "Cửa hàng bán  phụ kiện",
    "Cửa hàng mới",
    "Cửa hàng 1"
]
```

### Get all product names
link: https://tlcngroup2be.herokuapp.com/admin/productnames

> GET
> 
> Need JWT
> 
#### Request

#### Response
```
[
    "Áo thể thao",
    "áo dài tay",
    "áo hoodie",
    "Quần ngủ",
    "Giày thể thao",
    "Giày thể thao 2",
    "Áo nike chất lượng caoo",
    "Giày dép chất lượng cao",
    "Bình nước chất lượng cao",
    "áo nike",
    "Băng cổ tay",
    "Băng cổ tay"
]
```

### Counting product
link: https://tlcngroup2be.herokuapp.com/admin/numberofproduct

> GET
> 
> Need JWT
> 
#### Request

#### Response
```
23
```

### Counting user

link: https://tlcngroup2be.herokuapp.com/admin/numberofuser

> GET
> 
> Need JWT
> 

#### Request

#### Response
```
25
```

### Counting store
link: https://tlcngroup2be.herokuapp.com/admin/numberofstore

> GET
> 
> Need JWT

#### Request

#### Response
```
23
```

### Counting order
link: https://tlcngroup2be.herokuapp.com/admin/numberoforder

> GET
> 
> Need JWT
> 
#### Request

#### Response
```
54
```

### Turnover
link: https://tlcngroup2be.herokuapp.com/admin/turnover

> GET
> 
> Need JWT
> 
#### Request

#### Response
```
21451320
```