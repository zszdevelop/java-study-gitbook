# Vuepress打包部署node内存溢出

## 1. 背景

Vuepress在项目打包的时候，时间超久，而且经常打包失败。提示如下

```sh
 Compiling Client
i Compiling Server
[BABEL] Note: The code generator has deoptimised the styling of E:\gitbook\java\node_modules\@vuepress\core\.temp\internal\siteData.js as it exceeds the max of 500KB.
[BABEL] Note: The code generator has deoptimised the styling of E:\gitbook\java\node_modules\@vuepress\core\.temp\internal\siteData.js as it exceeds the max of 500KB.
√ Server: Compiled successfully in 27.24s
√ Client: Compiled successfully in 35.99s
wait Rendering static HTML...
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 000000013FE5F04A v8::internal::GCIdleTimeHandler::GCIdleTimeHandler+5114
 2: 000000013FE3A0C6 node::MakeCallback+4518
 3: 000000013FE3AA30 node_module_register+2032
 4: 00000001400C20EE v8::internal::FatalProcessOutOfMemory+846
 5: 00000001400C201F v8::internal::FatalProcessOutOfMemory+639
 6: 00000001405E2BC4 v8::internal::Heap::MaxHeapGrowingFactor+9556
 7: 00000001405D9C46 v8::internal::ScavengeJob::operator=+24310
 8: 00000001405D829C v8::internal::ScavengeJob::operator=+17740
 9: 00000001405E0F87 v8::internal::Heap::MaxHeapGrowingFactor+2327
10: 00000001405E1006 v8::internal::Heap::MaxHeapGrowingFactor+2454
11: 000000014019CA3B v8::internal::Factory::AllocateRawWithImmortalMap+59
12: 000000014083A20D v8::internal::MemoryReducer::TearDown+2429
13: 000000014063AA1A v8::internal::OptimizingCompileDispatcher::Unblock+53994
14: 000000014063A99B v8::internal::OptimizingCompileDispatcher::Unblock+53867
15: 000002661165C721
npm ERR! code ELIFECYCLE
npm ERR! errno 134
npm ERR! java@1.0.0 build: `vuepress build docs NODE_OPTIONS="--max_old_space_size=12192"`
npm ERR! Exit status 134
npm ERR!
npm ERR! Failed at the java@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Administrator\AppData\Roaming\npm-cache\_logs\2021-02-05T03_29_43_024Z-debug.log

```

## 2. 解决方案

```sh
$ npm install -g increase-memory-limit

// package.json 配置
"scripts": {
    "fix-memory-limit": "cross-env LIMIT=2048 increase-memory-limit"
},
"devDependencies": {
    "increase-memory-limit": "^1.0.3",
    "cross-env": "^5.0.5"
}

$ npm run fix-memory-limit
```

## 参考文章

[node编译内存溢出](https://susan007.github.io/SOURCE/node-oom.html#%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95)