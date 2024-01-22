import chalk from 'chalk';

enum LogType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

// console.log(chalk.green("[✓]"),);
// console.log(chalk.blue("[!]"), );

function log(message: string, type: LogType = LogType.INFO): void {
  let logColor: (text: string) => string;

  switch (type) {
    case LogType.INFO:
      logColor = chalk.blue;
      break;
    case LogType.ERROR:
      logColor = chalk.red;
      break;
    case LogType.WARNING:
      logColor = chalk.yellow;
      break;
    case LogType.SUCCESS:
      logColor = chalk.green;
      break;
    default:
      logColor = chalk.white;
  }

  const logPrefix = `[${type}]`;

  console.log(`${logColor(logPrefix)} ${message}`);
}

export { LogType, log };