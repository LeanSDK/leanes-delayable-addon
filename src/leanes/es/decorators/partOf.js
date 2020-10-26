// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');

export default function partOf(acModule) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `partOf` decorator must be a Class');
    Reflect.defineProperty(target, 'Module', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: acModule
    });
    return target;
  };
}
