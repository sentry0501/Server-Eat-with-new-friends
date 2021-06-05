# API
Mặc định:
> Prefix Url:<br>
```ruby
localhost:${.env.PORT}/
https://eat-with-friend.herokuapp.com/

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
> Request:
```ruby
Date (thay vì new Date(`dd-mm-yyyy`)) => `dd-mm-yyyy`
Ví dụ:
joinDate: '22-10-2020'
```

> Nếu cần xác thực thì cần gắn Header:<br>
```ruby
Bearer token
```
> Danh sách cã mã quyền (roleCode)
```ruby
0: Khách (Chưa đăng nhập)
1: Employee (Nhân viên)
2: Admin (Quản lý)
3: Restaurant (nhà hàng)
```
# Đăng nhập:
```ruby
/v1/account/signin
`post`
```
> Encytpe:
```ruby
multipart/form-data
```
> Request:<br>
```ruby
account: string
password: string

"{
    ""account"":""benbp05"",
    ""password"":""000000""
}"
```
> Response:<br>
```ruby
"{
    ""error"": 200,
    ""token"": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjI3MzI4OTcsImRhdGEiOnsicm9sZUNvZGUiOjEsImhhc2hQYXNzd29yZCI6IiQyYiQxMCR4VFBpbngxWG1ZUWUvUU5wOTNadG9PQTZPb0cyLnpjWEk3L29LNVE4SUk1TUhhSFJTUGN5eSIsImlkIjoiQ0YtMDAwMDAxIn0sImlhdCI6MTYyMjcyOTI5N30.V3XB3g3sTCwl2XLBltFFlNVESr07WyFZgQGs4xkBI4I"",
    ""id"": ""CF-000001"",
    ""name"": ""Bùi Phó Bền"",
    ""birthday"": ""1999-01-05"",
    ""address"": ""Hà Nội"",
    ""avatarUri"": ""https://mighty-plains-90447.herokuapp.com/static/ef184cd0-491c-4792-b079-fb490d737916-anhdep123.jpg"",
    ""roleCode"": 1,
    ""message"": ""OK""
}"
```
# Đổi mật khẩu:
```ruby
/v1/account/changepw
`put`
```
> Encytpe:
```ruby
multipart/form-data
```
> Request:<br>
```ruby
account: string
password: string
newpassword: string

"{
    ""account"":""benbp05"",
    ""password"":""000000""
}"
```
> Response:<br>
```ruby
"{
    ""error"": 200,
    ""token"": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjI3MzI4OTcsImRhdGEiOnsicm9sZUNvZGUiOjEsImhhc2hQYXNzd29yZCI6IiQyYiQxMCR4VFBpbngxWG1ZUWUvUU5wOTNadG9PQTZPb0cyLnpjWEk3L29LNVE4SUk1TUhhSFJTUGN5eSIsImlkIjoiQ0YtMDAwMDAxIn0sImlhdCI6MTYyMjcyOTI5N30.V3XB3g3sTCwl2XLBltFFlNVESr07WyFZgQGs4xkBI4I"",
    ""id"": ""CF-000001"",
    ""name"": ""Bùi Phó Bền"",
    ""birthday"": ""1999-01-05"",
    ""address"": ""Hà Nội"",
    ""avatarUri"": ""https://mighty-plains-90447.herokuapp.com/static/ef184cd0-491c-4792-b079-fb490d737916-anhdep123.jpg"",
    ""roleCode"": 1,
    ""message"": ""OK""
}"
```
# Đăng nhập nhà hàng:
```ruby
/v1/accountRestaurant/signin
`post`
```
> Encytpe:
```ruby
multipart/form-data
```
> Request:<br>
```ruby
account: string
password: string

"{
    ""account"":""nhahang04"",
    ""password"":""000000""
}"
```
> Response:<br>
```ruby
```
# Đổi mật khẩu nhà hàng:
```ruby
/v1/account/changepwres
`put`
```
> Encytpe:
```ruby
multipart/form-data
```
> Request:<br>
```ruby
account: string
password: string
newpassword: string

