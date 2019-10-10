var w = 600;

//sketch0___________________________
var sketch0 = function (p) {

    var fireworks = [];
    var gravity;
    var bg;

    //function_________
    function Particle(x, y, hu, firework) {
        this.pos = p.createVector(x, y);
        this.firework = firework;
        this.lifespan = 255;
        this.hu = hu;

        if (this.firework) {
            this.vel = p.createVector(0, p.random(-12, -8));
        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(p.random(2, 10));
        }

        this.acc = p.createVector(0, 0);

        this.show = function () {
            p.colorMode(p.HSB);
            if (!this.firework) {
                p.strokeWeight(w / 200);
                p.stroke(hu, this.lifespan / 3 + 30, this.lifespan);
            } else {
                p.strokeWeight(w / 240);
                p.stroke(hu, 255, 255);
            }
            p.point(this.pos.x, this.pos.y)
        }

        this.done = function () {
            if (this.lifespan < 0) {
                return true;
            } else {
                return false;
            }
        }

        this.update = function () {
            if (!this.firework) {
                this.vel.mult(0.9);
                this.pos.y -= p.random();
                this.lifespan -= 4;
            }
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }

        this.applyForce = function (force) {
            this.acc.add(force);
        }
    }

    function Firework() {
        this.hu = p.random(0, 55);
        this.firework = new Particle(p.random(p.width), p.random(p.height - 30, p.height), this.hu, true);
        this.exploded = false;
        this.particles = [];
        this.done = function () {
            if (this.exploded && this.particles.length === 0) {
                return true;
            } else {
                return false;
            }
        }

        this.show = function () {
            if (!this.exploded) {
                this.firework.show();
            }
            for (var i = 0; i < this.particles.length; i++) {
                if (p.random() > 0.65) {
                    this.particles[i].show();
                }
            }
        }

        this.update = function () {
            if (!this.exploded) {
                this.firework.applyForce(gravity);
                this.firework.update();
                if (this.firework.vel.y >= 0) {
                    this.exploded = true;
                    this.explode();
                }
            }
            for (var i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
                if (this.particles[i].done()) {
                    this.particles.splice(i, 1);
                }
            }
        }

        this.explode = function () {
            for (var i = 0; i < 100; i++) {
                var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
                this.particles.push(p);
            }
        }

    }

    //setup____________________
    p.setup = function () {
        p.createCanvas(w, w);
        bg = p.loadImage("images/bg.png");
        p.colorMode(p.HSB);
        gravity = p.createVector(0, 0.1);
        p.stroke(255);
        p.strokeWeight(1);
    };

    //draw____________________
    p.draw = function () {
        p.colorMode(p.RGB);
        p.background(100, 100, 100, 100);
        p.image(bg, 0, 0, w, w);

        if (p.random() > 0.97) {
            fireworks.push(new Firework());
        }
        for (var i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].show();

            if (fireworks[i].done()) {
                fireworks.splice(i, 1);
            }
        }
    };
};
new p5(sketch0, "container0");




//sketch1___________________________
var sketch1 = function (p) {

    //setup____________________
    p.setup = function () {
        p.createCanvas(w, w);
    };

    //draw____________________
    p.draw = function () {
        p.background(255, 255, 255, 10);
        p.push();
        p.translate(w * 0.14875, w * 0.6125);
        p.noStroke();
        p.fill(255, 200, 0, 255);
        p.ellipse(0, 0, w / 80, w / 80);
        p.fill(255, p.random(0, 150), 0, 255);
        p.ellipse(0, 0, w / 160, w / 160);

        var x = p.random(0, 30);
        if (x < 1) {
            p.fill(255, p.random(100, 255), 0, 50);
            p.ellipse(p.random(-w / 160, w / 160), p.random(-w / 160, w / 160), w / 40, w / 40);
        }
        p.pop();

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
new p5(sketch1, "container1");


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
