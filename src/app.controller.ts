import { Controller, Get } from "@nestjs/common";
import { DataSource } from "typeorm";

@Controller()
export class AppController {
    constructor(private dataSource: DataSource) { }

    @Get()
    async checkHealth(): Promise<string> {
        if (!this.dataSource.isInitialized) {
            return 'API is not connected to database';
        }
        return 'API is healthy';
    }
}