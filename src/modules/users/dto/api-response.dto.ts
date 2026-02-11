// API response DTO
export class ApiResponseDto<T> {
    statusCode: number;
    status: boolean;
    message: string;
    data: T;
}