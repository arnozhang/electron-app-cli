/**
 * $[[ProjectName]] project.
 *
 * @date $[[Date]]
 */

import * as electron from 'electron';
import WindowWrapper from './WindowWrapper';

const {app, Menu, ipcMain} = electron;


export default class ApplicationMainWindow extends WindowWrapper {

    create(): void {
        let workArea = electron.screen.getPrimaryDisplay().workAreaSize;
        super.createWindow('index.html', app.getName(),
            workArea.width * 3 / 4, workArea.height - 150);
    }

    afterWindowCreated(): void {
        super.afterWindowCreated();

        this.createApplicationMenu();
    }

    private onAboutClicked(): void {
        new WindowWrapper().createWindow('about.html', 'About $[[ProjectName]]', 300, 200);
    }

    private createApplicationMenu(): void {
        const recent: any[] = [];

        const template: any[] = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Open',
                        click() {

                        }
                    },
                    {
                        label: 'Open Recent...',
                        submenu: recent
                    },
                    {
                        type: 'separator'
                    }
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    {role: 'undo'},
                    {role: 'redo'},
                    {type: 'separator'},
                    {role: 'cut'},
                    {role: 'copy'},
                    {role: 'paste'},
                    {role: 'selectall'}
                ]
            }
        ];

        if (process.platform === 'darwin') {
            template.unshift({
                label: app.getName(),
                submenu: [
                    {label: 'About', click: this.onAboutClicked.bind(this)},
                    {type: 'separator'},
                    {role: 'quit'}
                ]
            });
        }

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }
}
