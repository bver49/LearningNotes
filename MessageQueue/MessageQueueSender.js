var Queue = require('bull');

var countQueue = new Queue('counting', {
    redis: {
        port: REDIS_PORT,
        host: '127.0.0.1'
    },
    prefix: 'test' //prefix in redis
});

module.exports = function count(x, y, id) { 
  countQueue.add('jobname',{ 
      x: x, 
      y: y 
  },{
     jobId:id,        //custom jobid
     timeout:30000    //limit job worktime 30sec
  }); 
}
