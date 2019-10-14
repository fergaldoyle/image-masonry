import babel from 'rollup-plugin-babel';
import { argv } from 'yargs';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript';
import angular from 'rollup-plugin-angular';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';
import svelte from 'rollup-plugin-svelte';
import postcss from 'rollup-plugin-postcss';
import autoPreprocess from 'svelte-preprocess';
import { less as svelteLess } from 'svelte-preprocess-less';
import svg from 'rollup-plugin-svg';
import less from 'less';

less.renderSync = function(input, options) {
  if (!options || typeof options != "object") options = {};
  options.sync = true;
  options.syncImport = true;
  let css;
  this.render(input, options, function(err, result) {
    if (err) throw err;
    css = result.css;
  });
  return css;
};

const env = argv.environment;
const file = `docs/dist/image-masonry-${env}.js`;
const sourcemap = true;
const plugins = [
  resolve(),
  commonjs()
];

let globals = {};
let input = '';

if (env === 'vue' || env === 'vue-advanced') {
  input = `docs/src/vue/${ env === 'vue' ? 'basic' : 'advanced' }.vue`;
  plugins.push(
    svg(),
    vue({
      needMap: false,
      compileTemplate: true,
      css: true
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [ '@babel/preset-env'],
      extensions: ['.js', '.vue']
    }),
    uglify()
  );
}

if (env === 'react' || env === 'react-advanced') {
  input = `docs/src/react/${ env === 'react' ? 'basic' : 'advanced' }.jsx`;
  globals = {
    'prop-types': 'PropTypes',
    'react-dom': 'ReactDOM',
    'react': 'React'
  };
  plugins.push(
    postcss({
      modules: true
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['styled-jsx/babel']
    }),
    uglify()
  );
}


if (env === 'svelte' || env === 'svelte-advanced') {
  input = `docs/src/svelte/${ env === 'svelte' ? 'basic' : 'advanced' }.js`;
  plugins.push(
    svg(),
    svelte({
      preprocess: {
        style: svelteLess()
        // style: ({ content }) => {
        //   console.log('contnet', content)
        //   return less.render(content);
        // }
      }
      // preprocess: autoPreprocess({

      // })
    }),
    babel({
      presets: [ '@babel/preset-env'],
      extensions: ['.js', '.mjs', '.html', '.svelte' ]
    }),
    uglify()
  );
}

if (env === 'litelement' || env === 'litelement-advanced') {
  input = `docs/src/litelement/${ env === 'litelement' ? 'basic' : 'advanced' }.js`;
  plugins.push(
    postcss({
      inject: false
    }),
    terser()
  );
}

if (env === 'angular') {
  input = 'docs/src/angular/main.ts';
  plugins.push(
    svg(),
    angular({
      preprocessors: {
        style: lessInput => {
          return less.renderSync(lessInput);
        }
      }
    }),
    typescript(),
    babel({
      presets: [ '@babel/preset-env'],
      exclude: 'node_modules/**',
    }),
    uglify()
  );
}

export default {
  input,
  output: {
    file,
    format: 'umd',
    name: 'ImageMasonryExample',
    sourcemap,
    globals
  },
  external: Object.keys(globals),
  plugins
};
