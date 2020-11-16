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

import QueueTF from './queue/Queue';
import ResqueTF from './proxies/Resque';
import DelayedJobCommandTF from './commands/DelayedJobCommand';
import ResqueExecutorTF from './mediators/ResqueExecutor';

import DelayableMixinTF from './mixins/DelayableMixin';
import SaveDelayedJobsMixinTF from './mixins/SaveDelayedJobsMixin';
import MemoryResqueMixinTF from './mixins/MemoryResqueMixin';
import MemoryExecutorMixinTF from './mixins/MemoryExecutorMixin';

import MemoryResqueTF from './proxies/MemoryResque';
import MemoryResqueExecutorTF from './mediators/MemoryResqueExecutor';

import FacadePatchTF from './patches/FacadePatch';

export type { QueueInterface } from './interfaces/QueueInterface';
export type { ResqueInterface } from './interfaces/ResqueInterface';
export type { DelayableInterface } from './interfaces/DelayableInterface';

export type { NotificationInterface } from './interfaces/NotificationInterface';

export default (Module) => {
  const {
    initializeMixin, meta, constant, method, patch
  } = Module.NS;

  return ['DelayableAddon', (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @constant RESQUE = 'ResqueProxy';
      @constant RESQUE_EXECUTOR = 'ResqueExecutor';
      @constant START_RESQUE = 'START_RESQUE';
      @constant DELAYED_JOBS_QUEUE = 'delayed_jobs';
      @constant DELAYED_JOB_COMMAND = 'DelayedJobCommand';
      @constant DEFAULT_QUEUE = 'default';
      @constant DELAYED_JOB_RESULT = 'DELAYED_JOB_RESULT';

      @method static including() {
        patch(this.NS.FacadePatch)(this.NS.Facade);
      }
    }
    QueueTF(Mixin);
    ResqueTF(Mixin);
    DelayedJobCommandTF(Mixin);
    ResqueExecutorTF(Mixin);

    DelayableMixinTF(Mixin);
    SaveDelayedJobsMixinTF(Mixin);
    MemoryResqueMixinTF(Mixin);
    MemoryExecutorMixinTF(Mixin);

    MemoryResqueTF(Mixin);
    MemoryResqueExecutorTF(Mixin);

    FacadePatchTF(Mixin);

    return Mixin;
  }]
}
