import {
  Module,
  VuexModule,
  Mutation,
  Action,
  // <!-- DATA_START -->
  getModule,
  // <!-- DATA_END -->
} from 'vuex-module-decorators';
import Cookies from 'js-cookie';
import {
  SIGN_ON,
  SIGN_OUT,
  AUTHENTICATION_FAILURE,
} from '../constants/mutation-types';
import {
  SUBMIT_AUTHENTICATION,
  // <!-- DATA_START -->
  FETCH_DATA,
  // <!-- DATA_END -->
} from '../constants/action-types';
import LoginHelper from '@/store/helpers/LoginHelper';
import { IApiConfig, ILoginPayload, isError } from '@/interfaces/loginConfig';
import router from '@/router';
// <!-- DATA_START -->
import DataModule from '@/store/modules/DataModule';
// <!-- DATA_END -->

@Module({ namespaced: true, name: 'LoginModule' })
export default class LoginModule extends VuexModule {
  public isLoggedIn: boolean = !!Cookies.get('token');
  public failedToAuthenticate: boolean = false;
  public backendURL: string = 'https://exampleapiurl';
  public apiConfig: IApiConfig = {
    headers: { Authorization: `Bearer ${Cookies.get('token') || 'null'}` },
  };

  @Mutation
  public [SIGN_ON](payload: { token: string }): void {
    this.apiConfig.headers.Authorization = `Bearer ${payload.token}`;
    this.isLoggedIn = true;
    // use (router as any) because of a types issue
    router.push((router as any).history.current.query.redirect || '/');
  }
  @Mutation
  public [SIGN_OUT](): void {
    if (this.isLoggedIn === false) {
      return;
    }
    this.isLoggedIn = false;
    Cookies.remove('token');
    this.apiConfig.headers.Authorization = 'Bearer null';
    router.push({
      path: '/login',
      // use (router as any) because of a types issue
      query: { redirect: (router as any).history.current.path },
    });
  }
  @Mutation
  public [AUTHENTICATION_FAILURE](payload: { failure: boolean }): void {
    this.failedToAuthenticate = payload.failure;
  }

  @Action
  public async [SUBMIT_AUTHENTICATION](payload: ILoginPayload): Promise<void> {
    // <!-- DATA_START -->
    const dataModule = getModule(DataModule);
    // <!-- DATA_END -->
    this[AUTHENTICATION_FAILURE]({ failure: false });
    try {
      const authenticationResponse = await LoginHelper.submitAuthentication(
        payload
      );
      if (isError(authenticationResponse)) {
        console.error('Failed to login', authenticationResponse.error);
        this[AUTHENTICATION_FAILURE]({ failure: true });
      } else {
        Cookies.set('token', authenticationResponse.access_token, {
          expires: 1,
        });
        this[SIGN_ON]({ token: authenticationResponse.access_token });
        // <!-- DATA_START -->
        dataModule[FETCH_DATA]().catch(error => console.error(error));
        // <!-- DATA_END -->
      }
    } catch (error) {
      console.error(error);
    }
  }
}
