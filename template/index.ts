/**
 * ${{ProjectName}} project.
 *
 * @date ${{Date}}
 */

import * as electron from 'electron';

const {app, BrowserWindow, Menu, globalShortcut} = electron;


let appEnv = process.env.NODE_ENV;
let mainWnd: any = null;


app.on('ready', () => {
    initMainWnd();
    initMainMenu();
});


app.on('window-all-closed', () => {
    app.quit();
});


function initMainWnd() {
    let workArea = electron.screen.getPrimaryDisplay().workAreaSize;
    mainWnd = new BrowserWindow({
        width: workArea.width * 3 / 4,
        height: workArea.height - 150,
        center: true,
        title: app.getName(),
        icon: `${__dirname}/../../public/images/app-icon.png`
    });

    mainWnd.loadURL(`file://${__dirname}/../../index.html`);
    mainWnd.on('closed', () => {
        mainWnd = null;
    });

    if (appEnv !== 'release') {
        globalShortcut.register('CmdOrCtrl+Alt+P', () => {
            mainWnd.toggleDevTools();
        });
    }

    mainWnd.toggleDevTools();
}


function initMainMenu() {
    const recent: any[] = [];

    const template: any[] = [
        {
            label: app.getName(),
            subnemu: [
                {
                    label: `About ${app.getName()}...`
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    click() {
                        mainWnd.close();
                    }
                }
            ]
        },
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
                {
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'selectall'
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}