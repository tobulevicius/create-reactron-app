import util from 'util';
import { Spinner } from "clui"
import fs from 'fs';
import {Log, Error} from '../helpers/index.js';
import { CSSFile, ReactFile, HTML, ElectronMainFile, TWConfigFile } from './files.js';

// Using this to allow some error handling here.
const exec = util.promisify(require('child_process').exec);

/**
 * Start the project creation.
 * @param {bool} typescript Use Typescript?
 * @param {bool} tailwind Use Tailwind?
 */
export const CreateProject = async (typescript, tailwind) => {
    const s = new Spinner('Creating React Application.', ['\\', '|', '/', '-']);

    s.start();
    await React(typescript);
    s.stop();

    s.message('Installing Electron.');
    s.start();
    await Electron();
    s.stop();

    if(tailwind) {
        s.message('Installing Tailwind.');
        s.start();
        await Tailwind();
        s.stop();
    }

    s.message('Project restructuring magic!');
    s.start();
    await ProjectRestructure(typescript, tailwind);
    s.stop();
}

/**
 * Create React Project.
 */
const React = async (t) => {
    await Command(`npx create-react-app ./${t ? ' --template typescript' : ''}`);
}

/**
 * Install Electron and related dependencies.
 */
const Electron = async () => {
    await Command('npm i -D electron electron-is-dev concurrently wait-on');
}

/**
 * Install TailwindCSS and related dependencies.
 */
const Tailwind = async () => {
    await Command('npm install -D tailwindcss postcss autoprefixer');
    await Command('npx tailwindcss init -p');
}

/**
 * Restructure the base React project to better suit Electron implementation.
 * 
 * - Delete src and public folder and then remake.
 * - Make main and renderer folders in src.
 * - Create CSS file under /render/css/.
 * - Create React index file under src.
 * - Create clean HTML file.
 * - Create Electron main file.
 * - Update Tailwind config.
 * - Modify package.json to add new scripts and values.
 * @param {bool} t Use TypeScript?
 * @param {bool} tw Use Tailwind?
 */
 const ProjectRestructure = async (t, tw) => {
    fs.rmdirSync(process.cwd() + '/src', { recursive: true });
	fs.rmdirSync(process.cwd() + '/public', {recursive: true});
    fs.mkdirSync(process.cwd() + '/src');
	fs.mkdirSync(process.cwd() + '/public');

    fs.mkdirSync(process.cwd() + '/src/renderer');
    fs.mkdirSync(process.cwd() + '/src/renderer/components');
    fs.mkdirSync(process.cwd() + '/src/renderer/containers');
    fs.mkdirSync(process.cwd() + '/src/main');

    fs.unlinkSync(process.cwd() + '/README.md');
    fs.unlinkSync(process.cwd() + '/tailwind.config.js');
	fs.writeFileSync(process.cwd() + '/src/renderer/css/index.css', CSSFile(tw));
	fs.writeFileSync(process.cwd() + `/src/${t ? 'index.tsx' : 'index.js'}`, ReactFile(tw));
	fs.writeFileSync(process.cwd() + '/public/index.html', HTML);
	fs.writeFileSync(process.cwd() + '/src/main/electron.js', ElectronMainFile);
	fs.writeFileSync(process.cwd() + '/tailwind.config.js', TWConfigFile);


    let data = fs.readFileSync(process.cwd() + '/package.json', {encoding: 'utf-8'});
    let dataJSON = JSON.parse(data);
    dataJSON.main = '/src/main/electron.js';
    dataJSON.scripts.dev = 'concurrently -k \"BROWSER=none npm start\" \"npm:electron\"';
    dataJSON.scripts.electron = 'wait-on tcp:3000 && electron .';
    fs.writeFileSync('/package.json', JSON.stringify(dataJSON))
}

/**
 * Runs a bash command.
 * @param {string} command The command to run.
 */
const Command = async (command) => {
    try {
        // If you're wondering what I am adding onto the end. 
        // Tbh I don't really know but I read on SO that it stops the bash command from displaying messages, hence it won't destroy my console AeStHeTiC.
        await exec(command + ' >nul 2>&1');
    } catch (e) {
        Log(e, Error);
    }
}