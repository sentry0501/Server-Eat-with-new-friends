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

# Promotion
## Lấy thông tin một promotion:
```ruby
/v1/promotion/getbyid
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
	"id": "PM-000002"
}		
```

> Response:<br>
```ruby
{
    "error": 200,
    "id": "PM-000001",
    "name": "KHuyen mai",
    "restaurant": {
        "id": "RE-000004",
        "name": "Hải sản Quảng Ninh",
        "address": "Hà Nội",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\2a532394-4854-40ee-8296-29b79a11ddaa-anhdep123.jpg",
        "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\7ca19316-281c-4dce-9ad7-d272657c8c31-anh_20172968.jpg",
        "isActive": true
    },
    "description": "duy nhat",
    "previewUri": "https://mighty-plains-90447.herokuapp.com/public/default-promotion.jpg",
    "isActive": true,
    "message": "OK"
}
```
## Thêm một promotion mới:
```ruby
/v1/promotion/createone
`put`
```
>Header:<br>
```ruby
Bearer token	
```
> Request:<br>
```ruby
{
	"restaurantid":"RE-000001",
	"name": "KM lớn",
	"description": "Giảm 100%"
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "PM-000004",
    "name": "KM lớn",
    "restaurant": {
        "id": "RE-000001",
        "name": "Hải sản Thái Bình",
        "address": "Thái Bình",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\40f6a710-a46f-4287-afee-282d0d75bfd6-ảnh-hoàng-hôn-đẹp.jpg",
        "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\7b2af30d-5dfd-48bd-b664-550b1f199501-hình-nền-4k-đẹp-scaled.jpg",
        "isActive": true
    },
    "description": "Giảm 100%",
    "previewUri": "https://mighty-plains-90447.herokuapp.com/public/default-promotion.jpg",
    "isActive": true,
    "message": "OK"
}
```
## Cập nhật thông tin một promotion(chưa có ảnh preview):
```ruby
/v1/promotion/update
`put`
```
>Header:<br>
```ruby
Bearer token	
```
> Request:<br>
```ruby
{
	"id": "PM-000001",
	"name": "KHuyen mai",
    	"description": "duy nhat",
    	"isActive": 1
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "PM-000004",
    "name": "KM lớn",
    "restaurant": {
        "id": "RE-000001",
        "name": "Hải sản Thái Bình",
        "address": "Thái Bình",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\40f6a710-a46f-4287-afee-282d0d75bfd6-ảnh-hoàng-hôn-đẹp.jpg",
        "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\7b2af30d-5dfd-48bd-b664-550b1f199501-hình-nền-4k-đẹp-scaled.jpg",
        "isActive": true
    },
    "description": "Giảm 100%",
    "previewUri": "https://mighty-plains-90447.herokuapp.com/public/default-promotion.jpg",
    "isActive": true,
    "message": "OK"
}
```
## Cập nhật ảnh preview một promotion:
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
    "id": "PM-000002",
    "name": "KM thu",
    "restaurant": {
        "id": "RE-000004",
        "name": "Hải sản Quảng Ninh",
        "address": "Hà Nội",
        "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
        "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\2a532394-4854-40ee-8296-29b79a11ddaa-anhdep123.jpg",
        "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\7ca19316-281c-4dce-9ad7-d272657c8c31-anh_20172968.jpg",
        "isActive": true
    },
    "description": "Giảm 100%",
    "previewUri": "https://mighty-plains-90447.herokuapp.com/static\\f206ec35-f5c6-4c39-9dd7-47dd8b70088f-hình-ảnh-biển-đẹp - Copy.jpg",
    "isActive": true,
    "message": "OK"
}
```

## Xóa một danh sách promotion:
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
{
	"ids":["PM-000001"]
}
```
> Response:<br>
```ruby
ids: Array<id: int> - Danh sách những id đã bị xóa
{
    "error": 200,
    "ids": [
        "PM-000001"
    ],
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
    "promotions": [
        {
            "id": "PM-000002",
            "name": "KM thu",
            "description": "Giảm 100%",
            "previewUri": "https://mighty-plains-90447.herokuapp.com/public/default-promotion.jpg",
            "isActive": true
        }
    ],
    "message": "OK"
}
```
