#!/usr/bin/env node

import {help} from "./commands/help.js";
import {init} from "./commands/init.js";
import {status} from "./commands/status.js";
import {report} from "./commands/report.js";
import {unknown_command} from "./commands/unknown_command.js";

const args = process.argv.slice(2);

const command = args[0];
const argument = args[1];


if (command ==="status"){
    status(argument);
}
else if (command ==="init"){
    init();
}
else if (command ==="help"){
    help();
}
else if (command ==="report"){
    report();
}
else{
    unknown_command();
}
