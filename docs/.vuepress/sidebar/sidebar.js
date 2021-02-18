var base = require('./mulu/base/base');
var dependencies = require('./mulu/dependencies/dependencies');
var db = require('./mulu/db/db');
var microservice = require('./mulu/microservice/microservice');
var framework = require('./mulu/framework/framework');
var test = require('./mulu/test/test');
var frontend = require('./mulu/frontend/frontend');
var cs = require('./mulu/cs/cs');
var software = require('./mulu/software/software');
var utils = require('./mulu/utils/utils.js');
var principle = require('./mulu/principle/principle.js');
var think  = require('./mulu/think/think.js');
var python  = require('./mulu/python/python.js');


exports.mulu  = [
        {
            title: '前言',   // 必要的
            path: '/'
        },
        base.mulu,
        dependencies.mulu,
        db.mulu,
        microservice.mulu,
        framework.mulu,
        test.mulu,
        frontend.mulu,
        python.mulu,
        cs.mulu,
        software.mulu,
        utils.mulu,
        principle.mulu,
        think.mulu
      ];




