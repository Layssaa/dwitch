import { ICheckPassword } from "./types";

export function checkPassword({ password, repeatPassword }: ICheckPassword) {
  return password === repeatPassword;
}
