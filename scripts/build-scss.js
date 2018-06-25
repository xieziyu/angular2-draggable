const sass = require('node-sass');
const fs = require('fs');

const SCSS_FILE = './projects/angular2-draggable/src/scss/resizable.scss';
const OUTPUT_PATH = './dist/angular2-draggable/css';

const result = sass.renderSync({
  file: SCSS_FILE,
  outputStyle: 'expanded'
});

const minResult = sass.renderSync({
  file: SCSS_FILE,
  outputStyle: 'compressed'
});

try {
  fs.mkdirSync(OUTPUT_PATH);
} catch(e) {
  // no need
}
fs.writeFileSync(OUTPUT_PATH + '/resizable.css', result.css);
fs.writeFileSync(OUTPUT_PATH + '/resizable.min.css', minResult.css);
