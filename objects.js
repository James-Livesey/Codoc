var objects = {
    textMode: false,
    selected: $(".workspace surface page:visible")
};

$(function() {
    var mouseX;
    var mouseY;

    $(".workspace surface page > *").draggable({
        start: function(event, ui) {
            mouseX = (event.pageX - $(".workspace surface").offset().left) / zooming.factor - parseInt($(event.target).css("left"));
            mouseY = (event.pageY - $(".workspace surface").offset().top) / zooming.factor - parseInt($(event.target).css("top"));
        },
        drag: function(event, ui) {
            var offsetTop = $(".workspace surface").offset().top;
            var offsetLeft = $(".workspace surface").offset().left;

            ui.position.top = Math.round((event.pageY - offsetTop) / zooming.factor - mouseY);
            ui.position.left = Math.round((event.pageX - offsetLeft) / zooming.factor - mouseX);
        
            ui.offset.top = Math.round(ui.position.top + offsetTop);
            ui.offset.left = Math.round(ui.position.left + offsetLeft);
        }
    });

    $(".workspace surface page > *").resizable({
        resize: function(event, ui) {
            var axis = ui.element.data("ui-resizable").axis;

            var offsetTop = ui.element.offset().top;
            var offsetBottom = ui.element.children(".ui-resizable-s").offset().top;
            var offsetLeft = ui.element.offset().left;
            var offsetRight = ui.element.children(".ui-resizable-e").offset().left;

            mouseX = (event.pageX / zooming.factor) - offsetLeft;
            mouseY = (event.pageY / zooming.factor) - offsetTop;

            var offsetWidth = (offsetRight - offsetLeft) / zooming.factor;
            var offsetHeight = (offsetBottom - offsetTop) / zooming.factor;

            var aspectRatio = offsetHeight / offsetWidth;

            if (axis == "e") {
                ui.element.width(mouseX);

                if (false) {
                   ui.element.height(mouseX * aspectRatio);
                }
            }

            if (axis == "s") {
                ui.element.height(mouseY);

                if (false) {
                   ui.element.height(mouseY / aspectRatio);
                }
            }

            if (axis == "se") {
                ui.element.width(mouseX);
                ui.element.height(mouseY);

                if (false) {
                   ui.element.height(mouseY / aspectRatio);
                }
            }
        }
    });

    $(".workspace surface").click(".workspace surface page > *, .workspace surface page", function(event) {
        if ($(event.target).is(".ui-resizable-handle")) {
            return;
        }

        objects.selected = $(event.target).closest(".workspace surface page > *, .workspace surface page");
    });

    $("#toggleTextModeButton").click(function() {
        objects.textMode = !objects.textMode;
    });

    var previousTextModeState = false;

    setInterval(function() {
        if (objects.textMode != previousTextModeState) {
            previousTextModeState = objects.textMode;

            if (objects.textMode) {
                $("#toggleTextModeButton").addClass("selected");
                $(".workspace surface page > *").draggable("disable");
            } else {
                $("#toggleTextModeButton").removeClass("selected");

                $(".workspace surface page > *").draggable("enable");
            }
        }

        $(".workspace surface page > * content").attr("contenteditable", String(objects.textMode));
        $(".workspace surface page > *").removeClass("selected");
        objects.selected.addClass("selected");
    });
});