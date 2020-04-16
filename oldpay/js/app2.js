var bonuses, message, order, flight, getProcentDown, getProcentUp, getBonuses, bonuseDown;

$(document).ready(() => {

	initParams();
	getInfo(); //Функция заполнения блоков

	$("#sendButton").click(() => {
		//Отправка данных на сервер
	})

	$(".sendNumber").click(() => {
		$.post(
			"https://pay.invoice.su/misc/sendcheck",
			{
				number: $("#telNumber").val()
			},
			checkMessage
		)
	})
})

function checkMessage(e){
	if(e){
		$(".result").text("Отправлено").css({
			"color" : "#27ad5c",
	 		"margin" : "10px auto auto auto"
		})
	}
	else{
		$(".result").text("Ошибка").css({
			"color" : "#ad2727",
			"margin" : "10px auto auto auto"
		})
	}
}

function initParams(){
	bonuses = $("#TotalBonuses").val();
	plusBonuses = $("#BonusesToSpend").val();
	message = $("#messageInfo").val();
}

function getInfo(){

	$("#numberOfBonuses").text(bonuses);
	$("#order").text(order);
	$("#flight").text(flight);
	$("#changeCard, #checkBlock, #sendCheck, #myPageBlock").hide();
	$("#telNumber").mask("+7 (999) 999-9999")
	if(message[0] !== "#"){
		$("#message").text("Успешно").css("color", "#27ad5c");
		$("#price2").text(message)
		$(".priceBlock").css("padding", "30px")
		if($("#isShowCheck").val() == "1" || $("#isShowCheck").val() == "true") $("#checkBlock").show();
		if($("#isSendCheck").val() == "1" || $("#isSendCheck").val() == "true") $("#sendCheck").show();
		if($("#isShowMyPage").val() == "1" || $("#isShowMyPage").val() == "true") $("#myPageBlock").show();
		if(plusBonuses >= 0){
			$("#getBonuses").text(plusBonuses)
		}
		else{
			$(".bonusPlusText").text("Бонусы")
			$("#getBonuses").text(Math.abs(plusBonuses))
		}
	} 
	else{
		$("#message").text("Ошибка").css("color", "#ad2727");
		$(".errorCode").text(message);
		$(".errorMessage").text($("#messageText").val())
		$(".bonusBlock").hide();
		$("#changeCard").show().css({
			"margin" : "10px auto 0 auto",
			"width" : "250px",
			"padding" : "15px 0 15px 0"
		});
	}
	$("#message2").text(message.toLocaleString('ru-RU') + " ₽");
	$("#getBonuses").text(getBonuses);

	var commHeight = $(".commentBlock").height();
	$(".commentBlock").css({
		"height" : "0",
		"transition" : "0.3s"
	})

	$("#addComm").click(() => {
		$(".commentBlock").css({
			"height": commHeight,
			"margin-top": "-40px"
		})
		$("#addComm").css("transform", "scale(0)")
	})

	$("#hideComm").click(() => {
		$("#addComm").css("transform", "scale(1)");
		$(".commentBlock").css({
			"height": 0,
			"margin-top": 0
		});
	})

}
