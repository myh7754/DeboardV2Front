// Client-side cannot truly prevent DevTools — sensitive logic/data must live on the server.
// This adds casual friction only and runs in production builds (see main.js gate).
export function setupDevtoolsGuard() {
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener(
    'keydown',
    (e) => {
      const key = e.key.toLowerCase();
      const isDevToolsShortcut =
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) ||
        (e.ctrlKey && key === 'u');

      if (isDevToolsShortcut) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    { capture: true }
  );
}
