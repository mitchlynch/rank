
/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production'; // this assures the Babel dev config (for hot reloading) doesn't apply.

console.log(chalk.blue('Generating minified bundle for production via Webpack. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(chalk.red.bold(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow.bold('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(chalk.green('Application has been compiled in production mode and written to /dist.'));

  return 0;
});
