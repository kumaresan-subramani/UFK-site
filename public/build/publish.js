'use strict';
var config = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};
var s3 = require('gulp-s3-upload')(config);
var gulp = require('gulp');
var gzip = require('gulp-gzip');

var publish = function (dirName, prefixName, done) {
    prefixName = prefixName.endsWith('/') ? prefixName : prefixName + '/';
    dirName = dirName.endsWith('/') ? dirName : dirName + '/';
    gulp.src(dirName + '**', { buffer: false })
        .pipe(s3({
            Bucket: process.env.AWS_STAGING_BUCKET,
            ACL: 'public-read',
            uploadNewFilesOnly: false,
            ContentEncoding: 'gzip',
            keyTransform: function (relative_filename) {
                var new_name = prefixName + relative_filename;
                return new_name;
            }
        }, {
                maxRetries: 5,
                maxRedirects: 100,
                retryDelayOptions: {
                    base: 1000
                }
            }))
        .on('end', function () {
            console.log('Published in CDN');
            done();
        })
        .on('error', function (e) {
            console.error('unable to sync: ', e.stack);
            done(e);
        });
};
exports.publish = publish;

var gulp = require('gulp');

gulp.task('publish', function (done) {
    var branchName = process.env.BRANCH_NAME;
    var isReleaseBranch = /^((release\/|hotfix\/))/g.test(process.env.BRANCH_NAME);
    if (branchName !== 'master' && branchName !== 'development' && !isReleaseBranch) {
        done();
        return;
    }
    branchName = branchName === 'master' ? 'production/home/' : 'development/home/';
    branchName = isReleaseBranch ? 'hotfix/' + process.env.BRANCH_NAME.split(/hotfix\/|release\//)[1] + '/home/' : branchName;
    gulp.src(['./dist{,/**}','./*.html', './src{,/**}', './styles{,/**}', './images{,/**}', 'favicon.ico'])
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('./landing-page'))
        .on('end', function () {
            publish('./landing-page', branchName, done);
        })
        .on('error', function (e) {
            done(e);
        });
});