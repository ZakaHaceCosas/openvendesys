document.addEventListener('DOMContentLoaded', () => {
    const jsonData = JSON.parse(window.electron.requestConfigJson());
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
    } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.documentElement.setAttribute("data-ovs-theme", "darker");
    }
});