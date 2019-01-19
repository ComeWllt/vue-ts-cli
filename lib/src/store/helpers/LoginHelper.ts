import axios, { AxiosResponse } from 'axios';
import queryString from 'querystring';
import {
  ILoginPayload,
  ILoginResponse,
  ILoginError,
} from '@/interfaces/loginConfig';

export default class LoginHelper {
  public static async submitAuthentication(
    payload: ILoginPayload
  ): Promise<ILoginResponse | ILoginError> {
    const result: AxiosResponse<
      ILoginResponse | ILoginError
    > = await axios.post(
      this.backendAuthURL,
      queryString.stringify({
        grant_type: 'password',
        username: payload.username,
        password: payload.password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return result.data;
  }
  private static backendAuthURL = 'https://exampleapiurl/login';
}
