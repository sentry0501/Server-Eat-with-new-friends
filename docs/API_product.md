# API
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

# Product
## Lấy thông tin một product:
```ruby
/v1/product/getbyid
`post`
```
> Encytype:<br>
```ruby
application/json
```
> Gắn Header:<br>
```ruby
không
```
> Request:<br>
```ruby
id: string
{
	"id": "PD-000002"
}		
```

> Response:<br>
```ruby
{
    "error": 200,
    "id": "PD-000002",
    "name": "Xôi",
    "restaurant": {
        "id": "RE-000001",
        "name": "Hải sản Thái Bình",
        "address": "Thái Bình",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\40f6a710-a46f-4287-afee-282d0d75bfd6-ảnh-hoàng-hôn-đẹp.jpg",
        "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\7b2af30d-5dfd-48bd-b664-550b1f199501-hình-nền-4k-đẹp-scaled.jpg",
        "isActive": true
    },
    "price": 20000,
    "description": "Ngon nhất thế giới",
    "previewUri": "https://mighty-plains-90447.herokuapp.com/public/default-product.jpg",
    "isActive": true,
    "message": "OK"
}
```
## Thêm một product mới:
```ruby
/v1/product/createone
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
{
	"restaurantid":"RE-000004",
	"name": "Cháo",
	"price": 20000,
	"description": "Ngon nhất thế giới"
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "PD-000001",
    "name": "Cháo",
    "restaurant": {
        "id": "RE-000001",
        "name": "Hải sản Quảng Ninh",
        "address": "Hà Nội",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://eat-with-friend.herokuapp.com/static/b5d46d24-78ac-4377-84b3-e47afecfc5c0-anhdep123.jpg",
        "coverUri": "https://eat-with-friend.herokuapp.com/static/f88beae6-c6c3-47a6-84cc-ba1502a04998-anh_20172968.jpg",
        "isActive": true
    },
    "price": 20000,
    "description": "Ngon nhất thế giới",
    "previewUri": "https://eat-with-friend.herokuapp.com/public/default-product.jpg",
    "isActive": true,
    "message": "OK"
}
```
## Cập nhật thông tin một product(chưa có ảnh preview):
```ruby
/v1/product/update
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
{
	"id": "PD-000001",
	"name": "Bạc xỉu",
    	"price": 12000,
   	"description": "Loại caffe hơi ngon",
    	"isActive": 1
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "PD-000001",
    "name": "Xôi",
    "restaurant": {
        "id": "RE-000001",
        "name": "Hải sản Quảng Ninh",
        "address": "Hà Nội",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://eat-with-friend.herokuapp.com/static/b5d46d24-78ac-4377-84b3-e47afecfc5c0-anhdep123.jpg",
        "coverUri": "https://eat-with-friend.herokuapp.com/static/f88beae6-c6c3-47a6-84cc-ba1502a04998-anh_20172968.jpg",
        "isActive": true
    },
    "price": 12000,
    "description": "Loại xôi hơi ngon",
    "previewUri": "https://eat-with-friend.herokuapp.com/public/default-product.jpg",
    "isActive": true,
    "message": "OK"
}
```
## Cập nhật ảnh preview một product:
```ruby
/v1/product/updateprev
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Encytpe:
```ruby
multipart/form-data
```
> Request:<br>
```ruby
id: text
preview: file <image file>
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "PD-000001",
    "name": "Xôi",
    "restaurant": {
        "id": "RE-000001",
        "name": "Hải sản Quảng Ninh",
        "address": "Hà Nội",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://eat-with-friend.herokuapp.com/static/b5d46d24-78ac-4377-84b3-e47afecfc5c0-anhdep123.jpg",
        "coverUri": "https://eat-with-friend.herokuapp.com/static/f88beae6-c6c3-47a6-84cc-ba1502a04998-anh_20172968.jpg",
        "isActive": true
    },
    "price": 12000,
    "description": "Loại xôi hơi ngon",
    "previewUri": "https://eat-with-friend.herokuapp.com/static/a9290104-0ce8-4cc2-8960-fe99e2f81939-thien-nhien-dep.jpg",
    "isActive": true,
    "message": "OK"
}
```

## Xóa một danh sách product:
```ruby
/v1/product/delete
`delete`
```
> chỉ nhà hàng có quyền nên có Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
ids: Array<id: int> - Danh sách những id product cần xóa 
ex: 
{
	"ids":["PD-000005","PD-000006"]
}
```
> Response:<br>
```ruby
ids: Array<id: int> - Danh sách những id đã bị xóa
{
    "error": 200,
    "ids": [],
    "message": "OK"
}
```

## Xem danh sách product 1 nhà hàng:
```ruby
/v1/product/getbyrestaurantid
`post`
```
>Header:<br>
```ruby
không
```
> Request:<br>
```ruby
{
	"id":"RE-000004"
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "products": [
        {
            "id": "PD-000001",
            "name": "Bạc xỉu",
            "price": 12000,
            "description": "Loại caffe hơi ngon",
            "previewUri": "https://mighty-plains-90447.herokuapp.com/static\\4b68d0a4-667b-4c2a-9393-1f3ecff4e94d-hinh-anh-thien-nhien-dep.jpg",
            "isActive": true
        },
        {
            "id": "PD-000002",
            "name": "Xôi",
            "price": 20000,
            "description": "Ngon nhất thế giới",
            "previewUri": "https://mighty-plains-90447.herokuapp.com/public/default-product.jpg",
            "isActive": true
        }
    ],
    "message": "OK"
}
```
