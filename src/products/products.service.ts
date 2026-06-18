import { Injectable, NotFoundException } from "@nestjs/common";
import { createPool } from "mysql2/promise";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

const pool = createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "123123123",
  waitForConnections: true,
  connectionLimit: 10,
});

@Injectable()
export class ProductsService {
  private async initDatabase() {
    await pool.query(`
      CREATE DATABASE IF NOT EXISTS quan_ly_ban_hang
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS quan_ly_ban_hang.products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL
      )
    `);

    const [rows]: any = await pool.query(
      "SELECT COUNT(*) AS total FROM quan_ly_ban_hang.products",
    );

    if (rows[0].total === 0) {
      await pool.query(`
        INSERT INTO quan_ly_ban_hang.products 
        (name, description, price, quantity)
        VALUES
        ('Ao thun', 'Ao thun cotton', 150000, 20),
        ('Quan jean', 'Quan jean xanh', 300000, 10)
      `);
    }
  }

  async create(createProductDto: CreateProductDto) {
    await this.initDatabase();

    const { name, description, price, quantity } = createProductDto;

    const [result]: any = await pool.execute(
      `INSERT INTO quan_ly_ban_hang.products 
       (name, description, price, quantity) 
       VALUES (?, ?, ?, ?)`,
      [name, description, price, quantity],
    );

    return this.findOne(result.insertId);
  }

  async findAll() {
    await this.initDatabase();

    const [rows] = await pool.query(
      "SELECT * FROM quan_ly_ban_hang.products ORDER BY id ASC",
    );

    return rows;
  }

  async findOne(id: number) {
    await this.initDatabase();

    const [rows]: any = await pool.execute(
      "SELECT * FROM quan_ly_ban_hang.products WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException("Không tìm thấy sản phẩm");
    }

    return rows[0];
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.initDatabase();
    await this.findOne(id);

    const { name, description, price, quantity } = updateProductDto;

    await pool.execute(
      `UPDATE quan_ly_ban_hang.products
       SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        quantity = COALESCE(?, quantity)
       WHERE id = ?`,
      [name ?? null, description ?? null, price ?? null, quantity ?? null, id],
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.initDatabase();
    await this.findOne(id);

    await pool.execute("DELETE FROM quan_ly_ban_hang.products WHERE id = ?", [
      id,
    ]);

    return {
      message: "Xóa sản phẩm thành công",
      id,
    };
  }
}
