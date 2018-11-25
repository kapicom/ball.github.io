    var pad = document.getElementById('pad');
    var ball = document.getElementById('ball');

    var cxPad = pad.offsetWidth;
    var cyPad = pad.offsetHeight;

    var cxBall = ball.offsetWidth;
    var cyBall = ball.offsetHeight;

    var xBall = (cxPad / 2) - (cxBall / 2);
    var yBall = (cyPad / 2) - (cyBall / 2);

    var COEF = 50; // 移動量の補正係数
    var vx = 0; // x軸方向の速度
    var vy = 0; // y軸方向の速度
    var t1 = Date.now();
    var t2 = 0;

    var requestAnimationFrame = (function() {
        return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
                function( callback ){
                    window.setTimeout( callback, 1000.0 / 60.0 );
                };
    } )();

    window.addEventListener("deviceorientation", handleOrientation);

    function handleOrientation(event) {
        var x = event.beta;
        var y = -event.gamma;
        var z = event.alpha;

        // 経過時間
        t2 = Date.now();
        var dt = t2 - t1;
        dt = dt / 1000; // 秒変換

        // 移動距離
        var dx = vx * dt + x * dt * dt / 2;
        var dy = vy * dt + y * dt * dt / 2;

        // 移動後のボールの座標
        xBall = xBall + dx * COEF;
        yBall = yBall + dy * COEF;

        // 現在の加速度を保存
        vx = vx + x * dt;
        vy = vy + y * dt;

        // ボールが外に出ないように座標を補正
        if (xBall - cxBall < 0 && vx < 0) {
            vx = -vx / 1.5;
            xBall = 0;
        } else if (xBall + cxBall > cxPad && vx > 0) {
            vx = -vx / 1.5;
            xBall = cxPad - cxBall;
        }
        if (yBall - cyBall < 0 && vy < 0) {
            vy = -vy / 1.5;
            yBall = 0;
        } else if (yBall + cyBall > cyPad && vy > 0) {
            vy = -vy / 1.5;
            yBall = cyPad - cyBall;
        }

        // 現在の時間を保存
        t1 = Date.now();
    }

    function moveBall() {
        ball.style.left = xBall + 'px';
        ball.style.top = yBall + 'px';
    }

    (function draw(){
        moveBall();
        requestAnimationFrame(draw);
    }());