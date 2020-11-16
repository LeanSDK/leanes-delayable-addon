const {expect, assert} = require('chai');
const path = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const DelayableAddon = require(path).default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  initialize, partOf, nameBy, meta, mixin, constant, method, plugin
} = LeanES.NS;

describe('DelayableMixin', () => {
  describe('._delayJob', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should put job into delayed queue', async () => {
      const KEY = 'TEST_DELAYABLE_MIXIN_001';

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends Test.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
      }

      facade = ApplicationFacade.getInstance('Test');

      @initialize
      @partOf(Test)
      class TestClass extends LeanES.NS.CoreObject {
        @nameBy static  __filename = 'TestClass';
        @meta static object = {};

        @method static test () {}
      }

      // @initialize
      // @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      // class TestResque extends Test.NS.Resque {
      //   @nameBy static  __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.DelayableMixin)
      class TestTest extends LeanES.NS.CoreObject {
        @nameBy static  __filename = 'TestTest';
        @meta static object = {};
      }
      // const rq = TestResque.new();
      // rq.setName(LeanES.NS.RESQUE);
      // facade.registerProxy(rq);
      // facade.addProxy(Test.NS.RESQUE, 'TestResque')
      const resque = facade.getProxy(Test.NS.RESQUE);
      await resque.create(Test.NS.DELAYED_JOBS_QUEUE, 4);
      const delayJobSymbol = TestTest.classMethods._delayJob;
      assert.isTrue(delayJobSymbol != null);
      const DELAY_UNTIL = Date.now();
      const options = {
        queue: Test.NS.DELAYED_JOBS_QUEUE,
        delayUntil: DELAY_UNTIL
      };
      const replica = await LeanES.NS.Proto.replicateObject(TestClass);
      const DATA = {
        moduleName: 'Test',
        replica,
        methodName: 'test',
        args: ['ARG_1', 'ARG_2', 'ARG_3'],
        opts: options
      };
      await TestTest._delayJob(TestClass, DATA, options);
      const rawQueue = resque._jobs['Test|>delayed_jobs'];
      const [scriptData] = rawQueue;
      // assert.deepEqual(scriptData, {
      //   queueName: 'Test|>delayed_jobs',
      //   data: {
      //     scriptName: 'DelayedJobScript',
      //     data: DATA
      //   },
      //   delayUntil: DELAY_UNTIL,
      //   status: 'scheduled',
      //   lockLifetime: 5000,
      //   lockLimit: 2
      // });
      assert.deepEqual(scriptData, {
        queueName: 'Test|>delayed_jobs',
        data: {
          scriptName: 'DelayedJobCommand',
          data: DATA
        },
        delayUntil: DELAY_UNTIL,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
    });
  });
  describe('.delay', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get delayed function wrapper', async () => {
      const KEY = 'TEST_DELAYABLE_MIXIN_002';

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
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
      //   @nameBy static  __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.DelayableMixin)
      class TestTest extends LeanES.NS.CoreObject {
        @nameBy static  __filename = 'TestTest';
        @meta static object = {};

        @method static test () {}
      }
      // const rq = TestResque.new();
      // rq.setName(LeanES.NS.RESQUE);
      // facade.registerProxy(rq);
      const resque = facade.retrieveProxy(Test.NS.RESQUE);
      await resque.create(Test.NS.DELAYED_JOBS_QUEUE, 4);
      const DELAY_UNTIL = Date.now();
      await TestTest.delay({
        queue: Test.NS.DELAYED_JOBS_QUEUE,
        delayUntil: DELAY_UNTIL
      }).test('ARG_1', 'ARG_2', 'ARG_3');
      // const rawQueue = resque._jobs['DelayableAddon|>delayed_jobs'];
      const rawQueue = resque._jobs['Test|>delayed_jobs'];
      const [scriptData] = rawQueue;
      // assert.deepEqual(scriptData, {
      //   queueName: 'Test|>delayed_jobs',
      //   data: {
      //     scriptName: 'DelayedJobScript',
      //     data: {
      //       moduleName: 'Test',
      //       replica: {
      //         class: 'TestTest',
      //         type: 'class'
      //       },
      //       methodName: 'test',
      //       args: ['ARG_1', 'ARG_2', 'ARG_3'],
      //       opts: {
      //         queue: LeanES.NS.DELAYED_JOBS_QUEUE,
      //         delayUntil: DELAY_UNTIL
      //       }
      //     }
      //   },
      //   delayUntil: DELAY_UNTIL,
      //   status: 'scheduled',
      //   lockLifetime: 5000,
      //   lockLimit: 2
      // });
      assert.deepEqual(scriptData, {
        queueName: 'Test|>delayed_jobs',
        data: {
          scriptName: 'DelayedJobCommand',
          data: {
            moduleName: 'Test',
            replica: {
              class: 'TestTest',
              type: 'class'
            },
            methodName: 'test',
            args: ['ARG_1', 'ARG_2', 'ARG_3'],
            opts: {
              queue: Test.NS.DELAYED_JOBS_QUEUE,
              delayUntil: DELAY_UNTIL
            }
          }
        },
        delayUntil: DELAY_UNTIL,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
    });
  });
  describe('#delay', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get delayed function wrapper', async () => {
      const KEY = 'TEST_DELAYABLE_MIXIN_003';

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root`;
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
      //   @nameBy static  __filename = 'TestResque';
      //   @meta static object = {};
      // }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.DelayableMixin)
      class TestTest extends LeanES.NS.CoreObject {
        @nameBy static  __filename = 'TestTest';
        @meta static object = {};

        @method test () {}
      }
      // const rq = TestResque.new();
      // rq.setName(LeanES.NS.RESQUE);
      // facade.registerProxy(rq);
      const resque = facade.retrieveProxy(Test.NS.RESQUE);
      await resque.create(Test.NS.DELAYED_JOBS_QUEUE, 4);
      const DELAY_UNTIL = Date.now();
      const testObject = TestTest.new();
      await testObject.delay({
        queue: Test.NS.DELAYED_JOBS_QUEUE,
        delayUntil: DELAY_UNTIL
      }).test('ARG_1', 'ARG_2', 'ARG_3');
      // const rawQueue = resque._jobs['DelayableAddon|>delayed_jobs'];
      const rawQueue = resque._jobs['Test|>delayed_jobs'];
      const [scriptData] = rawQueue;
      // assert.deepEqual(scriptData, {
      //   queueName: 'Test|>delayed_jobs',
      //   data: {
      //     scriptName: 'DelayedJobScript',
      //     data: {
      //       moduleName: 'Test',
      //       replica: {
      //         class: 'TestTest',
      //         type: 'class'
      //       },
      //       methodName: 'test',
      //       args: ['ARG_1', 'ARG_2', 'ARG_3'],
      //       opts: {
      //         queue: Test.NS.DELAYED_JOBS_QUEUE,
      //         delayUntil: DELAY_UNTIL
      //       }
      //     }
      //   },
      //   delayUntil: DELAY_UNTIL,
      //   status: 'scheduled',
      //   lockLifetime: 5000,
      //   lockLimit: 2
      // });
      assert.deepEqual(scriptData, {
        queueName: 'Test|>delayed_jobs',
        data: {
          scriptName: 'DelayedJobCommand',
          data: {
            moduleName: 'Test',
            replica: {
              class: 'TestTest',
              type: 'instance'
            },
            methodName: 'test',
            args: ['ARG_1', 'ARG_2', 'ARG_3'],
            opts: {
              queue: Test.NS.DELAYED_JOBS_QUEUE,
              delayUntil: DELAY_UNTIL
            }
          }
        },
        delayUntil: DELAY_UNTIL,
        status: 'scheduled',
        lockLifetime: 5000,
        lockLimit: 2
      });
    });
  });
});
