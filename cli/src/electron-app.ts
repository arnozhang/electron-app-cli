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


new Command()
    .version(require('../package').version)
    .usage('<command> [options]')
    .command('init', 'generate a new Electron app project')
    .parse(process.argv);
