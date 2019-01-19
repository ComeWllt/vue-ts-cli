export interface IApiConfig {
  headers: {
    Authorization: string;
  };
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface ILoginError {
  error: string;
}

export function isError(
  resp: ILoginResponse | ILoginError
): resp is ILoginError {
  return (resp as Partial<ILoginError>).error !== undefined;
}
