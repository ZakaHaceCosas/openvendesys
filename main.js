const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { version } = require('./package.json');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1280,
        height: 920,
        autoHideMenuBar: true,
        resizable: true,
        center: true,
        frame: true,
        hasShadow: true,
        fullscreenable: false,
        transparent: false,
        icon: path.join(__dirname, 'app/assets/favovs.png'),
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('app/index.html');

    win.on('closed', () => {
        win = null;
    });
};

app.setUserTasks([]);
app.setAppUserModelId("com.zakahacecosas.openvendesys2");

function F1UpdData(data) {
    const dbFilePath = path.join(app.getPath('userData'), 'data.json');

    fs.access(dbFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("ERR with writing data F1 in main.js")
        } else {
            fs.writeFile(dbFilePath, data, (err) => {
                if (err) {
                    console.error('Error writing data F1 in main.js:', err);
                } else {
                    console.log('Data F1 successfully updated.');
                }
            });
        }
    });
}

function UpdSetts(prefs) {
    const settsFilePath = path.join(app.getPath('userData'), 'conf.json');

    fs.access(settsFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("ERR with writing data SETTS/CONF/PREFS in main.js")
        } else {
            fs.writeFile(settsFilePath, prefs, (err) => {
                if (err) {
                    console.error('Error writing data SETTS/CONF/PREFS in main.js:', err);
                } else {
                    console.log('Settings successfully updated.');
                }
            });
        }
    });
}

function handleF1UpdData (event, data) {
    F1UpdData(data);
}

function handleSetts (event, data) {
    UpdSetts(data);
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
            fs.writeFile(dbFilePath, '{}', (err) => {
                if (err) {
                    console.error('Error writing data.json:', err);
                }
            });
        } else {
            const jsonData = fs.readFileSync(dbFilePath, 'utf8');
            win.webContents.send('data-json', jsonData);
        }
    });

    fs.access(prefFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile(prefFilePath, '{"theme": "dark","lang": "english","appname": "OVS 2.0"}', (err) => {
                if (err) {
                    console.error('Error writing conf.json:', err);
                }
            });
        } else {
            const prefData = fs.readFileSync(prefFilePath, 'utf8');
            const jsonData = JSON.parse(prefData);
            ipcMain.on("setappname", (event, appname) => {
                global.appname = appname
            });

            win.webContents.send('config-json', jsonData);
        }
    });

    ipcMain.on('pushF1UpdData', handleF1UpdData);
    ipcMain.on('pushSetts', handleSetts);
    update();
});

let appver;

async function update() {
    try {
        const response = await axios.get('https://api.github.com/repos/ZakaHaceCosas/openvendesys/releases');
        const releases = response.data;
        const ultimaRelease = releases[0];
        appver = ultimaRelease.name;
        console.log('LAST VER:', ultimaRelease.name);
        if (ultimaRelease.tag_name !== version) {
            const { response: choice } = await dialog.showMessageBox(win, {
                type: 'info',
                buttons: ['Actualizar', 'Cancelar'],
                defaultId: 0,
                message: `Hay una nueva version disponible: ${ultimaRelease.name}`,
                detail: '¿Deseas actualizar ahora?'
            });
            if (choice === 0) {
                const asset = ultimaRelease.assets.find(asset => asset.name.endsWith('.zip'));
                if (asset) {
                    shell.openExternal(asset.browser_download_url);
                } else {
                    console.error('No se encontro un archivo para descargar en la ultima release.');
                }
            }
        } else {
            console.log('La version actual esta actualizada.');
        }
    } catch (error) {
        console.error('Error al obtener la ultima version:', error.message);
    }
}

ipcMain.on('get-versions', (event) => {
    const nodever = process.versions.node;
    const chrmver = process.versions.chrome;
    const openver = process.versions.openssl;
    const elecver = process.versions.electron;
    const ovs2ver = appver;

    event.reply('versions', { nodever, chrmver, ovs2ver, elecver, openver });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
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
