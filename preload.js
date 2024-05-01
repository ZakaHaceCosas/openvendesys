const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    requestDataJson: () => ipcRenderer.sendSync('request-data-json'),
    requestConfigJson: () => ipcRenderer.sendSync('request-config-json'),
    updateJson: (key, value) => ipcRenderer.send('update-json', key, value),
    updatePrefs: (prefs) => ipcRenderer.sendSync('pushSetts', prefs),
});

contextBridge.exposeInMainWorld('electronAPI', {
    pushF1UpdData: (data) => ipcRenderer.send('pushF1UpdData', data),
    pushSetts: (prefs) => ipcRenderer.send('pushSetts', prefs)
});

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired successfully");

    const form1 = document.getElementById('updDataF1');
    const form2 = document.getElementById('creSetMdlForm');
    const form3 = document.getElementById('creItmMdlForm');

    if (form1) {
        form1.addEventListener('submit', event => {
            event.preventDefault();
    
            const formData = new FormData(form1);
            if (formData) {
                console.log(formData)
                const params = new URLSearchParams(formData).toString();
                if (params) {
                    console.log(params)
                    const redirectURL = `upd-data-confirm.html?${params}`;
                    if (redirectURL) {
                        console.log(redirectURL)
                        window.location.href = redirectURL;
                    } else {
                        console.error("ERR: preload.js at UPD-DATA-F1, NO redirectURL. Go check why.")
                    }
                } else {
                    console.error("ERR: preload.js at UPD-DATA-F1, NO params. Go check why.")
                }
            } else {
                console.error("ERR: preload.js at UPD-DATA-F1, NO formData. Go check why.")
            }
        });
    } else {
        console.error("ERR: preload.js at UPD-DATA-F1, NO form. Go check why.")
    }

    if (form2) {
        form2.addEventListener('submit', event => {
            event.preventDefault();
    
            const formData = new FormData(form2);
            if (formData) {
                console.log(formData)
                const params = new URLSearchParams(formData).toString();
                if (params) {
                    console.log(params);
                    const redirectURL = `cre-set-confirm.html?${params}`;
                    if (redirectURL) {
                        console.log(redirectURL)
                        window.location.href = redirectURL;
                    } else {
                        console.error("ERR: preload.js at UPD-DATA-F2, NO redirectURL. Go check why.");
                    }
                } else {
                    console.error("ERR: preload.js at UPD-DATA-F2, NO params. Go check why.");
                }
            } else {
                console.error("ERR: preload.js at UPD-DATA-F2, NO formData. Go check why.");
            }
        });
    } else {
        console.error("ERR: preload.js at UPD-DATA-F2, NO form. Go check why.");
    }

    if (form3) {
        form3.addEventListener('submit', event => {
            event.preventDefault();
    
            const formData = new FormData(form3);
            if (formData) {
                console.log(formData)
                const params = new URLSearchParams(formData).toString();
                if (params) {
                    console.log(params);
                    const redirectURL = `cre-item-confirm.html?${params}`;
                    if (redirectURL) {
                        console.log(redirectURL)
                        window.location.href = redirectURL;
                    } else {
                        console.error("ERR: preload.js at UPD-DATA-F3, NO redirectURL. Go check why.");
                    }
                } else {
                    console.error("ERR: preload.js at UPD-DATA-F3, NO params. Go check why.");
                }
            } else {
                console.error("ERR: preload.js at UPD-DATA-F3, NO formData. Go check why.");
            }
        });
    } else {
        console.error("ERR: preload.js at UPD-DATA-F3, NO form. Go check why.");
    }
});
