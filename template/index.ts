/**
 * ${{ProjectName}} project.
 *
 * @date ${{Date}}
 */

import * as electron from 'electron';
import * as url from 'url';
import * as path from 'path';


const {app, BrowserWindow, Menu, globalShortcut} = electron;


let appEnv = process.env.NODE_ENV;
let mainWnd: electron.BrowserWindow = null;


app.on('ready', () => {
    createWindow();
});

app.on('activate', () => {
    if (mainWnd === null) {
        createWindow()
    }
});

app.on('window-all-closed', () => {
    app.quit();
});


function createWindow() {
    initMainWnd();
    initMainMenu();
}

function initMainWnd() {
    let workArea = electron.screen.getPrimaryDisplay().workAreaSize;
    mainWnd = new BrowserWindow({
        width: workArea.width * 3 / 4,
        height: workArea.height - 150,
        center: true,
        title: app.getName(),
        icon: path.join(__dirname, '../../public/images/app-icon.png')
    });

    mainWnd.loadURL(url.format({
        pathname: path.join(__dirname, '../../index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWnd.on('closed', () => {
        mainWnd = null;
    });

    const isDev = appEnv !== 'release';
    if (isDev) {
        mainWnd.webContents.openDevTools();

        globalShortcut.register('CmdOrCtrl+Alt+P', () => {
            mainWnd.webContents.toggleDevTools();
        });
    }
}


function initMainMenu() {
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

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}