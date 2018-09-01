const {app, BrowserWindow} = require("electron");

let main_window;
app.on("ready", () => {
  main_window = new BrowserWindow(
    {
      "webPreferences": {
        "webSecurity": false
      },
      "width": 800,
      "height": 600,
      // "darkTheme": true
    }
  );
  // main_window.webContents.openDevTools();
  main_window.loadURL(`file://${__dirname}/dist/bible-ng/index.html`);

  main_window.on("closed", () =>
  {
    main_window = null;
  });
});
