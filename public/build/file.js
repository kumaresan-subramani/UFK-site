var gulp = require('gulp');
var http = require('http');
var fs = require('fs');
var zlib = require('zlib');
var dataCollection = [];
var shelljs = require('shelljs');
var match = ['Property', 'Method', 'Event'];
var bucketName = process.env.AWS_STAGING_BUCKET ||  'npmci.syncfusion.com';
var gutil = require('gulp-util');
var link = 'http://' + bucketName + '/';
var asplink = 'https://ej2services.syncfusion.com/';
var isReleaseBranch = /^((release\/|hotfix\/))/g.test(process.env.BRANCH_NAME);
if (process.env.BRANCH_NAME === "master") {
    link += 'production/';
    asplink += 'production/';
} else if(link.indexOf('ej2.syncfusion.com') === -1){
    link += 'development/';
    asplink += 'development/';
}
var apiLink = link;

if ( isReleaseBranch || !process.env.AWS_STAGING_BUCKET) {
    apiLink = 'http://npmci.syncfusion.com/production/';
    asplink = 'https://ej2services.syncfusion.com/production/';
}
//var sbMacth = config.name.match(/react|ng/);
var jsRegex= /javascript|aspnetcore|aspnetmvc/;
var netRegex = /aspnetcore|aspnetmvc/;
gulp.task('access-search-files', function (done) {
    var count = 0;
    var dependencies = {
        typescript:"http://npmci.syncfusion.com/hotfix/16.3.0.1/demos/src/common/search-index.json",
        react:"http://npmci.syncfusion.com/hotfix/16.3.0.1/react/demos/src/common/search-index.json",
        vue:"http://npmci.syncfusion.com/hotfix/16.3.1/vue/demos/src/common/search-index.json",
        javascript:"http://npmci.syncfusion.com/hotfix/16.3.0.1/javascript/demos/src/common/search-index.js",
        angular:"http://npmci.syncfusion.com/hotfix/16.3.1/angular/demos/src/common/search-index.json"
    }
    var dependenciesArray = Object.keys(dependencies);
    var length = dependenciesArray.length;
    if (!length) {
        done();
    }
    for (var i = 0; i < length; i++) {
        var platform = dependenciesArray[i];
        var curPackage = dependencies[platform];
        var clink = apiLink;
        if(netRegex.test(platform)){
            clink = asplink;
        }
        getGzipped(curPackage, function (err, data, packageName) {
            count++
            if (err) {
                console.log(err);
                console.log(gutil.colors.red('Unable to access file json for ' + packageName));
            } else {
                var extension = jsRegex.test(packageName) ? 'js' : 'json';
                if (!fs.existsSync('./src/json')) {
                   shelljs.mkdir('-p','./src/json');
                }    
                fs.writeFileSync('./src/json/'+ packageName+'-search.'+extension,data);
                console.log(packageName + '-search file  written');
            }
            if (count === length) {
                done();
            }
        }, platform);
    }
})

var caller = require("http"),
    zlib = require("zlib");

function getGzipped(url, callback, package) {
    // buffer to store the streamed decompression
    var buffer = [];
    if(url.indexOf('https') !== -1){
        caller = require("https");
        console.log(url);
    } else {
        console.log(url);
    }
    caller.get(url, function (res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();
        res.pipe(gunzip);

        gunzip.on('data', function (data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function () {
            // response and decompression complete, join the buffer and return
            callback(null, buffer.join(""), package);

        }).on("error", function (e) {
            callback(e, '', package);
        })
    }).on('error', function (e) {
        callback(e)
    });
}
