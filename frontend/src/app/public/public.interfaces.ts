export interface UserI{
    id?:number;
    email?:string;
    username?:string;
    password?:string;
}

export interface LoginResponseI{
    access_token:string;
    token_type:string;
    expires_in:number;
}
  