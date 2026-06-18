# Bài kiểm tra giữa kỳ - Web nâng cao

## 1. Thông tin chung

- **Sinh viên:** Nguyễn Hữu Trung
- **Lớp:** N01.LT2
- **Môn học:** Web nâng cao
- **Framework sử dụng:** NestJS
- **Tên project:** Phát triển phần mềm quản lý bán hàng
- **Đối tượng cá nhân thực hiện:** Product / Sản phẩm
- **File cơ sở dữ liệu:** `quan_ly_ban_hang.sql`
- **Link repository:** https://github.com/htrungggx/ktra-giua-ky

## 2. Mục tiêu thực hiện

Project này được làm cho bài kiểm tra giữa kỳ môn Web nâng cao. Phần em thực hiện là xây dựng chức năng CRUD cho đối tượng **Sản phẩm** trong hệ thống quản lý bán hàng.

Nội dung đã làm gồm:

- Tạo cấu trúc project NestJS.
- Xây dựng module `products`.
- Viết `Controller`, `Service`, `DTO` và `Entity` cho sản phẩm.
- Tạo đủ 4 chức năng: thêm, xem, cập nhật và xóa sản phẩm.
- Chuẩn bị file SQL mô tả bảng `products` trong cơ sở dữ liệu.
- Viết README và tài liệu nộp bài kèm lưu đồ thuật toán CRUD.

## 3. Cấu trúc thư mục chính

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

Ý nghĩa một số file chính:

| File | Nội dung |
|---|---|
| `products.controller.ts` | Nhận request từ người dùng và gọi service xử lý |
| `products.service.ts` | Chứa logic thêm, đọc, cập nhật, xóa sản phẩm |
| `create-product.dto.ts` | Quy định dữ liệu đầu vào khi thêm sản phẩm |
| `update-product.dto.ts` | Quy định dữ liệu đầu vào khi cập nhật sản phẩm |
| `product.entity.ts` | Mô tả các thuộc tính cơ bản của sản phẩm |
| `quan_ly_ban_hang.sql` | File SQL tạo database và bảng `products` |

## 4. Cơ sở dữ liệu

Tên database sử dụng trong bài:

```sql
quan_ly_ban_hang
```

Bảng chính của phần cá nhân:

```sql
products
```

Các trường dữ liệu của bảng `products`:

| Trường | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|
| `id` | INT, AUTO_INCREMENT | Mã sản phẩm |
| `name` | VARCHAR(255) | Tên sản phẩm |
| `description` | TEXT | Mô tả sản phẩm |
| `price` | DECIMAL(10,2) | Giá sản phẩm |
| `quantity` | INT | Số lượng tồn kho |

## 5. Các API đã xây dựng

| Chức năng | Method | Endpoint | Mô tả |
|---|---|---|---|
| Thêm sản phẩm | POST | `/products` | Tạo một sản phẩm mới |
| Xem danh sách | GET | `/products` | Lấy toàn bộ danh sách sản phẩm |
| Xem chi tiết | GET | `/products/:id` | Lấy thông tin một sản phẩm theo id |
| Cập nhật | PUT | `/products/:id` | Cập nhật thông tin sản phẩm |
| Xóa | DELETE | `/products/:id` | Xóa sản phẩm theo id |

## 6. Cách chạy project

Cài thư viện:

```bash
npm install
```

Chạy project:

```bash
npm run start:dev
```

Sau khi chạy thành công, server hoạt động tại:

```text
http://localhost:3000
```

Kiểm tra danh sách sản phẩm:

```text
http://localhost:3000/products
```

## 7. Kiểm thử API nhanh

### 7.1. Thêm sản phẩm

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products" -Method Post -ContentType "application/json" -Body '{"name":"Laptop Dell Inspiron","description":"Máy tính xách tay dùng cho quản lý bán hàng","price":15000000,"quantity":5}'
```

### 7.2. Xem danh sách sản phẩm

```text
GET http://localhost:3000/products
```

### 7.3. Xem chi tiết sản phẩm

```text
GET http://localhost:3000/products/1
```

### 7.4. Cập nhật sản phẩm

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/1" -Method Put -ContentType "application/json" -Body '{"name":"Laptop Dell Inspiron 15","description":"Đã cập nhật thông tin sản phẩm","price":14500000,"quantity":7}'
```

### 7.5. Xóa sản phẩm

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/products/1" -Method Delete
```

## 8. Ghi chú phần làm cá nhân

Em chọn đối tượng **Product / Sản phẩm** vì đây là đối tượng cơ bản trong bài toán quản lý bán hàng. Một sản phẩm cần có tên, mô tả, giá bán và số lượng. Các chức năng CRUD giúp người quản trị có thể thêm sản phẩm mới, xem danh sách sản phẩm đang có, chỉnh sửa thông tin khi cần và xóa sản phẩm không còn sử dụng.

Phần code được tổ chức theo cấu trúc của NestJS để tách rõ từng trách nhiệm: Controller nhận request, Service xử lý nghiệp vụ, DTO mô tả dữ liệu đầu vào và Entity mô tả dữ liệu sản phẩm.
