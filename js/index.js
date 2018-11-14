// 文档加载完才会执行
$(function(){
    /* 根据屏幕大小决定显示大图还是小图 */
    function resize(){
        // 获取屏幕大小
        var windowWidth=$(window).width();
        // 判断屏幕大还是小
        var isSmallScreen=windowWidth<768;
        // 根据屏幕大小给item设置背景图
        $("#main_ad>.carousel-inner>.item").each(function(index,item){
            var $item=$(item);
            // var imgSrc=isSmallScreen?$item.data("imageXs"):$item.data("imageLg");
            var imgSrc=$item.data(isSmallScreen?"imageXs":"imageLg");
            // 大图时设置为背景图片，固定高度且居中（小图也有）
            $item.css("backgroundImage","url("+imgSrc+")");
            // 小图时设置为内部的<img>，随窗口大小等比例变化
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'" alt="">');
            }else{
                $item.html("");
            }          
        });
    }
    // resize(); 用trigger()代替
    $(window).resize(resize).trigger("resize"); // 当调整浏览器窗口大小时

    /* 初始化tooltips插件 */
    $('[data-toggle="tooltip"]').tooltip();

    /* 给导航条加横向滚动条 控制标签页的标签容器宽度 
        1.给ul加一个容器，使该容器有横向滚动条；
        2.动态设置ul的宽度，宽度是所有li内容宽度之和。
    */
    var $ulContainer=$(".nav-tabs");
    // 获取所有子元素的宽度和
    var width=30; // ul上有padding-left
    $ulContainer.children().each(function(index,ele){
        width+=ele.clientWidth; // 或$(ele).width()
    });
    // 如果当前ul宽度超出屏幕宽度，为ul设置宽度，显示横向滚动条
    if(width>$(window).width()){
        $ulContainer
            .css("width",width+"px")
            .parent().css("overflow-x","scroll");
    }
    
    // 获取news-title元素
    var $newsTitle=$("#news .news-title");
    /* 监听a的点击事件，给新闻更换标题 */
    $("#news .nav-pills>li>a").click(function(){
        // 为news-title设置新内容
        $newsTitle.text($(this).data("title"));
    });

    /* 轮播图左滑右滑 */
    // 获取轮播图容器
    var $carousel=$(".carousel");
    // 1.获取手指在轮播图元素上的滑动方向（左右）
    var startX;
    var endX;
    var offset=50;
    // 注册滑动事件
    $carousel.on("touchstart",function(event){
        // 获取触摸开始时手指所在坐标X
        startX=event.originalEvent.touches[0].clientX;
    });
    $carousel.on("touchmove",function(event){
        // 获取触摸结束时手指所在坐标X，通过重复给变量赋值
        endX=event.originalEvent.touches[0].clientX;
    });
    $carousel.on("touchend",function(){
        // 控制灵敏度，滑动超过一定像素才认为有滑动
        var distance=Math.abs(startX-endX);
        if(distance>offset){
            // 2.根据滑动方向选择上一张或下一张
            $(this).carousel(startX>endX?'next':'prev');
        }
    });
});