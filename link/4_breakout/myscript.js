//sketch0___________________________
var sketch0 = function (p) {
    var paddle, ball, wallTop, wallBottom, wallLeft, wallRight;
    var bricks;
    var MAX_SPEED = 5;
    var WALL_THICKNESS = 30;
    var BRICK_W = 20;
    var BRICK_H = 5;
    var BRICK_MARGIN = 2;
    var ROWS = 10;
    var COLUMNS = 10;
    var bear;

    //setup____________________
    p.setup = function () {
        var cnv = p.createCanvas(300, 300);
        cnv.mousePressed(doThisOnMousePress);
        bear = p.loadImage("images/bear.png");

        paddle = p.createSprite(p.width / 2, p.height - 50, 50, 4);
        paddle.immovable = true;

        wallTop = p.createSprite(p.width / 2, -WALL_THICKNESS / 2, p.width + WALL_THICKNESS * 2, WALL_THICKNESS);
        wallTop.immovable = true;

        wallBottom = p.createSprite(p.width / 2, p.height + WALL_THICKNESS / 2, p.width + WALL_THICKNESS * 2, WALL_THICKNESS);
        wallBottom.immovable = true;

        wallLeft = p.createSprite(-WALL_THICKNESS / 2, p.height / 2, WALL_THICKNESS, p.height);
        wallLeft.immovable = true;

        wallRight = p.createSprite(p.width + WALL_THICKNESS / 2, p.height / 2, WALL_THICKNESS, p.height);
        wallRight.immovable = true;

        bricks = new p.Group();

        var offsetX = p.width / 2 - (COLUMNS - 1) * (BRICK_MARGIN + BRICK_W) / 2;
        var offsetY = 80;
        for (var r = 0; r < ROWS; r++) {
            for (var c = 0; c < COLUMNS; c++) {
                var brick = p.createSprite(offsetX + c * (BRICK_W + BRICK_MARGIN), offsetY + r * (BRICK_H + BRICK_MARGIN), BRICK_W, BRICK_H);
                brick.shapeColor = p.color("white");
                bricks.add(brick);
                brick.immovable = true;
            }
        }
        //the easiest way to avoid pesky multiple collision is to
        //have the ball bigger than the bricks
        ball = p.createSprite(p.width / 2, p.height - 80, 5, 5);
        ball.maxSpeed = MAX_SPEED;
        paddle.shapeColor = ball.shapeColor = p.color("darkslateblue");
    }

    //draw____________________
    p.draw = function () {
        p.background("darkslateblue");
        p.push();
        p.stroke("midnightblue");
        p.fill("midnightblue");
        p.rect(0, 75, p.width, p.width - 70);
        p.fill("white");
        p.rect(p.width / 2, 70, 21, 6);
        p.image(bear, p.width / 2 + 2, 54, 51 / 2, 35 / 2);
        p.pop();

        if (ball.position.y > 75)
            paddle.shapeColor = ball.shapeColor = p.color("darkslateblue");
        else {
            ball.shapeColor = p.color("midnightblue");
            paddle.shapeColor = p.color("darkslateblue");
        }
        paddle.position.x = p.constrain(p.mouseX, paddle.width / 2, p.width - paddle.width / 2);

        ball.bounce(wallTop);
        ball.bounce(wallBottom);
        ball.bounce(wallLeft);
        ball.bounce(wallRight);

        if (ball.bounce(paddle)) {
            var swing = (ball.position.x - paddle.position.x) / 3;
            ball.setSpeed(MAX_SPEED, ball.getDirection() + swing);
        }
        ball.bounce(bricks, brickHit);
        p.drawSprites();
    }

    var doThisOnMousePress = function () {
        if (ball.velocity.x == 0 && ball.velocity.y == 0)
            ball.setSpeed(MAX_SPEED, p.random(90 - 10, 90 + 10));
    }

    function brickHit(ball, brick) {
        brick.remove();
    }

};
new p5(sketch0, "container0");



//fukidashi___________________________
var i = 0;
$(".fukidashi").click(function () {
    if (i % 2 == 0) {
        $(".introduce ").fadeIn();
        $(".hideMessage").text("▲説明を隠す");
    } else {
        $(".introduce ").fadeOut();
        $(".hideMessage").text("▼説明を表示");
    }

    i++;
});

$(".fukidashiWrapper").hover(
    function () {
        $(".fukidashiWrapper").css("opacity", "1");
    },
    function () {
        $(".fukidashiWrapper").css("opacity", "0.5");
    }
);
