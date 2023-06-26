# TALACHA APP

[![Netlify Status](https://api.netlify.com/api/v1/badges/a615386a-d57a-4f05-ba21-7205f7e5d7ec/deploy-status)](https://app.netlify.com/sites/talachapp/deploys)

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## COMMIT STRUCUTRE

| Type     | Definition                                            |
| -------- | ----------------------------------------------------- |
| feat     | When new features are added                           |
| fix      | Correction of some error                              |
| build    | Build system changes                                  |
| chore    | Changes that do not affect the production environment |
| ci       | Continuous Integration configuration changes          |
| docs     | Documentation Changes                                 |
| perf     | Application performance improvements                  |
| refactor | Code refactoring processes                            |
| revert   | Rollbacks to a previous commit                        |
| style    | Style changes in the application                      |
| sintax   | Code syntax changes                                   |
| test     | Add or correct test                                   |

## Example

```sh
fix (button) = Change of any button
```

```sh
fix (User) = Change in an entity
```

If the commit has a change that makes it incompatible with the new version, for example the ORM change, the commit will be created as follows:

```sh
fix (database)! = If you have the "!" at the end it means that it is a breaking change
```

and finally add a short message:

```sh
fix (UserController): Changing the HTTP method used in /register
```
