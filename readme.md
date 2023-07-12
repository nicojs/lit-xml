<p align="center">
  <img width="200" height="200" src="https://raw.githubusercontent.com/nicojs/lit-xml/master/packages/vscode-lit-xml/images/icon.png">
</p>

Welcome to the Lit XML monorepo. Info about contributing and building the application can be found here.

For more information about Lit XML, please see [that readme](https://github.com/nicojs/lit-xml/tree/master/packages/lit-xml#readme).

## Local development

The easiest way to setup local development is using vscode. The vscode config files are checked in with this repo.
Please install the recommended extensions listed in ".vscode/extensions.json".

Some quick notes to help you get started:

1. Use `CTRL+Shift+B` (or `⌘+Shift+B` on OSX) to run the _build task_. This runs `npm start` which in turn runs `tsc -b --watch`, compiling any changes you make in the background.
1. Use `CTRL+Shift+D` (or `⌘⇧D` on OSX) to open up the _debug_ pane. Here you can select a config to run. For example: select "Unit tests" to run unit tests.

- You can run the tests with `CTRL+F5` (or `⌃F5` on OSX).
- You can debug the tests with `F5` (also `F5` on OSX). Setting breakpoints in your code and inspecting variables all work as expected.

## Publish a new version

Publishing a new version to NPM runs in a github workflow. Run `npx lerna version` to create the version in git. The workflow takes care of the rest.
