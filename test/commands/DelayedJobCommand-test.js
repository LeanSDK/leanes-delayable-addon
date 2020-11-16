const { expect, assert } = require('chai');
const _ = require('lodash');
const EventEmitter = require('events');
const path = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const DelayableAddon = require(path).default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  initialize, partOf, nameBy, meta, constant, method, plugin
} = LeanES.NS;

describe('DelayedJobCommand', () => {
  describe('.new', () => {
    it('should create new command', () => {

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }
      const command = Test.NS.DelayedJobCommand.new();
      assert.instanceOf(command, Test.NS.DelayedJobCommand);
    });
  });
  describe('.body', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should run delayed job script (class, sync)', async () => {
      // const KEY = 'TEST_DELAYED_JOB_SCRIPT_001';
      const trigger = new EventEmitter();

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      @initialize
      @partOf(Test)
      class TestClass extends Test.NS.CoreObject {
        @nameBy static __filename = 'TestClass';
        @meta static object = {};
        @method static test(...args) {
          trigger.emit('RUN_SCRIPT', args);
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends Test.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends Test.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      const mediator = ApplicationMediator.new();
      mediator.setName(Test.NS.APPLICATION_MEDIATOR);
      mediator.setViewComponent(TestApplication.new());
      facade.registerMediator(mediator);
      const promise = new Promise(function (resolve, reject) {
        trigger.once('RUN_SCRIPT', function (options) {
          resolve(options);
        });
      });
      const body = {
        moduleName: 'Test',
        replica: await TestClass.constructor.replicateObject(TestClass),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3']
      };
      facade.send(Test.NS.DELAYED_JOB_COMMAND, body);
      // const data = await promise;
      // assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
    });
    it('should run delayed job script (instance, sync)', async () => {
      // const KEY = 'TEST_DELAYED_JOB_SCRIPT_002';
      const trigger = new EventEmitter();

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // class TestScript extends Test.NS.DelayedJobScript {
      //   @nameBy static __filename = 'TestScript';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestClass';
        @meta static object = {};
        @method test(...args) {
          trigger.emit('RUN_SCRIPT', args);
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      const mediator = ApplicationMediator.new();
      mediator.setName(Test.NS.APPLICATION_MEDIATOR);
      mediator.getViewComponent(TestApplication.new());
      facade.registerMediator(mediator);
      // const command = TestScript.new();
      // command.initializeNotifier(KEY);
      const promise = new Promise(function (resolve, reject) {
        trigger.once('RUN_SCRIPT', function (options) {
          resolve(options);
        });
      });
      const body = {
        moduleName: 'Test',
        replica: await TestClass.replicateObject(TestClass.new()),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3']
      };
      // command.execute(LeanES.NS.Notification.new('TEST', body, 'TEST_TYPE'));
      facade.send(Test.NS.DELAYED_JOB_COMMAND, body);
      const data = await promise;
      assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
    });
    it('should run delayed job script (class, async)', async () => {
      // const KEY = 'TEST_DELAYED_JOB_SCRIPT_003';
      const trigger = new EventEmitter();

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // class TestScript extends Test.NS.DelayedJobScript {
      //   @nameBy static __filename = 'TestScript';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestClass';
        @meta static object = {};
        @method static async test(...args) {
          trigger.emit('RUN_SCRIPT', args);
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      const mediator = ApplicationMediator.new();
      mediator.setName(Test.NS.APPLICATION_MEDIATOR);
      mediator.getViewComponent(TestApplication.new());
      facade.registerMediator(mediator);
      // const command = TestScript.new();
      // command.initializeNotifier(KEY);
      const promise = new Promise(function (resolve, reject) {
        trigger.once('RUN_SCRIPT', function (options) {
          resolve(options);
        });
      });
      const body = {
        moduleName: 'Test',
        replica: await TestClass.constructor.replicateObject(TestClass),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3']
      };
      // command.execute(LeanES.NS.Notification.new('TEST', body, 'TEST_TYPE'));
      facade.send(Test.NS.DELAYED_JOB_COMMAND, body);
      const data = await promise;
      assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
    });
    it('should run delayed job script (instance, async)', async () => {
      // const KEY = 'TEST_DELAYED_JOB_SCRIPT_004';
      const trigger = new EventEmitter();

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');


      // @initialize
      // @partOf(Test)
      // class TestScript extends Test.NS.DelayedJobScript {
      //   @nameBy static __filename = 'TestScript';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestClass';
        @meta static object = {};
        @method async test(...args) {
          trigger.emit('RUN_SCRIPT', args);
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.CoreObject {
        @nameBy static __filename = 'TestApplication';
        @meta static object = {};
      }
      facade.registerMediator(ApplicationMediator.new(Test.NS.APPLICATION_MEDIATOR, TestApplication.new()));
      // const command = TestScript.new();
      // command.initializeNotifier(KEY);
      const promise = new Promise(function (resolve, reject) {
        trigger.once('RUN_SCRIPT', function (options) {
          resolve(options);
        });
      });
      const body = {
        moduleName: 'Test',
        replica: await TestClass.replicateObject(TestClass.new()),
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3']
      };
      // command.execute(LeanES.NS.Notification.new('TEST', body, 'TEST_TYPE'));
      facade.send(Test.NS.DELAYED_JOB_COMMAND, body);
      const data = await promise;
      assert.deepEqual(data, ['ARG_1', 'ARG_2', 'ARG_3']);
    });
  });
});
