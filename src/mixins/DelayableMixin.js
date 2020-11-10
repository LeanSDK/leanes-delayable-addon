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
import type { RecoverableStaticInterface } from '@leansdk/leanes/src/leanes';

export default (Module) => {
  const {
    RESQUE, DELAYED_JOBS_QUEUE, DELAYED_JOB_COMMAND,
    CoreObject,
    initializeMixin, meta, method
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass implements DelayableInterface {
      @meta static object = {};

      // cpmDelayJob = PointerT(_Class.private(_Class.static(_Class.async({
      @method static async _delayJob(
        target,//: CoreObject | Class<CoreObject>,
        data: {|
          moduleName: string,
          replica: object,
          methodName: string,
          args: array,
          opts: {/*queue: ?string, delayUntil: ?number*/}
        |},
        options//: {queue: ?string, delayUntil: ?number}
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

      @method static delay(opts/*: ?{queue: ?string, delayUntil: ?number} = {}*/): object {
        return new Proxy(this, {
          get: function(target, name, receiver) {
            if (name === 'delay') {
              throw new Error('Method `delay` can not been delayed');
            }
            if (!(name in target) || typeof target[name] !== "function") {
              throw new Error(`Method \`${name}\` absent in class ${target.name}`);
            }
            const Proto = target.constructor;
            // (Proto: $Diff<RecoverableStaticInterface<target.Module, Proto>>);
            (Proto: $Rest<RecoverableStaticInterface<target.Module, Proto>>);
            return async (...args) => {
              const data = {
                moduleName: target.moduleName(),
                replica: await Proto.replicateObject(target),
                methodName: name,
                args,
                opts
              };
              return await target._delayJob(target, data, opts);
            };
          }
        });
      }

      @method delay(opts: ?{queue: ?string, delayUntil: ?number} = {}): object {
        return new Proxy(this, {
          get: function(target, name, receiver) {
            if (name === 'delay') {
              throw new Error('Method `delay` can not been delayed');
            }
            if (!(name in target) || typeof target[name] !== "function") {
              throw new Error(`Method \`${name}\` absent in class ${target.name}.prototype`);
            }
            vcClass = target.constructor;
            (vcClass: $Diff<RecoverableStaticInterface<target.Module, vcClass>, {}>);
            return async (...args) => {
              const data = {
                moduleName: target.moduleName(),
                replica: await vcClass.replicateObject(target),
                methodName: name,
                args,
                opts
              };
              return await vcClass._delayJob(target, data, opts);
            };
          }
        });
      }
    }
    return Mixin;
  });
}
