const EventEmitter = require('events');
const { expect, assert } = require('chai');
const DelayableAddon = require("../../src/index.js").default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  initialize, partOf, nameBy, meta, constant, mixin, method, plugin
} = LeanES.NS;

describe('MemoryExecutorMixin', () => {
  describe('.new', () => {
    it('should create new memory resque executor', () => {
      const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      const viewComponent = {
        id: 'view-component'
      };

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends LeanES.NS.Mediator {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      const executor = MemoryResqueExecutor.new();
      executor.setName(executorName);
      executor.setViewComponent(viewComponent);
      assert.instanceOf(executor, MemoryResqueExecutor);
    });
  });
  describe('.listNotificationInterests', () => {
    it('should check notification interests list', () => {
      const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      const viewComponent = {
        id: 'view-component'
      };

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends LeanES.NS.Mediator {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      const executor = MemoryResqueExecutor.new();
      executor.setName(executorName);
      executor.setViewComponent(viewComponent);
      assert.deepEqual(executor.listNotificationInterests(), [Test.NS.DELAYED_JOB_RESULT, Test.NS.START_RESQUE]);
    });
  });
  describe('.stop', () => {
    it('should stop executor', () => {
      const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      const viewComponent = {
        id: 'view-component'
      };

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends LeanES.NS.Mediator {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      const executor = MemoryResqueExecutor.new();
      executor.setName(executorName);
      executor.setViewComponent(viewComponent);
      executor.stop();
      assert.isTrue(executor._isStopped);
    });
  });
  describe('.onRemove', () => {
    it('should handle remove event', async () => {
      const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      const viewComponent = {
        id: 'view-component'
      };

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends LeanES.NS.Mediator {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      const executor = MemoryResqueExecutor.new();
      executor.setName(executorName);
      executor.setViewComponent(viewComponent);
      await executor.onRemove();
      assert.isTrue(executor._isStopped);
    });
  });
  describe('.define', () => {
    it('should define processor (success)', async () => {
      const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      const viewComponent = {
        id: 'view-component'
      };

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends LeanES.NS.Mediator {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      const executor = MemoryResqueExecutor.new();
      executor.setName(executorName);
      executor.setViewComponent(viewComponent);
      executor._definedProcessors = {};
      executor._concurrencyCount = {};
      const QUEUE_NAME = 'TEST_QUEUE';
      const concurrency = 4;
      const testTrigger = new EventEmitter();
      executor.define(QUEUE_NAME, { concurrency }, (job, done) => {
        assert(job);
        testTrigger.once('DONE', (options) => {
          done(options);
        });
      });
      const processorData = executor._definedProcessors[QUEUE_NAME];
      assert.equal(processorData.concurrency, concurrency);
      const {
        listener,
        concurrency: processorConcurrency
      } = processorData;
      assert.equal(processorConcurrency, concurrency);
      const job = {
        status: 'scheduled'
      };
      listener(job);
      assert.equal(executor._concurrencyCount[QUEUE_NAME], 1);
      assert.propertyVal(job, 'status', 'running');
      assert.isDefined(job.startedAt);
      const promise = new Promise((resolve) => {
        testTrigger.once('DONE', resolve);
      });
      testTrigger.emit('DONE');
      await promise;
      assert.equal(executor._concurrencyCount[QUEUE_NAME], 0);
      assert.propertyVal(job, 'status', 'completed');
    });
    it('should define processor (fail)', async () => {
      const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      const viewComponent = {
        id: 'view-component'
      };

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends LeanES.NS.Mediator {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      const executor = MemoryResqueExecutor.new();
      executor.setName(executorName);
      executor.setViewComponent(viewComponent);
      executor._definedProcessors = {};
      executor._concurrencyCount = {};
      const QUEUE_NAME = 'TEST_QUEUE';
      const concurrency = 4;
      const testTrigger = new EventEmitter();
      executor.define(QUEUE_NAME, { concurrency }, (job, done) => {
        assert(job);
        testTrigger.once('DONE', (options) => {
          done(options);
        });
      });
      const processorData = executor._definedProcessors[QUEUE_NAME];
      assert.equal(processorData.concurrency, concurrency);
      const {
        listener,
        concurrency: processorConcurrency
      } = processorData;
      assert.equal(processorConcurrency, concurrency);
      const job = {
        status: 'scheduled'
      };
      listener(job);
      assert.equal(executor._concurrencyCount[QUEUE_NAME], 1);
      assert.propertyVal(job, 'status', 'running');
      assert.isDefined(job.startedAt);
      const promise = new Promise((resolve) => {
        testTrigger.once('DONE', resolve);
      });
      testTrigger.emit('DONE', {
        error: 'error'
      });
      await promise;
      assert.equal(executor._concurrencyCount[QUEUE_NAME], 0);
      assert.propertyVal(job, 'status', 'failed');
      assert.deepEqual(job.reason, {
        error: 'error'
      });
    });
  });
  describe('.defineProcessors', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should define processors', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_001';

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      resque.create('TEST_QUEUE_1', 4);
      resque.create('TEST_QUEUE_2', 4);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      // const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      // const viewComponent = {
      //   id: 'view-component'
      // };
      // const executor = MemoryResqueExecutor.new();
      // executor.setName(executorName);
      // executor.setViewComponent(viewComponent);
      // executor.initializeNotifier(KEY);
      // executor.setViewComponent(new EventEmitter());
      executor._definedProcessors = {};
      executor._concurrencyCount = {};
      // executor._resque = resque;
      await executor.defineProcessors();
      assert.property(executor._definedProcessors, 'TEST_QUEUE_1');
      assert.property(executor._definedProcessors, 'TEST_QUEUE_2');
    });
  });
  describe('.reDefineProcessors', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should redefine processors', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_009';

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      resque.create('TEST_QUEUE_1', 4);
      resque.create('TEST_QUEUE_2', 4);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      // const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      // const viewComponent = {
      //   id: 'view-component'
      // };
      // const executor = MemoryResqueExecutor.new();
      // executor.setName(executorName);
      // executor.setViewComponent(viewComponent);
      // executor.initializeNotifier(KEY);
      // executor.setViewComponent(new EventEmitter());
      executor._definedProcessors = {};
      executor._concurrencyCount = {};
      // executor._resque = resque;
      await executor.defineProcessors();
      assert.property(executor._definedProcessors, 'TEST_QUEUE_1');
      assert.property(executor._definedProcessors, 'TEST_QUEUE_2');
      delete executor._definedProcessors;
      await executor.reDefineProcessors();
      assert.property(executor._definedProcessors, 'TEST_QUEUE_1');
      assert.property(executor._definedProcessors, 'TEST_QUEUE_2');
    });
  });
  describe('.onRegister', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should setup executor on register', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_002';
      const trigger = new EventEmitter();

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
        @method async defineProcessors(...args) {
          await super.defineProcessors(...args);
          trigger.emit('PROCESSORS_DEFINED');
        }
      }
      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      resque.create('TEST_QUEUE_1', 4);
      resque.create('TEST_QUEUE_2', 4);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      // const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      // const viewComponent = {
      //   id: 'view-component'
      // };
      // const executor = MemoryResqueExecutor.new();
      // executor.setName(executorName);
      // executor.setViewComponent(viewComponent);
      // executor._resque = resque;
      const promise = new Promise((resolve) => {
        trigger.once('PROCESSORS_DEFINED', resolve);
      });
      // facade.registerMediator(executor);
      await promise;
      assert.property(executor._definedProcessors, 'TEST_QUEUE_1');
      assert.property(executor._definedProcessors, 'TEST_QUEUE_2');
    });
  });
  describe('.recursion', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should recursively call cycle part', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_004';
      const trigger = new EventEmitter();
      let test = null;

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
        @method async defineProcessors(...args) {
          await super.defineProcessors(...args);
          trigger.emit('PROCESSORS_DEFINED');
        }
        @method cyclePart(...args) {
          test = true;
          trigger.emit('CYCLE_PART');
        }
      }
      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      resque.create(Test.NS.DELAYED_JOBS_QUEUE, 4);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      // const executor = MemoryResqueExecutor.new();
      // executor.setName(Test.NS.RESQUE_EXECUTOR);
      // executor._resque = resque;
      let promise = new Promise((resolve) => {
        trigger.once('PROCESSORS_DEFINED', resolve);
      });
      // facade.registerMediator(executor);
      await promise;
      promise = new Promise((resolve) => {
        trigger.once('CYCLE_PART', resolve);
      });
      executor._isStopped = false;
      await executor.recursion();
      await promise;
      assert.isNotNull(test);
    });
  });
  describe('.start', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should call recursion', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_005';
      const trigger = new EventEmitter();
      let test = null;

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
        @method async defineProcessors(...args) {
          await super.defineProcessors(...args);
          trigger.emit('PROCESSORS_DEFINED');
        }
        @method cyclePart(...args) {
          test = true;
          trigger.emit('CYCLE_PART');
        }
      }
      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      resque.create(Test.NS.DELAYED_JOBS_QUEUE, 4);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      // const executor = MemoryResqueExecutor.new(Test.NS.RESQUE_EXECUTOR);
      // executor._resque = resque;
      let promise = new Promise((resolve) => {
        trigger.once('PROCESSORS_DEFINED', resolve);
      });
      // facade.registerMediator(executor);
      await promise;
      promise = new Promise((resolve) => {
        trigger.once('CYCLE_PART', resolve);
      });
      await executor.start();
      await promise;
      assert.isNotNull(test);
    });
  });
  describe('.handleNotification', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should start resque', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_006';
      const trigger = new EventEmitter();
      let test = null;

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
        @method start() {
          test = true;
          trigger.emit('CYCLE_PART');
        }
      }
      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      resque.create(Test.NS.DELAYED_JOBS_QUEUE, 4);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      // const executor = MemoryResqueExecutor.new();
      // executor._resque = resque;
      // executor.setName(Test.NS.RESQUE_EXECUTOR);
      // facade.registerMediator(executor);
      const promise = new Promise(function (resolve) {
        trigger.once('CYCLE_PART', resolve);
      });
      facade.sendNotification(Test.NS.START_RESQUE);
      await promise;
      assert.isNotNull(test);
    });
    it('should get result', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_007';

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }
      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      resque.create(Test.NS.DELAYED_JOBS_QUEUE, 4);
      // const executor = MemoryResqueExecutor.new();
      // executor._resque = resque;
      // executor.setName(Test.NS.RESQUE_EXECUTOR);
      // facade.registerMediator(executor);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      const type = 'TEST_TYPE';
      const promise = new Promise((resolve) => {
        executor.getViewComponent().once(type, resolve);
      });
      const body = {
        test: 'test'
      };
      facade.sendNotification(Test.NS.DELAYED_JOB_RESULT, body, type);
      const data = await promise;
      assert.deepEqual(data, body);
    });
  });
  describe('.cyclePart', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should start cycle part', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_008';
      const trigger = new EventEmitter();

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestScript extends LeanES.NS.Script {
        @nameBy static __filename = 'TestScript';
        @meta static object = {};
        @method async body(data: ?any): Promise<?any> {
          trigger.emit('CYCLE_PART', data);
          return data
        }
      }
      facade.addCommand('TEST_SCRIPT', 'TestScript');
      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      await resque.create(Test.NS.DELAYED_JOBS_QUEUE, 4);
      const queue = await resque.get(Test.NS.DELAYED_JOBS_QUEUE);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      // const executor = MemoryResqueExecutor.new();
      // executor._resque = resque;
      // executor.setName(Test.NS.RESQUE_EXECUTOR);
      // facade.registerMediator(executor);
      const promise = new Promise((resolve) => {
        trigger.once('CYCLE_PART', resolve);
      });
      const DELAY_UNTIL = Date.now() + 1000;
      const body = {
        arg1: 'ARG_1',
        arg2: 'ARG_2',
        arg3: 'ARG_3'
      };
      await queue.push('TEST_SCRIPT', body, DELAY_UNTIL);
      facade.sendNotification(Test.NS.START_RESQUE);
      const data = await promise;
      assert.deepEqual(data, body);
    });
  });
  describe('.fullQueueName', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get full queue name', async () => {
      const KEY = 'TEST_MEMORY_RESQUE_EXECUTOR_010';

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/../command/config`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryExecutorMixin)
      class MemoryResqueExecutor extends Test.NS.ResqueExecutor {
        @nameBy static __filename = 'MemoryResqueExecutor';
        @meta static object = {};
      }

      // const resque = TestResque.new();
      // resque.setName(Test.NS.RESQUE);
      // facade.registerProxy(resque);
      const resque = facade.getProxy(Test.NS.RESQUE);
      resque.create('TEST_QUEUE_1', 4);
      resque.create('TEST_QUEUE_2', 4);
      // const executorName = 'TEST_MEMORY_RESQUE_EXECUTOR';
      // const viewComponent = {
      //   id: 'view-component'
      // };
      // const executor = MemoryResqueExecutor.new();
      // executor._resque = resque;
      // executor.setName(executorName);
      // executor.setViewComponent(viewComponent);
      // facade.registerMediator(executor);
      facade.addMediator(Test.NS.RESQUE_EXECUTOR, 'MemoryResqueExecutor');
      const executor = facade.getMediator(Test.NS.RESQUE_EXECUTOR);
      const fullQueueName = executor.fullQueueName('TEST_QUEUE_1');
      assert.equal(fullQueueName, 'Test|>TEST_QUEUE_1');
    });
  });
});
