var Queue = require('bull');

var countQueue = new Queue('counting', {
    redis: {
        port: REDIS_PORT,
        host: '127.0.0.1'
    },
    prefix: 'test' //prefix in redis
});

// job執行內容
countQueue.process(function(job, done) {
    job.progress(10); //set progress
    setTimeout(function() {
        job.progress(20);
        try {
            job.progress(50);
            var result = job.data.x / job.data.y
            if (isNaN(result)) {
                throw new Error('Nan');
            }
            console.log(result);
            done(null, {
                result: result
            });
        }
        catch (err) {
            done(err);
        }
    }, 2000);
});

//當job進度被更新時執行
countQueue.on('progress', function(job, progress) {
    console.log('Job progress:' + progress);
});

countQueue.on('error', function(error) {
    console.log('Error:' + error);
})

//當job出錯
countQueue.on('failed', function(error) {
    console.log('Failed:' + error.failedReason);
})

//當job完成時執行
countQueue.on('completed', function(job, result) {
    console.log('Job complete');
});

module.exports = function count(x, y) {
    countQueue.add({
        x: x,
        y: y
    });
}
