import { app } from './app.js';
import * as importedTasks from './tasks/index.js';

const tasks = Object.getOwnPropertyNames(importedTasks).filter(key => key !== '__esModule').map(key => importedTasks[key]);

// Start all the background tasks
for (const task of tasks) {
    task.start();
}

// Start the main app
app().catch(error => {
    console.error('Failed starting with error "%s"', error);
});
