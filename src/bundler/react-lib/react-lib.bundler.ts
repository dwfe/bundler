import {readdirSync} from 'fs';
import {SRC_DIR} from '../../util/params';

export function reactLibBundler(): void {
  readdirSync(SRC_DIR, {withFileTypes: true});
}
