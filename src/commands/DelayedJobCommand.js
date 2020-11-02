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

import type { RecoverableStaticInterface, NotificationInterface } from '@leansdk/leanes/src';

export default (Module) => {
  const {
    DELAYED_JOB_RESULT,
    Proto,
    Command,
    assert,
    initialize, partOf, meta, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class DelayedJobCommand extends Command {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @method async body(aoData: {moduleName: string, replica: object, methodName: string, args: Array}): void {
      let replicated;
      const { moduleName, replica, methodName, args } = aoData;
      replica.multitonKey = this._multitonKey;
      const ApplicationModule = this.ApplicationModule;

      assert(moduleName === ApplicationModule.name, `Job was defined with moduleName = \`${moduleName}\`, but its Module = \`${ApplicationModule.name}\``);

      switch (replica.type) {
        case 'class':
          replicated = await Proto.restoreObject(ApplicationModule, replica);
          await replicated[methodName](...args);
          break;
        case 'instance':
          const vcInstanceClass = ApplicationModule.NS[replica.class];
          (vcInstanceClass: $Rest<RecoverableStaticInterface<Module, vcInstanceClass>>);
          replicated = await vcInstanceClass.restoreObject(ApplicationModule, replica);
          await replicated[methodName](...args);
          break;
        default:
          throw new Error('Replica type must be `instance` or `class`');
      }
    }

    @method async execute(aoNotification: NotificationInterface): Promise<void> {
      const voBody = aoNotification.getBody();
      const reverse = aoNotification.getType();
      let voResult = null;
      try {
        const result = await this.body(voBody);
        voResult = { result };
      } catch (error) {
        error.message = 'ERROR in Script::execute ' + error.message;
        console.error(error);
        voResult = { error };
      }
      this.send(DELAYED_JOB_RESULT, voResult, reverse);
    }
  }
}
