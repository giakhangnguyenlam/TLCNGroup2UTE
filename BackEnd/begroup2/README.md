# Backend Group 2
> this is document description for backend system

> You can replace http://localhost:8080 to https://tlcngroup2be.herokuapp.com

=======================================================================================

## User API

### Sign up
link: http://localhost:8080/signup

> POST
#### Request
```
{
    "name":"khang",
    "dateofbirth":"06-06-2000",
    "email":"abc",
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
    "id": 1,
    "name": "khang",
    "dateofbirth": "06-06-2000",
    "email": "abc",
    "gender": "abc",
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZyIsImV4cCI6MTYzMjU5MzE5OSwiaWF0IjoxNjMyNTU3MTk5fQ.JV8dqfsBFYIsNrNPw-OaYd0c5N9ekxvmQKTcphWFVWY"
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
