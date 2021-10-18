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

### pageAuth
link: http://localhost:8080/authen
> GET

> this is test for jwt 

> Note: prerequisite has a jwt token

> Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZyIsImV4cCI6MTYzMjU5MTUwOCwiaWF0IjoxNjMyNTU1NTA4fQ.w2pEhFdI3ra1pJ58hjuWDmL1HAKOZs9rBQ14I9-3yZs

#### Request

#### Response
##### Success
status: 200
```
Page must login to see
```

##  ===============>> User API <<====================

### Update user
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
    "gender":"male",
    "password":"123"
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