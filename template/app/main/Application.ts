/**
 * ${{ProjectName}} project.
 *
 * @date ${{Date}}
 */

import * as electron from 'electron';
import ApplicationMainWindow from "./ApplicationMainWindow";

const {app, globalShortcut, ipcMain} = electron;


export default class Application {

    private mMainWindow: ApplicationMainWindow;
    public static readonly mAppEnv = process.env.NODE_ENV;


    initialize(): void {
        this.initializeEvents();
    }

    protected createMainWindow() {
        this.mMainWindow = new ApplicationMainWindow();
        this.mMainWindow.create();
        this.initializeGlobalShortcut();
    }

    static isRelease() {
        return Application.mAppEnv === 'release';
    }

    private initializeEvents() {
        app.on('ready', () => {
            this.createMainWindow();
        });

        app.on('activate', () => {
            if (this.mMainWindow === null || this.mMainWindow.isClosed()) {
                this.createMainWindow();
            }
        });

        app.on('window-all-closed', () => {
            app.quit();
        });
    }

    private initializeGlobalShortcut() {
        if (!Application.isRelease()) {
            let webContents = this.mMainWindow.getWindow().webContents;
            webContents.openDevTools();

            globalShortcut.register('CmdOrCtrl+Alt+P', () => {
                webContents.toggleDevTools();
            });
        }
    }
}