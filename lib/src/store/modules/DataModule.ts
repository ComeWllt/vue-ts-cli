import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { IS_LOADING_DATA, SET_DATA } from '../constants/mutation-types';
import { FETCH_DATA } from '../constants/action-types';
import ApiCallsHelper from '@/store/helpers/ApiCallsHelper';
import FormatHelper from '@/store/helpers/FormatHelper';
import { IFormattedExampleData, IExampleData } from '@/interfaces/data';

@Module({ namespaced: true, name: 'DataModule' })
export default class DataModule extends VuexModule {
  public isLoadingData: boolean = false;
  public exampleData: IExampleData[] = [];

  @Mutation
  public [IS_LOADING_DATA](payload: { isLoading: boolean }): void {
    this.isLoadingData = payload.isLoading;
  }

  @Mutation
  public [SET_DATA](payload: { data: IExampleData[] }): void {
    this.exampleData = payload.data;
  }

  @Action
  public async [FETCH_DATA](): Promise<void> {
    this[IS_LOADING_DATA]({ isLoading: true });
    try {
      const data = await ApiCallsHelper.fetchData();
      this[SET_DATA]({ data });
    } catch (error) {
      console.error(error);
    }
    this[IS_LOADING_DATA]({ isLoading: false });
  }

  get data(): IFormattedExampleData[] {
    return FormatHelper.parseExampleData(this.exampleData);
  }
}
