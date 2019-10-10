// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Vertices = Matter.Vertices,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var w = 400;


//sketch0______________________________
var sketch0 = function (p) {
    var engine;
    var world;
    var g = 0.001;
    var ball, ground, wallL, wallR, ceiling;
    var mConstraint;

    //Particle____________________
    function Particle(x, y, r) {
        var options = {
            friction: 0.1,
            frictionAir: 0,
            restitution: 0.9
        }
        this.r = r;
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);

        this.show = function () {
            var pos = this.body.position;
            var angle = this.body.angle;
            p.push();
            p.translate(pos.x, pos.y);
            p.rotate(angle);
            p.fill("black");
            p.ellipseMode(p.CENTER);
            p.ellipse(0, 0, r * 2);
            p.pop();
        }
    }

    //Rect___________________
    function Rect(x, y, w, h) {
        var options = {
            friction: 0.01,
            frictionAir: 0,
            isStatic: true
        }
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, w, h, options)
        World.add(world, this.body);

        this.show = function () {
            var pos = this.body.position;
            var angle = this.body.angle;

            p.push();
            p.translate(pos.x, pos.y);
            p.rotate(angle);
            p.strokeWeight(0);
            p.noFill();
            p.rectMode(p.RADIUS);
            p.rect(0, 0, w / 2, h / 2);
            p.pop();
        }
    }


    //setup____________________
    p.setup = function () {
        var canvas = p.createCanvas(w, w);

        //matter
        engine = Engine.create();
        world = engine.world;
        world.gravity = {
            x: 0,
            y: 0,
            scale: 0
        };
        Engine.run(engine);
        ball = new Particle(w * 0.8, w * 0.4, w * 0.015);
        ground = new Rect(w / 2, w * 1.49, w * 2, w);
        wallL = new Rect(-100, w / 2, 200, w);
        wallR = new Rect(w + 100, w / 2, 200, w);
        ceiling = new Rect(w / 2, -w / 2, w * 2, w);


        var canvasmouse = Mouse.create(canvas.elt);
        canvasmouse.pxelRatio = p.pixelDensity();

        var options = {
            mouse: canvasmouse
        }

        mConstraint = MouseConstraint.create(engine, options);
        World.add(world, mConstraint);
    };


    //draw____________________
    p.draw = function () {
        p.background("white");

        var x0 = w * 0.395;
        var y0 = w * 0.8;
        var ra = w * 0.1;
        var rp = w * 0.015;

        p.stroke("black");
        p.strokeWeight(1);
        p.fill("black");
        if (p.sqrt(p.pow((x0 - ball.body.position.x), 2) + p.pow((y0 - ball.body.position.y), 2)) > ra) {
            p.line(x0, y0, ball.body.position.x, ball.body.position.y);
            var theta = p.atan((ball.body.position.y - y0) / (ball.body.position.x - x0));
            if (ball.body.position.x >= x0)
                p.arc(x0, y0, ra, ra, -p.PI / 2, theta);
            else
                p.arc(x0, y0, ra, ra, -p.PI / 2, theta + p.PI);
        }

        //matter
        ball.body.r = rp;
        ball.body.force.y = ball.body.mass * g;
        ball.body.collisionFilter.group = 2;
        ball.show();

        ground.body.position.y = w * 1.49;
        ground.body.collisionFilter.group = 2;
        console.log(ground.body.position.y);
        ground.show();

        wallL.body.collisionFilter.group = 2;
        wallL.show();
        wallR.body.collisionFilter.group = 2;
        wallR.show();
        ceiling.body.collisionFilter.group = 2;
        ceiling.show();

        //潰れた親要素を復元
        $(function () {
            var biggestHeight = "0";
            $("#container0 *").each(function () {
                if ($(this).height() > biggestHeight) {
                    biggestHeight = $(this).height()
                }
            });
            $("#container0").height(biggestHeight);
        })
    };
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
