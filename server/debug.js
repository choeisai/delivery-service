// Type of debug
const LOG = 'log',
      INFO = 'info',
      WARN = 'warn',
      ERROR = 'error'

let _console = console
const _print = (type, any) => {
  // No console in prod
  if (process.env.NODE_ENV === 'PRODUCTION') return

  let color = '\x1b[0m'
  switch (type) {
  case 'info':
    color = '\x1b[32m' // Green
    break
  case 'warn':
    color = '\x1b[33m' // Yellow
    break
  case 'error':
    color = '\x1b[31m' // Red
    break
  default:
    color = '\x1b[0m' // Reset
  }

  try {
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})
    _console[type].apply(null, [`${color}${type}\x1b[0m | ${now} | `, ...any])
  } catch (err) {
    console.error(err)
  }
}

global.debug = class debug {
  static log(...any) {
    return _print(LOG, any)
  }
  
  static info(...any) {
    return _print(INFO, any)
  }
  
  static warn(...any) {
    return _print(WARN, any)
  }
  
  static error(...any) {
    return _print(ERROR, any)
  }
}