```
> Response:<br>
```ruby
{
    "error": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjI4MDY0NDYsImRhdGEiOnsicm9sZUNvZGUiOjMsImhhc2hQYXNzd29yZCI6IiQyYiQxMCRseHJ6MVRnUjNvR3FJTFQ3L1RQbWtPY0ZCa0tFRi9XUTFzdUR2QXRPVmRlMzBnbnM5cVplaSIsImlkIjoiUkUtMDAwMDAzIn0sImlhdCI6MTYyMjgwMjg0Nn0.jKSGHPQyJx0zMVhkrUWaLxGUlhqOI_4eTQjIAvxf9Eg",
    "id": "RE-000003",
    "name": "Bùi Phó Bền",
    "description": "",
    "address": "Hà Nội",
    "avatarUri": "https://firebasestorage.googleapis.com/v0/b/eat-with-friend.appspot.com/o/static\\161cb894-2b51-46b2-9b47-c45ae08cfb74-anhdep123.jpg",
    "coverUri": "https://firebasestorage.googleapis.com/v0/b/eat-with-friend.appspot.com/o/static\\b0f2dddf-e107-4d8a-b4ca-e49d5b6beeca-anh_20172968.jpg",
    "roleCode": 3,
    "message": "OK"
}
```
# Customer
## Lấy thông tin một người dùng:
```ruby
/v1/customer/getbyid
`get`
```
> Gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: string
{
	"id": "CF-000001"
}	
```

> Response:<br>
```ruby
{
    "error": 200,
    "id": "CF-000001",
    "name": "Bùi Phó Bền",
    "birthday": "1999-01-06",
    "address": "Thái Bình",
    "roleCode": 1,
    "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\56b235b0-6075-4885-98db-f5c015c523c3-hình-ảnh-biển-đẹp.jpg",
    "isActive": true,
    "account": "benbp01",
    "message": "OK"
}
```
## Cập nhật thông tin một người dùng:
```ruby
/v1/customer/update
`put`
```
> Encytpe:
```ruby
multipart/form-data
```
> Chỉ người dùng có quyền<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: string
name: string
birthday: Date
address: string
roleCode: 1 (mặc định là customer)
avatar: string (not require)
isActive: 1 (mặc định)
account: string
password: string
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "CF-000003",
    "name": "Bùi Phó Khoa",
    "birthday": "1999-01-06",
    "address": "Thái Bình",
    "roleCode": 1,
    "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\a6ac4e39-1700-4cdb-ab56-3976057f813d-hình-ảnh-biển-đẹp.jpg",
    "isActive": true,
    "account": "benbp00",
    "message": "OK"
}
```
## Xóa một người dùng:
```ruby
/v1/customer/delete
`delete`
```
> Chỉ admin có quyền<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: id người cần xóa
{
	"ids":"CF-000002"
}
```
> Response:<br>
```ruby
ids: id đã bị xóa
{
    "error": 200,
    "ids": "CF-000002",
    "message": "OK"
}
```
## Thêm một người dùng mới:
```ruby
/v1/customer/createone
`put`
```
> Encytpe:
```ruby
multipart/form-data
```
> Request:<br>
```ruby
name: string
birthday: dd-mm-yyyy
address: string
roleCode: 1
avatar: string
isActive: 1
account: string
password: string
```
Điều kiện hợp lệ:<br>
```ruby
name: Độ dài >= 0
birthday: < Ngày hiện tại
address: Độ dài > 0
avatar: .jpg, .jpeg, .png
account: Độ dài >= 6 <= 20
password: Đồ dài >= 6 <= 20
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "CF-000001",
    "name": "Bùi Phó Bền",
    "birthday": "1999-01-05T00:00:00.000Z",
    "address": "Hà Nội",
    "roleCode": 1,
    "avatarUri": "https://eat-with-friend.herokuapp.com/static/2274f5e0-c871-4495-b47d-55e6ff92c27d-anhdep123.jpg",
    "isActive": true,
    "account": "benbp05",
    "message": "OK"
}
```
## Lấy tất cả người dùng:
```ruby
/v1/customer
`get`
```
>khách ko có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
Không
```

> Response:<br>
```ruby
{
    "error": 200,
    "customers": [
        {
            "id": "CF-000001",
            "name": "Bùi Phó Bền",
            "address": "Hà Nội",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static/ef184cd0-491c-4792-b079-fb490d737916-anhdep123.jpg",
            "isActive": true
        }
    ],
    "message": "OK"
}
```
## Tìm người dùng theo tên:
```ruby
/v1/customer/getbyname
`post`
```
>khách ko có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
name: string
{
	"name": "pho"
}	
```

