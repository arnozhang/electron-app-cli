/**
 * Electron app cli project.
 *
 * Copyright 2016-2016 Arno Zhang <zyfgood12@163.com>
 *
 * Licensed under the MIT License;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://opensource.org/licenses/MIT
 *
 */

import {Command} from 'commander';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import CliLogger from "./CliLogger";
import CliGenerator from "./CliGenerator";

const exists = fs.existsSync;


const program = new Command();


/**
 * Help.
 */

program.on('--help', function () {
    console.log('  Examples:');
    console.log();
    console.log(chalk.gray('    # create a new project for Electron app template'));
    console.log('    $ electron-app init my-project');
    console.log();
});

/**
 * Help.
 */

function help() {
    program.parse(process.argv);
    if (program.args.length < 1) {
        return program.help();
    }
}

help();


/**
 * Settings.
 */

const projectName = program.args[0];
const hasSlash = projectName.indexOf('/') > -1;

const projectPath = program.args[1];
const inPlace = !projectPath || projectPath === '.';
const name = inPlace ? path.relative('../', process.cwd()) : projectPath;
const to = path.resolve(projectPath || '.');
const clone = program.clone || false;


/**
 * Padding.
 */

console.log();
process.on('exit', () => {
    console.log()
});


if (exists(to)) {
    inquirer.prompt([{
        type: 'confirm',
        message: inPlace
            ? 'Generate project in current directory?'
            : 'Target directory exists. Continue?',
        name: 'ok'
    }]).then((answers: any) => {
        if (answers.ok) {
            run()
        }
    }).catch(CliLogger.fatal);
} else {
    run()
}

/**
 * Check, download and generate the project.
 */

function run() {
    new CliGenerator(name, projectName, program).generate(to);
}
