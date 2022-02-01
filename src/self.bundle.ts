import {normalizeOptions, printOptions} from './util/options';
import {nodeBundler} from './bundler/node/node.bundler';
import {prepareEnv} from './util/env';

prepareEnv('production');

const opt = normalizeOptions({
  bundler: 'node',
  entryPoint: 'src/bin.ts',
});
printOptions(opt);
nodeBundler(opt);
