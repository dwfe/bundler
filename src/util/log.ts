import chalk from 'chalk';

export function logErr(title: string, ...message: string[]): void {
  log({type: 'error', title, message});
}

export function logWarn(title: string, ...message: string[]): void {
  log({type: 'warning', title, message});
}

export function logSuccess(title: string, ...message: string[]): void {
  log({type: 'success', title, message});
}

export function logAction(...args: string[]): void {
  console.log(chalk.black.bgCyan(...args));
}


interface ILog {
  type: 'error' | 'warning' | 'success';
  title?: string;
  message: string[];
}

export function log({title, message, type}: ILog): void {
  switch (type) {
    case 'error':
      if (title)
        console.log(chalk.black.bgRed(title));
      console.log(chalk.red(...message));
      break;
    case 'warning':
      if (title)
        console.log(chalk.black.bgYellow(title));
      console.log(chalk.black(...message));
      break;
    case 'success':
      if (title)
        console.log(chalk.black.bgGreen(title));
      console.log(chalk.green(...message));
      break;
  }
}

