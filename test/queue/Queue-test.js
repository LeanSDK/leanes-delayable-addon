const { expect, assert } = require('chai');
const sinon = require('sinon');
const _ = require('lodash');
const path = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const DelayableAddon = require(path).default;
const LeanES = require('@leansdk/leanes/src').default;
const {
  initialize, partOf, nameBy, meta, constant, method, attribute, mixin, resolver, plugin
} = LeanES.NS;

describe('Queue', () => {
  describe('.new', () => {
    it('should create delayed queue instance', () => {
      const RESQUE = 'RESQUE';

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      // @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      assert.property(queue, 'name', 'TEST_QUEUE', 'No correct `id` property');
      assert.property(queue, 'concurrency', 4, 'No correct `rev` property');
      assert.instanceOf(queue.resque, TestResque, '`resque` is not a Resque instance');
    });
  });
  describe('.push', () => {
    it('should push job into queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return 42;
      })

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      // @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method pushJob(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }

      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = Date.now();
      const job = await queue.push('TEST_SCRIPT', { data: 'data' }, UNTIL_DATE);
      assert.equal(job, 42);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
      assert.deepEqual(spyMethod.args[0][2], { data: 'data' });
      assert.equal(spyMethod.args[0][3], UNTIL_DATE);
    });
  });
  describe('.get', () => {
    it('should get job from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return JOB;
      });

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      // @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method getJob(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = new Date();
      const job = await queue.get('42');
      assert.equal(job, JOB);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], '42');
    });
  });
  describe('.delete', () => {
    it('should remove job from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return true;
      });

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      // @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method deleteJob(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = new Date();
      const job = await queue.delete('42');
      assert.equal(job, true);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], '42');
    });
  });
  describe('.abort', () => {
    it('should stop job from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return;
      });

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      // @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method abortJob(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = new Date();
      const job = await queue.abort('42');
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], '42');
    });
  });
  describe('.all', () => {
    it('should get all jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method async allJobs(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = new Date();
      const jobs = await queue.all('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
  describe('.pending', () => {
    it('should get pending jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      // @mixin(Test.NS.MemoryResqueMixin)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method async pendingJobs(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = new Date();
      const jobs = await queue.pending('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
  describe('.progress', () => {
    it('should get progress jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      // @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method async progressJobs(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = new Date();
      const jobs = await queue.progress('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
  describe('.completed', () => {
    it('should get completed jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      // @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method async completedJobs(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = new Date();
      const jobs = await queue.completed('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
  describe('.failed', () => {
    it('should get failed jobs from queue', async () => {
      const RESQUE = 'RESQUE';
      const JOB = {
        id: '42',
        job: 'job'
      };
      const spyMethod = sinon.spy(() => {
        return [JOB];
      });

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      // @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method async failedJobs(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const resque = TestResque.new();
      resque.setName(RESQUE);
      const queue = MyQueue.new({
        name: 'TEST_QUEUE',
        concurrency: 4
      }, resque);
      const UNTIL_DATE = new Date();
      const jobs = await queue.failed('TEST_SCRIPT');
      assert.deepEqual(jobs, [JOB]);
      assert.isTrue(spyMethod.called);
      assert.equal(spyMethod.args[0][0], 'TEST_QUEUE');
      assert.equal(spyMethod.args[0][1], 'TEST_SCRIPT');
    });
  });
  describe('.replicatedObject', () => {
    let facade = null;
    const KEY = 'TEST_DELAYED_QUEUE_001';
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create replica for delayed queue', async () => {
      const RESQUE = 'RESQUE';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      @plugin(DelayableAddon)
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(Test.NS.MemoryResqueMixin)
      @partOf(Test)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method failedJobs(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const rsq = TestResque.new();
      rsq.setName(RESQUE);
      facade.registerProxy(rsq);
      const resque = facade.retrieveProxy(RESQUE);
      const NAME = 'TEST_QUEUE';
      const queue = await resque.create(NAME, 4);
      const replica = await MyQueue.replicateObject(queue);
      assert.deepEqual(replica, {
        type: 'instance',
        class: 'Queue',
        multitonKey: KEY,
        resqueName: RESQUE,
        name: NAME
      });
    });
  });
  describe('.restoreObject', () => {
    let facade = null;
    const KEY = 'TEST__QUEUE_002';
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should restore delayed queue from replica', async () => {
      const RESQUE = 'RESQUE';
      facade = LeanES.NS.Facade.getInstance(KEY);

      @initialize
      @plugin(DelayableAddon)
      @resolver(require, name => require(name))
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      @mixin(Test.NS.MemoryResqueMixin)
      class TestResque extends Test.NS.Resque {
        @nameBy static __filename = 'TestResque';
        @meta static object = {};
        @method failedJobs(... args) {
          return spyMethod(... args);
        }
      }

      @initialize
      @partOf(Test)
      class MyQueue extends Test.NS.Queue {
        @nameBy static __filename = 'MyQueue';
        @meta static object = {};
      }
      const rsq = TestResque.new();
      rsq.setName(RESQUE);
      facade.registerProxy(rsq);
      const resque = facade.retrieveProxy(RESQUE);
      const NAME = 'TEST_QUEUE';
      const queue = await resque.create(NAME, 4);
      const restoredQueue = await Test.NS.Queue.restoreObject(Test, {
        type: 'instance',
        class: 'Queue',
        multitonKey: KEY,
        resqueName: RESQUE,
        name: NAME
      });
      assert.deepEqual(queue, restoredQueue)
    })
  })
});
