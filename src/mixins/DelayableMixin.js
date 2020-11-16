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

import type { DelayableInterface } from '../interfaces/DelayableInterface';

export default (Module) => {
  const {
    RESQUE, DELAYED_JOBS_QUEUE, DELAYED_JOB_COMMAND,
    CoreObject, Proto,
    initializeMixin, meta, method,
    Utils: { _ }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass implements DelayableInterface {
      @meta static object = {};

      @method static async _delayJob(
        target,
        data: {|
          moduleName: string,
          replica: {type: string, class: string},
          methodName: string,
          args: Array,
          opts: {queue: ?string, delayUntil: ?number}
        |},
        options: {queue: ?string, delayUntil: ?number}
      ) {
        const queueName = options.queue;
        const {
          Facade
        } = target.Module.NS;
        const voFacade = Facade.getInstance(target.Module.name);
        const resque = voFacade.getProxy(RESQUE);
        const queue = await resque.get(queueName || DELAYED_JOBS_QUEUE);
        await queue.delay(DELAYED_JOB_COMMAND, data, options.delayUntil);
      }

      @method static delay(opts: ?{queue: ?string, delayUntil: ?number}) {
        return new Proxy(this, {
          get: function(target, name, receiver) {
            if (name === 'delay') {
              throw new Error('Method `delay` can not been delayed');
            }
            if (!(name in target) || typeof target[name] !== "function") {
              throw new Error(`Method \`${_.isSymbol(name) ? Symbol.keyFor(name) : name}\` absent in class ${target.name}`);
            }
            const options = opts || {};
            return async (...args) => {
              const data = {
                moduleName: target.moduleName(),
                replica: await Proto.replicateObject(target),
                methodName: name,
                args,
                opts: options
              };
              return await target._delayJob(target, data, options);
            };
          }
        });
      }

      @method delay(opts: ?{queue: ?string, delayUntil: ?number}) {
        return new Proxy(this, {
          get: function(target, name, receiver) {
            if (name === 'delay') {
              throw new Error('Method `delay` can not been delayed');
            }
            if (!(name in target) || typeof target[name] !== "function") {
              throw new Error(`Method \`${_.isSymbol(name) ? Symbol.keyFor(name) : name}\` absent in class ${target.name}.prototype`);
            }
            const vcClass = target.constructor;
            const options = opts || {};
            return async (...args) => {
              const data = {
                moduleName: target.moduleName(),
                replica: await vcClass.replicateObject(target),
                methodName: name,
                args,
                opts: options
              };
              return await vcClass._delayJob(target, data, options);
            };
          }
        });
      }
    }
    return Mixin;
  });
}
