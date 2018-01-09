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

import {format} from 'util';
import chalk from 'chalk';


export default class CliLogger {

    static readonly prefix = '   electron-app-cli';
    static readonly sep = chalk.gray('·');


    static log(...args: any[]): void {
        const msg = format.apply(format, args);
        console.log(chalk.white(CliLogger.prefix), CliLogger.sep, msg)
    }

    static fatal(...args: any[]): void {
        if (args[0] instanceof Error) {
            args[0] = args[0].message.trim()
        }

        const msg = format.apply(format, args);
        console.error(chalk.red(CliLogger.prefix), CliLogger.sep, msg);
        process.exit(1)
    }

    static success(...args: any[]) {
        const msg = format.apply(format, args);
        console.log(chalk.white(CliLogger.prefix), CliLogger.sep, msg)
    }
}
