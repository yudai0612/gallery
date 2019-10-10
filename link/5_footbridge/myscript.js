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

new Freezeframe("#cg1");
