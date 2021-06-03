# API
## Chung
> Encytype:<br>
```ruby
application/json
```
> Tất cả các response trả về đều có:<br>
```ruby
Http status
```
```ruby
error: ERR_CODE enum
message: string
```

> Nếu cần xác thực thì cần gắn Header:<br>
```ruby
Bearer <token>
```

# Order Đặt bàn
## Tạo yêu cầu đặt bàn
```ruby
/v1/order/createone
`put`
```
> Encytype:<br>
```ruby
application/json
```
>Chỉ nhóm trưởng mới có quyền Gắn Header:<br>
```ruby
Bearer <token>
```
> Request:<br>
leader: leader Id
time: thoi gian ăn định dạng "dd-mm-yyyy hh:mm:ss"
```ruby
{
	"leader":"CF-000003",
	"time":"07-06-2021 21:34:23" ,
	"groupid":"10206179-05f0-4752-8b9b-a09c5a315fa4"
}	
```

> Response:<br>
```ruby
approve: 0 đang duyệt, 1 chấp nhận, 2 từ chối
Example:
{
    "error": 200,
    "id": "OD-000001",
    "time": "2021-06-07T14:34:23.000Z",
    "group": {
        "error": 200,
        "id": "10206179-05f0-4752-8b9b-a09c5a315fa4",
        "name": "Nhóm nhà hàng Bùi Phó Bền",
        "restaurant": {
            "id": "RE-000003",
            "name": "Bùi Phó Bền",
            "address": "Hà Nội",
            "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\161cb894-2b51-46b2-9b47-c45ae08cfb74-anhdep123.jpg",
            "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\b0f2dddf-e107-4d8a-b4ca-e49d5b6beeca-anh_20172968.jpg",
            "isActive": true
        },
        "members": 1,
        "leader": {
            "id": "CF-000003",
            "name": "Bùi Phó Khoa",
            "address": "Thái Bình",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\a6ac4e39-1700-4cdb-ab56-3976057f813d-hình-ảnh-biển-đẹp.jpg",
            "isActive": true
        }
    },
    "note": null,
    "approve": 0,
    "restaurantId": "RE-000003",
    "message": "OK"
}
```

## Lấy hết tất cả oder của 1 nhà hàng:
```ruby
/v1/order/getbyrestaurantid
`post`
```
>CHỉ có nhà hàng mới có quyền nên có Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: id nhà hàng
{
	"id":"RE-000003"
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "orders": [],
    "message": "OK"
}
```

## Cập nhật 1 order(dùng cả khi đồng ý và từ chối, khác nhau: approve:1 chấp nhận, approve:2: từ chối:
```ruby
/v1/order/upadte
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: id order
approve: 1- chấp nhận, 2- từ chối
{
	"id":"OD-000001",
	"approve":2
}
```

> Response:<br>
```ruby
{
    "error": 200,
    "id": "OD-000001",
    "time": "2021-06-07T14:34:23.000Z",
    "group": {
        "error": 200,
        "id": "10206179-05f0-4752-8b9b-a09c5a315fa4",
        "name": "Nhóm nhà hàng Bùi Phó Bền",
        "restaurant": {
            "id": "RE-000003",
            "name": "Bùi Phó Bền",
            "address": "Hà Nội",
            "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\161cb894-2b51-46b2-9b47-c45ae08cfb74-anhdep123.jpg",
            "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\b0f2dddf-e107-4d8a-b4ca-e49d5b6beeca-anh_20172968.jpg",
            "isActive": true
        },
        "members": 1,
        "leader": {
            "id": "CF-000003",
            "name": "Bùi Phó Khoa",
            "address": "Thái Bình",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\a6ac4e39-1700-4cdb-ab56-3976057f813d-hình-ảnh-biển-đẹp.jpg",
            "isActive": true
        }
    },
    "note": null,
    "approve": 2,
    "restaurantId": "RE-000003",
    "message": "OK"
}
```
# Đánh giá
## Tạo đánh giá
```ruby
/v1/review/create
`put`
```
> Encytype:<br>
```ruby
application/json
```
>Chỉ người dùng mới có quyền nên  Gắn Header:<br>
```ruby
Bearer <token>
```
> Request:<br>
date: thoi gian đánh giá "dd-mm-yyyy"
```ruby
{
	"content":"Quá ngon",
	"date":"31-05-2021" ,
	"restaurantid":"RE-000001",
	"customerid":"CF-000001",
	"star": 4
}	
```

> Response:<br>
```ruby
{
    "error": 200,
    "id": "9f987b31-cd80-473f-8391-b08f9efb5701",
    "date": "2021-05-30T17:00:00.000Z",
    "customer": {
        "id": "CF-000001",
        "name": "Bùi Phó Bền",
        "address": "Thái Bình",
        "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\56b235b0-6075-4885-98db-f5c015c523c3-hình-ảnh-biển-đẹp.jpg",
        "isActive": true
    },
    "content": "Quá ngon",
    "star": 4,
    "restaurant": {
        "id": "RE-000001",
        "name": "Hải sản Thái Bình",
        "address": "Thái Bình",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\40f6a710-a46f-4287-afee-282d0d75bfd6-ảnh-hoàng-hôn-đẹp.jpg",
        "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\7b2af30d-5dfd-48bd-b664-550b1f199501-hình-nền-4k-đẹp-scaled.jpg",
        "isActive": true
    },
    "message": "OK"
}
```
## Lấy hết đánh giá của 1 nhà hàng
```ruby
/v1/review/getbyrestaurantid
`post`
```
> Encytype:<br>
```ruby
application/json
```
>Header:<br>
```ruby
không
```
> Request:<br>
```ruby
{	
	"id":"RE-000001"
}
```

> Response:<br>
```ruby
{
    "error": 200,
    "reviews": [
        {
            "id": "9f987b31-cd80-473f-8391-b08f9efb5701",
            "date": "2021-05-31",
            "content": "Quá ngon",
            "star": 4,
            "customer": {
                "id": "CF-000001",
                "name": "Bùi Phó Bền",
                "address": "Thái Bình",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\56b235b0-6075-4885-98db-f5c015c523c3-hình-ảnh-biển-đẹp.jpg",
                "isActive": true
            }
        }
    ],
    "message": "OK"
}
```
