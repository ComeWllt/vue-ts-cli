import shelljs from 'shelljs';
import { IComponentsDetails, IProjectDetails } from './interfaces/interfaces';

export default class Customisation {
  public static customiseCodeBase(
    answers: IProjectDetails & IComponentsDetails
  ): void {
    this.customiseCodeBaseTitle(answers.title);
    this.insertName(answers.name);
    this.customiseCodeBaseDescription(answers.description);
    this.customisePatchNotesInitialDate();
    if (answers.mapKey) this.customiseCodeBaseMapKey(answers.mapKey);
    this.customiseComponents([
      ...answers.components,
      ...(answers.loginDependentComponents || []),
    ]);
  }

  public static insertName(name: string): void {
    shelljs.sed('-i', 'NAME', name, 'src/components/TheFooter.vue');
  }

  private static customiseCodeBaseTitle(title: string): void {
    shelljs.sed('-i', 'vue-typescript-template', title, 'package.json');
    shelljs.sed('-i', 'vue-typescript-template', title, 'package-lock.json');
    shelljs.sed('-i', 'vue-typescript-template', title, 'public/index.html');
    shelljs.sed('-i', 'Vue-TypeScript-Template', title, 'README.md');
    shelljs.sed('-i', 'Front-Template', title, 'src/components/TheNavBar.vue');
  }

  private static customiseCodeBaseDescription(description: string): void {
    shelljs.sed('-i', 'DESCRIPTION', description, 'package.json');
  }

  private static customisePatchNotesInitialDate(): void {
    shelljs.sed(
      '-i',
      'INITIAL_DATE',
      new Date().toLocaleDateString('au'),
      'src/assets/patchNotes.json'
    );
  }

  private static customiseCodeBaseMapKey(mapKey: string): void {
    const fileRoot = 'src/assets/secrets';
    shelljs.exec(
      `sed 's/MAP_API_KEY/${mapKey}/' ${fileRoot}.template.json > ${fileRoot}.json`
    );
  }

  private static customiseComponents(components: string[]): void {
    if (components.includes('Data Fetching Module')) {
      this.cleanDataComments();
    } else {
      this.removeDataComponent();
    }
    if (components.includes('Login Module')) {
      this.cleanLoginComments();
    } else {
      this.removeLoginComponent();
    }
    if (components.includes('PatchNotes Page')) {
      this.cleanPatchNotesComments();
    } else {
      this.removePatchNotesComponent();
    }
    if (components.includes('ECharts Plugin')) {
      this.cleanEchartsComments();
    } else {
      this.removeEchartsComponent();
    }
    if (components.includes('Google Maps Plugin')) {
      this.cleanMapsComments();
    } else {
      this.removeMapsComponent();
    }
  }

  private static removeLoginComponent(): void {
    shelljs.exec('npm uninstall js-cookie --save', { silent: true });
    shelljs.exec('npm uninstall @types/js-cookie --save-dev', { silent: true });
    shelljs.rm('src/views/LoginView.vue');
    shelljs.rm('src/interfaces/loginConfig.ts');
    shelljs.rm('src/store/modules/LoginModule.ts');
    shelljs.rm('src/store/helpers/LoginHelper.ts');
    const files = [
      'src/router.ts',
      'src/components/TheNavBar.vue',
      'src/store/index.ts',
      'src/plugins/vue-axios.ts',
      'src/store/constants/action-types.ts',
      'src/store/constants/mutation-types.ts',
    ];
    this.removeCode(files, 'LOGIN');
    this.replaceInsideCode(
      ' v-if="isLoggedIn"',
      '',
      'src/components/TheNavBar.vue'
    );
  }
  private static cleanLoginComments(): void {
    const files = [
      'src/router.ts',
      'src/components/TheNavBar.vue',
      'src/store/index.ts',
      'src/plugins/vue-axios.ts',
      'src/store/constants/action-types.ts',
      'src/store/constants/mutation-types.ts',
    ];
    this.cleanComponents(files, 'LOGIN');
  }

  private static removePatchNotesComponent(): void {
    shelljs.rm('src/views/PatchNotesView.vue');
    shelljs.rm('src/components/TimelineItem.vue');
    shelljs.rm('src/assets/patchNotes.json');
    shelljs.rm('src/interfaces/patchNotes.ts');
    const files = ['src/components/TheNavBar.vue', 'src/router.ts'];
    this.removeCode(files, 'PATCHNOTES');
  }
  private static cleanPatchNotesComments(): void {
    const files = ['src/components/TheNavBar.vue', 'src/router.ts'];
    this.cleanComponents(files, 'PATCHNOTES');
  }

  private static removeEchartsComponent() {
    shelljs.exec('npm uninstall vue-echarts --save', { silent: true });
    shelljs.rm('src/plugins/vue-echarts.ts');
    shelljs.rm('src/components/examples/ExampleGraph.vue');
    const files = ['src/views/ExampleView.vue', 'src/main.ts'];
    this.removeCode(files, 'ECHARTS');
  }
  private static cleanEchartsComments() {
    const files = ['src/views/ExampleView.vue', 'src/main.ts'];
    this.cleanComponents(files, 'ECHARTS');
  }

  private static removeMapsComponent() {
    shelljs.exec('npm uninstall vue2-google-maps --save', { silent: true });
    shelljs.rm('src/plugins/vue-google-maps.ts');
    shelljs.rm('src/components/examples/ExampleMap.vue');
    shelljs.rm('src/assets/secrets.template.json');
    shelljs.rm('-rf', 'src/typings/vue2-google-maps');
    const files = ['src/views/ExampleView.vue', 'src/main.ts'];
    this.removeCode(files, 'GOOGLEMAPS');
  }
  private static cleanMapsComments() {
    const files = ['src/views/ExampleView.vue', 'src/main.ts'];
    this.cleanComponents(files, 'GOOGLEMAPS');
  }

  private static removeDataComponent() {
    shelljs.rm('src/store/modules/DataModule.ts');
    shelljs.rm('src/store/helpers/ApiCallsHelper.ts');
    shelljs.rm('src/store/helpers/FormatHelper.ts');
    shelljs.rm('src/interfaces/data.ts');
    const files = [
      'src/App.vue',
      'src/store/index.ts',
      'src/store/modules/LoginModule.ts',
      'src/store/constants/action-types.ts',
      'src/store/constants/mutation-types.ts',
    ];
    this.removeCode(files, 'DATA');
  }
  private static cleanDataComments() {
    const files = [
      'src/App.vue',
      'src/store/index.ts',
      'src/store/modules/LoginModule.ts',
      'src/store/constants/action-types.ts',
      'src/store/constants/mutation-types.ts',
    ];
    this.cleanComponents(files, 'DATA');
  }

  private static cleanComponents(files: string[], component: string): void {
    files.map(file => {
      shelljs.exec(
        `sed -i.bak '/<!-- ${component}_START -->/d' ${file} && rm ${file}.bak`
      );
      shelljs.exec(
        `sed -i.bak '/<!-- ${component}_END -->/d' ${file} && rm ${file}.bak`
      );
    });
  }

  private static removeCode(files: string[], component: string): void {
    files.map(file => {
      shelljs.exec(
        `sed -i.bak '/<!-- ${component}_START -->/,/<!-- ${component}_END -->/d' ${file} && rm ${file}.bak`
      );
    });
  }

  private static replaceInsideCode(
    codeToRemove: string,
    codeToReplace: string,
    file: string
  ) {
    shelljs.exec(
      `sed -i.bak 's/${codeToRemove}/${codeToReplace}/g' ${file} && rm ${file}.bak`
    );
  }
}