> Response:<br>
```ruby
{
    "error": 200,
    "customers": [
        {
            "id": "CF-000001",
            "name": "Bùi Phó Bền",
            "address": "Thái Bình",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\56b235b0-6075-4885-98db-f5c015c523c3-hình-ảnh-biển-đẹp.jpg",
            "isActive": true
        },
        {
            "id": "CF-000002",
            "name": "Bùi Phó Bền",
            "address": "Hà Nội",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\2ad99561-6b91-427f-9d0c-4f983d56afc1-default-product.jpg",
            "isActive": true
        },
        {
            "id": "CF-000003",
            "name": "Bùi Phó Bền",
            "address": "Hà Nội",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\8e73e264-9091-433d-80b1-800509dcaebe-default-product.jpg",
            "isActive": true
        }
    ],
    "message": "OK"
}
```
# Nhà  hàng
## Tạo một nhà hàng:
```ruby
/v1/restaurant/createone
`put`
```
> Encytpe:
```ruby
multipart/form data
```
>Header:<br>
```ruby
không
```
> Request:<br>
```ruby
name: string
address: string
description: string
roleCode: 3 (mặc định)
avatar: .png .jpg .jpeg
isActive: 1
account: string
password: string
cover : .png .jpg .jpeg
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "RE-000001",
    "name": "Hải sản Quảng Ninh",
    "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
    "address": "Hà Nội",
    "roleCode": 3,
    "avatarUri": "https://eat-with-friend.herokuapp.com/static/b5d46d24-78ac-4377-84b3-e47afecfc5c0-anhdep123.jpg",
    "coverUri": "https://eat-with-friend.herokuapp.com/static/f88beae6-c6c3-47a6-84cc-ba1502a04998-anh_20172968.jpg",
    "isActive": true,
    "account": "nhahang04",
    "message": "OK"
}
}
```
## Tìm nhà hàng theo tên:
```ruby
/v1/restaurant/getbyname
`post`
```
> Encytpe:
```ruby
application/json
```
> Header<br>
```ruby
không
```
> Request:<br>
```ruby
name: string
{
	"name": "pho"
}	
```
> Response:<br>
```ruby
{
    "error": 200,
    "restaurants": [
        {
            "id": "RE-000001",
            "name": "Hải sản Quảng Ninh",
            "address": "Hà Nội",
            "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
            "avatarUri": "https://eat-with-friend.herokuapp.com/static/b5d46d24-78ac-4377-84b3-e47afecfc5c0-anhdep123.jpg",
            "coverUri": "https://eat-with-friend.herokuapp.com/static/f88beae6-c6c3-47a6-84cc-ba1502a04998-anh_20172968.jpg",
            "isActive": true
        },
        {
            "id": "RE-000002",
            "name": "Hải sản Quảng Ninh",
            "address": "Hà Nội",
            "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
            "avatarUri": "https://eat-with-friend.herokuapp.com/static/7b390573-da6c-4900-9fd0-fe2ed2328dda-anhdep123.jpg",
            "coverUri": "https://eat-with-friend.herokuapp.com/static/109a4786-20f8-4e5c-9f9e-34867665521d-anh_20172968.jpg",
            "isActive": true
        }
    ],
    "message": "OK"
}
```
## Lấy nhà hàng theo id:
```ruby
/v1/restaurant/getbyid
`post`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Không
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
    "id": "RE-000001",
    "name": "Hải sản Quảng Ninh",
    "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
    "address": "Hà Nội",
    "roleCode": 3,
    "avatarUri": "https://eat-with-friend.herokuapp.com/static/b5d46d24-78ac-4377-84b3-e47afecfc5c0-anhdep123.jpg",
    "coverUri": "https://eat-with-friend.herokuapp.com/static/f88beae6-c6c3-47a6-84cc-ba1502a04998-anh_20172968.jpg",
    "isActive": true,
    "account": "nhahang04",
    "message": "OK"
}
```
## Lấy danh sách nhà hàng:
```ruby
/v1/restaurant
`get`
```
> Request:<br>
```ruby
không
```
> Response:<br>
```ruby
{
    "error": 200,
    "restaurants": [
        {
            "id": "RE-000001",
            "name": "Hải sản Thái Bình",
            "address": "Thái Bình",
            "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\40f6a710-a46f-4287-afee-282d0d75bfd6-ảnh-hoàng-hôn-đẹp.jpg",
            "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\7b2af30d-5dfd-48bd-b664-550b1f199501-hình-nền-4k-đẹp-scaled.jpg",
            "isActive": true
        },
        {
            "id": "RE-000003",
            "name": "Bùi Phó Bền",
            "address": "Hà Nội",
            "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\161cb894-2b51-46b2-9b47-c45ae08cfb74-anhdep123.jpg",
            "coverUri": "https://mighty-plains-90447.herokuapp.com/static\\b0f2dddf-e107-4d8a-b4ca-e49d5b6beeca-anh_20172968.jpg",
            "isActive": true
        }
    ],
    "message": "OK"
}
```
## Xóa nhà hàng:
```ruby
/v1/restaurant/delete
`delete`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
{
	"ids":["RE-000002"]
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "ids": [
        "RE-000002"
    ],
    "message": "OK"
}
```
## Cập nhật một nhà hàng:
```ruby
/v1/restaurant/update
`put`
```
> Encytpe:
```ruby
multipart/form data
```
>Header:<br>
```ruby
không
```
> Request:<br>
```ruby
id: string
name: string
address: string
description: string
roleCode: 3 (mặc định)
avatar: .png .jpg .jpeg
isActive: 1
account: string
password: string
cover: .png .jpg .jpeg
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "RE-000001",
    "name": "Hải sản Quảng Ninh",
    "description": "Nhà hàng có rất nhiều món ăn hải sản nổi tiếng",
    "address": "Hà Nội",
    "roleCode": 3,
    "avatarUri": "https://eat-with-friend.herokuapp.com/static/b5d46d24-78ac-4377-84b3-e47afecfc5c0-anhdep123.jpg",
    "coverUri": "https://eat-with-friend.herokuapp.com/static/f88beae6-c6c3-47a6-84cc-ba1502a04998-anh_20172968.jpg",
    "isActive": true,
    "account": "nhahang04",
    "message": "OK"
}
}
```
# Nhóm
## Tham gia nhóm
```ruby
/v1/group/join
`put`
```
> Encytpe:
```ruby
application/json
```
> Chỉ người dùng có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
{
	"customer":"CF-000003",
	"restaurant": "RE-000003"
}

