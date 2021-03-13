var presenter = {};

presenter.play = function() {
    $(".presenter").html($(".workspace").html());
    $(".presenter *").attr("contenteditable", "false");
    $(".presenter .ui-resizable-handle").remove();

    $(".presenter").show();
};

presenter.stop = function() {
    $(".presenter").html("");
    $(".presenter").hide();
};

$(function() {
    var zoomFactor = 0;

    $("body").keydown(function(event) {
        if (event.keyCode == 27) { // Esc
            presenter.stop();
        }
    });

    $("#playButton").click(function() {
        presenter.play();
    });

    setInterval(function() {
        zoomFactor = Math.min(
            $(".presenter").width() / $(".presenter page:visible").width(),
            $(".presenter").height() / $(".presenter page:visible").height()
        );

        $(".presenter surface").css({
            "top": `${($(".presenter").height() - ($(".presenter page:visible").height() * zoomFactor)) / 2}px`,
            "left": `${($(".presenter").width() - ($(".presenter page:visible").width() * zoomFactor)) / 2}px`,
            "zoom": `${zoomFactor}`
        });
    });
})