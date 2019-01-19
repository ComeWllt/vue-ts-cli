import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';

import ErrorModule from '@/store/modules/ErrorModule';
import ExampleModule from '@/store/modules/ExampleModule';
// <!-- LOGIN_START -->
import LoginModule from '@/store/modules/LoginModule';
// <!-- LOGIN_END -->
// <!-- DATA_START -->
import DataModule from '@/store/modules/DataModule';
// <!-- DATA_END -->

Vue.use(Vuex);

interface IStore {
  ErrorModule: ErrorModule;
  ExampleModule: ExampleModule;
  // <!-- LOGIN_START -->
  LoginModule: LoginModule;
  // <!-- LOGIN_END -->
  // <!-- DATA_START -->
  DataModule: DataModule;
  // <!-- DATA_END -->
}

const store = new Vuex.Store<IStore>({
  mutations: {},
  actions: {},
  modules: {
    ErrorModule,
    ExampleModule,
    // <!-- LOGIN_START -->
    LoginModule,
    // <!-- LOGIN_END -->
    // <!-- DATA_START -->
    DataModule,
    // <!-- DATA_END -->
  },
});

export default store;

// Vuex modules and store must be linked for actions to work properly.
getModule(ErrorModule, store);
getModule(ExampleModule, store);
// <!-- LOGIN_START -->
getModule(LoginModule, store);
// <!-- LOGIN_END -->
// <!-- DATA_START -->
getModule(DataModule, store);
// <!-- DATA_END -->
