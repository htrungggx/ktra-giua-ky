# Bài kiểm tra giữa kỳ - Web nâng cao

## Thông tin bài làm

- **Họ và tên:** Nguyễn Hữu Trung
- **Mã sinh viên:** 24107723
- **Lớp:** N01.LT2
- **Framework sử dụng:** NestJS
- **Đề tài:** Phát triển phần mềm quản lý bán hàng
- **Đối tượng thực hiện CRUD:** Product / Sản phẩm
- **Cơ sở dữ liệu:** MySQL
- **Công cụ quản trị CSDL:** phpMyAdmin
- **Thư viện kết nối MySQL:** mysql2

## Giới thiệu

Trong bài kiểm tra này, em thực hiện chức năng CRUD cho đối tượng **Product / Sản phẩm** trong hệ thống quản lý bán hàng cơ bản.

Đối tượng Product dùng để lưu trữ và quản lý thông tin sản phẩm, bao gồm mã sản phẩm, tên sản phẩm, mô tả, giá bán và số lượng. Các chức năng được triển khai gồm thêm sản phẩm, xem danh sách sản phẩm, xem chi tiết sản phẩm, cập nhật sản phẩm và xóa sản phẩm.

Project được xây dựng bằng **NestJS**. Dữ liệu sản phẩm được lưu trong **MySQL**, cụ thể là database `quan_ly_ban_hang` và bảng `products`. NestJS kết nối trực tiếp đến MySQL thông qua thư viện `mysql2`.

## Chức năng đã thực hiện

- Thêm sản phẩm mới.
- Xem danh sách sản phẩm.
- Xem chi tiết một sản phẩm theo id.
- Cập nhật thông tin sản phẩm.
- Xóa sản phẩm.
- Xây dựng file SQL cho cơ sở dữ liệu.
- Chạy file SQL trên hệ quản trị CSDL local bằng phpMyAdmin.
- Kết nối API CRUD của NestJS với bảng `products` trong MySQL.

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

| File                     | Nội dung                                                       |
| ------------------------ | -------------------------------------------------------------- |
| `main.ts`                | Khởi động ứng dụng NestJS trên cổng 3000                       |
| `app.module.ts`          | Khai báo module chính của ứng dụng                             |
| `products.module.ts`     | Module riêng cho chức năng quản lý sản phẩm                    |
| `products.controller.ts` | Khai báo các API CRUD của sản phẩm                             |
| `products.service.ts`    | Xử lý logic CRUD và truy vấn dữ liệu từ MySQL                  |
| `create-product.dto.ts`  | Mô tả dữ liệu khi thêm sản phẩm                                |
| `update-product.dto.ts`  | Mô tả dữ liệu khi cập nhật sản phẩm                            |
| `product.entity.ts`      | Mô tả các thuộc tính của sản phẩm                              |
| `quan_ly_ban_hang.sql`   | File SQL tạo database, tạo bảng `products` và thêm dữ liệu mẫu |

## Cơ sở dữ liệu

Project sử dụng MySQL với database:

```text
quan_ly_ban_hang
```

Bảng chính được sử dụng:

```text
products
```

### Cấu trúc bảng products

| Trường        | Kiểu dữ liệu                     | Ý nghĩa           |
| ------------- | -------------------------------- | ----------------- |
| `id`          | INT, AUTO_INCREMENT, PRIMARY KEY | Mã sản phẩm       |
| `name`        | VARCHAR(255)                     | Tên sản phẩm      |
| `description` | TEXT                             | Mô tả sản phẩm    |
| `price`       | DECIMAL(10,2)                    | Giá sản phẩm      |
| `quantity`    | INT                              | Số lượng sản phẩm |

### File SQL

File SQL của project là:

```text
quan_ly_ban_hang.sql
```

Nội dung file SQL dùng để tạo database `quan_ly_ban_hang`, tạo bảng `products` và thêm dữ liệu mẫu phục vụ kiểm thử API.

```sql
CREATE DATABASE IF NOT EXISTS quan_ly_ban_hang
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE quan_ly_ban_hang;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL
);

INSERT INTO products (name, description, price, quantity)
VALUES
('Ao thun', 'Ao thun cotton', 150000, 20),
('Quan jean', 'Quan jean xanh', 300000, 10);
```

## Kết nối NestJS với MySQL

Trong `products.service.ts`, project sử dụng `mysql2/promise` để tạo kết nối đến MySQL.

````ts
const pool = createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
});
`
Các câu lệnh CRUD được thực hiện trực tiếp trên bảng:

/ text
quan_ly_ban_hang.products
/

Service có xử lý tạo database và bảng nếu chưa tồn tại, sau đó thực hiện các câu lệnh `SELECT`, `INSERT`, `UPDATE`, `DELETE` để thao tác với dữ liệu sản phẩm.

## API CRUD đã thực hiện

| Chức năng | Method | Endpoint | Mô tả |
|---|---|---|---|
| Create | POST | `/products` | Thêm sản phẩm mới vào bảng `products` |
| Read | GET | `/products` | Xem danh sách sản phẩm |
| Read detail | GET | `/products/:id` | Xem chi tiết một sản phẩm theo id |
| Update | PUT | `/products/:id` | Cập nhật thông tin sản phẩm |
| Delete | DELETE | `/products/:id` | Xóa sản phẩm theo id |

## Cách chạy project

### 1. Cài thư viện

```bash
npm install
````

Nếu chưa có thư viện kết nối MySQL thì cài thêm:

```bash
npm install mysql2
```

### 2. Chạy MySQL

Mở XAMPP và bật:

```text
Apache
MySQL
```

Sau đó vào phpMyAdmin:

```text
http://localhost/phpmyadmin
```

Chạy file SQL `quan_ly_ban_hang.sql` để tạo database và bảng dữ liệu.

### 3. Chạy ứng dụng NestJS

```bash
npm run start:dev
```

Sau khi chạy thành công, truy cập:

```text
http://localhost:3000/products
```

Nếu API trả về dữ liệu sản phẩm từ bảng `products` thì kết nối MySQL đã hoạt động.

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
Invoke-RestMethod -Uri "http://localhost:3000/products" -Method Post -ContentType "application/json" -Body '{"name":"Giay the thao","description":"Giay the thao nam","price":500000,"quantity":5}'
```

### Cập nhật sản phẩm

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/1" -Method Put -ContentType "application/json" -Body '{"name":"Ao thun cap nhat","description":"Ao thun cotton da cap nhat","price":180000,"quantity":15}'
```

### Xóa sản phẩm

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/3" -Method Delete
```

## Ghi chú

Project đã chuyển từ dữ liệu mẫu trong mảng sang thao tác dữ liệu trực tiếp trong MySQL. Dữ liệu sản phẩm được lưu tại bảng `products` của database `quan_ly_ban_hang`.

README này mô tả phần công việc cá nhân thực hiện CRUD cho đối tượng Product / Sản phẩm trong bài kiểm tra giữa kỳ môn Web nâng cao.
