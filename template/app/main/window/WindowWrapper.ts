/**
 * $[[ProjectName]] project.
 *
 * @date $[[Date]]
 */

import * as electron from 'electron';
import {BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';
import Application from '../Application';


const {app, Menu, globalShortcut, ipcMain} = electron;


export default class WindowWrapper {

    protected mWindow: BrowserWindow = null;


    constructor() {
    }

    initialize() {
    }

    createWindow(html: string, title: string,
        width: number, height: number, icon?: string, show?: boolean) {

        if (!icon) {
            icon = 'app-icon.png';
        }

        const hasShowOption = show != undefined;
        this.mWindow = new BrowserWindow({
            width: width,
            height: height,
            center: true,
            title: title,
            show: hasShowOption ? show : false,
            icon: path.join(__dirname, `../../public/images/${icon}`)
        });

        if (!hasShowOption) {
            this.mWindow.once('ready-to-show', () => {
                this.mWindow.show();
            });
        }

        this.mWindow.on('closed', () => {
            this.mWindow = null;
        });

        this.mWindow.loadURL(url.format({
            pathname: path.join(__dirname, `../../public/html/${html}`),
            protocol: 'file:',
            slashes: true
        }));

        this.afterWindowCreated();
    }

    getWindow(): BrowserWindow {
        return this.mWindow;
    }

    close(): void {
        this.mWindow = null;
    }

    isClosed(): boolean {
        return !!this.mWindow;
    }

    afterWindowCreated(): void {
        if (!Application.isRelease()) {
            this.mWindow.webContents.openDevTools();
        }
    }
}