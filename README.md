Trong bài kiểm tra này, em thực hiện chức năng CRUD cho đối tượng **Product / Sản phẩm**. Đây là đối tượng dùng để quản lý thông tin sản phẩm trong hệ thống bán hàng.
Các chức năng đã triển khai gồm:
- Thêm sản phẩm mới.
- Xem danh sách sản phẩm.
- Xem chi tiết một sản phẩm theo mã sản phẩm.
- Cập nhật thông tin sản phẩm.
- Xóa sản phẩm khỏi danh sách.
Project được viết bằng NestJS và tổ chức theo các thành phần cơ bản: `Module`, `Controller`, `Service`, `DTO` và `Entity`.
## Cấu trúc thư mục chính
```text
src
├── app.module.ts
├── main.ts
└── products
    ├── dto
    │   ├── create-product.dto.ts
    │   └── update-product.dto.ts
    ├── entities
    │   └── product.entity.ts
    ├── products.controller.ts
    ├── products.module.ts
    └── products.service.ts
```

## Mô tả các file chính

| File | Nội dung |
|---|---|
| `main.ts` | Khởi động ứng dụng NestJS trên cổng 3000 |
| `app.module.ts` | Khai báo module chính của ứng dụng |
| `products.module.ts` | Module riêng cho chức năng quản lý sản phẩm |
| `products.controller.ts` | Khai báo các API CRUD của sản phẩm |
| `products.service.ts` | Xử lý logic thêm, đọc, cập nhật, xóa sản phẩm |
| `create-product.dto.ts` | Mô tả dữ liệu khi thêm sản phẩm |
| `update-product.dto.ts` | Mô tả dữ liệu khi cập nhật sản phẩm |
| `product.entity.ts` | Mô tả các thuộc tính của sản phẩm |
| `quan_ly_ban_hang.sql` | File SQL mô tả database và bảng `products` |

## Cơ sở dữ liệu

File SQL: `quan_ly_ban_hang.sql`

Bảng chính: `products`

| Trường | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|
| `id` | INT, AUTO_INCREMENT | Mã sản phẩm |
| `name` | VARCHAR(255) | Tên sản phẩm |
| `description` | TEXT | Mô tả sản phẩm |
| `price` | DECIMAL(10,2) | Giá sản phẩm |
| `quantity` | INT | Số lượng sản phẩm |

## API CRUD đã thực hiện

| Chức năng | Method | Endpoint | Mô tả |
|---|---|---|---|
| Create | POST | `/products` | Thêm sản phẩm mới |
| Read | GET | `/products` | Xem danh sách sản phẩm |
| Read | GET | `/products/:id` | Xem chi tiết sản phẩm |
| Update | PUT | `/products/:id` | Cập nhật sản phẩm |
| Delete | DELETE | `/products/:id` | Xóa sản phẩm |

## Cách chạy project

Cài thư viện:

```bash
npm install
```

Chạy ứng dụng:

```bash
npm run start:dev
```

Sau khi chạy thành công, truy cập:

```text
http://localhost:3000/products
```

## Câu lệnh kiểm thử nhanh

### Xem danh sách sản phẩm

```text
GET http://localhost:3000/products
```

### Xem chi tiết sản phẩm

```text
GET http://localhost:3000/products/1
```

### Thêm sản phẩm

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products" -Method Post -ContentType "application/json" -Body '{"name":"Laptop Dell Inspiron","description":"Máy tính xách tay dùng cho quản lý bán hàng","price":15000000,"quantity":5}'
```

### Cập nhật sản phẩm

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/1" -Method Put -ContentType "application/json" -Body '{"name":"Laptop Dell Inspiron 15","description":"Đã cập nhật thông tin sản phẩm","price":14500000,"quantity":7}'
```

### Xóa sản phẩm

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/1" -Method Delete
```

##Ghi chú:

Dữ liệu sản phẩm trong project được lưu tạm trong mảng để kiểm thử nhanh các API CRUD. File SQL vẫn được chuẩn bị riêng để mô tả thiết kế bảng `products` theo yêu cầu của bài kiểm tra.
