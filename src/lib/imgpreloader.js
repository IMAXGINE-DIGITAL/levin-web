
export default function($) {
    $.imgpreloader = $.imgpreloader || function(options){
        var o = $.extend({ paths: [] }, options);
        return $.Deferred(function(defer){
            var loopCount = 0,
                pathLength = o.paths.length,
                $allImages = $(),
                $properImages = $(),
                $brokenImages = $(),
                handler = function($image, isBroken){
                loopCount = loopCount + 1;
                $allImages = $allImages.add($image);
                defer.notify(
                    $image,
                    $allImages,
                    $properImages,
                    $brokenImages,
                    isBroken,
                    Math.floor(loopCount / pathLength * 100)
                );
                if(loopCount === pathLength){
                    if($brokenImages.length){
                        defer.reject($allImages, $properImages, $brokenImages);
                    }else{
                        defer.resolve($allImages);
                    };
                };
            };
            if(!$.isArray(o.paths) || !pathLength){
                defer.reject();
            }else{
                $.each(o.paths, function(i, src){
                    $('<img>').on('load', function(){
                        var $image = $(this);
                        $properImages = $properImages.add($image);
                        handler($image, false);
                    }).on('error', function(){
                        var $image = $(this);
                        $brokenImages = $brokenImages.add($image);
                        handler($image, true);
                    }).attr('src', src);
                });
            };
        }).promise();
    };
}
