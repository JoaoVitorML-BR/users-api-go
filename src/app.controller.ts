import { Controller, Get } from "@nestjs/common";
import { DataSource } from "typeorm/browser/data-source/index.js";

@Controller()
export class AppController {
    constructor(private dataSource: DataSource) { }

    @Get()
    async checkHealth(): Promise<string> {
        try {
            await this.dataSource.initialize();
            console.log('Data Source has been initialized!');
            return 'API is healthy';
        } catch (err) {
            console.error('Error during Data Source initialization:', err);
            throw err;
        }
    }
}