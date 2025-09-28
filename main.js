const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, 'public/schedulo_logo.ico'),
    frame: true,
    autoHideMenuBar: true,
    backgroundColor: 'white',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.once('ready-to-show', () => win.show());
  // 정적 파일 로드
  win.loadFile(path.join(__dirname, 'public', 'index.html'));

  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(0.8); // 화면 비율 조정
  });

  // 개발 중 디버깅이 필요하면 주석 해제
  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});