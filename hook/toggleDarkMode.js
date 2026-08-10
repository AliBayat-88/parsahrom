function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');

    if (isDark) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
}