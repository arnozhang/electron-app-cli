/**
 * ${{ProjectName}} project.
 *
 * @date ${{Date}}
 */

import * as electron from 'electron';
import * as path from "path";
import * as url from "url";


const {app, BrowserWindow, Menu, globalShortcut, ipcMain} = electron;


export default class WindowWrapper {

    protected mWindow: any = null;


    constructor() {
    }

    createWindow(html: string, title: string,
        width: number, height: number, icon?: string) {

        if (!icon) {
            icon = 'app-icon.png';
        }

        this.mWindow = new BrowserWindow({
            width: width,
            height: height,
            center: true,
            title: title,
            icon: path.join(__dirname, `../../public/images/${icon}`)
        });

        this.mWindow.loadURL(url.format({
            pathname: path.join(__dirname, `../../public/html/${html}`),
            protocol: 'file:',
            slashes: true
        }));

        this.mWindow.on('closed', () => {
            this.mWindow = null;
        });

        this.afterWindowCreated();
    }

    getWindow() {
        return this.mWindow;
    }

    close(): void {
        this.mWindow = null;
    }

    isClosed(): boolean {
        return !!this.mWindow;
    }

    afterWindowCreated(): void {
    }
}