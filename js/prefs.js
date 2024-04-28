document.addEventListener('DOMContentLoaded', () => {
    console.log("PREFERENCES/CONFIG/SETTINGS JS, event DOMContentLoaded fired successfully");

    const jsonData = JSON.parse(window.electron.requestConfigJson());
    if (jsonData) {
        console.log(jsonData);
        document.getElementById('showappnameherebruh').innerHTML = jsonData['appname'];

        const theme = jsonData['theme'];
        if (theme === "dark") {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            document.documentElement.removeAttribute("data-ovs-theme");
        } else if (theme === "light") {
            document.documentElement.setAttribute("data-bs-theme", "light");
            document.documentElement.removeAttribute("data-ovs-theme");
        } else if (theme === "darker") {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            document.documentElement.setAttribute("data-ovs-theme", "darker");
        } else if (theme === "green") {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            document.documentElement.setAttribute("data-ovs-theme", "green");
        } else {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            document.documentElement.setAttribute("data-ovs-theme", "darker");
        }
    } else {
        console.error("ERR: js/prefs.js at MAIN/ONLY EVENT, NO jsonData. Go check why.")
    }
});