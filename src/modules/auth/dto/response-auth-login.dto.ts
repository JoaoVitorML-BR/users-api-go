export class ResponseAuthLoginDTO {
    user: {
        id: string;
        name: string;
        username: string;
        email: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}