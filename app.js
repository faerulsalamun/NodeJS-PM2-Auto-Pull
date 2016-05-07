/**
 * Created by faerulsalamun on 5/7/16.
 */

'use strict';

const restify = require('restify');
const Promise = require('bluebird');
const pm2 = Promise.promisifyAll(require('pm2'));
const async = require('async');
const version = require('./package.json');
const config = require('./config');
const debug = require('debug')(version.name);

const server = restify.createServer({
    name: version.name,
    version: version.version,
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/hook', (req, res, next) => {

    if (req.query.secretKey !== config.secretKey)
        return res.send(401, {success: false, err: 'Invalid secret key'});

    pm2.listAsync()
        .then((procs) => {

            async.forEachLimit(procs, 1, (proc, next) => {
                if (proc.pm2_env && proc.pm2_env.versioning) {
                    debug('pull And Reload %s', proc.name);

                    pm2.pullAndReload(proc.name, (err, meta) => {

                        if (meta) {
                            var rev = meta.rev;

                            if (rev)
                                console.log('Successfully pulled [App name: %s] [Commit id: %s] [Repo: %s] [Branch: %s]',
                                    proc.name,
                                    rev.current_revision,
                                    meta.procs[0].pm2_env.versioning.repo_path,
                                    meta.procs[0].pm2_env.versioning.branch);
                            else {
                                // Backward compatibility
                                console.log('App %s succesfully pulled');
                            }
                        }

                        if (err)
                            debug('App %s already at latest version', proc.name);

                        return next();
                    });
                } else next();
            });
        })
        .then(() => {
            res.send({success: true});
        })
        .catch((err)=> {
            res.send({success: false, err: err});
        });

});

// Start http server after list of process acquired
pm2.connectAsync()
    .then(() => {
        server.listen(config.port, () => {
            console.log('%s listening at %s', server.name, config.port);
        });
    });

module.exports = server;