//sketch0___________________________
var sketch0 = function (p) {
    let house;

    //setup____________________
    p.setup = function () {
        var cnv = p.createCanvas(400, 200);

        house = new p.Group();
        for (var i = 0; i < 8; i++) {
            var c = p.createSprite(p.width + p.random(50, 500), p.height - 15, p.random(40, 70), p.random(30, 60));
            c.shapeColor = p.color("white");
            house.add(c);
        }
    }

    //draw____________________
    p.draw = function () {
        p.background("white");

        // 雲グループの雲スプライトを繰り返し処理
        for (var i = 0; i < house.length; i++) {

            house[i].position.x -= house[i].width / 50;

            if (house[i].position.x < -50) {
                house[i].position.x = p.width + p.random(50, 500);
            }
        }
        var str = "gallery";
        p.text(str, p.width / 2, p.height / 2);
        p.drawSprites();

        for (var i = 0; i < house.length; i++) {
            p.push();
            p.translate(house[i].position.x, house[i].position.y);
            p.noStroke();
            var w = house[i].width;
            var h = house[i].height;
            p.fill(0, 0, 0, 100);
            p.triangle(-w / 2, 0, w / 2, 0, 0, -h / 2);
            p.rect(-w / 2, 0, w, h);

            if (i % 2 == 0) {
                p.fill("white");
                p.rect(-w / 6, 0, w / 3, h / 4);
                p.stroke(0, 0, 0, 100);
                p.line(-w / 6, h / 8, w / 6, h / 8);
                p.line(0, 0, 0, h / 4);
            }
            p.pop();
        }
    }

};
new p5(sketch0, "container0");
