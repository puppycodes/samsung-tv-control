const readline = require('node:readline')
const { Samsung, APPS, KEYS } = require('../lib/index')

const config = {
  debug: true, // Default: false
  ip: '192.168.1.42',
  mac: 'bc:d0:74:27:a0:04',
  nameApp: 'NodeJS-Test', // Default: NodeJS
  port: 8002, // Default: 8002
  token: '17128078'
}

const control = new Samsung(config)

// control.turnOn()
control.isAvailable()
  .then(() => {
    // Get token for API
    control.getToken((token) => {
      console.info('# Response getToken:', token)
    })

    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY)
        process.stdin.setRawMode(true);
    
    process.stdin.on('keypress', (chunk, key) => {
      if (key && key.name == 'q') {
      process.exit();
      } else if (key && key.name == "up") {
        control.sendKey(KEYS.KEY_VOLUP, function (err, res) {
          if (!err) {
            console.log('# Response sendKey', res)
          }
        })
      } else if (key && key.name == "down") {
        control.sendKey(KEYS.KEY_VOLDOWN, function (err, res) {
          if (!err) {
            console.log('# Response sendKey', res)
          }
        })
      }
    });

    // // Send text to focused input on TV
    // control.sendText('Text to be inserted in some focused input', function (err, res) {
    //   if (!err) {
    //     console.log('# Response sendText', res)
    //   }
    // })

    // // Get all installed apps from TV
    // control.getAppsFromTV((err, res) => {
    //   if (!err) {
    //     console.log('# Response getAppsFromTV', res)
    //   }
    // })

    // // Get app icon by iconPath which you can get from getAppsFromTV
    // control.getAppIcon(
    //   `/opt/share/webappservice/apps_icon/FirstScreen/${APPS.YouTube}/250x250.png`,
    //   (err, res) => {
    //     if (!err) {
    //       console.log('# Response getAppIcon', res)
    //     }
    //   },
    // )

    // // Open app by appId which you can get from getAppsFromTV
    // control.openApp(APPS.YouTube, (err, res) => {
    //   if (!err) {
    //     console.log('# Response openApp', res)
    //   }
    // })
  })
  .catch((e) => console.error(e))
