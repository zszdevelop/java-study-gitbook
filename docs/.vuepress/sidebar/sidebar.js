var base = require('./mulu/base/base');
var thread = require('./mulu/thread/thread');
var dependencies = require('./mulu/dependencies/dependencies');
var db = require('./mulu/db/db');
var microservice = require('./mulu/microservice/microservice');
var framework = require('./mulu/framework/framework');
var test = require('./mulu/test/test');
var frontend = require('./mulu/frontend/frontend');
var android = require('./mulu/android/android');
var cs = require('./mulu/cs/cs');
var software = require('./mulu/software/software');
var utils = require('./mulu/utils/utils.js');
// var principle = require('./mulu/principle/principle.js');
var think  = require('./mulu/think/think.js');
var python  = require('./mulu/python/python.js');
var localization  = require('./mulu/localization/localization.js');
var skill  = require('./mulu/skill/skill.js');
var openplatform  = require('./mulu/openplatform/openplatform.js');
var operations  = require('./mulu/operations/operations.js');


exports.mulu  = [
        {
            title: '前言',   // 必要的
            path: '/'
        },
        base.mulu,
        thread.mulu,
        dependencies.mulu,
        db.mulu,
        microservice.mulu,
        framework.mulu,
        test.mulu,
        frontend.mulu,
        openplatform.mulu,
        android.mulu,
        python.mulu,
        cs.mulu,
        software.mulu,
        operations.mulu,
        utils.mulu,
        // principle.mulu,
        skill.mulu,
        localization.mulu,
        think.mulu
      ];




