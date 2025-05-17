export type IExpiresTime = "24h" | "1w";

export interface IAuthCodeGenerate {
    email: string;
    userId: string;
    expiresIn?: IExpiresTime;
}

export interface IAuthVerify {
    token: string;
}