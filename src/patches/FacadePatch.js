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
    DELAYED_JOB_COMMAND, RESQUE, RESQUE_EXECUTOR,
    Facade,
    initializePatch, meta, method,
    Utils: { _ }
  } = Module.NS;

  Module.definePatch(__filename, (BaseClass) => {
    @initializePatch
    class Patch extends BaseClass {
      @meta static object = {};

      @method initializeFacade(): void {
        super.initializeFacade(... arguments)
        this.addCommand(DELAYED_JOB_COMMAND, 'DelayedJobCommand')
        this.addProxy(RESQUE, 'MemoryResque')
        this.addMediator(RESQUE_EXECUTOR, 'MemoryResqueExecutor')
      }
    }
    return Patch;
  });
}