```
> Response:<br>
```ruby
{
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
    },
    "message": "OK"
}
```
## Rời nhóm
```ruby
/v1/group/leave
`put`
```
> Encytpe:
```ruby
application/json
```
> Chỉ người dùng có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
{
	"customer":"CF-000003",
	"group": "9bf48b22-95b1-4707-ba90-a6b79ea856d9"
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "message": "OK"
}
```
## Lấy các thành viên nhóm:
```ruby
/v1/group/get members
`post`
```
> Encytpe:
```ruby
application/json
```
> Chỉ người dùng có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: id nhóm
```
```ruby
Example:
{
	"id": "72294e9e-a82c-47b2-a168-d2e1b2282f9c"
}	
Khoảng thời gian giữa start và end tối đa là 2 năm (tránh bị quá bộ nhớ)
```
> Response:<br>
```ruby
{
    "error": 200,
    "customers": [
        {
            "id": "CF-000001",
            "name": "Bùi Phó Bền",
            "address": "Thái Bình",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\56b235b0-6075-4885-98db-f5c015c523c3-hình-ảnh-biển-đẹp.jpg",
            "isActive": true
        },
        {
            "id": "CF-000002",
            "name": "Bùi Phó Bền",
            "address": "Hà Nội",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\2ad99561-6b91-427f-9d0c-4f983d56afc1-default-product.jpg",
            "isActive": true
        },
        {
            "id": "CF-000003",
            "name": "Bùi Phó Khoa",
            "address": "Thái Bình",
            "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\a6ac4e39-1700-4cdb-ab56-3976057f813d-hình-ảnh-biển-đẹp.jpg",
            "isActive": true
        }
    ],
    "message": "OK"
}
```
## Lấy các nhóm một của người dùng
```ruby
/v1/group/getbycustomerid
`post`
```
> Encytpe:
```ruby
application/json
```
> Chỉ người dùng có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
{
	"id": "CF-000003"
}	
```
> Response:<br>
```ruby
{
    "error": 200,
    "groups": [
        {
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
        {
            "error": 200,
            "id": "72294e9e-a82c-47b2-a168-d2e1b2282f9c",
            "name": "Nhóm nhà hàng Bùi Phó Bền",
            "restaurant": {
                "id": "RE-000001",
                "name": "Bùi Phó Bền",
                "address": "Hà Nội",
                "description": "",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/",
                "coverUri": "https://mighty-plains-90447.herokuapp.com/",
                "isActive": true
            },
            "members": 3,
            "leader": {
                "id": "CF-000003",
                "name": "Bùi Phó Khoa",
                "address": "Thái Bình",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static\\a6ac4e39-1700-4cdb-ab56-3976057f813d-hình-ảnh-biển-đẹp.jpg",
                "isActive": true
            }
        }
    ],
    "message": "OK"
}
```
