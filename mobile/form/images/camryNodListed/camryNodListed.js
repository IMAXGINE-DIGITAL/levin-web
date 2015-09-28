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
	$(".closeBtn").click(function(e){
		
			e.preventDefault();
			
			$.closePopup(".basePolicy");
			$.closePopup(".popBg");
			$.closePopup(".popupBox");
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
		$obj.change(function(){
			$val.html($(this).children(":selected").text());
			$obj.click();   //Add By Rocky Shao
		})
	});
}

	