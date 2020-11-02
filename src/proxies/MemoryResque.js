// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.

export default (Module) => {
  const {
    Resque,
    MemoryResqueMixin,
    initialize, partOf, meta, nameBy, mixin,
  } = Module.NS;


  @initialize
  @mixin(MemoryResqueMixin)
  @partOf(Module)
  class MemoryResque extends Resque {
    @nameBy static  __filename = __filename;
    @meta static object = {};
  }
}
