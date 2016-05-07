/**
 * Created by faerulsalamun on 5/7/16.
 */

'use strict'

const assert = require('assert');
const config = require('../config');
const request = require('supertest');
const app = require('../app');

describe('/hook', () => {
    it('POST /hook should return 200 OK with content-type json with response success true', (done) => {
        request(app)
            .post('/hook?secretKey=' + config.secretKey)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                assert.equal(res.body.success, true, true);
            })
            .end(done);
    });
});

