import { join } from 'node:path'
import { app, BrowserWindow } from 'electron'

const createWindow = (): BrowserWindow => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: { preload: join(import.meta.dirname, '../preload/preload.mjs') },
  })
  const devUrl = process.env['ELECTRON_RENDERER_URL']
  if (devUrl) void win.loadURL(devUrl)
  else void win.loadFile(join(import.meta.dirname, '../renderer/index.html'))
  return win
}

void app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())
