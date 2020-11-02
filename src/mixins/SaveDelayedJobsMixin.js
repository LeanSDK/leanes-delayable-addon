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

import type { ResqueInterface } from '../interfaces/ResqueInterface';

import { inject } from "inversify";

export default (Module) => {
  const {
    RESQUE, DELAYED_JOBS_QUEUE,
    CoreObject,
    initializeMixin, meta, property, method
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass: Class<CoreObject>) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property _resque: ResqueInterface = null;

      @method async saveDelayeds(): Promise<void> {
        for (const delayed of await this._resque.getDelayed()) {
          const { queueName, scriptName, data, delay } = delayed;
          const queue = await resque.get(queueName || DELAYED_JOBS_QUEUE);
          await queue.push(scriptName, data, delay);
        }
      }

      constructor({
        @inject(`Factory<${RESQUE}>`) resqueFactory: () => ResqueInterface
      }) {
        super(... arguments)
        this._resque = resqueFactory()
      }
    }
    return Mixin;
  });
}
