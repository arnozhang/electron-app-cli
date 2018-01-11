/**
 * $[[ProjectName]] project.
 *
 * @date $[[Date]]
 */

import * as electron from 'electron';
import ApplicationMainWindow from './window/ApplicationMainWindow';

const {app, globalShortcut, BrowserWindow, ipcMain} = electron;


export default class Application {

    private mMainWindow = new ApplicationMainWindow();
    public static readonly mAppEnv = process.env.NODE_ENV;


    initialize(): void {
        this.initializeEvents();
    }

    protected createMainWindow() {
        this.mMainWindow.initialize();
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
            if (this.mMainWindow == null || this.mMainWindow.isClosed()) {
                this.createMainWindow();
            }
        });

        app.on('window-all-closed', () => {
            this.mMainWindow.preQuitApp();
            app.quit();
        });
    }

    private initializeGlobalShortcut() {
        if (!Application.isRelease()) {
            globalShortcut.register('CmdOrCtrl+Alt+P', () => {
                BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
            });
        }
    }
}
