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

const hasProp = {}.hasOwnProperty;

import EventEmitter from 'events';
import type { ResqueInterface } from '../interfaces/ResqueInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';

export default (Module) => {
  const {
    DELAYED_JOB_RESULT, START_RESQUE, RESQUE, RESQUE_EXECUTOR,
    ResqueExecutor,
    initializeMixin, meta, property, method, inject,
    Utils: { _, genRandomAlphaNumbers }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass: Class<ResqueExecutor>) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property _timer: ?(Object | number) = null;

      @property _isStopped: boolean = true;

      @property _definedProcessors: {
        [key: string]: {|
        listener: Function,
        concurrency: number
        |}
      } = null;

      @property _concurrencyCount: { [key: string]: number } = null;

      @method fullQueueName(queueName: string): string {
        return this.resque.fullQueueName(queueName);
      }

      @method listNotificationInterests(): string[] {
        return [DELAYED_JOB_RESULT, START_RESQUE];
      }

      @method handleNotification<T = ?any>(aoNotification: NotificationInterface<T>) {
        const vsName = aoNotification.getName();
        const voBody = aoNotification.getBody();
        const vsType = aoNotification.getType();
        switch (vsName) {
          case DELAYED_JOB_RESULT:
            this.getViewComponent().emit(vsType, voBody);
            break;
          case START_RESQUE:
            this.start();
        }
      }

      @method onRegister(...args) {
        super.onRegister(...args);
        this.setViewComponent(new EventEmitter());
        this._concurrencyCount = {};
        this._definedProcessors = {};
        this.defineProcessors();
      }

      @method async reDefineProcessors() {
        this.stop();
        this._definedProcessors = {};
        await this.defineProcessors();
      }

      @method async defineProcessors() {
        const ref = await this.resque.allQueues();
        for (const { name, concurrency } of ref) {
          const fullQueueName = this.resque.fullQueueName(name);
          // [let moduleName] = fullQueueName.split('|>');
          //if (moduleName === this.moduleName()) {
          this.define(name, { concurrency }, async (job, done) => {
            const reverse = genRandomAlphaNumbers(32);
            this.getViewComponent().once(reverse, function (aoError) {
              return done(aoError);
            });
            const { scriptName, data } = job.data;
            this.send(scriptName, data, reverse);
          });
          //}
          continue;
        }
      }

      @method onRemove(...args) {
        super.onRemove(...args);
        this.stop();
      }

      @method async cyclePart() {
        const ref = this._definedProcessors;
        for (const queueName in ref) {
          if (!hasProp.call(ref, queueName)) continue;
          const { listener, concurrency } = ref[queueName];
          const currentQC = this._concurrencyCount[queueName];
          const now = Date.now();
          const progressJobs = (await this.resque.progressJobs(queueName));
          for (const job of progressJobs) {
            if ((now - job.startedAt) < job.lockLifetime) {
              job.status = 'scheduled';
            }
          }
          const pendingJobs = (await this.resque.pendingJobs(queueName));
          if (((currentQC != null) && currentQC < concurrency) || (currentQC == null)) {
            for (const job of pendingJobs) {
              if (job.delayUntil < now) {
                listener(job);
              }
              if (currentQC >= concurrency) {
                break;
              }
            }
          }
        }
        this.recursion();
      }

      @method async recursion() {
        if (this._isStopped) {
          return;
        }
        this._timer = setTimeout(async () => {
          clearTimeout(this._timer);
          return (await this.cyclePart());
        }, 100);
      }

      @method async start() {
        this._isStopped = false;
        await this.recursion();
      }

      @method stop() {
        this._isStopped = true;
        if (this._timer != null) {
          clearTimeout(this._timer);
        }
      }

      @method define(queueName: string, opts: { concurrency: number }, lambda: Function) {
        const { concurrency } = opts;
        const listener = (job) => {
          let base;
          const done = (err) => {
            if (err != null) {
              job.status = 'failed';
              job.reason = err;
            } else {
              job.status = 'completed';
            }
            this._concurrencyCount[queueName] -= 1;
          };
          if ((base = this._concurrencyCount)[queueName] == null) {
            base[queueName] = 0;
          }
          this._concurrencyCount[queueName] += 1;
          job.status = 'running';
          job.startedAt = Date.now();
          lambda(job, done);
        };
        this._definedProcessors[queueName] = { listener, concurrency };
      }

      @inject(`Factory<${RESQUE}>`)
      @property _resqueFactory: <T = ResqueInterface>() => {'_resqueI': $PropertyType<T, '_resqueI'>};

      @property get resque <T = ResqueInterface>(): {'_resqueI': $PropertyType<T, '_resqueI'>} {
        return this._resqueFactory();
      }
    }
    return Mixin;
  });
}
