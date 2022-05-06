# Document for chat app

## Add Conversation
link: https://utechatapp.herokuapp.com/conversation
> POST

### Request
```
{
    "senderId":"158",
    "receiverId":"183",
    "senderName":"khang",
    "receiverName":"khang",
    "productId":152,
    "productName":"áo thể",
    "productImage":"https://drive.google.com/uc?id=1d3r04aRP-li8pG7vXIDjGfN5hzbUgECO&export=download"
}
```

### Response
```
{
    "membersId": [
        "158",
        "183"
    ],
    "membersName": [
        "khang",
        "khang"
    ],
    "productId": 152,
    "productName": "áo thể",
    "productImage": "https://drive.google.com/uc?id=1d3r04aRP-li8pG7vXIDjGfN5hzbUgECO&export=download",
    "id": 2,
    "__v": 0
}
```

## Get conversation
link: https://utechatapp.herokuapp.com/conversation/158

> GET

> 158 is userId

### Request

### Response    
```
[
    {
        "_id": "627400ec7e5d814f9965eae6",
        "membersId": [
            158,
            183
        ],
        "membersName": [
            "khang",
            "khang"
        ],
        "productId": 152,
        "productName": "áo thể thao",
        "productImage": "https://drive.google.com/uc?id=1d3r04aRP-li8pG7vXIDjGfN5hzbUgECO&export=download",
        "id": 0,
        "__v": 0
    },
    {
        "_id": "627401b716a192c5082ead05",
        "membersId": [
            158,
            183
        ],
        "membersName": [
            "khang",
            "khang"
        ],
        "productId": 152,
        "productName": "áo thể",
        "productImage": "https://drive.google.com/uc?id=1d3r04aRP-li8pG7vXIDjGfN5hzbUgECO&export=download",
        "id": 1,
        "__v": 0
    }
]
```

## Add message
link: https://utechatapp.herokuapp.com/message

> POST

### Request
```
{
    "conversationId":2,
    "sender":"158",
    "text":"Test abcabcaca"
}
```

### Response
```
{
    "conversationId": 2,
    "sender": "158",
    "text": "Test abcabcaca",
    "id": 1,
    "__v": 0
}
```

## Get message
link: https://utechatapp.herokuapp.com/message/conversationid/2

> GET

> 2 is conversation id you can get by using get conversation API above

### Request

### Response
```
[
    {
        "_id": "62754a754b2083930cf8576d",
        "conversationId": 2,
        "sender": "158",
        "text": "Test abcabcaca",
        "id": 0,
        "__v": 0
    },
    {
        "_id": "62754a8eb1cedbfbd63697b9",
        "conversationId": 2,
        "sender": "158",
        "text": "Test abcabcaca",
        "id": 1,
        "__v": 0
    }
]
```