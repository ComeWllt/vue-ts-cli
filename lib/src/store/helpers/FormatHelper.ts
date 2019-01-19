import { IFormattedExampleData, IExampleData } from '@/interfaces/data';

export default class FormatHelper {
  public static parseExampleData(
    list: IExampleData[]
  ): IFormattedExampleData[] {
    return list.map(el => ({ ...el, id: parseInt(el.id, 10) }));
  }
}
