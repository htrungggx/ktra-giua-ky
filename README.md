# Phat trien phan mem quan ly ban hang

## Thong tin

- Mon hoc: Web nang cao
- Framework: NestJS
- Doi tuong ca nhan thuc hien: Product / San pham
- File CSDL: quan_ly_ban_hang.sql

## Chuc nang CRUD san pham

| Chuc nang | Method | API |
|---|---|---|
| Them san pham | POST | /products |
| Xem danh sach san pham | GET | /products |
| Xem chi tiet san pham | GET | /products/:id |
| Cap nhat san pham | PUT | /products/:id |
| Xoa san pham | DELETE | /products/:id |

## Cai dat

```bash
npm install
```

## Chay project

```bash
npm run start:dev
```

Sau khi chay, truy cap API tai:

```text
http://localhost:3000/products
```

## Test nhanh API

### Create

POST http://localhost:3000/products

```json
{
  "name": "Giay the thao",
  "description": "Giay the thao nam",
  "price": 500000,
  "quantity": 5
}
```

### Read

GET http://localhost:3000/products

### Update

PUT http://localhost:3000/products/1

```json
{
  "name": "Ao thun cap nhat",
  "description": "Ao thun cotton cao cap",
  "price": 180000,
  "quantity": 30
}
```

### Delete

DELETE http://localhost:3000/products/1
