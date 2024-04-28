document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prefsform');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const theme = document.getElementById('theme').value;
            const language = document.getElementById('language').value;
            const appName = document.getElementById('appNameInp').value;

            if (theme) {
                if (language) {
                    if (appName) {
                        const formData = {
                            "theme": theme,
                            "lang": language,
                            "appname": appName
                        };
                        if (formData) {
                            console.log(formData);
                            const settsJson = JSON.stringify(formData);
                            if (settsJson) {
                                console.log(settsJson);
                                window.electronAPI.pushSetts(settsJson)
                                const al = document.createElement("div");
                                al.className = "alert alert-info";
                                al.role = "alert";
                                al.innerHTML = "<b>Done!</b> Your changes will apply as soon as you leave this menu.";
                                const pal = document.getElementById("settsalertgoeshere");
                                pal.appendChild(al);
                            } else {
                                console.error("ERR: js/prefsrenderer.js, NO settsJson. Go check why.")
                            }
                        } else {
                            console.error("ERR: js/prefsrenderer.js, NO formData. Go check why.")
                        }
                    } else {
                        console.error("ERR: js/prefsrenderer.js, NO appName. Go check why.")
                    }
                } else {
                    console.error("ERR: js/prefsrenderer.js, NO language. Go check why.")
                }
            } else {
                console.error("ERR: js/prefsrenderer.js, NO theme. Go check why.")
            }
        });
    } else {
        console.error("ERR: js/prefsrenderer.js, NO form. Go check why.")
    }
});
