import inquirer from 'inquirer';
import { IComponentsDetails, IProjectDetails } from './interfaces/interfaces';

export default class Inquirer {
  public static askProjectDetails(): Promise<IProjectDetails> {
    const questions = [
      {
        default: null,
        message: 'Enter a name for the project:',
        name: 'title',
        type: 'input',
        validate(value: string) {
          if (value.length) {
            return true;
          }
          return 'Please enter a name for the project.';
        },
      },
      {
        default: null,
        message: 'Optionally enter a description of the project:',
        name: 'description',
        type: 'input',
      },
      {
        default: null,
        message: 'Enter your name:',
        name: 'name',
        type: 'input',
        validate(value: string) {
          if (value.length) {
            return true;
          }
          return 'Please enter your name.';
        },
      },
      {
        choices: [
          'Login Module',
          'PatchNotes Page',
          'ECharts Plugin',
          'Google Maps Plugin',
        ],
        default: [],
        message:
          'Select the components you want to install: \n(Some other components will be suggested if you select the Login module)',
        name: 'components',
        type: 'checkbox',
      },
    ];
    return inquirer.prompt(questions);
  }

  public static askComponentsDetails(
    components: string[]
  ): Promise<IComponentsDetails> {
    const questions = [];
    const mapApiKeyQuestion = {
      default: null,
      message: 'Enter a Google Map API key:',
      name: 'mapKey',
      type: 'password',
      validate(value: string) {
        if (value.length) {
          return true;
        }
        return 'Please enter a Google Map API key.';
      },
    };
    const loginDependentComponents = {
      choices: ['Data Fetching Module'],
      default: [],
      message: 'Select the login-dependent components you want to install:',
      name: 'loginDependentComponents',
      type: 'checkbox',
    };
    if (components.includes('Login Module')) {
      questions.push(loginDependentComponents);
    }
    if (components.includes('Google Maps Plugin')) {
      questions.push(mapApiKeyQuestion);
    }
    return inquirer.prompt(questions);
  }
}
