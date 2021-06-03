# API
Mặc định:
> Prefix Url:<br>
```ruby
localhost:${.env.PORT}/
ví dụ: localhost:8080/
# Nếu có đường link ảnh (ví dụ: avatar) thì thêm tiền tố trên
```
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
Bearer <token>
```
> Request:<br>
```ruby
id: string
{
	"id": "PD-000001"
}	
```

> Response:<br>
```ruby
id: string
name: string
price: string
restaurant: restaurant
description: string
previewUri: string (link to image file)
isActive: boolean
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
restaurantid: string
name: string
price: number
description: string
isActive: boolean
{
	"restaurantid":"RE-000004",
	"name": "Cháo",
	"price": 20000,
	"description": "Ngon nhất thế giới"
}	
```
Điều kiện hợp lệ:<br>
```ruby
name: string Độ dài >= 0
price: Mặc định = 0
description: string  0<= độ dài <= 3000
isActive: bool - product còn bán hay không
```
> Response:<br>
```ruby
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
{
    "error": 200,
    "id": "PD-000007",
    "name": "Cháo",
    "restaurant": {
        "id": "RE-000004",
        "name": "Hải sản Quảng Ninh",
        "address": "Hà Nội",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\2a532394-4854-40ee-8296-29b79a11ddaa-anhdep123.jpg",
        "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\7ca19316-281c-4dce-9ad7-d272657c8c31-anh_20172968.jpg",
        "isActive": true
    },
    "price": 20000,
    "description": "Ngon nhất thế giới",
    "previewUri": "https://mighty-plains-90447.herokuapp.com/public/default-product.jpg",
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
id: string
name: string
price: string
description: string
isActive: boolean
{
	"id": "PD-000002",
	"name": "Bạc xỉu gốc",
    "price": 12000,
    "description": "Loại caffe hơi ngon",
    "isActive": 1
}
```
> Response:<br>
```ruby
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
{
    "error": 200,
    "id": "PD-000002",
    "name": "Bạc xỉu gốc",
    "price": 12000,
    "description": "Loại caffe hơi ngon",
    "previewUri": "localhost:8080/public/default-product.jpg",
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
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
{
    "error": 200,
    "id": "PD-000002",
    "name": "Bạc xỉu gốc",
    "price": 12000,
    "description": "Loại caffe hơi ngon",
    "previewUri": "localhost:8080/static\\bf389003-87d8-4cdf-ae3a-9a9056a1ce04-anh_20172968.jpg",
    "isActive": true,
    "message": "OK"
}
```

## Xóa một danh sách product:
```ruby
/v1/product/delete
`delete`
```
> Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
ids: Array<id: int> - Danh sách những id product cần xóa 
ex: 
{
	"ids":["PD-000001","PD-000002"]
}
```
> Response:<br>
```ruby
ids: Array<id: int> - Danh sách những id đã bị xóa
{
    "error": 200,
    "ids": [
        "PD-000001",
        "PD-000002"
    ],
    "message": "OK"
}
```

