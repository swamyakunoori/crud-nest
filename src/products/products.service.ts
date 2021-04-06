import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDTo } from './product.dto';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
    private products: ProductDTo[] = [];

    insertProduct(product: ProductDTo) {
        this.products.push(product);
        return { id: Date.now() };
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(id: number) {
        const product = this.findProduct(id)[0]
        return product;
    }

    updateProduct(id: number, product: ProductDTo) {
        const [producta,index] = this.findProduct(id)
        this.products[index] = product;
        this.products[index].id=id;
        return this.products[index]
    }

    deleteProduct(id: number){
        const index = this.findProduct(id)[1]
        this.products.splice(index,1);
    }

    private findProduct(id: number): [ProductDTo, number] {
        const productIndex = this.products.findIndex(prod => prod.id == id)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Product not Found');
        }
        return [product, productIndex];
    }
}