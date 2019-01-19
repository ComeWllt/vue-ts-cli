import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import Customisation from './Customisation';
import Inquirer from './Inquirer';
import Setup from './Setup';

export default class App {
  public static run(): App {
    return new App();
  }

  constructor() {
    this.launchCli();
    this.createProject().catch(error => console.log(error));
  }

  private launchCli(): void {
    clear();
    console.log('\n');
    console.log(chalk.magentaBright(figlet.textSync('Front - End CLI')));
  }

  private async createProject(): Promise<void> {
    const projectDetails = await Inquirer.askProjectDetails();
    const componentDetails = await Inquirer.askComponentsDetails(
      projectDetails.components
    );
    Setup.createFolder(projectDetails.title);
    process.chdir(projectDetails.title);
    Setup.addCodeBase();
    Customisation.customiseCodeBase({ ...projectDetails, ...componentDetails });
    Setup.installModules();
    Setup.initGitAndCommit();
  }
}
