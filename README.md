# Vue.js/Vuex/TypeScript CLI

Dedicated CLI to bootstrap Front-End projects.
See Front-End [documentation](/lib/README.md) for more info about the template.

### Installation and usage

```
npm run scratch
create-front
```

### Development of the template codebase

To modify the Front-End codebase, just work in the _/lib_ directory as for a normal Front-End project. You should open a VS Code window with _/lib_ as root not to have any conflict with different VS Code settings files.

```
cd lib
npm install
```

### Lints and fixes files

```
npm run lint
```

### Unit tests

```
npm run test
```

### Main dependencies

- The project is written using [Typescript](https://typescriptlang.org).
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/), [Chalk](https://github.com/chalk/chalk), [clui](https://github.com/nathanpeck/clui), [FIGlet](https://github.com/cmatsuoka/figlet) and [Clear](https://github.com/bahamas10/node-clear) for a nice-looking command line interface.
- [ShellJS](https://github.com/shelljs/shelljs) to run Unix shell commands from Node.js.
- Tests use [Mocha](https://mochajs.org/#installation) and [Chai](https://www.chaijs.com/).
- [TSLint](https://palantir.github.io/tslint/) and [Prettier](https://prettier.io/) for TypeScript linting.
