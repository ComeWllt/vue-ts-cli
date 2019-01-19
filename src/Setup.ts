import chalk from 'chalk';
import clui from 'clui';
import fs from 'fs';
import shelljs from 'shelljs';

const Spinner = clui.Spinner;

export default class Setup {
  public static directoryExists(filePath: string): boolean {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }

  public static createFolder(folderName: string): void {
    if (this.directoryExists(folderName)) {
      console.log(
        chalk.red(
          `The folder "${folderName}" already exists at the current path (${process.cwd()}).`
        )
      );
      process.exit();
    }
    shelljs.mkdir(folderName);
  }

  public static addCodeBase(): void {
    shelljs.cp('-r', `${__dirname}/../../lib/*`, process.cwd());
    shelljs.cp('-r', `${__dirname}/../../lib/.*`, process.cwd());
  }

  public static initGitAndCommit(): void {
    shelljs.exec('git init', { silent: true });
    shelljs.exec('git add .', { silent: true });
    shelljs.exec('git commit -m "Initial commit"', { silent: true });
  }

  public static installModules(): void {
    const status = new Spinner('Installing modules...');
    status.start();
    shelljs.exec('npm install', { async: true, silent: true }, () => {
      status.stop();
      console.log(chalk.yellowBright('Success!'));
    });
  }
}
