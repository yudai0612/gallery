//sketch0___________________________
var sketch0 = function (p) {
    var r = 40;

    //setup____________________
    p.setup = function () {
        p.createCanvas(90, 220);

    };

    var xx = 0;
    //draw____________________
    p.draw = function () {
        p.background(255);
        p.stroke("gray");
        p.fill("gray");
        p.strokeWeight(1);
        p.arc(r, r, r, r, 0, 2 * p.PI);
        p.line(r / 2, r, r / 2, 2 * r + xx);
        p.rect(r / 2 - r / 4, 2 * r + xx, r / 2, r / 3);

        p.line(r + r / 2, r, r + r / 2, 2 * r + (100 - xx));
        p.rect(r + r / 2 - r / 4, 2 * r + (100 - xx), r / 2, r / 3);
        p.push();
        p.translate(r / 2, 2 * r + xx);
        p.strokeWeight(1);
        var s = xx + "%";
        p.text(s, -r / 4, r / 2, 70, 80);
        p.pop();

        p.push();
        var theta = -xx / (r / 2);
        p.translate(r, r);
        p.stroke("white");
        p.strokeWeight(1);
        p.line(0, 0, (r / 2) * p.cos(theta), (r / 2) * p.sin(theta));
        p.pop();
    };

    //スクロール量の取得
    $('.box_srcollbar').scroll(function () {
        var $scrollTopRatio = Math.round(this.scrollTop / (this.scrollHeight - this.clientHeight) * 100);
        xx = $scrollTopRatio;
    });
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
