var points, message, order, flight, getProcentDown, getProcentUp, getBonuses, bonuseDown;

$(document).ready(() => {

	checkLanguage();

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

function checkLanguage() {
	var userLang = (navigator.language || navigator.userLanguage).substring(0, 2);
	if (userLang !== "ru") {
		$(".bonusText").html("on balance <br>points");
		$(".infoHead").html("Payment for tickets");
		$("#orderHeader").html("Order: ");
		$("#individualHeader").html("Seller: ");
		$(".bonusInfoText").html("You <br>paid");
		$("#money").html("Funds");
		$(".bonusPlusText").html("Got points");
		$(".cards-name").html("Your saved cards");
		$("#new-card").html("Pay with another card");
		$("#addComm").html("Show receipt");
		$("#hideComm").html("Hide receipt<img src = \"./img/hide.png\" alt = \"\">");
		$("#myPage").html("My Invoice");
		$("#footerText").html("The details page is certified according to the international security standard of the payment card industry");
		$(".commArea").attr("placeholder", "Please write here additional information (optional)")
		$(".numberText").html("Get receipt via SMS")
		$(".myPageText").html("All information about your payments, news and events of your favorite companies as well as information about where and how you can get and spend your points.");
		$("#changeCard").html("Retry with another card")
	}
}

function checkMessage(e) {
	if (e) {
		if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
			$(".result").text("Отправлено");
		else
			$(".result").text("Shipped");
		$(".result").css({
			"color": "#27ad5c",
			"margin": "10px auto auto auto"
		})
	}
	else {
		if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
			$(".result").text("Ошибка");
		else
			$(".result").text("Error");
		$(".result").css({
			"color": "#ad2727",
			"margin": "10px auto auto auto"
		})
	}
}

function initParams() {
	points = $("#TotalBonuses").val();
	plusBonuses = $("#BonusesToSpend").val();
	message = $("#messageInfo").val();
}

function getInfo() {

	$("#numberOfBonuses").text(points);
	$("#order").text(order);
	$("#flight").text(flight);
	$("#changeCard, #checkBlock, #sendCheck, #myPageBlock").hide();
	$("#telNumber").mask("+7 (999) 999-9999");
	if ($("#IndividualInfo").val() !== "") $("#individual").text($("#IndividualInfo").val())
	else $(".individual").hide()
	if (message[0] !== "#") {
		if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
			$("#message").text("Успешно")
		else
			$("#message").text("Success")
		$("#message").css("color", "#27ad5c");
		$("#price2").text(message)
		$(".priceBlock").css("padding", "30px")
		if ($("#isShowCheck").val() == "1" || $("#isShowCheck").val() == "true") $("#checkBlock").show();
		if ($("#isSendCheck").val() == "1" || $("#isSendCheck").val() == "true") $("#sendCheck").show();
		if ($("#isShowMyPage").val() == "1" || $("#isShowMyPage").val() == "true") $("#myPageBlock").show();
		if (plusBonuses >= 0) {
			$("#getBonuses").text(plusBonuses)
		}
		else {
			if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
				$(".bonusPlusText").text("Бонусы")
			else
				$(".bonusPlusText").text("Points")
			$("#getBonuses").text(Math.abs(plusBonuses))
		}
	}
	else {
		if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
			$("#message").text("Ошибка")
		else
			$("#message").text("Error")
		$("#message").css("color", "#ad2727");
		$(".errorCode").text(message);
		$(".errorMessage").text($("#messageText").val())
		$(".bonusBlock").hide();
		$("#changeCard").show().css({
			"margin": "10px auto 0 auto",
			"width": "250px",
			"padding": "15px 0 15px 0"
		});
	}
	$("#message2").text(message.toLocaleString('ru-RU') + " ₽");
	$("#getBonuses").text(getBonuses);

	var commHeight = $(".commentBlock").height();
	$(".commentBlock").css({
		"height": "0",
		"transition": "0.3s"
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
