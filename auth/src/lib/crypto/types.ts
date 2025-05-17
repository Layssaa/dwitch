export interface IValidatePassword {
  password: string;
  hash: string;
}

export interface IGeneratePasswordCripto {
  password: string;
}

export interface ICheckPassword {
    password: string;
    repeatPassword: string;
  }