
(function($){


$(function(){
	isMobile = {  
		Android: function() {  
			return navigator.userAgent.match(/Android/i) ? true : false;  
		},  
		BlackBerry: function() {  
			return navigator.userAgent.match(/BlackBerry/i) ? true : false;  
		},  
		iOS: function() {  
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;  
		},  
		Windows: function() {  
			return navigator.userAgent.match(/IEMobile/i) ? true : false;  
		},  
		any: function() {  
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  
		},
		iPad :function(){
			return navigator.userAgent.match(/iPad/i)? true : false;
		},
		Status: function() {  
			return checkLayout();  
		}
	};
	
	$(".getFocus").getFocus();
	if($('.selectBox').size()>0) getSelectBox();
	
	
	$(".red").click(function(e){
		e.preventDefault();
		$.showPopup(".basePolicy");
		$(".popBg").show();
		if($(".consultDetInfo").size()>0){
			$('.consultDetInfo').jScrollPane();
			$(window).resize(function(){
				$('.consultDetInfo').jScrollPane();
			})	
		}		
		});
	$(".fontRed").click(function(e){
		e.preventDefault();
		$.closePopup(".consulting");
		$(".basePolicy").addClass("up");
		$.showPopup(".basePolicy");
		$(".popBg").show();
		if($(".consultDetInfo").size()>0){
			$('.consultDetInfo').jScrollPane();
			$(window).resize(function(){
				$('.consultDetInfo').jScrollPane();
			})	
		}		
		});
	$(".consulting .closeBtn").click(function(e){
		e.preventDefault();
		$.closePopup(".popBg");
		$.closePopup(".consulting");
		
		})
	$(".closeBtn").click(function(e){
		if($(this).parents(".basePolicy").hasClass("up")){
			e.preventDefault();
			$.showPopup(".consulting");
			$.closePopup(".basePolicy");
			$(".basePolicy").removeClass("up");
		}else{
			$.closePopup(".popBg");
			$.closePopup(".popupBox");}
		})
	
				
})
$.fn.extend ({
	getFocus : function(){
		return this.each(function(){
			if($(this).val()=="") $(this).val($(this).data("tags"));
		}).focusin(function(){
			if($(this).val()==$(this).data("tags")) $(this).val("").addClass("blur");
		}).focusout(function(){
			if($(this).val()=="") $(this).val($(this).data("tags")).removeClass("blur");
		})
	}
	})
$.extend({
	showPopup : function(obj, auto, btn){
		$(".popupBg").hide();
		auto = auto || 0;
		var winTop;
		if(auto == -1){
			var top = btn.offset().top + btn.height(),
				left = btn.offset().left;
			$(obj).fadeIn(200).css({"top" : top>0?top:0, "left" : left})
			
		}else if(auto == 'auto'){
			var top = btn.offset().top+btn.height(),
				left = $("body").offset().left + $("body").width() - $(obj).width()-1;
			$(obj).fadeIn(200).css({"top": top>0?top:0,"left":left});
		}else{
			
			var top = ($(window).height() - $(obj).height() - 32)/2 + $(window).scrollTop(); 
			if(top < $(window).scrollTop()){ top = $(window).scrollTop();}	
			$(obj).fadeIn(200).css("top", top>0?top:0);
		
		}
		
		if($(obj).find(".comPop_close").size() > 0) $(obj).find(".comPop_close").click(function(){$(this).unbind("click"); $.closePopup(obj) });
		if(auto == 0 || auto == 'auto') $(".popupBg").show().click(function(){ $(this).unbind("click"); $.closePopup(obj) });
	
	}, // show popup
	closePopup : function(obj){
		$(obj).fadeOut(200);
		$(".popupBg").hide();
	} //close popup
	
});
function getSelectBox(){
	$(".selectBox").each(function() {
		if($(this).children("select").size()<=0) { return false };
		
		var $box = $(this),
			$obj = $(this).children("select"),
			$val = $(this).children(".selectVal");
			
		if(isMobile.iPad()){
			$obj.focus(function(){
				$box.addClass("selectBoxBlur");
			}).blur(function(){
				$box.removeClass("selectBoxBlur");
			}).change(function(){
				$val.addClass("selectValBlur").html($(this).children(":selected").text());
                $obj.click();   //Add By Rocky Shao
			})
		}else{
		    if ($box.find(".selectList").size() < 1) { //edit by chenliping
			$box.append('<div class="selectList"></div>');
			var $list = $box.children(".selectList");
			$obj.children().each(function(){
				$list.append('<p data-value="' + $(this).val() + '">'+$(this).text()+'</p>');
			});
			$obj.hide();
			$(this).click(function(e){
				if($(this).hasClass("selectBoxBlur")&& e.target 
				!= $list[0] && !$.contains($list[0],e.target)){
					$box.removeClass("selectBoxBlur");
					$list.slideUp(200);
					return false;
				}
				$(".selectBox").removeClass("selectBoxBlur");
				$(".selectList").hide();
				$box.addClass("selectBoxBlur");
				
				if($(window).scrollTop() - ($(this).offset().top - $(window).height()) < 200){
					$list.css({'bottom':$(this).height(),'top':'auto'})
				}else{
					$list.css({'bottom':'auto','top':$(this).height()})
				}
				
				if($list.children().size() >= 6){
					$list.height(132);
				}
				//$list.show()
				$list.show().jScrollPane();
								
				$(document).click(function(event){
					$(document).unbind("click");					
					if(event.target != $list[0]&&
					!$.contains($list[0],event.target)){
						$list.hide();
						$list.parent().removeClass("selectBoxBlur");
					}
				});
				
				return false;
			})
			$list.children().click(function(){
				$val.addClass("selectValBlur").html($(this).text());
				$list.slideUp(200,function(){
					$box.removeClass("selectBoxBlur");
				});
				$obj.val($(this).data("value"));
                    $obj.click();   //Add By Rocky Shao
			})

		    }
		    else {//edit by chenliping
		        $obj.hide();
		    }
        }

	});
};


})(jQuery);



	