const { app, BrowserWindow, ipcMain, ipcRenderer, shell } = require('electron');
const fs = require('fs');
const path = require('path');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1080,
        height: 720,
        autoHideMenuBar: true,
        resizable: true,
        center: true,
        frame: true,
        hasShadow: true,
        fullscreenable: false,
        transparent: false,
        icon: path.join(__dirname, 'lib/favovs.png'),
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');

    win.on('closed', () => {
        win = null;
    });
};

app.setUserTasks([])

function F1UpdData(data) {
    const dbFilePath = path.join(app.getPath('userData'), 'data.json');

    fs.access(dbFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("ERR with writing data F1 in main.js")
        }
        fs.writeFileSync(dbFilePath, data)
    });
}

function UpdSetts(prefs) {
    const settsFilePath = path.join(app.getPath('userData'), 'conf.json')

    fs.access(settsFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("ERR with writing data SETTS/CONF/PREFS (however you call it, lol) in main.js")
        }
        fs.writeFileSync(settsFilePath, prefs)
    });
}

function handleF1UpdData (event, data) {
    const webContents = event.sender
    F1UpdData(data)
}

function handleSetts (event, data) {
    const webContents = event.sender
    UpdSetts(data)
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    const dbFilePath = path.join(app.getPath('userData'), 'data.json');
    const prefFilePath = path.join(app.getPath('userData'), 'conf.json');

    fs.access(dbFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFileSync(dbFilePath, '{"SAMPLE_SET_1":{"SAMPLE_I_1":{"name":"SAMPLE ITEM 1","stock":25},"SAMPLE_I_2":{"name":"SAMPLE ITEM 2","stock":153}},"LOW_SAMPLE_SET":{"LOW_STOCK_S":{"name":"LOW STOCK SAMPLE ITEM","stock":4},"NO_STOCK_S":{"name":"NO STOCK SAMPLE ITEM","stock":0}},"SAMPLE_SET_3":{"YET_ANOTHER_S_1":{"name":"YET ANOTHER SAMPLE ITEM 1","stock":25},"YET_ANOTHER_S_2":{"name":"YET ANOTHER SAMPLE ITEM 2","stock":25}}}');
        }
        const jsonData = fs.readFileSync(dbFilePath, 'utf8');
        win.webContents.send('data-json', jsonData);
    });

    fs.access(prefFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFileSync(prefFilePath, '{"theme": "dark","lang": "english","appname": "OVS 2.0"}');
        }
        const prefData = fs.readFileSync(prefFilePath, 'utf8');
        const jsonData = JSON.parse(prefData);
        ipcMain.on("setappname", (event, appname) => {
            global.appname = appname
        })

        win.webContents.send('config-json', jsonData);
    });

    ipcMain.on('pushF1UpdData', handleF1UpdData);
    ipcMain.on('pushSetts', handleSetts)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('request-data-json', (event) => {
    const dbFilePath = path.join(app.getPath('userData'), 'data.json');
    const jsonData = fs.readFileSync(dbFilePath, 'utf8');
    event.returnValue = jsonData;
});

ipcMain.on('request-config-json', (event) => {
    const prefFilePath = path.join(app.getPath('userData'), 'conf.json');
    const prefData = fs.readFileSync(prefFilePath, 'utf8');
    event.returnValue = prefData;
});

ipcMain.on('pushF1formwdata', (event, formData) => {
    const params = new URLSearchParams(formData).toString();
    const redirectURL = `upd-data-confirm.html?${params}`;
    shell.openExternal(redirectURL);
});

ipcMain.on('pushF2formwdata', (event, formData) => {
    const params = new URLSearchParams(formData).toString();
    const redirectURL = `cre-set-confirm.html?${params}`;
    shell.openExternal(redirectURL);
});

ipcMain.on('closeWin', () => {
    win.close();
});

ipcMain.on('upd-json-data-f1', (event, data) => {
    const dbFile = path.join(app.getPath('userData'), 'data.json');

    fs.writeFile(dbFile, data, 'utf8', (err) => {
        if (err) {
            console.error('Error al escribir el archivo JSON:', err);
            return;
        }
        console.log('Archivo JSON actualizado correctamente.');
    });
});
