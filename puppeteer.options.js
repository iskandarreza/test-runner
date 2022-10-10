const opts = {
    headless: false, slowMo: 250,
    args: [
        '--window-size=1920,1080',
        '--allow-file-access-from-files'
    ],
    defaultViewport: {
        width: 1920,
        height: 1080
    },
    timeout: 15000
}

exports.options = opts