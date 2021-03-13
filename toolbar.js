$(function() {
    $(".toolbar .tabstrip button[data-tab]").click(function() {
        $(".toolbar .tabstrip button[data-tab]").removeClass("selected");
        $(this).addClass("selected");
        $(".toolbar .tabs .accent").css("background-color", $(this).css("background-color"));

        $(".toolbar .tabs .tab[data-tab]").hide();
        $(".toolbar .tabs .tab[data-tab='" + $(this).attr("data-tab") + "']").show();
    });
});