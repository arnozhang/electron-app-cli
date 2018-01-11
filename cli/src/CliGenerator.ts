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

import * as fs from 'fs';
import * as Ora from 'ora';
import * as path from 'path';
import chalk from 'chalk';
import CliLogger from './CliLogger';

const tildify = require('tildify');
const xpackage = require('xpackage');


const npm = xpackage.getnpm(['cnpm', 'npm']);


export default class CliGenerator {

    static readonly cliTemplatePackage = 'electron-app-cli-template';


    private mName: string;
    private mProjectName: string;
    private mProgram: any;
    private mAuthor: string;


    constructor(name: string, projectName: string, program: any, author: string) {
        this.mName = name;
        this.mAuthor = author;
        this.mProgram = program;
        this.mProjectName = projectName;
    }

    generate(toPath: string): void {
        toPath = path.join(toPath, this.mProjectName);
        if (!fs.existsSync(toPath)) {
            fs.mkdirSync(toPath);
        }

        const spinner = new Ora();
        spinner.start(chalk.blue('Downloading template: '));
        console.log(chalk.bold(chalk.green(this.mProjectName)));
        console.log(toPath + '\n');

        xpackage.pack(CliGenerator.cliTemplatePackage, npm)
            .then((fileName: string) => {
                process.chdir(toPath);
                xpackage.unzip(fileName, toPath)
                    .then(() => {
                        fs.unlinkSync(fileName);
                        spinner.stop();

                        console.log();
                        CliLogger.success(`Download success: ${this.mProjectName}.`);
                        this.generateProject(toPath);
                    })
                    .catch((err: any) => {
                        throw err;
                    });
            });
    }

    generateProject(filePath: string): void {
        this.replacePackageJson(filePath);
        this.replaceFields(filePath);

        this.logSuccess();
    }

    replacePackageJson(filePath: string): void {
        const packagePath = path.join(filePath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packagePath).toString());
        packageJson.name = this.mProjectName;
        packageJson.version = '1.0.0';
        packageJson.description = `This is Electron app template project: ${this.mProjectName}`;
        packageJson.publishConfig = undefined;
        packageJson.files = undefined;

        packageJson.keywords = [
            this.mProjectName,
            'electron-app',
            'electron',
            'react'
        ];

        if (packageJson.repository) {
            packageJson.repository.url = '';
        }

        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 4));

        const readmePath = path.join(filePath, 'README.md');
        fs.writeFileSync(readmePath, `# ${this.mProjectName}\n\n`);
    }

    replaceFields(filePath: string): void {
        const files = [
            'package.json',
            'index.ts',
            'public/css',
            'public/html',
            'app'
        ];

        let format = function (value: number): string {
            if (value >= 10) {
                return '' + value;
            }

            return '0' + value;
        };

        let date = new Date();
        let dateString = `${date.getFullYear()}/${format(date.getMonth() + 1)}/${format(date.getDate())}`;

        for (let name of files) {
            const pathName = path.join(filePath, name);
            this.replaceFileOrPath(pathName, dateString);
        }
    }

    private replaceFileOrPath(pathName: string, dateString: string): void {
        let stat = fs.statSync(pathName);
        if (stat.isDirectory()) {
            fs.readdirSync(pathName).forEach((fileName: string): void => {
                let fullPath = path.join(pathName, fileName);
                this.replaceFileOrPath(fullPath, dateString);
            });
        } else if (stat.isFile()) {
            let content = fs.readFileSync(pathName).toString();

            content = content.replace(/\$\[\[ProjectName]]/g, this.mProjectName);
            content = content.replace(/\$\[\[Author]]/g, this.mAuthor);
            content = content.replace(/\$\[\[Date]]/g, dateString);

            fs.writeFileSync(pathName, content);
        }
    }

    logSuccess(): void {
        console.log(chalk.green(chalk.bold('\ngenerate Electron app project successfully, use:\n')));
        console.log(chalk.green('    cd ' + this.mProjectName));
        console.log();
        console.log(chalk.green('    tnpm install') + chalk.blue('           - install dependency packages'));
        console.log(chalk.green('    npm link typescript') + chalk.blue('    - link typescript package'));
        console.log();
        console.log(chalk.green('    webpack') + chalk.blue('                - build templates'));
        console.log();
    }
}
