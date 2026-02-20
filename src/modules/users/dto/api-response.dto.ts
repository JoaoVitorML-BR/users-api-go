// API response DTO
export class ApiResponseDto<T> {
    statusCode: number;
    code?: string;
    status: boolean;
    message: string;
    data?: T | null;
}