import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import axios, { AxiosError } from 'axios';
import VueAxios from 'vue-axios';
import {
  SHOW_REQUEST_ERROR,
  // <!-- LOGIN_START -->
  SIGN_OUT,
  // <!-- LOGIN_END -->
} from '@/store/constants/mutation-types';
import ErrorModule from '@/store/modules/ErrorModule';
// <!-- LOGIN_START -->
import LoginModule from '@/store/modules/LoginModule';
// <!-- LOGIN_END -->

Vue.use(VueAxios, axios);

Vue.axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const errorModule = getModule(ErrorModule);
    // <!-- LOGIN_START -->
    const loginModule = getModule(LoginModule);
    // <!-- LOGIN_END -->
    if (!error.response) {
      errorModule[SHOW_REQUEST_ERROR]({
        errorText: 'Oops, there has been an error...',
      });
      return Promise.reject(error);
    }
    switch (error.response.status) {
      // <!-- LOGIN_START -->
      case 401:
        errorModule[SHOW_REQUEST_ERROR]({
          errorText: 'Your credentials have expired...',
        });
        loginModule[SIGN_OUT]();
        return Promise.reject(error);
      // <!-- LOGIN_END -->
      default:
        errorModule[SHOW_REQUEST_ERROR]({
          errorText: 'Oops, there has been an error...',
        });
        return Promise.reject(error);
    }
  }
);
