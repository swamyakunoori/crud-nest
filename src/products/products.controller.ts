import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { ProductDTo } from './product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    addProduct(@Body() product: ProductDTo): any {
        product.id = Date.now();
        const generateId = this.productsService.insertProduct(product);
        return generateId;
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getSingleProduct(id);
    }

    @Patch(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() product: ProductDTo) {
        this.productsService.updateProduct(id, product)
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id', ParseIntPipe) id: number) { 
        this.productsService.deleteProduct(id);
        return null;
    }
}