var Queue = require('bull');

var countQueue = new Queue('counting', {
    redis: {
        port: REDIS_PORT,
        host: '127.0.0.1'
    },
    prefix: 'test' //prefix in redis
});

module.exports = function count(x, y) { 
  countQueue.add({ x: x, y: y }); 
}
