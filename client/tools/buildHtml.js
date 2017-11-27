// This script copies src/index.html into /dist/index.html
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only use a separate css file in prod.
import fs from 'fs-extra';
import chalk from 'chalk';

/*eslint-disable no-console */

const filesToCopy = ['index.html', 'favicon.ico'];

filesToCopy.forEach(function (file) {
    fs.copy('src/' + file, 'dist/' + file, function (err) {
        if (err) return console.log(chalk.red.bold(err + ' ' + file + ' not written to dist'));
        console.log(chalk.green(file + ' written to /dist'));
    });
});

const dir = 'dist/assets';
fs.ensureDir(dir, function () {
    //console.log(chalk.red.bold(err + ' Error creating assets folder in /dist'));
});

fs.copy('src/assets/img', 'dist/assets/img', function (err) {
    if (err) return console.log(chalk.red.bold(err + ' Img folder not written to dist'));
    console.log(chalk.green('img folder written to /dist'));
});

fs.copy('src/assets/css/styles.css', 'dist/styles.css', function (err) {
    if (err) return console.log(chalk.red.bold(err + ' styles.css not written to dist'));
    console.log(chalk.green('styles.css written to /dist'));
});
