import { NextApiRequest, NextApiResponse } from 'next';
import dynamic from 'next/dynamic';
import connect from 'next-connect';
import { readdirSync, statSync } from 'fs';
import path from 'path';

// import users from './users';
// import {join} from 'path';
// import {glob} from 'glob';
// const connect = require('next-connect');

const getItemsFromFolder = (folder: string, files: Array<string> = []): Array<string> => {
    const items = readdirSync(folder);
    for(let item of items){
        const absolutePath: string = path.join(folder, item);
        
        if(statSync(absolutePath).isDirectory()){
            getItemsFromFolder(absolutePath, files);
        }
        else{
            if(absolutePath.endsWith('routes.ts')){
                files.push(absolutePath);
            }
        }
    }
    return files;
}

const handler = connect();

// handler.use('/user', users);

const routes = getItemsFromFolder(`${process.cwd()}/pages/api`);

routes.forEach(async file => {
    // import handler from file;
    const route = await dynamic(() => import(`./pages/api/${file}`));
    // NOTE: This doesn't work!
    // handler.use(route.path, route.handler);
    // console.log(`Route: ${route} - Loaded`);
    console.log(route);
       
});

module.exports = handler;