import axios, { AxiosResponse } from 'axios';
import store from '@/store/index';
import { IExampleData } from '@/interfaces/data';

export default class ApiCallsHelper {
  public static async fetchData(): Promise<IExampleData[]> {
    const apiConfig = store.state.LoginModule.apiConfig;
    const backendURL = store.state.LoginModule.backendURL;
    const result: AxiosResponse<IExampleData[]> = await axios.get(
      `${backendURL}/exampledata`,
      apiConfig
    );
    return result.data;
  }
}
