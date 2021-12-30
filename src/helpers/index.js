import chalk from 'chalk';

export const Warn = 'WARN';
export const Info = 'INFO';
export const Error = 'ERROR';

const HelpMessage = `${chalk.yellow('npx create-reactron-app [-t | --typescript] [-tw | --tailwind] [? | -h | --help]')}

Arguments:
    ${chalk.green('-t | --typescript')}
        ${chalk.greenBright('If specified, React project will be TypeScript enabled.')}
    ${chalk.green('-tw | --tailwind')}
        ${chalk.greenBright('If specified, React project will have TailwindCSS installed and configured for use.')}
    ${chalk.green('? | -h | --help')}
        ${chalk.greenBright('If specified, will display this message only.')}
`;

const EndMessage = `${chalk.yellow('Thank you for using create-reactron-app to kickstart your new project!')}

It is recommended to stick to the given folder structure. Use the index file in src as your React entrance only and forward the work into the renderer folder via a main container.

Use ${chalk.blueBright.bold('npm run dev')} to start the React Server and Electron app.

Created with ${chalk.red('<3')} by ${chalk.yellow('Emilis Tobulevicius')}
Website: ${chalk.yellow.underline('https://emilis.co.uk')}
`;

/**
 * Log a colour-coded message based on the log type.
 * @param {string} text The message to log.
 * @param {string} type The type of message to log.
 */
export const Log = (text, type) => {
    switch(type) {
        case Warn: {
            console.log(chalk.orange(text));
            break;
        }

        case Error: {
            console.log(chalk.red(text));
            break;
        }

        case Info: {
            console.log(chalk.cyan(text));
            break;
        }

        default: {
            console.log(chalk.cyan(text));
        }
    }
}

/**
 * Print out help message.
 */
export const Help = () => {
    console.log(HelpMessage);
}

/**
 * Print out end message.
 */
export const End = () => {
    console.log(EndMessage);
}