#!/usr/bin/env node

import figlet from 'figlet';
import { CreateProject } from './factory/index.js';
import { Log, Info, Error, Help, End } from './helpers/index.js';

/**
 * Display splashscreen figlet.
 */
const Splash = () => {
    figlet('Reactron', (err, data) => {
        if(err) {
            Log(err, Error)
            return;
        } else {
            Log(data, Info)
        }
    });
}

/**
 * Entrance method.
 */
const Main = async () => {
    const [,, ...args] = process.argv;

    let typescript = false;
    let tailwind = false;
    let help = false;

    args.forEach(arg => {
        if(arg === '-t' || arg === '--typescript') {
            typescript = true;
        }

        if(arg === '-tw' || arg === '--tailwind') {
            tailwind = true;
        }

        if(arg === '?' || arg === '-h' || arg === '--help') {
            help = true;
        }
    });

    Splash();

    if(help) {
        Help()
        return;
    }

    await CreateProject(typescript, tailwind);
    End();
}

// We're a go.
Main();