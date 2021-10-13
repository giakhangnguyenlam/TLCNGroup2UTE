# Backend Group 2
> this is document description for backend system

> You can replace http://localhost:8080 to https://tlcngroup2be.herokuapp.com

=======================================================================================

##  ==========================>> User API <<========================================== 

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
    "id": 2,
    "name": "khang",
    "dateofbirth": "06-06-2000",
    "email": "abc",
    "address":"123, dadd",
    "gender": "abc",
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZ2FiYyIsImV4cCI6MTYzMjU5MzEyMSwiaWF0IjoxNjMyNTU3MTIxfQ.xn2JRxW7SsPJwglSo_dP_cOgtOAriYS18Gqdk8uJlx0"
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



##  ==========================>> Seller API <<=========================================

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

> Note: 3 is store id

> Note: You have to login with seller account to use this

> Note: Headers has KEY: Authorization and VALUE: Bearer jwt

#### Request

#### Response
Status: 200

### Update Store without image
link: http://localhost:8080/seller/store/4

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
