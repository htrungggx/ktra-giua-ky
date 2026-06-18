import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Ao thun',
      description: 'Ao thun cotton',
      price: 150000,
      quantity: 20,
    },
    {
      id: 2,
      name: 'Quan jean',
      description: 'Quan jean xanh',
      price: 300000,
      quantity: 10,
    },
  ];

  private nextId = 3;

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      ...createProductDto,
    };

    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException('Khong tim thay san pham');
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    Object.assign(product, updateProductDto);
    return product;
  }

  remove(id: number) {
    const product = this.findOne(id);
    this.products = this.products.filter((item) => item.id !== id);

    return {
      message: 'Xoa san pham thanh cong',
      data: product,
    };
  }
}
