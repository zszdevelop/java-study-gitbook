const import_meta = {};
const scriptRel = "modulepreload";
const seen = {};
const base = "/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const pagesData$1 = {
  "v-8daa1a0e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./index.html.d7acac7d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-79fdd481": () => __vitePreload(() => import(
    /* webpackChunkName: "v-79fdd481" */
    "./home.html.02737408.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-14c69af4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-14c69af4" */
    "./index.html.7b2341fb.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-35c4a6dd": () => __vitePreload(() => import(
    /* webpackChunkName: "v-35c4a6dd" */
    "./Java\u53CD\u5C04.html.803460c9.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-f3262b3a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-f3262b3a" */
    "./Java\u53CD\u5C042.html.8c7e0bd1.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6e1a5ab5": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6e1a5ab5" */
    "./Java\u57FA\u7840.html.fba9d588.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-39490ba5": () => __vitePreload(() => import(
    /* webpackChunkName: "v-39490ba5" */
    "./Java\u57FA\u7840\u9762\u8BD5\u63D0\u95EE.html.a17f6426.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-28851ef4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-28851ef4" */
    "./Java\u5F02\u5E38\u5904\u7406.html.8efdb4a9.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-673af10a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-673af10a" */
    "./index.html.31fff0f6.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-08345439": () => __vitePreload(() => import(
    /* webpackChunkName: "v-08345439" */
    "./\u5173\u952E\u5B57\u603B\u7ED3.html.d3e60b4d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-23375f22": () => __vitePreload(() => import(
    /* webpackChunkName: "v-23375f22" */
    "./ArrayList\u7684\u6269\u5BB9\u673A\u5236.html.36708082.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3fc1c173": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3fc1c173" */
    "./Comparable\u548CComparator.html.a70c4aec.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-616148db": () => __vitePreload(() => import(
    /* webpackChunkName: "v-616148db" */
    "./HashMap\u76F8\u5173\u95EE\u9898.html.23a73d9b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-2aae2a44": () => __vitePreload(() => import(
    /* webpackChunkName: "v-2aae2a44" */
    "./Java\u5BB9\u5668\u57FA\u7840.html.e30a5f89.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-16722c46": () => __vitePreload(() => import(
    /* webpackChunkName: "v-16722c46" */
    "./index.html.8f8a643b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-74f62882": () => __vitePreload(() => import(
    /* webpackChunkName: "v-74f62882" */
    "./Java\u53CD\u7F16\u8BD1\u547D\u4EE4-javap.html.b1f6d47d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-f15a9420": () => __vitePreload(() => import(
    /* webpackChunkName: "v-f15a9420" */
    "./Java\u547D\u4EE4\u53C2\u6570.html.6e3c92c5.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3eed58e7": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3eed58e7" */
    "./Java\u7F16\u8BD1.html.30f08872.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-46dc7138": () => __vitePreload(() => import(
    /* webpackChunkName: "v-46dc7138" */
    "./index.html.46da703e.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-9828af56": () => __vitePreload(() => import(
    /* webpackChunkName: "v-9828af56" */
    "./index.html.45cd6e85.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-60b3db42": () => __vitePreload(() => import(
    /* webpackChunkName: "v-60b3db42" */
    "./Java8-\u51FD\u6570\u7F16\u7A0Blambda\u8868\u8FBE\u5F0F.html.c63bb740.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-e46976e6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e46976e6" */
    "./index.html.0ec8c7a3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4ad508cc": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4ad508cc" */
    "./HotSpot\u865A\u62DF\u673A\u5BF9\u8C61\u521B\u5EFA.html.9a9f7bc2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6e7a620a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6e7a620a" */
    "./JVM\u9762\u8BD5\u63D0\u95EE.html.9c157681.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-70cde54c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-70cde54c" */
    "./Java\u5185\u5B58\u533A\u57DF.html.ffa8d8b5.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6cec0ebc": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6cec0ebc" */
    "./index.html.eed36c71.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-28b05c99": () => __vitePreload(() => import(
    /* webpackChunkName: "v-28b05c99" */
    "./\u5E38\u89C1\u7684JVM\u8BBE\u7F6E.html.2a6e5150.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-48579df1": () => __vitePreload(() => import(
    /* webpackChunkName: "v-48579df1" */
    "./index.html.7ec44786.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-30d7209a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-30d7209a" */
    "./index.html.0e34390c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-7e29c70a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-7e29c70a" */
    "./tomcat\u7C7B\u52A0\u8F7D\u5668.html.96e2272d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-55227aff": () => __vitePreload(() => import(
    /* webpackChunkName: "v-55227aff" */
    "./\u7C7B\u52A0\u8F7D\u5668.html.09834769.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-121c2789": () => __vitePreload(() => import(
    /* webpackChunkName: "v-121c2789" */
    "./\u7C7B\u52A0\u8F7D\u5668\u5E38\u89C1\u9762\u8BD5.html.5b0cf3a6.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-302b9660": () => __vitePreload(() => import(
    /* webpackChunkName: "v-302b9660" */
    "./\u7C7B\u52A0\u8F7D\u8FC7\u7A0B.html.80b464bb.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4ad388e6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4ad388e6" */
    "./\u7C7B\u52A0\u8F7D\u8FC7\u7A0B\u7CBE\u7B80\u7248.html.f7d25071.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-53a8109a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-53a8109a" */
    "./GC\u4E2D\u5BF9\u8C61\u81EA\u6551.html.585fe36a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-ec827a8e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-ec827a8e" */
    "./JVM\u5185\u5B58\u5206\u914D\u4E0E\u56DE\u6536.html.457d7ae1.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-c3f81230": () => __vitePreload(() => import(
    /* webpackChunkName: "v-c3f81230" */
    "./JVM\u5783\u573E\u56DE\u6536.html.3326e6f4.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-b367d25a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-b367d25a" */
    "./Java\u5982\u4F55\u9009\u62E9\u5408\u9002\u7684\u5783\u573E\u56DE\u6536\u5668.html.c27b317f.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4ede3af1": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4ede3af1" */
    "./index.html.21f19850.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-238be5db": () => __vitePreload(() => import(
    /* webpackChunkName: "v-238be5db" */
    "./gc\u65E5\u5FD7\u5206\u6790.html.e863019d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-38bac3e7": () => __vitePreload(() => import(
    /* webpackChunkName: "v-38bac3e7" */
    "./\u5783\u573E\u6536\u96C6\u5668.html.d3241a59.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-0266f14f": () => __vitePreload(() => import(
    /* webpackChunkName: "v-0266f14f" */
    "./\u5783\u573E\u6536\u96C6\u7B97\u6CD5.html.736f10f9.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6b177d22": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6b177d22" */
    "./\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1.html.8a98d936.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6baa537a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6baa537a" */
    "./\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5FullGC.html.ad4db721.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-a4db7fec": () => __vitePreload(() => import(
    /* webpackChunkName: "v-a4db7fec" */
    "./Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002.html.6c4df5f4.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-d1478a00": () => __vitePreload(() => import(
    /* webpackChunkName: "v-d1478a00" */
    "./index.html.ced0b1ec.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-22b81989": () => __vitePreload(() => import(
    /* webpackChunkName: "v-22b81989" */
    "./jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406.html.642f582d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-69cfdb30": () => __vitePreload(() => import(
    /* webpackChunkName: "v-69cfdb30" */
    "./\u5185\u5B58\u6EA2\u51FA\u65F6\u6253\u5370\u5185\u5B58\u4FE1\u606F.html.0dafc4b5.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-058d8bb2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-058d8bb2" */
    "./\u5982\u4F55\u5408\u7406\u7684\u89C4\u5212JVM\u6027\u80FD\u8C03\u4F18.html.8629a671.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-e5f5995e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e5f5995e" */
    "./JDK\u76D1\u63A7\u548C\u6545\u969C\u5904\u7406\u5DE5\u5177\u6C47\u603B.html.2e82bc27.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-0e23e8d6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-0e23e8d6" */
    "./index.html.0bf22286.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-410a868a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-410a868a" */
    "./BlockingQueue\u8BE6\u89E3.html.f7ab3c6a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-46552bec": () => __vitePreload(() => import(
    /* webpackChunkName: "v-46552bec" */
    "./index.html.9d00abb6.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1839a060": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1839a060" */
    "./FutureTask\u8BE6\u89E3.html.93291c80.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-311a40b5": () => __vitePreload(() => import(
    /* webpackChunkName: "v-311a40b5" */
    "./index.html.18e2242e.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-0d063008": () => __vitePreload(() => import(
    /* webpackChunkName: "v-0d063008" */
    "./ScheduledThreadPoolExecutor\u8BE6\u89E3.html.9bd4c6f2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-b3d2e942": () => __vitePreload(() => import(
    /* webpackChunkName: "v-b3d2e942" */
    "./ThreadPoolExecutor\u8BE6\u89E3.html.cffaeec3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-c7d13846": () => __vitePreload(() => import(
    /* webpackChunkName: "v-c7d13846" */
    "./index.html.7836b5ad.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-41a4e3e9": () => __vitePreload(() => import(
    /* webpackChunkName: "v-41a4e3e9" */
    "./\u9501\u6838\u5FC3\u7C7BAQS\u8BE6\u89E3.html.c193b7d4.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-b4e1b702": () => __vitePreload(() => import(
    /* webpackChunkName: "v-b4e1b702" */
    "./CountDownLatch\u8BE6\u89E3.html.e62da2ae.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-16fd454a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-16fd454a" */
    "./index.html.1b49b4f0.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6b23f6d4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6b23f6d4" */
    "./index.html.1f70bd7e.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-bda03f78": () => __vitePreload(() => import(
    /* webpackChunkName: "v-bda03f78" */
    "./Java\u7EBF\u7A0B\u57FA\u7840.html.00041868.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-409577a6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-409577a6" */
    "./index.html.0fea1766.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-34babb4e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-34babb4e" */
    "./\u591A\u7EBF\u7A0B.html.24b5437b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-056df0c1": () => __vitePreload(() => import(
    /* webpackChunkName: "v-056df0c1" */
    "./\u591A\u7EBF\u7A0B\u7406\u8BBA\u57FA\u7840.html.1c2cad1a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-07bbc8e6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-07bbc8e6" */
    "./\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501.html.020ecfeb.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1af994a8": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1af994a8" */
    "./\u6B7B\u9501.html.da664232.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6ed69023": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6ed69023" */
    "./\u7EBF\u7A0B\u751F\u547D\u5468\u671F.html.a4807ff0.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5dd87ef2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5dd87ef2" */
    "./\u7EBF\u7A0B\u901A\u4FE1.html.03fffc67.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-2fbf52ae": () => __vitePreload(() => import(
    /* webpackChunkName: "v-2fbf52ae" */
    "./Callable\u548CFuture.html.7341a6f1.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-f0342900": () => __vitePreload(() => import(
    /* webpackChunkName: "v-f0342900" */
    "./Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60.html.117eafdd.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-73edc2c7": () => __vitePreload(() => import(
    /* webpackChunkName: "v-73edc2c7" */
    "./index.html.ff7a3326.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-e79e511e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e79e511e" */
    "./ThreadPoolExecutor\u7C7B.html.9d3a6022.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1877f20d": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1877f20d" */
    "./\u5982\u4F55\u5408\u7406\u914D\u7F6E\u7EBF\u7A0B\u6C60\u7684\u5927\u5C0F.html.db3ce6b5.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-331a0410": () => __vitePreload(() => import(
    /* webpackChunkName: "v-331a0410" */
    "./\u7EBF\u7A0B\u6C60.html.1f6fdf4c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6f41b47a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6f41b47a" */
    "./\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B.html.123cfe37.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-f58de1e8": () => __vitePreload(() => import(
    /* webpackChunkName: "v-f58de1e8" */
    "./\u7EBF\u7A0B\u6C60\u7684\u5177\u4F53\u5B9E\u73B0\u539F\u7406.html.aa0cc76d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4c715521": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4c715521" */
    "./\u7EBF\u7A0B\u6C60\u7684\u5904\u7406\u6D41\u7A0B.html.51939ff7.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-f4d08732": () => __vitePreload(() => import(
    /* webpackChunkName: "v-f4d08732" */
    "./\u7EBF\u7A0B\u5B89\u5168\u7684\u5B9E\u73B0\u65B9\u6CD5.html.fb306146.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-15ea94a5": () => __vitePreload(() => import(
    /* webpackChunkName: "v-15ea94a5" */
    "./index.html.26fb3355.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4b2e63bd": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4b2e63bd" */
    "./Shallow\u548CRetained.html.2c5168a8.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1985c121": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1985c121" */
    "./mat\u4F7F\u7528.html.ca028e33.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1c9d71a6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1c9d71a6" */
    "./mat\u5B89\u88C5.html.df3c848a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-838a1cfc": () => __vitePreload(() => import(
    /* webpackChunkName: "v-838a1cfc" */
    "./\u8BB0\u4E00\u6B21MAT\u5206\u6790\u7EBF\u4E0A\u9879\u76EE\u8FC7\u7A0B.html.aa4e6d3a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-70a9a102": () => __vitePreload(() => import(
    /* webpackChunkName: "v-70a9a102" */
    "./index.html.bc21fbfd.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-8290979e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-8290979e" */
    "./mac\u7248idea\u914D\u7F6Evisualvm.html.8b3af7ba.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-60b0e62a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-60b0e62a" */
    "./LockSupport\u6E90\u7801.html.de8b19f5.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-11263062": () => __vitePreload(() => import(
    /* webpackChunkName: "v-11263062" */
    "./LockSupport\u7528\u6CD5.html.297f60e8.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-a451c5f0": () => __vitePreload(() => import(
    /* webpackChunkName: "v-a451c5f0" */
    "./index.html.e44edf90.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-b87560d8": () => __vitePreload(() => import(
    /* webpackChunkName: "v-b87560d8" */
    "./index.html.4c9a9e46.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5d37ada4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5d37ada4" */
    "./ReentrantLock\u4E4B\u6761\u4EF6\u9501Condition\u6E90\u7801\u5206\u6790.html.1426d63a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-78904604": () => __vitePreload(() => import(
    /* webpackChunkName: "v-78904604" */
    "./ReentrantLock\u548C\u6761\u4EF6\u9501Condition\u5B9E\u73B0\u963B\u585E\u961F\u5217ArrayBlockingQueue.html.f77d91dd.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-387904f4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-387904f4" */
    "./ReentrantLock\u6E90\u7801\u5206\u6790.html.9c654df2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-36cb5d1f": () => __vitePreload(() => import(
    /* webpackChunkName: "v-36cb5d1f" */
    "./ReentrantLock\u6E90\u7801\u5206\u6790\u4E09.html.026de5aa.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-7e43ba5e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-7e43ba5e" */
    "./ReentrantLock\u6E90\u7801\u5206\u6790\u4E8C.html.29a09d19.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-d8840068": () => __vitePreload(() => import(
    /* webpackChunkName: "v-d8840068" */
    "./ReentrantLock\u91CD\u5165\u9501.html.ca7c8fac.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-0485f54d": () => __vitePreload(() => import(
    /* webpackChunkName: "v-0485f54d" */
    "./index.html.d6911b1d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6d635beb": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6d635beb" */
    "./final\u5173\u952E\u5B57.html.0e92fecb.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-c97c4172": () => __vitePreload(() => import(
    /* webpackChunkName: "v-c97c4172" */
    "./index.html.8dad8036.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-2eba8485": () => __vitePreload(() => import(
    /* webpackChunkName: "v-2eba8485" */
    "./Synchronized\u7684\u5B9E\u73B0\u539F\u7406.html.2c5885a2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-9e1d9d06": () => __vitePreload(() => import(
    /* webpackChunkName: "v-9e1d9d06" */
    "./synchronized\u5173\u952E\u5B57.html.d4e956b5.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-055f70b2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-055f70b2" */
    "./synchronized\u8BE6\u89E3.html.f7c9f46b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-a9a9a482": () => __vitePreload(() => import(
    /* webpackChunkName: "v-a9a9a482" */
    "./index.html.e7ed58cb.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-44656a92": () => __vitePreload(() => import(
    /* webpackChunkName: "v-44656a92" */
    "./java\u5185\u5B58\u6A21\u578B.html.dbd8b0a3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5c037bfd": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5c037bfd" */
    "./volatile\u5173\u952E\u5B57.html.ced6a024.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-630cd524": () => __vitePreload(() => import(
    /* webpackChunkName: "v-630cd524" */
    "./volatile\u5173\u952E\u5B57old.html.63248914.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-e7cad4ca": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e7cad4ca" */
    "./index.html.33cccd15.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-53d8149a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-53d8149a" */
    "./ThreadLocal.html.a2c70df8.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-e9a74b8c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e9a74b8c" */
    "./ThreadLocal\u4F7F\u7528\u4E0D\u5F53\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F.html.162f37d7.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1733f725": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1733f725" */
    "./ThreadLocal\u4F7F\u7528\u573A\u666F.html.672ce97d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4225fb47": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4225fb47" */
    "./ThreadLocal\u8BE6\u89E3.html.b06ee027.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-31d26e23": () => __vitePreload(() => import(
    /* webpackChunkName: "v-31d26e23" */
    "./AtomicInteger\u6E90\u7801\u89E3\u6790.html.9a057515.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-b1782f30": () => __vitePreload(() => import(
    /* webpackChunkName: "v-b1782f30" */
    "./AtomicStampedReference\u6E90\u7801\u89E3\u6790.html.0873311c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-39fd92ed": () => __vitePreload(() => import(
    /* webpackChunkName: "v-39fd92ed" */
    "./Atomic\u539F\u5B50\u7C7B.html.21104dc9.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5634669d": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5634669d" */
    "./index.html.57881c6d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-62d4a013": () => __vitePreload(() => import(
    /* webpackChunkName: "v-62d4a013" */
    "./ThreadPoolTaskExecutor\u548CThreadPoolExecutor\u6709\u4F55\u533A\u522B.html.78634602.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6e5f8241": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6e5f8241" */
    "./index.html.492f0260.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-525ddd8c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-525ddd8c" */
    "./UnSafe\u7C7B\u8BE6\u89E3.html.90965fa8.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-03650f65": () => __vitePreload(() => import(
    /* webpackChunkName: "v-03650f65" */
    "./cas.html.554267c2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-254881ea": () => __vitePreload(() => import(
    /* webpackChunkName: "v-254881ea" */
    "./Java\u4E2D\u6240\u6709\u7684\u9501.html.f2a47d45.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5e15c1fd": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5e15c1fd" */
    "./index.html.62fd8f93.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-710876ec": () => __vitePreload(() => import(
    /* webpackChunkName: "v-710876ec" */
    "./java\u81EA\u65CB\u9501.html.0c89bc7f.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-9ccd68b2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-9ccd68b2" */
    "./\u4E50\u89C2\u9501\u548C\u60B2\u89C2\u9501.html.33e603bb.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5739c2bc": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5739c2bc" */
    "./index.html.a5ee2d09.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-0df5f8a9": () => __vitePreload(() => import(
    /* webpackChunkName: "v-0df5f8a9" */
    "./\u5728\u63A5\u53E3\u4E2D\u4F7F\u7528\u7EBF\u7A0B\u6C60\uFF0C\u5904\u7406\u6570\u636E.html.0160d933.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-57e2a49f": () => __vitePreload(() => import(
    /* webpackChunkName: "v-57e2a49f" */
    "./\u7EBF\u7A0B\u6C60\u56DB\u79CD\u521B\u5EFA\u7EBF\u7A0B\u7684\u65B9\u6CD5.html.73c192a1.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3d6f9163": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3d6f9163" */
    "./\u7EBF\u7A0B\u6C60\u6267\u884C\u5B8C\u6240\u6709\u4EFB\u52A1\u540E\u518D\u6267\u884C\u4E3B\u7EBF\u7A0B.html.6101e21e.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3706649a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./404.html.c364bc08.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5bc93818": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5bc93818" */
    "./index.html.dd09a0d1.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-744d024e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-744d024e" */
    "./index.html.fa0513dd.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-e52c881c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e52c881c" */
    "./index.html.a59b96e5.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-75ed4ea4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-75ed4ea4" */
    "./index.html.2d28b454.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-d804e652": () => __vitePreload(() => import(
    /* webpackChunkName: "v-d804e652" */
    "./index.html.a837ef9c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-154dc4c4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-154dc4c4" */
    "./index.html.93981639.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-01560935": () => __vitePreload(() => import(
    /* webpackChunkName: "v-01560935" */
    "./index.html.13d385c0.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5831b135": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5831b135" */
    "./index.html.157642e2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-65f163c6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-65f163c6" */
    "./index.html.db941437.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-573729ca": () => __vitePreload(() => import(
    /* webpackChunkName: "v-573729ca" */
    "./index.html.ec052ab2.js"
  ), true ? [] : void 0).then(({ data }) => data)
};
function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map2[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$2(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow$1(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$2(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$2(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow$1(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$1(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue$1[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue$1.length || !queue$1.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i2 = queue$1.indexOf(job);
  if (i2 > flushIndex) {
    queue$1.splice(i2, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray$1(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen2, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    {
      seen2 = seen2 || /* @__PURE__ */ new Map();
    }
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (checkRecursiveUpdates(seen2, activePreFlushCbs[preFlushIndex])) {
        continue;
      }
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen2, parentJob);
  }
}
function flushPostFlushCbs(seen2) {
  flushPreFlushCbs();
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen2 = seen2 || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen2, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  flushPreFlushCbs(seen2);
  queue$1.sort((a2, b2) => getId(a2) - getId(b2));
  const check = (job) => checkRecursiveUpdates(seen2, job);
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen2);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen2);
    }
  }
}
function checkRecursiveUpdates(seen2, fn) {
  if (!seen2.has(fn)) {
    seen2.set(fn, 1);
  } else {
    const count = seen2.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen2.set(fn, count + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
      if (instance.parent.type.__asyncLoader && instance.parent.ceReload) {
        instance.parent.ceReload(newComp.styles);
      }
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e2) {
      console.error(e2);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit("app:unmount", app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook("component:added");
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated");
const devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook("component:removed");
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:start");
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:end");
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => a2.trim());
    }
    if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render2.length > 1 ? render2(props, true ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i2 = 0, l2 = allAttrs.length; i2 < l2; i2++) {
          const key = allAttrs[i2];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
        }
        if (eventAttrs.length) {
          warn$1(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root)) {
      warn$1(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn$1(`Component inside <Transition> renders non-element root node that cannot be animated.`);
    }
    root.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index2 = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index2] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i2 = 0; i2 < children.length; i2++) {
    const child = children[i2];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i2 = 0; i2 < dynamicProps.length; i2++) {
        const key = dynamicProps[i2];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow$1(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i2) => hasChanged(v, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => queuePreFlushCb(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen2) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, seen2);
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen2);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen2);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c2 of children) {
          if (c2.type !== Comment) {
            if (hasFound) {
              warn$1("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            child = c2;
            hasFound = true;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn$1(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i2 = 0; i2 < children.length; i2++) {
    let child = children[i2];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i2);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i2 = 0; i2 < ret.length; i2++) {
      ret[i2].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay: delay2 = 200,
    timeout,
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (!comp) {
        warn$1(`Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`);
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if (comp && !isObject(comp) && !isFunction(comp)) {
        throw new Error(`Invalid async component load result: ${comp}`);
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(err, instance, 13, !errorComponent);
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay2);
      if (delay2) {
        setTimeout(() => {
          delayed.value = false;
        }, delay2);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(`Async component timed out after ${timeout}ms.`);
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, { vnode: { ref: ref2, props, children, shapeFlag }, parent }) {
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i2 = 0; i2 < bindings.length; i2++) {
    const binding = bindings[i2];
    if (oldBindings) {
      binding.oldValue = oldBindings[i2].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component, false);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i2) => i2,
  $el: (i2) => i2.vnode.el,
  $data: (i2) => i2.data,
  $props: (i2) => shallowReadonly(i2.props),
  $attrs: (i2) => shallowReadonly(i2.attrs),
  $slots: (i2) => shallowReadonly(i2.slots),
  $refs: (i2) => shallowReadonly(i2.refs),
  $parent: (i2) => getPublicInstance(i2.parent),
  $root: (i2) => getPublicInstance(i2.root),
  $emit: (i2) => i2.emit,
  $options: (i2) => resolveMergedOptions(i2),
  $forceUpdate: (i2) => i2.f || (i2.f = () => queueJob(i2.update)),
  $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
  $watch: (i2) => instanceWatch.bind(i2)
});
const isReservedPrefix = (key) => key === "_" || key === "$";
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        markAttrsAccessed();
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString$1(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v) => c2.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn$1(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base2 = instance.type;
  const { mixins, extends: extendsOptions } = base2;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base2);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base2;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions$1(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base2, optionMergeStrategies);
  }
  cache.set(base2, resolved);
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions$1(to, m2, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString$1(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message2 = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message2 += ` with value ${expectedValue}`;
  }
  message2 += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message2 += `with value ${receivedValue}.`;
  }
  return message2;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance) {
      warn$1(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      {
        warn$1(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn$1(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating) {
        extend(slots, children);
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else {
          warn$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$1(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else {
          warn$1(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else {
          warn$1(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r2, i2) => setRef(r2, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn$1(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else {
          warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else {
      warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let hasMismatch = false;
const isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
const isComment = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const { mt: mountComponent, p: patch, o: { patchProp: patchProp2, createText, nextSibling, parentNode, remove: remove2, insert, createComment } } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      warn$1(`Attempting to hydrate existing markup but container is empty. Performing full mount instead.`);
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
    const { type, ref: ref2, shapeFlag, patchFlag } = vnode;
    const domType = node.nodeType;
    vnode.el = node;
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            warn$1(`Hydration text mismatch:
- Client: ${JSON.stringify(node.data)}
- Server: ${JSON.stringify(vnode.children)}`);
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (domType !== 1 && domType !== 3) {
          nextNode = onMismatch();
        } else {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i2 = 0; i2 < vnode.staticCount; i2++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i2 === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return nextNode;
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
        break;
      default:
        if (shapeFlag & 1) {
          if (domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
          nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
          if (nextNode && isComment(nextNode) && nextNode.data === "teleport end") {
            nextNode = nextSibling(nextNode);
          }
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
        } else {
          warn$1("Invalid HostVNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs } = vnode;
    const forcePatchValue = type === "input" && dirs || type === "option";
    {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
          for (const key in props) {
            if (forcePatchValue && key.endsWith("value") || isOn(key) && !isReservedProp(key)) {
              patchProp2(el, key, null, props[key], false, void 0, parentComponent);
            }
          }
        } else if (props.onClick) {
          patchProp2(el, "onClick", null, props.onClick, false, void 0, parentComponent);
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
      if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        let hasWarned = false;
        while (next) {
          hasMismatch = true;
          if (!hasWarned) {
            warn$1(`Hydration children mismatch in <${vnode.type}>: server rendered element contains more child nodes than client vdom.`);
            hasWarned = true;
          }
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          warn$1(`Hydration text content mismatch in <${vnode.type}>:
- Client: ${el.textContent}
- Server: ${vnode.children}`);
          el.textContent = vnode.children;
        }
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l2 = children.length;
    let hasWarned = false;
    for (let i2 = 0; i2 < l2; i2++) {
      const vnode = optimized ? children[i2] : children[i2] = normalizeVNode(children[i2]);
      if (node) {
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        if (!hasWarned) {
          warn$1(`Hydration children mismatch in <${container.tagName.toLowerCase()}>: server rendered element contains fewer child nodes than client vdom.`);
          hasWarned = true;
        }
        patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    warn$1(`Hydration node mismatch:
- Client vnode:`, vnode.type, `
- Server rendered DOM:`, node, node.nodeType === 3 ? `(text)` : isComment(node) && node.data === "[" ? `(start of fragment)` : ``);
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAsyncAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
    return next;
  };
  const locateClosingAsyncAnchor = (node) => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === "[")
          match++;
        if (node.data === "]") {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  return [hydrate, hydrateNode];
}
let supported$1;
let perf$1;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf$1.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf$1.mark(endTag);
    perf$1.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf$1.clearMarks(startTag);
    perf$1.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function isSupported() {
  if (supported$1 !== void 0) {
    return supported$1;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported$1 = true;
    perf$1 = window.performance;
  } else {
    supported$1 = false;
  }
  return supported$1;
}
function initFeatureFlags() {
  const needWarn = [];
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else {
          warn$1("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
        hostSetScopeId(el, slotScopeIds[i2]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) {
      const child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      if (parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
            const key = propsToUpdate[i2];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i2 = 0; i2 < newChildren.length; i2++) {
      const oldVNode = oldChildren[i2];
      const newVNode = newChildren[i2];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (isHmrUpdating || patchFlag & 2048) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        } else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m2, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          {
            endMeasure(instance, `render`);
          }
          {
            startMeasure(instance, `patch`);
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m2) {
          queuePostRenderEffect(m2, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u2, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u2) {
          queuePostRenderEffect(u2, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
        {
          devtoolsComponentUpdated(instance);
        }
        {
          popWarningContext();
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    {
      effect.onTrack = instance.rtc ? (e2) => invokeArrayFns(instance.rtc, e2) : void 0;
      effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns(instance.rtg, e2) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i2;
    for (i2 = 0; i2 < commonLength; i2++) {
      const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i2 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[i2];
      const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i2++;
    }
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i2 > e1) {
      if (i2 <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i2 <= e2) {
          patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i2++;
        }
      }
    } else if (i2 > e2) {
      while (i2 <= e1) {
        unmount(c1[i2], parentComponent, parentSuspense, true);
        i2++;
      }
    } else {
      const s1 = i2;
      const s2 = i2;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i2 = s2; i2 <= e2; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$1(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
          }
          keyToNewIndexMap.set(nextChild.key, i2);
        }
      }
      let j2;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i2 = 0; i2 < toBePatched; i2++)
        newIndexToOldIndexMap[i2] = 0;
      for (i2 = s1; i2 <= e1; i2++) {
        const prevChild = c1[i2];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j2 = s2; j2 <= e2; j2++) {
            if (newIndexToOldIndexMap[j2 - s2] === 0 && isSameVNodeType(prevChild, c2[j2])) {
              newIndex = j2;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i2 = toBePatched - 1; i2 >= 0; i2--) {
        const nextIndex = s2 + i2;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i2] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j2 < 0 || i2 !== increasingNewIndexSequence[j2]) {
            move(nextChild, container, anchor, 2);
          } else {
            j2--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i2 = 0; i2 < children.length; i2++) {
        move(children[i2], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) {
      unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i2 = 0; i2 < ch1.length; i2++) {
      const c1 = ch1[i2];
      let c2 = ch2[i2];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i2, j2, u2, v, c2;
  const len = arr.length;
  for (i2 = 0; i2 < len; i2++) {
    const arrI = arr[i2];
    if (arrI !== 0) {
      j2 = result[result.length - 1];
      if (arr[j2] < arrI) {
        p2[i2] = j2;
        result.push(i2);
        continue;
      }
      u2 = 0;
      v = result.length - 1;
      while (u2 < v) {
        c2 = u2 + v >> 1;
        if (arr[result[c2]] < arrI) {
          u2 = c2 + 1;
        } else {
          v = c2;
        }
      }
      if (arrI < arr[result[u2]]) {
        if (u2 > 0) {
          p2[i2] = result[u2 - 1];
        }
        result[u2] = i2;
      }
    }
  }
  u2 = result.length;
  v = result[u2 - 1];
  while (u2-- > 0) {
    result[u2] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...args);
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$1(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray$1(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMerge = args[i2];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a2;
  const Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e2) => {
          handleError(e2, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a2 = Component.name) !== null && _a2 !== void 0 ? _a2 : "Anonymous";
          warn$1(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
        {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$1(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h$2(type, propsOrChildren, children) {
  const l2 = arguments.length;
  if (l2 === 2) {
    if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l2 > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l2 === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$1(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m2) => isKeyOfType(m2, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version = "3.2.37";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag2, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag2) : doc.createElement(tag2, is ? { is } : void 0);
    if (tag2 === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i2 = 0; i2 < prefixes.length; i2++) {
    const prefixed = prefixes[i2] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e2) {
    {
      warn$1(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e2);
    }
  }
  needRemove && el.removeAttribute(key);
}
const [_getNow, skipTimestampCheck] = /* @__PURE__ */ (() => {
  let _getNow2 = Date.now;
  let skipTimestampCheck2 = false;
  if (typeof window !== "undefined") {
    if (Date.now() > document.createEvent("Event").timeStamp) {
      _getNow2 = performance.now.bind(performance);
    }
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck2 = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  return [_getNow2, skipTimestampCheck2];
})();
let cachedNow = 0;
const p$3 = /* @__PURE__ */ Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p$3.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m2;
    while (m2 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m2[0].length);
      options[m2[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    const timeStamp = e2.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, invoker.value), instance, 5, [e2]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn && fn(e3));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h$2(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n2 = NumberOf(duration);
    return [n2, n2];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  validateDuration(res);
  return res;
}
function validateDuration(val) {
  if (typeof val !== "number") {
    warn$1(`<transition> explicit duration is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$1(`<transition> explicit duration is NaN - the duration expression might be incorrect.`);
  }
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e2) => {
    if (e2.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d2, i2) => toMs(d2) + toMs(delays[i2])));
}
function toMs(s2) {
  return Number(s2.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c2) => {
        const el = c2.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el._moveCb = (e2) => {
          if (e2 && e2.target !== el) {
            return;
          }
          if (!e2 || /transform$/.test(e2.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag2 = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i2 = 0; i2 < children.length; i2++) {
        const child = children[i2];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else {
          warn$1(`<TransitionGroup> children must be keyed.`);
        }
      }
      if (prevChildren) {
        for (let i2 = 0; i2 < prevChildren.length; i2++) {
          const child = prevChildren[i2];
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag2, null, children);
    };
  }
};
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c2) {
  const el = c2.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
}
function recordPosition(c2) {
  newPositionMap.set(c2, c2.el.getBoundingClientRect());
}
function applyTranslation(c2) {
  const oldPos = positionMap.get(c2);
  const newPos = newPositionMap.get(c2);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s2 = c2.el.style;
    s2.transform = s2.webkitTransform = `translate(${dx}px,${dy}px)`;
    s2.transitionDuration = "0s";
    return c2;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c2) => c2 && clone.classList.remove(c2));
    });
  }
  moveClass.split(/\s+/).forEach((c2) => c2 && clone.classList.add(c2));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };
  return app;
};
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag2) => isHTMLTag(tag2) || isSVGTag(tag2),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn$1(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn$1(msg);
        return compilerOptions;
      },
      set() {
        warn$1(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn$1(`Failed to mount app: mount target selector "${container}" returned null.`);
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn$1(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
  }
  return container;
}
function initDev() {
  {
    initCustomFormatter();
  }
}
{
  initDev();
}
const siteData$1 = JSON.parse('{"base":"/","lang":"zh-CN","title":"Java\u5B66\u4E60\u7B14\u8BB0","description":"\u6211\u7684\u5DE5\u4F5C\u603B\u7ED3\uFF0C\u8BFB\u4E66\u7B14\u8BB0","head":[],"locales":{}}');
var resolveHeadIdentifier = ([
  tag2,
  attrs,
  content
]) => {
  if (tag2 === "meta" && attrs.name) {
    return `${tag2}.${attrs.name}`;
  }
  if (["title", "base"].includes(tag2)) {
    return tag2;
  }
  if (tag2 === "template" && attrs.id) {
    return `${tag2}.${attrs.id}`;
  }
  return JSON.stringify([tag2, attrs, content]);
};
var dedupeHead = (head) => {
  const identifierSet = /* @__PURE__ */ new Set();
  const result = [];
  head.forEach((item) => {
    const identifier = resolveHeadIdentifier(item);
    if (!identifierSet.has(identifier)) {
      identifierSet.add(identifier);
      result.push(item);
    }
  });
  return result;
};
var ensureEndingSlash = (str) => /(\.html|\/)$/.test(str) ? str : str + "/";
var isLinkFtp = (link) => link.startsWith("ftp://");
var isLinkHttp = (link) => /^(https?:)?\/\//.test(link);
var markdownLinkRegexp = /.md((\?|#).*)?$/;
var isLinkExternal = (link, base2 = "/") => {
  if (isLinkHttp(link) || isLinkFtp(link)) {
    return true;
  }
  if (link.startsWith("/") && !link.startsWith(base2) && !markdownLinkRegexp.test(link)) {
    return true;
  }
  return false;
};
var isLinkMailto = (link) => /^mailto:/.test(link);
var isLinkTel = (link) => /^tel:/.test(link);
var isPlainObject = (val) => Object.prototype.toString.call(val) === "[object Object]";
var removeEndingSlash = (str) => str.replace(/\/$/, "");
var removeLeadingSlash = (str) => str.replace(/^\//, "");
var resolveLocalePath = (locales2, routePath) => {
  const localePaths = Object.keys(locales2).sort((a2, b2) => {
    const levelDelta = b2.split("/").length - a2.split("/").length;
    if (levelDelta !== 0) {
      return levelDelta;
    }
    return b2.length - a2.length;
  });
  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return localePath;
    }
  }
  return "/";
};
const pagesComponents = {
  "v-8daa1a0e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./index.html.07c79c60.js"
  ), true ? ["assets/index.html.07c79c60.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-79fdd481": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-79fdd481" */
    "./home.html.a15a5e66.js"
  ), true ? ["assets/home.html.a15a5e66.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-14c69af4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-14c69af4" */
    "./index.html.7759f9b8.js"
  ), true ? ["assets/index.html.7759f9b8.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-35c4a6dd": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-35c4a6dd" */
    "./Java\u53CD\u5C04.html.e4b4cf9c.js"
  ), true ? ["assets/Java反射.html.e4b4cf9c.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-f3262b3a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-f3262b3a" */
    "./Java\u53CD\u5C042.html.cb7d9fec.js"
  ), true ? ["assets/Java反射2.html.cb7d9fec.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6e1a5ab5": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6e1a5ab5" */
    "./Java\u57FA\u7840.html.ddf301ef.js"
  ), true ? ["assets/Java基础.html.ddf301ef.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-39490ba5": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-39490ba5" */
    "./Java\u57FA\u7840\u9762\u8BD5\u63D0\u95EE.html.448b9b8f.js"
  ), true ? ["assets/Java基础面试提问.html.448b9b8f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-28851ef4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-28851ef4" */
    "./Java\u5F02\u5E38\u5904\u7406.html.60b3d4cc.js"
  ), true ? ["assets/Java异常处理.html.60b3d4cc.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-673af10a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-673af10a" */
    "./index.html.f98c745f.js"
  ), true ? ["assets/index.html.f98c745f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-08345439": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-08345439" */
    "./\u5173\u952E\u5B57\u603B\u7ED3.html.a9b4a8df.js"
  ), true ? ["assets/关键字总结.html.a9b4a8df.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-23375f22": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-23375f22" */
    "./ArrayList\u7684\u6269\u5BB9\u673A\u5236.html.f62e2f3b.js"
  ), true ? ["assets/ArrayList的扩容机制.html.f62e2f3b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3fc1c173": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3fc1c173" */
    "./Comparable\u548CComparator.html.6a5b90ba.js"
  ), true ? ["assets/Comparable和Comparator.html.6a5b90ba.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-616148db": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-616148db" */
    "./HashMap\u76F8\u5173\u95EE\u9898.html.afbdd68b.js"
  ), true ? ["assets/HashMap相关问题.html.afbdd68b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-2aae2a44": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-2aae2a44" */
    "./Java\u5BB9\u5668\u57FA\u7840.html.9ccb09e1.js"
  ), true ? ["assets/Java容器基础.html.9ccb09e1.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-16722c46": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-16722c46" */
    "./index.html.cc990008.js"
  ), true ? ["assets/index.html.cc990008.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-74f62882": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-74f62882" */
    "./Java\u53CD\u7F16\u8BD1\u547D\u4EE4-javap.html.e0c5d99d.js"
  ), true ? ["assets/Java反编译命令-javap.html.e0c5d99d.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-f15a9420": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-f15a9420" */
    "./Java\u547D\u4EE4\u53C2\u6570.html.6df62259.js"
  ), true ? ["assets/Java命令参数.html.6df62259.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3eed58e7": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3eed58e7" */
    "./Java\u7F16\u8BD1.html.c1be8993.js"
  ), true ? ["assets/Java编译.html.c1be8993.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-46dc7138": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-46dc7138" */
    "./index.html.ca29f288.js"
  ), true ? ["assets/index.html.ca29f288.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-9828af56": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-9828af56" */
    "./index.html.c76411a9.js"
  ), true ? ["assets/index.html.c76411a9.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-60b3db42": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-60b3db42" */
    "./Java8-\u51FD\u6570\u7F16\u7A0Blambda\u8868\u8FBE\u5F0F.html.619d8622.js"
  ), true ? ["assets/Java8-函数编程lambda表达式.html.619d8622.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-e46976e6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e46976e6" */
    "./index.html.7acfe2ee.js"
  ), true ? ["assets/index.html.7acfe2ee.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4ad508cc": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4ad508cc" */
    "./HotSpot\u865A\u62DF\u673A\u5BF9\u8C61\u521B\u5EFA.html.629b17a8.js"
  ), true ? ["assets/HotSpot虚拟机对象创建.html.629b17a8.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6e7a620a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6e7a620a" */
    "./JVM\u9762\u8BD5\u63D0\u95EE.html.43ef5fd2.js"
  ), true ? ["assets/JVM面试提问.html.43ef5fd2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-70cde54c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-70cde54c" */
    "./Java\u5185\u5B58\u533A\u57DF.html.0d9db0e9.js"
  ), true ? ["assets/Java内存区域.html.0d9db0e9.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6cec0ebc": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6cec0ebc" */
    "./index.html.75a91318.js"
  ), true ? ["assets/index.html.75a91318.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-28b05c99": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-28b05c99" */
    "./\u5E38\u89C1\u7684JVM\u8BBE\u7F6E.html.ef085663.js"
  ), true ? ["assets/常见的JVM设置.html.ef085663.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-48579df1": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-48579df1" */
    "./index.html.7550fc02.js"
  ), true ? ["assets/index.html.7550fc02.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-30d7209a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-30d7209a" */
    "./index.html.83882644.js"
  ), true ? ["assets/index.html.83882644.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-7e29c70a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-7e29c70a" */
    "./tomcat\u7C7B\u52A0\u8F7D\u5668.html.b00dc276.js"
  ), true ? ["assets/tomcat类加载器.html.b00dc276.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-55227aff": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-55227aff" */
    "./\u7C7B\u52A0\u8F7D\u5668.html.93b6cdda.js"
  ), true ? ["assets/类加载器.html.93b6cdda.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-121c2789": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-121c2789" */
    "./\u7C7B\u52A0\u8F7D\u5668\u5E38\u89C1\u9762\u8BD5.html.13a949f7.js"
  ), true ? ["assets/类加载器常见面试.html.13a949f7.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-302b9660": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-302b9660" */
    "./\u7C7B\u52A0\u8F7D\u8FC7\u7A0B.html.8ad0546b.js"
  ), true ? ["assets/类加载过程.html.8ad0546b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4ad388e6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4ad388e6" */
    "./\u7C7B\u52A0\u8F7D\u8FC7\u7A0B\u7CBE\u7B80\u7248.html.8c96c701.js"
  ), true ? ["assets/类加载过程精简版.html.8c96c701.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-53a8109a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-53a8109a" */
    "./GC\u4E2D\u5BF9\u8C61\u81EA\u6551.html.250ad61d.js"
  ), true ? ["assets/GC中对象自救.html.250ad61d.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-ec827a8e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-ec827a8e" */
    "./JVM\u5185\u5B58\u5206\u914D\u4E0E\u56DE\u6536.html.4e2125a1.js"
  ), true ? ["assets/JVM内存分配与回收.html.4e2125a1.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-c3f81230": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-c3f81230" */
    "./JVM\u5783\u573E\u56DE\u6536.html.7fa4df82.js"
  ), true ? ["assets/JVM垃圾回收.html.7fa4df82.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-b367d25a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-b367d25a" */
    "./Java\u5982\u4F55\u9009\u62E9\u5408\u9002\u7684\u5783\u573E\u56DE\u6536\u5668.html.48fb5b71.js"
  ), true ? ["assets/Java如何选择合适的垃圾回收器.html.48fb5b71.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4ede3af1": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4ede3af1" */
    "./index.html.0eb9257e.js"
  ), true ? ["assets/index.html.0eb9257e.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-238be5db": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-238be5db" */
    "./gc\u65E5\u5FD7\u5206\u6790.html.b13f3722.js"
  ), true ? ["assets/gc日志分析.html.b13f3722.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-38bac3e7": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-38bac3e7" */
    "./\u5783\u573E\u6536\u96C6\u5668.html.87c1604a.js"
  ), true ? ["assets/垃圾收集器.html.87c1604a.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-0266f14f": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-0266f14f" */
    "./\u5783\u573E\u6536\u96C6\u7B97\u6CD5.html.7c8e75bf.js"
  ), true ? ["assets/垃圾收集算法.html.7c8e75bf.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6b177d22": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6b177d22" */
    "./\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1.html.3de0c239.js"
  ), true ? ["assets/对象已经死亡.html.3de0c239.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6baa537a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6baa537a" */
    "./\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5FullGC.html.cbf04ca0.js"
  ), true ? ["assets/线上如何排查FullGC.html.cbf04ca0.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-a4db7fec": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-a4db7fec" */
    "./Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002.html.07c71367.js"
  ), true ? ["assets/Java堆设置多大合适.html.07c71367.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-d1478a00": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-d1478a00" */
    "./index.html.68764640.js"
  ), true ? ["assets/index.html.68764640.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-22b81989": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-22b81989" */
    "./jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406.html.8d7ba71d.js"
  ), true ? ["assets/jstack等命令的实现原理.html.8d7ba71d.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-69cfdb30": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-69cfdb30" */
    "./\u5185\u5B58\u6EA2\u51FA\u65F6\u6253\u5370\u5185\u5B58\u4FE1\u606F.html.2d174d32.js"
  ), true ? ["assets/内存溢出时打印内存信息.html.2d174d32.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-058d8bb2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-058d8bb2" */
    "./\u5982\u4F55\u5408\u7406\u7684\u89C4\u5212JVM\u6027\u80FD\u8C03\u4F18.html.ed78a9e5.js"
  ), true ? ["assets/如何合理的规划JVM性能调优.html.ed78a9e5.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-e5f5995e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e5f5995e" */
    "./JDK\u76D1\u63A7\u548C\u6545\u969C\u5904\u7406\u5DE5\u5177\u6C47\u603B.html.148c6660.js"
  ), true ? ["assets/JDK监控和故障处理工具汇总.html.148c6660.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-0e23e8d6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-0e23e8d6" */
    "./index.html.15ccb32f.js"
  ), true ? ["assets/index.html.15ccb32f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-410a868a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-410a868a" */
    "./BlockingQueue\u8BE6\u89E3.html.24c7b7bd.js"
  ), true ? ["assets/BlockingQueue详解.html.24c7b7bd.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-46552bec": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-46552bec" */
    "./index.html.eb005e77.js"
  ), true ? ["assets/index.html.eb005e77.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1839a060": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1839a060" */
    "./FutureTask\u8BE6\u89E3.html.74a1d003.js"
  ), true ? ["assets/FutureTask详解.html.74a1d003.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-311a40b5": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-311a40b5" */
    "./index.html.491c47fb.js"
  ), true ? ["assets/index.html.491c47fb.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-0d063008": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-0d063008" */
    "./ScheduledThreadPoolExecutor\u8BE6\u89E3.html.37245436.js"
  ), true ? ["assets/ScheduledThreadPoolExecutor详解.html.37245436.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-b3d2e942": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-b3d2e942" */
    "./ThreadPoolExecutor\u8BE6\u89E3.html.3d945ae2.js"
  ), true ? ["assets/ThreadPoolExecutor详解.html.3d945ae2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-c7d13846": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-c7d13846" */
    "./index.html.7c75a581.js"
  ), true ? ["assets/index.html.7c75a581.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-41a4e3e9": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-41a4e3e9" */
    "./\u9501\u6838\u5FC3\u7C7BAQS\u8BE6\u89E3.html.7e168199.js"
  ), true ? ["assets/锁核心类AQS详解.html.7e168199.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-b4e1b702": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-b4e1b702" */
    "./CountDownLatch\u8BE6\u89E3.html.7e8e2f66.js"
  ), true ? ["assets/CountDownLatch详解.html.7e8e2f66.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-16fd454a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-16fd454a" */
    "./index.html.c01a3963.js"
  ), true ? ["assets/index.html.c01a3963.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6b23f6d4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6b23f6d4" */
    "./index.html.d1ef2c08.js"
  ), true ? ["assets/index.html.d1ef2c08.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-bda03f78": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-bda03f78" */
    "./Java\u7EBF\u7A0B\u57FA\u7840.html.74fa6875.js"
  ), true ? ["assets/Java线程基础.html.74fa6875.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-409577a6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-409577a6" */
    "./index.html.e6e2602b.js"
  ), true ? ["assets/index.html.e6e2602b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-34babb4e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-34babb4e" */
    "./\u591A\u7EBF\u7A0B.html.db91977f.js"
  ), true ? ["assets/多线程.html.db91977f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-056df0c1": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-056df0c1" */
    "./\u591A\u7EBF\u7A0B\u7406\u8BBA\u57FA\u7840.html.6fee44c3.js"
  ), true ? ["assets/多线程理论基础.html.6fee44c3.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-07bbc8e6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-07bbc8e6" */
    "./\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501.html.90d182af.js"
  ), true ? ["assets/如何发现、预防、解决死锁.html.90d182af.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1af994a8": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1af994a8" */
    "./\u6B7B\u9501.html.f8ca5d33.js"
  ), true ? ["assets/死锁.html.f8ca5d33.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6ed69023": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6ed69023" */
    "./\u7EBF\u7A0B\u751F\u547D\u5468\u671F.html.bae26cb2.js"
  ), true ? ["assets/线程生命周期.html.bae26cb2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5dd87ef2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5dd87ef2" */
    "./\u7EBF\u7A0B\u901A\u4FE1.html.981cfe15.js"
  ), true ? ["assets/线程通信.html.981cfe15.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-2fbf52ae": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-2fbf52ae" */
    "./Callable\u548CFuture.html.5091e239.js"
  ), true ? ["assets/Callable和Future.html.5091e239.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-f0342900": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-f0342900" */
    "./Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60.html.80ca084b.js"
  ), true ? ["assets/Executors创建线程池.html.80ca084b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-73edc2c7": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-73edc2c7" */
    "./index.html.3773d7b0.js"
  ), true ? ["assets/index.html.3773d7b0.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-e79e511e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e79e511e" */
    "./ThreadPoolExecutor\u7C7B.html.83229c83.js"
  ), true ? ["assets/ThreadPoolExecutor类.html.83229c83.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1877f20d": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1877f20d" */
    "./\u5982\u4F55\u5408\u7406\u914D\u7F6E\u7EBF\u7A0B\u6C60\u7684\u5927\u5C0F.html.7b1815e6.js"
  ), true ? ["assets/如何合理配置线程池的大小.html.7b1815e6.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-331a0410": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-331a0410" */
    "./\u7EBF\u7A0B\u6C60.html.28ac225e.js"
  ), true ? ["assets/线程池.html.28ac225e.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6f41b47a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6f41b47a" */
    "./\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B.html.3a1d8cc9.js"
  ), true ? ["assets/线程池使用示例.html.3a1d8cc9.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-f58de1e8": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-f58de1e8" */
    "./\u7EBF\u7A0B\u6C60\u7684\u5177\u4F53\u5B9E\u73B0\u539F\u7406.html.4e57628b.js"
  ), true ? ["assets/线程池的具体实现原理.html.4e57628b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4c715521": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4c715521" */
    "./\u7EBF\u7A0B\u6C60\u7684\u5904\u7406\u6D41\u7A0B.html.2b5ff757.js"
  ), true ? ["assets/线程池的处理流程.html.2b5ff757.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-f4d08732": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-f4d08732" */
    "./\u7EBF\u7A0B\u5B89\u5168\u7684\u5B9E\u73B0\u65B9\u6CD5.html.bf711d39.js"
  ), true ? ["assets/线程安全的实现方法.html.bf711d39.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-15ea94a5": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-15ea94a5" */
    "./index.html.2cda7df3.js"
  ), true ? ["assets/index.html.2cda7df3.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4b2e63bd": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4b2e63bd" */
    "./Shallow\u548CRetained.html.ca067314.js"
  ), true ? ["assets/Shallow和Retained.html.ca067314.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1985c121": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1985c121" */
    "./mat\u4F7F\u7528.html.5367e3ce.js"
  ), true ? ["assets/mat使用.html.5367e3ce.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1c9d71a6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1c9d71a6" */
    "./mat\u5B89\u88C5.html.c1849ffd.js"
  ), true ? ["assets/mat安装.html.c1849ffd.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-838a1cfc": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-838a1cfc" */
    "./\u8BB0\u4E00\u6B21MAT\u5206\u6790\u7EBF\u4E0A\u9879\u76EE\u8FC7\u7A0B.html.443a0d89.js"
  ), true ? ["assets/记一次MAT分析线上项目过程.html.443a0d89.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-70a9a102": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-70a9a102" */
    "./index.html.2b620747.js"
  ), true ? ["assets/index.html.2b620747.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-8290979e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-8290979e" */
    "./mac\u7248idea\u914D\u7F6Evisualvm.html.dffc5da2.js"
  ), true ? ["assets/mac版idea配置visualvm.html.dffc5da2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-60b0e62a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-60b0e62a" */
    "./LockSupport\u6E90\u7801.html.2ba8c39f.js"
  ), true ? ["assets/LockSupport源码.html.2ba8c39f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-11263062": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-11263062" */
    "./LockSupport\u7528\u6CD5.html.a06302dc.js"
  ), true ? ["assets/LockSupport用法.html.a06302dc.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-a451c5f0": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-a451c5f0" */
    "./index.html.6a66636e.js"
  ), true ? ["assets/index.html.6a66636e.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-b87560d8": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-b87560d8" */
    "./index.html.f05f3045.js"
  ), true ? ["assets/index.html.f05f3045.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5d37ada4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5d37ada4" */
    "./ReentrantLock\u4E4B\u6761\u4EF6\u9501Condition\u6E90\u7801\u5206\u6790.html.e1264e04.js"
  ), true ? ["assets/ReentrantLock之条件锁Condition源码分析.html.e1264e04.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-78904604": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-78904604" */
    "./ReentrantLock\u548C\u6761\u4EF6\u9501Condition\u5B9E\u73B0\u963B\u585E\u961F\u5217ArrayBlockingQueue.html.d13f2d0f.js"
  ), true ? ["assets/ReentrantLock和条件锁Condition实现阻塞队列ArrayBlockingQueue.html.d13f2d0f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-387904f4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-387904f4" */
    "./ReentrantLock\u6E90\u7801\u5206\u6790.html.9cef5c71.js"
  ), true ? ["assets/ReentrantLock源码分析.html.9cef5c71.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-36cb5d1f": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-36cb5d1f" */
    "./ReentrantLock\u6E90\u7801\u5206\u6790\u4E09.html.8aca0bda.js"
  ), true ? ["assets/ReentrantLock源码分析三.html.8aca0bda.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-7e43ba5e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-7e43ba5e" */
    "./ReentrantLock\u6E90\u7801\u5206\u6790\u4E8C.html.fc6bda22.js"
  ), true ? ["assets/ReentrantLock源码分析二.html.fc6bda22.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-d8840068": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-d8840068" */
    "./ReentrantLock\u91CD\u5165\u9501.html.ab6d1b46.js"
  ), true ? ["assets/ReentrantLock重入锁.html.ab6d1b46.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-0485f54d": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-0485f54d" */
    "./index.html.35db0d96.js"
  ), true ? ["assets/index.html.35db0d96.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6d635beb": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6d635beb" */
    "./final\u5173\u952E\u5B57.html.fc6b6f37.js"
  ), true ? ["assets/final关键字.html.fc6b6f37.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-c97c4172": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-c97c4172" */
    "./index.html.1e6892a1.js"
  ), true ? ["assets/index.html.1e6892a1.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-2eba8485": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-2eba8485" */
    "./Synchronized\u7684\u5B9E\u73B0\u539F\u7406.html.3142c79e.js"
  ), true ? ["assets/Synchronized的实现原理.html.3142c79e.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-9e1d9d06": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-9e1d9d06" */
    "./synchronized\u5173\u952E\u5B57.html.b67fe1d6.js"
  ), true ? ["assets/synchronized关键字.html.b67fe1d6.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-055f70b2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-055f70b2" */
    "./synchronized\u8BE6\u89E3.html.cde876cd.js"
  ), true ? ["assets/synchronized详解.html.cde876cd.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-a9a9a482": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-a9a9a482" */
    "./index.html.efe5fe01.js"
  ), true ? ["assets/index.html.efe5fe01.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-44656a92": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-44656a92" */
    "./java\u5185\u5B58\u6A21\u578B.html.b41722c2.js"
  ), true ? ["assets/java内存模型.html.b41722c2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5c037bfd": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5c037bfd" */
    "./volatile\u5173\u952E\u5B57.html.40158c34.js"
  ), true ? ["assets/volatile关键字.html.40158c34.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-630cd524": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-630cd524" */
    "./volatile\u5173\u952E\u5B57old.html.98564aa7.js"
  ), true ? ["assets/volatile关键字old.html.98564aa7.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-e7cad4ca": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e7cad4ca" */
    "./index.html.ed586deb.js"
  ), true ? ["assets/index.html.ed586deb.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-53d8149a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-53d8149a" */
    "./ThreadLocal.html.c3ed2ca9.js"
  ), true ? ["assets/ThreadLocal.html.c3ed2ca9.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-e9a74b8c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e9a74b8c" */
    "./ThreadLocal\u4F7F\u7528\u4E0D\u5F53\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F.html.83f01ca9.js"
  ), true ? ["assets/ThreadLocal使用不当导致内存泄漏.html.83f01ca9.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1733f725": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1733f725" */
    "./ThreadLocal\u4F7F\u7528\u573A\u666F.html.86147bf9.js"
  ), true ? ["assets/ThreadLocal使用场景.html.86147bf9.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4225fb47": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4225fb47" */
    "./ThreadLocal\u8BE6\u89E3.html.68fe3f40.js"
  ), true ? ["assets/ThreadLocal详解.html.68fe3f40.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-31d26e23": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-31d26e23" */
    "./AtomicInteger\u6E90\u7801\u89E3\u6790.html.8f04986f.js"
  ), true ? ["assets/AtomicInteger源码解析.html.8f04986f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-b1782f30": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-b1782f30" */
    "./AtomicStampedReference\u6E90\u7801\u89E3\u6790.html.c93d2ed9.js"
  ), true ? ["assets/AtomicStampedReference源码解析.html.c93d2ed9.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-39fd92ed": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-39fd92ed" */
    "./Atomic\u539F\u5B50\u7C7B.html.228628b3.js"
  ), true ? ["assets/Atomic原子类.html.228628b3.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5634669d": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5634669d" */
    "./index.html.ee1999ef.js"
  ), true ? ["assets/index.html.ee1999ef.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-62d4a013": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-62d4a013" */
    "./ThreadPoolTaskExecutor\u548CThreadPoolExecutor\u6709\u4F55\u533A\u522B.html.78895f7d.js"
  ), true ? ["assets/ThreadPoolTaskExecutor和ThreadPoolExecutor有何区别.html.78895f7d.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6e5f8241": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6e5f8241" */
    "./index.html.a2ba176b.js"
  ), true ? ["assets/index.html.a2ba176b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-525ddd8c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-525ddd8c" */
    "./UnSafe\u7C7B\u8BE6\u89E3.html.9b6ef0f5.js"
  ), true ? ["assets/UnSafe类详解.html.9b6ef0f5.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-03650f65": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-03650f65" */
    "./cas.html.7a277bbe.js"
  ), true ? ["assets/cas.html.7a277bbe.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-254881ea": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-254881ea" */
    "./Java\u4E2D\u6240\u6709\u7684\u9501.html.01c7cdec.js"
  ), true ? ["assets/Java中所有的锁.html.01c7cdec.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5e15c1fd": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5e15c1fd" */
    "./index.html.2492c54d.js"
  ), true ? ["assets/index.html.2492c54d.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-710876ec": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-710876ec" */
    "./java\u81EA\u65CB\u9501.html.2ffffb58.js"
  ), true ? ["assets/java自旋锁.html.2ffffb58.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-9ccd68b2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-9ccd68b2" */
    "./\u4E50\u89C2\u9501\u548C\u60B2\u89C2\u9501.html.1c1f5dda.js"
  ), true ? ["assets/乐观锁和悲观锁.html.1c1f5dda.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5739c2bc": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5739c2bc" */
    "./index.html.daeb3066.js"
  ), true ? ["assets/index.html.daeb3066.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-0df5f8a9": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-0df5f8a9" */
    "./\u5728\u63A5\u53E3\u4E2D\u4F7F\u7528\u7EBF\u7A0B\u6C60\uFF0C\u5904\u7406\u6570\u636E.html.920c985a.js"
  ), true ? ["assets/在接口中使用线程池，处理数据.html.920c985a.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-57e2a49f": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-57e2a49f" */
    "./\u7EBF\u7A0B\u6C60\u56DB\u79CD\u521B\u5EFA\u7EBF\u7A0B\u7684\u65B9\u6CD5.html.7e8531cf.js"
  ), true ? ["assets/线程池四种创建线程的方法.html.7e8531cf.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3d6f9163": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3d6f9163" */
    "./\u7EBF\u7A0B\u6C60\u6267\u884C\u5B8C\u6240\u6709\u4EFB\u52A1\u540E\u518D\u6267\u884C\u4E3B\u7EBF\u7A0B.html.52b444e1.js"
  ), true ? ["assets/线程池执行完所有任务后再执行主线程.html.52b444e1.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3706649a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./404.html.731e02d7.js"
  ), true ? ["assets/404.html.731e02d7.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5bc93818": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5bc93818" */
    "./index.html.49fcb4f4.js"
  ), true ? ["assets/index.html.49fcb4f4.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-744d024e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-744d024e" */
    "./index.html.bf9c5d0f.js"
  ), true ? ["assets/index.html.bf9c5d0f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-e52c881c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e52c881c" */
    "./index.html.566ef91a.js"
  ), true ? ["assets/index.html.566ef91a.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-75ed4ea4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-75ed4ea4" */
    "./index.html.fd5e9b43.js"
  ), true ? ["assets/index.html.fd5e9b43.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-d804e652": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-d804e652" */
    "./index.html.d6d630f3.js"
  ), true ? ["assets/index.html.d6d630f3.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-154dc4c4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-154dc4c4" */
    "./index.html.63fd5df4.js"
  ), true ? ["assets/index.html.63fd5df4.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-01560935": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-01560935" */
    "./index.html.ab4d31e1.js"
  ), true ? ["assets/index.html.ab4d31e1.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5831b135": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5831b135" */
    "./index.html.a86623dc.js"
  ), true ? ["assets/index.html.a86623dc.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-65f163c6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-65f163c6" */
    "./index.html.16582611.js"
  ), true ? ["assets/index.html.16582611.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-573729ca": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-573729ca" */
    "./index.html.3fc58150.js"
  ), true ? ["assets/index.html.3fc58150.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0))
};
const layoutComponents = {
  "404": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "layout-404" */
    "./404.f119a35a.js"
  ), true ? ["assets/404.f119a35a.js","assets/SkipLink.6bb5451a.js"] : void 0)),
  "Layout": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "layout-Layout" */
    "./Layout.bf290907.js"
  ), true ? ["assets/Layout.bf290907.js","assets/SkipLink.6bb5451a.js"] : void 0)),
  "Slide": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "layout-Slide" */
    "./Slide.b9054106.js"
  ), true ? [] : void 0)),
  "Blog": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "layout-Blog" */
    "./Blog.996a4092.js"
  ), true ? ["assets/Blog.996a4092.js","assets/SkipLink.6bb5451a.js"] : void 0))
};
var pagesData = ref(pagesData$1);
var pageDataEmpty = readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  excerpt: "",
  headers: []
});
var pageData = ref(pageDataEmpty);
var usePageData = () => pageData;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updatePageData = (data) => {
    pagesData.value[data.key] = () => Promise.resolve(data);
    if (data.key === pageData.value.key) {
      pageData.value = data;
    }
  };
}
var pageFrontmatterSymbol = Symbol("");
var usePageFrontmatter = () => {
  const pageFrontmatter = inject(pageFrontmatterSymbol);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};
var pageHeadSymbol = Symbol("");
var usePageHead = () => {
  const pageHead = inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
var pageHeadTitleSymbol = Symbol("");
var usePageHeadTitle = () => {
  const pageHeadTitle = inject(pageHeadTitleSymbol);
  if (!pageHeadTitle) {
    throw new Error("usePageHeadTitle() is called without provider.");
  }
  return pageHeadTitle;
};
var pageLangSymbol = Symbol("");
var usePageLang = () => {
  const pageLang = inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
var routeLocaleSymbol = Symbol("");
var useRouteLocale = () => {
  const routeLocale = inject(routeLocaleSymbol);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};
var siteData = ref(siteData$1);
var useSiteData = () => siteData;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateSiteData = (data) => {
    siteData.value = data;
  };
}
var siteLocaleDataSymbol = Symbol("");
var useSiteLocaleData = () => {
  const siteLocaleData = inject(siteLocaleDataSymbol);
  if (!siteLocaleData) {
    throw new Error("useSiteLocaleData() is called without provider.");
  }
  return siteLocaleData;
};
var updateHeadSymbol = Symbol("");
var resolvers = reactive({
  resolvePageData: async (pageKey) => {
    const pageDataResolver = pagesData.value[pageKey];
    const pageData2 = await (pageDataResolver == null ? void 0 : pageDataResolver());
    return pageData2 != null ? pageData2 : pageDataEmpty;
  },
  resolvePageFrontmatter: (pageData2) => pageData2.frontmatter,
  resolvePageHead: (headTitle, frontmatter, siteLocale) => {
    const description = isString$1(frontmatter.description) ? frontmatter.description : siteLocale.description;
    const head = [
      ...isArray$1(frontmatter.head) ? frontmatter.head : [],
      ...siteLocale.head,
      ["title", {}, headTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead(head);
  },
  resolvePageHeadTitle: (page2, siteLocale) => `${page2.title ? `${page2.title} | ` : ``}${siteLocale.title}`,
  resolvePageLang: (pageData2) => pageData2.lang || "en",
  resolveRouteLocale: (locales2, routePath) => resolveLocalePath(locales2, routePath),
  resolveSiteLocaleData: (site, routeLocale) => ({
    ...site,
    ...site.locales[routeLocale]
  })
});
var ClientOnly = defineComponent({
  name: "ClientOnly",
  setup(_2, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a2, _b;
      return isMounted.value ? (_b = (_a2 = ctx.slots).default) == null ? void 0 : _b.call(_a2) : null;
    };
  }
});
var Content = defineComponent({
  name: "Content",
  props: {
    pageKey: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const page2 = usePageData();
    const pageComponent = computed(() => pagesComponents[props.pageKey || page2.value.key]);
    return () => pageComponent.value ? h$2(pageComponent.value) : h$2("div", "404 Not Found");
  }
});
var Vuepress = defineComponent({
  name: "Vuepress",
  setup() {
    const page2 = usePageData();
    const layoutComponent = computed(() => {
      let layoutName;
      if (page2.value.path) {
        const frontmatterLayout = page2.value.frontmatter.layout;
        if (isString$1(frontmatterLayout)) {
          layoutName = frontmatterLayout;
        } else {
          layoutName = "Layout";
        }
      } else {
        layoutName = "404";
      }
      return layoutComponents[layoutName] || resolveComponent(layoutName, false);
    });
    return () => h$2(layoutComponent.value);
  }
});
var withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  const base2 = useSiteData().value.base;
  return `${base2}${removeLeadingSlash(url)}`;
};
var hopeInject = "";
var clientConfig0 = {};
var _a;
const isClient = typeof window !== "undefined";
const isString = (val) => typeof val === "string";
const noop$1 = () => {
};
const isIOS = isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  const filter = (invoke) => {
    const duration = unref(ms);
    const maxDuration = unref(options.maxWait);
    if (timer)
      clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        clearTimeout(maxTimer);
        maxTimer = null;
      }
      return invoke();
    }
    if (maxDuration && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer)
          clearTimeout(timer);
        maxTimer = null;
        invoke();
      }, maxDuration);
    }
    timer = setTimeout(() => {
      if (maxTimer)
        clearTimeout(maxTimer);
      maxTimer = null;
      invoke();
    }, duration);
  };
  return filter;
}
function throttleFilter(ms, trailing = true, leading = true) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  const clear2 = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
  };
  const filter = (invoke) => {
    const duration = unref(ms);
    const elapsed = Date.now() - lastExec;
    clear2();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      timer = setTimeout(() => {
        lastExec = Date.now();
        isLeading = true;
        clear2();
        invoke();
      }, duration);
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive, pause, resume, eventFilter };
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function useThrottleFn(fn, ms = 200, trailing = true, leading = true) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading), fn);
}
function tryOnBeforeMount(fn, sync = true) {
  if (getCurrentInstance())
    onBeforeMount(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$6.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$6.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter = bypassFilter
  } = _a2, watchOptions = __objRest$5(_a2, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$2.call(b2, prop))
      __defNormalProp$2(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b2)) {
      if (__propIsEnum$2.call(b2, prop))
        __defNormalProp$2(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps$2 = (a2, b2) => __defProps$2(a2, __getOwnPropDescs$2(b2));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchPausable(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter: filter
  } = _a2, watchOptions = __objRest$1(_a2, [
    "eventFilter"
  ]);
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(source, cb, __spreadProps$2(__spreadValues$2({}, watchOptions), {
    eventFilter
  }));
  return { stop, pause, resume, isActive };
}
function unrefElement(elRef) {
  var _a2;
  const plain = unref(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
}
const defaultWindow = isClient ? window : void 0;
const defaultDocument = isClient ? window.document : void 0;
isClient ? window.navigator : void 0;
isClient ? window.location : void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop$1;
  let cleanup = noop$1;
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop$1;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore, capture = true, detectIframe = false } = options;
  if (!window2)
    return;
  const shouldListen = ref(true);
  let fallback;
  const listener = (event) => {
    window2.clearTimeout(fallback);
    const el = unrefElement(target);
    const composedPath = event.composedPath();
    if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value)
      return;
    if (ignore && ignore.length > 0) {
      if (ignore.some((target2) => {
        const el2 = unrefElement(target2);
        return el2 && (event.target === el2 || composedPath.includes(el2));
      }))
        return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e2) => {
      const el = unrefElement(target);
      shouldListen.value = !!el && !e2.composedPath().includes(el);
    }, { passive: true }),
    useEventListener(window2, "pointerup", (e2) => {
      if (e2.button === 0) {
        const path = e2.composedPath();
        e2.composedPath = () => path;
        fallback = window2.setTimeout(() => listener(e2), 50);
      }
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      var _a2;
      const el = unrefElement(target);
      if (((_a2 = document.activeElement) == null ? void 0 : _a2.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(document.activeElement)))
        handler(event);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported2 = Boolean(window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  let mediaQuery;
  const matches = ref(false);
  const update = () => {
    if (!isSupported2)
      return;
    if (!mediaQuery)
      mediaQuery = window2.matchMedia(query);
    matches.value = mediaQuery.matches;
  };
  tryOnBeforeMount(() => {
    update();
    if (!mediaQuery)
      return;
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update);
    else
      mediaQuery.addListener(update);
    tryOnScopeDispose(() => {
      if ("removeEventListener" in mediaQuery)
        mediaQuery.removeEventListener("change", update);
      else
        mediaQuery.removeListener(update);
    });
  });
  return matches;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
function useStorage(key, initialValue, storage, options = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e2) => {
      console.error(e2);
    }
  } = options;
  const data = (shallow ? shallowRef : ref)(initialValue);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a22;
        return (_a22 = defaultWindow) == null ? void 0 : _a22.localStorage;
      })();
    } catch (e2) {
      onError(e2);
    }
  }
  if (!storage)
    return data;
  const rawInit = unref(initialValue);
  const type = guessSerializerType(rawInit);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, () => write(data.value), { flush, deep, eventFilter });
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", update);
  update();
  return data;
  function write(v) {
    try {
      if (v == null)
        storage.removeItem(key);
      else
        storage.setItem(key, serializer.write(v));
    } catch (e2) {
      onError(e2);
    }
  }
  function read(event) {
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      const rawValue = event ? event.newValue : storage.getItem(key);
      if (rawValue == null) {
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
        return rawInit;
      } else if (typeof rawValue !== "string") {
        return rawValue;
      } else {
        return serializer.read(rawValue);
      }
    } catch (e2) {
      onError(e2);
    } finally {
      resumeWatch();
    }
  }
  function update(event) {
    if (event && event.key !== key)
      return;
    data.value = read(event);
  }
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
const functionsMap = [
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    "fullscreenchange",
    "fullscreenerror"
  ],
  [
    "webkitRequestFullscreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "webkitRequestFullScreen",
    "webkitCancelFullScreen",
    "webkitCurrentFullScreenElement",
    "webkitCancelFullScreen",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozFullScreenElement",
    "mozFullScreenEnabled",
    "mozfullscreenchange",
    "mozfullscreenerror"
  ],
  [
    "msRequestFullscreen",
    "msExitFullscreen",
    "msFullscreenElement",
    "msFullscreenEnabled",
    "MSFullscreenChange",
    "MSFullscreenError"
  ]
];
function useFullscreen(target, options = {}) {
  const { document: document2 = defaultDocument, autoExit = false } = options;
  const targetRef = target || (document2 == null ? void 0 : document2.querySelector("html"));
  const isFullscreen = ref(false);
  let isSupported2 = false;
  let map2 = functionsMap[0];
  if (!document2) {
    isSupported2 = false;
  } else {
    for (const m2 of functionsMap) {
      if (m2[1] in document2) {
        map2 = m2;
        isSupported2 = true;
        break;
      }
    }
  }
  const [REQUEST, EXIT, ELEMENT, , EVENT] = map2;
  async function exit() {
    if (!isSupported2)
      return;
    if (document2 == null ? void 0 : document2[ELEMENT])
      await document2[EXIT]();
    isFullscreen.value = false;
  }
  async function enter() {
    if (!isSupported2)
      return;
    await exit();
    const target2 = unrefElement(targetRef);
    if (target2) {
      await target2[REQUEST]();
      isFullscreen.value = true;
    }
  }
  async function toggle() {
    if (isFullscreen.value)
      await exit();
    else
      await enter();
  }
  if (document2) {
    useEventListener(document2, EVENT, () => {
      isFullscreen.value = !!(document2 == null ? void 0 : document2[ELEMENT]);
    }, false);
  }
  if (autoExit)
    tryOnScopeDispose(exit);
  return {
    isSupported: isSupported2,
    isFullscreen,
    enter,
    exit,
    toggle
  };
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function preventDefault(rawEvent) {
  const e2 = rawEvent || window.event;
  if (e2.touches.length > 1)
    return true;
  if (e2.preventDefault)
    e2.preventDefault();
  return false;
}
function useScrollLock(element, initialState = false) {
  const isLocked = ref(initialState);
  let stopTouchMoveListener = null;
  let initialOverflow;
  watch(() => unref(element), (el) => {
    if (el) {
      const ele = el;
      initialOverflow = ele.style.overflow;
      if (isLocked.value)
        ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const ele = unref(element);
    if (!ele || isLocked.value)
      return;
    if (isIOS) {
      stopTouchMoveListener = useEventListener(ele, "touchmove", preventDefault, { passive: false });
    }
    ele.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    const ele = unref(element);
    if (!ele || !isLocked.value)
      return;
    isIOS && (stopTouchMoveListener == null ? void 0 : stopTouchMoveListener());
    ele.style.overflow = initialOverflow;
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v)
        lock();
      else
        unlock();
    }
  });
}
function useSessionStorage(key, initialValue, options = {}) {
  const { window: window2 = defaultWindow } = options;
  return useStorage(key, initialValue, window2 == null ? void 0 : window2.sessionStorage, options);
}
let _id = 0;
function useStyleTag(css2, options = {}) {
  const isLoaded = ref(false);
  const {
    document: document2 = defaultDocument,
    immediate = true,
    manual = false,
    id = `vueuse_styletag_${++_id}`
  } = options;
  const cssRef = ref(css2);
  let stop = () => {
  };
  const load = () => {
    if (!document2)
      return;
    const el = document2.getElementById(id) || document2.createElement("style");
    el.type = "text/css";
    el.id = id;
    if (options.media)
      el.media = options.media;
    document2.head.appendChild(el);
    if (isLoaded.value)
      return;
    stop = watch(cssRef, (value) => {
      el.innerText = value;
    }, { immediate: true });
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document2 || !isLoaded.value)
      return;
    stop();
    document2.head.removeChild(document2.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
var defineClientConfig = (clientConfig) => clientConfig;
var badge = "";
const e$1 = ({ type: e2 = "info", text: s2 = "", vertical: a2 = "top", color: o2 }, { slots: l2 }) => {
  var _a2;
  return h$2("span", { class: ["badge", e2, { diy: o2 }], style: { verticalAlign: a2, ...o2 ? { backgroundColor: o2 } : {} } }, s2 || ((_a2 = l2.default) == null ? void 0 : _a2.call(l2)));
};
e$1.displayName = "Badge";
const s$2 = ({ icon: s2 = "", color: l2, size: n2 }) => s2 ? h$2("span", { class: ["icon", `${"iconfont icon-"}${s2}`], ...l2 || n2 ? { style: { ...l2 ? { color: l2 } : {}, ...n2 ? { "font-size": `${n2}px` } : {} } } : {} }) : null;
s$2.displayName = "FontIcon";
var message = "";
const a$4 = ({ name: e2 = "", color: n2 = "currentColor" }, { slots: r2 }) => {
  var _a2;
  return h$2("svg", { xmlns: "http://www.w3.org/2000/svg", class: ["icon", `${e2}-icon`], viewBox: "0 0 1024 1024", fill: n2, "aria-label": `${e2} icon` }, (_a2 = r2.default) == null ? void 0 : _a2.call(r2));
};
a$4.displayName = "IconBase";
const u$4 = (t2, { slots: e2 }) => {
  var _a2;
  return ((_a2 = e2.default) == null ? void 0 : _a2.call(e2)) || null;
}, c$3 = (t2) => {
  const i2 = getCurrentInstance();
  return "object" == typeof (i2 == null ? void 0 : i2.appContext.components) && (t2 in i2.appContext.components || camelize(t2) in i2.appContext.components || capitalize(camelize(t2)) in i2.appContext.components);
}, f$1 = (t2) => {
  const e2 = useRouteLocale();
  return computed(() => t2[e2.value]);
}, D = (t2, e2) => {
  let n2 = 1;
  for (let e3 = 0; e3 < t2.length; e3++)
    n2 += t2.charCodeAt(e3), n2 += n2 << 10, n2 ^= n2 >> 6;
  return n2 += n2 << 3, n2 ^= n2 >> 11, n2 % e2;
}, _ = /#.*$/u, Y = (t2) => {
  const e2 = _.exec(t2);
  return e2 ? e2[0] : "";
}, w$1 = (t2) => decodeURI(t2).replace(_, "").replace(/(index)?\.(md|html)$/, ""), S = (t2, e2) => {
  if (void 0 === e2)
    return false;
  const n2 = w$1(t2.path), r2 = w$1(e2), i2 = Y(e2);
  return i2 ? i2 === t2.hash && (!r2 || n2 === r2) : n2 === r2;
};
class b {
  constructor() {
    const t2 = "message-container", e2 = document.getElementById(t2);
    e2 ? this.containerElement = e2 : (this.containerElement = document.createElement("div"), this.containerElement.id = t2, document.body.appendChild(this.containerElement));
  }
  pop(t2, e2 = 2e3) {
    const n2 = document.createElement("div");
    n2.className = "message move-in", n2.innerHTML = t2, this.containerElement.appendChild(n2), e2 > 0 && setTimeout(() => {
      this.close(n2);
    }, e2);
  }
  close(t2) {
    t2.className = t2.className.replace("move-in", ""), t2.className += "move-out", t2.addEventListener("animationend", () => {
      t2.remove();
    });
  }
}
Object.freeze({}), Object.freeze([]);
const x = (t2, ...e2) => {
  const n2 = t2.resolve(...e2), r2 = n2.matched[n2.matched.length - 1];
  if (!(r2 == null ? void 0 : r2.redirect))
    return n2;
  const { redirect: i2 } = r2, s2 = "function" == typeof i2 ? i2(n2) : i2;
  const o2 = ((t3) => "string" == typeof t3)(s2) ? { path: s2 } : s2;
  return x(t2, { hash: n2.hash, query: n2.query, params: n2.params, ...o2 });
};
var T, H = function() {
  var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i2 = "second", s2 = "minute", o2 = "hour", a2 = "day", u2 = "week", c2 = "month", f2 = "quarter", d2 = "year", h2 = "date", l2 = "Invalid Date", m2 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, $ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, p2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, v = function(t3, e3, n3) {
    var r3 = String(t3);
    return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n3) + t3;
  }, y2 = { s: v, z: function(t3) {
    var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r3 = Math.floor(n3 / 60), i3 = n3 % 60;
    return (e3 <= 0 ? "+" : "-") + v(r3, 2, "0") + ":" + v(i3, 2, "0");
  }, m: function t3(e3, n3) {
    if (e3.date() < n3.date())
      return -t3(n3, e3);
    var r3 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i3 = e3.clone().add(r3, c2), s3 = n3 - i3 < 0, o3 = e3.clone().add(r3 + (s3 ? -1 : 1), c2);
    return +(-(r3 + (n3 - i3) / (s3 ? i3 - o3 : o3 - i3)) || 0);
  }, a: function(t3) {
    return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
  }, p: function(t3) {
    return { M: c2, y: d2, w: u2, d: a2, D: h2, h: o2, m: s2, s: i2, ms: r2, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
  }, u: function(t3) {
    return void 0 === t3;
  } }, g = "en", M = {};
  M[g] = p2;
  var D2 = function(t3) {
    return t3 instanceof S2;
  }, _2 = function t3(e3, n3, r3) {
    var i3;
    if (!e3)
      return g;
    if ("string" == typeof e3) {
      var s3 = e3.toLowerCase();
      M[s3] && (i3 = s3), n3 && (M[s3] = n3, i3 = s3);
      var o3 = e3.split("-");
      if (!i3 && o3.length > 1)
        return t3(o3[0]);
    } else {
      var a3 = e3.name;
      M[a3] = e3, i3 = a3;
    }
    return !r3 && i3 && (g = i3), i3 || !r3 && g;
  }, Y2 = function(t3, e3) {
    if (D2(t3))
      return t3.clone();
    var n3 = "object" == typeof e3 ? e3 : {};
    return n3.date = t3, n3.args = arguments, new S2(n3);
  }, w2 = y2;
  w2.l = _2, w2.i = D2, w2.w = function(t3, e3) {
    return Y2(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
  };
  var S2 = function() {
    function p3(t3) {
      this.$L = _2(t3.locale, null, true), this.parse(t3);
    }
    var v2 = p3.prototype;
    return v2.parse = function(t3) {
      this.$d = function(t4) {
        var e3 = t4.date, n3 = t4.utc;
        if (null === e3)
          return new Date(NaN);
        if (w2.u(e3))
          return new Date();
        if (e3 instanceof Date)
          return new Date(e3);
        if ("string" == typeof e3 && !/Z$/i.test(e3)) {
          var r3 = e3.match(m2);
          if (r3) {
            var i3 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
            return n3 ? new Date(Date.UTC(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
          }
        }
        return new Date(e3);
      }(t3), this.$x = t3.x || {}, this.init();
    }, v2.init = function() {
      var t3 = this.$d;
      this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
    }, v2.$utils = function() {
      return w2;
    }, v2.isValid = function() {
      return !(this.$d.toString() === l2);
    }, v2.isSame = function(t3, e3) {
      var n3 = Y2(t3);
      return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
    }, v2.isAfter = function(t3, e3) {
      return Y2(t3) < this.startOf(e3);
    }, v2.isBefore = function(t3, e3) {
      return this.endOf(e3) < Y2(t3);
    }, v2.$g = function(t3, e3, n3) {
      return w2.u(t3) ? this[e3] : this.set(n3, t3);
    }, v2.unix = function() {
      return Math.floor(this.valueOf() / 1e3);
    }, v2.valueOf = function() {
      return this.$d.getTime();
    }, v2.startOf = function(t3, e3) {
      var n3 = this, r3 = !!w2.u(e3) || e3, f3 = w2.p(t3), l3 = function(t4, e4) {
        var i3 = w2.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
        return r3 ? i3 : i3.endOf(a2);
      }, m3 = function(t4, e4) {
        return w2.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
      }, $2 = this.$W, p4 = this.$M, v3 = this.$D, y3 = "set" + (this.$u ? "UTC" : "");
      switch (f3) {
        case d2:
          return r3 ? l3(1, 0) : l3(31, 11);
        case c2:
          return r3 ? l3(1, p4) : l3(0, p4 + 1);
        case u2:
          var g2 = this.$locale().weekStart || 0, M2 = ($2 < g2 ? $2 + 7 : $2) - g2;
          return l3(r3 ? v3 - M2 : v3 + (6 - M2), p4);
        case a2:
        case h2:
          return m3(y3 + "Hours", 0);
        case o2:
          return m3(y3 + "Minutes", 1);
        case s2:
          return m3(y3 + "Seconds", 2);
        case i2:
          return m3(y3 + "Milliseconds", 3);
        default:
          return this.clone();
      }
    }, v2.endOf = function(t3) {
      return this.startOf(t3, false);
    }, v2.$set = function(t3, e3) {
      var n3, u3 = w2.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l3 = (n3 = {}, n3[a2] = f3 + "Date", n3[h2] = f3 + "Date", n3[c2] = f3 + "Month", n3[d2] = f3 + "FullYear", n3[o2] = f3 + "Hours", n3[s2] = f3 + "Minutes", n3[i2] = f3 + "Seconds", n3[r2] = f3 + "Milliseconds", n3)[u3], m3 = u3 === a2 ? this.$D + (e3 - this.$W) : e3;
      if (u3 === c2 || u3 === d2) {
        var $2 = this.clone().set(h2, 1);
        $2.$d[l3](m3), $2.init(), this.$d = $2.set(h2, Math.min(this.$D, $2.daysInMonth())).$d;
      } else
        l3 && this.$d[l3](m3);
      return this.init(), this;
    }, v2.set = function(t3, e3) {
      return this.clone().$set(t3, e3);
    }, v2.get = function(t3) {
      return this[w2.p(t3)]();
    }, v2.add = function(r3, f3) {
      var h3, l3 = this;
      r3 = Number(r3);
      var m3 = w2.p(f3), $2 = function(t3) {
        var e3 = Y2(l3);
        return w2.w(e3.date(e3.date() + Math.round(t3 * r3)), l3);
      };
      if (m3 === c2)
        return this.set(c2, this.$M + r3);
      if (m3 === d2)
        return this.set(d2, this.$y + r3);
      if (m3 === a2)
        return $2(1);
      if (m3 === u2)
        return $2(7);
      var p4 = (h3 = {}, h3[s2] = e2, h3[o2] = n2, h3[i2] = t2, h3)[m3] || 1, v3 = this.$d.getTime() + r3 * p4;
      return w2.w(v3, this);
    }, v2.subtract = function(t3, e3) {
      return this.add(-1 * t3, e3);
    }, v2.format = function(t3) {
      var e3 = this, n3 = this.$locale();
      if (!this.isValid())
        return n3.invalidDate || l2;
      var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = w2.z(this), s3 = this.$H, o3 = this.$m, a3 = this.$M, u3 = n3.weekdays, c3 = n3.months, f3 = function(t4, n4, i4, s4) {
        return t4 && (t4[n4] || t4(e3, r3)) || i4[n4].slice(0, s4);
      }, d3 = function(t4) {
        return w2.s(s3 % 12 || 12, t4, "0");
      }, h3 = n3.meridiem || function(t4, e4, n4) {
        var r4 = t4 < 12 ? "AM" : "PM";
        return n4 ? r4.toLowerCase() : r4;
      }, m3 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a3 + 1, MM: w2.s(a3 + 1, 2, "0"), MMM: f3(n3.monthsShort, a3, c3, 3), MMMM: f3(c3, a3), D: this.$D, DD: w2.s(this.$D, 2, "0"), d: String(this.$W), dd: f3(n3.weekdaysMin, this.$W, u3, 2), ddd: f3(n3.weekdaysShort, this.$W, u3, 3), dddd: u3[this.$W], H: String(s3), HH: w2.s(s3, 2, "0"), h: d3(1), hh: d3(2), a: h3(s3, o3, true), A: h3(s3, o3, false), m: String(o3), mm: w2.s(o3, 2, "0"), s: String(this.$s), ss: w2.s(this.$s, 2, "0"), SSS: w2.s(this.$ms, 3, "0"), Z: i3 };
      return r3.replace($, function(t4, e4) {
        return e4 || m3[t4] || i3.replace(":", "");
      });
    }, v2.utcOffset = function() {
      return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
    }, v2.diff = function(r3, h3, l3) {
      var m3, $2 = w2.p(h3), p4 = Y2(r3), v3 = (p4.utcOffset() - this.utcOffset()) * e2, y3 = this - p4, g2 = w2.m(this, p4);
      return g2 = (m3 = {}, m3[d2] = g2 / 12, m3[c2] = g2, m3[f2] = g2 / 3, m3[u2] = (y3 - v3) / 6048e5, m3[a2] = (y3 - v3) / 864e5, m3[o2] = y3 / n2, m3[s2] = y3 / e2, m3[i2] = y3 / t2, m3)[$2] || y3, l3 ? g2 : w2.a(g2);
    }, v2.daysInMonth = function() {
      return this.endOf(c2).$D;
    }, v2.$locale = function() {
      return M[this.$L];
    }, v2.locale = function(t3, e3) {
      if (!t3)
        return this.$L;
      var n3 = this.clone(), r3 = _2(t3, e3, true);
      return r3 && (n3.$L = r3), n3;
    }, v2.clone = function() {
      return w2.w(this.$d, this);
    }, v2.toDate = function() {
      return new Date(this.valueOf());
    }, v2.toJSON = function() {
      return this.isValid() ? this.toISOString() : null;
    }, v2.toISOString = function() {
      return this.$d.toISOString();
    }, v2.toString = function() {
      return this.$d.toUTCString();
    }, p3;
  }(), b2 = S2.prototype;
  return Y2.prototype = b2, [["$ms", r2], ["$s", i2], ["$m", s2], ["$H", o2], ["$W", a2], ["$M", c2], ["$y", d2], ["$D", h2]].forEach(function(t3) {
    b2[t3[1]] = function(e3) {
      return this.$g(e3, t3[0], t3[1]);
    };
  }), Y2.extend = function(t3, e3) {
    return t3.$i || (t3(e3, S2, Y2), t3.$i = true), Y2;
  }, Y2.locale = _2, Y2.isDayjs = D2, Y2.unix = function(t3) {
    return Y2(1e3 * t3);
  }, Y2.en = M[g], Y2.Ls = M, Y2.p = {}, Y2;
}(), A = (T = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, function(t2, e2, n2) {
  var r2 = e2.prototype, i2 = r2.format;
  n2.en.formats = T, r2.format = function(t3) {
    void 0 === t3 && (t3 = "YYYY-MM-DDTHH:mm:ssZ");
    var e3 = this.$locale().formats, n3 = function(t4, e4) {
      return t4.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t5, n4, r3) {
        var i3 = r3 && r3.toUpperCase();
        return n4 || e4[r3] || T[r3] || e4[i3].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(t6, e5, n5) {
          return e5 || n5.slice(1);
        });
      });
    }(t3, void 0 === e3 ? {} : e3);
    return i2.call(this, n3);
  };
}), E = function(t2, e2, n2) {
  var r2 = e2.prototype, i2 = function(t3) {
    var e3, i3 = t3.date, s3 = t3.utc, o3 = {};
    if (!((e3 = i3) instanceof Date) && !(e3 instanceof Array) && e3 instanceof Object) {
      if (!Object.keys(i3).length)
        return new Date();
      var a3 = s3 ? n2.utc() : n2();
      Object.keys(i3).forEach(function(t4) {
        var e4, n3;
        o3[e4 = t4, n3 = r2.$utils().p(e4), "date" === n3 ? "day" : n3] = i3[t4];
      });
      var u3 = o3.day || (o3.year || o3.month >= 0 ? 1 : a3.date()), c2 = o3.year || a3.year(), f2 = o3.month >= 0 ? o3.month : o3.year || o3.day ? 0 : a3.month(), d2 = o3.hour || 0, h2 = o3.minute || 0, l2 = o3.second || 0, m2 = o3.millisecond || 0;
      return s3 ? new Date(Date.UTC(c2, f2, u3, d2, h2, l2, m2)) : new Date(c2, f2, u3, d2, h2, l2, m2);
    }
    return i3;
  }, s2 = r2.parse;
  r2.parse = function(t3) {
    t3.date = i2.bind(this)(t3), s2.bind(this)(t3);
  };
  var o2 = r2.set, a2 = r2.add, u2 = function(t3, e3, n3, r3) {
    if (void 0 === r3 && (r3 = 1), e3 instanceof Object) {
      var i3 = Object.keys(e3), s3 = this;
      return i3.forEach(function(n4) {
        s3 = t3.bind(s3)(e3[n4] * r3, n4);
      }), s3;
    }
    return t3.bind(this)(e3 * r3, n3);
  };
  r2.set = function(t3, e3) {
    return e3 = void 0 === e3 ? t3 : e3, u2.bind(this)(function(t4, e4) {
      return o2.bind(this)(e4, t4);
    }, e3, t3);
  }, r2.add = function(t3, e3) {
    return u2.bind(this)(a2, t3, e3);
  }, r2.subtract = function(t3, e3) {
    return u2.bind(this)(a2, t3, e3, -1);
  };
}, U = function() {
  var t2 = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, e2 = {};
  return function(n2, r2, i2) {
    var s2, o2 = function(t3, n3, r3) {
      void 0 === r3 && (r3 = {});
      var i3 = new Date(t3), s3 = function(t4, n4) {
        void 0 === n4 && (n4 = {});
        var r4 = n4.timeZoneName || "short", i4 = t4 + "|" + r4, s4 = e2[i4];
        return s4 || (s4 = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: t4, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: r4 }), e2[i4] = s4), s4;
      }(n3, r3);
      return s3.formatToParts(i3);
    }, a2 = function(e3, n3) {
      for (var r3 = o2(e3, n3), s3 = [], a3 = 0; a3 < r3.length; a3 += 1) {
        var u3 = r3[a3], c3 = u3.type, f2 = u3.value, d2 = t2[c3];
        d2 >= 0 && (s3[d2] = parseInt(f2, 10));
      }
      var h2 = s3[3], l2 = 24 === h2 ? 0 : h2, m2 = s3[0] + "-" + s3[1] + "-" + s3[2] + " " + l2 + ":" + s3[4] + ":" + s3[5] + ":000", $ = +e3;
      return (i2.utc(m2).valueOf() - ($ -= $ % 1e3)) / 6e4;
    }, u2 = r2.prototype;
    u2.tz = function(t3, e3) {
      void 0 === t3 && (t3 = s2);
      var n3 = this.utcOffset(), r3 = this.toDate(), o3 = r3.toLocaleString("en-US", { timeZone: t3 }), a3 = Math.round((r3 - new Date(o3)) / 1e3 / 60), u3 = i2(o3).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(r3.getTimezoneOffset() / 15) - a3, true);
      if (e3) {
        var c3 = u3.utcOffset();
        u3 = u3.add(n3 - c3, "minute");
      }
      return u3.$x.$timezone = t3, u3;
    }, u2.offsetName = function(t3) {
      var e3 = this.$x.$timezone || i2.tz.guess(), n3 = o2(this.valueOf(), e3, { timeZoneName: t3 }).find(function(t4) {
        return "timezonename" === t4.type.toLowerCase();
      });
      return n3 && n3.value;
    };
    var c2 = u2.startOf;
    u2.startOf = function(t3, e3) {
      if (!this.$x || !this.$x.$timezone)
        return c2.call(this, t3, e3);
      var n3 = i2(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
      return c2.call(n3, t3, e3).tz(this.$x.$timezone, true);
    }, i2.tz = function(t3, e3, n3) {
      var r3 = n3 && e3, o3 = n3 || e3 || s2, u3 = a2(+i2(), o3);
      if ("string" != typeof t3)
        return i2(t3).tz(o3);
      var c3 = function(t4, e4, n4) {
        var r4 = t4 - 60 * e4 * 1e3, i3 = a2(r4, n4);
        if (e4 === i3)
          return [r4, e4];
        var s3 = a2(r4 -= 60 * (i3 - e4) * 1e3, n4);
        return i3 === s3 ? [r4, i3] : [t4 - 60 * Math.min(i3, s3) * 1e3, Math.max(i3, s3)];
      }(i2.utc(t3, r3).valueOf(), u3, o3), f2 = c3[0], d2 = c3[1], h2 = i2(f2).utcOffset(d2);
      return h2.$x.$timezone = o3, h2;
    }, i2.tz.guess = function() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }, i2.tz.setDefault = function(t3) {
      s2 = t3;
    };
  };
}(), I = function() {
  var t2 = "minute", e2 = /[+-]\d\d(?::?\d\d)?/g, n2 = /([+-]|\d\d)/g;
  return function(r2, i2, s2) {
    var o2 = i2.prototype;
    s2.utc = function(t3) {
      return new i2({ date: t3, utc: true, args: arguments });
    }, o2.utc = function(e3) {
      var n3 = s2(this.toDate(), { locale: this.$L, utc: true });
      return e3 ? n3.add(this.utcOffset(), t2) : n3;
    }, o2.local = function() {
      return s2(this.toDate(), { locale: this.$L, utc: false });
    };
    var a2 = o2.parse;
    o2.parse = function(t3) {
      t3.utc && (this.$u = true), this.$utils().u(t3.$offset) || (this.$offset = t3.$offset), a2.call(this, t3);
    };
    var u2 = o2.init;
    o2.init = function() {
      if (this.$u) {
        var t3 = this.$d;
        this.$y = t3.getUTCFullYear(), this.$M = t3.getUTCMonth(), this.$D = t3.getUTCDate(), this.$W = t3.getUTCDay(), this.$H = t3.getUTCHours(), this.$m = t3.getUTCMinutes(), this.$s = t3.getUTCSeconds(), this.$ms = t3.getUTCMilliseconds();
      } else
        u2.call(this);
    };
    var c2 = o2.utcOffset;
    o2.utcOffset = function(r3, i3) {
      var s3 = this.$utils().u;
      if (s3(r3))
        return this.$u ? 0 : s3(this.$offset) ? c2.call(this) : this.$offset;
      if ("string" == typeof r3 && (r3 = function(t3) {
        void 0 === t3 && (t3 = "");
        var r4 = t3.match(e2);
        if (!r4)
          return null;
        var i4 = ("" + r4[0]).match(n2) || ["-", 0, 0], s4 = i4[0], o4 = 60 * +i4[1] + +i4[2];
        return 0 === o4 ? 0 : "+" === s4 ? o4 : -o4;
      }(r3), null === r3))
        return this;
      var o3 = Math.abs(r3) <= 16 ? 60 * r3 : r3, a3 = this;
      if (i3)
        return a3.$offset = o3, a3.$u = 0 === r3, a3;
      if (0 !== r3) {
        var u3 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
        (a3 = this.local().add(o3 + u3, t2)).$offset = o3, a3.$x.$localOffset = u3;
      } else
        a3 = this.utc();
      return a3;
    };
    var f2 = o2.format;
    o2.format = function(t3) {
      var e3 = t3 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
      return f2.call(this, e3);
    }, o2.valueOf = function() {
      var t3 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
      return this.$d.valueOf() - 6e4 * t3;
    }, o2.isUTC = function() {
      return !!this.$u;
    }, o2.toISOString = function() {
      return this.toDate().toISOString();
    }, o2.toString = function() {
      return this.toDate().toUTCString();
    };
    var d2 = o2.toDate;
    o2.toDate = function(t3) {
      return "s" === t3 && this.$offset ? s2(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d2.call(this);
    };
    var h2 = o2.diff;
    o2.diff = function(t3, e3, n3) {
      if (t3 && this.$u === t3.$u)
        return h2.call(this, t3, e3, n3);
      var r3 = this.local(), i3 = s2(t3).local();
      return h2.call(r3, i3, e3, n3);
    };
  };
}();
H.extend(A), H.extend(E), H.extend(I), H.extend(U);
const W = { name: "zh-cn", weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"), weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"), weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"), months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), ordinal: (t2, e2) => "W" === e2 ? `${t2}\u5468` : `${t2}\u65E5`, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206", LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206", l: "YYYY/M/D", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm" }, relativeTime: { future: "%s\u5185", past: "%s\u524D", s: "\u51E0\u79D2", m: "1 \u5206\u949F", mm: "%d \u5206\u949F", h: "1 \u5C0F\u65F6", hh: "%d \u5C0F\u65F6", d: "1 \u5929", dd: "%d \u5929", M: "1 \u4E2A\u6708", MM: "%d \u4E2A\u6708", y: "1 \u5E74", yy: "%d \u5E74" }, meridiem: (t2, e2) => {
  const n2 = 100 * t2 + e2;
  return n2 < 600 ? "\u51CC\u6668" : n2 < 900 ? "\u65E9\u4E0A" : n2 < 1100 ? "\u4E0A\u5348" : n2 < 1300 ? "\u4E2D\u5348" : n2 < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";
} }, j = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") };
H.locale("zh", W), H.locale("en", j), H.extend(E), H.extend(I), H.extend(U);
const Z = (t2, e2) => {
  if (t2) {
    if (H(t2 instanceof Date ? t2 : t2.trim()).isValid()) {
      const n3 = e2 ? H(t2).tz(e2) : H(t2), r2 = n3.year(), i2 = n3.month() + 1, s2 = n3.date(), o2 = n3.hour(), a2 = n3.minute(), u2 = n3.second(), c2 = n3.millisecond(), f2 = 0 === o2 && 0 === a2 && 0 === u2 && 0 === c2;
      return { value: n3.toDate(), info: { year: r2, month: i2, day: s2, ...f2 ? {} : { hour: o2, minute: a2, second: u2 } }, type: f2 ? "date" : "full" };
    }
    const n2 = /(?:(\d{2,4})[/-](\d{1,2})[/-](\d{1,2}))?\s*(?:(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/u.exec(t2.trim());
    if (n2) {
      const [, t3, e3, r2, i2, s2, o2] = n2, a2 = (t4) => void 0 === t4 ? void 0 : Number(t4), u2 = (t4) => i2 && s2 && !o2 ? 0 : t4, c2 = { year: ((t4) => t4 && t4 < 100 ? t4 + 2e3 : t4)(a2(t3)), month: a2(e3), day: a2(r2), hour: a2(i2), minute: a2(s2), second: u2(a2(o2)) }, f2 = void 0 === t3 && void 0 === e3 && void 0 === r2, d2 = void 0 === i2 && void 0 === s2 && void 0 === o2, h2 = H({ ...c2, month: c2.month - 1 }).toDate();
      return { value: f2 ? void 0 : h2, info: d2 ? { year: c2.year, month: c2.month, day: c2.day } : f2 ? { hour: c2.hour, minute: c2.minute, second: c2.second } : c2, type: f2 ? "time" : d2 ? "date" : "full" };
    }
  }
  return null;
}, J = (t2, e2 = false) => t2 ? Array.isArray(t2) ? t2.map((t3) => "string" == typeof t3 ? { name: t3 } : t3) : "string" == typeof t2 ? [{ name: t2 }] : "object" == typeof t2 && t2.name ? [t2] : (console.error(`Expect 'author' to be \`AuthorInfo[] | AuthorInfo | string[] | string ${e2 ? "" : "| false"} | undefined\`, but got`, t2), []) : [], V = (t2) => {
  if (t2) {
    if (Array.isArray(t2))
      return t2;
    if ("string" == typeof t2)
      return [t2];
    console.error("Expect 'category' to be `string[] | string | undefined`, but got", t2);
  }
  return [];
}, B = (t2) => {
  if (t2) {
    if (Array.isArray(t2))
      return t2;
    if ("string" == typeof t2)
      return [t2];
    console.error("Expect 'tag' to be `string[] | string | undefined`, but got", t2);
  }
  return [];
};
var backToTop = "";
const n$2 = () => h$2(a$4, { name: "back-to-top" }, () => [h$2("path", { d: "M512 843.2c-36.2 0-66.4-13.6-85.8-21.8-10.8-4.6-22.6 3.6-21.8 15.2l7 102c.4 6.2 7.6 9.4 12.6 5.6l29-22c3.6-2.8 9-1.8 11.4 2l41 64.2c3 4.8 10.2 4.8 13.2 0l41-64.2c2.4-3.8 7.8-4.8 11.4-2l29 22c5 3.8 12.2.6 12.6-5.6l7-102c.8-11.6-11-20-21.8-15.2-19.6 8.2-49.6 21.8-85.8 21.8z" }), h$2("path", { d: "m795.4 586.2-96-98.2C699.4 172 513 32 513 32S324.8 172 324.8 488l-96 98.2c-3.6 3.6-5.2 9-4.4 14.2L261.2 824c1.8 11.4 14.2 17 23.6 10.8L419 744s41.4 40 94.2 40c52.8 0 92.2-40 92.2-40l134.2 90.8c9.2 6.2 21.6.6 23.6-10.8l37-223.8c.4-5.2-1.2-10.4-4.8-14zM513 384c-34 0-61.4-28.6-61.4-64s27.6-64 61.4-64c34 0 61.4 28.6 61.4 64S547 384 513 384z" })]);
n$2.displayName = "BacktoTopIcon";
var d$1 = defineComponent({ name: "BackToTop", props: { threshold: { type: Number, default: 300 } }, setup(c2) {
  const u2 = usePageFrontmatter(), d2 = f$1({ "/": { "backToTop": "\u8FD4\u56DE\u9876\u90E8" } }), i2 = ref(0), v = computed(() => false !== u2.value.backToTop && i2.value > c2.threshold), b2 = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  return onMounted(() => {
    i2.value = b2();
  }), useEventListener("scroll", useDebounceFn(() => {
    i2.value = b2();
  }, 100)), () => h$2(Transition, { name: "fade" }, () => v.value ? h$2("button", { class: "back-to-top", "aria-label": d2.value.backToTop, "data-balloon-pos": "left", onClick: () => {
    window.scrollTo({ top: 0, behavior: "smooth" }), i2.value = 0;
  } }, h$2(n$2)) : null);
} });
var clientConfig1 = defineClientConfig({
  enhance: ({ app }) => {
    app.component("Badge", e$1);
    app.component("FontIcon", s$2);
  },
  setup: () => {
    useStyleTag(`@import url("//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css");`, { id: "icon-assets" });
  },
  rootComponents: [
    () => h$2(d$1, { threshold: 300 })
  ]
});
function r$1(r2, e2, n2) {
  var i2, t2, o2;
  void 0 === e2 && (e2 = 50), void 0 === n2 && (n2 = {});
  var a2 = null != (i2 = n2.isImmediate) && i2, u2 = null != (t2 = n2.callback) && t2, c2 = n2.maxWait, v = Date.now(), l2 = [];
  function f2() {
    if (void 0 !== c2) {
      var r3 = Date.now() - v;
      if (r3 + e2 >= c2)
        return c2 - r3;
    }
    return e2;
  }
  var d2 = function() {
    var e3 = [].slice.call(arguments), n3 = this;
    return new Promise(function(i3, t3) {
      var c3 = a2 && void 0 === o2;
      if (void 0 !== o2 && clearTimeout(o2), o2 = setTimeout(function() {
        if (o2 = void 0, v = Date.now(), !a2) {
          var i4 = r2.apply(n3, e3);
          u2 && u2(i4), l2.forEach(function(r3) {
            return (0, r3.resolve)(i4);
          }), l2 = [];
        }
      }, f2()), c3) {
        var d3 = r2.apply(n3, e3);
        return u2 && u2(d3), i3(d3);
      }
      l2.push({ resolve: i3, reject: t3 });
    });
  };
  return d2.cancel = function(r3) {
    void 0 !== o2 && clearTimeout(o2), l2.forEach(function(e3) {
      return (0, e3.reject)(r3);
    }), l2 = [];
  }, d2;
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a2;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof global !== "undefined" && ((_a2 = global.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
    supported = true;
    perf = global.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e2) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e2) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve2) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: resolve2
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy)
      setupFn(proxy.proxiedTarget);
  }
}
/*!
  * vue-router v4.1.3
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function warn(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base2) {
  if (!base2 || !pathname.toLowerCase().startsWith(base2.toLowerCase()))
    return pathname;
  return pathname.slice(base2.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a2, b2) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b2.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b2.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b2.params) && stringifyQuery2(a2.query) === stringifyQuery2(b2.query) && a2.hash === b2.hash;
}
function isSameRouteRecord(a2, b2) {
  return (a2.aliasOf || a2) === (b2.aliasOf || b2);
}
function isSameRouteLocationParams(a2, b2) {
  if (Object.keys(a2).length !== Object.keys(b2).length)
    return false;
  for (const key in a2) {
    if (!isSameRouteLocationParamsValue(a2[key], b2[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a2, b2) {
  return isArray(a2) ? isEquivalentArray(a2, b2) : isArray(b2) ? isEquivalentArray(b2, a2) : a2 === b2;
}
function isEquivalentArray(a2, b2) {
  return isArray(b2) ? a2.length === b2.length && a2.every((value, i2) => value === b2[i2]) : a2.length === 1 && a2[0] === b2;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!from.startsWith("/")) {
    warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base2) {
  if (!base2) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base2 = baseEl && baseEl.getAttribute("href") || "/";
      base2 = base2.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base2 = "/";
    }
  }
  if (base2[0] !== "/" && base2[0] !== "#")
    base2 = "/" + base2;
  return removeTrailingSlash(base2);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base2, location2) {
  return base2.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset2) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset2.behavior,
    left: elRect.left - docRect.left - (offset2.left || 0),
    top: elRect.top - docRect.top - (offset2.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (typeof position.el === "string") {
      if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
        try {
          const foundEl = document.querySelector(position.el);
          if (isIdSelector && foundEl) {
            warn(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
            return;
          }
        } catch (err) {
          warn(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
          return;
        }
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      warn(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base2, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base2.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base2.slice(hashPos)) ? base2.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base2);
  return path + search + hash;
}
function useHistoryListeners(base2, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base2, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base2) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base2, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history2.length - 1,
      replaced: true,
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base2.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base2 : base2.slice(hashIndex)) + to : createBaseLocation() + base2 + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        warn("Error with push/replace State", err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    if (!history2.state) {
      warn(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`);
    }
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base2) {
  base2 = normalizeBase(base2);
  const historyNavigation = useHistoryStateNavigation(base2);
  const historyListeners = useHistoryListeners(base2, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base: base2,
    go,
    createHref: createHref.bind(null, base2)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("navigation failure");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
const ErrorTypeMessages = {
  [1]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [2]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [4]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [8]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [16]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  {
    return assign(new Error(ErrorTypeMessages[type](params)), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string")
    return to;
  if ("path" in to)
    return to.path;
  const location2 = {};
  for (const key of propertiesToLog) {
    if (key in to)
      location2[key] = to[key];
  }
  return JSON.stringify(location2, null, 2);
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [90];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i2 = score.length - 1;
    score[i2][score[i2].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i2 = 1; i2 < match.length; i2++) {
      const value = match[i2] || "";
      const key = keys[i2 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a2, b2) {
  let i2 = 0;
  while (i2 < a2.length && i2 < b2.length) {
    const diff = b2[i2] - a2[i2];
    if (diff)
      return diff;
    i2++;
  }
  if (a2.length < b2.length) {
    return a2.length === 1 && a2[0] === 40 + 40 ? -1 : 1;
  } else if (a2.length > b2.length) {
    return b2.length === 1 && b2[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a2, b2) {
  let i2 = 0;
  const aScore = a2.score;
  const bScore = b2.score;
  while (i2 < aScore.length && i2 < bScore.length) {
    const comp = compareScoreArray(aScore[i2], bScore[i2]);
    if (comp)
      return comp;
    i2++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(
      `Route paths should start with a "/": "${path}" should be "/${path}".`
    );
  }
  function crash(message2) {
    throw new Error(`ERR (${state})/"${buffer2}": ${message2}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i2 = 0;
  let char;
  let buffer2 = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer2)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer2
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer2}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer2,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer2 = "";
  }
  function addCharToBuffer() {
    buffer2 += char;
  }
  while (i2 < path.length) {
    char = path[i2++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer2) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i2--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i2--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer2}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name))
        warn(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    }
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (normalizedRecord.path === "*") {
        throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (parent && path[0] === "/")
        checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i2 = 0; i2 < children.length; i2++) {
          addRoute(children[i2], matcher, originalRecord && originalRecord.children[i2]);
        }
      }
      originalRecord = originalRecord || matcher;
      insertMatcher(matcher);
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i2 = 0;
    while (i2 < matchers.length && comparePathParserScore(matcher, matchers[i2]) >= 0 && (matcher.record.path !== matchers[i2].record.path || !isRecordChildOf(matcher, matchers[i2])))
      i2++;
    matchers.splice(i2, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(
        paramsFromLocation(
          currentLocation.params,
          matcher.keys.filter((k) => !k.optional).map((k) => k.name)
        ),
        location2.params
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      if (!path.startsWith("/")) {
        warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`);
      }
      matcher = matchers.find((m2) => m2.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m2) => m2.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isSameParam(a2, b2) {
  return a2.name === b2.name && a2.optional === b2.optional && a2.repeatable === b2.repeatable;
}
function checkSameParams(a2, b2) {
  for (const key of a2.keys) {
    if (!key.optional && !b2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b2.record.path}" and the original record: "${a2.record.path}" should have the exact same param named "${key.name}"`);
  }
  for (const key of b2.keys) {
    if (!key.optional && !a2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b2.record.path}" and the original record: "${a2.record.path}" should have the exact same param named "${key.name}"`);
  }
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) {
    if (!record.keys.find(isSameParam.bind(null, key)))
      return warn(`Absolute path "${record.record.path}" should have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
  }
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
    warn(`Error decoding "${text}". Using original value`);
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i2 = 0; i2 < searchParams.length; ++i2) {
    const searchParam = searchParams[i2].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("router view location matched");
const viewDepthKey = Symbol("router view depth");
const routerKey = Symbol("router");
const routeLocationKey = Symbol("route location");
const routerViewLocationKey = Symbol("router view location");
function useCallbacks() {
  let handlers2 = [];
  function add2(handler) {
    handlers2.push(handler);
    return () => {
      const i2 = handlers2.indexOf(handler);
      if (i2 > -1)
        handlers2.splice(i2, 1);
    };
  }
  function reset2() {
    handlers2 = [];
  }
  return {
    add: add2,
    list: () => handlers2,
    reset: reset2
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, canOnlyBeCalledOnce(next, to, from));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    if (guard.length > 2) {
      const message2 = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) {
        guardCall = guardCall.then((resolvedValue) => {
          if (!next._called) {
            warn(message2);
            return Promise.reject(new Error("Invalid navigation guard"));
          }
          return resolvedValue;
        });
      } else if (guardReturn !== void 0) {
        if (!next._called) {
          warn(message2);
          reject(new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err) => reject(err));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1)
      warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1)
      next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    if (!record.components && !record.children.length) {
      warn(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    }
    for (const name in record.components) {
      let rawComponent = record.components[name];
      {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise2 = rawComponent;
          rawComponent = () => promise2;
        } else if (rawComponent.__asyncLoader && !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        if (!("catch" in componentPromise)) {
          warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e2 = {}) {
    if (guardEvent(e2)) {
      return router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
      ).catch(noop);
    }
    return Promise.resolve();
  }
  if (isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h$2("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e2) {
  if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey)
    return;
  if (e2.defaultPrevented)
    return;
  if (e2.button !== void 0 && e2.button !== 0)
    return;
  if (e2.currentTarget && e2.currentTarget.getAttribute) {
    const target = e2.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e2.preventDefault)
    e2.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value !== outerValue[i2]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h$2(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (isBrowser && component.ref) {
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        const internalInstances = isArray(component.ref) ? component.ref.map((r2) => r2.i) : [component.ref.i];
        internalInstances.forEach((instance) => {
          instance.__vrv_devtools = info;
        });
      }
      return normalizeSlot(slots.default, { Component: component, route }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition"))) {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy = assign({}, routeLocation, {
    matched: routeLocation.matched.map((matched) => omit(matched, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: true,
      display: routeLocation.fullPath,
      tooltip,
      value: copy
    }
  };
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
let routerId = 0;
function addDevtools(app, router, matcher) {
  if (router.__hasDevtools)
    return;
  router.__hasDevtools = true;
  const id = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (id ? "." + id : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) {
        payload.instanceData.state.push({
          type: "Routing",
          key: "$route",
          editable: false,
          value: formatRouteLocation(router.currentRoute.value, "Current Route")
        });
      }
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info.name ? `${info.name.toString()}: ` : "") + info.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label: devtoolsData.route.path,
            textColor: 0,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? " " + id : ""} Navigations`,
      color: 4237508
    });
    router.onError((error, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", {
        value: navigationId++
      });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = {
        guard: formatDisplay("afterEach")
      };
      if (failure) {
        data.failure = {
          _custom: {
            type: Error,
            readOnly: true,
            display: failure ? failure.message : "",
            tooltip: "Navigation Failure",
            value: failure
          }
        };
        data.status = formatDisplay("\u274C");
      } else {
        data.status = formatDisplay("\u2705");
      }
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id ? " " + id : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload)
        return;
      const payload = activeRoutesPayload;
      let routes = matcher.getRoutes().filter((route) => !route.parent);
      routes.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) {
        routes = routes.filter((route) => isRouteMatching(route, payload.filter.toLowerCase()));
      }
      routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        refreshRoutesView();
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        const routes = matcher.getRoutes();
        const route = routes.find((route2) => route2.record.__vd_id === payload.nodeId);
        if (route) {
          payload.state = {
            options: formatRouteRecordMatcherForStateInspector(route)
          };
        }
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) {
    return key.repeatable ? "*" : "?";
  } else {
    return key.repeatable ? "+" : "";
  }
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields = [
    { editable: false, key: "path", value: record.path }
  ];
  if (record.name != null) {
    fields.push({
      editable: false,
      key: "name",
      value: record.name
    });
  }
  fields.push({ editable: false, key: "regexp", value: route.re });
  if (route.keys.length) {
    fields.push({
      editable: false,
      key: "keys",
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
          tooltip: "Param keys",
          value: route.keys
        }
      }
    });
  }
  if (record.redirect != null) {
    fields.push({
      editable: false,
      key: "redirect",
      value: record.redirect
    });
  }
  if (route.alias.length) {
    fields.push({
      editable: false,
      key: "aliases",
      value: route.alias.map((alias) => alias.record.path)
    });
  }
  if (Object.keys(route.record.meta).length) {
    fields.push({
      editable: false,
      key: "meta",
      value: route.record.meta
    });
  }
  fields.push({
    key: "score",
    editable: false,
    value: {
      _custom: {
        type: null,
        readOnly: true,
        display: route.score.map((score) => score.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: route.score
      }
    }
  });
  return fields;
}
const PINK_500 = 15485081;
const BLUE_600 = 2450411;
const LIME_500 = 8702998;
const CYAN_400 = 2282478;
const ORANGE_400 = 16486972;
const DARK = 6710886;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) {
    tags.push({
      label: String(record.name),
      textColor: 0,
      backgroundColor: CYAN_400
    });
  }
  if (record.aliasOf) {
    tags.push({
      label: "alias",
      textColor: 0,
      backgroundColor: ORANGE_400
    });
  }
  if (route.__vd_match) {
    tags.push({
      label: "matches",
      textColor: 0,
      backgroundColor: PINK_500
    });
  }
  if (route.__vd_exactActive) {
    tags.push({
      label: "exact",
      textColor: 0,
      backgroundColor: LIME_500
    });
  }
  if (route.__vd_active) {
    tags.push({
      label: "active",
      textColor: 0,
      backgroundColor: BLUE_600
    });
  }
  if (record.redirect) {
    tags.push({
      label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
      textColor: 16777215,
      backgroundColor: DARK
    });
  }
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) {
    route.__vd_active = currentRoute.matched.some((match) => isSameRouteRecord(match, route.record));
  }
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) {
    return false;
  }
  const nonEndingRE = new RegExp(found[1].replace(/\$$/, ""), found[2]);
  if (nonEndingRE.test(filter)) {
    route.children.forEach((child) => isRouteMatching(child, filter));
    if (route.record.path !== "/" || filter === "/") {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter.startsWith("/") && (decodedPath.includes(filter) || path.includes(filter)))
    return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter))
    return true;
  if (route.record.name && String(route.record.name).includes(filter))
    return true;
  return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys) {
  const ret = {};
  for (const key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (!routerHistory)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else {
      warn(`Cannot remove non-existent route "${String(name)}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      {
        if (href2.startsWith("//"))
          warn(`Location "${rawLocation}" resolved to "${href2}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute2.matched.length) {
          warn(`No match found for location with path "${rawLocation}"`);
        }
      }
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      if ("params" in rawLocation && !("name" in rawLocation) && Object.keys(rawLocation.params).length) {
        warn(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      }
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    if (hash && !hash.startsWith("#")) {
      warn(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
    }
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    {
      if (href.startsWith("//")) {
        warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      } else if (!matchedRoute.matched.length) {
        warn(`No match found for location with path "${"path" in rawLocation ? rawLocation.path : rawLocation}"`);
      }
    }
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      if (!("path" in newTargetLocation) && !("name" in newTargetLocation)) {
        warn(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: data,
          force,
          replace: replace2
        }),
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        true,
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, 2)) {
          if (isSameRouteLocation(stringifyQuery$1, resolve2(failure2.to), toLocation) && redirectedFrom && (redirectedFrom._count = redirectedFrom._count ? redirectedFrom._count + 1 : 1) > 10) {
            warn(`Detected an infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`);
            return Promise.reject(new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(
            assign({
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: data,
              force
            }),
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, 4 | 8)) {
          return error;
        }
        if (isNavigationFailure(error, 2)) {
          pushWithRedirect(
            error.to,
            toLocation
          ).then((failure) => {
            if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, 8)) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      {
        warn("uncaught error during route navigation:");
      }
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
          warn("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if (isBrowser) {
        addDevtools(app, router2, matcher);
      }
    }
  };
  return router;
}
function runGuardQueue(guards) {
  return guards.reduce((promise2, guard) => promise2.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i2 = 0; i2 < len; i2++) {
    const recordFrom = from.matched[i2];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i2];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute() {
  return inject(routeLocationKey);
}
const useActiveHeaderLinks = ({ headerLinkSelector: headerLinkSelector2, headerAnchorSelector: headerAnchorSelector2, delay: delay2, offset: offset2 = 5 }) => {
  const router = useRouter();
  const page2 = usePageData();
  const setActiveRouteHash = () => {
    var _a2, _b, _c, _d;
    const scrollTop = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);
    const isAtPageTop = Math.abs(scrollTop - 0) < offset2;
    if (isAtPageTop) {
      replaceWithoutScrollBehavior(router, {
        hash: "",
        force: true
      });
      return;
    }
    const scrollBottom = window.innerHeight + scrollTop;
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const isAtPageBottom = Math.abs(scrollHeight - scrollBottom) < offset2;
    const headerLinks = Array.from(document.querySelectorAll(headerLinkSelector2));
    const headerAnchors = Array.from(document.querySelectorAll(headerAnchorSelector2));
    const existedHeaderAnchors = headerAnchors.filter((anchor) => headerLinks.some((link) => link.hash === anchor.hash));
    for (let i2 = 0; i2 < existedHeaderAnchors.length; i2++) {
      const anchor = existedHeaderAnchors[i2];
      const nextAnchor = existedHeaderAnchors[i2 + 1];
      const hasPassedCurrentAnchor = scrollTop >= ((_b = (_a2 = anchor.parentElement) == null ? void 0 : _a2.offsetTop) != null ? _b : 0) - offset2;
      const hasNotPassedNextAnchor = !nextAnchor || scrollTop < ((_d = (_c = nextAnchor.parentElement) == null ? void 0 : _c.offsetTop) != null ? _d : 0) - offset2;
      const isActive = hasPassedCurrentAnchor && hasNotPassedNextAnchor;
      if (!isActive)
        continue;
      const routeHash = decodeURIComponent(router.currentRoute.value.hash);
      const anchorHash = decodeURIComponent(anchor.hash);
      if (routeHash === anchorHash)
        return;
      if (isAtPageBottom) {
        for (let j2 = i2 + 1; j2 < existedHeaderAnchors.length; j2++) {
          if (routeHash === decodeURIComponent(existedHeaderAnchors[j2].hash)) {
            return;
          }
        }
      }
      replaceWithoutScrollBehavior(router, {
        hash: anchorHash,
        force: true
      });
      return;
    }
  };
  const onScroll = r$1(setActiveRouteHash, delay2);
  onMounted(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
  watch(() => page2.value.path, onScroll);
};
const replaceWithoutScrollBehavior = async (router, ...args) => {
  const { scrollBehavior } = router.options;
  router.options.scrollBehavior = void 0;
  await router.replace(...args).finally(() => router.options.scrollBehavior = scrollBehavior);
};
const headerLinkSelector = ".sidebar-link, .toc-link";
const headerAnchorSelector = ".header-anchor";
const delay = 200;
const offset = 5;
var clientConfig2 = defineClientConfig({
  setup() {
    useActiveHeaderLinks({
      headerLinkSelector,
      headerAnchorSelector,
      delay,
      offset
    });
  }
});
var vars$1 = "";
var externalLinkIcon = "";
const svg = h$2("svg", {
  "class": "external-link-icon",
  "xmlns": "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  "focusable": "false",
  "x": "0px",
  "y": "0px",
  "viewBox": "0 0 100 100",
  "width": "15",
  "height": "15"
}, [
  h$2("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
  }),
  h$2("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
  })
]);
const ExternalLinkIcon = defineComponent({
  name: "ExternalLinkIcon",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const routeLocale = useRouteLocale();
    const locale = computed(() => {
      var _a2;
      return (_a2 = props.locales[routeLocale.value]) != null ? _a2 : {
        openInNewWindow: "open in new window"
      };
    });
    return () => h$2("span", [
      svg,
      h$2("span", {
        class: "external-link-icon-sr-only"
      }, locale.value.openInNewWindow)
    ]);
  }
});
const locales = {};
var clientConfig3 = defineClientConfig({
  enhance({ app }) {
    app.component("ExternalLinkIcon", h$2(ExternalLinkIcon, { locales }));
  }
});
/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */
const nprogress$1 = {
  settings: {
    minimum: 0.08,
    easing: "ease",
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    barSelector: '[role="bar"]',
    parent: "body",
    template: '<div class="bar" role="bar"></div>'
  },
  status: null,
  set: (n2) => {
    const started = nprogress$1.isStarted();
    n2 = clamp(n2, nprogress$1.settings.minimum, 1);
    nprogress$1.status = n2 === 1 ? null : n2;
    const progress = nprogress$1.render(!started);
    const bar = progress.querySelector(nprogress$1.settings.barSelector);
    const speed = nprogress$1.settings.speed;
    const ease = nprogress$1.settings.easing;
    progress.offsetWidth;
    queue((next) => {
      css(bar, {
        transform: "translate3d(" + toBarPerc(n2) + "%,0,0)",
        transition: "all " + speed + "ms " + ease
      });
      if (n2 === 1) {
        css(progress, {
          transition: "none",
          opacity: "1"
        });
        progress.offsetWidth;
        setTimeout(function() {
          css(progress, {
            transition: "all " + speed + "ms linear",
            opacity: "0"
          });
          setTimeout(function() {
            nprogress$1.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(() => next(), speed);
      }
    });
    return nprogress$1;
  },
  isStarted: () => typeof nprogress$1.status === "number",
  start: () => {
    if (!nprogress$1.status)
      nprogress$1.set(0);
    const work = () => {
      setTimeout(() => {
        if (!nprogress$1.status)
          return;
        nprogress$1.trickle();
        work();
      }, nprogress$1.settings.trickleSpeed);
    };
    if (nprogress$1.settings.trickle)
      work();
    return nprogress$1;
  },
  done: (force) => {
    if (!force && !nprogress$1.status)
      return nprogress$1;
    return nprogress$1.inc(0.3 + 0.5 * Math.random()).set(1);
  },
  inc: (amount) => {
    let n2 = nprogress$1.status;
    if (!n2) {
      return nprogress$1.start();
    }
    if (typeof amount !== "number") {
      amount = (1 - n2) * clamp(Math.random() * n2, 0.1, 0.95);
    }
    n2 = clamp(n2 + amount, 0, 0.994);
    return nprogress$1.set(n2);
  },
  trickle: () => nprogress$1.inc(Math.random() * nprogress$1.settings.trickleRate),
  render: (fromStart) => {
    if (nprogress$1.isRendered()) {
      return document.getElementById("nprogress");
    }
    addClass(document.documentElement, "nprogress-busy");
    const progress = document.createElement("div");
    progress.id = "nprogress";
    progress.innerHTML = nprogress$1.settings.template;
    const bar = progress.querySelector(nprogress$1.settings.barSelector);
    const perc = fromStart ? "-100" : toBarPerc(nprogress$1.status || 0);
    const parent = document.querySelector(nprogress$1.settings.parent);
    css(bar, {
      transition: "all 0 linear",
      transform: "translate3d(" + perc + "%,0,0)"
    });
    if (parent !== document.body) {
      addClass(parent, "nprogress-custom-parent");
    }
    parent == null ? void 0 : parent.appendChild(progress);
    return progress;
  },
  remove: () => {
    removeClass(document.documentElement, "nprogress-busy");
    removeClass(document.querySelector(nprogress$1.settings.parent), "nprogress-custom-parent");
    const progress = document.getElementById("nprogress");
    progress && removeElement(progress);
  },
  isRendered: () => !!document.getElementById("nprogress")
};
const clamp = (n2, min, max) => {
  if (n2 < min)
    return min;
  if (n2 > max)
    return max;
  return n2;
};
const toBarPerc = (n2) => (-1 + n2) * 100;
const queue = function() {
  const pending = [];
  function next() {
    const fn = pending.shift();
    if (fn) {
      fn(next);
    }
  }
  return function(fn) {
    pending.push(fn);
    if (pending.length === 1)
      next();
  };
}();
const css = function() {
  const cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  const cssProps = {};
  function camelCase(string) {
    return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
      return letter.toUpperCase();
    });
  }
  function getVendorProp(name) {
    const style = document.body.style;
    if (name in style)
      return name;
    let i2 = cssPrefixes.length;
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    let vendorName;
    while (i2--) {
      vendorName = cssPrefixes[i2] + capName;
      if (vendorName in style)
        return vendorName;
    }
    return name;
  }
  function getStyleProp(name) {
    name = camelCase(name);
    return cssProps[name] || (cssProps[name] = getVendorProp(name));
  }
  function applyCss(element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }
  return function(element, properties) {
    for (const prop in properties) {
      const value = properties[prop];
      if (value !== void 0 && Object.prototype.hasOwnProperty.call(properties, prop))
        applyCss(element, prop, value);
    }
  };
}();
const hasClass = (element, name) => {
  const list = typeof element === "string" ? element : classList(element);
  return list.indexOf(" " + name + " ") >= 0;
};
const addClass = (element, name) => {
  const oldList = classList(element);
  const newList = oldList + name;
  if (hasClass(oldList, name))
    return;
  element.className = newList.substring(1);
};
const removeClass = (element, name) => {
  const oldList = classList(element);
  if (!hasClass(element, name))
    return;
  const newList = oldList.replace(" " + name + " ", " ");
  element.className = newList.substring(1, newList.length - 1);
};
const classList = (element) => {
  return (" " + (element.className || "") + " ").replace(/\s+/gi, " ");
};
const removeElement = (element) => {
  element && element.parentNode && element.parentNode.removeChild(element);
};
var vars = "";
var nprogress = "";
const useNprogress = () => {
  onMounted(() => {
    const router = useRouter();
    const loadedPages = /* @__PURE__ */ new Set();
    loadedPages.add(router.currentRoute.value.path);
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress$1.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress$1.done();
    });
  });
};
var clientConfig4 = defineClientConfig({
  setup() {
    useNprogress();
  }
});
const themeData$1 = JSON.parse('{"blog":{"description":"\u4E00\u4E2AJava\u5F00\u53D1\u8005","intro":"/intro.html","medias":{"GitHub":"hhttps://github.com/zszdevelop"}},"encrypt":{"config":{"/guide/encrypt.html":["$2a$10$YkMZJm052XoXcGJZ9zj/Y.PC2SzXbyOXebeZXo/IHNPedVZYFFwzm"]}},"pure":false,"darkmode":"switch","themeColor":false,"fullscreen":false,"locales":{"/":{"blog":{},"repoDisplay":true,"navbarIcon":true,"navbarAutoHide":"mobile","hideSiteNameonMobile":true,"sidebar":{"/java/":"structure"},"sidebarIcon":true,"headerDepth":2,"lang":"zh-CN","navbarLocales":{"langName":"\u7B80\u4F53\u4E2D\u6587","selectLangAriaLabel":"\u9009\u62E9\u8BED\u8A00"},"metaLocales":{"author":"\u4F5C\u8005","date":"\u5199\u4F5C\u65E5\u671F","origin":"\u539F\u521B","views":"\u8BBF\u95EE\u91CF","category":"\u5206\u7C7B","tag":"\u6807\u7B7E","readingTime":"\u9605\u8BFB\u65F6\u95F4","words":"\u5B57\u6570","toc":"\u6B64\u9875\u5185\u5BB9","prev":"\u4E0A\u4E00\u9875","next":"\u4E0B\u4E00\u9875","lastUpdated":"\u4E0A\u6B21\u7F16\u8F91\u4E8E","contributors":"\u8D21\u732E\u8005","editLink":"\u7F16\u8F91\u6B64\u9875"},"blogLocales":{"article":"\u6587\u7AE0","articleList":"\u6587\u7AE0\u5217\u8868","category":"\u5206\u7C7B","tag":"\u6807\u7B7E","timeline":"\u65F6\u95F4\u8F74","timelineTitle":"\u6628\u65E5\u4E0D\u5728","all":"\u5168\u90E8","intro":"\u4E2A\u4EBA\u4ECB\u7ECD","star":"\u6536\u85CF","slides":"\u5E7B\u706F\u7247","encrypt":"\u52A0\u5BC6"},"paginationLocales":{"prev":"\u4E0A\u4E00\u9875","next":"\u4E0B\u4E00\u9875","navigate":"\u8DF3\u8F6C\u5230","action":"\u524D\u5F80","errorText":"\u8BF7\u8F93\u5165 1 \u5230 $page \u4E4B\u524D\u7684\u9875\u7801\uFF01"},"outlookLocales":{"themeColor":"\u4E3B\u9898\u8272","darkmode":"\u5916\u89C2","fullscreen":"\u5168\u5C4F"},"encryptLocales":{"iconLabel":"\u6587\u7AE0\u5DF2\u52A0\u5BC6","placeholder":"\u8F93\u5165\u5BC6\u7801","remember":"\u8BB0\u4F4F\u5BC6\u7801","errorHint":"\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5BC6\u7801"},"routeLocales":{"404msg":["\u8FD9\u91CC\u4EC0\u4E48\u4E5F\u6CA1\u6709","\u6211\u4EEC\u662F\u600E\u4E48\u6765\u5230\u8FD9\u513F\u7684\uFF1F","\u8FD9 \u662F \u56DB \u96F6 \u56DB !","\u770B\u8D77\u6765\u4F60\u8BBF\u95EE\u4E86\u4E00\u4E2A\u5931\u6548\u7684\u94FE\u63A5"],"back":"\u8FD4\u56DE\u4E0A\u4E00\u9875","home":"\u5E26\u6211\u56DE\u5BB6","openInNewWindow":"Open in new window"},"author":{"name":"zszdevelop","url":"https://java.isture.com"},"logo":"/logo.svg","repo":"zszdevelop/java-study-gitbook","docsDir":"demo/src","navbar":[{"text":"Java","icon":"creative","prefix":"/java/","children":[{"text":"Java\u57FA\u7840","link":"base/Java\u57FA\u7840"},{"text":"Java\u96C6\u5408","link":"collection/Java\u5BB9\u5668\u57FA\u7840"},{"text":"java8","link":"java8/Java8-\u51FD\u6570\u7F16\u7A0Blambda\u8868\u8FBE\u5F0F"},{"text":"jvm","link":"base/Java\u5185\u5B58\u533A\u57DF"}]},{"text":"\u5F00\u53D1","link":"develop/devlibrary/\u5E38\u7528\u5F00\u53D1\u5E93-Lombok\u5DE5\u5177\u5E93\u8BE6\u89E3"},{"text":"\u6570\u636E\u5E93","icon":"creative","prefix":"/db/","children":[{"text":"\u6570\u636E\u5E93\u57FA\u7840/SQL\u57FA\u7840","link":"sql/SQL\u8BED\u6CD5\u57FA\u7840"},{"text":"Sql\u6570\u636E\u5E93","children":[{"text":"Mysql","link":"mysql/\u5B58\u50A8\u5F15\u64CE"},{"text":"Oracle","link":"Oracle/\u5E8F\u5217"},{"text":"\u8FBE\u68A6","link":"damengoperation/\u8FBE\u68A6\u6570\u636E\u5E93-\u63A7\u5236\u53F0\u5DE5\u5177."}]},{"text":"NoSql\u6570\u636E\u5E93","children":[{"text":"Redis","link":"/sql2mongo/\u4ECESQL\u5230MongoDB\u4E4B\u6982\u5FF5\u7BC7"},{"text":"MongoDb","link":"MongoDb/sql2mongo/\u4ECESQL\u5230MongoDB\u4E4B\u6982\u5FF5\u7BC7"}]}]},{"text":"\u6846\u67B6|\u4F9D\u8D56","icon":"creative","prefix":"/dependencies/","children":[{"text":"Spring","children":[{"text":"Spring","link":"C1spring/base/Spring\u57FA\u7840-Spring\u548CSpring\u6846\u67B6\u7EC4\u6210"},{"text":"SpringBoot","link":"C1SpringBoot/base/SpringBoot\u5165\u95E8-SpringBoot\u7B80\u4ECB"}]},{"text":"ORM","children":[{"text":"Mybatis","link":"C2Mybatis/Mybatis\u6982\u5FF5"},{"text":"Mybatis-Plus","link":"C2Mybatis-Plus/SpringBoot\u96C6\u6210MySQL-MyBatis-Plus\u65B9\u5F0F"}]}]},{"text":"\u67B6\u6784|\u8BBE\u8BA1","icon":"creative","prefix":"/arch/","children":[{"text":"\u67B6\u6784\u57FA\u7840","icon":"creative","link":"base/\u67B6\u6784-\u67B6\u6784\u57FA\u7840"},{"text":"\u5206\u5E03\u5F0F\u7CFB\u7EDF","icon":"creative","link":"distributed/\u5206\u5E03\u5F0F\u7CFB\u7EDF-\u5168\u5C40\u552F\u4E00ID\u5B9E\u73B0\u65B9\u6848"}]},{"text":"\u90E8\u7F72|\u8F6F\u4EF6","icon":"creative","prefix":"/deploy/","children":[{"text":"Docker","icon":"creative","link":"docker/Docker\u57FA\u7840-\u4ED3\u5E93\u955C\u50CF\u5BB9\u5668\u8BE6\u89E3"},{"text":"DockerCompose","icon":"creative","link":"dockerCompose/Docker\u57FA\u7840-DockerCompose\u8BE6\u89E3"},{"text":"\u8FD0\u7EF4","icon":"creative","link":"operations-board/baota/\u5B9D\u5854\u9762\u677F\u4F7F\u7528\u611F\u53D7"}]},{"text":"\u5176\u4ED6\u8BED\u8A00","icon":"creative","prefix":"/language/","children":[{"text":"\u524D\u7AEF","icon":"creative","link":"frontend/C3-flex\u5E03\u5C40"},{"text":"python","icon":"creative","link":"python/C1-Python\u4F18\u52BF"},{"text":"weixin","icon":"creative","link":"weixin/C1-\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F-\u5305\u5927\u5C0F\u4F18\u5316"}]},{"text":"\u6742\u9879|\u601D\u8003","icon":"creative","prefix":"/think/","children":[{"text":"\u5370\u8C61\u6DF1\u523Bbug","icon":"creative","link":"deepImpression/redis\u5927\u6570\u636E\u67E5\u8BE2\u8FD8\u4E0D\u5982\u76F4\u63A5\u67E5\u6570\u636E\u5E93"},{"text":"\u4F18\u5316","icon":"creative","link":"optimization/\u8BA1\u7B97\u5927\u6570\u636E\u91CF\uFF0C\u9891\u7E41\u64CD\u4F5C\u6570\u636E\u5E93\u4F18\u5316"},{"text":"\u6742\u9879","icon":"creative","link":"misc/\u4E2D\u95F4\u4EF6\u7684\u4E00\u4E9B\u8BA4\u77E5"}]}],"footer":"\u9ED8\u8BA4\u9875\u811A","displayFooter":true,"pageInfo":["Author","Original","Date","Category","Tag","ReadingTime"]}}}');
const themeData = ref(themeData$1);
const useThemeData$1 = () => themeData;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data) => {
    themeData.value = data;
  };
}
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData$1 = () => {
  const themeLocaleData = inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  var _a2;
  return {
    ...theme,
    ...(_a2 = theme.locales) == null ? void 0 : _a2[routeLocale]
  };
};
var clientConfig5 = defineClientConfig({
  enhance({ app }) {
    const themeData2 = useThemeData$1();
    const routeLocale = app._context.provides[routeLocaleSymbol];
    const themeLocaleData = computed(() => resolveThemeLocaleData(themeData2.value, routeLocale.value));
    app.provide(themeLocaleDataSymbol, themeLocaleData);
    Object.defineProperties(app.config.globalProperties, {
      $theme: {
        get() {
          return themeData2.value;
        }
      },
      $themeLocale: {
        get() {
          return themeLocaleData.value;
        }
      }
    });
    {
      setupDevtoolsPlugin({
        app,
        id: "org.vuejs.vuepress.plugin-theme-data",
        label: "VuePress Theme Data Plugin",
        packageName: "@vuepress/plugin-theme-data",
        homepage: "https://v2.vuepress.vuejs.org",
        logo: "https://v2.vuepress.vuejs.org/images/hero.png",
        componentStateTypes: ["VuePress"]
      }, (api) => {
        api.on.inspectComponent((payload) => {
          payload.instanceData.state.push({
            type: "VuePress",
            key: "themeData",
            editable: false,
            value: themeData2.value
          }, {
            type: "VuePress",
            key: "themeLocaleData",
            editable: false,
            value: themeLocaleData.value
          });
        });
      });
    }
  }
});
var giscus = "";
const u$3 = { "provider": "Giscus", "repo": "vuepress-theme-hope/giscus-discussions", "repoId": "R_kgDOG_Pt2A", "category": "Announcements", "categoryId": "DIC_kwDOG_Pt2M4COD69" }, c$2 = Boolean(u$3.categoryId), l$4 = ["de", "gsw", "en", "es", "fr", "id", "it", "ja", "ko", "pl", "ro", "ru", "vi", "zh-CN", "zh-TW"];
var d = defineComponent({ name: "GiscusComment", props: { darkmode: Boolean }, setup(r2) {
  const d2 = usePageFrontmatter(), m2 = useRoute(), g = ref(false), v = computed(() => {
    const e2 = usePageLang().value;
    if (l$4.includes(e2))
      return e2;
    const o2 = e2.split("-")[0];
    return l$4.includes(o2) ? o2 : "en";
  }), y2 = computed(() => {
    if (!c$2)
      return false;
    const e2 = false !== u$3.comment, t2 = d2.value.comment;
    return Boolean(t2) || false !== e2 && false !== t2;
  }), f2 = computed(() => ({ repo: u$3.repo, repoId: u$3.repoId, category: u$3.category, categoryId: u$3.categoryId, lang: v.value, theme: r2.darkmode ? "dark" : "light", mapping: u$3.mapping || "specific", term: withBase(m2.path), inputPosition: u$3.inputPosition || "top", reactionsEnabled: false !== u$3.reactionsEnabled ? "1" : "0", emitMetadata: "0" }));
  return onMounted(() => {
    __vitePreload(() => import("./giscus.8fe73ced.js"), true ? [] : void 0).then(() => {
      g.value = true;
    });
  }), () => h$2("div", { class: ["giscus-wrapper", { "input-top": "bottom" !== u$3.inputPosition }], style: { display: y2.value ? "block" : "none" } }, g.value ? h$2("giscus-widget", f2.value) : h$2("div", { style: "text-align:center" }, "Loading..."));
} });
const a$3 = { "provider": "Giscus", "repo": "vuepress-theme-hope/giscus-discussions", "repoId": "R_kgDOG_Pt2A", "category": "Announcements", "categoryId": "DIC_kwDOG_Pt2M4COD69" };
var p$2 = defineClientConfig({ enhance: ({ app: e2 }) => {
  const p2 = defineComponent({ name: "CommentService", props: { darkmode: Boolean }, setup(e3) {
    const m2 = usePageFrontmatter(), p3 = computed(() => m2.value.comment || false !== a$3 && false !== m2.value.comment);
    return () => h$2(d, { darkmode: e3.darkmode, style: { display: p3.value ? "block" : "none" } });
  } });
  e2.component("CommentService", p2);
} });
var balloon = "";
var button = "";
const n$1 = { "selector": '.theme-hope-content div[class*="language-"] pre', "pure": false }, a$2 = () => !!navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(navigator.userAgent), l$3 = () => {
  const e2 = useRoute(), l2 = f$1({ "/": { "copy": "\u590D\u5236\u6210\u529F", "hint": "\u590D\u5236\u4EE3\u7801" } });
  let i2;
  const p2 = (e3) => {
    if (!e3.hasAttribute("copy-code-registered")) {
      const t2 = document.createElement("button");
      t2.className = "copy-code-button", t2.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="icon-copy-code"><path fill="currentColor" d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 00-6-6H102a6 6 0 00-6 6v20a6 6 0 006 6h180a6 6 0 006-6z" /></svg>', t2.addEventListener("click", () => {
        ((e4) => {
          const t3 = document.getSelection(), o2 = !!(t3 && t3.rangeCount > 0) && t3.getRangeAt(0), c2 = document.createElement("textarea");
          c2.value = e4, c2.setAttribute("readonly", ""), c2.style.position = "absolute", c2.style.top = "-9999px", document.body.appendChild(c2), c2.select(), document.execCommand("copy"), i2.pop(`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#06a35a"><path d="M822.812 824.618c-83.076 81.992-188.546 124.614-316.05 127.865-122.085-3.251-223.943-45.873-305.935-127.865S76.213 640.406 72.962 518.682c3.251-127.503 45.873-232.973 127.865-316.05 81.992-83.075 184.211-126.058 305.936-129.309 127.503 3.251 232.973 46.234 316.049 129.31 83.076 83.076 126.059 188.546 129.31 316.05-2.89 121.723-46.234 223.943-129.31 305.935zM432.717 684.111c3.973 3.974 8.307 5.78 13.364 6.14 5.057.362 9.753-1.444 13.365-5.417l292.57-287.515c3.974-3.973 5.78-8.307 5.78-13.364s-1.806-9.753-5.78-13.365l1.807 1.806c-3.973-3.973-8.669-5.779-14.087-6.14-5.418-.361-10.475 1.445-14.809 5.418L460.529 592.006c-3.973 3.25-8.669 4.695-14.448 4.695-5.78 0-10.836-1.445-15.531-3.973l-94.273-72.962c-4.335-3.251-9.392-4.335-14.448-3.973s-9.392 3.25-12.642 7.585l-2.89 3.973c-3.25 4.334-4.334 9.391-3.973 14.81.722 5.417 2.528 10.113 5.779 14.086L432.717 684.11z"/></svg><span>${l2.value.copy} \u{1F389}</span>`, n$1.duration), document.body.removeChild(c2), o2 && t3 && (t3.removeAllRanges(), t3.addRange(o2));
        })(e3.innerText);
      }), t2.setAttribute("aria-label", l2.value.hint), t2.setAttribute("data-balloon-pos", "left"), e3.parentElement && e3.parentElement.insertBefore(t2, e3), e3.setAttribute("copy-code-registered", "");
    }
  }, d2 = () => {
    const e3 = n$1.selector;
    setTimeout(() => {
      document.querySelectorAll(e3).forEach(p2);
    }, n$1.delay || 500);
  };
  onMounted(() => {
    i2 = new b(), a$2() && !n$1.showInMobile || d2();
  }), watch(() => e2.path, () => {
    a$2() && !n$1.showInMobile || d2();
  });
};
var i$1 = defineClientConfig({ setup: () => {
  l$3();
} });
var photoswipe = "";
const s$1 = ".theme-hope-content :not(a) > img", a$1 = { "/": { "closeTitle": "\u5173\u95ED", "downloadTitle": "\u4E0B\u8F7D\u56FE\u7247", "fullscreenTitle": "\u5207\u6362\u5168\u5C4F", "zoomTitle": "\u7F29\u653E", "arrowPrevTitle": "\u4E0A\u4E00\u4E2A (\u5DE6\u7BAD\u5934)", "arrowNextTitle": "\u4E0B\u4E00\u4E2A (\u53F3\u7BAD\u5934)" } }, l$2 = 500, m$1 = {}, p$1 = (e2) => ({ src: e2.src, width: e2.naturalWidth, height: e2.naturalHeight, alt: e2.alt }), u$2 = () => {
  const { isSupported: e2, toggle: u2 } = useFullscreen(), h2 = f$1(a$1), d2 = useRoute(), c2 = () => {
    Promise.all([__vitePreload(() => import("./photoswipe.esm.8cc0a8b7.js"), true ? [] : void 0), new Promise((e3) => setTimeout(e3, l$2)).then(() => ((e3) => {
      const t2 = Array.from(document.querySelectorAll(e3));
      return Promise.all(t2.map((e4) => new Promise((t3, o2) => {
        e4.complete ? t3(p$1(e4)) : (e4.onload = () => t3(p$1(e4)), e4.onerror = (e5) => o2(e5));
      }))).then((e4) => ({ elements: t2, infos: e4 }));
    })(s$1))]).then(([t2, o2]) => {
      o2.elements.forEach((r2, i2) => {
        r2.addEventListener("click", () => {
          const r3 = new t2.default({ dataSource: o2.infos, ...h2.value, ...m$1, index: i2 });
          r3.on("uiRegister", () => {
            e2 && r3.ui.registerElement({ name: "fullscreen", order: 7, isButton: true, html: '<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>', onClick: () => {
              u2();
            } }), r3.ui.registerElement({ name: "download", order: 8, isButton: true, tagName: "a", html: { isCustomSVG: true, inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>', outlineID: "pswp__icn-download" }, onInit: (e3, t3) => {
              e3.setAttribute("download", ""), e3.setAttribute("target", "_blank"), e3.setAttribute("rel", "noopener"), t3.on("change", () => {
                e3.href = t3.currSlide.data.src;
              });
            } });
          }), r3.init();
        });
      });
    });
  };
  watch(() => d2.path, () => c2()), onMounted(() => c2());
};
var h$1 = defineClientConfig({ setup: () => {
  u$2();
} });
const useThemeData = () => useThemeData$1();
const useThemeLocaleData = () => useThemeLocaleData$1();
const usePure = () => computed(() => Boolean(useThemeData().value.pure));
const useMobile = () => {
  const themeData2 = useThemeData();
  const isMobile = ref(false);
  const mobileHandler = () => {
    isMobile.value = window.innerWidth <= (themeData2.value.mobileBreakPoint || 719);
  };
  onMounted(() => {
    mobileHandler();
    useEventListener("resize", mobileHandler, false);
    useEventListener("orientationchange", mobileHandler, false);
  });
  return isMobile;
};
const useNavigate = () => {
  const router = useRouter();
  const route = useRoute();
  return (url) => {
    if (url) {
      if (url.startsWith("/")) {
        if (route.path !== url)
          void router.push(url);
      } else if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")) {
        if (window)
          window.open(url);
      } else {
        const base2 = route.path.slice(0, route.path.lastIndexOf("/"));
        void router.push(`${base2}/${encodeURI(url)}`);
      }
    }
  };
};
const useAutoLink = (item, preferFull = false) => {
  const router = useRouter();
  const { fullPath, meta, name } = x(router, encodeURI(item));
  return {
    text: !preferFull && meta.shortTitle ? meta.shortTitle : meta.title || item,
    link: name === "404" ? item : fullPath,
    ...meta.icon ? { icon: meta.icon } : {}
  };
};
const usePageAuthor = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    const { author } = frontmatter.value;
    if (author)
      return J(author);
    if (author === false)
      return [];
    return J(themeLocale.value.author, false);
  });
};
const usePageCategory = () => {
  const frontmatter = usePageFrontmatter();
  return computed(() => V(frontmatter.value.category).map((name) => {
    var _a2, _b;
    return {
      name,
      path: ((_b = (_a2 = inject(Symbol.for("categoryMap"))) == null ? void 0 : _a2.value.map[name]) == null ? void 0 : _b.path) || ""
    };
  }));
};
const usePageTag = () => {
  const frontmatter = usePageFrontmatter();
  return computed(() => B(frontmatter.value.tag).map((name) => {
    var _a2, _b;
    return {
      name,
      path: ((_b = (_a2 = inject(Symbol.for("tagMap"))) == null ? void 0 : _a2.value.map[name]) == null ? void 0 : _b.path) || ""
    };
  }));
};
const usePageDate = () => {
  const frontmatter = usePageFrontmatter();
  const page2 = usePageData();
  return computed(() => {
    const { date } = frontmatter.value;
    if (date)
      return Z(date);
    const { createdTime } = page2.value.git || {};
    if (createdTime)
      return Z(new Date(createdTime));
    return null;
  });
};
const usePageInfo = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  const author = usePageAuthor();
  const category2 = usePageCategory();
  const tag2 = usePageTag();
  const date = usePageDate();
  const config = reactive({
    author: author.value,
    category: category2.value,
    date: date.value,
    localizedDate: page2.value.localizedDate,
    tag: tag2.value,
    isOriginal: frontmatter.value.isOriginal || false,
    readingTime: page2.value.readingTime,
    pageview: false
  });
  const items = computed(() => "pageInfo" in frontmatter.value ? frontmatter.value.pageInfo : "pageInfo" in themeLocale.value ? themeLocale.value.pageInfo : null);
  return { config, items };
};
let promise = null;
let promiseResolve = null;
const scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve2) => promiseResolve = resolve2);
  },
  resolve: () => {
    promiseResolve == null ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
var footer = "";
var PageFooter = defineComponent({
  name: "PageFooter",
  setup() {
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const author = usePageAuthor();
    const enable = computed(() => {
      const { copyright: copyright2, footer: footer2 } = frontmatter.value;
      return footer2 !== false && Boolean(copyright2 || footer2 || themeLocale.value.displayFooter);
    });
    const content = computed(() => {
      const { footer: footer2 } = frontmatter.value;
      return footer2 === false ? false : typeof footer2 === "string" ? footer2 : themeLocale.value.footer || "";
    });
    const copyright = computed(() => "copyright" in frontmatter.value ? frontmatter.value.copyright : "copyright" in themeLocale.value ? themeLocale.value.copyright : author.value.length ? `Copyright \xA9 ${new Date().getFullYear()} ${author.value[0].name}` : false);
    return () => enable.value ? h$2("footer", { class: "footer-wrapper" }, [
      h$2("div", { class: "footer", innerHTML: content.value }),
      copyright.value ? h$2("div", {
        class: "copyright",
        innerHTML: copyright.value
      }) : null
    ]) : null;
  }
});
var AutoLink = defineComponent({
  name: "AutoLink",
  inheritAttrs: false,
  props: {
    config: {
      type: Object,
      required: true
    },
    exact: Boolean,
    externalLinkIcon: {
      type: Boolean,
      default: true
    }
  },
  emits: ["focusout"],
  setup(props, { attrs, emit: emit2, slots }) {
    const route = useRoute();
    const site = useSiteData();
    const config = toRef(props, "config");
    const hasHttpProtocol = computed(() => isLinkHttp(config.value.link));
    const hasNonHttpProtocal = computed(() => isLinkMailto(config.value.link) || isLinkTel(config.value.link));
    const linkTarget = computed(() => hasNonHttpProtocal.value ? void 0 : config.value.target || (hasHttpProtocol.value ? "_blank" : void 0));
    const isBlankTarget = computed(() => linkTarget.value === "_blank");
    const renderRouterLink = computed(() => !hasHttpProtocol.value && !hasNonHttpProtocal.value && !isBlankTarget.value);
    const anchorRel = computed(() => hasNonHttpProtocal.value ? void 0 : config.value.rel || (isBlankTarget.value ? "noopener noreferrer" : void 0));
    const linkAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const shouldBeActiveInSubpath = computed(() => {
      if (props.exact)
        return false;
      const localeKeys = Object.keys(site.value.locales);
      return localeKeys.length ? localeKeys.every((key) => key !== config.value.link) : config.value.link !== "/";
    });
    const isActive = computed(() => renderRouterLink.value ? config.value.activeMatch ? new RegExp(config.value.activeMatch).test(route.path) : !shouldBeActiveInSubpath.value ? route.path === config.value.link : route.path.startsWith(config.value.link) : false);
    return () => {
      var _a2, _b, _c;
      const { text, icon, link } = config.value;
      return renderRouterLink.value ? h$2(RouterLink, {
        to: link,
        "aria-label": linkAriaLabel.value,
        ...attrs,
        class: ["nav-link", { active: isActive.value }, attrs["class"]],
        onFocusout: () => emit2("focusout")
      }, () => {
        var _a3, _b2, _c2;
        return ((_a3 = slots["default"]) == null ? void 0 : _a3.call(slots)) || [
          ((_b2 = slots["before"]) == null ? void 0 : _b2.call(slots)) || h$2(resolveComponent("FontIcon"), { icon }),
          text,
          (_c2 = slots["after"]) == null ? void 0 : _c2.call(slots)
        ];
      }) : h$2("a", {
        href: link,
        rel: anchorRel.value,
        target: linkTarget.value,
        "aria-label": linkAriaLabel.value,
        ...attrs,
        class: ["nav-link", attrs["class"]],
        onFocusout: () => emit2("focusout")
      }, ((_a2 = slots["default"]) == null ? void 0 : _a2.call(slots)) || [
        ((_b = slots["before"]) == null ? void 0 : _b.call(slots)) || h$2(resolveComponent("FontIcon"), { icon }),
        text,
        props.externalLinkIcon ? h$2(ExternalLinkIcon) : null,
        (_c = slots["after"]) == null ? void 0 : _c.call(slots)
      ]);
    };
  }
});
const isActiveSidebarItem = (route, item, exact = false) => {
  if ("activeMatch" in item)
    return new RegExp(item.activeMatch).test(route.path);
  if (S(route, item.link))
    return true;
  if (item.children && !exact)
    return item.children.some((child) => isActiveSidebarItem(route, child));
  return false;
};
const isMatchedSidebarItem = (route, item) => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group")
        return isMatchedSidebarItem(route, child);
      return child.type === "page" && isActiveSidebarItem(route, child, true);
    }) || "prefix" in item && S(route, item.prefix);
  return false;
};
const renderItem = (config, props) => config.link ? h$2(AutoLink, {
  ...props,
  config
}) : h$2("p", props, [
  h$2(resolveComponent("FontIcon"), { icon: config.icon }),
  config.text
]);
const renderChildren$1 = (children) => {
  const route = useRoute();
  if (!children)
    return null;
  return h$2("ul", { class: "sidebar-sub-headers" }, children.map((child) => {
    const active = isActiveSidebarItem(route, child, true);
    return h$2("li", { class: "sidebar-sub-header" }, [
      renderItem(child, {
        class: ["sidebar-link", "heading", { active }]
      }),
      renderChildren$1(child.children)
    ]);
  }));
};
const sidebarData = { "/java/": [{ "text": "Java\u57FA\u7840", "icon": "creative", "collapsable": true, "prefix": "base/", "children": ["Java\u57FA\u7840.md", "\u5173\u952E\u5B57\u603B\u7ED3.md", "Java\u5F02\u5E38\u5904\u7406.md", "Java\u53CD\u5C04.md", "Java\u53CD\u5C042.md", "Java\u57FA\u7840\u9762\u8BD5\u63D0\u95EE.md"] }, { "text": "Jave-IO\u6846\u67B6", "icon": "creative", "collapsable": true, "prefix": "io/", "children": [] }, { "text": "Jave\u96C6\u5408", "icon": "creative", "collapsable": true, "prefix": "collection/", "children": ["Java\u5BB9\u5668\u57FA\u7840.md", "HashMap\u76F8\u5173\u95EE\u9898.md", "ArrayList\u7684\u6269\u5BB9\u673A\u5236.md", "Comparable\u548CComparator.md"] }, { "text": "\u591A\u7EBF\u7A0B\u4E0E\u5E76\u53D1", "icon": "creative", "collapsable": true, "prefix": "thread/", "children": [{ "text": "\u591A\u7EBF\u7A0B\u57FA\u7840", "icon": "creative", "collapsable": true, "prefix": "base/", "children": [{ "text": "ThreadLocal", "collapsable": true, "prefix": "ThreadLocal/", "children": ["ThreadLocal.md", "ThreadLocal\u4F7F\u7528\u4E0D\u5F53\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F.md", "ThreadLocal\u4F7F\u7528\u573A\u666F.md", "ThreadLocal\u8BE6\u89E3.md"] }, "Java\u7EBF\u7A0B\u57FA\u7840.md", "\u591A\u7EBF\u7A0B.md", "\u591A\u7EBF\u7A0B\u7406\u8BBA\u57FA\u7840.md", "\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501.md", "\u6B7B\u9501.md", "\u7EBF\u7A0B\u751F\u547D\u5468\u671F.md", "\u7EBF\u7A0B\u901A\u4FE1.md"] }, { "text": "JUC\u9501", "icon": "creative", "collapsable": true, "prefix": "JUCLock/", "children": [{ "text": "LockSupport", "icon": "creative", "collapsable": true, "prefix": "LockSupport/", "children": ["LockSupport\u6E90\u7801.md", "LockSupport\u7528\u6CD5.md"] }, { "text": "ReentrantLock", "icon": "creative", "collapsable": true, "prefix": "ReentrantLock/", "children": ["ReentrantLock\u4E4B\u6761\u4EF6\u9501Condition\u6E90\u7801\u5206\u6790.md", "ReentrantLock\u548C\u6761\u4EF6\u9501Condition\u5B9E\u73B0\u963B\u585E\u961F\u5217ArrayBlockingQueue.md", "ReentrantLock\u6E90\u7801\u5206\u6790.md", "ReentrantLock\u6E90\u7801\u5206\u6790\u4E09.md", "ReentrantLock\u6E90\u7801\u5206\u6790\u4E8C.md", "ReentrantLock\u91CD\u5165\u9501.md"] }, "\u9501\u6838\u5FC3\u7C7BAQS\u8BE6\u89E3.md"] }, { "text": "\u5E76\u53D1", "icon": "creative", "collapsable": true, "prefix": "concurrent/", "children": [{ "text": "Java\u9501", "icon": "creative", "collapsable": true, "prefix": "lock/", "children": ["Java\u4E2D\u6240\u6709\u7684\u9501.md", "java\u81EA\u65CB\u9501.md", "\u4E50\u89C2\u9501\u548C\u60B2\u89C2\u9501.md"] }, { "text": "\u7EBF\u7A0B\u6C60", "icon": "creative", "collapsable": true, "prefix": "threadpool/", "children": ["\u5728\u63A5\u53E3\u4E2D\u4F7F\u7528\u7EBF\u7A0B\u6C60\uFF0C\u5904\u7406\u6570\u636E.md", "\u7EBF\u7A0B\u6C60\u56DB\u79CD\u521B\u5EFA\u7EBF\u7A0B\u7684\u65B9\u6CD5.md", "\u7EBF\u7A0B\u6C60\u6267\u884C\u5B8C\u6240\u6709\u4EFB\u52A1\u540E\u518D\u6267\u884C\u4E3B\u7EBF\u7A0B.md"] }, { "text": "\u539F\u5B50\u7C7B", "icon": "creative", "collapsable": true, "prefix": "Atomic/", "children": ["Atomic\u539F\u5B50\u7C7B.md", "AtomicInteger\u6E90\u7801\u89E3\u6790.md", "AtomicStampedReference\u6E90\u7801\u89E3\u6790.md"] }, { "text": "CAS", "icon": "creative", "collapsable": true, "prefix": "cas/", "children": ["cas.md", "UnSafe\u7C7B\u8BE6\u89E3.md"] }, "Callable\u548CFuture.md", "Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60.md", "ThreadPoolExecutor\u7C7B.md", "\u5982\u4F55\u5408\u7406\u914D\u7F6E\u7EBF\u7A0B\u6C60\u7684\u5927\u5C0F.md", "\u7EBF\u7A0B\u6C60.md", "\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B.md", "\u7EBF\u7A0B\u6C60\u7684\u5177\u4F53\u5B9E\u73B0\u539F\u7406.md", "\u7EBF\u7A0B\u6C60\u7684\u5904\u7406\u6D41\u7A0B.md"] }, { "text": "JUC\u5DE5\u5177", "icon": "creative", "collapsable": true, "prefix": "JUCTools/", "children": ["CountDownLatch\u8BE6\u89E3.md"] }, { "text": "JUC\u7EBF\u7A0B\u6C60", "icon": "creative", "collapsable": true, "prefix": "JUCExecutor/", "children": ["FutureTask\u8BE6\u89E3.md", "ScheduledThreadPoolExecutor\u8BE6\u89E3.md", "ThreadPoolExecutor\u8BE6\u89E3.md"] }, { "text": "\u5E76\u53D1\u5173\u952E\u5B57", "icon": "creative", "collapsable": true, "prefix": "Keywords/", "children": [{ "text": "final", "icon": "creative", "collapsable": true, "prefix": "final/", "children": ["final\u5173\u952E\u5B57.md"] }, { "text": "synchronized", "collapsable": true, "prefix": "synchronized/", "children": ["synchronized\u5173\u952E\u5B57.md", "Synchronized\u7684\u5B9E\u73B0\u539F\u7406.md", "synchronized\u8BE6\u89E3.md"] }, { "text": "volatile", "icon": "creative", "collapsable": true, "prefix": "volatile/", "children": ["java\u5185\u5B58\u6A21\u578B.md", "volatile\u5173\u952E\u5B57.md", "volatile\u5173\u952E\u5B57old.md"] }] }, { "text": "JUC\u96C6\u5408", "icon": "creative", "collapsable": true, "prefix": "JUCCollection/", "children": ["BlockingQueue\u8BE6\u89E3.md"] }] }, { "text": "Jave-Java8", "icon": "creative", "collapsable": true, "prefix": "java8/", "children": ["Java8-\u51FD\u6570\u7F16\u7A0Blambda\u8868\u8FBE\u5F0F.md"] }, { "text": "Jvm", "icon": "creative", "collapsable": true, "prefix": "jvm/", "children": ["Java\u5185\u5B58\u533A\u57DF.md", "HotSpot\u865A\u62DF\u673A\u5BF9\u8C61\u521B\u5EFA.md", { "text": "Jvm-\u5783\u573E\u56DE\u6536GC", "collapsable": true, "prefix": "gc/", "children": ["JVM\u5783\u573E\u56DE\u6536.md", "JVM\u5185\u5B58\u5206\u914D\u4E0E\u56DE\u6536.md", "\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1.md", "\u5783\u573E\u6536\u96C6\u7B97\u6CD5.md", "\u5783\u573E\u6536\u96C6\u5668.md", "GC\u4E2D\u5BF9\u8C61\u81EA\u6551.md", "gc\u65E5\u5FD7\u5206\u6790.md", "Java\u5982\u4F55\u9009\u62E9\u5408\u9002\u7684\u5783\u573E\u56DE\u6536\u5668.md", "\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5FullGC.md"] }, { "text": "Jvm-\u7C7B\u52A0\u8F7D\u5668", "collapsable": true, "prefix": "classload/", "children": ["\u7C7B\u52A0\u8F7D\u8FC7\u7A0B.md", "\u7C7B\u52A0\u8F7D\u8FC7\u7A0B\u7CBE\u7B80\u7248.md", "\u7C7B\u52A0\u8F7D\u5668.md", "\u7C7B\u52A0\u8F7D\u5668\u5E38\u89C1\u9762\u8BD5.md", "tomcat\u7C7B\u52A0\u8F7D\u5668.md"] }, { "text": "Jvm-\u6027\u80FD\u8C03\u4F18", "collapsable": true, "prefix": "optimization/", "children": ["Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002.md", "jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406.md", "\u5185\u5B58\u6EA2\u51FA\u65F6\u6253\u5370\u5185\u5B58\u4FE1\u606F.md", "\u5982\u4F55\u5408\u7406\u7684\u89C4\u5212JVM\u6027\u80FD\u8C03\u4F18.md"] }, { "text": "Jvm-\u8C03\u4F18\u5DE5\u5177", "collapsable": true, "prefix": "tools/", "children": [{ "text": "visualvm", "icon": "creative", "collapsable": true, "prefix": "visualvm/", "children": ["mac\u7248idea\u914D\u7F6Evisualvm.md"] }, { "text": "Jvm-MAT", "icon": "creative", "collapsable": true, "prefix": "mat/", "children": ["mat\u5B89\u88C5.md", "mat\u4F7F\u7528.md", "Shallow\u548CRetained.md", "\u8BB0\u4E00\u6B21MAT\u5206\u6790\u7EBF\u4E0A\u9879\u76EE\u8FC7\u7A0B.md"] }, "JDK\u76D1\u63A7\u548C\u6545\u969C\u5904\u7406\u5DE5\u5177\u6C47\u603B.md"] }, "JVM\u9762\u8BD5\u63D0\u95EE.md", "\u5E38\u89C1\u7684JVM\u8BBE\u7F6E.md"] }, { "text": "Jave-\u7F16\u8BD1", "icon": "creative", "collapsable": true, "prefix": "command/", "children": ["Java\u53CD\u7F16\u8BD1\u547D\u4EE4-javap.md", "Java\u547D\u4EE4\u53C2\u6570.md", "Java\u7F16\u8BD1.md"] }] };
const resolvePrefix = (prefix = "", path = "") => path.startsWith("/") ? path : `${ensureEndingSlash(prefix)}${path}`;
const headerToSidebarItem = (header, headerDepth) => {
  const page2 = usePageData();
  return {
    type: "heading",
    text: header.title,
    link: `${page2.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, headerDepth)
  };
};
const headersToSidebarItemChildren = (headers, headerDepth) => headerDepth > 0 ? headers.map((header) => headerToSidebarItem(header, headerDepth - 1)) : [];
const resolveHeadingSidebarItems = (headerDepth) => {
  const page2 = usePageData();
  return headersToSidebarItemChildren(page2.value.headers, headerDepth);
};
const resolveArraySidebarItems = (sidebarConfig, headerDepth, prefix = "") => {
  const page2 = usePageData();
  const route = useRoute();
  const handleChildItem = (item, pathPrefix = prefix) => {
    var _a2;
    const childItem = isString$1(item) ? useAutoLink(resolvePrefix(pathPrefix, item)) : item.link ? {
      ...item,
      ...!isLinkExternal(item.link) ? { link: useAutoLink(resolvePrefix(pathPrefix, item.link)).link } : {}
    } : item;
    if ("children" in childItem) {
      const prefix2 = resolvePrefix(pathPrefix, childItem.prefix);
      const children = childItem.children === "structure" ? sidebarData[prefix2] : childItem.children;
      return {
        type: "group",
        ...childItem,
        prefix: prefix2,
        children: children.map((item2) => handleChildItem(item2, prefix2))
      };
    }
    return {
      type: "page",
      ...childItem,
      children: childItem.link === route.path ? headersToSidebarItemChildren(
        ((_a2 = page2.value.headers[0]) == null ? void 0 : _a2.level) === 1 ? page2.value.headers[0].children : page2.value.headers,
        headerDepth
      ) : []
    };
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
const resolveMultiSidebarItems = (sidebarConfig, headerDepth) => {
  const route = useRoute();
  const keys = Object.keys(sidebarConfig).sort((x2, y2) => y2.length - x2.length);
  for (const base2 of keys) {
    if (decodeURI(route.path).startsWith(base2)) {
      const matchedConfig = sidebarConfig[base2];
      return matchedConfig ? resolveArraySidebarItems(matchedConfig === "structure" ? sidebarData[base2] : matchedConfig, headerDepth, base2) : [];
    }
  }
  console.warn(`${route.path} do not have valid sidebar config`);
  return [];
};
const resolveSidebarItems = () => {
  var _a2, _b, _c, _d;
  const routeLocale = useRouteLocale();
  const frontmatter = usePageFrontmatter();
  const themeLocale = useThemeLocaleData();
  const sidebarConfig = frontmatter.value.home ? false : (_b = (_a2 = frontmatter.value.sidebar) != null ? _a2 : themeLocale.value.sidebar) != null ? _b : "structure";
  const headerDepth = (_d = (_c = frontmatter.value.headerDepth) != null ? _c : themeLocale.value.headerDepth) != null ? _d : 2;
  return sidebarConfig === false ? [] : sidebarConfig === "heading" ? resolveHeadingSidebarItems(headerDepth) : sidebarConfig === "structure" ? resolveArraySidebarItems(sidebarData[routeLocale.value], headerDepth, routeLocale.value) : isArray$1(sidebarConfig) ? resolveArraySidebarItems(sidebarConfig, headerDepth) : isPlainObject(sidebarConfig) ? resolveMultiSidebarItems(sidebarConfig, headerDepth) : [];
};
const sidebarItemsSymbol = Symbol.for("sidebarItems");
const setupSidebarItems = () => {
  const sidebarItems = computed(() => resolveSidebarItems());
  provide(sidebarItemsSymbol, sidebarItems);
};
const useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};
var common = "";
var CommonWrapper = defineComponent({
  name: "CommonWrapper",
  props: {
    navbar: {
      type: Boolean,
      default: true
    },
    sidebar: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    const router = useRouter();
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const isMobile = useMobile();
    const hideNavbar = ref(false);
    const enableNavbar = computed(() => {
      if (props.navbar === false)
        return false;
      if (frontmatter.value.navbar === false || themeLocale.value.navbar === false)
        return false;
      return Boolean(page2.value.title || themeLocale.value.logo || themeLocale.value.repo || themeLocale.value.navbar);
    });
    const sidebarItems = useSidebarItems();
    const enableSidebar = computed(() => {
      if (props.sidebar === false)
        return false;
      return frontmatter.value.sidebar !== false && sidebarItems.value.length !== 0 && !frontmatter.value.home;
    });
    const isMobileSidebarOpen = ref(false);
    const isDesktopSidebarCollapsed = ref(false);
    const toggleMobileSidebar = (value) => {
      isMobileSidebarOpen.value = typeof value === "boolean" ? value : !isMobileSidebarOpen.value;
    };
    const toggleDesktopSidebar = (value) => {
      isDesktopSidebarCollapsed.value = typeof value === "boolean" ? value : !isDesktopSidebarCollapsed.value;
    };
    const touchStart = { x: 0, y: 0 };
    const onTouchStart = (e2) => {
      touchStart.x = e2.changedTouches[0].clientX;
      touchStart.y = e2.changedTouches[0].clientY;
    };
    const onTouchEnd = (e2) => {
      const dx = e2.changedTouches[0].clientX - touchStart.x;
      const dy = e2.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 40) {
        if (dx > 0 && touchStart.x <= 80)
          toggleMobileSidebar(true);
        else
          toggleMobileSidebar(false);
      }
    };
    const enableToc = computed(() => frontmatter.value.toc || themeLocale.value.toc !== false && frontmatter.value.toc !== false);
    const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let unregisterRouterHook;
    let lastDistance = 0;
    useEventListener("scroll", useThrottleFn(() => {
      const distance = getScrollTop();
      if (lastDistance < distance && distance > 58) {
        if (!isMobileSidebarOpen.value)
          hideNavbar.value = true;
      } else
        hideNavbar.value = false;
      lastDistance = distance;
    }, 300));
    watch(isMobile, (value) => {
      if (!value)
        toggleMobileSidebar(false);
    });
    onMounted(() => {
      unregisterRouterHook = router.afterEach(() => {
        toggleMobileSidebar(false);
      });
    });
    onBeforeUnmount(() => {
      unregisterRouterHook();
    });
    return () => h$2("div", {
      class: [
        "theme-container",
        {
          "no-navbar": !enableNavbar.value,
          "no-sidebar": !enableSidebar.value && !(slots["sidebar"] || slots["sidebarTop"] || slots["sidebarBottom"]),
          "has-toc": enableToc.value,
          "hide-navbar": hideNavbar.value,
          "sidebar-collapsed": !isMobile.value && isDesktopSidebarCollapsed.value,
          "sidebar-open": isMobile.value && isMobileSidebarOpen.value
        },
        frontmatter.value.containerClass || ""
      ],
      onTouchStart,
      onTouchEnd
    }, h$2(c$3("GloablEncrypt") ? resolveComponent("GloablEncrypt") : u$4, () => {
      var _a2;
      return [
        enableNavbar.value ? h$2(resolveComponent("Navbar"), { onToggleSidebar: () => toggleMobileSidebar() }, {
          leftStart: () => {
            var _a3;
            return (_a3 = slots["navbarLeftStart"]) == null ? void 0 : _a3.call(slots);
          },
          leftEnd: () => {
            var _a3;
            return (_a3 = slots["navbarLeftEnd"]) == null ? void 0 : _a3.call(slots);
          },
          centerStart: () => {
            var _a3;
            return (_a3 = slots["navbarCenterStart"]) == null ? void 0 : _a3.call(slots);
          },
          centerEnd: () => {
            var _a3;
            return (_a3 = slots["navbarCenterEnd"]) == null ? void 0 : _a3.call(slots);
          },
          rightStart: () => {
            var _a3;
            return (_a3 = slots["navbarRightStart"]) == null ? void 0 : _a3.call(slots);
          },
          rightEnd: () => {
            var _a3;
            return (_a3 = slots["navbarRightEnd"]) == null ? void 0 : _a3.call(slots);
          },
          screenTop: () => {
            var _a3;
            return (_a3 = slots["navScreenTop"]) == null ? void 0 : _a3.call(slots);
          },
          screenBottom: () => {
            var _a3;
            return (_a3 = slots["navScreenBottom"]) == null ? void 0 : _a3.call(slots);
          }
        }) : null,
        h$2(Transition, { name: "fade" }, () => isMobileSidebarOpen.value ? h$2("div", {
          class: "sidebar-mask",
          onClick: () => toggleMobileSidebar(false)
        }) : null),
        h$2(Transition, { name: "fade" }, () => isMobile.value ? null : h$2("div", {
          class: "toggle-sidebar-wrapper",
          onClick: () => toggleDesktopSidebar()
        }, h$2("span", {
          class: [
            "arrow",
            isDesktopSidebarCollapsed.value ? "right" : "left"
          ]
        }))),
        h$2(resolveComponent("Sidebar"), {}, {
          ...slots["sidebar"] ? { default: () => {
            var _a3;
            return (_a3 = slots["sidebar"]) == null ? void 0 : _a3.call(slots);
          } } : {},
          top: () => {
            var _a3;
            return (_a3 = slots["sidebarTop"]) == null ? void 0 : _a3.call(slots);
          },
          bottom: () => {
            var _a3;
            return (_a3 = slots["sidebarBottom"]) == null ? void 0 : _a3.call(slots);
          }
        }),
        (_a2 = slots["default"]) == null ? void 0 : _a2.call(slots),
        h$2(PageFooter)
      ];
    }));
  }
});
var DropTransition = defineComponent({
  name: "DropTransition",
  components: {
    Transition,
    TransitionGroup
  },
  props: {
    type: { type: String, default: "single" },
    delay: { type: Number, default: 0 },
    duration: { type: Number, default: 0.25 },
    appear: Boolean
  },
  setup(props, { slots }) {
    const setStyle2 = (item) => {
      item.style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      item.style.transform = "translateY(-20px)";
      item.style.opacity = "0";
    };
    const unsetStyle = (item) => {
      item.style.transform = "translateY(0)";
      item.style.opacity = "1";
    };
    return () => h$2(
      props.type === "single" ? Transition : TransitionGroup,
      {
        name: "drop",
        appear: props.appear,
        onAppear: setStyle2,
        onAfterAppear: unsetStyle,
        onEnter: setStyle2,
        onAfterEnter: unsetStyle,
        onBeforeLeave: setStyle2
      },
      () => {
        var _a2;
        return (_a2 = slots["default"]) == null ? void 0 : _a2.call(slots);
      }
    );
  }
});
var HomeFeatures = defineComponent({
  name: "HomeFeatures",
  setup() {
    const frontmatter = usePageFrontmatter();
    const features = computed(() => {
      if (isArray$1(frontmatter.value.features))
        return frontmatter.value.features;
      return [];
    });
    const getIcon = (icon = "") => {
      return isLinkHttp(icon) ? h$2("img", { class: "icon", src: icon }) : icon.startsWith("/") ? h$2("img", { class: "icon", src: withBase(icon) }) : icon ? h$2(resolveComponent("FontIcon"), { icon }) : null;
    };
    return () => {
      var _a2;
      return features.value.length ? h$2("div", { class: "features" }, (_a2 = frontmatter.value.features) == null ? void 0 : _a2.map((feature) => {
        const children = [
          getIcon(feature.icon),
          h$2("h2", { innerHTML: feature.title }),
          h$2("p", { innerHTML: feature.details })
        ];
        return feature.link ? isLinkExternal(feature.link) ? h$2("a", {
          class: "feature link",
          href: feature.link,
          role: "navigation",
          target: "_blank"
        }, children) : h$2(RouterLink, {
          class: "feature link",
          to: feature.link,
          role: "navigation"
        }, () => children) : h$2("div", { class: "feature" }, children);
      })) : null;
    };
  }
});
const MarkdownContent = ({ custom }) => h$2(Content, { class: ["theme-hope-content", { custom }] });
MarkdownContent.displayName = "MarkdownContent";
MarkdownContent.props = {
  custom: Boolean
};
var HomeHero = defineComponent({
  name: "HomeHero",
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();
    const heroText = computed(() => {
      if (frontmatter.value.heroText === false)
        return false;
      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });
    const tagline = computed(() => {
      if (frontmatter.value.tagline === false)
        return false;
      return frontmatter.value.tagline || siteLocale.value.description || "Welcome to your VuePress site";
    });
    const heroImage = computed(() => {
      if (!frontmatter.value.heroImage)
        return null;
      return withBase(frontmatter.value.heroImage);
    });
    const heroImageDark = computed(() => {
      if (!frontmatter.value.heroImageDark)
        return null;
      return withBase(frontmatter.value.heroImageDark);
    });
    const heroAlt = computed(() => frontmatter.value.heroAlt || heroText.value || "hero");
    const actions = computed(() => isArray$1(frontmatter.value.actions) ? frontmatter.value.actions : []);
    return () => {
      var _a2, _b;
      return h$2("header", { class: "hero" }, [
        ((_a2 = slots["heroImage"]) == null ? void 0 : _a2.call(slots)) || h$2(DropTransition, { appear: true, type: "group" }, () => [
          heroImage.value ? h$2("img", {
            key: "light",
            class: { light: heroImageDark.value },
            src: heroImage.value,
            alt: heroAlt
          }) : null,
          heroImageDark.value ? h$2("img", {
            key: "dark",
            class: "dark",
            src: heroImageDark.value,
            alt: heroAlt
          }) : null
        ]),
        ((_b = slots["heroInfo"]) == null ? void 0 : _b.call(slots)) || h$2("div", { class: "hero-info" }, [
          heroText.value ? h$2(DropTransition, { appear: true, delay: 0.04 }, () => h$2("h1", { id: "main-title" }, heroText.value)) : null,
          tagline.value ? h$2(DropTransition, { appear: true, delay: 0.08 }, () => h$2("p", { class: "description" }, tagline.value)) : null,
          actions.value.length ? h$2(DropTransition, { appear: true, delay: 0.12 }, () => h$2("p", { class: "actions" }, actions.value.map((action) => h$2(AutoLink, {
            class: ["action-button", action.type || "default"],
            config: action,
            externalLinkIcon: false
          })))) : null
        ])
      ]);
    };
  }
});
var homePage = "";
var HomePage = defineComponent({
  name: "HopePage",
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    return () => {
      var _a2, _b, _c;
      return h$2("main", {
        class: "home project",
        id: "main-content",
        "aria-labelledby": frontmatter.value.heroText === null ? void 0 : "main-title"
      }, [
        (_a2 = slots["top"]) == null ? void 0 : _a2.call(slots),
        h$2(HomeHero),
        h$2(DropTransition, { appear: true, delay: 0.16 }, () => h$2(HomeFeatures)),
        (_b = slots["center"]) == null ? void 0 : _b.call(slots),
        h$2(DropTransition, { appear: true, delay: 0.24 }, () => h$2(MarkdownContent, { custom: true })),
        (_c = slots["bottom"]) == null ? void 0 : _c.call(slots)
      ]);
    };
  }
});
const getAncestorLinks = (route, routeLocale) => {
  const routePaths = route.path.replace(routeLocale, "/").split("/");
  const links = [];
  let link = removeEndingSlash(routeLocale);
  routePaths.forEach((element, index2) => {
    if (index2 !== routePaths.length - 1) {
      link += `${element}/`;
      links.push(link);
    } else if (element !== "") {
      link += element;
      links.push(link);
    }
  });
  return links;
};
const resolveRepoType = (repo) => !isLinkHttp(repo) || /github\.com/.test(repo) ? "GitHub" : /bitbucket\.org/.test(repo) ? "Bitbucket" : /gitlab\.com/.test(repo) ? "GitLab" : /gitee\.com/.test(repo) ? "Gitee" : null;
var breadcrumb = "";
var BreadCrumb = defineComponent({
  name: "BreadCrumb",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const routeLocale = useRouteLocale();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const config = ref([]);
    const enable = computed(() => {
      return (frontmatter.value.breadcrumb || frontmatter.value.breadcrumb !== false && themeLocale.value.breadcrumb !== false) && config.value.length > 1;
    });
    const iconEnable = computed(() => frontmatter.value.breadcrumbIcon || frontmatter.value.breadcrumbIcon !== false && themeLocale.value.breadcrumbIcon !== false);
    const getBreadCrumbConfig = () => {
      const routes = router.getRoutes();
      const breadcrumbConfig = getAncestorLinks(route, routeLocale.value).map((link) => {
        const route2 = routes.find((route3) => route3.path === link);
        if (route2) {
          const { meta, path } = x(router, route2.path);
          if (meta.shortTitle || meta.title)
            return {
              title: meta.shortTitle || meta.title,
              icon: meta.icon,
              path
            };
        }
        return null;
      }).filter((item) => item !== null);
      if (breadcrumbConfig.length > 1)
        config.value = breadcrumbConfig;
    };
    onMounted(() => {
      void getBreadCrumbConfig();
      watch(() => route.path, getBreadCrumbConfig);
    });
    return () => h$2("nav", { class: ["breadcrumb", { disable: !enable.value }] }, enable.value ? h$2("ol", {
      vocab: "https://schema.org/",
      typeof: "BreadcrumbList"
    }, config.value.map((item, index2) => h$2("li", {
      class: { "is-active": config.value.length - 1 === index2 },
      property: "itemListElement",
      typeof: "ListItem"
    }, [
      h$2(RouterLink, {
        to: item.path,
        property: "item",
        typeof: "WebPage"
      }, () => [
        iconEnable.value ? h$2(resolveComponent("FontIcon"), { icon: item.icon }) : null,
        h$2("span", { property: "name" }, item.title || "Unknown")
      ]),
      h$2("meta", { property: "position", content: index2 + 1 })
    ]))) : []);
  }
});
var pageNav = "";
const resolveFromFrontmatterConfig = (conf) => {
  if (conf === false)
    return false;
  if (isString$1(conf))
    return useAutoLink(conf, true);
  if (isPlainObject(conf))
    return conf;
  return null;
};
const resolveFromSidebarItems = (sidebarItems, currentPath, offset2) => {
  const index2 = sidebarItems.findIndex((item) => item.link === currentPath);
  if (index2 !== -1) {
    const targetItem = sidebarItems[index2 + offset2];
    if (!(targetItem == null ? void 0 : targetItem.link))
      return null;
    return targetItem;
  }
  for (const item of sidebarItems)
    if (item.children) {
      const childResult = resolveFromSidebarItems(item.children, currentPath, offset2);
      if (childResult)
        return childResult;
    }
  return null;
};
var PageNav = defineComponent({
  name: "PageNav",
  setup() {
    const themeLocale = useThemeLocaleData();
    const frontmatter = usePageFrontmatter();
    const sidebarItems = useSidebarItems();
    const route = useRoute();
    const navigate = useNavigate();
    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
      return prevConfig === false ? null : prevConfig || (themeLocale.value.prevLink === false ? null : resolveFromSidebarItems(sidebarItems.value, route.path, -1));
    });
    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
      return nextConfig === false ? null : nextConfig || (themeLocale.value.nextLink === false ? null : resolveFromSidebarItems(sidebarItems.value, route.path, 1));
    });
    useEventListener("keydown", (event) => {
      if (event.altKey) {
        if (event.key === "ArrowRight") {
          if (nextNavLink.value) {
            navigate(nextNavLink.value.link);
            event.preventDefault();
          }
        } else if (event.key === "ArrowLeft") {
          if (prevNavLink.value) {
            navigate(prevNavLink.value.link);
            event.preventDefault();
          }
        }
      }
    });
    return () => prevNavLink.value || nextNavLink.value ? h$2("nav", { class: "page-nav" }, [
      prevNavLink.value ? h$2(AutoLink, { class: "prev", config: prevNavLink.value }, () => {
        var _a2, _b;
        return [
          h$2("div", { class: "hint" }, [
            h$2("span", { class: "arrow left" }),
            themeLocale.value.metaLocales.prev
          ]),
          h$2("div", { class: "link" }, [
            h$2(resolveComponent("FontIcon"), {
              icon: (_a2 = prevNavLink.value) == null ? void 0 : _a2.icon
            }),
            (_b = prevNavLink.value) == null ? void 0 : _b.text
          ])
        ];
      }) : null,
      nextNavLink.value ? h$2(AutoLink, { class: "next", config: nextNavLink.value }, () => {
        var _a2, _b;
        return [
          h$2("div", { class: "hint" }, [
            themeLocale.value.metaLocales.next,
            h$2("span", { class: "arrow right" })
          ]),
          h$2("div", { class: "link" }, [
            (_a2 = nextNavLink.value) == null ? void 0 : _a2.text,
            h$2(resolveComponent("FontIcon"), {
              icon: (_b = nextNavLink.value) == null ? void 0 : _b.icon
            })
          ])
        ];
      }) : null
    ]) : null;
  }
});
const AuthorIcon = () => h$2(a$4, { name: "author" }, () => h$2("path", {
  d: "M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"
}));
AuthorIcon.displayName = "AuthorIcon";
const CalendarIcon = () => h$2(a$4, { name: "calendar" }, () => h$2("path", {
  d: "M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"
}));
CalendarIcon.displayName = "CalendarIcon";
const CategoryIcon$1 = () => h$2(a$4, { name: "category" }, () => h$2("path", {
  d: "M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"
}));
CategoryIcon$1.displayName = "CategoryIcon";
const EyeIcon = () => h$2(a$4, { name: "eye" }, () => h$2("path", {
  d: "M992 512.096c0-5.76-.992-10.592-1.28-11.136-.192-2.88-1.152-8.064-2.08-10.816-.256-.672-.544-1.376-.832-2.08-.48-1.568-1.024-3.104-1.6-4.32C897.664 290.112 707.104 160 512 160c-195.072 0-385.632 130.016-473.76 322.592-1.056 2.112-1.792 4.096-2.272 5.856a55.512 55.512 0 00-.64 1.6c-1.76 5.088-1.792 8.64-1.632 7.744-.832 3.744-1.568 11.168-1.568 11.168-.224 2.272-.224 4.032.032 6.304 0 0 .736 6.464 1.088 7.808.128 1.824.576 4.512 1.12 6.976h-.032c.448 2.08 1.12 4.096 1.984 6.08.48 1.536.992 2.976 1.472 4.032C126.432 733.856 316.992 864 512 864c195.136 0 385.696-130.048 473.216-321.696 1.376-2.496 2.24-4.832 2.848-6.912.256-.608.48-1.184.672-1.728 1.536-4.48 1.856-8.32 1.728-8.32l-.032.032c.608-3.104 1.568-7.744 1.568-13.28zM512 672c-88.224 0-160-71.776-160-160s71.776-160 160-160 160 71.776 160 160-71.776 160-160 160z"
}));
EyeIcon.displayName = "EyeIcon";
const FireIcon = () => h$2(a$4, { name: "fire" }, () => h$2("path", {
  d: "M726.4 201.6c-12.8-9.6-28.8-6.4-38.4 0-9.6 9.6-16 25.6-9.6 38.4 6.4 12.8 9.6 28.8 12.8 44.8C604.8 83.2 460.8 38.4 454.4 35.2c-9.6-3.2-22.4 0-28.8 6.4-9.6 6.4-12.8 19.2-9.6 28.8 12.8 86.4-25.6 188.8-115.2 310.4-6.4-25.6-16-51.2-32-80-9.6-9.6-22.4-16-35.2-12.8-16 3.2-25.6 12.8-25.6 28.8-3.2 48-25.6 92.8-51.2 140.8C134.4 499.2 112 544 102.4 592c-32 150.4 99.2 329.6 233.6 380.8 9.6 3.2 19.2 6.4 32 9.6-25.6-19.2-41.6-51.2-48-96C294.4 691.2 505.6 640 515.2 460.8c153.6 105.6 224 336 137.6 505.6 3.2 0 6.4-3.2 9.6-3.2 0 0 3.2 0 3.2-3.2 163.2-89.6 252.8-208 259.2-345.6 16-211.2-163.2-390.4-198.4-412.8z"
}));
FireIcon.displayName = "FireIcon";
const TagIcon$1 = () => h$2(a$4, { name: "tag" }, () => h$2("path", {
  d: "M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"
}));
TagIcon$1.displayName = "TagIcon";
const TimerIcon = () => h$2(a$4, { name: "timer" }, () => h$2("path", {
  d: "M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"
}));
TimerIcon.displayName = "TimerIcon";
const WordIcon = () => h$2(a$4, { name: "word" }, () => [
  h$2("path", {
    d: "M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"
  }),
  h$2("path", {
    d: "M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"
  })
]);
WordIcon.displayName = "WordIcon";
const useMetaLocale = () => {
  const themeLocale = useThemeLocaleData();
  return computed(() => themeLocale.value.metaLocales);
};
const readingTimeLocales = { "/": { "word": "\u7EA6 $word \u5B57", "less1Minute": "\u5C0F\u4E8E 1 \u5206\u949F", "time": "\u5927\u7EA6 $time \u5206\u949F" } };
const editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  if (!filePathRelative)
    return null;
  const repoType = resolveRepoType(docsRepo);
  let pattern;
  if (editLinkPattern)
    pattern = editLinkPattern;
  else if (repoType !== null)
    pattern = editLinkPatterns[repoType];
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`));
};
const useEditLink = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    var _a2, _b;
    const { repo, docsRepo = repo, docsBranch = "main", docsDir = "", editLink, editLinkPattern = "" } = themeLocale.value;
    const showEditLink = (_b = (_a2 = frontmatter.value.editLink) != null ? _a2 : editLink) != null ? _b : true;
    if (!showEditLink)
      return null;
    if (!docsRepo)
      return null;
    const link = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      editLinkPattern,
      filePathRelative: page2.value.filePathRelative
    });
    if (!link)
      return null;
    return {
      text: themeLocale.value.metaLocales.editLink,
      link
    };
  });
};
const useUpdateTime = () => {
  const siteLocale = useSiteLocaleData();
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    var _a2, _b, _c, _d;
    const showLastUpdated = (_b = (_a2 = frontmatter.value.lastUpdated) != null ? _a2 : themeLocale.value.lastUpdated) != null ? _b : true;
    if (!showLastUpdated)
      return null;
    if (!((_c = page2.value.git) == null ? void 0 : _c.updatedTime))
      return null;
    const updatedDate = new Date((_d = page2.value.git) == null ? void 0 : _d.updatedTime);
    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};
const useContributors = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    var _a2, _b, _c, _d;
    const showContributors = (_b = (_a2 = frontmatter.value.contributors) != null ? _a2 : themeLocale.value.contributors) != null ? _b : true;
    if (!showContributors)
      return null;
    return (_d = (_c = page2.value.git) == null ? void 0 : _c.contributors) != null ? _d : null;
  });
};
var AuthorInfo = defineComponent({
  name: "AuthorInfo",
  props: {
    author: {
      type: Array,
      required: true
    },
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    return () => props.author.length ? h$2("span", {
      class: "author-info",
      "aria-label": `${metaLocale.value.author}${props.pure ? "" : "\u{1F58A}"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$2(AuthorIcon),
      h$2("span", props.author.map((item) => item.url ? h$2("a", {
        class: "author-item",
        href: item.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, item.name) : h$2("span", { class: "author-item" }, item.name))),
      h$2("span", {
        property: "author",
        content: props.author.map((item) => item.name).join(", ")
      })
    ]) : null;
  }
});
var category = "";
var CategoryInfo = defineComponent({
  name: "CategoryInfo",
  props: {
    category: {
      type: Array,
      required: true
    },
    pure: Boolean
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const metaLocale = useMetaLocale();
    const navigate = (path = "") => {
      if (path && route.path !== path)
        void router.push(path);
    };
    return () => props.category.length ? h$2("span", {
      class: "category-info",
      "aria-label": `${metaLocale.value.category}${props.pure ? "" : "\u{1F308}"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$2(CategoryIcon$1),
      h$2("ul", { class: "categories-wrapper" }, [
        ...props.category.map(({ name, path }) => h$2("li", {
          class: [
            "category",
            {
              [`category${D(name, 9)}`]: !props.pure,
              clickable: path
            }
          ],
          role: path ? "navigation" : "",
          onClick: () => navigate(path)
        }, name)),
        h$2("meta", {
          property: "articleSection",
          content: props.category.map(({ name }) => name).join(",")
        })
      ])
    ]) : null;
  }
});
var DateInfo = defineComponent({
  name: "DateInfo",
  props: {
    date: {
      type: Object,
      default: null
    },
    localizedDate: {
      type: String,
      default: ""
    },
    pure: Boolean
  },
  setup(props) {
    const lang = usePageLang();
    const metaLocale = useMetaLocale();
    return () => {
      var _a2, _b, _c;
      return props.date ? h$2("span", {
        class: "date-info",
        "aria-label": `${metaLocale.value.date}${props.pure ? "" : "\u{1F4C5}"}`,
        ...props.pure ? {} : { "data-balloon-pos": "down" }
      }, [
        h$2(CalendarIcon),
        h$2("span", props.localizedDate || ((_a2 = props.date.value) == null ? void 0 : _a2.toLocaleDateString(lang.value))),
        h$2("meta", {
          property: "datePublished",
          content: ((_c = (_b = props.date) == null ? void 0 : _b.value) == null ? void 0 : _c.toISOString()) || ""
        })
      ]) : null;
    };
  }
});
var PageViewInfo = defineComponent({
  name: "PageViewInfo",
  props: {
    pageview: {
      type: [Boolean, String],
      default: false
    },
    pure: Boolean
  },
  setup(props) {
    const route = useRoute();
    const metaLocale = useMetaLocale();
    const pageViews = ref(0);
    const getCount = () => {
      const countElement = document.querySelector(".waline-pageview-count");
      if (countElement) {
        const count = countElement.textContent;
        if (count && !isNaN(Number(count)))
          pageViews.value = Number(count);
        else
          setTimeout(getCount, 500);
      }
    };
    onMounted(() => {
      setTimeout(getCount, 1500);
    });
    watch(() => route.path, (newValue, oldValue) => {
      if (newValue !== oldValue)
        setTimeout(getCount, 500);
    });
    return () => props.pageview ? h$2("span", {
      class: "visitor-info",
      "aria-label": `${metaLocale.value.views}${props.pure ? "" : "\u{1F522}"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$2(pageViews.value < 1e3 ? EyeIcon : FireIcon),
      h$2("span", {
        class: "waline-pageview-count",
        "data-path": typeof props.pageview === "string" ? props.pageview : withBase(route.path)
      }, "...")
    ]) : null;
  }
});
var ReadingTimeInfo = defineComponent({
  name: "ReadingTimeInfo",
  props: {
    readingTime: {
      type: Object,
      default: () => null
    },
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    const readingTimeLocale = f$1(readingTimeLocales);
    const readingTime = computed(() => {
      if (!props.readingTime)
        return null;
      const { minutes } = props.readingTime;
      return minutes < 1 ? { text: readingTimeLocale.value.less1Minute, time: "PT1M" } : {
        text: readingTimeLocale.value.time.replace("$time", Math.round(minutes).toString()),
        time: `PT${Math.round(minutes)}M`
      };
    });
    return () => readingTime.value ? h$2("span", {
      class: "reading-time-info",
      "aria-label": `${metaLocale.value.readingTime}${props.pure ? "" : "\u231B"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$2(TimerIcon),
      h$2("span", readingTime.value.text),
      h$2("meta", {
        property: "timeRequired",
        content: readingTime.value.time
      })
    ]) : null;
  }
});
var tag = "";
var TagInfo = defineComponent({
  name: "TagInfo",
  props: {
    tag: {
      type: Array,
      default: () => []
    },
    pure: Boolean
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const metaLocale = useMetaLocale();
    const navigate = (path = "") => {
      if (path && route.path !== path)
        void router.push(path);
    };
    return () => props.tag.length ? h$2("span", {
      "aria-label": `${metaLocale.value.tag}${props.pure ? "" : "\u{1F3F7}"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$2(TagIcon$1),
      h$2("ul", { class: "tags-wrapper" }, props.tag.map(({ name, path }) => h$2("li", {
        class: [
          "tag",
          {
            [`tag${D(name, 9)}`]: !props.pure,
            clickable: path
          }
        ],
        role: path ? "navigation" : "",
        onClick: () => navigate(path)
      }, name))),
      h$2("meta", {
        property: "keywords",
        content: props.tag.map(({ name }) => name).join(",")
      })
    ]) : null;
  }
});
var OriginalInfo = defineComponent({
  name: "OriginalMark",
  props: {
    isOriginal: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    return () => props.isOriginal ? h$2("span", { class: "origin" }, metaLocale.value.origin) : null;
  }
});
var WordInfo = defineComponent({
  name: "ReadTimeInfo",
  props: {
    readingTime: {
      type: Object,
      default: () => null
    },
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    const readingTimeLocale = f$1(readingTimeLocales);
    const words = computed(() => {
      var _a2;
      return (_a2 = props.readingTime) == null ? void 0 : _a2.words.toString();
    });
    const wordText = computed(() => readingTimeLocale.value.word.replace("$word", words.value || ""));
    return () => words.value ? h$2("span", {
      class: "words-info",
      "aria-label": `${metaLocale.value.words}${props.pure ? "" : "\u{1F520}"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$2(WordIcon),
      h$2("span", wordText.value),
      h$2("meta", {
        property: "wordCount",
        content: words.value
      })
    ]) : null;
  }
});
var pageInfo = "";
var PageInfo = defineComponent({
  name: "PageInfo",
  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    OriginalInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo
  },
  props: {
    items: {
      type: [Array, Boolean],
      default: () => [
        "Author",
        "Original",
        "Date",
        "Category",
        "Tag",
        "ReadingTime"
      ]
    },
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const pure = usePure();
    return () => props.items ? h$2("div", { class: "page-info" }, props.items.map((item) => h$2(resolveComponent(`${item}Info`), {
      ...props.config,
      pure: pure.value
    }))) : null;
  }
});
var pageTitle = "";
var PageTitle = defineComponent({
  name: "PageTitle",
  setup() {
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const { config, items } = usePageInfo();
    return () => h$2("div", { class: "page-title" }, [
      h$2("h1", [
        themeLocale.value.titleIcon !== false ? h$2(resolveComponent("FontIcon"), { icon: frontmatter.value.icon }) : null,
        page2.value.title
      ]),
      h$2(PageInfo, {
        config: unref(config),
        ...items.value === null ? {} : { items: items.value }
      }),
      h$2("hr")
    ]);
  }
});
const EditIcon = () => h$2(a$4, { name: "edit" }, () => [
  h$2("path", {
    d: "M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"
  }),
  h$2("path", {
    d: "M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"
  })
]);
EditIcon.displayName = "EditIcon";
var pageMeta = "";
var PageMeta = defineComponent({
  name: "PageMeta",
  setup() {
    const themeLocale = useThemeLocaleData();
    const editLink = useEditLink();
    const updateTime = useUpdateTime();
    const contributors = useContributors();
    return () => {
      const { metaLocales } = themeLocale.value;
      return h$2("footer", { class: "page-meta" }, [
        editLink.value ? h$2("div", { class: "meta-item edit-link" }, h$2(AutoLink, { class: "label", config: editLink.value }, { before: () => h$2(EditIcon) })) : null,
        updateTime.value ? h$2("div", { class: "meta-item update-time" }, [
          h$2("span", { class: "label" }, `${metaLocales.lastUpdated}: `),
          h$2("span", { class: "info" }, updateTime.value)
        ]) : null,
        contributors.value && contributors.value.length ? h$2("div", { class: "meta-item contributors" }, [
          h$2("span", { class: "label" }, `${metaLocales.contributors}: `),
          contributors.value.map(({ email, name }, index2) => [
            h$2("span", { class: "contributor", title: `email: ${email}` }, name),
            index2 !== contributors.value.length - 1 ? "," : ""
          ])
        ]) : null
      ]);
    };
  }
});
var toc = "";
const renderHeader = ({ title, level, slug }) => h$2(RouterLink, {
  to: `#${slug}`,
  class: ["toc-link", `level${level}`]
}, () => title);
const renderChildren = (headers, headerDepth) => {
  const route = useRoute();
  return headers.length && headerDepth > 0 ? h$2("ul", { class: "toc-list" }, headers.map((header) => [
    h$2("li", {
      class: [
        "toc-item",
        { active: S(route, `#${header.slug}`) }
      ]
    }, renderHeader(header)),
    renderChildren(header.children, headerDepth - 1)
  ])) : null;
};
var TOC = defineComponent({
  name: "TOC",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    headerDepth: {
      type: Number,
      default: 2
    }
  },
  setup(props) {
    const route = useRoute();
    const page2 = usePageData();
    const metaLocale = useMetaLocale();
    const toc2 = ref(null);
    const scrollTo = (top) => {
      var _a2;
      (_a2 = toc2.value) == null ? void 0 : _a2.scrollTo({ top, behavior: "smooth" });
    };
    onMounted(() => {
      watch(() => route.hash, (hash) => {
        if (toc2.value) {
          const activeTocItem = document.querySelector(`#toc a.toc-link[href$="${hash}"]`);
          if (!activeTocItem)
            return;
          const { top: tocTop, height: tocHeight } = toc2.value.getBoundingClientRect();
          const { top: activeTocItemTop, height: activeTocItemHeight } = activeTocItem.getBoundingClientRect();
          if (activeTocItemTop < tocTop)
            scrollTo(toc2.value.scrollTop + activeTocItemTop - tocTop);
          else if (activeTocItemTop + activeTocItemHeight > tocTop + tocHeight)
            scrollTo(toc2.value.scrollTop + activeTocItemTop + activeTocItemHeight - tocTop - tocHeight);
        }
      });
    });
    return () => {
      const tocHeaders = props.items.length ? renderChildren(props.items, props.headerDepth) : page2.value.headers ? renderChildren(page2.value.headers, props.headerDepth) : null;
      return tocHeaders ? h$2("div", { class: "toc-place-holder" }, [
        h$2("aside", { id: "toc" }, [
          h$2("div", { class: "toc-header" }, metaLocale.value.toc),
          h$2("div", { class: "toc-wrapper", ref: toc2 }, [tocHeaders])
        ])
      ]) : null;
    };
  }
});
const darkModeSymbol = Symbol.for("darkMode");
const useDarkMode = () => {
  const darkmode = inject(darkModeSymbol);
  if (!darkmode) {
    throw new Error("useDarkMode() is called without provider.");
  }
  return darkmode;
};
const injectDarkMode = (app) => {
  const themeData2 = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const darkmodeStorage = useStorage("vuepress-theme-hope-scheme", "auto");
  const isDarkMode = computed(() => {
    const { darkmode } = themeData2.value;
    return darkmode === "disable" ? false : darkmode === "enable" ? true : darkmode === "auto" ? isDarkPreferred.value : darkmode === "toggle" ? darkmodeStorage.value === "dark" : darkmodeStorage.value === "dark" || darkmodeStorage.value === "auto" && isDarkPreferred.value;
  });
  app.provide(darkModeSymbol, { isDarkMode, status: darkmodeStorage });
  Object.defineProperties(app.config.globalProperties, {
    $isDarkMode: { get: () => isDarkMode.value }
  });
};
const setupDarkMode = () => {
  const { isDarkMode } = useDarkMode();
  const updateDOM = (isDark = isDarkMode.value) => {
    const html = window == null ? void 0 : window.document.querySelector("html");
    html == null ? void 0 : html.setAttribute("data-theme", isDark ? "dark" : "light");
  };
  onMounted(() => {
    watch(isDarkMode, updateDOM, { immediate: true });
  });
};
var page$1 = "";
var NormalPage = defineComponent({
  name: "NormalPage",
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    const { isDarkMode } = useDarkMode();
    const themeLocale = useThemeLocaleData();
    const tocEnable = computed(() => frontmatter.value.toc || frontmatter.value.toc !== false && themeLocale.value.toc !== false);
    return () => h$2("main", { class: "page", id: "main-content" }, h$2(c$3("LocalEncrypt") ? resolveComponent("LocalEncrypt") : u$4, () => {
      var _a2, _b, _c, _d, _e, _f;
      return [
        (_a2 = slots["top"]) == null ? void 0 : _a2.call(slots),
        h$2(BreadCrumb),
        h$2(PageTitle),
        tocEnable.value ? h$2(TOC, {
          headerDepth: (_c = (_b = frontmatter.value.headerDepth) != null ? _b : themeLocale.value.headerDepth) != null ? _c : 2
        }) : null,
        (_d = slots["contentBefore"]) == null ? void 0 : _d.call(slots),
        h$2(MarkdownContent),
        (_e = slots["contentAfter"]) == null ? void 0 : _e.call(slots),
        h$2(PageMeta),
        h$2(PageNav),
        c$3("CommentService") ? h$2(resolveComponent("CommentService"), {
          darkmode: isDarkMode.value
        }) : null,
        (_f = slots["bottom"]) == null ? void 0 : _f.call(slots)
      ];
    }));
  }
});
const I18nIcon = () => h$2(a$4, { name: "i18n" }, () => [
  h$2("path", {
    d: "M379.392 460.8 494.08 575.488l-42.496 102.4L307.2 532.48 138.24 701.44l-71.68-72.704L234.496 460.8l-45.056-45.056c-27.136-27.136-51.2-66.56-66.56-108.544h112.64c7.68 14.336 16.896 27.136 26.112 35.84l45.568 46.08 45.056-45.056C382.976 312.32 409.6 247.808 409.6 204.8H0V102.4h256V0h102.4v102.4h256v102.4H512c0 70.144-37.888 161.28-87.04 210.944L378.88 460.8zM576 870.4 512 1024H409.6l256-614.4H768l256 614.4H921.6l-64-153.6H576zM618.496 768h196.608L716.8 532.48 618.496 768z"
  })
]);
I18nIcon.displayName = "I18nIcon";
const GitHubIcon = () => h$2(a$4, { name: "github" }, () => h$2("path", {
  d: "M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z"
}));
GitHubIcon.displayName = "GitHubIcon";
const GitlabIcon = () => h$2(a$4, { name: "gitlab" }, () => h$2("path", {
  d: "M229.333 78.688C223.52 62 199.895 62 193.895 78.688L87.958 406.438h247.5c-.188 0-106.125-327.75-106.125-327.75zM33.77 571.438c-4.875 15 .563 31.687 13.313 41.25l464.812 345L87.77 406.438zm301.5-165 176.813 551.25 176.812-551.25zm655.125 165-54-165-424.312 551.25 464.812-345c12.938-9.563 18.188-26.25 13.5-41.25zM830.27 78.688c-5.812-16.688-29.437-16.688-35.437 0l-106.125 327.75h247.5z"
}));
GitlabIcon.displayName = "GitlabIcon";
const GiteeIcon = () => h$2(a$4, { name: "gitee" }, () => h$2("path", {
  d: "M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z"
}));
GiteeIcon.displayName = "GiteeIcon";
const BitbucketIcon = () => h$2(a$4, { name: "bitbucket" }, () => h$2("path", {
  d: "M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z"
}));
BitbucketIcon.displayName = "BitbucketIcon";
const SourceIcon = () => h$2(a$4, { name: "source" }, () => h$2("path", {
  d: "M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z"
}));
SourceIcon.displayName = "SourceIcon";
var dropdownLink = "";
var DropdownLink = defineComponent({
  name: "NavbarDropdownLink",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props, { slots }) {
    const route = useRoute();
    const config = toRef(props, "config");
    const dropdownAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const open = ref(false);
    watch(() => route.path, () => {
      open.value = false;
    });
    const handleDropdown = (event) => {
      const isTriggerByTab = event.detail === 0;
      if (isTriggerByTab)
        open.value = !open.value;
    };
    return () => {
      var _a2;
      return h$2("div", { class: ["dropdown-wrapper", { open: open.value }] }, [
        h$2("button", {
          class: "dropdown-title",
          type: "button",
          "aria-label": dropdownAriaLabel.value,
          onClick: handleDropdown
        }, [
          ((_a2 = slots["title"]) == null ? void 0 : _a2.call(slots)) || h$2("span", { class: "title" }, [
            h$2(resolveComponent("FontIcon"), { icon: config.value.icon }),
            props.config.text
          ]),
          h$2("span", { class: "arrow" }),
          h$2("ul", { class: "nav-dropdown" }, config.value.children.map((child, index2) => {
            const isLastChild = index2 === config.value.children.length - 1;
            return h$2("li", { class: "dropdown-item" }, "children" in child ? [
              h$2("h4", { class: "dropdown-subtitle" }, child.link ? h$2(AutoLink, {
                config: child,
                onFocusout: () => {
                  if (child.children.length === 0 && isLastChild)
                    open.value = false;
                }
              }) : h$2("span", child.text)),
              h$2("ul", { class: "dropdown-subitem-wrapper" }, child.children.map((grandchild, grandIndex) => h$2("li", { class: "dropdown-subitem" }, h$2(AutoLink, {
                config: grandchild,
                onFocusout: () => {
                  if (grandIndex === child.children.length - 1 && isLastChild)
                    open.value = false;
                }
              }))))
            ] : h$2(AutoLink, {
              config: child,
              onFocusout: () => {
                if (isLastChild)
                  open.value = false;
              }
            }));
          }))
        ])
      ]);
    };
  }
});
const resolveNavbarItem = (item, prefix = "") => {
  if (isString$1(item))
    return useAutoLink(`${prefix}${item}`);
  if ("children" in item)
    return {
      ...item,
      ...item.link && !isLinkExternal(item.link) ? useAutoLink(`${prefix}${item.link}`) : {},
      children: item.children.map((child) => resolveNavbarItem(child, `${prefix}${item.prefix || ""}`))
    };
  return {
    ...item,
    link: isLinkExternal(item.link) ? item.link : useAutoLink(`${prefix}${item.link}`).link
  };
};
const useNavbarConfig = () => computed(() => (useThemeLocaleData().value.navbar || []).map((item) => resolveNavbarItem(item)));
const useNavbarLanguageDropdown = () => {
  const router = useRouter();
  const routeLocale = useRouteLocale();
  const siteLocale = useSiteLocaleData();
  const themeData2 = useThemeData();
  const themeLocale = useThemeLocaleData();
  return computed(() => {
    const localePaths = Object.keys(siteLocale.value.locales);
    if (localePaths.length < 2)
      return null;
    const { path, hash } = router.currentRoute.value;
    const { navbarLocales } = themeLocale.value;
    const languageDropdown = {
      text: "",
      ariaLabel: navbarLocales == null ? void 0 : navbarLocales.selectLangAriaLabel,
      children: localePaths.map((targetLocalePath) => {
        var _a2, _b, _c, _d, _e, _f, _g;
        const targetSiteLocale = (_b = (_a2 = siteLocale.value.locales) == null ? void 0 : _a2[targetLocalePath]) != null ? _b : {};
        const targetThemeLocale = (_d = (_c = themeData2.value.locales) == null ? void 0 : _c[targetLocalePath]) != null ? _d : {};
        const targetLang = targetSiteLocale.lang || "";
        const text = (_f = (_e = targetThemeLocale.navbarLocales) == null ? void 0 : _e.langName) != null ? _f : targetLang;
        let link;
        if (targetLang === siteLocale.value.lang) {
          link = path;
        } else {
          const targetLocalePage = path.replace(routeLocale.value, targetLocalePath);
          link = router.getRoutes().some((item) => item.path === targetLocalePage) ? `${targetLocalePage}${hash}` : (_g = targetThemeLocale.home) != null ? _g : targetLocalePath;
        }
        return {
          text,
          link
        };
      })
    };
    return languageDropdown;
  });
};
const useNavbarRepo = () => {
  const themeLocale = useThemeLocaleData();
  const repo = computed(() => themeLocale.value.repo || null);
  const repoType = computed(() => repo.value ? resolveRepoType(repo.value) : null);
  const repoLink2 = computed(() => repo.value && !isLinkHttp(repo.value) ? `https://github.com/${repo.value}` : repo.value);
  const repoLabel = computed(() => {
    var _a2;
    return !repoLink2.value ? null : (_a2 = themeLocale.value.repoLabel) != null ? _a2 : repoType.value === null ? "Source" : repoType.value;
  });
  return computed(() => {
    if (!repoLink2.value || !repoLabel.value || themeLocale.value.repoDisplay === false)
      return null;
    return {
      type: repoType.value || "Source",
      label: repoLabel.value,
      link: repoLink2.value
    };
  });
};
var LanguageDropdown = defineComponent({
  name: "LanguageDropdown",
  setup() {
    const dropdown = useNavbarLanguageDropdown();
    return () => dropdown.value ? h$2("div", { class: "nav-item" }, h$2(DropdownLink, { class: "i18n-dropdown", config: dropdown.value }, {
      title: () => {
        var _a2;
        return h$2(I18nIcon, {
          "aria-label": (_a2 = dropdown.value) == null ? void 0 : _a2.ariaLabel,
          style: {
            width: "1rem",
            height: "1rem",
            verticalAlign: "middle"
          }
        });
      }
    })) : null;
  }
});
var navbarBrand = "";
var NavbarBrand = defineComponent({
  name: "NavbarBrand",
  setup() {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const siteBrandLink = computed(() => themeLocale.value.home || routeLocale.value);
    const siteBrandTitle = computed(() => siteLocale.value.title);
    const siteBrandLogo = computed(() => themeLocale.value.logo ? withBase(themeLocale.value.logo) : null);
    const siteBrandLogoDark = computed(() => themeLocale.value.logoDark ? withBase(themeLocale.value.logoDark) : null);
    return () => h$2(RouterLink, { to: siteBrandLink.value, class: "brand" }, () => [
      siteBrandLogo.value ? h$2("img", {
        class: ["logo", { light: Boolean(siteBrandLogoDark.value) }],
        src: siteBrandLogo.value,
        alt: siteBrandTitle.value
      }) : null,
      siteBrandLogoDark.value ? h$2("img", {
        class: ["logo dark"],
        src: siteBrandLogoDark.value,
        alt: siteBrandTitle.value
      }) : null,
      siteBrandTitle.value ? h$2("span", { class: ["site-name", { "hide-in-pad": siteBrandLogo.value }] }, siteBrandTitle.value) : null
    ]);
  }
});
var navbarLinks = "";
var NavbarLinks = defineComponent({
  name: "NavbarLinks",
  setup() {
    const navbarConfig = useNavbarConfig();
    return () => navbarConfig.value.length ? h$2("nav", { class: "nav-links" }, [
      ...navbarConfig.value.map((config) => h$2("div", { class: "nav-item hide-in-mobile" }, "children" in config ? h$2(DropdownLink, { config }) : h$2(AutoLink, { config })))
    ]) : null;
  }
});
var navScreenDropdown = "";
var NavScreenDropdown = defineComponent({
  name: "NavScreenDropdown",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const config = toRef(props, "config");
    const dropdownAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const open = ref(false);
    watch(() => route.path, () => {
      open.value = false;
    });
    const isLastItemOfArray = (item, arr) => arr[arr.length - 1] === item;
    return () => [
      h$2("button", {
        class: ["nav-screen-dropdown-title", { active: open.value }],
        type: "button",
        "aria-label": dropdownAriaLabel.value,
        onClick: () => {
          open.value = !open.value;
        }
      }, [
        h$2("span", { class: "title" }, [
          h$2(resolveComponent("FontIcon"), { icon: config.value.icon }),
          props.config.text
        ]),
        h$2("span", { class: ["arrow", open.value ? "down" : "right"] })
      ]),
      h$2("ul", {
        class: ["nav-screen-dropdown", { hide: !open.value }]
      }, config.value.children.map((child) => h$2("li", { class: "dropdown-item" }, "children" in child ? [
        h$2("h4", { class: "dropdown-subtitle" }, child.link ? h$2(AutoLink, {
          config: child,
          onFocusout: () => {
            if (isLastItemOfArray(child, config.value.children) && child.children.length === 0)
              open.value = false;
          }
        }) : h$2("span", child.text)),
        h$2("ul", { class: "dropdown-subitem-wrapper" }, child.children.map((grandchild) => h$2("li", { class: "dropdown-subitem" }, h$2(AutoLink, {
          config: grandchild,
          onFocusout: () => {
            if (isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, config.value.children))
              open.value = false;
          }
        }))))
      ] : h$2(AutoLink, {
        config: child,
        onFocusout: () => {
          if (isLastItemOfArray(child, config.value.children))
            open.value = false;
        }
      }))))
    ];
  }
});
var navScreenLinks = "";
var NavScreenLinks = defineComponent({
  name: "NavScreenLinks",
  setup() {
    const navbarConfig = useNavbarConfig();
    return () => navbarConfig.value.length ? h$2("nav", { class: "nav-screen-links" }, navbarConfig.value.map((config) => h$2("div", { class: "navbar-links-item" }, "children" in config ? h$2(NavScreenDropdown, { config }) : h$2(AutoLink, { config })))) : null;
  }
});
const DarkIcon = () => h$2(a$4, { name: "dark" }, () => h$2("path", {
  d: "M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"
}));
DarkIcon.displayName = "DarkIcon";
const LightIcon = () => h$2(a$4, { name: "light" }, () => h$2("path", {
  d: "M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"
}));
LightIcon.displayName = "LightIcon";
const AutoIcon = () => h$2(a$4, { name: "auto" }, () => h$2("path", {
  d: "M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"
}));
AutoIcon.displayName = "AutoIcon";
const EnterFullScreenIcon = () => h$2(a$4, { name: "enter-fullscreen" }, () => h$2("path", {
  d: "M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z"
}));
EnterFullScreenIcon.displayName = "EnterFullScreenIcon";
const CancelFullScreenIcon = () => h$2(a$4, { name: "cancel-fullscreen" }, () => h$2("path", {
  d: "M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z"
}));
CancelFullScreenIcon.displayName = "CancelFullScreenIcon";
const OutlookIcon = () => h$2(a$4, { name: "outlook" }, () => [
  h$2("path", {
    d: "M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"
  })
]);
OutlookIcon.displayName = "OutlookIcon";
var appearanceSwitch = "";
var AppearanceSwitch = defineComponent({
  name: "AppearanceSwitch",
  setup() {
    const themeData2 = useThemeData();
    const { status } = useDarkMode();
    const darkmode = computed(() => themeData2.value.darkmode);
    const toggleDarkMode = () => {
      if (darkmode.value === "switch") {
        status.value = { light: "dark", dark: "auto", auto: "light" }[status.value];
      } else
        status.value = status.value === "light" ? "dark" : "light";
    };
    return () => h$2("button", {
      id: "appearance-switch",
      onClick: () => toggleDarkMode()
    }, [
      h$2(AutoIcon, {
        style: {
          display: status.value === "auto" ? "block" : "none"
        }
      }),
      h$2(DarkIcon, {
        style: {
          display: status.value === "dark" ? "block" : "none"
        }
      }),
      h$2(LightIcon, {
        style: {
          display: status.value === "light" ? "block" : "none"
        }
      })
    ]);
  }
});
var AppearanceMode = defineComponent({
  name: "AppearanceMode",
  setup() {
    const themeData2 = useThemeData();
    const themeLocale = useThemeLocaleData();
    const locale = computed(() => themeLocale.value.outlookLocales.darkmode);
    const darkmode = computed(() => themeData2.value.darkmode);
    const enable = computed(() => darkmode.value === "switch" || darkmode.value === "toggle");
    return () => enable.value ? h$2("div", { class: "appearance-wrapper" }, [
      h$2("label", { class: "appearance-title", for: "appearance-switch" }, locale.value),
      h$2(AppearanceSwitch)
    ]) : null;
  }
});
var themeColorPicker = "";
var ThemeColorPicker = defineComponent({
  name: "ThemeColorPicker",
  props: {
    themeColor: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const setThemeColor = (theme = "") => {
      const classes = document.documentElement.classList;
      const themes = Object.keys(props.themeColor).map((color) => `theme-${color}`);
      if (!theme) {
        localStorage.removeItem("theme");
        classes.remove(...themes);
        return;
      }
      classes.remove(...themes.filter((themeclass) => themeclass !== `theme-${theme}`));
      classes.add(`theme-${theme}`);
      localStorage.setItem("theme", theme);
    };
    onMounted(() => {
      const theme = localStorage.getItem("theme");
      if (theme)
        setThemeColor(theme);
    });
    return () => h$2("ul", { id: "themecolor-picker" }, [
      h$2("li", h$2("span", {
        class: "theme-color",
        onClick: () => setThemeColor()
      })),
      ...Object.entries(props.themeColor).map(([color, value]) => h$2("li", h$2("span", {
        style: { background: value },
        onClick: () => setThemeColor(color)
      })))
    ]);
  }
});
var ThemeColor = defineComponent({
  name: "ThemeColor",
  setup() {
    const themeData2 = useThemeData();
    const themeLocale = useThemeLocaleData();
    const locale = computed(() => themeLocale.value.outlookLocales.themeColor);
    const themeColor = computed(() => {
      const { themeColor: themeColor2 } = themeData2.value;
      return themeColor2 === false ? null : themeColor2;
    });
    return () => themeColor.value ? h$2("div", { class: "themecolor-wrapper" }, [
      h$2("label", { class: "themecolor-title", for: "theme-color-picker" }, locale.value),
      h$2(ThemeColorPicker, { themeColor: themeColor.value })
    ]) : null;
  }
});
var toggleFullScreenButton = "";
var ToggleFullScreenButton = defineComponent({
  name: "ToggleFullScreenButton",
  setup() {
    const themeLocale = useThemeLocaleData();
    const { isSupported: isSupported2, isFullscreen, toggle } = useFullscreen();
    const fullscreenLocale = computed(() => themeLocale.value.outlookLocales.fullscreen);
    return () => isSupported2 ? h$2("div", { class: "fullscreen-wrapper" }, [
      h$2("label", { class: "full-screen-title", for: "full-screen-switch" }, fullscreenLocale.value),
      h$2("button", {
        class: "full-screen",
        id: "full-screen-switch",
        ariaPressed: isFullscreen.value,
        onClick: () => toggle()
      }, isFullscreen.value ? h$2(CancelFullScreenIcon) : h$2(EnterFullScreenIcon))
    ]) : null;
  }
});
var OutlookSettings = defineComponent({
  name: "OutlookSettings",
  setup() {
    const themeData2 = useThemeData();
    const pure = usePure();
    const enableDarkmode = computed(() => themeData2.value.darkmode !== "disable" && themeData2.value.darkmode !== "enable");
    const enableThemeColor = computed(() => !pure.value && Boolean(themeData2.value.themeColor));
    const enableFullScreen = computed(() => !pure.value && themeData2.value.fullscreen);
    return () => h$2(ClientOnly, () => [
      enableThemeColor.value ? h$2(ThemeColor) : null,
      enableDarkmode.value ? h$2(AppearanceMode) : null,
      enableFullScreen.value ? h$2(ToggleFullScreenButton) : null
    ]);
  }
});
var navScreen = "";
var NavScreen = defineComponent({
  name: "NavScreen",
  props: {
    active: Boolean
  },
  emits: ["close"],
  setup(props, { emit: emit2, slots }) {
    const route = useRoute();
    const isMobile = useMobile();
    const body = ref();
    const isLocked = useScrollLock(body);
    watch(isMobile, (value) => {
      if (!value && props.active)
        emit2("close");
    });
    watch(() => route.path, () => {
      isLocked.value = false;
      emit2("close");
    });
    onMounted(() => {
      body.value = document.body;
    });
    onBeforeUnmount(() => {
      isLocked.value = false;
    });
    return () => h$2(Transition, {
      name: "fade",
      onEnter: () => {
        isLocked.value = true;
      },
      onAfterLeave: () => {
        isLocked.value = false;
      }
    }, () => {
      var _a2, _b;
      return props.active ? h$2("div", { id: "nav-screen" }, h$2("div", { class: "container" }, [
        (_a2 = slots["before"]) == null ? void 0 : _a2.call(slots),
        h$2(NavScreenLinks),
        h$2("div", { class: "outlook-wrapper" }, h$2(OutlookSettings)),
        (_b = slots["after"]) == null ? void 0 : _b.call(slots)
      ])) : null;
    });
  }
});
var outlookButton = "";
var OutlookButton = defineComponent({
  name: "OutlookButton",
  setup() {
    const { isSupported: isSupported2 } = useFullscreen();
    const themeData2 = useThemeData();
    const pure = usePure();
    const route = useRoute();
    const open = ref(false);
    const enableDarkmode = computed(() => themeData2.value.darkmode !== "disable" && themeData2.value.darkmode !== "enable");
    const enableThemeColor = computed(() => !pure.value && Boolean(themeData2.value.themeColor));
    const enableFullScreen = computed(() => !pure.value && themeData2.value.fullscreen && isSupported2);
    watch(() => route.path, () => {
      open.value = false;
    });
    return () => enableDarkmode.value || enableFullScreen.value || enableThemeColor.value ? h$2(
      "div",
      { class: "nav-item hide-in-mobile" },
      enableDarkmode.value && !enableFullScreen.value && !enableThemeColor.value ? h$2(AppearanceSwitch) : enableFullScreen.value && !enableDarkmode.value && !enableThemeColor.value ? h$2(ToggleFullScreenButton) : h$2("button", {
        class: ["outlook-button", { open: open.value }],
        tabindex: "-1",
        ariaHidden: true
      }, [
        h$2(OutlookIcon),
        h$2("div", { class: "outlook-dropdown" }, h$2(OutlookSettings))
      ])
    ) : null;
  }
});
var toggleNavbarButton = "";
const ToggleNavbarButton = ({ active = false }, { emit: emit2 }) => h$2("button", {
  class: ["toggle-navbar-button", { "is-active": active }],
  "aria-label": "Toggle Navbar",
  "aria-expanded": active,
  "aria-controls": "nav-screen",
  onClick: () => emit2("toggle")
}, h$2("span", { class: "button-container" }, [
  h$2("span", { class: "button-top" }),
  h$2("span", { class: "button-middle" }),
  h$2("span", { class: "button-bottom" })
]));
ToggleNavbarButton.displayName = "ToggleNavbarButton";
var toggleSidebarButton = "";
const ToggleSidebarButton = (_2, { emit: emit2 }) => h$2("button", {
  class: "toggle-sidebar-button",
  title: "Toggle Sidebar",
  onClick: () => emit2("toggle")
}, h$2("span", { class: "icon" }));
ToggleSidebarButton.displayName = "ToggleSidebarButton";
ToggleSidebarButton.emits = ["toggle"];
var repoLink = "";
var RepoLink = defineComponent({
  name: "RepoLink",
  components: { BitbucketIcon, GiteeIcon, GitHubIcon, GitlabIcon, SourceIcon },
  setup() {
    const repo = useNavbarRepo();
    return () => repo.value ? h$2("div", { class: "nav-item" }, h$2(
      "a",
      {
        class: "repo-link",
        href: repo.value.link,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": repo.value.label
      },
      h$2(resolveComponent(`${repo.value.type}Icon`), {
        style: {
          width: "1.25rem",
          height: "1.25rem",
          verticalAlign: "middle"
        }
      })
    )) : null;
  }
});
var navbar = "";
var Navbar = defineComponent({
  name: "NavBar",
  emits: ["toggle-sidebar"],
  setup(_props, { emit: emit2, slots }) {
    const themeLocale = useThemeLocaleData();
    const isMobile = useMobile();
    const showScreen = ref(false);
    const autoHide = computed(() => {
      const { navbarAutoHide } = themeLocale.value;
      return navbarAutoHide !== "none" && (navbarAutoHide === "always" || isMobile.value);
    });
    const navbarLayout = computed(() => themeLocale.value.navbarLayout || {
      left: ["Brand"],
      center: ["Links"],
      right: ["Language", "Repo", "Outlook", "Search"]
    });
    return () => {
      var _a2, _b, _c, _d, _e, _f;
      const map2 = {
        Brand: h$2(NavbarBrand),
        Language: h$2(LanguageDropdown),
        Links: h$2(NavbarLinks),
        Repo: h$2(RepoLink),
        Outlook: h$2(OutlookButton),
        Search: c$3("Docsearch") ? h$2(resolveComponent("Docsearch")) : c$3("SearchBox") ? h$2(resolveComponent("SearchBox")) : null
      };
      return [
        h$2("header", {
          class: [
            "navbar",
            {
              "auto-hide": autoHide.value,
              "hide-icon": !themeLocale.value.navbarIcon
            }
          ]
        }, [
          h$2("div", { class: "navbar-left" }, [
            h$2(ToggleSidebarButton, {
              onToggle: () => {
                if (showScreen.value)
                  showScreen.value = false;
                emit2("toggle-sidebar");
              }
            }),
            (_a2 = slots["left-start"]) == null ? void 0 : _a2.call(slots),
            ...navbarLayout.value.left.map((item) => map2[item]),
            (_b = slots["left-end"]) == null ? void 0 : _b.call(slots)
          ]),
          h$2("div", { class: "navbar-center" }, [
            (_c = slots["center-start"]) == null ? void 0 : _c.call(slots),
            ...navbarLayout.value.center.map((item) => map2[item]),
            (_d = slots["center-end"]) == null ? void 0 : _d.call(slots)
          ]),
          h$2("div", { class: "navbar-right" }, [
            (_e = slots["right-start"]) == null ? void 0 : _e.call(slots),
            ...navbarLayout.value.right.map((item) => map2[item]),
            (_f = slots["right-start"]) == null ? void 0 : _f.call(slots),
            h$2(ToggleNavbarButton, {
              active: showScreen.value,
              onToggle: () => {
                showScreen.value = !showScreen.value;
              }
            })
          ])
        ]),
        h$2(NavScreen, {
          active: showScreen.value,
          onClose: () => {
            showScreen.value = false;
          }
        }, {
          before: () => {
            var _a3;
            return (_a3 = slots["screenTop"]) == null ? void 0 : _a3.call(slots);
          },
          after: () => {
            var _a3;
            return (_a3 = slots["screenBottom"]) == null ? void 0 : _a3.call(slots);
          }
        })
      ];
    };
  }
});
var sidebarChild = "";
var SidebarChild = defineComponent({
  name: "SidebarChild",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    return () => [
      renderItem(props.config, {
        class: [
          "sidebar-link",
          `sidebar-${props.config.type}`,
          { active: isActiveSidebarItem(route, props.config, true) }
        ],
        exact: true
      }),
      renderChildren$1(props.config.children)
    ];
  }
});
var sidebarGroup = "";
var SidebarGroup = defineComponent({
  name: "SidebarGroup",
  props: {
    config: {
      type: Object,
      required: true
    },
    open: { type: Boolean, required: true }
  },
  emits: ["toggle"],
  setup(props, { emit: emit2 }) {
    const route = useRoute();
    const active = computed(() => isActiveSidebarItem(route, props.config));
    const exact = computed(() => isActiveSidebarItem(route, props.config, true));
    return () => {
      const { collapsable, children = [], icon, link, text } = props.config;
      return [
        h$2("section", { class: "sidebar-group" }, [
          h$2(collapsable ? "button" : "p", {
            class: [
              "sidebar-heading",
              {
                clickable: collapsable || link,
                exact: exact.value,
                active: active.value
              }
            ],
            ...collapsable ? {
              onClick: () => emit2("toggle"),
              onKeydown: (event) => {
                if (event.key === "Enter")
                  emit2("toggle");
              }
            } : {}
          }, [
            h$2(resolveComponent("FontIcon"), { icon }),
            link ? h$2(RouterLink, { to: link, class: "title" }, () => text) : h$2("span", { class: "title" }, text),
            collapsable ? h$2("span", { class: ["arrow", props.open ? "down" : "right"] }) : null
          ]),
          h$2(DropTransition, () => props.open || !collapsable ? h$2(SidebarLinks, { config: children }) : null)
        ])
      ];
    };
  }
});
var sidebarLinks = "";
var SidebarLinks = defineComponent({
  name: "SidebarLinks",
  props: {
    config: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const openGroupIndex = ref(-1);
    const toggleGroup = (index2) => {
      openGroupIndex.value = index2 === openGroupIndex.value ? -1 : index2;
    };
    watch(() => [route.path, props.config], () => {
      const index2 = props.config.findIndex((item) => isMatchedSidebarItem(route, item));
      openGroupIndex.value = index2;
    }, { immediate: true });
    return () => h$2("ul", { class: "sidebar-links" }, props.config.map((config, index2) => h$2("li", config.type === "group" ? h$2(SidebarGroup, {
      config,
      open: index2 === openGroupIndex.value,
      onToggle: () => toggleGroup(index2)
    }) : h$2(SidebarChild, { config }))));
  }
});
var sidebar = "";
var Sidebar = defineComponent({
  name: "SideBar",
  setup(_props, { slots }) {
    const route = useRoute();
    const themeLocale = useThemeLocaleData();
    const sidebarItems = useSidebarItems();
    const sidebar2 = ref(null);
    onMounted(() => {
      watch(() => route.hash, (hash) => {
        const activeSidebarItem = document.querySelector(`.sidebar a.sidebar-link[href="${route.path}${hash}"]`);
        if (!activeSidebarItem)
          return;
        const { top: sidebarTop, height: sidebarHeight } = sidebar2.value.getBoundingClientRect();
        const { top: activeSidebarItemTop, height: activeSidebarItemHeight } = activeSidebarItem.getBoundingClientRect();
        if (activeSidebarItemTop < sidebarTop)
          activeSidebarItem.scrollIntoView(true);
        else if (activeSidebarItemTop + activeSidebarItemHeight > sidebarTop + sidebarHeight)
          activeSidebarItem.scrollIntoView(false);
      });
    });
    return () => {
      var _a2, _b, _c;
      return h$2("aside", {
        class: ["sidebar", { "hide-icon": !themeLocale.value.sidebarIcon }],
        ref: sidebar2
      }, [
        (_a2 = slots["top"]) == null ? void 0 : _a2.call(slots),
        ((_b = slots["default"]) == null ? void 0 : _b.call(slots)) || h$2(SidebarLinks, { config: sidebarItems.value }),
        (_c = slots["bottom"]) == null ? void 0 : _c.call(slots)
      ]);
    };
  }
});
var index = "";
const icons = { "GitHub": '<svg xmlns="http://www.w3.org/2000/svg" class="icon github-icon" viewBox="0 0 1024 1024" ariaLabelledby="github"><circle cx="512" cy="512" r="512" fill="#171515" />,<path d="M509.423 146.442c-200.317 0-362.756 162.42-362.756 362.8 0 160.266 103.936 296.24 248.109 344.217 18.139 3.327 24.76-7.872 24.76-17.486 0-8.613-.313-31.427-.49-61.702-100.912 21.923-122.205-48.63-122.205-48.63-16.495-41.91-40.28-53.067-40.28-53.067-32.937-22.51 2.492-22.053 2.492-22.053 36.407 2.566 55.568 37.386 55.568 37.386 32.362 55.438 84.907 39.43 105.58 30.143 3.296-23.444 12.667-39.43 23.032-48.498-80.557-9.156-165.246-40.28-165.246-179.297 0-39.604 14.135-71.988 37.342-97.348-3.731-9.178-16.18-46.063 3.556-96.009 0 0 30.46-9.754 99.76 37.19 28.937-8.048 59.97-12.071 90.823-12.211 30.807.14 61.843 4.165 90.822 12.21 69.26-46.944 99.663-37.189 99.663-37.189 19.792 49.946 7.34 86.831 3.61 96.01 23.25 25.359 37.29 57.742 37.29 97.347 0 139.366-84.82 170.033-165.637 179.013 13.026 11.2 24.628 33.342 24.628 67.182 0 48.498-.445 87.627-.445 99.521 0 9.702 6.535 20.988 24.945 17.444 144.03-48.067 247.881-183.95 247.881-344.175 0-200.378-162.442-362.798-362.802-362.798z" fill="#fff" /></svg>' };
const categoryMap = { "category": { "/": { "path": "/category/", "map": { "Java": { "path": "/category/java/", "keys": ["v-14c69af4", "v-35c4a6dd", "v-f3262b3a", "v-6e1a5ab5", "v-39490ba5", "v-28851ef4", "v-673af10a", "v-08345439", "v-23375f22", "v-3fc1c173", "v-616148db", "v-2aae2a44", "v-16722c46", "v-46dc7138", "v-9828af56", "v-e46976e6", "v-4ad508cc", "v-70cde54c", "v-6cec0ebc", "v-48579df1", "v-30d7209a", "v-7e29c70a", "v-55227aff", "v-121c2789", "v-302b9660", "v-4ad388e6", "v-53a8109a", "v-ec827a8e", "v-c3f81230", "v-b367d25a", "v-4ede3af1", "v-238be5db", "v-38bac3e7", "v-0266f14f", "v-6b177d22", "v-d1478a00", "v-0e23e8d6", "v-46552bec", "v-311a40b5", "v-c7d13846", "v-16fd454a", "v-6b23f6d4", "v-409577a6", "v-73edc2c7", "v-15ea94a5", "v-4b2e63bd", "v-1985c121", "v-1c9d71a6", "v-838a1cfc", "v-70a9a102", "v-a451c5f0", "v-b87560d8", "v-0485f54d", "v-c97c4172", "v-a9a9a482", "v-e7cad4ca", "v-5634669d", "v-6e5f8241", "v-5e15c1fd", "v-5739c2bc"] }, "JVM": { "path": "/category/jvm/", "keys": ["v-70cde54c", "v-7e29c70a", "v-55227aff", "v-121c2789", "v-302b9660", "v-4ad388e6", "v-4b2e63bd", "v-1985c121", "v-838a1cfc", "v-70a9a102"] }, "\u5E76\u53D1": { "path": "/category/%E5%B9%B6%E5%8F%91/", "keys": ["v-46552bec", "v-311a40b5", "v-c7d13846", "v-16fd454a", "v-6b23f6d4", "v-a451c5f0", "v-b87560d8", "v-0485f54d", "v-c97c4172", "v-a9a9a482", "v-5634669d", "v-6e5f8241", "v-5e15c1fd"] } } } }, "tag": { "/": { "path": "/tag/", "map": {} } } };
if (import_meta.webpackHot) {
  import_meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
  }
}
const typeMap = { "article": { "/": { "path": "/article/", "keys": ["v-14c69af4", "v-35c4a6dd", "v-f3262b3a", "v-6e1a5ab5", "v-39490ba5", "v-28851ef4", "v-673af10a", "v-08345439", "v-23375f22", "v-3fc1c173", "v-616148db", "v-2aae2a44", "v-16722c46", "v-74f62882", "v-f15a9420", "v-3eed58e7", "v-46dc7138", "v-9828af56", "v-60b3db42", "v-e46976e6", "v-4ad508cc", "v-6e7a620a", "v-70cde54c", "v-6cec0ebc", "v-28b05c99", "v-48579df1", "v-30d7209a", "v-7e29c70a", "v-55227aff", "v-121c2789", "v-302b9660", "v-4ad388e6", "v-53a8109a", "v-ec827a8e", "v-c3f81230", "v-b367d25a", "v-4ede3af1", "v-238be5db", "v-38bac3e7", "v-0266f14f", "v-6b177d22", "v-6baa537a", "v-a4db7fec", "v-d1478a00", "v-22b81989", "v-69cfdb30", "v-058d8bb2", "v-e5f5995e", "v-0e23e8d6", "v-410a868a", "v-46552bec", "v-1839a060", "v-311a40b5", "v-0d063008", "v-b3d2e942", "v-c7d13846", "v-41a4e3e9", "v-b4e1b702", "v-16fd454a", "v-6b23f6d4", "v-bda03f78", "v-409577a6", "v-34babb4e", "v-056df0c1", "v-07bbc8e6", "v-1af994a8", "v-6ed69023", "v-5dd87ef2", "v-2fbf52ae", "v-f0342900", "v-73edc2c7", "v-e79e511e", "v-1877f20d", "v-331a0410", "v-6f41b47a", "v-f58de1e8", "v-4c715521", "v-f4d08732", "v-15ea94a5", "v-4b2e63bd", "v-1985c121", "v-1c9d71a6", "v-838a1cfc", "v-70a9a102", "v-8290979e", "v-60b0e62a", "v-11263062", "v-a451c5f0", "v-b87560d8", "v-5d37ada4", "v-78904604", "v-387904f4", "v-36cb5d1f", "v-7e43ba5e", "v-d8840068", "v-0485f54d", "v-6d635beb", "v-c97c4172", "v-2eba8485", "v-9e1d9d06", "v-055f70b2", "v-a9a9a482", "v-44656a92", "v-5c037bfd", "v-630cd524", "v-e7cad4ca", "v-53d8149a", "v-e9a74b8c", "v-1733f725", "v-4225fb47", "v-31d26e23", "v-b1782f30", "v-39fd92ed", "v-5634669d", "v-62d4a013", "v-6e5f8241", "v-525ddd8c", "v-03650f65", "v-254881ea", "v-5e15c1fd", "v-710876ec", "v-9ccd68b2", "v-5739c2bc", "v-0df5f8a9", "v-57e2a49f", "v-3d6f9163", "v-8daa1a0e"] } }, "encrypted": { "/": { "path": "/encrypted/", "keys": [] } }, "slide": { "/": { "path": "/slide/", "keys": [] } }, "star": { "/": { "path": "/star/", "keys": [] } }, "timeline": { "/": { "path": "/timeline/", "keys": ["v-14c69af4", "v-35c4a6dd", "v-f3262b3a", "v-6e1a5ab5", "v-39490ba5", "v-28851ef4", "v-673af10a", "v-08345439", "v-23375f22", "v-3fc1c173", "v-616148db", "v-2aae2a44", "v-16722c46", "v-74f62882", "v-f15a9420", "v-3eed58e7", "v-46dc7138", "v-9828af56", "v-60b3db42", "v-e46976e6", "v-4ad508cc", "v-6e7a620a", "v-70cde54c", "v-6cec0ebc", "v-28b05c99", "v-48579df1", "v-30d7209a", "v-7e29c70a", "v-55227aff", "v-121c2789", "v-302b9660", "v-4ad388e6", "v-53a8109a", "v-ec827a8e", "v-c3f81230", "v-b367d25a", "v-4ede3af1", "v-238be5db", "v-38bac3e7", "v-0266f14f", "v-6b177d22", "v-6baa537a", "v-a4db7fec", "v-d1478a00", "v-22b81989", "v-69cfdb30", "v-058d8bb2", "v-e5f5995e", "v-0e23e8d6", "v-410a868a", "v-46552bec", "v-1839a060", "v-311a40b5", "v-0d063008", "v-b3d2e942", "v-c7d13846", "v-41a4e3e9", "v-b4e1b702", "v-16fd454a", "v-6b23f6d4", "v-bda03f78", "v-409577a6", "v-34babb4e", "v-056df0c1", "v-07bbc8e6", "v-1af994a8", "v-6ed69023", "v-5dd87ef2", "v-2fbf52ae", "v-f0342900", "v-73edc2c7", "v-e79e511e", "v-1877f20d", "v-331a0410", "v-6f41b47a", "v-f58de1e8", "v-4c715521", "v-f4d08732", "v-15ea94a5", "v-4b2e63bd", "v-1985c121", "v-1c9d71a6", "v-838a1cfc", "v-70a9a102", "v-8290979e", "v-60b0e62a", "v-11263062", "v-a451c5f0", "v-b87560d8", "v-5d37ada4", "v-78904604", "v-387904f4", "v-36cb5d1f", "v-7e43ba5e", "v-d8840068", "v-0485f54d", "v-6d635beb", "v-c97c4172", "v-2eba8485", "v-9e1d9d06", "v-055f70b2", "v-a9a9a482", "v-44656a92", "v-5c037bfd", "v-630cd524", "v-e7cad4ca", "v-53d8149a", "v-e9a74b8c", "v-1733f725", "v-4225fb47", "v-31d26e23", "v-b1782f30", "v-39fd92ed", "v-5634669d", "v-62d4a013", "v-6e5f8241", "v-525ddd8c", "v-03650f65", "v-254881ea", "v-5e15c1fd", "v-710876ec", "v-9ccd68b2", "v-5739c2bc", "v-0df5f8a9", "v-57e2a49f", "v-3d6f9163", "v-8daa1a0e"] } } };
if (import_meta.webpackHot) {
  import_meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  }
}
const m = ref(categoryMap), u$1 = (t2 = "") => {
  const a2 = useRouter(), s2 = useRoute(), u2 = useRouteLocale();
  return computed(() => {
    var _a2;
    const e2 = t2 || ((_a2 = usePageFrontmatter().value.blog) == null ? void 0 : _a2.key) || "", n2 = a2.getRoutes();
    if (!m.value[e2])
      throw new Error("useBlogCategory: " + (t2 ? `key ${t2} is invalid` : "can not bind to an exisiting key on non blog pages"));
    const p2 = m.value[e2][u2.value], r2 = { path: p2.path, map: {} };
    for (const t3 in p2.map) {
      const e3 = p2.map[t3];
      r2.map[t3] = { path: e3.path, items: [] };
      for (const o2 of e3.keys) {
        const e4 = n2.find(({ name: t4 }) => t4 === o2);
        if (e4) {
          const o3 = x(a2, e4.path);
          r2.map[t3].items.push({ path: o3.path, info: o3.meta });
        }
      }
      s2.path === e3.path && (r2.currentItems = r2.map[t3].items);
    }
    return r2;
  });
};
(import_meta.webpackHot || false) && (__VUE_HMR_RUNTIME__.updateBlogCategory = (t2) => {
  m.value = t2;
});
const l$1 = ref(typeMap), c$1 = (t2 = "") => {
  const a2 = useRouter(), r2 = useRouteLocale();
  return computed(() => {
    var _a2;
    const e2 = t2 || ((_a2 = usePageFrontmatter().value.blog) == null ? void 0 : _a2.key) || "";
    if (!l$1.value[e2])
      throw new Error("useBlogType: " + (t2 ? `key ${t2} is invalid` : "can not bind to an exisiting key on non blog pages"));
    const n2 = a2.getRoutes(), p2 = l$1.value[e2][r2.value], s2 = { path: p2.path, items: [] };
    for (const t3 of p2.keys) {
      const e3 = n2.find(({ name: e4 }) => e4 === t3);
      if (e3) {
        const t4 = x(a2, e3.path);
        s2.items.push({ path: t4.path, info: t4.meta });
      }
    }
    return s2;
  });
};
(import_meta.webpackHot || false) && (__VUE_HMR_RUNTIME__.updateBlogType = (t2) => {
  l$1.value = t2;
});
const categoryMapSymbol = Symbol.for("categoryMap");
const useCategoryMap = () => {
  const categoryMap2 = inject(categoryMapSymbol);
  if (!categoryMap2) {
    throw new Error("useCategoryMap() is called without provider.");
  }
  return categoryMap2;
};
const setupCategoryMap = () => {
  const categoryMap2 = u$1("category");
  provide(categoryMapSymbol, categoryMap2);
};
const useBlogOptions = () => {
  const themeData2 = useThemeData();
  const themeLocale = useThemeLocaleData();
  return computed(() => ({
    ...themeData2.value.blog,
    ...themeLocale.value.blog
  }));
};
const tagMapSymbol = Symbol.for("tagMap");
const useTagMap = () => {
  const tagMap = inject(tagMapSymbol);
  if (!tagMap) {
    throw new Error("useTagMap() is called without provider.");
  }
  return tagMap;
};
const setupTagMap = () => {
  const tagMap = u$1("tag");
  provide(tagMapSymbol, tagMap);
};
const useArticleAuthor = (info) => {
  const themeLocale = useThemeLocaleData();
  return computed(() => {
    const { author } = info.value;
    if (author)
      return J(author);
    if (author === false)
      return [];
    return J(themeLocale.value.author, false);
  });
};
const useArticleCategory = (info) => {
  const categoryMap2 = useCategoryMap();
  return computed(() => V(info.value.category).map((name) => ({
    name,
    path: categoryMap2.value.map[name].path
  })));
};
const useArticleTag = (info) => {
  const tagMap = useTagMap();
  return computed(() => B(info.value.tag).map((name) => ({
    name,
    path: tagMap.value.map[name].path
  })));
};
const useArticleDate = (info) => computed(() => {
  const { date } = info.value;
  return date ? Z(date) : null;
});
const useArticleInfo = (info) => {
  const blogOptions = useBlogOptions();
  const author = useArticleAuthor(info);
  const category2 = useArticleCategory(info);
  const tag2 = useArticleTag(info);
  const date = useArticleDate(info);
  const config = reactive({
    author: author.value,
    category: category2.value,
    date: date.value,
    localizedDate: info.value.localizedDate || "",
    tag: tag2.value,
    isOriginal: info.value.isOriginal || false,
    readingTime: info.value.readingTime || null
  });
  const items = computed(() => blogOptions.value.articleInfo);
  return { config, items };
};
const articlesSymbol = Symbol.for("articles");
const useArticles = () => {
  const articles = inject(articlesSymbol);
  if (!articles) {
    throw new Error("useArticles() is called without provider.");
  }
  return articles;
};
const setupArticles = () => {
  const articles = c$1("article");
  provide(articlesSymbol, articles);
};
const encryptedArticlesSymbol = Symbol.for("encryptedArticles");
const useEncryptedArticles = () => {
  const encryptedArticles = inject(encryptedArticlesSymbol);
  if (!encryptedArticles) {
    throw new Error("useEncryptedArticles() is called without provider.");
  }
  return encryptedArticles;
};
const setupEncryptedArticles = () => {
  const encryptedArticles = c$1("encrypted");
  provide(encryptedArticlesSymbol, encryptedArticles);
};
const slidesSymbol = Symbol.for("slides");
const useSlides = () => {
  const slides = inject(slidesSymbol);
  if (!slides) {
    throw new Error("useSlides() is called without provider.");
  }
  return slides;
};
const setupSlides = () => {
  const slides = c$1("slide");
  provide(slidesSymbol, slides);
};
const starsSymbol = Symbol.for("stars");
const useStars = () => {
  const stars = inject(starsSymbol);
  if (!stars) {
    throw new Error("useStars() is called without provider.");
  }
  return stars;
};
const setupStars = () => {
  const stars = c$1("star");
  provide(starsSymbol, stars);
};
const timelinesSymbol = Symbol.for("timelines");
const useTimelines = () => {
  const timelines = inject(timelinesSymbol);
  if (!timelines) {
    throw new Error("useTimelines() is called without provider.");
  }
  return timelines;
};
const setupTimelines = () => {
  const timelines = c$1("timeline");
  const timelineItems2 = computed(() => {
    const timelineItems3 = [];
    timelines.value.items.forEach(({ info, path }) => {
      var _a2;
      const { year, month, day } = ((_a2 = Z(info.date)) == null ? void 0 : _a2.info) || {};
      if (year && month && day) {
        if (!timelineItems3[0] || timelineItems3[0].year !== year)
          timelineItems3.unshift({ year, items: [] });
        timelineItems3[0].items.push({
          date: `${month}/${day}`,
          info,
          path
        });
      }
    });
    return {
      ...timelines.value,
      config: timelineItems3.reverse()
    };
  });
  provide(timelinesSymbol, timelineItems2);
};
const setupBlog = () => {
  setupArticles();
  setupCategoryMap();
  setupEncryptedArticles();
  setupSlides();
  setupStars();
  setupTagMap();
  setupTimelines();
};
var socialMedia = "";
var SocialMedia = defineComponent({
  name: "SocialMedia",
  setup() {
    const blogOptions = useBlogOptions();
    const isPure = usePure();
    const mediaLinks = computed(() => {
      const config = blogOptions.value.medias;
      if (config)
        return Object.entries(config).map(([media, url]) => ({
          name: media,
          icon: icons[media],
          url
        }));
      return [];
    });
    return () => mediaLinks.value.length ? h$2("div", { class: "social-media-wrapper" }, mediaLinks.value.map(({ name, icon, url }) => h$2("a", {
      class: "social-media",
      href: url,
      rel: "noopener noreferrer",
      target: "_blank",
      "aria-label": name,
      ...isPure.value ? {} : { "data-balloon-pos": "up" },
      innerHTML: icon
    }))) : null;
  }
});
var bloggerInfo = "";
var BloggerInfo = defineComponent({
  name: "BloggerInfo",
  setup() {
    const blogOptions = useBlogOptions();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap2 = useCategoryMap();
    const tagMap = useTagMap();
    const timelines = useTimelines();
    const navigate = useNavigate();
    const bloggerName = computed(() => {
      var _a2;
      return blogOptions.value.name || ((_a2 = J(themeLocale.value.author)[0]) == null ? void 0 : _a2.name) || siteLocale.value.title;
    });
    const bloggerAvatar = computed(() => blogOptions.value.avatar || themeLocale.value.logo);
    const locale = computed(() => themeLocale.value.blogLocales);
    const intro = computed(() => blogOptions.value.intro);
    return () => h$2("div", {
      class: "blogger-info",
      vocab: "https://schema.org/",
      typeof: "Person"
    }, [
      h$2("div", {
        class: "blogger",
        ...intro.value ? {
          style: { cursor: "pointer" },
          "aria-label": locale.value.intro,
          "data-balloon-pos": "down",
          role: "navigation",
          onClick: () => navigate(intro.value)
        } : {}
      }, [
        bloggerAvatar.value ? h$2("img", {
          class: [
            "blogger-avatar",
            {
              round: blogOptions.value.roundAvatar
            }
          ],
          src: withBase(bloggerAvatar.value),
          property: "image",
          alt: "Blogger Avatar"
        }) : null,
        bloggerName.value ? h$2("div", { class: "blogger-name", property: "name" }, bloggerName.value) : null,
        blogOptions.value.description ? h$2("div", {
          class: "blogger-description",
          innerHTML: blogOptions.value.description
        }) : null,
        intro.value ? h$2("meta", { property: "url", content: withBase(intro.value) }) : null
      ]),
      h$2("div", { class: "num-wrapper" }, [
        h$2("div", { onClick: () => navigate(articles.value.path) }, [
          h$2("div", { class: "num" }, articles.value.items.length),
          h$2("div", locale.value.article)
        ]),
        h$2("div", { onClick: () => navigate(categoryMap2.value.path) }, [
          h$2("div", { class: "num" }, Object.keys(categoryMap2.value.map).length),
          h$2("div", locale.value.category)
        ]),
        h$2("div", { onClick: () => navigate(tagMap.value.path) }, [
          h$2("div", { class: "num" }, Object.keys(tagMap.value.map).length),
          h$2("div", locale.value.tag)
        ]),
        h$2("div", { onClick: () => navigate(timelines.value.path) }, [
          h$2("div", { class: "num" }, timelines.value.items.length),
          h$2("div", locale.value.timeline)
        ])
      ]),
      h$2(SocialMedia)
    ]);
  }
});
const CategoryIcon = () => h$2(a$4, { name: "category" }, () => h$2("path", {
  d: "M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"
}));
CategoryIcon.displayName = "CategoryIcon";
const TagIcon = () => h$2(a$4, { name: "tag" }, () => h$2("path", {
  d: "M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"
}));
TagIcon.displayName = "TagIcon";
const TimelineIcon = () => h$2(a$4, { name: "timeline" }, () => h$2("path", {
  d: "M511.997 70.568c-243.797 0-441.429 197.633-441.429 441.435 0 243.797 197.632 441.429 441.43 441.429S953.431 755.8 953.431 512.002c0-243.796-197.637-441.434-441.435-441.434zm150.158 609.093-15.605 15.61c-8.621 8.615-22.596 8.615-31.215 0L472.197 552.126c-4.95-4.944-4.34-14.888-4.34-24.677V247.14c0-12.19 9.882-22.07 22.07-22.07h22.07c12.19 0 22.07 9.882 22.07 22.07v273.218l128.088 128.088c8.62 8.62 8.62 22.595 0 31.215zm0 0"
}));
TimelineIcon.displayName = "TimelineIcon";
const SlideIcon = () => h$2(a$4, { name: "slides" }, () => h$2("path", {
  d: "M896 170.667v426.666a85.333 85.333 0 0 1-85.333 85.334h-256v61.184l192.597 115.584-43.861 73.13-148.736-89.173v95.275h-85.334v-95.318l-148.736 89.216-43.861-73.13 192.597-115.627v-61.141h-256A85.333 85.333 0 0 1 128 597.333V170.667H85.333V85.333h853.334v85.334H896zm-682.667 0v426.666h597.334V170.667H213.333zM426.667 512h-85.334V341.333h85.334V512zm128 0h-85.334V256h85.334v256zm128 0h-85.334V384h85.334v128z"
}));
SlideIcon.displayName = "SlideIcon";
const StickyIcon = () => h$2(a$4, { name: "sticky" }, () => [
  h$2("path", {
    d: "m381.3 733.8l-161.9 118c-5.9 4.5-13.2 6.6-20.1 6.6-8.7 0-17.7-3.4-24.3-10-12.2-12.2-13.9-31.3-3.5-45.2l144.5-195.5-113.6-112.9c-11.1-11.1-13.2-28.4-5.5-42 5.5-8.7 52.1-76.4 155.5-51 1.8 0.3 3.5 0.3 5.6 0.7 4.2 0.3 9 0.7 14.2 1.7 21.9 3.5 60.8-13.9 94.5-42.7 32.3-27.5 53.1-59.4 53.1-81.6 0-5.2 0-10.8-0.3-16-0.7-20.8-2.1-52.8 21.5-76.4 28.1-28.1 72.9-30.6 103.9-5.2 0.6 0.3 1 1 1.7 1.7 16.7 16.3 187.5 187.2 189.3 188.9 14.5 14.6 22.9 34.4 22.9 55.3 0 20.8-8 40.2-22.9 54.8-23.7 23.6-56 22.6-77.1 21.6-4.9 0-10.5-0.4-15.7-0.4-20.8 0-45.8 14.6-70.5 41.3-34.3 37.5-55.5 85.8-53.8 107.7 0.7 6.9 2.1 19.1 2.4 20.8 25 101.4-42.7 147.6-50.7 152.8-13.9 8.4-31.6 6.3-42.7-4.8l-112.1-112.2z"
  })
]);
StickyIcon.displayName = "StickyIcon";
const ArticleIcon = () => h$2(a$4, { name: "article" }, () => h$2("path", {
  d: "M853.333 938.667H170.667A42.667 42.667 0 0 1 128 896V128a42.667 42.667 0 0 1 42.667-42.667h682.666A42.667 42.667 0 0 1 896 128v768a42.667 42.667 0 0 1-42.667 42.667zm-42.666-85.334V170.667H213.333v682.666h597.334zM298.667 256h170.666v170.667H298.667V256zm0 256h426.666v85.333H298.667V512zm0 170.667h426.666V768H298.667v-85.333zm256-384h170.666V384H554.667v-85.333z"
}));
ArticleIcon.displayName = "ArticleIcon";
const BookIcon = () => h$2(a$4, { name: "book" }, () => h$2("path", {
  d: "M256 853.333h426.667A85.333 85.333 0 0 0 768 768V256a85.333 85.333 0 0 0-85.333-85.333H469.333a42.667 42.667 0 0 1 0-85.334h213.334A170.667 170.667 0 0 1 853.333 256v512a170.667 170.667 0 0 1-170.666 170.667H213.333A42.667 42.667 0 0 1 170.667 896V128a42.667 42.667 0 0 1 42.666-42.667h128A42.667 42.667 0 0 1 384 128v304.256l61.653-41.088a42.667 42.667 0 0 1 47.36 0l61.654 41.045V256A42.667 42.667 0 0 1 640 256v256a42.667 42.667 0 0 1-66.347 35.499l-104.32-69.547-104.32 69.547A42.667 42.667 0 0 1 298.667 512V170.667H256v682.666z"
}));
BookIcon.displayName = "BookIcon";
const LinkIcon = () => h$2(a$4, { name: "link" }, () => h$2("path", {
  d: "M460.8 584.533c17.067 17.067 17.067 42.667 0 59.734-17.067 17.066-42.667 17.066-59.733 0-85.334-85.334-85.334-217.6 0-302.934L554.667 192C640 110.933 776.533 110.933 857.6 196.267c81.067 81.066 81.067 213.333 0 294.4l-68.267 64c0-34.134-4.266-68.267-17.066-102.4l21.333-21.334c51.2-46.933 55.467-128 4.267-179.2s-128-55.466-179.2-4.266c-4.267 0-4.267 4.266-4.267 4.266L465.067 401.067c-51.2 51.2-51.2 132.266-4.267 183.466m123.733-183.466C601.6 384 627.2 384 644.267 401.067c85.333 85.333 85.333 217.6 0 302.933l-153.6 149.333C405.333 934.4 268.8 934.4 187.733 849.067c-81.066-81.067-81.066-213.334 0-294.4l68.267-64c0 34.133 4.267 72.533 17.067 102.4L251.733 614.4C204.8 665.6 204.8 746.667 256 793.6c51.2 46.933 123.733 46.933 174.933 0l149.334-149.333c51.2-51.2 51.2-128 0-179.2-12.8-17.067-17.067-46.934 4.266-64z"
}));
LinkIcon.displayName = "LinkIcon";
const ProjectIcon = () => h$2(a$4, { name: "project" }, () => h$2("path", {
  d: "M987.456 425.152H864V295.296a36.48 36.48 0 0 0-36.544-36.544h-360l-134.08-128.256A9.344 9.344 0 0 0 327.04 128H36.48A36.48 36.48 0 0 0 0 164.544v676.608a36.48 36.48 0 0 0 36.544 36.544h797.76a36.672 36.672 0 0 0 33.92-22.848L1021.44 475.52a36.48 36.48 0 0 0-33.92-50.304zM82.304 210.304h215.424l136.64 130.752h347.328v84.096H198.848A36.672 36.672 0 0 0 164.928 448L82.304 652.8V210.304zM808.32 795.456H108.544l118.08-292.608h699.904L808.32 795.52z"
}));
ProjectIcon.displayName = "ProjectIcon";
const FriendIcon = () => h$2(a$4, { name: "friend" }, () => h$2("path", {
  d: "M860.16 213.333A268.373 268.373 0 0 0 512 186.027a267.52 267.52 0 0 0-348.16 404.48L428.8 855.893a118.613 118.613 0 0 0 166.4 0l264.96-265.386a267.52 267.52 0 0 0 0-377.174zM800 531.627l-264.96 264.96a32.427 32.427 0 0 1-46.08 0L224 530.347a183.04 183.04 0 0 1 0-256 182.187 182.187 0 0 1 256 0 42.667 42.667 0 0 0 60.587 0 182.187 182.187 0 0 1 256 0 183.04 183.04 0 0 1 3.413 256z"
}));
FriendIcon.displayName = "FriendIcon";
const SlideDownIcon = () => h$2(a$4, { name: "slide-down" }, () => h$2("path", {
  d: "M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z"
}));
SlideDownIcon.displayName = "SlideDownIcon";
var empty_icon = "";
const EmptyIcon = () => h$2("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  class: "empty-icon",
  viewBox: "0 0 1024 1024",
  innerHTML: '<defs><linearGradient id="f" x1="512.342" y1="2266.13" x2="512.342" y2="666.063" gradientUnits="userSpaceOnUse"><stop offset=".919" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="g" x1="528.912" y1="774" x2="388.088" y2="612" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#e6e6e6" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="213.219" y1="721.704" x2="251.313" y2="683.61" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7d7d7"/><stop offset=".485" stop-color="#fafafa"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="i" x1="724.813" y1="821.718" x2="768.656" y2="777.876" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="a" x1="513.493" y1="714.594" x2="471.007" y2="544.188" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#999"/><stop offset="1" stop-color="#ccc"/></linearGradient><linearGradient id="b" x1="440.156" y1="564.031" x2="508.594" y2="495.594" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="l" x1="660.988" y1="754.156" x2="608.637" y2="544.188" xlink:href="#a"/><linearGradient id="m" x1="479.188" y1="774.219" x2="649.782" y2="603.625" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="n" x1="447.121" y1="774.219" x2="394.661" y2="563.813" xlink:href="#a"/><linearGradient id="o" x1="494" y1="597" x2="628" y2="463" xlink:href="#b"/><linearGradient id="d" x1="610.485" y1="604.938" x2="697.298" y2="518.125" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="p" x1="457.438" y1="619.25" x2="353.469" y2="619.25" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="q" x1="542.734" y1="674.25" x2="615.672" y2="601.313" xlink:href="#b"/><linearGradient id="c" x1="627.933" y1="358.938" x2="685.192" y2="422.531" gradientUnits="userSpaceOnUse"><stop offset=".4" stop-color="#e6e6e6" stop-opacity=".4"/><stop offset=".443" stop-color="#fff"/><stop offset=".6" stop-color="#ccc"/></linearGradient><linearGradient id="r" x1="618.547" y1="422.531" x2="681.547" y2="359.531" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="s" x1="625" y1="441.5" x2="697" y2="369.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="t" x1="627.681" y1="361.438" x2="692.257" y2="433.156" xlink:href="#c"/><linearGradient id="u" x1="561.414" y1="735.438" x2="573.149" y2="688.375" xlink:href="#d"/><linearGradient id="v" x1="405" y1="485.875" x2="440" y2="450.875" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".702"/></linearGradient><linearGradient id="w" x1="404.61" y1="486.906" x2="441.86" y2="449.656" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".495" stop-color="#ccc" stop-opacity=".702"/><stop offset=".498" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".302"/></linearGradient><radialGradient id="e" cx="329.297" cy="647.578" r="8.172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafafa"/><stop offset="1.2" stop-color="#e6e6e6"/></radialGradient><radialGradient id="j" cx="802.297" cy="673.578" r="8.172" xlink:href="#e"/><radialGradient id="k" cx="774.844" cy="642.75" r="5.531" xlink:href="#e"/></defs><path d="M512.33 666.07c441.828 0 800 358.18 800 800.03s-358.172 800.02-800 800.02-800-358.18-800-800.02 358.17-800.03 800-800.03z" style="fill:url(#f);fill-rule:evenodd"/><path d="m272 694 242-82 131 119-188 43z" style="fill:url(#g);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M232.391 723.534a2.4 2.4 0 0 1 2.4 2.4v17.725a2.4 2.4 0 0 1-4.8 0v-17.725a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M232.255 676.559c10.33 0 17.067 15.408 18.7 28.493 1.619 12.942-2.372 23.694-18.7 23.694-16.878 0-20.213-10.733-18.7-23.694 1.633-14.061 8.37-28.493 18.7-28.493z" style="fill:url(#h);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M745.853 826h.938a2.4 2.4 0 0 1 2.4 2.4v22.238a2.4 2.4 0 0 1-2.4 2.4h-.938a2.4 2.4 0 0 1-2.4-2.4V828.4a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M746.727 830.3c-19.438 0-23.278-9.326-21.541-20.59a34.467 34.467 0 0 1 3.289-10.369 16.628 16.628 0 0 1 0-9.112c2.889-12.327 12.059-20.911 18.356-20.911 6.56 0 15.468 9.1 18.356 20.911a14.589 14.589 0 0 1-.335 9.217 34.36 34.36 0 0 1 3.419 10.264c1.861 11.243-2.735 20.59-21.544 20.59z" style="fill:url(#i);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M328.841 654.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.109.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M328.383 653.73a6.567 6.567 0 0 0-5.2-5.027q-4.109-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#e);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M801.841 680.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.108.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M801.383 679.73a6.567 6.567 0 0 0-5.2-5.027q-4.108-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#j);fill-rule:evenodd"/><path d="M774.21 646.9a4.446 4.446 0 0 0-3.517-3.4q-2.778-.643-.023-1.383a4.443 4.443 0 0 0 3.4-3.517q.645-2.778 1.383-.023a4.443 4.443 0 0 0 3.517 3.4q2.778.645.023 1.383a4.446 4.446 0 0 0-3.4 3.517q-.645 2.78-1.383.023z" style="fill:url(#k);fill-rule:evenodd"/><path d="m385.6 714.6.158-150.658L598.9 544.174l-.158 150.658z" style="fill:url(#a);fill-rule:evenodd"/><path d="m385.474 564.031 214.763-19.383-36.171-49.067-215.559 17.634z" style="fill:url(#b);fill-rule:evenodd"/><path d="m598.744 694.832.156-150.658 71.975 59.319-.158 150.658z" style="fill:url(#l);fill-rule:evenodd"/><path d="m457.064 774.209.158-150.658 214.691-19.914-.158 150.663z" style="fill:url(#m);fill-rule:evenodd"/><path d="m384.566 714.459.158-150.659 72.5 59.75-.158 150.658z" style="fill:url(#n);fill-rule:evenodd"/><path d="M494 640s75.357-58.4 42-83-38.887 1.663-37 14 53.847 12.465 54-26c.2-49.979 75-125 75-125" style="fill:none;stroke-width:3px;stroke-dasharray:12 6;stroke:url(#o);fill-rule:evenodd"/><path d="m670.275 604.939-72.041-59.9 38.476-26.909 72.86 58.159z" style="fill:url(#d);fill-rule:evenodd"/><path d="m425.5 674.383-72.042-59.9 31.109-50.347 72.86 58.16z" style="fill:url(#p);fill-rule:evenodd"/><path d="m487.918 674.235 214.482-22.57-31.1-50.346-215.309 20.833z" style="fill:url(#q);fill-rule:evenodd"/><path style="fill:#fff;fill-rule:evenodd" d="m697.363 358.927-69.58 62.511-12.035 1.082z"/><path d="m697.363 358.927-69.58 62.511-12.035 1.082z" style="fill:url(#c);fill-rule:evenodd"/><path d="M615.748 422.52 604 413l92.089-53.46" style="fill:url(#r);fill-rule:evenodd"/><path d="m625 432 12 18 60-89" style="fill:url(#s);fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:#fff;fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:url(#t);fill-rule:evenodd"/><path d="m494.814 735.44 21.293-2.1v-6.613l-13.4 1.319v-6.965l10.977-1.08v-6.613l-10.977 1.08v-6.084l12.917-1.27v-6.525l-20.808 2.047v32.8zM521 732.863l7.054-.694v-11.241a106.361 106.361 0 0 0-1.014-11.274l.176-.017 2.645 7.586 4.453 11.553 4.32-.425 4.408-12.424 2.733-8.116.177-.018a111.811 111.811 0 0 0-1.014 11.474v11.241l7.185-.707V697l-8.552.841-5.025 14.646c-.618 1.956-1.147 4.08-1.808 6.173l-.22.022c-.617-1.968-1.146-3.987-1.808-5.818l-5.2-13.639-8.508.837v32.8zm37.213-3.661 7.891-.776v-10.889l3.835-.377c6.922-.681 12.961-4.714 12.961-12.517 0-8.111-5.951-10.082-13.181-9.371l-11.504 1.128v32.8zm7.891-17.881v-9.478l3.218-.316c3.792-.373 5.908.565 5.908 3.871 0 3.218-1.852 5.208-5.687 5.585zM594 725.682l7.891-.777v-26.274l8.905-.876v-6.524l-25.657 2.524v6.524l8.861-.871v26.274zm27.991-2.754 7.847-.772v-11.594l9.919-22.18-8.244.811-2.733 7.542c-.925 2.56-1.807 4.939-2.733 7.587l-.176.018c-.926-2.466-1.764-4.676-2.645-7.058l-2.734-7-8.375.824 9.874 20.233v11.594z" style="fill:url(#u);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M408.938 457.309a17.5 17.5 0 0 0 21.374 26.725 17.5 17.5 0 1 1-16.306-30.955 17.442 17.442 0 0 0-5.068 4.23z"/><circle cx="422.5" cy="468.375" r="17.5" style="fill:url(#v)"/><path fill="#ccc" fill-rule="evenodd" d="M391.76 451.5c-2.358 4.419 9.827 15.52 27.215 24.8 15.131 8.071 29.212 12.1 34.166 10.093-4.191 2.772-18.943-1.24-34.86-9.73-17.388-9.275-29.573-20.376-27.215-24.8a2.96 2.96 0 0 1 1.585-1.3 2.606 2.606 0 0 0-.891.937z"/><path d="M418.975 476.29c-17.388-9.275-29.573-20.376-27.215-24.8s18.363-.484 35.751 8.791 29.572 20.376 27.215 24.8-18.364.483-35.751-8.791zm31.634 5.732c1.824-3.42-8.789-12.642-23.7-20.6s-28.486-11.633-30.31-8.213 8.789 12.642 23.7 20.6 28.486 11.633 30.31 8.213zm-36.645-29.008-2.775 1.452.032 1.751 28.637 14.183.266-4.559z" style="fill:url(#w);fill-rule:evenodd"/><g class="people"><path style="fill:#f8cfad;fill-rule:evenodd" d="m612.131 676.5 1.362 3.532 3.255-2.324-1.361-3.532zM629.131 665.5l1.362 3.532 3.255-2.324-1.361-3.532z"/><path style="fill:#141a33;fill-rule:evenodd" d="m617.764 678.184-3.162-.078a11.028 11.028 0 0 0-1.034 3.454c-.258 2.006-1.177 5-.449 5.367 1.5 2.659 4.118-.215 4.118-.215s2.187-2.848 1.925-5.265c-.106-.973-1.181-1.869-1.398-3.263zM633.781 665.855l3.019.945a11.008 11.008 0 0 1-.137 3.6c-.4 1.981-.179 4.166-.986 4.277-2.283 2.03-3.827-1.533-3.827-1.533s-1.473-2.456-.444-4.659c.412-.88 1.718-1.385 2.375-2.63z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M599.935 592.534s10.293 9.761 11.95 7.564 3.536-3.463-6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M611.3 596.361c1.674-1.105 11.5 7.048 14.5 11.774s-12.705-4.36-14.632-6.776-1.54-3.893.132-4.998z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M621.815 607.988s1.809 2.549 2.433 1.756 2.475-1.064 2.449-1.138.1-.819 1.288-2.331-3.8-3.632-5.81-.494a2.556 2.556 0 0 0-.36 2.207z"/><path fill="#232c57" fill-rule="evenodd" d="M598 617s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s12.666 11.836 16 19c0 0-4.753-1.629-4 2 0 0-18.132-14.647-19-19s-9.148-18.716-12-31z"/><path d="M589 622s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s4.666 17.836 8 25c0 0-4.753-1.629-4 2 0 0-10.132-20.647-11-25s-9.148-18.716-12-31z" style="fill:#292966;fill-rule:evenodd"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M585.626 597.7s-10.292 9.761-11.95 7.563-3.536-3.463 6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M574.259 601.529c-1.675-1.105-11.5 7.049-14.5 11.774s12.7-4.36 14.631-6.775 1.543-3.894-.131-4.999z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M591.715 577.752s-.606 1.681 1.48 3.716-3.615 5.307-4.645 2.85-.48-2.716-.48-2.716z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M583.527 574.123c-.839 1.043.491 3.873 1.453 5.449s2.749 2.833 3.364 2.428 4.088-2.657 4-4-.228-3.4-.228-3.4 2.562-1.641 2.154-2.916-2.916-.154-2.916-.154a15.853 15.853 0 0 0-.227-2.224c-.189-.929-6.887-1.445-7.827 2.6s.558 1.805.227 2.217z"/><path fill="#232c57" fill-rule="evenodd" d="M584.227 567.758c2.1-.885 7.2-3.684 10.125.318s.842 4.385.989 5.294-1.894 5.69-1.341 6.63-3.865.8-4.657-1.179-2.844-.539-2.227-1.224-1.3-4.456-2.916-2.154a9.252 9.252 0 0 0 .309-1.38c-.115.192.259-3.257-.673-1.32s-2.1 1.037-3.069.762-1.8-1.118-1.071-1.689c.023-.016 2.436-3.172 4.531-4.058z"/><path d="M589 585c-2.584-.47-10.055.362-13 13 0 0 1.9 3.349 5 4s6 21 6 21 24.016 11.06 27-3c-.07-13.826-8-21-8-21s5.829-3.2 5-6-8.016-10.153-11-10-6 0-6 0-2.416 2.47-5 2z" style="fill:#f6bb07;fill-rule:evenodd"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M563.284 612.581s-.986 2.965-1.814 2.389-2.678-.3-2.675-.374-.333-.755-1.912-1.854 2.577-4.583 5.414-2.167a2.551 2.551 0 0 1 .987 2.006z"/></g>'
});
EmptyIcon.displayName = "EmptyIcon";
const LockIcon = () => h$2(a$4, { name: "lock" }, () => h$2("path", {
  d: "M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"
}));
LockIcon.displayName = "LockIcon";
var articleItem = "";
var ArticleItem = defineComponent({
  name: "ArticleItem",
  props: {
    info: {
      type: Object,
      required: true
    },
    path: { type: String, required: true }
  },
  setup(props) {
    const info = toRef(props, "info");
    const { config, items } = useArticleInfo(info);
    return () => h$2("article", {
      class: "article",
      vocab: "https://schema.org/",
      typeof: "Article"
    }, [
      info.value.sticky ? h$2(StickyIcon) : null,
      h$2("header", { class: "title" }, h$2(RouterLink, {
        to: props.path
      }, () => [
        info.value.isEncrypted ? h$2(LockIcon) : null,
        info.value.type === "slide" ? h$2(SlideIcon) : null,
        h$2("span", { property: "headline" }, info.value.title),
        info.value.cover ? h$2("meta", {
          property: "image",
          content: withBase(info.value.cover)
        }) : null
      ])),
      info.value.excerpt ? h$2("div", { class: "excerpt", innerHTML: info.value.excerpt }) : null,
      h$2("hr", { class: "hr" }),
      h$2(PageInfo, {
        config: unref(config),
        ...items.value ? { items: items.value } : {}
      })
    ]);
  }
});
var pagination = "";
var Pagination = defineComponent({
  name: "Pagination",
  props: {
    total: { type: Number, default: 10 },
    perPage: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 }
  },
  emits: ["updateCurrentPage"],
  setup(props, { emit: emit2 }) {
    const themeLocale = useThemeLocaleData();
    const input = ref("");
    const locale = computed(() => themeLocale.value.paginationLocales);
    const totalPages = computed(() => Math.ceil(props.total / props.perPage));
    const enable = computed(() => Boolean(totalPages.value) && totalPages.value !== 1);
    const displayLeftEllipsis = computed(() => {
      if (totalPages.value < 7)
        return false;
      return props.currentPage > 4;
    });
    const displayRightEllipsis = computed(() => {
      if (totalPages.value < 7)
        return false;
      return props.currentPage < totalPages.value - 3;
    });
    const indexs = computed(() => {
      const { currentPage } = props;
      let min = 1;
      let max = totalPages.value;
      const arr = [];
      if (totalPages.value >= 7) {
        if (currentPage <= 4 && currentPage < totalPages.value - 3) {
          min = 1;
          max = 5;
        } else if (currentPage > 4 && currentPage >= totalPages.value - 3) {
          max = totalPages.value;
          min = totalPages.value - 4;
        } else if (totalPages.value > 7) {
          min = currentPage - 2;
          max = currentPage + 2;
        }
      }
      for (let i2 = min; i2 <= max; i2++)
        arr.push(i2);
      return arr;
    });
    const navigate = (page2) => emit2("updateCurrentPage", page2);
    const jumpPage = (index2) => {
      const pageNum = parseInt(index2);
      if (pageNum <= totalPages.value && pageNum > 0)
        navigate(pageNum);
      else
        alert(locale.value.errorText.replace(/\$page/g, totalPages.value.toString()));
    };
    return () => h$2("div", { class: "pagination-wrapper" }, enable.value ? h$2("div", { class: "pagination-list" }, [
      h$2("div", { class: "page-number" }, [
        props.currentPage > 1 ? h$2("div", {
          class: "prev",
          role: "navigation",
          unselectable: "on",
          onClick: () => navigate(props.currentPage - 1)
        }, locale.value.prev) : null,
        ...displayLeftEllipsis.value ? [
          h$2("div", {
            role: "navigation",
            onClick: () => navigate(1)
          }, 1),
          h$2("div", { class: "ellipsis" }, "...")
        ] : [],
        ...indexs.value.map((num) => h$2("div", {
          key: num,
          class: { active: props.currentPage === num },
          role: "navigation",
          onClick: () => navigate(num)
        }, num)),
        ...displayRightEllipsis.value ? [
          h$2("div", { class: "ellipsis" }, "..."),
          h$2("div", {
            role: "navigation",
            onClick: () => navigate(totalPages.value)
          }, totalPages.value)
        ] : [],
        props.currentPage < totalPages.value ? h$2("div", {
          class: "next",
          role: "navigation",
          unselectable: "on",
          onClick: () => navigate(props.currentPage + 1)
        }, locale.value.next) : null
      ]),
      h$2("div", { class: "navigate-wrapper" }, [
        h$2("label", { for: "navigation-text" }, `${locale.value.navigate}: `),
        h$2("input", {
          id: "navigation-text",
          value: input.value,
          onInput: ({ target }) => {
            input.value = target.value;
          },
          onKeydown: (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              jumpPage(input.value);
            }
          }
        }),
        h$2("button", {
          class: "navigate",
          role: "navigation",
          title: locale.value.action,
          onClick: () => jumpPage(input.value)
        }, locale.value.action)
      ])
    ]) : []);
  }
});
var articleList = "";
var ArticleList = defineComponent({
  name: "ArticleList",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const blogOptions = useBlogOptions();
    const currentPage = ref(1);
    const articlePerPage = computed(() => blogOptions.value.articlePerPage || 10);
    const currentArticles = computed(() => props.items.slice((currentPage.value - 1) * articlePerPage.value, currentPage.value * articlePerPage.value));
    const updatePage = (page2) => {
      currentPage.value = page2;
      const query = { ...route.query };
      if (query["page"] === page2.toString() || page2 === 1 && !query["page"])
        return;
      if (page2 === 1)
        delete query["page"];
      else
        query["page"] = page2.toString();
      void router.push({ path: route.path, query });
    };
    watch(currentPage, () => {
      const distance = document.querySelector("#article-list").getBoundingClientRect().top + window.scrollY;
      setTimeout(() => {
        window.scrollTo(0, distance);
      }, 100);
    });
    onMounted(() => {
      const { page: page2 } = route.query;
      updatePage(page2 ? Number(page2) : 1);
    });
    return () => h$2("div", { id: "article-list", class: "article-wrapper" }, currentArticles.value.length ? [
      ...currentArticles.value.map(({ info, path }, index2) => h$2(DropTransition, { appear: true, delay: index2 * 0.04 }, () => h$2(ArticleItem, { key: path, info, path }))),
      h$2(Pagination, {
        currentPage: currentPage.value,
        perPage: articlePerPage.value,
        total: props.items.length,
        onUpdateCurrentPage: updatePage
      })
    ] : h$2(EmptyIcon));
  }
});
var defaultHeroBgImagePath = "/assets/hero.197a9d2d.jpg";
var blogHero = "";
var BlogHero = defineComponent({
  name: "BlogHero",
  setup(_props, { slots }) {
    const title = usePageHeadTitle();
    const frontmatter = usePageFrontmatter();
    const hero = ref(null);
    const heroImage = computed(() => frontmatter.value.heroImage || null);
    const isFullScreen = computed(() => frontmatter.value.heroFullScreen || false);
    const heroImageStyle = computed(() => {
      const defaultStyle = {
        maxHeight: "180px",
        margin: frontmatter.value.heroText === false ? "6rem auto 1.5rem" : "1rem auto"
      };
      return {
        ...defaultStyle,
        ...frontmatter.value.heroImageStyle
      };
    });
    const bgImage = computed(() => {
      var _a2;
      return frontmatter.value.bgImage ? withBase(frontmatter.value.bgImage) : (_a2 = frontmatter.value.bgImage) != null ? _a2 : defaultHeroBgImagePath;
    });
    const bgImageStyle = computed(() => {
      const defaultStyle = {
        height: "350px",
        textAlign: "center",
        overflow: "hidden"
      };
      return {
        ...defaultStyle,
        ...frontmatter.value.bgImageStyle
      };
    });
    return () => {
      var _a2;
      return frontmatter.value.hero !== false ? h$2("div", {
        ref: hero,
        class: ["blog-hero", { fullscreen: isFullScreen.value }],
        style: bgImageStyle.value
      }, [
        bgImage.value ? h$2("div", {
          class: "mask",
          style: {
            background: `url(${bgImage.value}) center/cover no-repeat`
          }
        }) : null,
        ((_a2 = slots["heroImage"]) == null ? void 0 : _a2.call(slots)) || h$2(DropTransition, { appear: true, delay: 0.04 }, () => heroImage.value ? h$2("img", {
          class: "hero-image",
          style: heroImageStyle.value,
          src: withBase(heroImage.value),
          alt: frontmatter.value.heroAlt || "hero image"
        }) : null),
        h$2(DropTransition, { appear: true, delay: 0.08 }, () => frontmatter.value.heroText !== false ? h$2("h1", frontmatter.value.heroText || title.value) : null),
        h$2(DropTransition, { appear: true, delay: 0.12 }, () => frontmatter.value.tagline ? h$2("p", {
          class: "description",
          innerHTML: frontmatter.value.tagline
        }) : null),
        isFullScreen.value ? h$2("button", {
          class: "slide-down-button",
          onClick: () => {
            window.scrollTo({
              top: hero.value.clientHeight,
              behavior: "smooth"
            });
          }
        }, [h$2(SlideDownIcon), h$2(SlideDownIcon)]) : null
      ]) : null;
    };
  }
});
var categoryList = "";
var CategoryList = defineComponent({
  name: "CategoryList",
  setup() {
    const route = useRoute();
    const categoryMap2 = useCategoryMap();
    return () => h$2("ul", { class: "category-list-wrapper" }, Object.entries(categoryMap2.value.map).map(([category2, { path, items }]) => h$2("li", {
      class: [
        "category",
        `category${D(category2, 9)}`,
        { active: path === route.path }
      ]
    }, h$2(RouterLink, { to: path }, () => [
      category2,
      h$2("span", { class: "category-num" }, items.length)
    ]))));
  }
});
var tagList = "";
var TagList = defineComponent({
  name: "TagList",
  setup() {
    const frontmatter = usePageFrontmatter();
    const tagMap = useTagMap();
    const tagList2 = computed(() => Object.entries(tagMap.value.map).map(([name, { path }]) => ({
      name,
      path
    })));
    const isActive = (name) => {
      var _a2;
      return name === ((_a2 = frontmatter.value.blog) == null ? void 0 : _a2.name);
    };
    return () => h$2("ul", { class: "tag-list-wrapper" }, tagList2.value.map(({ name, path }) => h$2("li", {
      class: [
        "tag",
        `tag${D(name, 9)}`,
        { active: isActive(name) }
      ]
    }, h$2(RouterLink, { to: path }, () => h$2("div", { class: "tag-name" }, name)))));
  }
});
var timelineList = "";
var TimelineList = defineComponent({
  name: "TimelineList",
  setup() {
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();
    const navigate = useNavigate();
    const hint = computed(() => themeLocale.value.blogLocales.timeline);
    return () => h$2("div", { class: "timeline-list-wrapper" }, [
      h$2("div", {
        class: "timeline-list-title",
        onClick: () => navigate(timelines.value.path)
      }, [
        h$2(TimelineIcon),
        h$2("span", { class: "num" }, timelines.value.items.length),
        hint.value
      ]),
      h$2("hr"),
      h$2("div", { class: "timeline-content" }, h$2("ul", { class: "timeline-list" }, timelines.value.config.map(({ year, items }, index2) => h$2(DropTransition, { appear: true, delay: 0.08 * (index2 + 1) }, () => h$2("li", [
        h$2("h3", { class: "timeline-year" }, year),
        h$2("ul", { class: "timeline-year-wrapper" }, items.map(({ date, info, path }) => h$2("li", { class: "timeline-item" }, [
          h$2("span", { class: "timeline-date" }, date),
          h$2(RouterLink, {
            class: "timeline-title",
            to: path
          }, () => info.title)
        ])))
      ])))))
    ]);
  }
});
var infoList = "";
var InfoList = defineComponent({
  name: "InfoList",
  setup() {
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap2 = useCategoryMap();
    const categoryNumber = computed(() => Object.keys(categoryMap2.value.map).length);
    const stars = useStars();
    const tagMap = useTagMap();
    const tagNumber = computed(() => Object.keys(tagMap.value.map).length);
    const navigate = useNavigate();
    const active = ref("article");
    const locale = computed(() => themeLocale.value.blogLocales);
    const buttons = [
      ["article", ArticleIcon],
      ["category", CategoryIcon],
      ["tag", TagIcon],
      ["timeline", TimelineIcon]
    ];
    return () => h$2("div", { class: "blog-info-list" }, [
      h$2("div", { class: "blog-type-wrapper" }, buttons.map(([key, icon]) => h$2("button", {
        class: "blog-type-button",
        onClick: () => {
          active.value = key;
        }
      }, h$2("div", {
        class: ["icon-wapper", { active: active.value === key }],
        "aria-label": locale.value[key],
        "data-balloon-pos": "up"
      }, h$2(icon))))),
      active.value === "article" ? h$2(DropTransition, () => [
        h$2("div", { class: "sticky-article-wrapper" }, [
          h$2("div", {
            class: "title",
            onClick: () => navigate(articles.value.path)
          }, [
            h$2(ArticleIcon),
            h$2("span", { class: "num" }, articles.value.items.length),
            locale.value.article
          ]),
          h$2("hr"),
          h$2("ul", { class: "sticky-article-list" }, stars.value.items.map(({ info, path }, index2) => h$2(DropTransition, { appear: true, delay: 0.08 * (index2 + 1) }, () => h$2("li", {
            class: "sticky-article",
            onClick: () => navigate(path)
          }, info.title))))
        ])
      ]) : null,
      active.value === "category" ? h$2(DropTransition, () => [
        h$2("div", { class: "category-wrapper" }, [
          categoryNumber.value ? h$2("div", {
            class: "title",
            onClick: () => navigate(categoryMap2.value.path)
          }, [
            h$2(CategoryIcon),
            h$2("span", { class: "num" }, categoryNumber.value),
            locale.value.category
          ]) : null,
          h$2("hr"),
          h$2(DropTransition, { delay: 0.04 }, () => h$2(CategoryList))
        ])
      ]) : null,
      active.value === "tag" ? h$2(DropTransition, () => [
        h$2("div", { class: "tag-wrapper" }, [
          tagNumber.value ? h$2("div", {
            class: "title",
            onClick: () => navigate(tagMap.value.path)
          }, [
            h$2(TagIcon),
            h$2("span", { class: "num" }, tagNumber.value),
            locale.value.tag
          ]) : null,
          h$2("hr"),
          h$2(DropTransition, { delay: 0.04 }, () => h$2(TagList))
        ])
      ]) : null,
      active.value === "timeline" ? h$2(DropTransition, () => h$2(TimelineList)) : null
    ]);
  }
});
var infoPanel = "";
const InfoPanel = () => h$2("aside", { class: "blog-info-wrapper" }, [
  h$2(DropTransition, () => h$2(BloggerInfo)),
  h$2(DropTransition, { delay: 0.04 }, () => h$2(InfoList))
]);
InfoPanel.displayName = "InfoPanel";
var projectPanel = "";
const AVAILABLE_PROJECT_TYPES = [
  "link",
  "article",
  "book",
  "project",
  "friend"
];
var ProjectPanel = defineComponent({
  name: "ProjectPanel",
  components: { ArticleIcon, BookIcon, FriendIcon, LinkIcon, ProjectIcon },
  setup() {
    const frontmatter = usePageFrontmatter();
    const pure = usePure();
    const navigate = useNavigate();
    const renderIcon = (icon = "", alt = "icon") => {
      if (AVAILABLE_PROJECT_TYPES.includes(icon))
        return h$2(resolveComponent(`${icon}-icon`));
      if (icon.match(/^https?:\/\//))
        return h$2("img", { src: icon, alt, class: "image" });
      if (icon.startsWith("/"))
        return h$2("img", { src: withBase(icon), alt, class: "image" });
      return h$2(resolveComponent("FontIcon"), { icon });
    };
    return () => {
      var _a2;
      return ((_a2 = frontmatter.value.projects) == null ? void 0 : _a2.length) ? h$2("div", { class: "project-panel" }, frontmatter.value.projects.map(({ icon, link, name, desc }, index2) => h$2("div", {
        class: [
          "project",
          { [`project${index2 % 9}`]: !pure.value }
        ],
        onClick: () => navigate(link)
      }, [
        renderIcon(icon, name),
        h$2("div", { class: "name" }, name),
        h$2("div", { class: "desc" }, desc)
      ]))) : null;
    };
  }
});
var home = "";
var BlogHome = defineComponent({
  name: "BlogHome",
  setup() {
    const articles = useArticles();
    return () => h$2("div", { class: "page blog" }, [
      h$2(BlogHero),
      h$2("div", { class: "blog-page-wrapper" }, [
        h$2("main", { class: "blog-home", id: "main-content" }, [
          h$2(DropTransition, { appear: true, delay: 0.16 }, () => h$2(ProjectPanel)),
          h$2(DropTransition, { appear: true, delay: 0.24 }, () => h$2(ArticleList, { items: articles.value.items }))
        ]),
        h$2(DropTransition, { appear: true, delay: 0.16 }, () => h$2(InfoPanel))
      ]),
      h$2(DropTransition, { appear: true, delay: 0.28 }, () => h$2(MarkdownContent))
    ]);
  }
});
var articleType = "";
var ArticleType = defineComponent({
  name: "ArticleType",
  setup() {
    const themeLocale = useThemeLocaleData();
    const route = useRoute();
    const articles = useArticles();
    const encryptedArticles = useEncryptedArticles();
    const slides = useSlides();
    const stars = useStars();
    const types = computed(() => {
      const locale = themeLocale.value.blogLocales;
      return [
        {
          text: locale.all,
          path: articles.value.path
        },
        { text: locale.star, path: stars.value.path },
        { text: locale.slides, path: slides.value.path },
        { text: locale.encrypt, path: encryptedArticles.value.path }
      ];
    });
    return () => h$2("ul", { class: "article-type-wrapper" }, types.value.map((type) => h$2("li", {
      class: ["article-type", { active: type.path === route.path }]
    }, h$2(RouterLink, { to: type.path }, () => type.text))));
  }
});
var timelineItems = "";
var TimelineItems = defineComponent({
  name: "TimelineItems",
  setup() {
    const blogOptions = useBlogOptions();
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();
    const hint = computed(() => blogOptions.value.timeline || themeLocale.value.blogLocales.timelineTitle);
    const items = computed(() => timelines.value.config.map(({ year }) => ({
      title: year.toString(),
      level: 2,
      slug: year.toString(),
      children: []
    })));
    return () => h$2("div", { class: "timeline-wrapper" }, h$2("ul", { class: "timeline-content" }, [
      h$2(DropTransition, () => h$2("li", { class: "motto" }, hint.value)),
      h$2(TOC, { items: items.value }),
      ...timelines.value.config.map(({ year, items: items2 }, index2) => h$2(DropTransition, { appear: true, delay: 0.08 * (index2 + 1), type: "group" }, () => [
        h$2("h3", { key: "title", id: year, class: "timeline-year-title" }, h$2("span", year)),
        h$2("li", { key: "content", class: "timeline-year-list" }, [
          h$2("ul", { class: "timeline-year-wrapper" }, items2.map(({ date, info, path }) => h$2("li", { class: "timeline-item" }, [
            h$2("span", { class: "timeline-date" }, date),
            h$2(RouterLink, {
              class: "timeline-title",
              to: path
            }, () => info.title)
          ])))
        ])
      ]))
    ]));
  }
});
var page = "";
var BlogPage = defineComponent({
  name: "BlogPage",
  components: {
    ArticleType,
    CategoryList,
    TagList
  },
  setup() {
    const frontmatter = usePageFrontmatter();
    const route = useRoute();
    const articles = useArticles();
    const categoryMap2 = useCategoryMap();
    const encryptedArticles = useEncryptedArticles();
    const slides = useSlides();
    const stars = useStars();
    const tagMap = useTagMap();
    const componentName = computed(() => {
      const { key } = frontmatter.value.blog || {};
      return key === "category" ? "CategoryList" : key === "tag" ? "TagList" : key === "timeline" ? "" : "ArticleType";
    });
    const items = computed(() => {
      const { name = "", key = "" } = frontmatter.value.blog || {};
      return key === "encrypted" ? encryptedArticles.value.items : key === "star" ? stars.value.items : key === "slide" ? slides.value.items : key === "timeline" ? [] : key === "category" ? name ? categoryMap2.value.map[name].items : [] : key === "tag" ? name ? tagMap.value.map[name].items : [] : articles.value.items;
    });
    return () => h$2("main", { class: "blog-page" }, [
      h$2(DropTransition, () => componentName.value ? h$2(resolveComponent(componentName.value)) : null),
      h$2(DropTransition, { appear: true, delay: 0.24 }, () => {
        var _a2;
        return ((_a2 = frontmatter.value.blog) == null ? void 0 : _a2.key) === "timeline" ? h$2(TimelineItems) : h$2(ArticleList, { key: route.path, items: items.value });
      })
    ]);
  }
});
var layout = "";
var passwordModal = "";
var PasswordModal = defineComponent({
  name: "PasswordModal",
  props: {
    full: Boolean
  },
  emits: ["verify"],
  setup(props, { emit: emit2 }) {
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const password = ref("");
    const hasTried = ref(false);
    const remember = ref(false);
    const locale = computed(() => themeLocale.value.encryptLocales);
    let hintHandler = null;
    const verify = () => {
      if (hintHandler)
        clearTimeout(hintHandler);
      hasTried.value = false;
      emit2("verify", password.value, remember.value);
      void nextTick().then(() => {
        hasTried.value = true;
        hintHandler = setTimeout(() => {
          hasTried.value = false;
        }, 1e3);
      });
    };
    return () => h$2("div", {
      class: [
        "password-layer",
        { expand: props.full || frontmatter.value["home"] }
      ]
    }, h$2("div", { class: "password-modal" }, [
      h$2("div", { class: ["hint", { tried: hasTried.value }] }, hasTried.value ? locale.value.errorHint : h$2(LockIcon, { "aria-label": locale.value.iconLabel })),
      h$2("div", { class: "password" }, [
        h$2("input", {
          type: "password",
          value: password.value,
          placeholder: locale.value.placeholder,
          onInput: ({ target }) => {
            password.value = target.value;
          },
          onKeydown: ({ key }) => {
            if (key === "Enter")
              verify();
          }
        })
      ]),
      h$2("div", { class: "remember-password" }, [
        h$2("input", {
          type: "checkbox",
          value: remember.value,
          onChange: () => remember.value = !remember.value
        }),
        h$2("span", locale.value.remember)
      ]),
      h$2("button", { class: "submit", onClick: () => verify() }, "OK")
    ]));
  }
});
const r = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), t = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, -1, -1, -1, -1, -1], e = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], n = [3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946, 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055, 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504, 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462], o = [1332899944, 1700884034, 1701343084, 1684370003, 1668446532, 1869963892], s = (t2, e2) => {
  if (e2 <= 0 || e2 > t2.length)
    throw Error(`Illegal len: ${e2}`);
  let n2, o2, s2 = 0;
  const l2 = [];
  for (; s2 < e2; ) {
    if (n2 = 255 & t2[s2++], l2.push(r[n2 >> 2 & 63]), n2 = (3 & n2) << 4, s2 >= e2) {
      l2.push(r[63 & n2]);
      break;
    }
    if (o2 = 255 & t2[s2++], n2 |= o2 >> 4 & 15, l2.push(r[63 & n2]), n2 = (15 & o2) << 2, s2 >= e2) {
      l2.push(r[63 & n2]);
      break;
    }
    o2 = 255 & t2[s2++], n2 |= o2 >> 6 & 3, l2.push(r[63 & n2]), l2.push(r[63 & o2]);
  }
  return l2.join("");
}, l = (r2, e2) => {
  if (e2 <= 0)
    throw Error(`Illegal len: ${e2}`);
  const n2 = r2.length;
  let o2, s2, l2, f2, i2, u2, h2 = 0, p2 = 0;
  const a2 = [];
  for (; h2 < n2 - 1 && p2 < e2 && (u2 = r2.charCodeAt(h2++), o2 = u2 < t.length ? t[u2] : -1, u2 = r2.charCodeAt(h2++), s2 = u2 < t.length ? t[u2] : -1, -1 != o2 && -1 != s2) && (i2 = o2 << 2 >>> 0, i2 |= (48 & s2) >> 4, a2.push(String.fromCharCode(i2)), !(++p2 >= e2 || h2 >= n2)) && (u2 = r2.charCodeAt(h2++), l2 = u2 < t.length ? t[u2] : -1, -1 != l2) && (i2 = (15 & s2) << 4 >>> 0, i2 |= (60 & l2) >> 2, a2.push(String.fromCharCode(i2)), !(++p2 >= e2 || h2 >= n2)); )
    u2 = r2.charCodeAt(h2++), f2 = u2 < t.length ? t[u2] : -1, i2 = (3 & l2) << 6 >>> 0, i2 |= f2, a2.push(String.fromCharCode(i2)), ++p2;
  return a2.map((r3) => r3.charCodeAt(0));
}, f = "undefined" != typeof process && process && "function" == typeof process.nextTick ? "function" == typeof setImmediate ? setImmediate : process.nextTick : setTimeout, i = (r2, t2, e2, n2) => {
  let o2, s2 = r2[t2], l2 = r2[t2 + 1];
  return s2 ^= e2[0], o2 = n2[s2 >>> 24], o2 += n2[256 | s2 >> 16 & 255], o2 ^= n2[512 | s2 >> 8 & 255], o2 += n2[768 | 255 & s2], l2 ^= o2 ^ e2[1], o2 = n2[l2 >>> 24], o2 += n2[256 | l2 >> 16 & 255], o2 ^= n2[512 | l2 >> 8 & 255], o2 += n2[768 | 255 & l2], s2 ^= o2 ^ e2[2], o2 = n2[s2 >>> 24], o2 += n2[256 | s2 >> 16 & 255], o2 ^= n2[512 | s2 >> 8 & 255], o2 += n2[768 | 255 & s2], l2 ^= o2 ^ e2[3], o2 = n2[l2 >>> 24], o2 += n2[256 | l2 >> 16 & 255], o2 ^= n2[512 | l2 >> 8 & 255], o2 += n2[768 | 255 & l2], s2 ^= o2 ^ e2[4], o2 = n2[s2 >>> 24], o2 += n2[256 | s2 >> 16 & 255], o2 ^= n2[512 | s2 >> 8 & 255], o2 += n2[768 | 255 & s2], l2 ^= o2 ^ e2[5], o2 = n2[l2 >>> 24], o2 += n2[256 | l2 >> 16 & 255], o2 ^= n2[512 | l2 >> 8 & 255], o2 += n2[768 | 255 & l2], s2 ^= o2 ^ e2[6], o2 = n2[s2 >>> 24], o2 += n2[256 | s2 >> 16 & 255], o2 ^= n2[512 | s2 >> 8 & 255], o2 += n2[768 | 255 & s2], l2 ^= o2 ^ e2[7], o2 = n2[l2 >>> 24], o2 += n2[256 | l2 >> 16 & 255], o2 ^= n2[512 | l2 >> 8 & 255], o2 += n2[768 | 255 & l2], s2 ^= o2 ^ e2[8], o2 = n2[s2 >>> 24], o2 += n2[256 | s2 >> 16 & 255], o2 ^= n2[512 | s2 >> 8 & 255], o2 += n2[768 | 255 & s2], l2 ^= o2 ^ e2[9], o2 = n2[l2 >>> 24], o2 += n2[256 | l2 >> 16 & 255], o2 ^= n2[512 | l2 >> 8 & 255], o2 += n2[768 | 255 & l2], s2 ^= o2 ^ e2[10], o2 = n2[s2 >>> 24], o2 += n2[256 | s2 >> 16 & 255], o2 ^= n2[512 | s2 >> 8 & 255], o2 += n2[768 | 255 & s2], l2 ^= o2 ^ e2[11], o2 = n2[l2 >>> 24], o2 += n2[256 | l2 >> 16 & 255], o2 ^= n2[512 | l2 >> 8 & 255], o2 += n2[768 | 255 & l2], s2 ^= o2 ^ e2[12], o2 = n2[s2 >>> 24], o2 += n2[256 | s2 >> 16 & 255], o2 ^= n2[512 | s2 >> 8 & 255], o2 += n2[768 | 255 & s2], l2 ^= o2 ^ e2[13], o2 = n2[l2 >>> 24], o2 += n2[256 | l2 >> 16 & 255], o2 ^= n2[512 | l2 >> 8 & 255], o2 += n2[768 | 255 & l2], s2 ^= o2 ^ e2[14], o2 = n2[s2 >>> 24], o2 += n2[256 | s2 >> 16 & 255], o2 ^= n2[512 | s2 >> 8 & 255], o2 += n2[768 | 255 & s2], l2 ^= o2 ^ e2[15], o2 = n2[l2 >>> 24], o2 += n2[256 | l2 >> 16 & 255], o2 ^= n2[512 | l2 >> 8 & 255], o2 += n2[768 | 255 & l2], s2 ^= o2 ^ e2[16], r2[t2] = l2 ^ e2[17], r2[t2 + 1] = s2, r2;
}, u = (r2, t2) => {
  let e2 = 0;
  for (let n2 = 0; n2 < 4; ++n2)
    e2 = e2 << 8 | 255 & r2[t2], t2 = (t2 + 1) % r2.length;
  return { key: e2, offp: t2 };
}, h = (r2, t2, e2) => {
  const n2 = t2.length, o2 = e2.length;
  let s2, l2 = 0, f2 = [0, 0];
  for (let e3 = 0; e3 < n2; e3++)
    s2 = u(r2, l2), l2 = s2.offp, t2[e3] = t2[e3] ^ s2.key;
  for (let r3 = 0; r3 < n2; r3 += 2)
    f2 = i(f2, 0, t2, e2), t2[r3] = f2[0], t2[r3 + 1] = f2[1];
  for (let r3 = 0; r3 < o2; r3 += 2)
    f2 = i(f2, 0, t2, e2), e2[r3] = f2[0], e2[r3 + 1] = f2[1];
}, p = (r2, t2, s2, l2, p2) => {
  const a2 = o.slice(), g = a2.length;
  if (s2 < 4 || s2 > 31) {
    const r3 = new Error(`Illegal number of rounds (4-31): ${s2}`);
    if (false === l2)
      return Promise.reject(r3);
    throw r3;
  }
  if (16 !== t2.length) {
    const r3 = new Error(`Illegal salt length: ${t2.length} != 16`);
    if (false === l2)
      return Promise.reject(r3);
    throw r3;
  }
  let c2, y2;
  s2 = 1 << s2 >>> 0;
  let m2, w2 = 0;
  Int32Array ? (c2 = new Int32Array(e), y2 = new Int32Array(n)) : (c2 = e.slice(), y2 = n.slice()), ((r3, t3, e2, n2) => {
    const o2 = e2.length, s3 = n2.length;
    let l3, f2 = 0, h2 = [0, 0];
    for (let r4 = 0; r4 < o2; r4++)
      l3 = u(t3, f2), f2 = l3.offp, e2[r4] = e2[r4] ^ l3.key;
    f2 = 0;
    for (let t4 = 0; t4 < o2; t4 += 2)
      l3 = u(r3, f2), f2 = l3.offp, h2[0] ^= l3.key, l3 = u(r3, f2), f2 = l3.offp, h2[1] ^= l3.key, h2 = i(h2, 0, e2, n2), e2[t4] = h2[0], e2[t4 + 1] = h2[1];
    for (let t4 = 0; t4 < s3; t4 += 2)
      l3 = u(r3, f2), f2 = l3.offp, h2[0] ^= l3.key, l3 = u(r3, f2), f2 = l3.offp, h2[1] ^= l3.key, h2 = i(h2, 0, e2, n2), n2[t4] = h2[0], n2[t4 + 1] = h2[1];
  })(t2, r2, c2, y2);
  const d2 = () => {
    if (p2 && p2(w2 / s2), !(w2 < s2)) {
      for (w2 = 0; w2 < 64; w2++)
        for (m2 = 0; m2 < g >> 1; m2++)
          i(a2, m2 << 1, c2, y2);
      const r3 = [];
      for (w2 = 0; w2 < g; w2++)
        r3.push((a2[w2] >> 24 & 255) >>> 0), r3.push((a2[w2] >> 16 & 255) >>> 0), r3.push((a2[w2] >> 8 & 255) >>> 0), r3.push((255 & a2[w2]) >>> 0);
      return false === l2 ? Promise.resolve(r3) : r3;
    }
    {
      const e2 = Date.now();
      for (; w2 < s2 && (w2 += 1, h(r2, c2, y2), h(t2, c2, y2), !(Date.now() - e2 > 100)); )
        ;
    }
    if (false === l2)
      return new Promise((r3) => f(() => {
        d2().then(r3);
      }));
  };
  if (false === l2)
    return d2();
  {
    let r3;
    for (; ; )
      if (void 0 !== (r3 = d2()))
        return r3 || [];
  }
}, a = (r2 = 10) => {
  if ("number" != typeof r2)
    throw Error("Illegal arguments: " + typeof r2);
  r2 < 4 ? r2 = 4 : r2 > 31 && (r2 = 31);
  const t2 = [];
  return t2.push("$2a$"), r2 < 10 && t2.push("0"), t2.push(r2.toString()), t2.push("$"), t2.push(s(((r3) => {
    if ("undefined" != typeof module && module && module.exports)
      try {
        return require("crypto").randomBytes(r3);
      } catch (r4) {
      }
    try {
      let t3;
      return (self.crypto || self.msCrypto).getRandomValues(t3 = new Uint32Array(r3)), Array.prototype.slice.call(t3);
    } catch (r4) {
    }
    throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
  })(16), 16)), t2.join("");
};
function c(r2, t2, e2, n2) {
  if ("string" != typeof r2 || "string" != typeof t2) {
    const r3 = new Error("Invalid string / salt: Not a string");
    if (false === e2)
      return Promise.reject(r3);
    throw r3;
  }
  let f2, i2;
  if ("$" !== t2.charAt(0) || "2" !== t2.charAt(1)) {
    const r3 = new Error("Invalid salt version: " + t2.substring(0, 2));
    if (false === e2)
      return Promise.reject(r3);
    throw r3;
  }
  if ("$" === t2.charAt(2))
    f2 = String.fromCharCode(0), i2 = 3;
  else {
    if (f2 = t2.charAt(2), "a" !== f2 && "b" !== f2 && "y" !== f2 || "$" !== t2.charAt(3)) {
      const r3 = Error("Invalid salt revision: " + t2.substring(2, 4));
      if (false === e2)
        return Promise.reject(r3);
      throw r3;
    }
    i2 = 4;
  }
  if (t2.charAt(i2 + 2) > "$") {
    const r3 = new Error("Missing salt rounds");
    if (false === e2)
      return Promise.reject(r3);
    throw r3;
  }
  const u2 = 10 * parseInt(t2.substring(i2, i2 + 1), 10) + parseInt(t2.substring(i2 + 1, i2 + 2), 10), h2 = t2.substring(i2 + 3, i2 + 25), a2 = ((r3) => {
    const t3 = [];
    let e3 = 0;
    var n3;
    return n3 = (r4) => {
      t3.push(r4);
    }, ((r4, t4) => {
      let e4, n4 = null;
      for (; null !== (e4 = null !== n4 ? n4 : r4()); )
        e4 >= 55296 && e4 <= 57343 && null !== (n4 = r4()) && n4 >= 56320 && n4 <= 57343 ? (t4(1024 * (e4 - 55296) + n4 - 56320 + 65536), n4 = null) : t4(e4);
      null !== n4 && t4(n4);
    })(() => e3 >= r3.length ? null : r3.charCodeAt(e3++), function(r4) {
      ((r5, t4) => {
        let e4 = null;
        for ("number" == typeof r5 && (e4 = r5, r5 = () => null); null !== e4 || null !== (e4 = r5()); )
          e4 < 128 ? t4(127 & e4) : e4 < 2048 ? (t4(e4 >> 6 & 31 | 192), t4(63 & e4 | 128)) : e4 < 65536 ? (t4(e4 >> 12 & 15 | 224), t4(e4 >> 6 & 63 | 128), t4(63 & e4 | 128)) : (t4(e4 >> 18 & 7 | 240), t4(e4 >> 12 & 63 | 128), t4(e4 >> 6 & 63 | 128), t4(63 & e4 | 128)), e4 = null;
      })(r4, n3);
    }), t3;
  })(r2 += f2 >= "a" ? "\0" : ""), g = l(h2, 16), c2 = (r3) => {
    const t3 = [];
    return t3.push("$2"), f2 >= "a" && t3.push(f2), t3.push("$"), u2 < 10 && t3.push("0"), t3.push(u2.toString()), t3.push("$"), t3.push(s(g, g.length)), t3.push(s(r3, 4 * o.length - 1)), t3.join("");
  };
  return false === e2 ? p(a2, g, u2, false, n2).then((r3) => c2(r3)) : c2(p(a2, g, u2, true, n2));
}
const y = (r2, t2 = 10) => {
  if ("number" == typeof t2 && (t2 = a(t2)), "string" != typeof r2 || "string" != typeof t2)
    throw Error("Illegal arguments: " + typeof r2 + ", " + typeof t2);
  return c(r2, t2, true);
}, w = (r2, t2) => {
  if ("string" != typeof r2 || "string" != typeof t2)
    throw Error("Illegal arguments: " + typeof r2 + ", " + typeof t2);
  return 60 === t2.length && y(r2, t2.substring(0, t2.length - 31)) === t2;
};
const useEncryptData = () => {
  const themeData2 = useThemeData();
  return computed(() => themeData2.value.encrypt || {});
};
const STORAGE_KEY$1 = "VUEPRESS_HOPE_GLOBAL_TOKEN";
const useGlobalEcrypt = () => {
  const encryptData = useEncryptData();
  const localToken = useStorage(STORAGE_KEY$1, "");
  const sessionToken = useSessionStorage(STORAGE_KEY$1, "");
  const isGlobalEncrypted = computed(() => {
    if (encryptData.value.global && encryptData.value.admin) {
      if (localToken.value)
        return encryptData.value.admin.every((hash) => !w(localToken.value, hash));
      if (sessionToken.value)
        return encryptData.value.admin.every((hash) => !w(sessionToken.value, hash));
      return true;
    }
    return false;
  });
  const validateGlobalToken = (inputToken, keep = false) => {
    (keep ? localToken : sessionToken).value = inputToken;
  };
  return {
    isGlobalEncrypted,
    validateGlobalToken
  };
};
const checkToken = (token = "", hash) => Boolean(token) && w(token, hash);
const STORAGE_KEY = "VUEPRESS_HOPE_PATH_TOKEN";
const usePathEncrypt = () => {
  const route = useRoute();
  const encryptData = useEncryptData();
  const localToken = useStorage(STORAGE_KEY, {});
  const sessionToken = useSessionStorage(STORAGE_KEY, {});
  const getPathMatchedKeys = (path) => typeof encryptData.value.config === "object" ? Object.keys(encryptData.value.config).filter((key) => decodeURI(path).startsWith(key)).sort((a2, b2) => b2.length - a2.length) : [];
  const getPathEncryptStatus = (path) => {
    const matchedKeys = getPathMatchedKeys(path);
    if (matchedKeys.length !== 0) {
      const { config = {} } = encryptData.value;
      return !matchedKeys.some((key) => localToken.value[key] && config[key].some((token) => checkToken(localToken.value[key], token)) || sessionToken.value[key] && config[key].some((token) => checkToken(sessionToken.value[key], token)));
    }
    return false;
  };
  const isEncrypted = computed(() => getPathEncryptStatus(route.path));
  const validateToken = (inputToken, keep = false) => {
    const { config = {} } = encryptData.value;
    const matchedKeys = getPathMatchedKeys(route.path);
    for (const hitKey of matchedKeys) {
      if (config[hitKey].filter((token) => checkToken(inputToken, token))) {
        (keep ? localToken : sessionToken).value[hitKey] = inputToken;
        break;
      }
    }
  };
  return {
    isEncrypted,
    getPathEncryptStatus,
    validateToken
  };
};
var GloablEncrypt = defineComponent({
  name: "GlobalEncrypt",
  setup(_props, { slots }) {
    const { isGlobalEncrypted, validateGlobalToken } = useGlobalEcrypt();
    return () => {
      var _a2;
      return isGlobalEncrypted.value ? h$2(PasswordModal, { full: true, onVerify: validateGlobalToken }) : ((_a2 = slots["default"]) == null ? void 0 : _a2.call(slots)) || null;
    };
  }
});
var LocalEncrypt = defineComponent({
  name: "LocalEncrypt",
  setup(_props, { slots }) {
    const { isEncrypted, validateToken } = usePathEncrypt();
    return () => {
      var _a2;
      return isEncrypted.value ? h$2(PasswordModal, { full: true, onVerify: validateToken }) : ((_a2 = slots["default"]) == null ? void 0 : _a2.call(slots)) || null;
    };
  }
});
var clientConfig9 = defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();
      return scrollBehavior(...args);
    };
    injectDarkMode(app);
    app.component("CommonWrapper", CommonWrapper);
    app.component("HomePage", HomePage);
    app.component("NormalPage", NormalPage);
    app.component("Navbar", Navbar);
    app.component("Sidebar", Sidebar);
    app.component("BloggerInfo", BloggerInfo);
    app.component("BlogHome", BlogHome);
    app.component("BlogPage", BlogPage);
    app.component("GloablEncrypt", GloablEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  }
});
var clientConfig10 = defineClientConfig({
  enhance: ({ app }) => {
  }
});
const clientConfigs = [
  clientConfig0,
  clientConfig1,
  clientConfig2,
  clientConfig3,
  clientConfig4,
  clientConfig5,
  p$2,
  i$1,
  h$1,
  clientConfig9,
  clientConfig10
];
const pagesRoutes = [
  ["v-8daa1a0e", "/", { "title": "\u76EE\u5F55", "type": "article", "readingTime": { "minutes": 0.01, "words": 2 }, "excerpt": "\u76EE\u5F55", "date": "2021-02-18T03:10:13.000Z" }, ["/index.html", "/README.md"]],
  ["v-79fdd481", "/home.html", { "title": "\u9879\u76EE\u4E3B\u9875", "icon": "home", "type": "home", "readingTime": { "minutes": 2.61, "words": 782 }, "excerpt": "\u8FD9\u662F\u9879\u76EE\u4E3B\u9875\u7684\u6848\u4F8B\u3002\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u653E\u7F6E\u4F60\u7684\u4E3B\u4F53\u5185\u5BB9\u3002 \u60F3\u8981\u4F7F\u7528\u6B64\u5E03\u5C40\uFF0C\u4F60\u9700\u8981\u5728\u9875\u9762 front matter \u4E2D\u8BBE\u7F6E home: true\u3002 \u914D\u7F6E\u9879\u7684\u76F8\u5173\u8BF4\u660E\u8BE6\u89C1 \u9879\u76EE\u4E3B\u9875\u914D\u7F6E\u3002", "date": "2022-08-09T11:49:17.000Z" }, ["/home", "/home.md"]],
  ["v-14c69af4", "/java/", { "title": "Java", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.04, "words": 13 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/index.html", "/java/README.md"]],
  ["v-35c4a6dd", "/java/base/Java%E5%8F%8D%E5%B0%84.html", { "title": "Java\u53CD\u5C04(Reflection)", "type": "article", "readingTime": { "minutes": 1.2, "words": 361 }, "excerpt": "Java\u53CD\u5C04(Reflection) 1. \u4EC0\u4E48\u662F\u53CD\u5C04\uFF1F \u53EF\u4EE5\u5728\u8FD0\u884C\u65F6\u83B7\u5F97\u7A0B\u5E8F\u6216\u7A0B\u5E8F\u96C6\u4E2D\u6BCF\u4E00\u4E2A\u7C7B\u578B\u7684\u6210\u5458\u548C\u6210\u5458\u7684\u4FE1\u606F\u3002 \u7A0B\u5E8F\u4E2D\u4E00\u822C\u7684\u5BF9\u8C61\u7684\u7C7B\u578B\u90FD\u662F\u5728\u7F16\u8BD1\u671F\u786E\u5B9A\u4E0B\u6765\u7684\uFF0C\u800Cjava\u53CD\u5C04\u673A\u5236\u53EF\u4EE5\u52A8\u6001\u5730\u521B\u5EFA\u5BF9\u8C61\u5E76\u8C03\u7528\u5176\u5C5E\u6027\uFF0C\u8FD9\u6837\u7684\u5BF9\u8C61\u5728\u7F16\u8BD1\u671F\u662F\u672A\u77E5\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u53CD\u5C04\u96C6\u4E2D\u5236\u76F4\u63A5\u521B\u5EFA\u5BF9\u8C61\uFF0C\u5373\u4F7F\u8FD9\u4E2A\u5BF9\u8C61\u7684\u7C7B\u578B\u5728\u7F16\u8BD1\u5668\u662F\u672A\u77E5\u7684\u3002 2. \u53CD\u5C04\u7684\u7F3A\u70B9\uFF1F \u4F1A\u989D\u5916\u6D88\u8017\u4E00\u5B9A\u7684\u7CFB", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/base/Java\u53CD\u5C04.html", "/java/base/Java%E5%8F%8D%E5%B0%84", "/java/base/Java\u53CD\u5C04.md", "/java/base/Java%E5%8F%8D%E5%B0%84.md"]],
  ["v-f3262b3a", "/java/base/Java%E5%8F%8D%E5%B0%842.html", { "title": "Java\u6CE8\u89E3", "type": "article", "readingTime": { "minutes": 0.95, "words": 284 }, "excerpt": 'Java\u6CE8\u89E3 1. \u6CE8\u89E3\u662F\u4EC0\u4E48\uFF1F "\u6CE8\u89E3\u662F\u4E00\u7CFB\u5217\u5143\u6570\u636E\uFF0C\u5B83\u63D0\u4F9B\u6570\u636E\u7528\u6765\u89E3\u91CA\u7A0B\u5E8F\u4EE3\u7801\uFF0C\u4F46\u662F\u6CE8\u89E3\u5E76\u975E\u662F\u6240\u89E3\u91CA\u7684\u4EE3\u7801\u672C\u8EAB\u7684\u4E00\u90E8\u5206\u3002\u6CE8\u89E3\u5BF9\u4E8E\u4EE3\u7801\u7684\u8FD0\u884C\u6548\u679C\u6CA1\u6709\u76F4\u63A5\u5F71\u54CD\u3002" "" "\u200B																						---\u62BD\u8C61\u7684\u5B98\u65B9\u5B9A\u4E49" \u6CE8\u89E3\u76F8\u5F53\u4E8E\u4E00\u4E2A\u6807\u7B7E\uFF0C\u7ED9\u4EE3\u7801\u8D34\u4E0A\u4E00\u4E2A\u4E2A\u6807\u7B7E\u6765\u63CF\u8FF0\u4EE3\u7801\u7684\u76F8\u5173\u7279\u6027 2. \u6CE8\u89E3\u8BED\u6CD5 \u6CE8\u89E3\u901A\u8FC7@Interface \u5173\u952E\u5B57\u8FDB\u884C', "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/base/Java\u53CD\u5C042.html", "/java/base/Java%E5%8F%8D%E5%B0%842", "/java/base/Java\u53CD\u5C042.md", "/java/base/Java%E5%8F%8D%E5%B0%842.md"]],
  ["v-6e1a5ab5", "/java/base/Java%E5%9F%BA%E7%A1%80.html", { "title": "Java\u57FA\u7840", "type": "article", "readingTime": { "minutes": 10.18, "words": 3053 }, "excerpt": "Java\u57FA\u7840 1. Java\u9762\u5411\u5BF9\u8C61\u7F16\u7A0B\u4E09\u5927\u7279\u6027\uFF1A\u5C01\u88C5 \u96C6\u6210 \u591A\u6001 1.1 \u5C01\u88C5 \u9690\u85CF\u5BF9\u8C61\u7684\u5C5E\u6027\u548C\u5B9E\u73B0\u7EC6\u8282\uFF0C\u4EC5\u5BF9\u5916\u516C\u5F00\u8BBF\u95EE\u65B9\u6CD5\uFF0C\u63A7\u5236\u7A0B\u5E8F\u4E2D\u5C5E\u6027\u7684\u8BFB\u548C\u5199\u7684\u8BBF\u95EE\u7EA7\u522B\u3002 1.2 \u7EE7\u627F \u5728\u4E00\u4E2A\u73B0\u6709\u7C7B\u7684\u57FA\u7840\u4E4B\u4E0A\uFF0C\u589E\u52A0\u65B0\u7684\u65B9\u6CD5\u6216\u91CD\u5199\u5DF2\u6709\u65B9\u6CD5\uFF0C\u4ECE\u800C\u4EA7\u751F\u4E00\u4E2A\u65B0\u7C7B\u3002 \u5173\u4E8E\u7EE7\u627F\u5982\u4E0B3\u70B9\uFF1A 1. \u5B50\u7C7B\u62E5\u6709\u7236\u7C7B\u5BF9\u8C61\u6240\u6709\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF08\u5305\u62EC\u79C1\u6709\u5C5E\u6027\u548C\u79C1\u6709\u65B9\u6CD5\uFF09\uFF0C\u4F46\u662F\u7236\u7C7B\u7684\u79C1\u6709\u5C5E\u6027\u548C\u65B9\u6CD5", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/base/Java\u57FA\u7840.html", "/java/base/Java%E5%9F%BA%E7%A1%80", "/java/base/Java\u57FA\u7840.md", "/java/base/Java%E5%9F%BA%E7%A1%80.md"]],
  ["v-39490ba5", "/java/base/Java%E5%9F%BA%E7%A1%80%E9%9D%A2%E8%AF%95%E6%8F%90%E9%97%AE.html", { "title": "Java\u57FA\u7840\u9762\u8BD5\u63D0\u95EE", "type": "article", "readingTime": { "minutes": 2.13, "words": 638 }, "excerpt": "Java\u57FA\u7840\u9762\u8BD5\u63D0\u95EE 1. String\u7BC7 1. \u8BF4\u8BF4String\u3001StringBuffer\u548CStringBuilder\u7684\u533A\u522B 2. \u4E3A\u4EC0\u4E48String \u4E0D\u53EF\u53D8\uFF1F 1. final\u4FEE\u9970\u7684\u53D8\u91CF\u7279\u70B9 3. StringBuffer\u4E3A\u4EC0\u4E48\u662F\u7EBF\u7A0B\u5B89\u5168\u7684\uFF1F\uFF08\u5F15\u51FA\u591A\u7EBF\u7A0B\u8BDD\u9898\uFF09 2. \u7EBF\u7A0B\u5B89\u5168\u7BC7 1. \u4EC0\u4E48\u662F\u7EBF\u7A0B\u5B89\u5168\uFF1F 2. \u4E3A\u4EC0\u4E48\u4F1A\u6709\u7EBF\u7A0B\u5B89\u5168\u95EE\u9898\uFF1F(\u8BF4\u8BF4java\u5185\u5B58\u6A21\u578B", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/base/Java\u57FA\u7840\u9762\u8BD5\u63D0\u95EE.html", "/java/base/Java%E5%9F%BA%E7%A1%80%E9%9D%A2%E8%AF%95%E6%8F%90%E9%97%AE", "/java/base/Java\u57FA\u7840\u9762\u8BD5\u63D0\u95EE.md", "/java/base/Java%E5%9F%BA%E7%A1%80%E9%9D%A2%E8%AF%95%E6%8F%90%E9%97%AE.md"]],
  ["v-28851ef4", "/java/base/Java%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86.html", { "title": "Java\u5F02\u5E38\u5904\u7406", "type": "article", "readingTime": { "minutes": 2.65, "words": 796 }, "excerpt": "Java\u5F02\u5E38\u5904\u7406 1. Java \u5F02\u5E38\u7C7B\u5C42\u6B21\u7ED3\u6784\u56FE \u5728Java\u4E2D\uFF0C\u6240\u6709\u7684\u5F02\u5E38\u90FD\u6709\u4E00\u4E2A\u5171\u540C\u7684\u7956\u5148java.lang\u5305\u4E2D\u7684Throwable\u7C7B\u3002Throwable: \u6709\u4E24\u4E2A\u91CD\u8981\u7684\u5B50\u7C7B\uFF1AException\uFF08\u5F02\u5E38\uFF09\u548C Error\uFF08\u9519\u8BEF\uFF09\uFF0C\u4E8C\u8005\u90FD\u662FJava\u5F02\u5E38\u5904\u7406\u7684\u91CD\u8981\u5B50\u7C7B\uFF0C\u5404\u81EA\u90FD\u5305\u542B\u4E86\u5927\u91CF\u5B50\u7C7B 1.1 Error\uFF08\u9519\u8BEF\uFF09 error \u662F\u7A0B\u5E8F\u65E0\u6CD5\u5904\u7406\u7684\u9519\u8BEF\uFF0C\u8868\u793A\u8FD0\u884C\u5E94", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/base/Java\u5F02\u5E38\u5904\u7406.html", "/java/base/Java%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86", "/java/base/Java\u5F02\u5E38\u5904\u7406.md", "/java/base/Java%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86.md"]],
  ["v-673af10a", "/java/base/", { "title": "Java\u57FA\u7840", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/base/index.html", "/java/base/README.md"]],
  ["v-08345439", "/java/base/%E5%85%B3%E9%94%AE%E5%AD%97%E6%80%BB%E7%BB%93.html", { "title": "final,static,this,super \u5173\u952E\u5B57\u603B\u7ED3", "type": "article", "readingTime": { "minutes": 4.05, "words": 1216 }, "excerpt": "final,static,this,super \u5173\u952E\u5B57\u603B\u7ED3 1. final \u5173\u952E\u5B57 final \u5173\u952E\u5B57\u4E3B\u8981\u7528\u5728\u4E09\u4E2A\u5730\u65B9\uFF1A\u53D8\u91CF\u3001\u65B9\u6CD5\u3001\u7C7B 1. final \u53D8\u91CF \u5982\u679C\u662F\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u53D8\u91CF\uFF0C\u5176\u6570\u503C\u4E00\u65E6\u521D\u59CB\u5316\u4E4B\u540E\u4FBF\u4E0D\u80FD\u6539\u53D8; \u5982\u679C\u662F\u5F15\u7528\u7C7B\u578B\u7684\u53D8\u91CF\uFF1A\u5219\u5728\u5BF9\u5176\u521D\u59CB\u5316\u4E4B\u540E\u4FBF*\u4E0D\u80FD\u518D\u8BA9\u5176\u6307\u5411\u53E6\u4E00\u4E2A\u5BF9\u8C61; 2. final \u7C7B \u8868\u660E\u8FD9\u4E2A\u7C7B\u4E0D\u80FD\u88AB\u7EE7\u627F\uFF0Cfinal \u7C7B\u4E2D\u7684\u6240\u6709", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/base/\u5173\u952E\u5B57\u603B\u7ED3.html", "/java/base/%E5%85%B3%E9%94%AE%E5%AD%97%E6%80%BB%E7%BB%93", "/java/base/\u5173\u952E\u5B57\u603B\u7ED3.md", "/java/base/%E5%85%B3%E9%94%AE%E5%AD%97%E6%80%BB%E7%BB%93.md"]],
  ["v-23375f22", "/java/collection/ArrayList%E7%9A%84%E6%89%A9%E5%AE%B9%E6%9C%BA%E5%88%B6.html", { "title": "ArrayList \u7684\u6269\u5BB9\u673A\u5236", "type": "article", "readingTime": { "minutes": 1.36, "words": 408 }, "excerpt": "ArrayList \u7684\u6269\u5BB9\u673A\u5236 1.\u5982\u4F55\u5B9E\u73B0\u6269\u5BB9 \u5E95\u5C42\u4E3B\u8981\u662F\u8FD9\u4E09\u4E2A\u79C1\u6709\u65B9\u6CD5\u914D\u5408\u5B9E\u73B0grow(),grow(int minCapacity),newCapacity(int minCapacity)\u6269\u5BB9\u3002\u6700\u7EC8\u662F\u8C03\u7528\u4E86Arrays.copyOf\u65B9\u6CD5\u6765\u8FDB\u884C\u6269\u5145\u6570\u7EC4\u5BB9\u91CF\u7684\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u65B0\u7684\u5BB9\u91CF\u662F\u539F\u5BB9\u91CF\u76841.5\u500D\u3002 2. \u624B\u52A8\u6269\u5BB9 grow\u65B9\u6CD5\u4E3B\u8981\u7528\u4E8E\u5B9E\u73B0\u81EA\u52A8\u6269\u5BB9\u7684\uFF0C", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/collection/ArrayList\u7684\u6269\u5BB9\u673A\u5236.html", "/java/collection/ArrayList%E7%9A%84%E6%89%A9%E5%AE%B9%E6%9C%BA%E5%88%B6", "/java/collection/ArrayList\u7684\u6269\u5BB9\u673A\u5236.md", "/java/collection/ArrayList%E7%9A%84%E6%89%A9%E5%AE%B9%E6%9C%BA%E5%88%B6.md"]],
  ["v-3fc1c173", "/java/collection/Comparable%E5%92%8CComparator.html", { "title": "Comparable\u548CComparator", "type": "article", "readingTime": { "minutes": 1.78, "words": 533 }, "excerpt": "Comparable\u548CComparator Comparable \u63A5\u53E3\u5B9E\u9645\u4E0A\u662F\u51FA\u81EAjava.lang\u5305\uFF0C\u4ED6\u6709\u4E00\u4E2AcompareTp(Object obj )\u65B9\u6CD5\u7528\u6765\u6392\u5E8F; comparator \u63A5\u53E3\u5B9E\u9645\u4E0A\u662F\u51FA\u81EAjava.util \u5305\uFF0C\u4ED6\u6709\u4E00\u4E2Acompare\uFF08object obj1,object obj2\uFF09\u65B9\u6CD5\u7528\u6765\u6392\u5E8F; \u4E00\u822C\u6211\u4EEC\u9700\u8981\u5BF9\u4E00\u4E2A\u96C6\u5408\u4F7F\u7528\u81EA\u5B9A\u4E49\u6392\u5E8F\u65F6", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/collection/Comparable\u548CComparator.html", "/java/collection/Comparable%E5%92%8CComparator", "/java/collection/Comparable\u548CComparator.md", "/java/collection/Comparable%E5%92%8CComparator.md"]],
  ["v-616148db", "/java/collection/HashMap%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98.html", { "title": "HashMap\u76F8\u5173\u95EE\u9898", "type": "article", "readingTime": { "minutes": 1.27, "words": 380 }, "excerpt": "HashMap\u76F8\u5173\u95EE\u9898 1. HashMap\u4E2D\u76F8\u5173\u6982\u5FF5 size\uFF1A; \u8868\u793AHashMap\u4E2D\u5B58\u653EKV\u6570\u91CF\uFF08\u4E3A\u94FE\u8868\u548C\u6811\u4E2D\u7684KV\u7684\u603B\u548C\uFF09 capacity\uFF08\u5BB9\u91CF\uFF09; capacity\u5C31\u662F\u6307HashMap\u4E2D\u6876\u7684\u6570\u91CF\uFF0C\u9ED8\u8BA4\u503C\u4E3A16\uFF0C\u5BB9\u91CF\u90FD\u662F2\u7684\u5E42 loadFactor\uFF08\u88C5\u8F7D\u56E0\u5B50\uFF09; \u88C5\u8F7D\u56E0\u5B50\u7528\u6765\u8861\u91CFHashMap\u6EE1\u7684\u7A0B\u5EA6\uFF0CloadFactor\u7684\u9ED8\u8BA4\u503C\u4E3A0.75f\u3002\u8BA1\u7B97", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/collection/HashMap\u76F8\u5173\u95EE\u9898.html", "/java/collection/HashMap%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98", "/java/collection/HashMap\u76F8\u5173\u95EE\u9898.md", "/java/collection/HashMap%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98.md"]],
  ["v-2aae2a44", "/java/collection/Java%E5%AE%B9%E5%99%A8%E5%9F%BA%E7%A1%80.html", { "title": "Java\u5BB9\u5668\u57FA\u7840", "type": "article", "readingTime": { "minutes": 14.45, "words": 4334 }, "excerpt": "Java\u5BB9\u5668\u57FA\u7840 1. \u8BF4\u8BF4List\u3001Set\u3001Map\u4E09\u8005\u7684\u533A\u522B List\uFF1AList\u63A5\u53E3\u5B58\u50A8\u4E00\u7EC4\u4E0D\u552F\u4E00\uFF08\u53EF\u4EE5\u6709\u591A\u4E2A\u5143\u7D20\u5F15\u7528\u76F8\u540C\u7684\u5BF9\u8C61\uFF09\uFF0C\u6709\u5E8F\u7684\u5BF9\u8C61; Set\uFF08\u6CE8\u91CD\u72EC\u4E00\u65E0\u4E8C\u7684\u6027\u8D28\uFF09\uFF1A\u4E0D\u5141\u8BB8\u91CD\u590D\u7684\u96C6\u5408\uFF0C\u4E0D\u4F1A\u6709\u591A\u4E2A\u5143\u7D20\u5F15\u7528\u76F8\u540C\u7684\u5BF9\u8C61; Map\uFF08\u7528key\u6765\u641C\u7D22\u7684\u4E13\u5BB6\uFF09\uFF1A\u4F7F\u7528\u952E\u503C\u5BF9\u5B58\u50A8\u3002Map\u4F1A\u7EF4\u62A4\u4E0Ekey\u6709\u5173\u8054\u7684\u503C\u3002\u4E24\u4E2Akey\u53EF\u4EE5\u5F15\u7528\u76F8\u540C\u7684\u5BF9\u8C61\uFF0C\u4F46key\u4E0D\u80FD\u91CD\u590D\u3002; ", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/collection/Java\u5BB9\u5668\u57FA\u7840.html", "/java/collection/Java%E5%AE%B9%E5%99%A8%E5%9F%BA%E7%A1%80", "/java/collection/Java\u5BB9\u5668\u57FA\u7840.md", "/java/collection/Java%E5%AE%B9%E5%99%A8%E5%9F%BA%E7%A1%80.md"]],
  ["v-16722c46", "/java/collection/", { "title": "Jave\u96C6\u5408", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/collection/index.html", "/java/collection/README.md"]],
  ["v-74f62882", "/java/command/Java%E5%8F%8D%E7%BC%96%E8%AF%91%E5%91%BD%E4%BB%A4-javap.html", { "title": "Java\u53CD\u7F16\u8BD1\u547D\u4EE4-javap", "type": "article", "readingTime": { "minutes": 2.41, "words": 722 }, "excerpt": "Java\u53CD\u7F16\u8BD1\u547D\u4EE4-javap 1. \u7B80\u4ECB javap\u662Fjdk\u81EA\u5E26\u7684\u4E00\u4E2A\u5DE5\u5177\uFF0C\u53EF\u4EE5\u5BF9\u4EE3\u7801 \u53CD\u7F16\u8BD1 \uFF0C\u4E5F\u53EF\u4EE5\u67E5\u770Bjava\u7F16\u8BD1\u5668\u751F\u6210\u7684\u5B57\u8282\u7801\u3002 javap\u547D\u4EE4\u5206\u89E3\u4E00\u4E2Aclass\u6587\u4EF6\uFF0C\u5B83\u6839\u636Eoptions\u6765\u51B3\u5B9A\u5230\u5E95\u8F93\u51FA\u4EC0\u4E48\u3002\u5982\u679C\u6CA1\u6709\u4F7F\u7528options,\u90A3\u4E48javap\u5C06\u4F1A\u8F93\u51FA\u5305\uFF0C\u7C7B\u91CC\u7684protected\u548Cpublic\u57DF\u4EE5\u53CA\u7C7B\u91CC\u7684\u6240\u6709\u65B9\u6CD5\u3002javap\u5C06\u4F1A\u628A\u5B83\u4EEC\u8F93\u51FA\u5728\u6807", "date": "2022-08-09T11:49:17.000Z" }, ["/java/command/Java\u53CD\u7F16\u8BD1\u547D\u4EE4-javap.html", "/java/command/Java%E5%8F%8D%E7%BC%96%E8%AF%91%E5%91%BD%E4%BB%A4-javap", "/java/command/Java\u53CD\u7F16\u8BD1\u547D\u4EE4-javap.md", "/java/command/Java%E5%8F%8D%E7%BC%96%E8%AF%91%E5%91%BD%E4%BB%A4-javap.md"]],
  ["v-f15a9420", "/java/command/Java%E5%91%BD%E4%BB%A4%E5%8F%82%E6%95%B0.html", { "title": "Java\u547D\u4EE4\u53C2\u6570", "type": "article", "readingTime": { "minutes": 14.75, "words": 4426 }, "excerpt": "Java\u547D\u4EE4\u53C2\u6570 1. \u7B80\u4ECB java \u547D\u4EE4\u7528\u4E8E\u542F\u52A8 java \u5E94\u7528\uFF1A\u5B83\u9996\u5148\u4F1A\u542F\u52A8 java \u8FD0\u884C\u65F6\u73AF\u5883\uFF08JRE\uFF09\uFF0C\u7136\u540E\u52A0\u8F7D\u6307\u5B9A\u7684\u7C7B\uFF0C\u8C03\u7528\u7C7B\u7684 main() \u65B9\u6CD5\u3002main() \u65B9\u6CD5\u5FC5\u987B\u5B9A\u4E49\u4E3A public \u548C static \u7684\uFF0C\u5E76\u4E14\u4E0D\u8FD4\u56DE\u4EFB\u4F55\u503C\uFF0C\u53C2\u6570\u662F String \u7C7B\u578B\u7684\u6570\u7EC4\uFF0C\u8BE5\u65B9\u6CD5\u7684\u5F62\u5F0F\u5982\u4E0B\uFF1A \u5728\u901A\u8FC7 java \u547D\u4EE4\u542F\u52A8\u5E94\u7528\u65F6\uFF0C\u6709\u4E00\u7CFB\u5217\u7684\u53EF\u9009\u53C2\u6570\uFF0C\u4F7F\u7528", "date": "2022-08-09T11:49:17.000Z" }, ["/java/command/Java\u547D\u4EE4\u53C2\u6570.html", "/java/command/Java%E5%91%BD%E4%BB%A4%E5%8F%82%E6%95%B0", "/java/command/Java\u547D\u4EE4\u53C2\u6570.md", "/java/command/Java%E5%91%BD%E4%BB%A4%E5%8F%82%E6%95%B0.md"]],
  ["v-3eed58e7", "/java/command/Java%E7%BC%96%E8%AF%91.html", { "title": "Java\u7F16\u8BD1", "type": "article", "readingTime": { "minutes": 6.59, "words": 1976 }, "excerpt": "Java\u7F16\u8BD1 1. \u7B80\u4ECB IDE\u6216maven\u7B49\u5DE5\u5177\u5DF2\u5C06Java\u7A0B\u5E8F\u7684\u7F16\u8BD1\u4EE3\u52B3\u3002\u4F46\u5DE5\u5177\u8D8A\u9AD8\u7EA7\uFF0C\u9690\u85CF\u7684\u7EC6\u8282\u5C31\u8D8A\u591A\uFF0C\u4E00\u65E6\u51FA\u73B0\u95EE\u9898\u5C31\u61F5\u903C\uFF0C\u5F52\u6839\u5230\u5E95\u8FD8\u662F\u57FA\u7840\u6982\u5FF5\u4E0D\u7262\u9760\u3002\u8FD4\u749E\u5F52\u771F\uFF0C\u56DE\u5230\u6700\u539F\u59CB\u7684\u5730\u65B9javac\uFF0C\u4F1A\u8BA9\u95EE\u9898\u8C41\u7136\u5F00\u6717\u3002\u4E0B\u9762\u5C31\u4E00\u6B65\u4E00\u6B65\u6F14\u793A\u7528javac\u548Cjava\u5F92\u624B\u7F16\u8BD1\u8FD0\u884C\u4E00\u4E2A\u5E38\u89C4\u5DE5\u7A0B\u3002 2. Hello World\u7EC3\u4E2A\u624B \u6765\u4E2A\u7B80\u5355\u7684\u5148\uFF0C\u6211\u4EEC\u796D\u51FA\u7956\u4F20\u7684HelloWo", "date": "2022-08-09T11:49:17.000Z" }, ["/java/command/Java\u7F16\u8BD1.html", "/java/command/Java%E7%BC%96%E8%AF%91", "/java/command/Java\u7F16\u8BD1.md", "/java/command/Java%E7%BC%96%E8%AF%91.md"]],
  ["v-46dc7138", "/java/command/", { "title": "Jave-\u7F16\u8BD1", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/command/index.html", "/java/command/README.md"]],
  ["v-9828af56", "/java/io/", { "title": "Jave-IO\u6846\u67B6", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 16 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/io/index.html", "/java/io/README.md"]],
  ["v-60b3db42", "/java/java8/Java8-%E5%87%BD%E6%95%B0%E7%BC%96%E7%A8%8Blambda%E8%A1%A8%E8%BE%BE%E5%BC%8F.html", { "title": "Java8-\u51FD\u6570\u7F16\u7A0B(lambda\u8868\u8FBE\u5F0F)", "type": "article", "readingTime": { "minutes": 21.53, "words": 6459 }, "excerpt": 'Java8-\u51FD\u6570\u7F16\u7A0B(lambda\u8868\u8FBE\u5F0F) "\u6211\u4EEC\u5173\u5FC3\u7684\u662F\u5982\u4F55\u5199\u51FA\u597D\u4EE3\u7801\uFF0C\u800C\u4E0D\u662F\u7B26\u5408\u51FD\u6570\u7F16\u7A0B\u98CE\u683C\u7684\u4EE3\u7801\u3002 " 1. \u51FD\u6570\u7F16\u7A0B\u7B80\u4ECB " \u5728Java\u4E16\u754C\u91CC\u9762\uFF0C\u9762\u5411\u5BF9\u8C61\u8FD8\u662F\u4E3B\u6D41\u601D\u60F3\uFF0C\u5BF9\u4E8E\u4E60\u60EF\u4E86\u9762\u5411\u5BF9\u8C61\u7F16\u7A0B\u7684\u5F00\u53D1\u8005\u6765\u8BF4\uFF0C\u62BD\u8C61\u7684\u6982\u5FF5\u5E76\u4E0D\u964C\u751F\u3002\u9762\u5411\u5BF9\u8C61\u7F16\u7A0B\u662F\u5BF9\u6570\u636E\u8FDB\u884C\u62BD\u8C61\uFF0C\u800C\u51FD\u6570\u5F0F\u7F16\u7A0B\u662F\u5BF9\u884C\u4E3A\u8FDB\u884C\u62BD\u8C61\u3002\u73B0\u5B9E\u4E16\u754C\u4E2D\uFF0C\u6570\u636E\u548C\u884C\u4E3A\u5E76\u5B58\uFF0C\u7A0B\u5E8F\u4E5F\u662F\u5982\u6B64\uFF0C\u56E0\u6B64\u8FD9\u4E24\u79CD\u7F16\u7A0B\u65B9\u5F0F\u6211\u4EEC\u90FD\u5F97', "date": "2022-08-09T11:49:17.000Z" }, ["/java/java8/Java8-\u51FD\u6570\u7F16\u7A0Blambda\u8868\u8FBE\u5F0F.html", "/java/java8/Java8-%E5%87%BD%E6%95%B0%E7%BC%96%E7%A8%8Blambda%E8%A1%A8%E8%BE%BE%E5%BC%8F", "/java/java8/Java8-\u51FD\u6570\u7F16\u7A0Blambda\u8868\u8FBE\u5F0F.md", "/java/java8/Java8-%E5%87%BD%E6%95%B0%E7%BC%96%E7%A8%8Blambda%E8%A1%A8%E8%BE%BE%E5%BC%8F.md"]],
  ["v-e46976e6", "/java/java8/", { "title": "Jave-Java8", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 14 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/java8/index.html", "/java/java8/README.md"]],
  ["v-4ad508cc", "/java/jvm/HotSpot%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA.html", { "title": "HotSpot \u865A\u62DF\u673A\u5BF9\u8C61\u521B\u5EFA", "type": "article", "readingTime": { "minutes": 5.6, "words": 1679 }, "excerpt": "HotSpot \u865A\u62DF\u673A\u5BF9\u8C61\u521B\u5EFA \u672C\u7AE0\u4ECB\u7ECDHotSpot \u865A\u62DF\u673A\u5728Java\u5806\u4E2D\u5BF9\u8C61\u5206\u914D\u3001\u5E03\u5C40\u548C\u8BBF\u95EE\u7684\u5168\u8FC7\u7A0B 1. \u5BF9\u8C61\u7684\u521B\u5EFA \u4E0B\u56FE\u4FBF\u662F Java \u5BF9\u8C61\u7684\u521B\u5EFA\u8FC7\u7A0B\uFF08\u9700\u9ED8\u5199\uFF0C\u5E76\u638C\u63E1\u6BCF\u4E00\u6B65\uFF09 1.1 Step1: \u7C7B\u52A0\u8F7D\u68C0\u67E5 \u865A\u62DF\u673A\u9047\u5230\u4E00\u6761new\u6307\u4EE4\u65F6\uFF0C\u9996\u5148\u5C06\u53BB\u68C0\u67E5\u8FD9\u4E2A\u6307\u5B9A\u7684\u53C2\u6570\u662F\u5426\u80FD\u5728\u5E38\u91CF\u6C60\u4E2D\u5B9A\u4F4D\u5230\u8FD9\u4E2A\u7C7B\u7684\u7B26\u53F7\u5F15\u7528\uFF0C\u5E76\u4E14\u68C0\u67E5\u8FD9\u4E2A\u7B26\u53F7\u5F15\u7528\u4EE3\u8868\u7C7B\u662F\u5426\u5DF2\u88AB\u52A0\u8F7D\u8FC7\uFF0C\u89E3\u6790\u548C", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/HotSpot\u865A\u62DF\u673A\u5BF9\u8C61\u521B\u5EFA.html", "/java/jvm/HotSpot%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA", "/java/jvm/HotSpot\u865A\u62DF\u673A\u5BF9\u8C61\u521B\u5EFA.md", "/java/jvm/HotSpot%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA.md"]],
  ["v-6e7a620a", "/java/jvm/JVM%E9%9D%A2%E8%AF%95%E6%8F%90%E9%97%AE.html", { "title": "JVM\u9762\u8BD5\u63D0\u95EE", "type": "article", "readingTime": { "minutes": 1.25, "words": 375 }, "excerpt": "JVM\u9762\u8BD5\u63D0\u95EE 1. \u5185\u5B58\u533A\u57DF\u7BC7 1. \u4ECB\u7ECD\u4E0BJava\u5185\u5B58\u533A\u57DF\uFF08\u8FD0\u884C\u65F6\u6570\u636E\u533A\uFF09 2. \u54EA\u4E9B\u662F\u7EBF\u7A0B\u79C1\u6709\u7684\uFF1F\u54EA\u4E9B\u662F\u7EBF\u7A0B\u5171\u4EAB\u7684\uFF1F 3. \u7A0B\u5E8F\u8BA1\u6570\u5668\u90FD\u6709\u54EA\u4E9B\u4F5C\u7528\uFF1F 4. java\u865A\u62DF\u673A\u6808\u6709\u54EA\u4E9B\u4F5C\u7528\uFF1F 5. \u672C\u5730\u65B9\u6CD5\u6808\u548C\u865A\u62DF\u673A\u6808\u7684\u533A\u522B\uFF1F 6. \u8BE6\u7EC6\u4ECB\u7ECD\u4E00\u4E0Bjava \u5806\uFF1F 7. \u65B0\u751F\u4EE3\u5982\u4F55\u664B\u5347\u5230\u8001\u5E74\u4EE3\u7684\uFF1F 2. \u5783\u573E\u56DE\u6536\u7BC7 1. JVM \u662F\u5982\u4F55\u8FDB\u884C\u5783\u573E\u56DE\u6536\u7684\uFF1F 2. \u6211", "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/JVM\u9762\u8BD5\u63D0\u95EE.html", "/java/jvm/JVM%E9%9D%A2%E8%AF%95%E6%8F%90%E9%97%AE", "/java/jvm/JVM\u9762\u8BD5\u63D0\u95EE.md", "/java/jvm/JVM%E9%9D%A2%E8%AF%95%E6%8F%90%E9%97%AE.md"]],
  ["v-70cde54c", "/java/jvm/Java%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F.html", { "title": "Java\u5185\u5B58\u533A\u57DF", "type": "article", "readingTime": { "minutes": 10.24, "words": 3073 }, "excerpt": "Java\u5185\u5B58\u533A\u57DF 1. \u5E38\u89C1\u9762\u8BD5\u9898 1.1 \u57FA\u672C\u95EE\u9898 \u4ECB\u7ECD\u4E0BJava\u5185\u5B58\u533A\u57DF\uFF08\u8FD0\u884C\u65F6\u6570\u636E\u533A\uFF09; Java\u5BF9\u8C61\u7684\u521B\u5EFA\u8FC7\u7A0B\uFF08\u4E94\u6B65\uFF0C\u5FC5\u987B\u9ED8\u5199\u51FA\u6765\u5E76\u4E14\u77E5\u9053\u6BCF\u4E00\u6B65\u865A\u62DF\u673A\u505A\u4E86\u4EC0\u4E48\uFF09; \u5BF9\u8C61\u7684\u8BBF\u95EE\u5B9A\u4F4D\u7684\u4E24\u79CD\u65B9\u5F0F\uFF08\u53E5\u67C4\u548C\u76F4\u63A5\u6307\u9488\u4E24\u79CD\u65B9\u5F0F\uFF09; 1.2 \u62D3\u5C55\u95EE\u9898 Stringt \u7C7B\u548C\u5E38\u91CF\u6C60; 8\u79CD\u57FA\u672C\u7C7B\u578B\u7684\u5305\u88C5\u7C7B\u548C\u5E38\u91CF\u6C60; 2 \u6982\u8FF0 \u5BF9\u4E8Ejava\u7A0B\u5E8F\u5458\u6765\u8BF4\uFF0C\u5728\u865A\u62DF\u673A\u81EA\u52A8\u5185\u5B58\u7BA1\u7406", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/Java\u5185\u5B58\u533A\u57DF.html", "/java/jvm/Java%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F", "/java/jvm/Java\u5185\u5B58\u533A\u57DF.md", "/java/jvm/Java%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F.md"]],
  ["v-6cec0ebc", "/java/jvm/", { "title": "Jvm", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.04, "words": 13 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/index.html", "/java/jvm/README.md"]],
  ["v-28b05c99", "/java/jvm/%E5%B8%B8%E8%A7%81%E7%9A%84JVM%E8%AE%BE%E7%BD%AE.html", { "title": "\u5E38\u89C1\u7684JVM\u8BBE\u7F6E", "type": "article", "readingTime": { "minutes": 0.16, "words": 48 }, "excerpt": "\u5E38\u89C1\u7684JVM\u8BBE\u7F6E \u53C2\u8003\u6587\u7AE0 JDK8 JVM\u53C2\u6570\u4E0E\u5B9E\u9645\u73AF\u5883\u4E2D\u7684\u4F18\u5316\u914D\u7F6E\u5B9E\u8DF5 JVM\u5806\u5185\u5B58\u548C\u975E\u5806\u5185\u5B58", "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/\u5E38\u89C1\u7684JVM\u8BBE\u7F6E.html", "/java/jvm/%E5%B8%B8%E8%A7%81%E7%9A%84JVM%E8%AE%BE%E7%BD%AE", "/java/jvm/\u5E38\u89C1\u7684JVM\u8BBE\u7F6E.md", "/java/jvm/%E5%B8%B8%E8%A7%81%E7%9A%84JVM%E8%AE%BE%E7%BD%AE.md"]],
  ["v-48579df1", "/java/thread/", { "title": "\u591A\u7EBF\u7A0B\u4E0E\u5E76\u53D1", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.06, "words": 18 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/thread/index.html", "/java/thread/README.md"]],
  ["v-30d7209a", "/java/jvm/classload/", { "title": "Jvm-\u7C7B\u52A0\u8F7D\u5668", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/classload/index.html", "/java/jvm/classload/README.md"]],
  ["v-7e29c70a", "/java/jvm/classload/tomcat%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8.html", { "title": "tomcat\u7C7B\u52A0\u8F7D\u5668", "type": "article", "readingTime": { "minutes": 6.62, "words": 1985 }, "excerpt": "tomcat\u7C7B\u52A0\u8F7D\u5668 \u901A\u8FC7\u524D\u6587\u6211\u4EEC\u5DF2\u7ECF\u4E86\u89E3\u4E86\u7C7B\u52A0\u8F7D\u5668\u4EE5\u53CA\u53CC\u4EB2\u59D4\u6D3E\u6A21\u578B\uFF0C\u5E76\u4E14\u4E86\u89E3\u4E3A\u4EC0\u4E48\u4F7F\u7528\u53CC\u4EB2\u59D4\u6D3E\u6A21\u578B\u3002\u4F46\u6211\u4EEC\u8003\u8651\u4E00\u4E0B\u6211\u4EECtomcat \u4E2D\u7684\u573A\u666F \u4E00\u4E2Aweb\u5BB9\u5668\u53EF\u80FD\u9700\u8981\u90E8\u7F72\u4E24\u4E2A\u5E94\u7528\u7A0B\u5E8F\uFF0C\u4E0D\u540C\u7684\u5E94\u7528\u7A0B\u5E8F\u53EF\u80FD\u4F1A\u4F9D\u8D56\u540C\u4E00\u4E2A\u7B2C\u4E09\u65B9\u7C7B\u5E93\u7684\u4E0D\u540C\u7248\u672C\u3002\u4E0D\u80FD\u8981\u6C42\u540C\u4E00\u4E2A\u7C7B\u5E93\u5728\u540C\u4E00\u4E2A\u670D\u52A1\u5668\u53EA\u6709\u4E00\u4EFD\uFF0C\u56E0\u6B64\u8981\u4FDD\u8BC1\u6BCF\u4E2A\u5E94\u7528\u7A0B\u5E8F\u7684\u7C7B\u5E93\u90FD\u662F\u72EC\u7ACB\u7684\uFF0C\u4FDD\u8BC1\u76F8\u4E92\u9694\u79BB\u3002; \u5982\u679C\u6211\u4EEC\u4F7F\u7528\u53CC\u4EB2\u59D4\u6D3E\u6A21\u578B", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/classload/tomcat\u7C7B\u52A0\u8F7D\u5668.html", "/java/jvm/classload/tomcat%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8", "/java/jvm/classload/tomcat\u7C7B\u52A0\u8F7D\u5668.md", "/java/jvm/classload/tomcat%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8.md"]],
  ["v-55227aff", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8.html", { "title": "\u7C7B\u52A0\u8F7D\u5668", "type": "article", "readingTime": { "minutes": 4.37, "words": 1310 }, "excerpt": "\u7C7B\u52A0\u8F7D\u5668 1. \u56DE\u987E\u7C7B\u52A0\u8F7D\u8FC7\u7A0B \u7C7B\u52A0\u8F7D\u8FC7\u7A0B\uFF1A\u52A0\u8F7D->\u8FDE\u63A5->\u521D\u59CB\u5316\u3002\u8FDE\u63A5\u8FC7\u7A0B\u7531\u53EF\u4EE5\u5206\u6210\u4E09\u6B65\uFF1A\u9A8C\u8BC1->\u51C6\u5907->\u89E3\u6790 \u4E00\u4E2A\u975E\u6570\u7EC4\u7C7B\u7684\u52A0\u8F7D\u9636\u6BB5\uFF08\u52A0\u8F7D\u9636\u6BB5\u83B7\u53D6\u7C7B\u7684\u4E8C\u8FDB\u5236\u5B57\u8282\u6D41\u7684\u52A8\u4F5C\uFF09\u662F\u53EF\u63A7\u6700\u5F3A\u7684\u9636\u6BB5\uFF0C\u8FD9\u4E00\u6B65\u6211\u4EEC\u53EF\u4EE5\u53BB\u5B8C\u6210\u8FD8\u53EF\u4EE5\u81EA\u5B9A\u4E49\u7C7B\u52A0\u8F7D\u5668\u53BB\u63A7\u5236\u5B57\u8282\u6D41\u7684\u83B7\u53D6\u65B9\u5F0F\uFF08\u91CD\u5199\u4E00\u4E2A\u7C7B\u52A0\u8F7D\u5668\u7684 loadClass() \u65B9\u6CD5\uFF09\u3002\u6570\u7EC4\u7C7B\u578B\u4E0D\u901A\u8FC7\u7C7B\u52A0\u8F7D\u5668\u521B\u5EFA\uFF0C\u4ED6\u7531Java\u865A\u62DF\u673A\u76F4\u63A5\u521B", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/classload/\u7C7B\u52A0\u8F7D\u5668.html", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8", "/java/jvm/classload/\u7C7B\u52A0\u8F7D\u5668.md", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8.md"]],
  ["v-121c2789", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8%E5%B8%B8%E8%A7%81%E9%9D%A2%E8%AF%95.html", { "title": "\u7C7B\u52A0\u8F7D\u5668\uFF08\u5E38\u89C1\u9762\u8BD5\uFF09", "type": "article", "readingTime": { "minutes": 3.72, "words": 1115 }, "excerpt": "\u7C7B\u52A0\u8F7D\u5668\uFF08\u5E38\u89C1\u9762\u8BD5\uFF09 \u9762\u8BD5\u5B98\uFF1A\u8BF7\u8BF4\u8BF4\u4F60\u7406\u89E3\u7684\u7C7B\u52A0\u8F7D\u5668\u3002 ------ \u6211\uFF1A\u901A\u8FC7\u4E00\u4E2A\u7C7B\u7684\u5168\u9650\u5B9A\u540D\u6765\u83B7\u53D6\u63CF\u8FF0\u6B64\u7C7B\u7684\u4E8C\u8FDB\u5236\u5B57\u8282\u6D41\u8FD9\u4E2A\u52A8\u4F5C\u653E\u5230Java\u865A\u62DF\u673A\u5916\u90E8\u53BB\u5B9E\u73B0\uFF0C\u4EE5\u4FBF\u8BA9\u5E94\u7528\u7A0B\u5E8F\u81EA\u5DF1\u51B3\u5B9A\u5982\u4F55\u53BB\u83B7\u53D6\u6240\u9700\u8981\u7684\u7C7B\u3002\u5B9E\u73B0\u8FD9\u4E2A\u52A8\u4F5C\u7684\u4EE3\u7801\u6A21\u5757\u79F0\u4E3A\u201C\u7C7B\u52A0\u8F7D\u5668\u201D\u3002 \u9762\u8BD5\u5B98\uFF1A\u8BF4\u8BF4\u6709\u54EA\u51E0\u79CD\u7C7B\u52A0\u8F7D\u5668\uFF0C\u4ED6\u4EEC\u7684\u804C\u8D23\u5206\u522B\u662F\u4EC0\u4E48\uFF0C\u4ED6\u4EEC\u4E4B\u524D\u5B58\u5728\u4EC0\u4E48\u6837\u7684\u7EA6\u5B9A\u3002 ------ \u6211\uFF1Aemmmm\uFF0C\u6211\u5728", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/classload/\u7C7B\u52A0\u8F7D\u5668\u5E38\u89C1\u9762\u8BD5.html", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8%E5%B8%B8%E8%A7%81%E9%9D%A2%E8%AF%95", "/java/jvm/classload/\u7C7B\u52A0\u8F7D\u5668\u5E38\u89C1\u9762\u8BD5.md", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8%E5%B8%B8%E8%A7%81%E9%9D%A2%E8%AF%95.md"]],
  ["v-302b9660", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B.html", { "title": "\u7C7B\u52A0\u8F7D\u8FC7\u7A0B", "type": "article", "readingTime": { "minutes": 5.41, "words": 1622 }, "excerpt": "\u7C7B\u52A0\u8F7D\u8FC7\u7A0B Class \u6587\u4EF6\u9700\u8981\u52A0\u8F7D\u5230\u865A\u62DF\u673A\u4E2D\u4E4B\u540E\u624D\u80FD\u8FD0\u884C\u548C\u4F7F\u7528\uFF0C\u90A3\u4E48\u865A\u62DF\u673A\u662F\u5982\u4F55\u52A0\u8F7D\u8FD9\u4E9BClass\u6587\u4EF6\u5462\uFF1F \u7CFB\u7EDF\u52A0\u8F7DClass\u7C7B\u578B\u7684\u6587\u4EF6\u4E3B\u8981\u4E09\u6B65\uFF1A\u52A0\u8F7D->\u8FDE\u63A5 ->\u521D\u59CB\u5316\u3002\u8FDE\u63A5\u8FC7\u7A0B\u53C8\u53EF\u4EE5\u5206\u4E3A\u4E09\u6B65\uFF1A\u9A8C\u8BC1->\u51C6\u5907->\u89E3\u6790\u3002 1. \u52A0\u8F7D \u7C7B\u52A0\u8F7D\u8FC7\u7A0B\u7684\u7B2C\u4E00\u6B65\uFF0C\u4E3B\u8981\u5B8C\u6210\u4E0B\u97623\u4EF6\u4E8B\u60C5 1. \u901A\u8FC7\u5168\u7C7B\u540D\u83B7\u53D6\u5B9A\u4E49\u6B64\u7C7B\u7684\u4E8C\u8FDB\u5236\u5B57\u8282\u6D41\uFF08\u8FD9\u4E2A\u6B65\u9AA4\u5C31\u662F\u7C7B\u52A0\u8F7D\u5668\uFF09 2. \u5C06\u5B57\u8282\u6D41\u6240", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/classload/\u7C7B\u52A0\u8F7D\u8FC7\u7A0B.html", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B", "/java/jvm/classload/\u7C7B\u52A0\u8F7D\u8FC7\u7A0B.md", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B.md"]],
  ["v-4ad388e6", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B%E7%B2%BE%E7%AE%80%E7%89%88.html", { "title": "\u7C7B\u52A0\u8F7D\u8FC7\u7A0B(\u7CBE\u7B80\u7248)", "type": "article", "readingTime": { "minutes": 4.98, "words": 1495 }, "excerpt": "\u7C7B\u52A0\u8F7D\u8FC7\u7A0B(\u7CBE\u7B80\u7248) 1. \u524D\u8A00 \u4E00\u4E2Ajava\u6587\u4EF6\u4ECE\u7F16\u7801\u5B8C\u6210\u5230\u6700\u7EC8\u6267\u884C\uFF0C\u4E00\u822C\u4E3B\u8981\u5305\u542B\u4E24\u4E2A\u8FC7\u7A0B \u7F16\u8BD1; \u8FD0\u884C; \u7F16\u8BD1\uFF0C\u5373\u628A\u6211\u4EEC\u5199\u597D\u7684java\u6587\u4EF6\uFF0C\u901A\u8FC7javac\u547D\u4EE4\u7F16\u8BD1\u6210\u5B57\u8282\u7801\uFF0C\u4E5F\u5C31\u662F\u6211\u4EEC\u5E38\u8BF4\u7684.class\u6587\u4EF6\u3002 \u8FD0\u884C\uFF0C\u5219\u662F\u628A\u7F16\u8BD1\u751F\u6210\u7684.class\u6587\u4EF6\u4EA4\u7ED9Java\u865A\u62DF\u673A(JVM)\u6267\u884C\u3002 \u800C\u6211\u4EEC\u6240\u8BF4\u7684\u7C7B\u52A0\u8F7D\u8FC7\u7A0B\u5373\u662F\u6307JVM\u865A\u62DF\u673A\u628A.class\u6587\u4EF6\u4E2D\u7C7B\u4FE1\u606F\u52A0\u8F7D\u8FDB\u5185", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/classload/\u7C7B\u52A0\u8F7D\u8FC7\u7A0B\u7CBE\u7B80\u7248.html", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B%E7%B2%BE%E7%AE%80%E7%89%88", "/java/jvm/classload/\u7C7B\u52A0\u8F7D\u8FC7\u7A0B\u7CBE\u7B80\u7248.md", "/java/jvm/classload/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B%E7%B2%BE%E7%AE%80%E7%89%88.md"]],
  ["v-53a8109a", "/java/jvm/gc/GC%E4%B8%AD%E5%AF%B9%E8%B1%A1%E8%87%AA%E6%95%91.html", { "title": "GC\u4E2D\u5BF9\u8C61\u81EA\u6551", "type": "article", "readingTime": { "minutes": 2.76, "words": 827 }, "excerpt": "GC\u4E2D\u5BF9\u8C61\u81EA\u6551 \u5373\u4F7F\u5728\u53EF\u8FBE\u6027\u5206\u6790\u7B97\u6CD5\u4E2D, \u88AB\u5224\u5B9A\u4E3A\u4E0D\u53EF\u8FBE\u7684\u5BF9\u8C61, \u4E5F\u5E76\u975E\u662F'\u975E\u6B7B\u4E0D\u53EF' \u7684, \u8FD9\u65F6\u5019\u4ED6\u4EEC\u6682\u5904\u4E8E'\u7F13\u5211' \u9636\u6BB5, \u8981\u771F\u6B63\u5BA3\u544A\u4E00\u4E2A\u5BF9\u8C61\u6B7B\u4EA1, \u81F3\u5C11\u8981\u7ECF\u5386\u4E24\u6B21\u6807\u8BB0\u8FC7\u7A0B: 1. \u5982\u679C\u5BF9\u8C61\u5931\u53BB\u5F15\u7528(\u5728\u8FDB\u884C\u53EF\u8FBE\u6027\u5206\u6790\u540E\u53D1\u73B0\u6CA1\u6709\u4E0E GC Roots \u76F8\u8FDE\u63A5\u7684\u5F15\u7528\u94FE), \u5E76\u4E14\u8BE5\u5BF9\u8C61\u7684 finalize()\u65B9\u6CD5\u672A\u8C03\u7528\u8FC7, \u8BE5\u5BF9\u8C61\u5C06\u4F1A\u88AB\u7B2C\u4E00\u6B21\u6807\u8BB0 2. \u5982\u679C\u8FD9\u4E2A", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/GC\u4E2D\u5BF9\u8C61\u81EA\u6551.html", "/java/jvm/gc/GC%E4%B8%AD%E5%AF%B9%E8%B1%A1%E8%87%AA%E6%95%91", "/java/jvm/gc/GC\u4E2D\u5BF9\u8C61\u81EA\u6551.md", "/java/jvm/gc/GC%E4%B8%AD%E5%AF%B9%E8%B1%A1%E8%87%AA%E6%95%91.md"]],
  ["v-ec827a8e", "/java/jvm/gc/JVM%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D%E4%B8%8E%E5%9B%9E%E6%94%B6.html", { "title": "JVM \u5185\u5B58\u5206\u914D\u4E0E\u56DE\u6536", "type": "article", "readingTime": { "minutes": 4.91, "words": 1473 }, "excerpt": "JVM \u5185\u5B58\u5206\u914D\u4E0E\u56DE\u6536 1. JVM \u5185\u5B58\u5206\u914D\u4E0E\u56DE\u6536 Java \u7684\u81EA\u52A8\u5185\u5B58\u7BA1\u7406\u4E3B\u8981\u662F\u9488\u5BF9\u8C61\u5185\u5B58\u7684\u56DE\u6536\u548C\u5BF9\u8C61\u7684\u5185\u5B58\u7684\u5206\u914D\u3002\u540C\u65F6\uFF0Cjava \u81EA\u52A8\u5185\u5B58\u7BA1\u7406\u6700\u6838\u5FC3\u7684\u529F\u80FD\u662F \u5806\u5185\u5B58\u4E2D\u7684\u5BF9\u8C61\u5206\u914D\u4E0E\u56DE\u6536 Java \u5806\u662F\u5783\u573E\u6536\u96C6\u5668\u7BA1\u7406\u7684\u4E3B\u8981\u533A\u57DF\uFF0C\u56E0\u6B64\u4E5F\u88AB\u79F0\u4F5CGC \u5806\uFF08Garbage Collected Heap\uFF09.\u4ECE\u5783\u573E\u56DE\u6536\u7684\u89D2\u5EA6\uFF0C\u7531\u4E8E\u73B0\u5728\u6536\u96C6\u5668\u57FA\u672C\u90FD\u91C7\u7528\u5206\u4EE3\u5783\u573E\u6536\u96C6\u7B97\u6CD5\uFF0C", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/JVM\u5185\u5B58\u5206\u914D\u4E0E\u56DE\u6536.html", "/java/jvm/gc/JVM%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D%E4%B8%8E%E5%9B%9E%E6%94%B6", "/java/jvm/gc/JVM\u5185\u5B58\u5206\u914D\u4E0E\u56DE\u6536.md", "/java/jvm/gc/JVM%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D%E4%B8%8E%E5%9B%9E%E6%94%B6.md"]],
  ["v-c3f81230", "/java/jvm/gc/JVM%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6.html", { "title": "JVM\u5783\u573E\u56DE\u6536", "type": "article", "readingTime": { "minutes": 0.77, "words": 230 }, "excerpt": "JVM\u5783\u573E\u56DE\u6536 1. \u5783\u573E\u56DE\u6536\u5E38\u89C1\u9762\u8BD5\u9898 \u5982\u4F55\u5224\u65AD\u5BF9\u8C61\u662F\u5426\u6B7B\u4EA1\uFF08\u4E24\u79CD\u65B9\u6CD5\uFF09; \u7B80\u5355\u7684\u4ECB\u7ECD\u4E00\u4E0B\u5F3A\u5F15\u7528\u3001\u8F6F\u5F15\u7528\u3001\u5F31\u5F15\u7528\u3001\u865A\u5F15\u7528\uFF08\u865A\u5F15\u7528\u4E0E\u8F6F\u5F15\u7528\u548C\u5F31\u5F15\u7528\u7684\u533A\u522B\u3001\u4F7F\u7528\u8F6F\u5F15\u7528\u80FD\u5E26\u6765\u7684\u597D\u5904\uFF09; \u5982\u4F55\u5224\u65AD\u4E00\u4E2A\u5E38\u91CF\u662F\u5E9F\u5F03\u5E38\u91CF; \u5982\u4F55\u5224\u65AD\u4E00\u4E2A\u7C7B\u662F\u65E0\u7528\u7C7B; \u5783\u573E\u6536\u96C6\u6709\u54EA\u4E9B\u7B97\u6CD5\uFF0C\u5404\u81EA\u7684\u7279\u70B9; HotSpot \u4E3A\u4EC0\u4E48\u8981\u5206\u4E3A\u65B0\u751F\u4EE3\u548C\u8001\u5E74\u4EE3; \u5E38\u89C1\u7684\u5783\u573E\u56DE\u6536\u5668\u6709\u54EA\u4E9B; \u4ECB\u7ECD\u4E00\u4E0BCMS,", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/JVM\u5783\u573E\u56DE\u6536.html", "/java/jvm/gc/JVM%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6", "/java/jvm/gc/JVM\u5783\u573E\u56DE\u6536.md", "/java/jvm/gc/JVM%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6.md"]],
  ["v-b367d25a", "/java/jvm/gc/Java%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9%E5%90%88%E9%80%82%E7%9A%84%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%99%A8.html", { "title": "Java\u5982\u4F55\u9009\u62E9\u5408\u9002\u7684\u5783\u573E\u56DE\u6536\u5668", "type": "article", "readingTime": { "minutes": 4.29, "words": 1288 }, "excerpt": "Java\u5982\u4F55\u9009\u62E9\u5408\u9002\u7684\u5783\u573E\u56DE\u6536\u5668 1. \u7B80\u4ECB \u5783\u573E\u56DE\u6536\u5668\u662F\u5185\u5B58\u56DE\u6536\u7684\u5177\u4F53\u5B9E\u73B0\uFF0CJDK\u81EA\u5E26\u7684\u5783\u573E\u56DE\u6536\u5668\u5DF2\u7ECF\u5B8C\u6210\u96C6\u6210\u5783\u573E\u56DE\u6536\u548C\u6E05\u7406\u7B97\u6CD5\uFF0C\u4E1A\u52A1\u7A0B\u5E8F\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E\u53C2\u6570\u9009\u62E9\u5783\u573E\u56DE\u6536\u5668\uFF0C\u865A\u62DF\u673A\u7528\u5230\u76847\u79CD\u7ECF\u5178\u7684\u5783\u573E\u56DE\u6536\u5668\u5982\u4E0B\u8868\u3002\u6839\u636E\u9002\u7528\u5185\u5B58\u533A\u57DF\u4E0D\u540C\uFF0CJDK\u81EA\u5E26\u7684\u5783\u573E\u56DE\u6536\u5668\u53EF\u5206\u4E3A\u65B0\u751F\u4EE3\u56DE\u6536\u5668\u548C\u8001\u5E74\u4EE3\u56DE\u6536\u5668\uFF0C\u4E24\u8005\u53EF\u4EE5\u914D\u5408\u4F7F\u7528\u3002\u65B0\u751F\u4EE3\u56DE\u6536\u5668\u7528\u4E8E\u5806\u7A7A\u95F4\u4E2D\u65B0\u751F\u4EE3\u533A\u57DF\u7684\u5783\u573E\u56DE\u6536\uFF0C\u8001\u5E74\u4EE3", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/Java\u5982\u4F55\u9009\u62E9\u5408\u9002\u7684\u5783\u573E\u56DE\u6536\u5668.html", "/java/jvm/gc/Java%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9%E5%90%88%E9%80%82%E7%9A%84%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%99%A8", "/java/jvm/gc/Java\u5982\u4F55\u9009\u62E9\u5408\u9002\u7684\u5783\u573E\u56DE\u6536\u5668.md", "/java/jvm/gc/Java%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9%E5%90%88%E9%80%82%E7%9A%84%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%99%A8.md"]],
  ["v-4ede3af1", "/java/jvm/gc/", { "title": "Jvm-\u5783\u573E\u56DE\u6536GC", "type": "article", "readingTime": { "minutes": 0.05, "words": 16 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/index.html", "/java/jvm/gc/README.md"]],
  ["v-238be5db", "/java/jvm/gc/gc%E6%97%A5%E5%BF%97%E5%88%86%E6%9E%90.html", { "title": "gc\u65E5\u5FD7\u5206\u6790", "type": "article", "readingTime": { "minutes": 13.24, "words": 3973 }, "excerpt": "gc\u65E5\u5FD7\u5206\u6790 1. \u4EC0\u4E48\u65F6\u5019\u4F1A\u53D1\u751F\u5783\u573E\u6536\u96C6 \u9996\u5148\u6211\u4EEC\u6765\u770B\u4E00\u4E2A\u95EE\u9898\uFF0C\u90A3\u5C31\u662F\u4EC0\u4E48\u65F6\u5019\u4F1A\u53D1\u751F\u5783\u573E\u56DE\u6536\uFF1F \u5728Java\u4E2D\uFF0CGC\u662F\u7531JVM\u81EA\u52A8\u5B8C\u6210\u7684\uFF0C\u6839\u636EJVM\u7CFB\u7EDF\u73AF\u5883\u800C\u5B9A\uFF0C\u6240\u4EE5\u65F6\u673A\u662F\u4E0D\u786E\u5B9A\u7684\u3002 \u5F53\u7136\uFF0C\u6211\u4EEC\u53EF\u4EE5\u624B\u52A8\u8FDB\u884C\u5783\u573E\u56DE\u6536\uFF0C \u6BD4\u5982\u8C03\u7528System.gc()\u65B9\u6CD5\u901A\u77E5JVM\u8FDB\u884C\u4E00\u6B21\u5783\u573E\u56DE\u6536\uFF0C\u4F46\u662F\u5177\u4F53\u4EC0\u4E48\u65F6\u523B\u8FD0\u884C\u4E5F\u65E0\u6CD5\u63A7\u5236\u3002\u4E5F\u5C31\u662F\u8BF4System.gc()\u53EA\u662F\u901A\u77E5\u8981\u56DE\u6536\uFF0C\u4EC0", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/gc\u65E5\u5FD7\u5206\u6790.html", "/java/jvm/gc/gc%E6%97%A5%E5%BF%97%E5%88%86%E6%9E%90", "/java/jvm/gc/gc\u65E5\u5FD7\u5206\u6790.md", "/java/jvm/gc/gc%E6%97%A5%E5%BF%97%E5%88%86%E6%9E%90.md"]],
  ["v-38bac3e7", "/java/jvm/gc/%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E5%99%A8.html", { "title": "\u5783\u573E\u6536\u96C6\u5668", "type": "article", "readingTime": { "minutes": 7.43, "words": 2229 }, "excerpt": "\u5783\u573E\u6536\u96C6\u5668 \u5982\u679C\u8BF4\u6536\u96C6\u7B97\u6CD5\u662F\u5185\u5B58\u56DE\u6536\u7684\u65B9\u6CD5\u8BBA\uFF0C\u90A3\u4E48\u5783\u573E\u6536\u96C6\u5668\u5C31\u662F\u5185\u5B58\u56DE\u6536\u7684\u5177\u4F53\u5B9E\u73B0\u3002 \u867D\u7136\u6211\u4EEC\u5BF9\u5404\u4E2A\u6536\u96C6\u5668\u8FDB\u884C\u6BD4\u8F83\uFF0C\u4F46\u5E76\u975E\u8981\u6311\u9009\u51FA\u4E00\u4E2A\u6700\u597D\u7684\u6536\u96C6\u5668\u3002\u56E0\u4E3A\u76F4\u5230\u73B0\u5728\u4E3A\u6B62\u8FD8\u6CA1\u6709\u6700\u597D\u7684\u5783\u573E\u6536\u96C6\u5668\u51FA\u73B0\uFF0C\u66F4\u52A0\u6CA1\u6709\u4E07\u80FD\u7684\u5783\u573E\u6536\u96C6\u5668\uFF0C\u6211\u4EEC\u80FD\u505A\u7684\u5C31\u662F\u6839\u636E\u5177\u4F53\u5E94\u7528\u573A\u666F\u9009\u62E9\u9002\u5408\u81EA\u5DF1\u7684\u5783\u573E\u6536\u96C6\u5668\u3002\u8BD5\u60F3\u4E00\u4E0B\uFF1A\u5982\u679C\u6709\u4E00\u79CD\u56DB\u6D77\u4E4B\u5185\u3001\u4EFB\u4F55\u573A\u666F\u4E0B\u90FD\u9002\u7528\u7684\u5B8C\u7F8E\u6536\u96C6\u5668\u5B58\u5728\uFF0C\u90A3\u4E48\u6211\u4EEC\u7684 HotSp", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/\u5783\u573E\u6536\u96C6\u5668.html", "/java/jvm/gc/%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E5%99%A8", "/java/jvm/gc/\u5783\u573E\u6536\u96C6\u5668.md", "/java/jvm/gc/%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E5%99%A8.md"]],
  ["v-0266f14f", "/java/jvm/gc/%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E7%AE%97%E6%B3%95.html", { "title": "\u5783\u573E\u6536\u96C6\u5668\u5783\u573E\u6536\u96C6\u7B97\u6CD5", "type": "article", "readingTime": { "minutes": 2.05, "words": 614 }, "excerpt": "\u5783\u573E\u6536\u96C6\u5668\u5783\u573E\u6536\u96C6\u7B97\u6CD5 1. \u6807\u8BB0-\u6E05\u9664\u7B97\u6CD5 \u8BE5\u7B97\u6CD5\u5206\u4E3A\u201C\u6807\u8BB0\u201D\u548C\u201C\u6E05\u9664\u201D\u9636\u6BB5\uFF1A\u9996\u5148\u6807\u8BB0\u51FA\u6240\u6709\u9700\u8981\u56DE\u6536\u7684\u5BF9\u8C61\uFF0C\u5728\u6807\u8BB0\u5B8C\u6210\u540E\u7EDF\u4E00\u56DE\u6536\u6240\u6709\u88AB\u6807\u8BB0\u7684\u5BF9\u8C61\u3002\u5B83\u662F\u6700\u57FA\u7840\u7684\u6536\u96C6\u7B97\u6CD5\uFF0C\u540E\u7EED\u7684\u7B97\u6CD5\u90FD\u662F\u5BF9\u5176\u4E0D\u8DB3\u8FDB\u884C\u6539\u8FDB\u5F97\u5230\u3002\u8FD9\u79CD\u5783\u573E\u6536\u96C6\u7B97\u6CD5\u4F1A\u5E26\u6765\u4E24\u4E2A\u660E\u663E\u7684\u95EE\u9898\uFF1A 1. \u6548\u7387\u95EE\u9898 2. \u7A7A\u95F4\u95EE\u9898\uFF08\u6807\u8BB0\u6E05\u9664\u540E\u4F1A\u4EA7\u751F\u5927\u91CF\u4E0D\u8FDE\u7EED\u7684\u788E\u7247\uFF09 2. \u590D\u5236\u7B97\u6CD5 \u4E3A\u4E86\u89E3\u51B3\u6548\u7387\u95EE\u9898\uFF0C\u201C\u590D\u5236\u201D\u6536\u96C6", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/\u5783\u573E\u6536\u96C6\u7B97\u6CD5.html", "/java/jvm/gc/%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E7%AE%97%E6%B3%95", "/java/jvm/gc/\u5783\u573E\u6536\u96C6\u7B97\u6CD5.md", "/java/jvm/gc/%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E7%AE%97%E6%B3%95.md"]],
  ["v-6b177d22", "/java/jvm/gc/%E5%AF%B9%E8%B1%A1%E5%B7%B2%E7%BB%8F%E6%AD%BB%E4%BA%A1.html", { "title": "\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1\uFF1F", "type": "article", "readingTime": { "minutes": 6.76, "words": 2028 }, "excerpt": "\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1\uFF1F \u5806\u4E2D\u51E0\u4E4E\u653E\u7740\u6240\u6709\u7684\u5BF9\u8C61\u5B9E\u4F8B\uFF0C\u5BF9\u5806\u5783\u573E\u56DE\u6536\u524D\u7684\u7B2C\u4E00\u6B65\u5C31\u662F\u5224\u65AD\u54EA\u4E9B\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1\uFF08\u5373\u4E0D\u80FD\u518D\u88AB\u4EFB\u4F55\u9014\u5F84\u4F7F\u7528\u7684\u5BF9\u8C61\uFF09\u3002 1. \u5982\u4F55\u5224\u65AD\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1 1.1 \u5F15\u7528\u8BA1\u6570\u6CD5 \u7ED9\u5BF9\u8C61\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u5F15\u7528\u8BA1\u6570\u5668\uFF0C\u6BCF\u5F53\u6709\u4E00\u4E2A\u5730\u65B9\u5F15\u7528\u4ED6\u3002\u8BA1\u6570\u5668\u5C31+1\uFF0C\u5F53\u5F15\u7528\u5931\u6548\uFF0C\u8BA1\u6570\u5668\u5C31\u51CF1.\u4EFB\u4F55\u65F6\u5019\u8BA1\u6570\u5668\u4E3A0 \u7684\u5BF9\u8C61\u5C31\u662F\u4E0D\u53EF\u80FD\u518D\u88AB\u4F7F\u7528\u7684 \u8FD9\u4E2A\u65B9\u6CD5\u5B9E\u73B0\u7B80\u5355\uFF0C\u6548\u7387\u9AD8\uFF0C\u4F46\u662F\u76EE\u524D\u4E3B\u6D41\u7684\u865A\u62DF\u673A\u4E2D", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/gc/\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1.html", "/java/jvm/gc/%E5%AF%B9%E8%B1%A1%E5%B7%B2%E7%BB%8F%E6%AD%BB%E4%BA%A1", "/java/jvm/gc/\u5BF9\u8C61\u5DF2\u7ECF\u6B7B\u4EA1.md", "/java/jvm/gc/%E5%AF%B9%E8%B1%A1%E5%B7%B2%E7%BB%8F%E6%AD%BB%E4%BA%A1.md"]],
  ["v-6baa537a", "/java/jvm/gc/%E7%BA%BF%E4%B8%8A%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5FullGC.html", { "title": "\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5FullGC(\u7CFB\u7EDF CPU \u7A81\u7136\u98D9\u5347\u4E14 GC \u9891\u7E41\uFF0C\u4F60\u8BE5\u5982\u4F55\u6392\u67E5)", "type": "article", "readingTime": { "minutes": 7.73, "words": 2318 }, "excerpt": "\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5FullGC(\u7CFB\u7EDF CPU \u7A81\u7136\u98D9\u5347\u4E14 GC \u9891\u7E41\uFF0C\u4F60\u8BE5\u5982\u4F55\u6392\u67E5) 1. \u80CC\u666F \u5904\u7406\u8FC7\u7EBF\u4E0A\u95EE\u9898\u7684\u540C\u5B66\u57FA\u672C\u4E0A\u90FD\u4F1A\u9047\u5230\u7CFB\u7EDF\u7A81\u7136\u8FD0\u884C\u7F13\u6162\uFF0CCPU 100%,\u4EE5\u53CAFull GC \u6B21\u6570\u8FC7\u591A\u7684\u95EE\u9898\u3002 2. \u521D\u6B65\u89E3\u51B3\u65B9\u6848 \u5982\u679C\u51FA\u73B0\u8BE5\u95EE\u9898\u5BFC\u81F4\u7EBF\u4E0A\u7CFB\u7EDF\u4E0D\u53EF\u7528\uFF0C\u90A3\u4E48\u9996\u5148\u9700\u8981\u505A\u7684\u5C31\u662F\uFF0C\u5BFC\u51FAjstack\u548C\u5185\u5B58\u4FE1\u606F\uFF0C\u7136\u540E\u91CD\u542F\u7CFB\u7EDF\u3002\u5C3D\u5FEB\u4FDD\u8BC1\u7CFB\u7EDF\u7684\u53EF\u7528\u6027\u3002 3. \u4EA7\u751F\u7684\u539F\u56E0 ", "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/gc/\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5FullGC.html", "/java/jvm/gc/%E7%BA%BF%E4%B8%8A%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5FullGC", "/java/jvm/gc/\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5FullGC.md", "/java/jvm/gc/%E7%BA%BF%E4%B8%8A%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5FullGC.md"]],
  ["v-a4db7fec", "/java/jvm/optimization/Java%E5%A0%86%E8%AE%BE%E7%BD%AE%E5%A4%9A%E5%A4%A7%E5%90%88%E9%80%82.html", { "title": "Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002", "type": "article", "readingTime": { "minutes": 1.66, "words": 497 }, "excerpt": "Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002 1. \u7B80\u4ECB \u9488\u5BF9\u5806\u7A7A\u95F4\u7684\u4F18\u5316\u662FJava\u6027\u80FD\u8C03\u4F18\u7684\u91CD\u70B9\u4E4B\u4E00\u3002\u5982\u679C\u6CA1\u6709\u8BBE\u7F6EJVM\u5806\u7A7A\u95F4\u5927\u5C0F\uFF0CJVM\u4F1A\u6839\u636E\u670D\u52A1\u5668\u7269\u7406\u5185\u5B58\u5927\u5C0F\u8BBE\u7F6E\u9ED8\u8BA4\u5806\u5927\u5C0F\u7684\u503C\u3002\u4F8B\u5982\uFF0C\u572864\u4F4D\u7684\u670D\u52A1\u5668\u7AEF\uFF0C \u5F53\u7269\u7406\u5185\u5B58\u5C0F\u4E8E192MB\u65F6\uFF0CJVM\u5806\u5927\u5C0F\u9ED8\u8BA4\u9009\u4E3A\u7269\u7406\u5185\u5B58\u7684\u4E00\u534A\uFF1B; \u5F53\u7269\u7406\u5185\u5B58\u5927192MB\u4E14\u5C0F\u4E8E128GB\u65F6\uFF0CJVM\u5806\u5927\u5C0F\u9ED8\u8BA4\u9009\u4E3A\u7269\u7406\u5185\u5B58\u7684\u56DB\u5206\u4E4B\u4E00\uFF1B; \u5F53\u7269\u7406\u5185\u5B58\u5927\u4E8E\u7B49", "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/optimization/Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002.html", "/java/jvm/optimization/Java%E5%A0%86%E8%AE%BE%E7%BD%AE%E5%A4%9A%E5%A4%A7%E5%90%88%E9%80%82", "/java/jvm/optimization/Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002.md", "/java/jvm/optimization/Java%E5%A0%86%E8%AE%BE%E7%BD%AE%E5%A4%9A%E5%A4%A7%E5%90%88%E9%80%82.md"]],
  ["v-d1478a00", "/java/jvm/optimization/", { "title": "Jvm-\u6027\u80FD\u8C03\u4F18", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/optimization/index.html", "/java/jvm/optimization/README.md"]],
  ["v-22b81989", "/java/jvm/optimization/jstack%E7%AD%89%E5%91%BD%E4%BB%A4%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.html", { "title": "jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406", "type": "article", "readingTime": { "minutes": 2.93, "words": 879 }, "excerpt": "jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406 1. \u5B9E\u73B0\u539F\u7406 1. jstack\u7B49\u547D\u4EE4\u4F1A\u4E0Ejvm\u8FDB\u7A0B\u5EFA\u7ACBsocket\u8FDE\u63A5 2. \u53D1\u9001\u5BF9\u5E94\u7684\u6307\u4EE4\uFF08jstack\u53D1\u9001\u4E86threaddump\u6267\u884C\uFF09 3. \u7136\u540E\u518D\u8BFB\u53D6\u8FD4\u56DE\u7684\u6570\u636E 2. jstack\u4F7F\u7528\u573A\u666F \u573A\u666F\uFF1AJava\u5E94\u7528\u6301\u7EED\u5360\u7528\u5F88\u9AD8CPU\uFF0C\u9700\u8981\u6392\u67E5\u4E00\u4E0B \u6A21\u62DF\uFF1A\u9020\u4E2A\u573A\u666F\u7B80\u5355\u6A21\u62DF\u4E0B\uFF0C\u6CA1\u4EC0\u4E48\u5B9E\u9645\u610F\u4E49\uFF0C\u4EC5\u4F5C\u6F14\u793A\u3002\u6211\u542F\u52A8\u4E86100\u4E2A\u7EBF\u7A0B\u6301\u7EED\u8BBF", "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/optimization/jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406.html", "/java/jvm/optimization/jstack%E7%AD%89%E5%91%BD%E4%BB%A4%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86", "/java/jvm/optimization/jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406.md", "/java/jvm/optimization/jstack%E7%AD%89%E5%91%BD%E4%BB%A4%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.md"]],
  ["v-69cfdb30", "/java/jvm/optimization/%E5%86%85%E5%AD%98%E6%BA%A2%E5%87%BA%E6%97%B6%E6%89%93%E5%8D%B0%E5%86%85%E5%AD%98%E4%BF%A1%E6%81%AF.html", { "title": "\u5185\u5B58\u6EA2\u51FA\u65F6\u6253\u5370\u5185\u5B58\u4FE1\u606F", "type": "article", "readingTime": { "minutes": 0.18, "words": 54 }, "excerpt": "\u5185\u5B58\u6EA2\u51FA\u65F6\u6253\u5370\u5185\u5B58\u4FE1\u606F \u6211\u4EEC\u5728\u9879\u76EE\u542F\u52A8\u7684\u65F6\u5019\u53EF\u4EE5\u6DFB\u52A0\u542F\u52A8\u914D\u7F6E \u8FD9\u6837\u5F53\u5185\u5B58\u6EA2\u51FA\u7684\u65F6\u5019\u5C31\u4F1A\u5C06\u65E5\u5FD7\u6253\u5370\u51FA\u6765", "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/optimization/\u5185\u5B58\u6EA2\u51FA\u65F6\u6253\u5370\u5185\u5B58\u4FE1\u606F.html", "/java/jvm/optimization/%E5%86%85%E5%AD%98%E6%BA%A2%E5%87%BA%E6%97%B6%E6%89%93%E5%8D%B0%E5%86%85%E5%AD%98%E4%BF%A1%E6%81%AF", "/java/jvm/optimization/\u5185\u5B58\u6EA2\u51FA\u65F6\u6253\u5370\u5185\u5B58\u4FE1\u606F.md", "/java/jvm/optimization/%E5%86%85%E5%AD%98%E6%BA%A2%E5%87%BA%E6%97%B6%E6%89%93%E5%8D%B0%E5%86%85%E5%AD%98%E4%BF%A1%E6%81%AF.md"]],
  ["v-058d8bb2", "/java/jvm/optimization/%E5%A6%82%E4%BD%95%E5%90%88%E7%90%86%E7%9A%84%E8%A7%84%E5%88%92JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.html", { "title": "\u5982\u4F55\u5408\u7406\u7684\u89C4\u5212 JVM \u6027\u80FD\u8C03\u4F18", "type": "article", "readingTime": { "minutes": 15.94, "words": 4783 }, "excerpt": '\u5982\u4F55\u5408\u7406\u7684\u89C4\u5212 JVM \u6027\u80FD\u8C03\u4F18 JVM\u6027\u80FD\u8C03\u4F18\u6D89\u53CA\u5230\u65B9\u65B9\u9762\u9762\u7684\u53D6\u820D\uFF0C\u5F80\u5F80\u662F\u7275\u4E00\u53D1\u800C\u52A8\u5168\u8EAB\uFF0C\u9700\u8981\u5168\u76D8\u8003\u8651\u5404\u65B9\u9762\u7684\u5F71\u54CD\u3002\u4F46\u4E5F\u6709\u4E00\u4E9B\u57FA\u7840\u7684\u7406\u8BBA\u548C\u539F\u5219\uFF0C\u7406\u89E3\u8FD9\u4E9B\u7406\u8BBA\u5E76\u9075\u5FAA\u8FD9\u4E9B\u539F\u5219\u4F1A\u8BA9\u4F60\u7684\u6027\u80FD\u8C03\u4F18\u4EFB\u52A1\u5C06\u4F1A\u66F4\u52A0\u8F7B\u677E\u3002\u4E3A\u4E86\u66F4\u597D\u7684\u7406\u89E3\u672C\u7BC7\u6240\u4ECB\u7ECD\u7684\u5185\u5BB9\u3002\u4F60\u9700\u8981\u5DF2\u7ECF\u4E86\u89E3\u548C\u9075\u5FAA\u4EE5\u4E0B\u5185\u5BB9: " 1\u3001\u5DF2\u4E86\u89E3jvm \u5783\u573E\u6536\u96C6\u5668" " 2\u3001\u5DF2\u4E86\u89E3jvm \u6027\u80FD\u76D1\u63A7\u5E38\u7528\u5DE5\u5177" " 3\u3001\u80FD\u591F', "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/optimization/\u5982\u4F55\u5408\u7406\u7684\u89C4\u5212JVM\u6027\u80FD\u8C03\u4F18.html", "/java/jvm/optimization/%E5%A6%82%E4%BD%95%E5%90%88%E7%90%86%E7%9A%84%E8%A7%84%E5%88%92JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98", "/java/jvm/optimization/\u5982\u4F55\u5408\u7406\u7684\u89C4\u5212JVM\u6027\u80FD\u8C03\u4F18.md", "/java/jvm/optimization/%E5%A6%82%E4%BD%95%E5%90%88%E7%90%86%E7%9A%84%E8%A7%84%E5%88%92JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.md"]],
  ["v-e5f5995e", "/java/jvm/tools/JDK%E7%9B%91%E6%8E%A7%E5%92%8C%E6%95%85%E9%9A%9C%E5%A4%84%E7%90%86%E5%B7%A5%E5%85%B7%E6%B1%87%E6%80%BB.html", { "title": "JDK\u76D1\u63A7\u548C\u6545\u969C\u5904\u7406\u5DE5\u5177\u6C47\u603B", "type": "article", "readingTime": { "minutes": 8.06, "words": 2417 }, "excerpt": "JDK\u76D1\u63A7\u548C\u6545\u969C\u5904\u7406\u5DE5\u5177\u6C47\u603B 1. JDK\u547D\u4EE4\u884C\u5DE5\u5177 \u8FD9\u4E9B\u547D\u4EE4\u5728JDK \u5B89\u88C5\u76EE\u5F55\u4E0B\u7684bin\u76EE\u5F55\u4E0B jps (JVM Process Status\uFF09: \u7C7B\u4F3C UNIX \u7684 ps \u547D\u4EE4\u3002\u7528\u6237\u67E5\u770B\u6240\u6709 Java \u8FDB\u7A0B\u7684\u542F\u52A8\u7C7B\u3001\u4F20\u5165\u53C2\u6570\u548C Java \u865A\u62DF\u673A\u53C2\u6570\u7B49\u4FE1\u606F\uFF1B; jstat\uFF08 JVM Statistics Monitoring Tool\uFF09: \u7528\u4E8E\u6536\u96C6 Hot", "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/tools/JDK\u76D1\u63A7\u548C\u6545\u969C\u5904\u7406\u5DE5\u5177\u6C47\u603B.html", "/java/jvm/tools/JDK%E7%9B%91%E6%8E%A7%E5%92%8C%E6%95%85%E9%9A%9C%E5%A4%84%E7%90%86%E5%B7%A5%E5%85%B7%E6%B1%87%E6%80%BB", "/java/jvm/tools/JDK\u76D1\u63A7\u548C\u6545\u969C\u5904\u7406\u5DE5\u5177\u6C47\u603B.md", "/java/jvm/tools/JDK%E7%9B%91%E6%8E%A7%E5%92%8C%E6%95%85%E9%9A%9C%E5%A4%84%E7%90%86%E5%B7%A5%E5%85%B7%E6%B1%87%E6%80%BB.md"]],
  ["v-0e23e8d6", "/java/jvm/tools/", { "title": "Jvm-\u8C03\u4F18\u5DE5\u5177", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/tools/index.html", "/java/jvm/tools/README.md"]],
  ["v-410a868a", "/java/thread/JUCCollection/BlockingQueue%E8%AF%A6%E8%A7%A3.html", { "title": "BlockingQueue\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 10.64, "words": 3193 }, "excerpt": "BlockingQueue\u8BE6\u89E3 0. \u9762\u8BD5\u9898 \u4EC0\u4E48\u662FBlockingDeque?; BlockingQueue\u5927\u5BB6\u65CF\u6709\u54EA\u4E9B? ArrayBlockingQueue, DelayQueue, LinkedBlockingQueue, SynchronousQueue...; BlockingQueue\u9002\u5408\u7528\u5728\u4EC0\u4E48\u6837\u7684\u573A\u666F?; BlockingQueue\u5E38\u7528\u7684\u65B9", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCCollection/BlockingQueue\u8BE6\u89E3.html", "/java/thread/JUCCollection/BlockingQueue%E8%AF%A6%E8%A7%A3", "/java/thread/JUCCollection/BlockingQueue\u8BE6\u89E3.md", "/java/thread/JUCCollection/BlockingQueue%E8%AF%A6%E8%A7%A3.md"]],
  ["v-46552bec", "/java/thread/JUCCollection/", { "title": "JUC\u96C6\u5408", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.06, "words": 17 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/JUCCollection/index.html", "/java/thread/JUCCollection/README.md"]],
  ["v-1839a060", "/java/thread/JUCExecutor/FutureTask%E8%AF%A6%E8%A7%A3.html", { "title": "FutureTask\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 11.42, "words": 3425 }, "excerpt": 'FutureTask\u8BE6\u89E3 0. \u9762\u8BD5\u9898 FutureTask\u7528\u6765\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\u7684? \u4E3A\u4EC0\u4E48\u4F1A\u51FA\u73B0?; FutureTask\u7C7B\u7ED3\u6784\u5173\u7CFB\u600E\u4E48\u6837\u7684?; FutureTask\u7684\u7EBF\u7A0B\u5B89\u5168\u662F\u7531\u4EC0\u4E48\u4FDD\u8BC1\u7684?; FutureTask\u7ED3\u679C\u8FD4\u56DE\u673A\u5236?; FutureTask\u5185\u90E8\u8FD0\u884C\u72B6\u6001\u7684\u8F6C\u53D8?; FutureTask\u901A\u5E38\u4F1A\u600E\u4E48\u7528? \u4E3E\u4F8B\u8BF4\u660E\u3002; 1. \u7B80\u4ECB "Future \u8868\u793A\u4E86', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCExecutor/FutureTask\u8BE6\u89E3.html", "/java/thread/JUCExecutor/FutureTask%E8%AF%A6%E8%A7%A3", "/java/thread/JUCExecutor/FutureTask\u8BE6\u89E3.md", "/java/thread/JUCExecutor/FutureTask%E8%AF%A6%E8%A7%A3.md"]],
  ["v-311a40b5", "/java/thread/JUCExecutor/", { "title": "JUC\u7EBF\u7A0B\u6C60", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.06, "words": 18 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/JUCExecutor/index.html", "/java/thread/JUCExecutor/README.md"]],
  ["v-0d063008", "/java/thread/JUCExecutor/ScheduledThreadPoolExecutor%E8%AF%A6%E8%A7%A3.html", { "title": "ScheduledThreadPoolExecutor\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 10.6, "words": 3180 }, "excerpt": "ScheduledThreadPoolExecutor\u8BE6\u89E3 0. \u9762\u8BD5\u9898 ScheduledThreadPoolExecutor\u8981\u89E3\u51B3\u4EC0\u4E48\u6837\u7684\u95EE\u9898?; ScheduledThreadPoolExecutor\u76F8\u6BD4ThreadPoolExecutor\u6709\u54EA\u4E9B\u7279\u6027?; ScheduledThreadPoolExecutor\u6709\u4EC0\u4E48\u6837\u7684\u6570\u636E\u7ED3\u6784\uFF0C\u6838\u5FC3\u5185\u90E8\u7C7B\u548C\u62BD\u8C61\u7C7B?; ", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCExecutor/ScheduledThreadPoolExecutor\u8BE6\u89E3.html", "/java/thread/JUCExecutor/ScheduledThreadPoolExecutor%E8%AF%A6%E8%A7%A3", "/java/thread/JUCExecutor/ScheduledThreadPoolExecutor\u8BE6\u89E3.md", "/java/thread/JUCExecutor/ScheduledThreadPoolExecutor%E8%AF%A6%E8%A7%A3.md"]],
  ["v-b3d2e942", "/java/thread/JUCExecutor/ThreadPoolExecutor%E8%AF%A6%E8%A7%A3.html", { "title": "ThreadPoolExecutor\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 25.21, "words": 7564 }, "excerpt": "ThreadPoolExecutor\u8BE6\u89E3 0. \u9762\u8BD5\u9898\u76EE \u4E3A\u4EC0\u4E48\u8981\u6709\u7EBF\u7A0B\u6C60?; Java\u662F\u5B9E\u73B0\u548C\u7BA1\u7406\u7EBF\u7A0B\u6C60\u6709\u54EA\u4E9B\u65B9\u5F0F? \u8BF7\u7B80\u5355\u4E3E\u4F8B\u5982\u4F55\u4F7F\u7528\u3002; \u4E3A\u4EC0\u4E48\u5F88\u591A\u516C\u53F8\u4E0D\u5141\u8BB8\u4F7F\u7528Executors\u53BB\u521B\u5EFA\u7EBF\u7A0B\u6C60? \u90A3\u4E48\u63A8\u8350\u600E\u4E48\u4F7F\u7528\u5462?; ThreadPoolExecutor\u6709\u54EA\u4E9B\u6838\u5FC3\u7684\u914D\u7F6E\u53C2\u6570? \u8BF7\u7B80\u8981\u8BF4\u660E; ThreadPoolExecutor\u53EF\u4EE5\u521B\u5EFA\u54EA\u662F\u54EA\u4E09\u79CD\u7EBF\u7A0B\u6C60", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCExecutor/ThreadPoolExecutor\u8BE6\u89E3.html", "/java/thread/JUCExecutor/ThreadPoolExecutor%E8%AF%A6%E8%A7%A3", "/java/thread/JUCExecutor/ThreadPoolExecutor\u8BE6\u89E3.md", "/java/thread/JUCExecutor/ThreadPoolExecutor%E8%AF%A6%E8%A7%A3.md"]],
  ["v-c7d13846", "/java/thread/JUCLock/", { "title": "JUC\u9501", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 16 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/JUCLock/index.html", "/java/thread/JUCLock/README.md"]],
  ["v-41a4e3e9", "/java/thread/JUCLock/%E9%94%81%E6%A0%B8%E5%BF%83%E7%B1%BBAQS%E8%AF%A6%E8%A7%A3.html", { "title": "\u9501\u6838\u5FC3\u7C7BAQS\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 25.77, "words": 7730 }, "excerpt": "\u9501\u6838\u5FC3\u7C7BAQS\u8BE6\u89E3 0. \u9762\u8BD5\u9898 \u4EC0\u4E48\u662FAQS? \u4E3A\u4EC0\u4E48\u5B83\u662F\u6838\u5FC3?; AQS\u7684\u6838\u5FC3\u601D\u60F3\u662F\u4EC0\u4E48? \u5B83\u662F\u600E\u4E48\u5B9E\u73B0\u7684? \u5E95\u5C42\u6570\u636E\u7ED3\u6784\u7B49; AQS\u6709\u54EA\u4E9B\u6838\u5FC3\u7684\u65B9\u6CD5?; AQS\u5B9A\u4E49\u4EC0\u4E48\u6837\u7684\u8D44\u6E90\u83B7\u53D6\u65B9\u5F0F? AQS\u5B9A\u4E49\u4E86\u4E24\u79CD\u8D44\u6E90\u83B7\u53D6\u65B9\u5F0F\uFF1A\u72EC\u5360(\u53EA\u6709\u4E00\u4E2A\u7EBF\u7A0B\u80FD\u8BBF\u95EE\u6267\u884C\uFF0C\u53C8\u6839\u636E\u662F\u5426\u6309\u961F\u5217\u7684\u987A\u5E8F\u5206\u4E3A\u516C\u5E73\u9501\u548C\u975E\u516C\u5E73\u9501\uFF0C\u5982ReentrantLock) \u548C\u5171\u4EAB(\u591A\u4E2A\u7EBF\u7A0B\u53EF\u540C\u65F6\u8BBF\u95EE\u6267\u884C", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/\u9501\u6838\u5FC3\u7C7BAQS\u8BE6\u89E3.html", "/java/thread/JUCLock/%E9%94%81%E6%A0%B8%E5%BF%83%E7%B1%BBAQS%E8%AF%A6%E8%A7%A3", "/java/thread/JUCLock/\u9501\u6838\u5FC3\u7C7BAQS\u8BE6\u89E3.md", "/java/thread/JUCLock/%E9%94%81%E6%A0%B8%E5%BF%83%E7%B1%BBAQS%E8%AF%A6%E8%A7%A3.md"]],
  ["v-b4e1b702", "/java/thread/JUCTools/CountDownLatch%E8%AF%A6%E8%A7%A3.html", { "title": "CountDownLatch\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 8.86, "words": 2658 }, "excerpt": "CountDownLatch\u8BE6\u89E3 0. \u9762\u8BD5\u9898 \u4EC0\u4E48\u662FCountDownLatch?; CountDownLatch\u5E95\u5C42\u5B9E\u73B0\u539F\u7406?; CountDownLatch\u4E00\u6B21\u53EF\u4EE5\u5524\u9192\u51E0\u4E2A\u4EFB\u52A1? \u591A\u4E2A; CountDownLatch\u6709\u54EA\u4E9B\u4E3B\u8981\u65B9\u6CD5? await(),countDown(); CountDownLatch\u9002\u7528\u4E8E\u4EC0\u4E48\u573A\u666F?; \u5199\u9053\u9898\uFF1A\u5B9E\u73B0\u4E00\u4E2A\u5BB9\u5668\uFF0C\u63D0\u4F9B\u4E24\u4E2A", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCTools/CountDownLatch\u8BE6\u89E3.html", "/java/thread/JUCTools/CountDownLatch%E8%AF%A6%E8%A7%A3", "/java/thread/JUCTools/CountDownLatch\u8BE6\u89E3.md", "/java/thread/JUCTools/CountDownLatch%E8%AF%A6%E8%A7%A3.md"]],
  ["v-16fd454a", "/java/thread/JUCTools/", { "title": "JUC\u5DE5\u5177", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.06, "words": 17 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/JUCTools/index.html", "/java/thread/JUCTools/README.md"]],
  ["v-6b23f6d4", "/java/thread/Keywords/", { "title": "\u5E76\u53D1\u5173\u952E\u5B57", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.06, "words": 19 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/Keywords/index.html", "/java/thread/Keywords/README.md"]],
  ["v-bda03f78", "/java/thread/base/Java%E7%BA%BF%E7%A8%8B%E5%9F%BA%E7%A1%80.html", { "title": "Java\u7EBF\u7A0B\u57FA\u7840", "type": "article", "readingTime": { "minutes": 11.54, "words": 3461 }, "excerpt": "Java\u7EBF\u7A0B\u57FA\u7840 0. \u9762\u8BD5\u9898 \u7EBF\u7A0B\u6709\u54EA\u51E0\u79CD\u72B6\u6001? \u5206\u522B\u8BF4\u660E\u4ECE\u4E00\u79CD\u72B6\u6001\u5230\u53E6\u4E00\u79CD\u72B6\u6001\u8F6C\u53D8\u6709\u54EA\u4E9B\u65B9\u5F0F?; \u901A\u5E38\u7EBF\u7A0B\u6709\u54EA\u51E0\u79CD\u4F7F\u7528\u65B9\u5F0F?; \u57FA\u7840\u7EBF\u7A0B\u673A\u5236\u6709\u54EA\u4E9B?; \u7EBF\u7A0B\u7684\u4E2D\u65AD\u65B9\u5F0F\u6709\u54EA\u4E9B?; \u7EBF\u7A0B\u7684\u4E92\u65A5\u540C\u6B65\u65B9\u5F0F\u6709\u54EA\u4E9B? \u5982\u4F55\u6BD4\u8F83\u548C\u9009\u62E9?; \u7EBF\u7A0B\u4E4B\u95F4\u6709\u54EA\u4E9B\u534F\u4F5C\u65B9\u5F0F?; 1. \u7EBF\u7A0B\u72B6\u6001\u8F6C\u6362 1.1 \u65B0\u5EFA\uFF08New\uFF09 \u521B\u5EFA\u540E\u5C1A\u672A\u542F\u52A8\u3002 1.2 \u53EF\u8FD0\u884C(Runnable) \u53EF\u80FD", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/Java\u7EBF\u7A0B\u57FA\u7840.html", "/java/thread/base/Java%E7%BA%BF%E7%A8%8B%E5%9F%BA%E7%A1%80", "/java/thread/base/Java\u7EBF\u7A0B\u57FA\u7840.md", "/java/thread/base/Java%E7%BA%BF%E7%A8%8B%E5%9F%BA%E7%A1%80.md"]],
  ["v-409577a6", "/java/thread/base/", { "title": "\u591A\u7EBF\u7A0B\u57FA\u7840", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.06, "words": 17 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/thread/base/index.html", "/java/thread/base/README.md"]],
  ["v-34babb4e", "/java/thread/base/%E5%A4%9A%E7%BA%BF%E7%A8%8B.html", { "title": "\u591A\u7EBF\u7A0B", "type": "article", "readingTime": { "minutes": 6.72, "words": 2015 }, "excerpt": '\u591A\u7EBF\u7A0B 1. \u4EC0\u4E48\u662F\u7EBF\u7A0B\u548C\u8FDB\u7A0B 1.1 \u4EC0\u4E48\u662F\u8FDB\u7A0B \u8FDB\u7A0B\u662F\u7A0B\u5E8F\u7684\u4E00\u6B21\u6267\u884C\u8FC7\u7A0B\uFF0C\u662F\u64CD\u4F5C\u7CFB\u7EDF\u5206\u914D\u8D44\u6E90\u7684\u6700\u5C0F\u5355\u4F4D\u3002\u7CFB\u7EDF\u8FD0\u884C\u4E00\u4E2A\u7A0B\u5E8F\u5373\u662F\u4E00\u4E2A\u8FDB\u7A0B\u4ECE\u521B\u5EFA\uFF0C\u8FD0\u884C\u5230\u6D88\u4EA1\u7684\u8FC7\u7A0B "\u5728java\u4E2D\uFF0C\u5F53\u6211\u4EEC\u542F\u52A8 main \u51FD\u6570\u65F6\u5176\u5B9E\u5C31\u662F\u542F\u52A8\u4E86\u4E00\u4E2A JVM \u7684\u8FDB\u7A0B\uFF0C\u800Cmain\u51FD\u6570\u6240\u5728\u7684\u7EBF\u7A0B\u5C31\u662F\u8FD9\u4E2A\u8FDB\u7A0B\u4E2D\u7684\u4E00\u4E2A\u7EBF\u7A0B\uFF0C\u4E5F\u79F0\u4E3B\u7EBF\u7A0B" 1.2 \u4EC0\u4E48\u662F\u7EBF\u7A0B \u4ED6\u662F\u64CD\u4F5C\u7CFB\u7EDF\u8FD0\u7B97\u8C03\u5EA6\uFF08\u7A0B\u5E8F\u6267\u884C\uFF09\u7684', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/\u591A\u7EBF\u7A0B.html", "/java/thread/base/%E5%A4%9A%E7%BA%BF%E7%A8%8B", "/java/thread/base/\u591A\u7EBF\u7A0B.md", "/java/thread/base/%E5%A4%9A%E7%BA%BF%E7%A8%8B.md"]],
  ["v-056df0c1", "/java/thread/base/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html", { "title": "\u591A\u7EBF\u7A0B\u7406\u8BBA\u57FA\u7840", "type": "article", "readingTime": { "minutes": 11.38, "words": 3414 }, "excerpt": '\u591A\u7EBF\u7A0B\u7406\u8BBA\u57FA\u7840 0. \u9762\u8BD5\u9898 "- \u591A\u7EBF\u7A0B\u7684\u51FA\u73B0\u662F\u8981\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\u7684?" "- \u7EBF\u7A0B\u4E0D\u5B89\u5168\u662F\u6307\u4EC0\u4E48? \u4E3E\u4F8B\u8BF4\u660E" "- \u5E76\u53D1\u51FA\u73B0\u7EBF\u7A0B\u4E0D\u5B89\u5168\u7684\u672C\u8D28\u4EC0\u4E48? \u53EF\u89C1\u6027\uFF0C\u539F\u5B50\u6027\u548C\u6709\u5E8F\u6027\u3002" "- Java\u662F\u600E\u4E48\u89E3\u51B3\u5E76\u53D1\u95EE\u9898\u7684? 3\u4E2A\u5173\u952E\u5B57\uFF0CJMM\u548C8\u4E2AHappens-Before" "- \u7EBF\u7A0B\u5B89\u5168\u662F\u4E0D\u662F\u975E\u771F\u5373\u5047? \u4E0D\u662F" "- \u7EBF\u7A0B\u5B89\u5168\u6709\u54EA\u4E9B\u5B9E\u73B0\u601D\u8DEF?" "- \u5982\u4F55\u7406\u89E3', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/\u591A\u7EBF\u7A0B\u7406\u8BBA\u57FA\u7840.html", "/java/thread/base/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80", "/java/thread/base/\u591A\u7EBF\u7A0B\u7406\u8BBA\u57FA\u7840.md", "/java/thread/base/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.md"]],
  ["v-07bbc8e6", "/java/thread/base/%E5%A6%82%E4%BD%95%E5%8F%91%E7%8E%B0%E3%80%81%E9%A2%84%E9%98%B2%E3%80%81%E8%A7%A3%E5%86%B3%E6%AD%BB%E9%94%81.html", { "title": "\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501", "type": "article", "readingTime": { "minutes": 3.57, "words": 1071 }, "excerpt": "\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501 1. \u6B7B\u9501\u7684\u5B9A\u4E49 \u201C\u6B7B\u9501\u662F\u6307\u4E24\u4E2A\u6216\u4E24\u4E2A\u4EE5\u4E0A\u7684\u8FDB\u7A0B\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u7531\u4E8E\u7ADE\u4E89\u8D44\u6E90\u6216\u8005\u7531\u4E8E\u5F7C\u6B64\u901A\u4FE1\u800C\u9020\u6210\u7684\u4E00\u79CD\u963B\u585E\u7684\u73B0\u8C61\uFF0C\u82E5\u65E0\u5916\u529B\u4F5C\u7528\uFF0C\u5B83\u4EEC\u90FD\u5C06\u65E0\u6CD5\u63A8\u8FDB\u4E0B\u53BB\u3002\u201D \u7ADE\u4E89\u7684\u8D44\u6E90\u53EF\u4EE5\u662F\uFF1A\u9501\u3001\u7F51\u7EDC\u8FDE\u63A5\u3001\u901A\u77E5\u4E8B\u4EF6\uFF0C\u78C1\u76D8\u3001\u5E26\u5BBD\uFF0C\u4EE5\u53CA\u4E00\u5207\u53EF\u4EE5\u88AB\u79F0\u4F5C\u201C\u8D44\u6E90\u201D\u7684\u4E1C\u897F\u3002 2. \u4E3E\u4F8B \u5982\u679C\u6B64\u65F6\u6709\u4E00\u4E2A\u7EBF\u7A0BA\uFF0C\u6309\u7167\u5148\u9501a\u518D\u83B7\u5F97\u9501b\u7684\u987A\u5E8F\u83B7\u5F97\u9501\uFF0C\u800C\u5728\u6B64\u65F6\u53C8\u6709\u4E00\u4E2A\u7EBF\u7A0BB", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501.html", "/java/thread/base/%E5%A6%82%E4%BD%95%E5%8F%91%E7%8E%B0%E3%80%81%E9%A2%84%E9%98%B2%E3%80%81%E8%A7%A3%E5%86%B3%E6%AD%BB%E9%94%81", "/java/thread/base/\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501.md", "/java/thread/base/%E5%A6%82%E4%BD%95%E5%8F%91%E7%8E%B0%E3%80%81%E9%A2%84%E9%98%B2%E3%80%81%E8%A7%A3%E5%86%B3%E6%AD%BB%E9%94%81.md"]],
  ["v-1af994a8", "/java/thread/base/%E6%AD%BB%E9%94%81.html", { "title": "\u6B7B\u9501", "type": "article", "readingTime": { "minutes": 2.38, "words": 714 }, "excerpt": "\u6B7B\u9501 1. \u4EC0\u4E48\u662F\u6B7B\u9501 \u591A\u4E2A\u7EBF\u7A0B\u540C\u65F6\u88AB\u963B\u585E\uFF0C\u4ED6\u4EEC\u4E2D\u7684\u4E00\u4E2A\u6216\u8005\u5168\u90E8\u90FD\u5728\u7B49\u5F85\u67D0\u4E2A\u8D44\u6E90\u88AB\u91CA\u653E\u3002\u7531\u4E8E\u7EBF\u7A0B\u88AB\u65E0\u9650\u671F\u7684\u963B\u585E\uFF0C\u56E0\u6B64\u7A0B\u5E8F\u4E0D\u53EF\u80FD\u6B63\u5E38\u7EC8\u6B62 1.1 \u6848\u4F8B \u5982\u4E0B\u56FE\u6240\u793A\uFF0C\u7EBF\u7A0BA\u6301\u6709\u8D44\u6E902\uFF0C\u7EBF\u7A0BB\u6301\u6709\u8D44\u6E90 1,\u4ED6\u4EEC\u540C\u65F6\u90FD\u60F3\u7533\u8BF7\u5BF9\u65B9\u7684\u8D44\u6E90\uFF0C\u6240\u4EE5\u8FD9\u4E24\u4E2A\u7EBF\u7A0B\u5C31\u4F1A\u4E92\u76F8\u7B49\u5F85\u800C\u8FDB\u5165\u6B7B\u9501\u72B6\u6001 1.2 \u6848\u4F8B\u4EE3\u7801 \u901A\u8FC7\u4F8B\u5B50\u6765\u6A21\u62DF\u7EBF\u7A0B\u6B7B\u9501 \u8F93\u51FA \u7EBF\u7A0BA \u901A\u8FC7synchronized\uFF08re", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/\u6B7B\u9501.html", "/java/thread/base/%E6%AD%BB%E9%94%81", "/java/thread/base/\u6B7B\u9501.md", "/java/thread/base/%E6%AD%BB%E9%94%81.md"]],
  ["v-6ed69023", "/java/thread/base/%E7%BA%BF%E7%A8%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.html", { "title": "\u7EBF\u7A0B\u751F\u547D\u5468\u671F", "type": "article", "readingTime": { "minutes": 2.54, "words": 762 }, "excerpt": "\u7EBF\u7A0B\u751F\u547D\u5468\u671F 1. \u7EBF\u7A0B\u7684\u751F\u547D\u5468\u671F Java \u7EBF\u7A0B\u5728\u8FD0\u884C\u7684\u751F\u547D\u5468\u671F\u4E2D\u7684\u6307\u5B9A\u65F6\u523B\u53EA\u53EF\u80FD\u5904\u4E8E\u4E0B\u97626\u79CD\u4E0D\u540C\u72B6\u6001\u7684\u5176\u4E2D\u4E00\u4E2A\u72B6\u6001 \u72B6\u6001\u540D\u79F0 \u8BF4\u660E ------------ ------------------------------------------------------------ NEW \u521D\u59CB\u72B6\u6001\uFF0C\u7EBF\u7A0B\u88AB\u6784\u5EFA\uFF0C\u4F46\u662F\u8FD8\u6CA1\u8C03\u7528start\u65B9\u6CD5 RUNNABLE ", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/\u7EBF\u7A0B\u751F\u547D\u5468\u671F.html", "/java/thread/base/%E7%BA%BF%E7%A8%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F", "/java/thread/base/\u7EBF\u7A0B\u751F\u547D\u5468\u671F.md", "/java/thread/base/%E7%BA%BF%E7%A8%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md"]],
  ["v-5dd87ef2", "/java/thread/base/%E7%BA%BF%E7%A8%8B%E9%80%9A%E4%BF%A1.html", { "title": "\u7EBF\u7A0B\u901A\u4FE1(\u7B49\u5F85\u901A\u77E5wait/notify\u673A\u5236)", "type": "article", "readingTime": { "minutes": 5.58, "words": 1673 }, "excerpt": "\u7EBF\u7A0B\u901A\u4FE1(\u7B49\u5F85\u901A\u77E5wait/notify\u673A\u5236) 1. \u7B49\u5F85/\u901A\u77E5\u673A\u5236\u4ECB\u7ECD 1.1 \u4E0D\u4F7F\u7528\u7B49\u5F85/\u901A\u77E5\u673A\u5236\uFF08\u8F6E\u8BE2\uFF09 \u5F53\u4E24\u4E2A\u7EBF\u7A0B\u4E4B\u95F4\u5B58\u5728\u751F\u4EA7\u8005\u548C\u6D88\u8D39\u8005\u5173\u7CFB\uFF0C\u4E5F\u5C31\u662F\u8BF4\u7B2C\u4E00\u4E2A\u7EBF\u7A0B\uFF08\u751F\u4EA7\u8005\uFF09\u505A\u76F8\u5E94\u7684\u64CD\u4F5C\u7136\u540E\u7B2C\u4E8C\u4E2A\u7EBF\u7A0B\uFF08\u6D88\u8D39\u8005\uFF09\u611F\u77E5\u5230\u4E86\u53D8\u5316\u53C8\u8FDB\u884C\u76F8\u5E94\u7684\u64CD\u4F5C 1.1.1 \u8F6E\u8BE2\u65B9\u5F0F\u6848\u4F8B \u5047\u8BBE\u8FD9\u4E2Avalue\u503C\u5C31\u662F\u7B2C\u4E00\u4E2A\u7EBF\u7A0B\u64CD\u4F5C\u7684\u7ED3\u679C\uFF0CdoSomething()\u662F\u7B2C\u4E8C\u4E2A\u7EBF\u7A0B\u8981\u505A\u7684", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/\u7EBF\u7A0B\u901A\u4FE1.html", "/java/thread/base/%E7%BA%BF%E7%A8%8B%E9%80%9A%E4%BF%A1", "/java/thread/base/\u7EBF\u7A0B\u901A\u4FE1.md", "/java/thread/base/%E7%BA%BF%E7%A8%8B%E9%80%9A%E4%BF%A1.md"]],
  ["v-2fbf52ae", "/java/thread/concurrent/Callable%E5%92%8CFuture.html", { "title": "Callable\u548CFuture", "type": "article", "readingTime": { "minutes": 0.01, "words": 3 }, "excerpt": "Callable\u548CFuture", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/Callable\u548CFuture.html", "/java/thread/concurrent/Callable%E5%92%8CFuture", "/java/thread/concurrent/Callable\u548CFuture.md", "/java/thread/concurrent/Callable%E5%92%8CFuture.md"]],
  ["v-f0342900", "/java/thread/concurrent/Executors%E5%88%9B%E5%BB%BA%E7%BA%BF%E7%A8%8B%E6%B1%A0.html", { "title": "Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60", "type": "article", "readingTime": { "minutes": 0.79, "words": 236 }, "excerpt": "Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60 Executors\u7C7B\u4E2D\u63D0\u4F9B\u7684\u51E0\u4E2A\u9759\u6001\u65B9\u6CD5\u6765\u521B\u5EFA\u7EBF\u7A0B\u6C60\uFF1A \u4E09\u4E2A\u9759\u6001\u65B9\u6CD5\u7684\u5177\u4F53\u5B9E\u73B0 \u4ECE\u5B83\u4EEC\u7684\u5177\u4F53\u5B9E\u73B0\u6765\u770B\uFF0C\u5B83\u4EEC\u5B9E\u9645\u4E0A\u4E5F\u662F\u8C03\u7528\u4E86ThreadPoolExecutor\uFF0C\u53EA\u4E0D\u8FC7\u53C2\u6570\u90FD\u5DF2\u914D\u7F6E\u597D\u4E86\u3002 newFixedThreadPool\u521B\u5EFA\u7684\u7EBF\u7A0B\u6C60corePoolSize\u548CmaximumPoolSize\u503C\u662F\u76F8\u7B49\u7684\uFF0C\u5B83\u4F7F\u7528\u7684LinkedBloc", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60.html", "/java/thread/concurrent/Executors%E5%88%9B%E5%BB%BA%E7%BA%BF%E7%A8%8B%E6%B1%A0", "/java/thread/concurrent/Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60.md", "/java/thread/concurrent/Executors%E5%88%9B%E5%BB%BA%E7%BA%BF%E7%A8%8B%E6%B1%A0.md"]],
  ["v-73edc2c7", "/java/thread/concurrent/", { "title": "\u5E76\u53D1", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 14 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/thread/concurrent/index.html", "/java/thread/concurrent/README.md"]],
  ["v-e79e511e", "/java/thread/concurrent/ThreadPoolExecutor%E7%B1%BB.html", { "title": "ThreadPoolExecutor\u7C7B", "type": "article", "readingTime": { "minutes": 5.44, "words": 1631 }, "excerpt": "ThreadPoolExecutor\u7C7B 1. ThreadPoolExecutor\u7C7B\u6784\u9020\u5668 java.uitl.concurrent.ThreadPoolExecutor\u7C7B\u662F\u7EBF\u7A0B\u6C60\u4E2D\u6700\u6838\u5FC3\u7684\u4E00\u4E2A\u7C7B\uFF0C\u56E0\u6B64\u5982\u679C\u8981\u900F\u5F7B\u4E86\u89E3Java\u4E2D\u7EBF\u7A0B\u6C60\uFF0C\u5C31\u9700\u8981\u5148\u4E86\u89E3\u8FD9\u4E2A\u7C7B\u3002\u4E0B\u9762\u6211\u4EEC\u6765\u770B\u4E00ThreadPoolExecutor\u7C7B\u7684\u5177\u4F53\u5B9E\u73B0\u6E90\u7801 \u5728ThreadPoolExecutor", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/ThreadPoolExecutor\u7C7B.html", "/java/thread/concurrent/ThreadPoolExecutor%E7%B1%BB", "/java/thread/concurrent/ThreadPoolExecutor\u7C7B.md", "/java/thread/concurrent/ThreadPoolExecutor%E7%B1%BB.md"]],
  ["v-1877f20d", "/java/thread/concurrent/%E5%A6%82%E4%BD%95%E5%90%88%E7%90%86%E9%85%8D%E7%BD%AE%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%A4%A7%E5%B0%8F.html", { "title": "\u5982\u4F55\u5408\u7406\u914D\u7F6E\u7EBF\u7A0B\u6C60\u7684\u5927\u5C0F", "type": "article", "readingTime": { "minutes": 3.41, "words": 1023 }, "excerpt": "\u5982\u4F55\u5408\u7406\u914D\u7F6E\u7EBF\u7A0B\u6C60\u7684\u5927\u5C0F 1. \u7406\u8BBA\u80CC\u666F \u4E00\u822C\u9700\u8981\u6839\u636E\u4EFB\u52A1\u7684\u7C7B\u578B\u6765\u914D\u7F6E\u7EBF\u7A0B\u6C60\u5927\u5C0F\uFF1A \u5982\u679C\u662FCPU\u5BC6\u96C6\u578B\u4EFB\u52A1\uFF0C\u5C31\u9700\u8981\u5C3D\u91CF\u538B\u69A8CPU\uFF0C\u5E94\u914D\u7F6E\u5C3D\u53EF\u80FD\u5C0F\u7684\u7EBF\u7A0B\uFF0C\u53C2\u8003\u503C\u53EF\u4EE5\u8BBE\u4E3A NCPU+1; \u5982\u679C\u662FIO\u5BC6\u96C6\u578B\u4EFB\u52A1\uFF0C\u56E0\u4E3AIO\u64CD\u4F5C\u4E0D\u5360\u7528CPU\uFF0C\u4E0D\u8981\u8BA9CPU\u95F2\u4E0B\u6765\uFF0C\u5E94\u52A0\u5927\u7EBF\u7A0B\u6570\u91CF,\u53C2\u8003\u503C\u53EF\u4EE5\u8BBE\u7F6E\u4E3A2NCPU+1; \u5F53\u7136\uFF0C\u8FD9\u53EA\u662F\u4E00\u4E2A\u53C2\u8003\u503C\uFF0C\u5177\u4F53\u7684\u8BBE\u7F6E\u8FD8\u9700\u8981\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u8FDB\u884C\u8C03", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/\u5982\u4F55\u5408\u7406\u914D\u7F6E\u7EBF\u7A0B\u6C60\u7684\u5927\u5C0F.html", "/java/thread/concurrent/%E5%A6%82%E4%BD%95%E5%90%88%E7%90%86%E9%85%8D%E7%BD%AE%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%A4%A7%E5%B0%8F", "/java/thread/concurrent/\u5982\u4F55\u5408\u7406\u914D\u7F6E\u7EBF\u7A0B\u6C60\u7684\u5927\u5C0F.md", "/java/thread/concurrent/%E5%A6%82%E4%BD%95%E5%90%88%E7%90%86%E9%85%8D%E7%BD%AE%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%A4%A7%E5%B0%8F.md"]],
  ["v-331a0410", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0.html", { "title": "\u7EBF\u7A0B\u6C60", "type": "article", "readingTime": { "minutes": 3.02, "words": 907 }, "excerpt": "\u7EBF\u7A0B\u6C60 1. \u4E3A\u4EC0\u4E48\u8981\u4F7F\u7528\u7EBF\u7A0B\u6C60 \u964D\u4F4E\u8D44\u6E90\u6D88\u8017\uFF1A\u901A\u8FC7\u91CD\u590D\u5229\u7528\u5DF2\u521B\u5EFA\u7684\u7EBF\u7A0B\u964D\u4F4E\u7EBF\u7A0B\u521B\u5EFA\u548C\u9500\u6BC1\u9020\u6210\u7684\u6D88\u8017\u3002; \u63D0\u9AD8\u54CD\u5E94\u901F\u5EA6\uFF1A\u5F53\u4EFB\u52A1\u5230\u8FBE\u65F6\uFF0C\u4EFB\u52A1\u53EF\u4EE5\u4E0D\u9700\u8981\u7684\u7B49\u5230\u7EBF\u7A0B\u521B\u5EFA\u5C31\u80FD\u7ACB\u5373\u6267\u884C\u3002; \u63D0\u9AD8\u7EBF\u7A0B\u7684\u53EF\u7BA1\u7406\u884C\u6027\uFF1A\u7EBF\u7A0B\u662F\u7A00\u7F3A\u8D44\u6E90\uFF0C\u5982\u679C\u65E0\u9650\u5236\u7684\u521B\u5EFA\uFF0C\u4E0D\u4EC5\u4F1A\u6D88\u8017\u7CFB\u7EDF\u8D44\u6E90\uFF0C\u8FD8\u4F1A\u964D\u4F4E\u7CFB\u7EDF\u7684\u7A33\u5B9A\u6027\uFF0C\u4F7F\u7528\u7EBF\u7A0B\u6C60\u53EF\u4EE5\u8FDB\u884C\u7EDF\u4E00\u7684\u5206\u914D\uFF0C\u8C03\u4F18\u548C\u76D1\u63A7\u3002; 2. \u5B9E\u73B0Runnable\u63A5\u53E3\u548CCa", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/\u7EBF\u7A0B\u6C60.html", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0", "/java/thread/concurrent/\u7EBF\u7A0B\u6C60.md", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0.md"]],
  ["v-6f41b47a", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B.html", { "title": "\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B", "type": "article", "readingTime": { "minutes": 2.96, "words": 888 }, "excerpt": "\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B \u5177\u4F53\u4F7F\u7528\u793A\u4F8B \u6267\u884C\u7ED3\u679C\uFF1A \u4ECE\u6267\u884C\u7ED3\u679C\u53EF\u4EE5\u770B\u51FA\uFF0C\u5F53\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u7684\u6570\u76EE\u5927\u4E8E5\u65F6\uFF0C\u4FBF\u5C06\u4EFB\u52A1\u653E\u5165\u4EFB\u52A1\u7F13\u5B58\u961F\u5217\u91CC\u9762\uFF0C\u5F53\u4EFB\u52A1\u7F13\u5B58\u961F\u5217\u6EE1\u4E86\u4E4B\u540E\uFF0C\u4FBF\u521B\u5EFA\u65B0\u7684\u7EBF\u7A0B\u3002\u5982\u679C\u4E0A\u9762\u7A0B\u5E8F\u4E2D\uFF0C\u5C06for\u5FAA\u73AF\u4E2D\u6539\u6210\u6267\u884C20\u4E2A\u4EFB\u52A1\uFF0C\u5C31\u4F1A\u629B\u51FA\u4EFB\u52A1\u62D2\u7EDD\u5F02\u5E38\u4E86\u3002", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B.html", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B", "/java/thread/concurrent/\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B.md", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B.md"]],
  ["v-f58de1e8", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.html", { "title": "\u7EBF\u7A0B\u6C60\u7684\u5177\u4F53\u5B9E\u73B0\u539F\u7406", "type": "article", "readingTime": { "minutes": 9.01, "words": 2702 }, "excerpt": "\u7EBF\u7A0B\u6C60\u7684\u5177\u4F53\u5B9E\u73B0\u539F\u7406 \u5728\u4E0A\u4E00\u8282\u6211\u4EEC\u4ECE\u5B8F\u89C2\u4E0A\u4ECB\u7ECD\u4E86ThreadPoolExecutor\uFF0C\u4E0B\u9762\u6211\u4EEC\u6765\u6DF1\u5165\u89E3\u6790\u4E00\u4E0B\u7EBF\u7A0B\u6C60\u7684\u5177\u4F53\u5B9E\u73B0\u539F\u7406\uFF0C\u5C06\u4ECE\u4E0B\u9762\u51E0\u4E2A\u65B9\u9762\u8BB2\u89E3\uFF1A 1.\u7EBF\u7A0B\u6C60\u72B6\u6001 2.\u4EFB\u52A1\u7684\u6267\u884C 3.\u7EBF\u7A0B\u6C60\u4E2D\u7684\u7EBF\u7A0B\u521D\u59CB\u5316 4.\u4EFB\u52A1\u7F13\u5B58\u961F\u5217\u53CA\u6392\u961F\u7B56\u7565 5.\u4EFB\u52A1\u62D2\u7EDD\u7B56\u7565 6.\u7EBF\u7A0B\u6C60\u7684\u5173\u95ED 7.\u7EBF\u7A0B\u6C60\u5BB9\u91CF\u7684\u52A8\u6001\u8C03\u6574 1. \u7EBF\u7A0B\u6C60\u72B6\u6001 \u5728ThreadPoolExecutor\u4E2D", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/\u7EBF\u7A0B\u6C60\u7684\u5177\u4F53\u5B9E\u73B0\u539F\u7406.html", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86", "/java/thread/concurrent/\u7EBF\u7A0B\u6C60\u7684\u5177\u4F53\u5B9E\u73B0\u539F\u7406.md", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.md"]],
  ["v-4c715521", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B.html", { "title": "\u7EBF\u7A0B\u6C60\u7684\u5904\u7406\u6D41\u7A0B", "type": "article", "readingTime": { "minutes": 2.94, "words": 881 }, "excerpt": "\u7EBF\u7A0B\u6C60\u7684\u5904\u7406\u6D41\u7A0B 1. \u5904\u7406\u6D41\u7A0B \u521B\u5EFA\u7EBF\u7A0B\u6C60\u9700\u8981\u4F7F\u7528ThreadPoolExecutor \u7C7B\uFF0C\u4ED6\u7684\u6784\u9020\u51FD\u6570\u53C2\u6570\u5982\u4E0B \u53C2\u6570\u4ECB\u7ECD\u5982\u6CE8\u91CA\u6240\u793A\uFF0C\u8981\u4E86\u89E3\u8FD9\u4E9B\u53C2\u6570\u5DE6\u53F3\u7740\u4EC0\u4E48\uFF0C\u5C31\u9700\u8981\u4E86\u89E3\u7EBF\u7A0B\u6C60\u5177\u4F53\u7684\u6267\u884C\u65B9\u6CD5ThreadPoolExecutor.execute: \u6D41\u7A0B\u56FE 2. \u6784\u9020\u5668\u7684\u4F5C\u7528 corePoolSize\uFF1A\u6838\u5FC3\u7EBF\u7A0B\u6C60\u6570\u91CF; \u5728\u7EBF\u7A0B\u6570\u5C11\u4E8E\u6838\u5FC3\u6570\u91CF\u65F6\uFF0C\u6709\u65B0\u4EFB\u52A1\u8FDB\u6765\u5C31\u65B0", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/\u7EBF\u7A0B\u6C60\u7684\u5904\u7406\u6D41\u7A0B.html", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B", "/java/thread/concurrent/\u7EBF\u7A0B\u6C60\u7684\u5904\u7406\u6D41\u7A0B.md", "/java/thread/concurrent/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%9A%84%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B.md"]],
  ["v-f4d08732", "/java/thread/summary/%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%B3%95.html", { "title": "\u7EBF\u7A0B\u5B89\u5168\u7684\u5B9E\u73B0\u65B9\u6CD5", "type": "article", "readingTime": { "minutes": 0.16, "words": 49 }, "excerpt": "\u7EBF\u7A0B\u5B89\u5168\u7684\u5B9E\u73B0\u65B9\u6CD5 \u7EBF\u7A0B\u5B89\u5168\u7684\u5B9E\u73B0\u65B9\u6CD5\u5305\u542B: \u4E92\u65A5\u540C\u6B65: synchronized \u548C ReentrantLock; \u975E\u963B\u585E\u540C\u6B65: CAS, AtomicXXXX; \u65E0\u540C\u6B65\u65B9\u6848: \u6808\u5C01\u95ED\uFF0CThread Local\uFF0C\u53EF\u91CD\u5165\u4EE3\u7801;", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/summary/\u7EBF\u7A0B\u5B89\u5168\u7684\u5B9E\u73B0\u65B9\u6CD5.html", "/java/thread/summary/%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%B3%95", "/java/thread/summary/\u7EBF\u7A0B\u5B89\u5168\u7684\u5B9E\u73B0\u65B9\u6CD5.md", "/java/thread/summary/%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%B3%95.md"]],
  ["v-15ea94a5", "/java/jvm/tools/mat/", { "title": "Jvm-MAT", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 14 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/tools/mat/index.html", "/java/jvm/tools/mat/README.md"]],
  ["v-4b2e63bd", "/java/jvm/tools/mat/Shallow%E5%92%8CRetained.html", { "title": "Shallow heap\u548CRetained heap", "type": "article", "readingTime": { "minutes": 1.4, "words": 420 }, "excerpt": "Shallow heap\u548CRetained heap \u6240\u6709\u5305\u542BHeap Proflin \u529F\u80FD\u7684\u5DE5\u5177\uFF08MAT\uFF0CTPTP\u7B49\uFF09\u90FD\u4F1A\u4F7F\u7528\u5230\u4E24\u4E2A\u540D\u8BCD\uFF0C\u4E00\u4E2A\u662FShallow Size\uFF0C\u53E6\u4E00\u4E2A\u662FRetained Size 1 \u6982\u5FF5 1.1 Shallow Size \u5BF9\u8C61\u81EA\u8EAB\u5360\u7528\u7684\u5185\u5B58\u5927\u5C0F\uFF0C\u4E0D\u5305\u62EC\u4ED6\u5F15\u7528\u7684\u5BF9\u8C61 \u9488\u5BF9\u975E\u6570\u7EC4\u7C7B\u578B\u7684\u5BF9\u8C61\uFF0C\u5B83\u7684\u5927\u5C0F\u5C31\u662F\u5BF9\u8C61\u4E0E\u4ED6\u6240\u6709\u7684\u6210\u5458\u53D8\u91CF\u5927\u5C0F\u7684\u603B", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/tools/mat/Shallow\u548CRetained.html", "/java/jvm/tools/mat/Shallow%E5%92%8CRetained", "/java/jvm/tools/mat/Shallow\u548CRetained.md", "/java/jvm/tools/mat/Shallow%E5%92%8CRetained.md"]],
  ["v-1985c121", "/java/jvm/tools/mat/mat%E4%BD%BF%E7%94%A8.html", { "title": "MAT\u4F7F\u7528", "type": "article", "readingTime": { "minutes": 6.14, "words": 1843 }, "excerpt": "MAT\u4F7F\u7528 1 MAT\u4E3B\u754C\u9762\u4ECB\u7ECD 1.1 \u5BFC\u5165hprof\u6587\u4EF6 \u5BFC\u5165\u6587\u4EF6\u4E4B\u540E\uFF0C\u663E\u793AOverView\u754C\u9762 \u5982\u679C\u9009\u62E9\u4E86\u7B2C\u4E00\u4E2A\uFF0C\u5219\u4F1A\u751F\u6210\u4E00\u4E2A\u62A5\u544A 1.2 OverView \u754C\u9762 \u9700\u8981\u5173\u6CE8\u7684\u662F\u4E0B\u9762\u7684Actions\u533A\u57DF Histogram: \u5217\u51FA\u5185\u5B58\u4E2D\u7684\u5BF9\u8C61\uFF0C\u5BF9\u8C61\u7684\u4E2A\u4EBA\u4EE5\u53CA\u5927\u5C0F; Dominator Tree: \u5217\u51FA\u6700\u5927\u7684\u5BF9\u8C61\u4EE5\u53CA\u5176\u4F9D\u8D56\u5B58\u6D3B\u7684Object\uFF08\u5927\u5C0F\u4EE5Reta", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/tools/mat/mat\u4F7F\u7528.html", "/java/jvm/tools/mat/mat%E4%BD%BF%E7%94%A8", "/java/jvm/tools/mat/mat\u4F7F\u7528.md", "/java/jvm/tools/mat/mat%E4%BD%BF%E7%94%A8.md"]],
  ["v-1c9d71a6", "/java/jvm/tools/mat/mat%E5%AE%89%E8%A3%85.html", { "title": "MAT\u5B89\u88C5", "type": "article", "readingTime": { "minutes": 0.5, "words": 150 }, "excerpt": "MAT\u5B89\u88C5 1. \u4E0B\u8F7D \u4E0B\u8F7D\u5730\u5740\u9009\u62E9\u9002\u5408\u81EA\u5DF1\u7684\u7CFB\u7EDF\u7248\u672C 2. \u5B89\u88C5\u62A5\u9519 2.1 \u62A5\u9519\u63D0\u793A 2.2 \u62A5\u9519\u539F\u56E0 \u4F46\u662F\u5B98\u65B9\u6587\u6863\u6307\u51FAMAT\u9700\u89811.7 Java\u624D\u53EF\u4EE5\u8FD0\u884C\uFF0C\u6240\u4EE5\u6B64\u65F6\u9700\u8981\u4E3AMAT\u6307\u5B9A\u4E00\u4E2A1.7\u7684Java VM\u3002\u53EA\u9700\u8981\u5728MemoryAnalyzer.ini\u6587\u4EF6\u4E2D\u6700\u5F00\u59CB\u6DFB\u52A0 2.3 MemoryAnalyzer.ini\u4F4D\u7F6E mat.app \u6253\u5F00\u5C31\u53EF\u4EE5\u770B\u89C1 /", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/jvm/tools/mat/mat\u5B89\u88C5.html", "/java/jvm/tools/mat/mat%E5%AE%89%E8%A3%85", "/java/jvm/tools/mat/mat\u5B89\u88C5.md", "/java/jvm/tools/mat/mat%E5%AE%89%E8%A3%85.md"]],
  ["v-838a1cfc", "/java/jvm/tools/mat/%E8%AE%B0%E4%B8%80%E6%AC%A1MAT%E5%88%86%E6%9E%90%E7%BA%BF%E4%B8%8A%E9%A1%B9%E7%9B%AE%E8%BF%87%E7%A8%8B.html", { "title": "\u8BB0\u4E00\u6B21MAT\u5206\u6790\u7EBF\u4E0A\u9879\u76EE\u8FC7\u7A0B", "type": "article", "readingTime": { "minutes": 1.91, "words": 572 }, "excerpt": "\u8BB0\u4E00\u6B21MAT\u5206\u6790\u7EBF\u4E0A\u9879\u76EE\u8FC7\u7A0B 1. \u80CC\u666F \u524D\u6BB5\u65F6\u95F4\u63A5\u624B\u4E86\u4E00\u4E2A\u9879\u76EE\uFF0C\u6B63\u5E38\u8FD0\u884C\u90FD\u6CA1\u6709\u95EE\u9898\u3002\u4F46\u662F\u8FD0\u884C\u4E2A\u51E0\u5929\u5C31\u4F1AOOM\u5F02\u5E38\uFF0C\u5BFC\u81F4\u670D\u52A1\u4E0D\u53EF\u7528\u3002\u6211\u4EEC\u9996\u5148\u7B2C\u4E00\u4E2A\u60F3\u5230\u7684\u5C31\u662F\u8BE5\u9879\u76EE\u5185\u5B58\u6CC4\u6F0F\u5BFC\u81F4\uFF0C\u4F46\u662F\u9879\u76EE\u672C\u8EAB\u5DF2\u7ECF\u6BD4\u8F83\u5E9E\u5927\uFF0C\u8981\u627E\u5230\u4E00\u4E2A\u5185\u5B58\u6CC4\u6F0F\u7684\u70B9\uFF0C\u8FD8\u662F\u6BD4\u8F83\u96BE\u5F97\u3002 \u6240\u4EE5\u6211\u4EEC\u4F7F\u7528MAT\u6765\u5206\u6790\u7EBF\u4E0A\u9879\u76EE\u7684\u8FD0\u884C\u60C5\u51B5 2. jmap:\u751F\u6210\u5806\u8F6C\u50A8\u5FEB\u7167 19012 \u662F\u8FDB\u7A0B\u53F7 \u6211\u4EEC\u5C06heap.hp", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/tools/mat/\u8BB0\u4E00\u6B21MAT\u5206\u6790\u7EBF\u4E0A\u9879\u76EE\u8FC7\u7A0B.html", "/java/jvm/tools/mat/%E8%AE%B0%E4%B8%80%E6%AC%A1MAT%E5%88%86%E6%9E%90%E7%BA%BF%E4%B8%8A%E9%A1%B9%E7%9B%AE%E8%BF%87%E7%A8%8B", "/java/jvm/tools/mat/\u8BB0\u4E00\u6B21MAT\u5206\u6790\u7EBF\u4E0A\u9879\u76EE\u8FC7\u7A0B.md", "/java/jvm/tools/mat/%E8%AE%B0%E4%B8%80%E6%AC%A1MAT%E5%88%86%E6%9E%90%E7%BA%BF%E4%B8%8A%E9%A1%B9%E7%9B%AE%E8%BF%87%E7%A8%8B.md"]],
  ["v-70a9a102", "/java/jvm/tools/visualvm/", { "title": "visualvm", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 14 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "JVM"] }, ["/java/jvm/tools/visualvm/index.html", "/java/jvm/tools/visualvm/README.md"]],
  ["v-8290979e", "/java/jvm/tools/visualvm/mac%E7%89%88idea%E9%85%8D%E7%BD%AEvisualvm.html", { "title": "mac\u7248idea\u914D\u7F6Evisualvm", "type": "article", "readingTime": { "minutes": 0.58, "words": 173 }, "excerpt": "mac\u7248idea\u914D\u7F6Evisualvm 1. \u4E0B\u8F7D\u63D2\u4EF6 2. \u914D\u7F6E \u91CD\u542F\u5B8C\u540E\u8FDB\u884C\u914D\u7F6E prefences->other settings->visuialvm mac\u83B7\u53D6jdk\u7684\u8DEF\u5F84 \u914D\u7F6E\u7684\u65F6\u5019\u9009\u62E9home\u76EE\u5F55\u4E0Bbin\u4E2D\u7684jvisualvm\u5DE5\u5177\u5373\u53EF\u3002 3. \u8FD0\u884C 4. \u5F39\u51FA\u67E5\u770B \u7A0B\u5E8F\u8FD0\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u4F1A\u81EA\u52A8\u5F39\u51FA\u89C6\u56FE 5. \u5E73\u65F6\u542F\u52A8jvisualvm \u53C2\u8003\u6587\u7AE0 Mac", "date": "2022-08-09T11:49:17.000Z" }, ["/java/jvm/tools/visualvm/mac\u7248idea\u914D\u7F6Evisualvm.html", "/java/jvm/tools/visualvm/mac%E7%89%88idea%E9%85%8D%E7%BD%AEvisualvm", "/java/jvm/tools/visualvm/mac\u7248idea\u914D\u7F6Evisualvm.md", "/java/jvm/tools/visualvm/mac%E7%89%88idea%E9%85%8D%E7%BD%AEvisualvm.md"]],
  ["v-60b0e62a", "/java/thread/JUCLock/LockSupport/LockSupport%E6%BA%90%E7%A0%81.html", { "title": "LockSupport\u6E90\u7801\u5206\u6790", "type": "article", "readingTime": { "minutes": 5, "words": 1500 }, "excerpt": "LockSupport\u6E90\u7801\u5206\u6790 1. \u7C7B\u7684\u5C5E\u6027 UNSAFE\u5B57\u6BB5\u8868\u793Asun.misc.Unsafe\u7C7B\uFF0C\u4E00\u822C\u7A0B\u5E8F\u4E2D\u4E0D\u5141\u8BB8\u76F4\u63A5\u8C03\u7528; \u800Clong\u578B\u7684\u8868\u793A\u5B9E\u4F8B\u5BF9\u8C61\u76F8\u5E94\u5B57\u6BB5\u5728\u5185\u5B58\u4E2D\u7684\u504F\u79FB\u5730\u5740\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8BE5\u504F\u79FB\u5730\u5740\u83B7\u53D6\u6216\u8005\u8BBE\u7F6E\u8BE5\u5B57\u6BB5\u7684\u503C\u3002; 2. \u7C7B\u7684\u6784\u9020\u51FD\u6570 \u79C1\u6709\u6784\u9020\u51FD\u6570\uFF0C\u65E0\u6CD5\u88AB\u5B9E\u4F8B\u5316\u3002\u6240\u4EE5\u6240\u6709\u7684\u65B9\u6CD5\u90FD\u662F\u9759\u6001\u7684 3. Unsafe\u7C7B\u4E2D\u7684park\u548Cunpark\u51FD\u6570 \u5728\u5206", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/LockSupport/LockSupport\u6E90\u7801.html", "/java/thread/JUCLock/LockSupport/LockSupport%E6%BA%90%E7%A0%81", "/java/thread/JUCLock/LockSupport/LockSupport\u6E90\u7801.md", "/java/thread/JUCLock/LockSupport/LockSupport%E6%BA%90%E7%A0%81.md"]],
  ["v-11263062", "/java/thread/JUCLock/LockSupport/LockSupport%E7%94%A8%E6%B3%95.html", { "title": "LockSupport\u7528\u6CD5", "type": "article", "readingTime": { "minutes": 6.43, "words": 1929 }, "excerpt": "LockSupport\u7528\u6CD5 0. \u9762\u8BD5\u9898 \u4E3A\u4EC0\u4E48LockSupport\u4E5F\u662F\u6838\u5FC3\u57FA\u7840\u7C7B? AQS\u6846\u67B6\u501F\u52A9\u4E8E\u4E24\u4E2A\u7C7B\uFF1AUnsafe(\u63D0\u4F9BCAS\u64CD\u4F5C)\u548CLockSupport(\u63D0\u4F9Bpark/unpark\u64CD\u4F5C); \u5199\u51FA\u5206\u522B\u901A\u8FC7wait/notify\u548CLockSupport\u7684park/unpark\u5B9E\u73B0\u540C\u6B65?; LockSupport.park()\u4F1A\u91CA\u653E\u9501\u8D44\u6E90\u5417? \u90A3\u4E48C", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/LockSupport/LockSupport\u7528\u6CD5.html", "/java/thread/JUCLock/LockSupport/LockSupport%E7%94%A8%E6%B3%95", "/java/thread/JUCLock/LockSupport/LockSupport\u7528\u6CD5.md", "/java/thread/JUCLock/LockSupport/LockSupport%E7%94%A8%E6%B3%95.md"]],
  ["v-a451c5f0", "/java/thread/JUCLock/LockSupport/", { "title": "LockSupport", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/JUCLock/LockSupport/index.html", "/java/thread/JUCLock/LockSupport/README.md"]],
  ["v-b87560d8", "/java/thread/JUCLock/ReentrantLock/", { "title": "ReentrantLock", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/JUCLock/ReentrantLock/index.html", "/java/thread/JUCLock/ReentrantLock/README.md"]],
  ["v-5d37ada4", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E4%B9%8B%E6%9D%A1%E4%BB%B6%E9%94%81Condition%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.html", { "title": "ReentrantLock\u4E4B\u6761\u4EF6\u9501Condition\u6E90\u7801\u5206\u6790", "type": "article", "readingTime": { "minutes": 9.3, "words": 2789 }, "excerpt": "ReentrantLock\u4E4B\u6761\u4EF6\u9501Condition\u6E90\u7801\u5206\u6790 1. \u7B80\u4ECB \u6761\u4EF6\u9501\uFF0C\u6307\u5728\u83B7\u5F97\u9501\u4E4B\u540E\uFF0C\u8FD8\u9700\u8981\u8FBE\u6210\u67D0\u4E9B\u6761\u4EF6\u540E\uFF0C\u624D\u80FD\u7EE7\u7EED\u6267\u884C\u7684\u9501\u3002\u4E14\u5FC5\u987B\u914D\u5408Lock\u4E00\u8D77\u4F7F\u7528\uFF0C\u4E5F\u5C31\u662F\u8BF4\u5FC5\u987B\u83B7\u5F97\u9501\u4E4B\u540E\u624D\u53EF\u4EE5\u8C03\u7528condition.await()\u65B9\u6CD5 2. \u6E90\u7801\u5206\u6790 ReentrantLock \u7684\u6761\u4EF6\u9501\u4F7F\u7528\u7684 AbstractQueuedSynchronizer \u4E2D\u7684Co", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/ReentrantLock/ReentrantLock\u4E4B\u6761\u4EF6\u9501Condition\u6E90\u7801\u5206\u6790.html", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E4%B9%8B%E6%9D%A1%E4%BB%B6%E9%94%81Condition%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90", "/java/thread/JUCLock/ReentrantLock/ReentrantLock\u4E4B\u6761\u4EF6\u9501Condition\u6E90\u7801\u5206\u6790.md", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E4%B9%8B%E6%9D%A1%E4%BB%B6%E9%94%81Condition%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.md"]],
  ["v-78904604", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E5%92%8C%E6%9D%A1%E4%BB%B6%E9%94%81Condition%E5%AE%9E%E7%8E%B0%E9%98%BB%E5%A1%9E%E9%98%9F%E5%88%97ArrayBlockingQueue.html", { "title": "ReentrantLock\u548C\u6761\u4EF6\u9501Condition\u5B9E\u73B0\u963B\u585E\u961F\u5217ArrayBlockingQueue", "type": "article", "readingTime": { "minutes": 1.71, "words": 514 }, "excerpt": "ReentrantLock\u548C\u6761\u4EF6\u9501Condition\u5B9E\u73B0\u963B\u585E\u961F\u5217ArrayBlockingQueue 1. \u7B80\u4ECB \u6BD4\u5982\u6700\u5178\u578B\u7684\u963B\u585E\u961F\u5217 ArrayBlockingQueue\uFF0C\u5F53\u961F\u5217\u4E2D\u6CA1\u6709\u5143\u7D20\u7684\u65F6\u5019\uFF0C\u4ED6\u65E0\u6CD5take\u51FA\u4E00\u4E2A\u5143\u7D20\uFF0C\u9700\u8981\u7B49\u5F85\u5176\u4ED6\u7EBF\u7A0B\u5165\u961F\u4E00\u4E2A\u5143\u7D20\u540E\u5524\u9192\u5B83\uFF0C\u624D\u80FD\u7EE7\u7EED\u5F39\u51FA\u5143\u7D20\u3002 1.1 \u7279\u70B9 \u963B\u585E\u961F\u5217\u662F\u4E00\u79CD\u7279\u6B8A\u7684\u5148\u8FDB\u5148\u51FA\u961F\u5217,\u5B83\u6709\u4EE5\u4E0B\u51E0\u4E2A\u7279\u70B9 1.\u5165\u961F\u548C\u51FA", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/ReentrantLock/ReentrantLock\u548C\u6761\u4EF6\u9501Condition\u5B9E\u73B0\u963B\u585E\u961F\u5217ArrayBlockingQueue.html", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E5%92%8C%E6%9D%A1%E4%BB%B6%E9%94%81Condition%E5%AE%9E%E7%8E%B0%E9%98%BB%E5%A1%9E%E9%98%9F%E5%88%97ArrayBlockingQueue", "/java/thread/JUCLock/ReentrantLock/ReentrantLock\u548C\u6761\u4EF6\u9501Condition\u5B9E\u73B0\u963B\u585E\u961F\u5217ArrayBlockingQueue.md", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E5%92%8C%E6%9D%A1%E4%BB%B6%E9%94%81Condition%E5%AE%9E%E7%8E%B0%E9%98%BB%E5%A1%9E%E9%98%9F%E5%88%97ArrayBlockingQueue.md"]],
  ["v-387904f4", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.html", { "title": "ReentrantLock\u6E90\u7801\u5206\u6790(\u4E00)-\u6574\u4F53\u6D41\u7A0B", "type": "article", "readingTime": { "minutes": 8.52, "words": 2557 }, "excerpt": "ReentrantLock\u6E90\u7801\u5206\u6790(\u4E00)-\u6574\u4F53\u6D41\u7A0B 1. \u7C7B\u7684\u7EE7\u627F\u5173\u7CFB ReentrantLock \u5B9E\u73B0\u4E86 Lock\u63A5\u53E3\uFF0CLock\u63A5\u53E3\u4E2D\u5B9A\u4E49\u4E86 lock\u4E0E unlock\u76F8\u5173\u64CD\u4F5C\uFF0C\u5E76\u4E14\u8FD8\u5B58\u5728 newCondition\u65B9\u6CD5\uFF0C\u8868\u793A\u751F\u6210\u4E00\u4E2A\u6761\u4EF6\u3002 2. \u7C7B\u7684\u5185\u90E8\u7C7B ------ ReentrantLock \u603B\u5171\u6709\u4E09\u4E2A\u5185\u90E8\u7C7B\uFF0C\u5E76\u4E14\u4E09\u4E2A\u5185\u90E8\u7C7B\u662F\u7D27\u5BC6\u76F8\u5173\u7684\uFF0C\u4E0B\u9762\u5148\u770B\u4E09\u4E2A\u7C7B", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/ReentrantLock/ReentrantLock\u6E90\u7801\u5206\u6790.html", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90", "/java/thread/JUCLock/ReentrantLock/ReentrantLock\u6E90\u7801\u5206\u6790.md", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.md"]],
  ["v-36cb5d1f", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E4%B8%89.html", { "title": "ReentrantLock\u6E90\u7801\u5206\u6790(\u4E09)-\u5E94\u7528", "type": "article", "readingTime": { "minutes": 2.82, "words": 847 }, "excerpt": "ReentrantLock\u6E90\u7801\u5206\u6790(\u4E09)-\u5E94\u7528 1. AQS\u5E94\u7528 ReentrantLock\u7684\u53EF\u91CD\u5165\u5E94\u7528\uFF1AReentrantLock\u7684\u53EF\u91CD\u5165\u6027\u662F AQS\u5F88\u597D\u7684\u5E94\u7528\u4E4B\u4E00\uFF0C\u5728\u4E86\u89E3\u5B8C\u4E0A\u8FF0\u77E5\u8BC6\u70B9\u4EE5\u540E\uFF0C\u6211\u4EEC\u5F88\u5BB9\u6613\u5F97\u77E5ReentrantLock\u5B9E\u73B0\u53EF\u91CD\u5165\u7684\u65B9\u6CD5\u3002\u5728ReentrantLock\u91CC\u9762\uFF0C\u4E0D\u7BA1\u662F\u516C\u5E73\u9501\u8FD8\u662F\u975E\u516C\u5E73\u9501\uFF0C\u90FD\u6709\u4E00\u6BB5\u903B\u8F91\u3002 \u516C\u5E73\u9501\uFF1A \u975E\u516C\u5E73\u9501\uFF1A \u4ECE\u4E0A\u9762\u8FD9\u4E24\u6BB5", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/ReentrantLock/ReentrantLock\u6E90\u7801\u5206\u6790\u4E09.html", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E4%B8%89", "/java/thread/JUCLock/ReentrantLock/ReentrantLock\u6E90\u7801\u5206\u6790\u4E09.md", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E4%B8%89.md"]],
  ["v-7e43ba5e", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E4%BA%8C.html", { "title": "ReentrantLock\u6E90\u7801\u5206\u6790(\u4E8C)-\u83B7\u53D6\u9501\u7EC6\u8282", "type": "article", "readingTime": { "minutes": 16.94, "words": 5082 }, "excerpt": "ReentrantLock\u6E90\u7801\u5206\u6790(\u4E8C)-\u83B7\u53D6\u9501\u7EC6\u8282 1. ReentrantLock \u4E2D\u7EBF\u7A0B\u52A0\u5165\u7B49\u5F85\u961F\u5217 1.1 \u52A0\u5165\u961F\u5217\u7684\u65F6\u673A \u5F53\u6267\u884CAcquire(1)\u65F6\uFF0C\u4F1A\u901A\u8FC7tryAcquire\u83B7\u53D6\u9501\u3002\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u5982\u679C\u83B7\u53D6\u9501\u5931\u8D25\uFF0C\u5C31\u4F1A\u8C03\u7528 addWaiter\u52A0\u5165\u5230\u7B49\u5F85\u961F\u5217\u4E2D\u53BB\u3002 \u5728AQS \u4E2D \u5728 ReentrantLock 1.2 \u5982\u4F55\u52A0\u5165\u961F\u5217 \u83B7\u53D6\u9501\u5931\u8D25\u540E\uFF0C\u4F1A", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/ReentrantLock/ReentrantLock\u6E90\u7801\u5206\u6790\u4E8C.html", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E4%BA%8C", "/java/thread/JUCLock/ReentrantLock/ReentrantLock\u6E90\u7801\u5206\u6790\u4E8C.md", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E4%BA%8C.md"]],
  ["v-d8840068", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E9%87%8D%E5%85%A5%E9%94%81.html", { "title": "ReentrantLock\u91CD\u5165\u9501", "type": "article", "readingTime": { "minutes": 3.77, "words": 1130 }, "excerpt": "ReentrantLock\u91CD\u5165\u9501 1. \u7B80\u4ECB ReentrantLock\u662F\u53EF\u91CD\u5165\u7684\u4E92\u65A5\u9501\uFF0C\u867D\u7136\u5177\u6709\u4E0Esynchronized\u76F8\u540C\u529F\u80FD\uFF0C\u4F46\u662F\u4F1A\u6BD4synchronized\u66F4\u52A0\u7075\u6D3B\uFF08\u5177\u6709\u66F4\u591A\u7684\u65B9\u6CD5\uFF09\u3002 2. ReentrantLock \u548C Synchronized\u7684\u5BF9\u6BD4 ReentrantLock Synchronized ---------- ---------", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/JUCLock/ReentrantLock/ReentrantLock\u91CD\u5165\u9501.html", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E9%87%8D%E5%85%A5%E9%94%81", "/java/thread/JUCLock/ReentrantLock/ReentrantLock\u91CD\u5165\u9501.md", "/java/thread/JUCLock/ReentrantLock/ReentrantLock%E9%87%8D%E5%85%A5%E9%94%81.md"]],
  ["v-0485f54d", "/java/thread/Keywords/final/", { "title": "final", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/Keywords/final/index.html", "/java/thread/Keywords/final/README.md"]],
  ["v-6d635beb", "/java/thread/Keywords/final/final%E5%85%B3%E9%94%AE%E5%AD%97.html", { "title": "final\u5173\u952E\u5B57", "type": "article", "readingTime": { "minutes": 4.59, "words": 1376 }, "excerpt": "final\u5173\u952E\u5B57 0. \u9762\u8BD5 \u6240\u6709\u7684final\u4FEE\u9970\u7684\u5B57\u6BB5\u90FD\u662F\u7F16\u8BD1\u671F\u5E38\u91CF\u5417?; \u5982\u4F55\u7406\u89E3private\u6240\u4FEE\u9970\u7684\u65B9\u6CD5\u662F\u9690\u5F0F\u7684final?; \u8BF4\u8BF4final\u7C7B\u578B\u7684\u7C7B\u5982\u4F55\u62D3\u5C55? \u6BD4\u5982String\u662Ffinal\u7C7B\u578B\uFF0C\u6211\u4EEC\u60F3\u5199\u4E2AMyString\u590D\u7528\u6240\u6709String\u4E2D\u65B9\u6CD5\uFF0C\u540C\u65F6\u589E\u52A0\u4E00\u4E2A\u65B0\u7684toMyString()\u7684\u65B9\u6CD5\uFF0C\u5E94\u8BE5\u5982\u4F55\u505A?; final\u65B9\u6CD5\u53EF\u4EE5\u88AB\u91CD\u8F7D\u5417? \u53EF\u4EE5; ", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/Keywords/final/final\u5173\u952E\u5B57.html", "/java/thread/Keywords/final/final%E5%85%B3%E9%94%AE%E5%AD%97", "/java/thread/Keywords/final/final\u5173\u952E\u5B57.md", "/java/thread/Keywords/final/final%E5%85%B3%E9%94%AE%E5%AD%97.md"]],
  ["v-c97c4172", "/java/thread/Keywords/synchronized/", { "title": "synchronized", "type": "article", "readingTime": { "minutes": 0.04, "words": 13 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/Keywords/synchronized/index.html", "/java/thread/Keywords/synchronized/README.md"]],
  ["v-2eba8485", "/java/thread/Keywords/synchronized/Synchronized%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.html", { "title": "Synchronized\u7684\u5B9E\u73B0\u539F\u7406", "type": "article", "readingTime": { "minutes": 4.49, "words": 1347 }, "excerpt": "Synchronized\u7684\u5B9E\u73B0\u539F\u7406 1. \u7B80\u4ECB synchronized\uFF0C\u662FJava\u4E2D\u7528\u4E8E\u89E3\u51B3\u5E76\u53D1\u60C5\u51B5\u4E0B\u6570\u636E\u540C\u6B65\u8BBF\u95EE\u7684\u4E00\u4E2A\u5F88\u91CD\u8981\u7684\u5173\u952E\u5B57\u3002\u5F53\u6211\u4EEC\u60F3\u8981\u4FDD\u8BC1\u4E00\u4E2A\u5171\u4EAB\u8D44\u6E90\u5728\u540C\u4E00\u65F6\u95F4\u53EA\u4F1A\u88AB\u4E00\u4E2A\u7EBF\u7A0B\u8BBF\u95EE\u5230\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5728\u4EE3\u7801\u4E2D\u4F7F\u7528synchronized\u5173\u952E\u5B57\u5BF9\u7C7B\u6216\u8005\u5BF9\u8C61\u52A0\u9501\u3002 \u90A3\u4E48synchronized\u5173\u952E\u5B57\u7684\u5B9E\u73B0\u539F\u7406\u662F\u4EC0\u4E48\u5462\uFF1F 2. \u51C6\u5907\u5DE5\u4F5C\uFF08\u53CD\u7F16\u8BD1\uFF09 2.1 \u6E90", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/Keywords/synchronized/Synchronized\u7684\u5B9E\u73B0\u539F\u7406.html", "/java/thread/Keywords/synchronized/Synchronized%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86", "/java/thread/Keywords/synchronized/Synchronized\u7684\u5B9E\u73B0\u539F\u7406.md", "/java/thread/Keywords/synchronized/Synchronized%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.md"]],
  ["v-9e1d9d06", "/java/thread/Keywords/synchronized/synchronized%E5%85%B3%E9%94%AE%E5%AD%97.html", { "title": "synchronized\u5173\u952E\u5B57", "type": "article", "readingTime": { "minutes": 7.9, "words": 2370 }, "excerpt": "synchronized\u5173\u952E\u5B57 1. \u7B80\u4ECB synchronized\u5173\u952E\u5B57\u89E3\u51B3\u7684\u662F\u591A\u4E2A\u7EBF\u7A0B\u4E4B\u95F4\u8BBF\u95EE\u8D44\u6E90\u7684\u540C\u6B65\u6027\uFF0Csynchronize\u5173\u952E\u5B57\u53EF\u4EE5\u4FDD\u8BC1\u88AB\u5B83\u4FEE\u9970\u7684\u65B9\u6CD5\u6216\u8005\u4EE3\u7801\u5757\u5728\u4EFB\u610F\u65F6\u523B\u53EA\u80FD\u6709\u4E00\u4E2A\u7EBF\u7A0B\u6267\u884C 1.1 synchronized \u5982\u4F55\u4FDD\u8BC1\u591A\u7EBF\u7A0B\u4E4B\u95F4\u8BBF\u95EE\u8D44\u6E90\u7684\u540C\u6B65\u6027 \u539F\u5B50\u6027; \u53EF\u89C1\u6027; \u6709\u5E8F\u6027; \u5177\u4F53\u53EF\u53C2\u7167volatile\u5173\u952E\u5B57 1.2 java\u65E9\u671Fsy", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/Keywords/synchronized/synchronized\u5173\u952E\u5B57.html", "/java/thread/Keywords/synchronized/synchronized%E5%85%B3%E9%94%AE%E5%AD%97", "/java/thread/Keywords/synchronized/synchronized\u5173\u952E\u5B57.md", "/java/thread/Keywords/synchronized/synchronized%E5%85%B3%E9%94%AE%E5%AD%97.md"]],
  ["v-055f70b2", "/java/thread/Keywords/synchronized/synchronized%E8%AF%A6%E8%A7%A3.html", { "title": "synchronized\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 13.27, "words": 3980 }, "excerpt": "synchronized\u8BE6\u89E3 0. \u9762\u8BD5\u9898 Synchronized\u53EF\u4EE5\u4F5C\u7528\u5728\u54EA\u91CC? \u5206\u522B\u901A\u8FC7\u5BF9\u8C61\u9501\u548C\u7C7B\u9501\u8FDB\u884C\u4E3E\u4F8B\u3002; Synchronized\u672C\u8D28\u4E0A\u662F\u901A\u8FC7\u4EC0\u4E48\u4FDD\u8BC1\u7EBF\u7A0B\u5B89\u5168\u7684? \u5206\u4E09\u4E2A\u65B9\u9762\u56DE\u7B54\uFF1A\u52A0\u9501\u548C\u91CA\u653E\u9501\u7684\u539F\u7406\uFF0C\u53EF\u91CD\u5165\u539F\u7406\uFF0C\u4FDD\u8BC1\u53EF\u89C1\u6027\u539F\u7406\u3002; Synchronized\u7531\u4EC0\u4E48\u6837\u7684\u7F3A\u9677? Java Lock\u662F\u600E\u4E48\u5F25\u8865\u8FD9\u4E9B\u7F3A\u9677\u7684\u3002; Synchronized\u548CL", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/Keywords/synchronized/synchronized\u8BE6\u89E3.html", "/java/thread/Keywords/synchronized/synchronized%E8%AF%A6%E8%A7%A3", "/java/thread/Keywords/synchronized/synchronized\u8BE6\u89E3.md", "/java/thread/Keywords/synchronized/synchronized%E8%AF%A6%E8%A7%A3.md"]],
  ["v-a9a9a482", "/java/thread/Keywords/volatile/", { "title": "volatile", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/Keywords/volatile/index.html", "/java/thread/Keywords/volatile/README.md"]],
  ["v-44656a92", "/java/thread/Keywords/volatile/java%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B.html", { "title": "Java\u5185\u5B58\u6A21\u578B", "type": "article", "readingTime": { "minutes": 15.05, "words": 4516 }, "excerpt": 'Java\u5185\u5B58\u6A21\u578B "\u5728\u4ECB\u7ECDJava\u5185\u5B58\u6A21\u578B\u4E4B\u524D\uFF0C\u5148\u6765\u770B\u4E00\u4E0B\u5230\u5E95\u4EC0\u4E48\u662F\u8BA1\u7B97\u673A\u5185\u5B58\u6A21\u578B\uFF0C\u7136\u540E\u518D\u6765\u770BJava\u5185\u5B58\u6A21\u578B\u5728\u8BA1\u7B97\u673A\u5185\u5B58\u6A21\u578B\u7684\u57FA\u7840\u4E0A\u505A\u4E86\u54EA\u4E9B\u4E8B\u60C5\u3002\u8981\u8BF4\u8BA1\u7B97\u673A\u7684\u5185\u5B58\u6A21\u578B\uFF0C\u5C31\u8981\u8BF4\u4E00\u4E0B\u4E00\u6BB5\u53E4\u8001\u7684\u5386\u53F2\uFF0C\u770B\u4E00\u4E0B\u4E3A\u4EC0\u4E48\u8981\u6709\u5185\u5B58\u6A21\u578B\u3002" 1. \u4E3A\u4EC0\u4E48\u8981\u6709\u5185\u5B58\u6A21\u578B \u5185\u5B58\u6A21\u578B\uFF0C\u82F1\u6587\u540DMemory Model\uFF0C\u4ED6\u662F\u4E00\u4E2A\u5F88\u8001\u7684\u8001\u53E4\u8463\u4E86\u3002\u4ED6\u662F\u4E0E\u8BA1\u7B97\u673A\u786C\u4EF6\u6709\u5173\u7684\u4E00\u4E2A\u6982\u5FF5\u3002\u90A3\u4E48\u6211\u5148\u7ED9', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/Keywords/volatile/java\u5185\u5B58\u6A21\u578B.html", "/java/thread/Keywords/volatile/java%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B", "/java/thread/Keywords/volatile/java\u5185\u5B58\u6A21\u578B.md", "/java/thread/Keywords/volatile/java%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B.md"]],
  ["v-5c037bfd", "/java/thread/Keywords/volatile/volatile%E5%85%B3%E9%94%AE%E5%AD%97.html", { "title": "volatile\u5173\u952E\u5B57", "type": "article", "readingTime": { "minutes": 7.53, "words": 2258 }, "excerpt": 'volatile\u5173\u952E\u5B57 "Java\u8BED\u8A00\u4E3A\u4E86\u89E3\u51B3\u5E76\u53D1\u7F16\u7A0B\u4E2D\u5B58\u5728\u7684\u539F\u5B50\u6027\u3001\u53EF\u89C1\u6027\u548C\u6709\u5E8F\u6027\u95EE\u9898\uFF0C\u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u548C\u5E76\u53D1\u5904\u7406\u76F8\u5173\u7684\u5173\u952E\u5B57\uFF0C\u6BD4\u5982synchronized\u3001volatile\u3001final\u3001concurren\u5305\u7B49" 1. \u7B80\u4ECB volatile\u901A\u5E38\u88AB\u6BD4\u55BB\u6210"\u8F7B\u91CF\u7EA7\u7684synchronized"\uFF0C\u4E5F\u662FJava\u5E76\u53D1\u7F16\u7A0B\u4E2D\u6BD4\u8F83\u91CD\u8981\u7684\u4E00\u4E2A\u5173\u952E\u5B57\u3002\u548Csynchronized', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/Keywords/volatile/volatile\u5173\u952E\u5B57.html", "/java/thread/Keywords/volatile/volatile%E5%85%B3%E9%94%AE%E5%AD%97", "/java/thread/Keywords/volatile/volatile\u5173\u952E\u5B57.md", "/java/thread/Keywords/volatile/volatile%E5%85%B3%E9%94%AE%E5%AD%97.md"]],
  ["v-630cd524", "/java/thread/Keywords/volatile/volatile%E5%85%B3%E9%94%AE%E5%AD%97old.html", { "title": "volatile\u5173\u952E\u5B57", "type": "article", "readingTime": { "minutes": 24.78, "words": 7435 }, "excerpt": 'volatile\u5173\u952E\u5B57 volatile \u5173\u952E\u5B57\u4E0EJava\u5185\u5B58\u6A21\u578B\u6709\u5173\uFF0C\u6240\u4EE5\u5148\u8981\u638C\u63E1\u5185\u5B58\u6A21\u578B\u76F8\u5173\u7684\u6982\u5FF5\u548C\u77E5\u8BC6\uFF0C\u7136\u540E\u6211\u4EEC\u518D\u5206\u6790volatitle\u5173\u952E\u5B57\u7684\u5B9E\u73B0\u539F\u7406\uFF0C\u6700\u540E\u603B\u7ED3\u4F7F\u7528volatile\u7684\u4F7F\u7528\u573A\u666F 1. \u5185\u5B58\u6A21\u578B\u7684\u76F8\u5173\u6982\u5FF5 CPU\u7684\u901F\u5EA6\u8FDC\u6BD4\u5185\u5B58\u5757\uFF0C\u6240\u4EE5\u5BF9\u6570\u636E\u7684\u8BFB\u5199\uFF0C\u653E\u5728CPU\u7684\u9AD8\u901F\u7F13\u5B58\u4E2D\u5B8C\u6210; "\u5927\u5BB6\u90FD\u77E5\u9053\uFF0C\u8BA1\u7B97\u673A\u5728\u6267\u884C\u7A0B\u5E8F\u65F6\uFF0C\u6BCF\u6761\u6307\u4EE4\u90FD\u662F\u5728CPU\u4E2D\u6267\u884C\u7684', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/Keywords/volatile/volatile\u5173\u952E\u5B57old.html", "/java/thread/Keywords/volatile/volatile%E5%85%B3%E9%94%AE%E5%AD%97old", "/java/thread/Keywords/volatile/volatile\u5173\u952E\u5B57old.md", "/java/thread/Keywords/volatile/volatile%E5%85%B3%E9%94%AE%E5%AD%97old.md"]],
  ["v-e7cad4ca", "/java/thread/base/ThreadLocal/", { "title": "ThreadLocal", "type": "article", "readingTime": { "minutes": 0.04, "words": 11 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/thread/base/ThreadLocal/index.html", "/java/thread/base/ThreadLocal/README.md"]],
  ["v-53d8149a", "/java/thread/base/ThreadLocal/ThreadLocal.html", { "title": "ThreadLocal", "type": "article", "readingTime": { "minutes": 4.95, "words": 1486 }, "excerpt": "ThreadLocal 1. \u4EC0\u4E48\u662FThreadLocal \u6211\u4EEC\u5148\u6765\u770B\u4E0BJDK \u7684\u6587\u6863\u4ECB\u7ECD ThreadLocal\u63D0\u4F9B\u4E86\u7EBF\u7A0B\u7684\u5C40\u90E8\u53D8\u91CF\u3002\u6BCF\u4E2A\u7EBF\u7A0B\u90FD\u53EF\u4EE5\u901A\u8FC7set()\u548Cget()\u6765\u5BF9\u8FD9\u4E2A \u5C40\u90E8\u53D8\u91CF\u8FDB\u884C\u64CD\u4F5C\uFF0C\u4F46\u4E0D\u4F1A\u548C\u5176\u4ED6\u7EBF\u7A0B\u7684\u5C40\u90E8\u53D8\u91CF\u8FDB\u884C\u51B2\u7A81\u3002\u5B9E\u73B0\u4E86\u7EBF\u7A0B\u7684\u6570\u636E\u9694\u79BB \u7B80\u8981\u8A00\u4E4B\uFF1A\u5F80ThreadLocal\u4E2D\u586B\u5145\u7684\u53D8\u91CF\u5C5E\u4E8E\u5F53\u524D\u7EBF\u7A0B\uFF0C\u8BE5\u53D8\u91CF\u5BF9\u5176\u4ED6\u7EBF\u7A0B\u800C\u8A00\u662F\u9694\u79BB\u7684\u3002 2. ", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/ThreadLocal/ThreadLocal", "/java/thread/base/ThreadLocal/ThreadLocal.md"]],
  ["v-e9a74b8c", "/java/thread/base/ThreadLocal/ThreadLocal%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%BD%93%E5%AF%BC%E8%87%B4%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F.html", { "title": "ThreadLocal\u4F7F\u7528\u4E0D\u5F53\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F", "type": "article", "readingTime": { "minutes": 0.39, "words": 117 }, "excerpt": "ThreadLocal\u4F7F\u7528\u4E0D\u5F53\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F \u7EBF\u7A0B\u6C60\u7684\u4E00\u4E2A\u7EBF\u7A0B\u4F7F\u7528\u5B8C Threadlocal \u5BF9\u8C61\u4E4B\u540E\uFF0C\u7531\u4E8E\u7EBF\u7A0B\u6C60\u4E2D\u7684\u7EBF\u7A0B\u4E0D\u4F1A\u9000\u51FA\uFF0C\u7EBF\u7A0B\u6C60\u4E2D\u7684\u7EBF\u7A0B\u6C60\u5B58\u5728\uFF0C\u540C\u65F6ThreadLocal\u53D8\u91CF\u4E5F\u4F1A\u5B58\u5728\uFF0C\u5360\u7528\u5185\u5B58\uFF0C\u9020\u6210OOM\u6EA2\u51FA\u3002 \u53C2\u8003\u6587\u7AE0 \u591A\u56FE\u6DF1\u5165\u5206\u6790ThreadLocal\u539F\u7406 Java\u591A\u7EBF\u7A0B\u7F16\u7A0B-\uFF089\uFF09-ThreadLocal\u9020\u6210OOM\u5185\u5B58\u6EA2\u51FA\u6848\u4F8B\u6F14\u793A\u4E0E\u539F\u7406\u5206\u6790", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/ThreadLocal/ThreadLocal\u4F7F\u7528\u4E0D\u5F53\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F.html", "/java/thread/base/ThreadLocal/ThreadLocal%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%BD%93%E5%AF%BC%E8%87%B4%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F", "/java/thread/base/ThreadLocal/ThreadLocal\u4F7F\u7528\u4E0D\u5F53\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F.md", "/java/thread/base/ThreadLocal/ThreadLocal%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%BD%93%E5%AF%BC%E8%87%B4%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F.md"]],
  ["v-1733f725", "/java/thread/base/ThreadLocal/ThreadLocal%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF.html", { "title": "ThreadLocal\u4F7F\u7528\u573A\u666F", "type": "article", "readingTime": { "minutes": 1.39, "words": 418 }, "excerpt": "ThreadLocal\u4F7F\u7528\u573A\u666F 1. \u573A\u666F 1.1 \u591A\u6570\u636E\u6E90\u60C5\u51B5 \u6211\u4EEC\u9879\u76EE\u4E2D\u5982\u679C\u5B58\u5728\u591A\u6570\u636E\u6E90\u7684\u60C5\u51B5\u3002\u4E3A\u4E86\u4E0D\u5F71\u54CD\u5176\u4ED6\u7EBF\u7A0B\u7684\u6570\u636E\u6E90\u60C5\u51B5\u3002\u6211\u4EEC\u5207\u6362\u7684\u65F6\u5019\u3002\u4E00\u822C\u4F1A\u4F7F\u7528ThreadLocal \u5B58\u50A8\u5F53\u524D\u6570\u636E\u6E90 1.2 \u8BB0\u5F55\u65E5\u5FD7\u65F6\u95F4 \u5728\u4EFB\u52A1\u6267\u884C\u524D\u540E\uFF0C\u8BB0\u5F55\u65F6\u95F4 1.3 \u5FAE\u4FE1\u767B\u5F55 1. \u5FAE\u4FE1\u767B\u5F55\u540E(\u6B64\u65F6\u53EA\u83B7\u53D6\u4E86Openid\u548CSessionKey\u4FE1\u606F ) 2. \u5C06Openid\u548C", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/ThreadLocal/ThreadLocal\u4F7F\u7528\u573A\u666F.html", "/java/thread/base/ThreadLocal/ThreadLocal%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF", "/java/thread/base/ThreadLocal/ThreadLocal\u4F7F\u7528\u573A\u666F.md", "/java/thread/base/ThreadLocal/ThreadLocal%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF.md"]],
  ["v-4225fb47", "/java/thread/base/ThreadLocal/ThreadLocal%E8%AF%A6%E8%A7%A3.html", { "title": "ThreadLocal\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 13.54, "words": 4062 }, "excerpt": 'ThreadLocal\u8BE6\u89E3 0. \u9762\u8BD5\u9898 \u4EC0\u4E48\u662FThreadLocal? \u7528\u6765\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\u7684?; \u8BF4\u8BF4\u4F60\u5BF9ThreadLocal\u7684\u7406\u89E3; ThreadLocal\u662F\u5982\u4F55\u5B9E\u73B0\u7EBF\u7A0B\u9694\u79BB\u7684?; \u4E3A\u4EC0\u4E48ThreadLocal\u4F1A\u9020\u6210\u5185\u5B58\u6CC4\u9732? \u5982\u4F55\u89E3\u51B3; \u8FD8\u6709\u54EA\u4E9B\u4F7F\u7528ThreadLocal\u7684\u5E94\u7528\u573A\u666F?; 1. \u7B80\u4ECB 1.1 \u7EBF\u7A0B\u5B89\u5168\u89E3\u51B3\u65B9\u6848\u4E4B\u4E00 " \u7EBF\u7A0B\u5B89\u5168\uFF1A\u662F\u6307\u5E7F\u4E49\u4E0A', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/base/ThreadLocal/ThreadLocal\u8BE6\u89E3.html", "/java/thread/base/ThreadLocal/ThreadLocal%E8%AF%A6%E8%A7%A3", "/java/thread/base/ThreadLocal/ThreadLocal\u8BE6\u89E3.md", "/java/thread/base/ThreadLocal/ThreadLocal%E8%AF%A6%E8%A7%A3.md"]],
  ["v-31d26e23", "/java/thread/concurrent/Atomic/AtomicInteger%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.html", { "title": "\u539F\u5B50\u7C7BAtomicInteger\u6E90\u7801\u89E3\u6790", "type": "article", "readingTime": { "minutes": 3.14, "words": 943 }, "excerpt": "\u539F\u5B50\u7C7BAtomicInteger\u6E90\u7801\u89E3\u6790 1. \u6838\u5FC3\u539F\u7406 1.1 \u64CD\u4F5C\u5BF9\u8C61value AtomicInteger\u7528\u4E8E\u5B9E\u73B0\u901A\u8FC7\u539F\u5B50\u7684\u65B9\u5F0F\u66F4\u65B0\u5355\u4E2A\u53D8\u91CF\u3002AtomicInteger \u4E2D\u4FDD\u5B58\u4E86\u4E00\u4E2A\u6838\u5FC3\u5B57\u6BB5value\uFF0C\u5B83\u5C31\u4EE3\u8868\u4E86Atomiclnteger \u7684\u5F53\u524D\u5B9E\u9645\u53D6\u503C\uFF0C\u6240\u6709\u7684\u65B9\u6CD5\u90FD\u662F\u56F4\u7ED5\u8BE5\u503C\u8FDB\u884C\u7684\u3002 1.2 \u504F\u79FB\u91CFvalueOffset \u5C5E\u6027valueOffset\uFF0C", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/Atomic/AtomicInteger\u6E90\u7801\u89E3\u6790.html", "/java/thread/concurrent/Atomic/AtomicInteger%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90", "/java/thread/concurrent/Atomic/AtomicInteger\u6E90\u7801\u89E3\u6790.md", "/java/thread/concurrent/Atomic/AtomicInteger%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.md"]],
  ["v-b1782f30", "/java/thread/concurrent/Atomic/AtomicStampedReference%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.html", { "title": "\u7248\u672C\u53F7\u539F\u5B50\u7C7BAtomicStampedReference\u6E90\u7801\u89E3\u6790", "type": "article", "readingTime": { "minutes": 5.52, "words": 1655 }, "excerpt": "\u7248\u672C\u53F7\u539F\u5B50\u7C7BAtomicStampedReference\u6E90\u7801\u89E3\u6790 1. \u7B80\u4ECB \u901A\u8FC7\u539F\u5B50\u7684\u65B9\u5F0F\u66F4\u65B0\u5355\u4E2A\u53D8\u91CF\u7684\u539F\u5B50\u7C7B\u7684\u5347\u7EA7\u7248\uFF0CAtomic\u5305\u63D0\u4F9B\u4E86\u4EE5\u4E0B2\u4E2A\u7C7B\uFF1A AtomicMarkableReference\uFF1A\u7EF4\u62A4\u5E26\u6709\u6807\u8BB0\u4F4D\u7684\u5BF9\u8C61\u5F15\u7528\uFF0C\u53EF\u4EE5\u539F\u5B50\u65B9\u5F0F\u5BF9\u5176\u8FDB\u884C\u66F4\u65B0\u3002; AtomicStampedReference\uFF1A\u7EF4\u62A4\u5E26\u6709\u6574\u6570\u6807\u5FD7\u7684\u5BF9\u8C61\u5F15\u7528\uFF0C\u53EF\u7528\u539F\u5B50\u65B9\u5F0F\u5BF9\u5176\u8FDB\u884C\u66F4\u65B0\u3002", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/Atomic/AtomicStampedReference\u6E90\u7801\u89E3\u6790.html", "/java/thread/concurrent/Atomic/AtomicStampedReference%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90", "/java/thread/concurrent/Atomic/AtomicStampedReference\u6E90\u7801\u89E3\u6790.md", "/java/thread/concurrent/Atomic/AtomicStampedReference%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.md"]],
  ["v-39fd92ed", "/java/thread/concurrent/Atomic/Atomic%E5%8E%9F%E5%AD%90%E7%B1%BB.html", { "title": "Atomic\u539F\u5B50\u7C7B", "type": "article", "readingTime": { "minutes": 6.6, "words": 1981 }, "excerpt": 'Atomic\u539F\u5B50\u7C7B 1. \u7B80\u4ECB Java\u4ECEJDK1.5\u5F00\u59CB\u63D0\u4F9B\u4E86java.util.concurrent.atomic\u5305\uFF0Catomic\u5305\u4E2D\u7684\u7C7B\u7528\u4E8E\u5728\u591A\u7EBF\u7A0B\u73AF\u5883\u4E0B\u5B9E\u73B0\u5355\u4E2A\u53D8\u91CF\u591A\u4E2A\u72EC\u7ACB\u64CD\u4F5C\uFF08\u6BD4\u5982\u8BFB-\u5199\uFF09\u7684\u8FDE\u7EED\u539F\u5B50\u6027\u3002 \u5E76\u4E14\u90FD\u6BD4\u8F83\u9AD8\u6548\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u90FD\u662F\u7531\u57FA\u4E8E\u504F\u79FB\u91CF\uFF08\u7C7B\u4F3C\u4E8E\u6307\u9488\uFF09\u7684\u975E\u963B\u585ECAS\u7B97\u6CD5\u5B9E\u73B0\uFF0C\u7528\u4E8E\u66FF\u4EE3\u9501\u7684\u4F7F\u7528\u3002 "\u65E0\u9501\u7684\u8FDB\u884C\u539F\u5B50\u64CD\u4F5C\uFF0C\u7528\u4E8E\u66FF\u4EE3\u9501\u7684\u4F7F\u7528" "" ', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/Atomic/Atomic\u539F\u5B50\u7C7B.html", "/java/thread/concurrent/Atomic/Atomic%E5%8E%9F%E5%AD%90%E7%B1%BB", "/java/thread/concurrent/Atomic/Atomic\u539F\u5B50\u7C7B.md", "/java/thread/concurrent/Atomic/Atomic%E5%8E%9F%E5%AD%90%E7%B1%BB.md"]],
  ["v-5634669d", "/java/thread/concurrent/Atomic/", { "title": "\u539F\u5B50\u7C7B", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.06, "words": 17 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/concurrent/Atomic/index.html", "/java/thread/concurrent/Atomic/README.md"]],
  ["v-62d4a013", "/java/thread/concurrent/ThreadPoolTaskExecutor/ThreadPoolTaskExecutor%E5%92%8CThreadPoolExecutor%E6%9C%89%E4%BD%95%E5%8C%BA%E5%88%AB.html", { "title": "ThreadPoolTaskExecutor\u548CThreadPoolExecutor\u6709\u4F55\u533A\u522B?", "type": "article", "readingTime": { "minutes": 1.02, "words": 305 }, "excerpt": "ThreadPoolTaskExecutor\u548CThreadPoolExecutor\u6709\u4F55\u533A\u522B? 1. \u533A\u522B 1. \u6240\u5C5E\u5305\u4E0D\u540C\uFF1A ThreadPoolTaskExecutor \u5728 spring core\u5305\u4E2D; ThreadPoolExecutor \u662FJDK\u4E2D\u7684JUC; 2. ThreadPoolTaskExecutor \u662F\u5BF9ThreadPoolExecutor\u8FDB", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/ThreadPoolTaskExecutor/ThreadPoolTaskExecutor\u548CThreadPoolExecutor\u6709\u4F55\u533A\u522B.html", "/java/thread/concurrent/ThreadPoolTaskExecutor/ThreadPoolTaskExecutor%E5%92%8CThreadPoolExecutor%E6%9C%89%E4%BD%95%E5%8C%BA%E5%88%AB", "/java/thread/concurrent/ThreadPoolTaskExecutor/ThreadPoolTaskExecutor\u548CThreadPoolExecutor\u6709\u4F55\u533A\u522B.md", "/java/thread/concurrent/ThreadPoolTaskExecutor/ThreadPoolTaskExecutor%E5%92%8CThreadPoolExecutor%E6%9C%89%E4%BD%95%E5%8C%BA%E5%88%AB.md"]],
  ["v-6e5f8241", "/java/thread/concurrent/cas/", { "title": "CAS", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/concurrent/cas/index.html", "/java/thread/concurrent/cas/README.md"]],
  ["v-525ddd8c", "/java/thread/concurrent/cas/UnSafe%E7%B1%BB%E8%AF%A6%E8%A7%A3.html", { "title": "UnSafe\u7C7B\u8BE6\u89E3", "type": "article", "readingTime": { "minutes": 3.94, "words": 1182 }, "excerpt": 'UnSafe\u7C7B\u8BE6\u89E3 "Java\u539F\u5B50\u7C7B\u662F\u901A\u8FC7UnSafe\u7C7B\u5B9E\u73B0\u7684\uFF0C\u8FD9\u8282\u4E3B\u8981\u5206\u6790\u4E0BUnSafe\u7C7B\u3002UnSafe\u7C7B\u5728J.U.C\u4E2DCAS\u64CD\u4F5C\u6709\u5F88\u5E7F\u6CDB\u7684\u5E94\u7528\u3002" 1. \u7B80\u4ECB Unsafe\u662F\u4F4D\u4E8Esun.misc\u5305\u4E0B\u7684\u4E00\u4E2A\u7C7B\uFF0C\u4E3B\u8981\u63D0\u4F9B\u4E00\u4E9B\u7528\u4E8E\u6267\u884C\u4F4E\u7EA7\u522B\u3001\u4E0D\u5B89\u5168\u64CD\u4F5C\u7684\u65B9\u6CD5\uFF0C \u5982\u76F4\u63A5\u8BBF\u95EE\u7CFB\u7EDF\u5185\u5B58\u8D44\u6E90; \u81EA\u4E3B\u7BA1\u7406\u5185\u5B58\u8D44\u6E90\u7B49; \u8FD9\u4E9B\u65B9\u6CD5\u5728\u63D0\u5347Java\u8FD0\u884C\u6548\u7387\u3001\u589E\u5F3AJava\u8BED\u8A00\u5E95\u5C42', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/cas/UnSafe\u7C7B\u8BE6\u89E3.html", "/java/thread/concurrent/cas/UnSafe%E7%B1%BB%E8%AF%A6%E8%A7%A3", "/java/thread/concurrent/cas/UnSafe\u7C7B\u8BE6\u89E3.md", "/java/thread/concurrent/cas/UnSafe%E7%B1%BB%E8%AF%A6%E8%A7%A3.md"]],
  ["v-03650f65", "/java/thread/concurrent/cas/cas.html", { "title": "CAS\uFF08\u6BD4\u8F83\u5E76\u66FF\u6362\uFF09", "type": "article", "readingTime": { "minutes": 5.31, "words": 1594 }, "excerpt": 'CAS\uFF08\u6BD4\u8F83\u5E76\u66FF\u6362\uFF09 1. \u7B80\u4ECB CAS\uFF08compare and Swap\uFF09\uFF0C\u65E2\u6BD4\u8F83\u5E76\u66FF\u6362\uFF0C\u5B9E\u73B0\u5E76\u53D1\u7B97\u6CD5\u65F6\u5E38\u7528\u5230\u7684\u4E00\u79CD\u6280\u672F "\u5728java\u540C\u6B65\u5668\u4E2D\u5927\u91CF\u4F7F\u7528\u4E86CAS\u6280\u672F\uFF0C\u9B3C\u65A7\u795E\u5DE5\u7684\u5B9E\u73B0\u4E86\u591A\u7EBF\u7A0B\u6267\u884C\u7684\u5B89\u5168\u6027" CAS\u7684\u601D\u60F3\u5F88\u7B80\u5355: \u4E09\u4E2A\u53C2\u6570\uFF0C\u4E00\u4E2A\u5F53\u524D\u5185\u5B58\u503CV\u3001\u65E7\u7684\u9884\u671F\u503CA\u3001\u5373\u5C06\u66F4\u65B0\u7684\u503CB\u3001\u5F53\u4E14\u4EC5\u5F53\u9884\u671F\u503CA\u548C\u5185\u5B58\u503CV\u76F8\u540C\u65F6\uFF0C\u5C06\u5185\u5B58\u503C\u4FEE\u6539\u4E3AB\u5E76\u8FD4\u56DEtrue\uFF0C\u5426\u5219\u4EC0\u4E48\u90FD', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/cas/cas", "/java/thread/concurrent/cas/cas.md"]],
  ["v-254881ea", "/java/thread/concurrent/lock/Java%E4%B8%AD%E6%89%80%E6%9C%89%E7%9A%84%E9%94%81.html", { "title": "Java\u4E2D\u6240\u6709\u7684\u9501", "type": "article", "readingTime": { "minutes": 11.82, "words": 3546 }, "excerpt": "Java\u4E2D\u6240\u6709\u7684\u9501 0. \u7B80\u4ECB Java\u63D0\u4F9B\u4E86\u79CD\u7C7B\u4E30\u5BCC\u7684\u9501\uFF0C\u6BCF\u79CD\u9501\u56E0\u5176\u7279\u6027\u7684\u4E0D\u540C\uFF0C\u5728\u9002\u5F53\u7684\u573A\u666F\u4E0B\u80FD\u591F\u5C55\u73B0\u51FA\u975E\u5E38\u9AD8\u7684\u6548\u7387\u3002\u672C\u6587\u65E8\u5728\u5BF9\u9501\u76F8\u5173\u6E90\u7801\uFF08\u672C\u6587\u4E2D\u7684\u6E90\u7801\u6765\u81EAJDK 8\u548CNetty 3.10.6\uFF09\u3001\u4F7F\u7528\u573A\u666F\u8FDB\u884C\u4E3E\u4F8B\uFF0C\u4E3A\u8BFB\u8005\u4ECB\u7ECD\u4E3B\u6D41\u9501\u7684\u77E5\u8BC6\u70B9\uFF0C\u4EE5\u53CA\u4E0D\u540C\u7684\u9501\u7684\u9002\u7528\u573A\u666F\u3002 Java\u4E2D\u5F80\u5F80\u662F\u6309\u7167\u662F\u5426\u542B\u6709\u67D0\u4E00\u7279\u6027\u6765\u5B9A\u4E49\u9501\uFF0C\u6211\u4EEC\u901A\u8FC7\u7279\u6027\u5C06\u9501\u8FDB\u884C\u5206\u7EC4\u5F52\u7C7B\uFF0C\u518D\u4F7F\u7528\u5BF9\u6BD4\u7684\u65B9\u5F0F", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/lock/Java\u4E2D\u6240\u6709\u7684\u9501.html", "/java/thread/concurrent/lock/Java%E4%B8%AD%E6%89%80%E6%9C%89%E7%9A%84%E9%94%81", "/java/thread/concurrent/lock/Java\u4E2D\u6240\u6709\u7684\u9501.md", "/java/thread/concurrent/lock/Java%E4%B8%AD%E6%89%80%E6%9C%89%E7%9A%84%E9%94%81.md"]],
  ["v-5e15c1fd", "/java/thread/concurrent/lock/", { "title": "Java\u9501", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 16 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java", "\u5E76\u53D1"] }, ["/java/thread/concurrent/lock/index.html", "/java/thread/concurrent/lock/README.md"]],
  ["v-710876ec", "/java/thread/concurrent/lock/java%E8%87%AA%E6%97%8B%E9%94%81.html", { "title": "java\u81EA\u65CB\u9501", "type": "article", "readingTime": { "minutes": 3.02, "words": 905 }, "excerpt": "java\u81EA\u65CB\u9501 1. \u7B80\u4ECB \u81EA\u65CB\u9501\uFF08spinlock\uFF09\uFF1A\u662F\u6307\u5F53\u4E00\u4E2A\u7EBF\u7A0B\u5728\u83B7\u53D6\u9501\u7684\u65F6\u5019\uFF0C\u5982\u679C\u9501\u5DF2\u7ECF\u88AB\u5176\u5B83\u7EBF\u7A0B\u83B7\u53D6\uFF0C\u90A3\u4E48\u8BE5\u7EBF\u7A0B\u5C06\u5FAA\u73AF\u7B49\u5F85\uFF0C\u7136\u540E\u4E0D\u65AD\u7684\u5224\u65AD\u9501\u662F\u5426\u80FD\u591F\u88AB\u6210\u529F\u83B7\u53D6\uFF0C\u76F4\u5230\u83B7\u53D6\u5230\u9501\u624D\u4F1A\u9000\u51FA\u5FAA\u73AF\u3002 \u83B7\u53D6\u9501\u7684\u7EBF\u7A0B\u4E00\u76F4\u5904\u4E8E\u6D3B\u8DC3\u72B6\u6001\uFF0C\u4F46\u662F\u5E76\u6CA1\u6709\u6267\u884C\u4EFB\u4F55\u6709\u6548\u7684\u4EFB\u52A1\uFF0C\u4F7F\u7528\u8FD9\u79CD\u9501\u4F1A\u9020\u6210 busy-waiting\u3002 2. Java \u5982\u4F55\u5B9E\u73B0\u81EA\u65CB\u9501 lock\uFF08)\u65B9\u6CD5\u5229\u7528\u7684C", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/lock/java\u81EA\u65CB\u9501.html", "/java/thread/concurrent/lock/java%E8%87%AA%E6%97%8B%E9%94%81", "/java/thread/concurrent/lock/java\u81EA\u65CB\u9501.md", "/java/thread/concurrent/lock/java%E8%87%AA%E6%97%8B%E9%94%81.md"]],
  ["v-9ccd68b2", "/java/thread/concurrent/lock/%E4%B9%90%E8%A7%82%E9%94%81%E5%92%8C%E6%82%B2%E8%A7%82%E9%94%81.html", { "title": "\u4E50\u89C2\u9501\u548C\u60B2\u89C2\u9501", "type": "article", "readingTime": { "minutes": 7.47, "words": 2241 }, "excerpt": '\u4E50\u89C2\u9501\u548C\u60B2\u89C2\u9501 1. \u4E50\u89C2\u9501\u548C\u60B2\u89C2\u9501\u7B80\u4ECB "\u4E50\u89C2\u9501\u5BF9\u5E94\u4E8E\u751F\u6D3B\u4E2D\u4E50\u89C2\u7684\u4EBA\u603B\u662F\u60F3\u7740\u4E8B\u60C5\u5F80\u597D\u7684\u65B9\u5411\u53D1\u5C55\uFF0C\u60B2\u89C2\u9501\u5BF9\u5E94\u4E8E\u751F\u6D3B\u4E2D\u60B2\u89C2\u7684\u4EBA\u603B\u662F\u60F3\u7740\u4E8B\u60C5\u5F80\u574F\u7684\u65B9\u5411\u53D1\u5C55\u3002\u8FD9\u4E24\u79CD\u4EBA\u5404\u6709\u4F18\u7F3A\u70B9\uFF0C\u4E0D\u80FD\u4E0D\u4EE5\u573A\u666F\u800C\u5B9A\u8BF4\u4E00\u79CD\u4EBA\u597D\u4E8E\u53E6\u5916\u4E00\u79CD\u4EBA\u3002" \u60B2\u89C2\u9501 \u603B\u662F\u5047\u8BBE\u6700\u574F\u7684\u60C5\u51B5\uFF0C\u6BCF\u6B21\u53BB\u62FF\u6570\u636E\u7684\u65F6\u5019\u90FD\u8BA4\u4E3A\u522B\u4EBA\u4F1A\u4FEE\u6539\uFF0C\u6240\u4EE5\u6BCF\u6B21\u518D\u62FF\u6570\u636E\u7684\u65F6\u5019\u90FD\u4F1A\u4E0A\u9501\uFF0C\u8FD9\u6837\u522B\u4EBA\u60F3\u62FF\u8FD9\u4E2A\u6570\u636E\u5C31\u4F1A\u963B\u585E\u77E5\u9053\u5B83\u62FF\u5230\u9501\uFF08\u5171\u4EAB\u8D44', "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/lock/\u4E50\u89C2\u9501\u548C\u60B2\u89C2\u9501.html", "/java/thread/concurrent/lock/%E4%B9%90%E8%A7%82%E9%94%81%E5%92%8C%E6%82%B2%E8%A7%82%E9%94%81", "/java/thread/concurrent/lock/\u4E50\u89C2\u9501\u548C\u60B2\u89C2\u9501.md", "/java/thread/concurrent/lock/%E4%B9%90%E8%A7%82%E9%94%81%E5%92%8C%E6%82%B2%E8%A7%82%E9%94%81.md"]],
  ["v-5739c2bc", "/java/thread/concurrent/threadpool/", { "title": "\u7EBF\u7A0B\u6C60", "icon": "creative", "type": "article", "readingTime": { "minutes": 0.05, "words": 15 }, "excerpt": "Java TODO", "date": "2022-08-09T11:49:17.000Z", "category": ["Java"] }, ["/java/thread/concurrent/threadpool/index.html", "/java/thread/concurrent/threadpool/README.md"]],
  ["v-0df5f8a9", "/java/thread/concurrent/threadpool/%E5%9C%A8%E6%8E%A5%E5%8F%A3%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%BA%BF%E7%A8%8B%E6%B1%A0%EF%BC%8C%E5%A4%84%E7%90%86%E6%95%B0%E6%8D%AE.html", { "title": "\u5728\u63A5\u53E3\u4E2D\u4F7F\u7528\u7EBF\u7A0B\u6C60\uFF0C\u5904\u7406\u6570\u636E", "type": "article", "readingTime": { "minutes": 4.66, "words": 1398 }, "excerpt": "\u5728\u63A5\u53E3\u4E2D\u4F7F\u7528\u7EBF\u7A0B\u6C60\uFF0C\u5904\u7406\u6570\u636E 1. \u5B9E\u4F8B\u6B65\u9AA4 1. \u5B9A\u4E49\u7EBF\u7A0B\u6C60 2. \u5B9A\u4E49\u63A5\u53E3 3. \u5B9A\u4E49service 4. \u5B9A\u4E49\u63A5\u53E3\u5B9E\u73B0\u7C7B 2. \u6D4B\u8BD5 \u8BBF\u95EE\uFF1Ahttp://localhost:8080/testAsync 3. \u7EBF\u7A0B\u6C60\u56DB\u79CD\u521B\u5EFA\u7EBF\u7A0B\u7684\u65B9\u6CD5 3.1 \u65B9\u5F0F\u4E00\uFF1A\u901A\u8FC7 Runnable \u4F7F\u7528\u7EBF\u7A0B\u6C60 \u6700\u57FA\u7840\u7684\u4F7F\u7528\u65B9\u5F0F\uFF1A\u65E0\u6CD5\u77E5\u9053\u6267\u884C\u7ED3\u679C 3.2 \u65B9\u5F0F\u4E8C\uFF1A \u901A\u8FC7 Cal", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/threadpool/\u5728\u63A5\u53E3\u4E2D\u4F7F\u7528\u7EBF\u7A0B\u6C60\uFF0C\u5904\u7406\u6570\u636E.html", "/java/thread/concurrent/threadpool/%E5%9C%A8%E6%8E%A5%E5%8F%A3%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%BA%BF%E7%A8%8B%E6%B1%A0%EF%BC%8C%E5%A4%84%E7%90%86%E6%95%B0%E6%8D%AE", "/java/thread/concurrent/threadpool/\u5728\u63A5\u53E3\u4E2D\u4F7F\u7528\u7EBF\u7A0B\u6C60\uFF0C\u5904\u7406\u6570\u636E.md", "/java/thread/concurrent/threadpool/%E5%9C%A8%E6%8E%A5%E5%8F%A3%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%BA%BF%E7%A8%8B%E6%B1%A0%EF%BC%8C%E5%A4%84%E7%90%86%E6%95%B0%E6%8D%AE.md"]],
  ["v-57e2a49f", "/java/thread/concurrent/threadpool/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%9B%9B%E7%A7%8D%E5%88%9B%E5%BB%BA%E7%BA%BF%E7%A8%8B%E7%9A%84%E6%96%B9%E6%B3%95.html", { "title": "\u7EBF\u7A0B\u6C60\u56DB\u79CD\u521B\u5EFA\u7EBF\u7A0B\u7684\u65B9\u6CD5", "type": "article", "readingTime": { "minutes": 4.13, "words": 1239 }, "excerpt": "\u7EBF\u7A0B\u6C60\u56DB\u79CD\u521B\u5EFA\u7EBF\u7A0B\u7684\u65B9\u6CD5 1. \u56DB\u79CD\u65B9\u5F0F 1.1 \u65B9\u5F0F\u4E00\uFF1A\u901A\u8FC7 Runnable \u4F7F\u7528\u7EBF\u7A0B\u6C60 \u6700\u57FA\u7840\u7684\u4F7F\u7528\u65B9\u5F0F\uFF1A\u65E0\u6CD5\u77E5\u9053\u6267\u884C\u7ED3\u679C 1.2 \u65B9\u5F0F\u4E8C\uFF1A \u901A\u8FC7 Callable \u4F7F\u7528\u7EBF\u7A0B\u6C60 \u4F7F\u7528Callable \u53EF\u4EE5\u76D1\u542C\u5230\u56DE\u8C03\u3002\u4F1A\u963B\u585E\u3002\u540E\u9762\u7684\u8BED\u53E5\u8981\u7B49\u76F4\u63A5\u5B8C\u6210\u540E 1.3 \u65B9\u5F0F\u4E09\uFF1AthreadPoolTaskExecutor.submitListenable \u8FD4\u56DELi", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/threadpool/\u7EBF\u7A0B\u6C60\u56DB\u79CD\u521B\u5EFA\u7EBF\u7A0B\u7684\u65B9\u6CD5.html", "/java/thread/concurrent/threadpool/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%9B%9B%E7%A7%8D%E5%88%9B%E5%BB%BA%E7%BA%BF%E7%A8%8B%E7%9A%84%E6%96%B9%E6%B3%95", "/java/thread/concurrent/threadpool/\u7EBF\u7A0B\u6C60\u56DB\u79CD\u521B\u5EFA\u7EBF\u7A0B\u7684\u65B9\u6CD5.md", "/java/thread/concurrent/threadpool/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%9B%9B%E7%A7%8D%E5%88%9B%E5%BB%BA%E7%BA%BF%E7%A8%8B%E7%9A%84%E6%96%B9%E6%B3%95.md"]],
  ["v-3d6f9163", "/java/thread/concurrent/threadpool/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E6%89%A7%E8%A1%8C%E5%AE%8C%E6%89%80%E6%9C%89%E4%BB%BB%E5%8A%A1%E5%90%8E%E5%86%8D%E6%89%A7%E8%A1%8C%E4%B8%BB%E7%BA%BF%E7%A8%8B.html", { "title": "\u7EBF\u7A0B\u6C60\u6267\u884C\u5B8C\u6240\u6709\u4EFB\u52A1\u540E\u518D\u6267\u884C\u4E3B\u7EBF\u7A0B\u65B9\u6848", "type": "article", "readingTime": { "minutes": 1.02, "words": 306 }, "excerpt": "\u7EBF\u7A0B\u6C60\u6267\u884C\u5B8C\u6240\u6709\u4EFB\u52A1\u540E\u518D\u6267\u884C\u4E3B\u7EBF\u7A0B\u65B9\u6848 1. \u80CC\u666F \u4E4B\u524D\u6709\u4E2A\u4E1A\u52A1\u9700\u8981\u5C06\u591A\u4EFDpdf\u8F6C\u6210\u56FE\u7247\uFF0C\u6700\u65E9\u6211\u4EEC\u662F\u5C06pdf\u6309\u987A\u5E8F\u4E00\u5F20\u5F20\u8F6C\u6362\u3002\u4F46\u662F\u8F6C\u6362\u65F6\u95F4\u5B9E\u5728\u592A\u957F\u3002 \u6539\u8FDB\u6D41\u7A0B\u4E00\uFF1A; \u5C06pdf\u8F6C\u56FE\u7247\u505A\u6210\u5F02\u6B65\u5904\u7406\uFF0C\u901F\u5EA6\u662F\u5FEB\u4E86\uFF0C\u4F46\u662F\u5E76\u4E0D\u77E5\u9053\u4EC0\u4E48\u65F6\u5019\u7ED3\u675F\u3002\u67E5\u770B\u56FE\u7247\u65F6\u56FE\u7247\u90FD\u4E3A\u7A7A \u6539\u8FDB\u6D41\u7A0B\u4E8C\uFF1A; \u4F7F\u7528CountDownLatch\u76D1\u542C\u7EBF\u7A0B\u6C60\u662F\u5426\u5168\u90E8\u6267\u884C\u5B8C\u6210\uFF0C\u6267\u884C\u5B8C\u6210\u540E\u624D\u8FD4\u56DE 2.\u89E3\u51B3\u65B9\u6848", "date": "2022-08-09T11:49:17.000Z" }, ["/java/thread/concurrent/threadpool/\u7EBF\u7A0B\u6C60\u6267\u884C\u5B8C\u6240\u6709\u4EFB\u52A1\u540E\u518D\u6267\u884C\u4E3B\u7EBF\u7A0B.html", "/java/thread/concurrent/threadpool/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E6%89%A7%E8%A1%8C%E5%AE%8C%E6%89%80%E6%9C%89%E4%BB%BB%E5%8A%A1%E5%90%8E%E5%86%8D%E6%89%A7%E8%A1%8C%E4%B8%BB%E7%BA%BF%E7%A8%8B", "/java/thread/concurrent/threadpool/\u7EBF\u7A0B\u6C60\u6267\u884C\u5B8C\u6240\u6709\u4EFB\u52A1\u540E\u518D\u6267\u884C\u4E3B\u7EBF\u7A0B.md", "/java/thread/concurrent/threadpool/%E7%BA%BF%E7%A8%8B%E6%B1%A0%E6%89%A7%E8%A1%8C%E5%AE%8C%E6%89%80%E6%9C%89%E4%BB%BB%E5%8A%A1%E5%90%8E%E5%86%8D%E6%89%A7%E8%A1%8C%E4%B8%BB%E7%BA%BF%E7%A8%8B.md"]],
  ["v-3706649a", "/404.html", { "title": "", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/404"]],
  ["v-5bc93818", "/category/", { "title": "\u5206\u7C7B", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/category/index.html"]],
  ["v-744d024e", "/tag/", { "title": "\u6807\u7B7E", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/tag/index.html"]],
  ["v-e52c881c", "/article/", { "title": "\u6587\u7AE0", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/article/index.html"]],
  ["v-75ed4ea4", "/encrypted/", { "title": "\u52A0\u5BC6", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/encrypted/index.html"]],
  ["v-d804e652", "/slide/", { "title": "\u5E7B\u706F\u7247", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/slide/index.html"]],
  ["v-154dc4c4", "/star/", { "title": "\u6536\u85CF", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/star/index.html"]],
  ["v-01560935", "/timeline/", { "title": "\u65F6\u95F4\u8F74", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/timeline/index.html"]],
  ["v-5831b135", "/category/java/", { "title": "Java \u5206\u7C7B", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/category/java/index.html"]],
  ["v-65f163c6", "/category/jvm/", { "title": "JVM \u5206\u7C7B", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/category/jvm/index.html"]],
  ["v-573729ca", "/category/%E5%B9%B6%E5%8F%91/", { "title": "\u5E76\u53D1 \u5206\u7C7B", "type": "page", "readingTime": { "minutes": 0, "words": 0 }, "excerpt": "" }, ["/category/\u5E76\u53D1/", "/category/%E5%B9%B6%E5%8F%91/index.html"]]
];
var createRoutes = () => pagesRoutes.reduce((result, [name, path, meta, redirects]) => {
  result.push({
    name,
    path,
    component: Vuepress,
    meta
  }, ...redirects.map((item) => ({
    path: item,
    redirect: path
  })));
  return result;
}, [
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: Vuepress
  }
]);
var historyCreator = createWebHistory;
var createVueRouter = () => {
  const router = createRouter({
    history: historyCreator(removeEndingSlash(siteData.value.base)),
    routes: createRoutes(),
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    var _a2;
    if (to.path !== from.path || from === START_LOCATION_NORMALIZED) {
      [pageData.value] = await Promise.all([
        resolvers.resolvePageData(to.name),
        (_a2 = pagesComponents[to.name]) == null ? void 0 : _a2.__asyncLoader()
      ]);
    }
  });
  return router;
};
var COMPONENT_STATE_TYPE = "VuePress";
var setupDevtools = (app, globalComputed) => {
  setupDevtoolsPlugin({
    app,
    id: "org.vuejs.vuepress",
    label: "VuePress",
    packageName: "@vuepress/client",
    homepage: "https://v2.vuepress.vuejs.org",
    logo: "https://v2.vuepress.vuejs.org/images/hero.png",
    componentStateTypes: [COMPONENT_STATE_TYPE]
  }, (api) => {
    api.on.inspectComponent((payload) => {
      payload.instanceData.state.push(...Object.entries(globalComputed).map(([name, item]) => ({
        type: COMPONENT_STATE_TYPE,
        key: name,
        editable: false,
        value: item.value
      })));
    });
  });
};
var setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
var setupGlobalComputed = (app, router) => {
  const routeLocale = computed(() => resolvers.resolveRouteLocale(siteData.value.locales, router.currentRoute.value.path));
  const siteLocaleData = computed(() => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value));
  const pageFrontmatter = computed(() => resolvers.resolvePageFrontmatter(pageData.value));
  const pageHeadTitle = computed(() => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value));
  const pageHead = computed(() => resolvers.resolvePageHead(pageHeadTitle.value, pageFrontmatter.value, siteLocaleData.value));
  const pageLang = computed(() => resolvers.resolvePageLang(pageData.value));
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
  return {
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    routeLocale,
    siteData,
    siteLocaleData
  };
};
var setupUpdateHead = () => {
  const route = useRoute();
  const head = usePageHead();
  const lang = usePageLang();
  const headTags = ref([]);
  const loadHead = () => {
    head.value.forEach((item) => {
      const tag2 = queryHeadTag(item);
      if (tag2) {
        headTags.value.push(tag2);
      }
    });
  };
  const updateHead = () => {
    document.documentElement.lang = lang.value;
    headTags.value.forEach((item) => {
      if (item.parentNode === document.head) {
        document.head.removeChild(item);
      }
    });
    headTags.value.splice(0, headTags.value.length);
    head.value.forEach((item) => {
      const tag2 = createHeadTag(item);
      if (tag2 !== null) {
        document.head.appendChild(tag2);
        headTags.value.push(tag2);
      }
    });
  };
  provide(updateHeadSymbol, updateHead);
  onMounted(() => {
    loadHead();
    updateHead();
    watch(() => route.path, () => updateHead());
  });
};
var queryHeadTag = ([
  tagName,
  attrs,
  content = ""
]) => {
  const attrsSelector = Object.entries(attrs).map(([key, value]) => {
    if (isString$1(value)) {
      return `[${key}="${value}"]`;
    }
    if (value === true) {
      return `[${key}]`;
    }
    return "";
  }).join("");
  const selector = `head > ${tagName}${attrsSelector}`;
  const tags = Array.from(document.querySelectorAll(selector));
  const matchedTag = tags.find((item) => item.innerText === content);
  return matchedTag || null;
};
var createHeadTag = ([
  tagName,
  attrs,
  content
]) => {
  if (!isString$1(tagName)) {
    return null;
  }
  const tag2 = document.createElement(tagName);
  if (isPlainObject(attrs)) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (isString$1(value)) {
        tag2.setAttribute(key, value);
      } else if (value === true) {
        tag2.setAttribute(key, "");
      }
    });
  }
  if (isString$1(content)) {
    tag2.appendChild(document.createTextNode(content));
  }
  return tag2;
};
var appCreator = createSSRApp;
var createVueApp = async () => {
  var _a2;
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      var _a3;
      setupUpdateHead();
      for (const clientConfig of clientConfigs) {
        (_a3 = clientConfig.setup) == null ? void 0 : _a3.call(clientConfig);
      }
      return () => [
        h$2(RouterView),
        ...clientConfigs.flatMap(({ rootComponents = [] }) => rootComponents.map((component) => h$2(component)))
      ];
    }
  });
  const router = createVueRouter();
  setupGlobalComponents(app);
  const globalComputed = setupGlobalComputed(app, router);
  {
    setupDevtools(app, globalComputed);
  }
  for (const clientConfig of clientConfigs) {
    await ((_a2 = clientConfig.enhance) == null ? void 0 : _a2.call(clientConfig, { app, router, siteData }));
  }
  app.use(router);
  return {
    app,
    router
  };
};
{
  createVueApp().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount("#app");
    });
  });
}
export { BloggerInfo as A, BlogHome as B, Content as C, DropTransition as D, InfoList as E, InfoPanel as I, Transition as T, createBaseVNode as a, createTextVNode as b, createElementBlock as c, createVueApp, createVNode as d, createStaticVNode as e, defineComponent as f, useThemeLocaleData as g, h$2 as h, useLink as i, useRoute as j, ref as k, watch as l, useScrollPromise as m, usePageFrontmatter as n, openBlock as o, useMobile as p, computed as q, resolveComponent as r, usePageData as s, useThemeData as t, useRouteLocale as u, useRouter as v, withCtx as w, onClickOutside as x, a$4 as y, BlogPage as z };
