var zooming = {
    mode: "auto",
    factor: 0.5
};

$(function() {
    setInterval(function() {
        if (zooming.mode == "auto") {
            zooming.factor = Math.min(
                ($(".workspace").width() - 60) / $(".workspace page:visible").width(),
                ($(".workspace").height() - 60) / $(".workspace page:visible").height()
            );
        }

        $(".workspace surface").css("zoom", `${zooming.factor}`);

        $(".ui-resizable-e").css("width", `${10 / zooming.factor}px`);
        $(".ui-resizable-s").css("height", `${10 / zooming.factor}px`);
        $(".ui-resizable-se").css("width", `${10 / zooming.factor}px`);
        $(".ui-resizable-se").css("height", `${10 / zooming.factor}px`);
    });
});