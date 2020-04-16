var bonuses, price, order, flight, getProcentDown, getProcentUp, getBonuses, bonuseDown, token, receipt, interval;

function succesBlockReady(e) {

	if (e["status"] !== 0) {
		clearInterval(interval)
		price = e["amount"], token = e["token"], receipt = e["params"]["receipt"], comment = e["comment"];
		$("form").attr("action", "https://pay.invoice.su/initpay/" + token)
		initParams();
		getInfo();
		initCheck();
		$("#loading-block").hide();
		$("#succes-block").show();
		initCommentBlock();
	}

}

function esc2Uni(str) {
	var regExp = /\\u([\d\w]{4})/gi;
	var escapedCodeTemp = str.replace(regExp, function (match, group) {
		return String.fromCharCode(parseInt(group, 16));
	}
	);
	return unescape(escapedCodeTemp);
}

function initCheck() {
	for (let i = 0; i < receipt.length; i++) {
		let tr = $("<tr/>");
		$("#check").append(tr);
		tr.append($("<td/>").text(i + 1))
		if (receipt[i]["name"] !== undefined) {
			var name = receipt[i]["name"];
			name = name.split("").map(function (el) {
				if (el === "u") return "\\u"
				else return el;
			}).join("")
			tr.append($("<td/>").text(esc2Uni(name) + " x" + receipt[i]["quantity"]).addClass("table-left"))
		} else tr.append($("<td/>").text(""))
		if (receipt[i]["resultPrice"] !== undefined) {
			tr.append($("<td/>").text(receipt[i]["resultPrice"]))
		} else tr.append($("<td/>").text(0))
	}
	let tr = $("<tr/>").html(
		"<td/><td/>" +
		"<td>Итого: " + price + "</td>"
	).addClass("table-bold")
	$("#check").append(tr)
}

function initCommentBlock() {
	if (comment !== "") {
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
			$(".commArea").val("");
		})
	}
	else $("#addComm, .commentBlock").hide();
}

$(document).ready(() => {

	interval = setInterval(() => {
		$.ajax({
			'url': 'https://pay.invoice.su/terminit/' + terminalId,
			'type': 'GET',
			'cache' : false,
			'success': succesBlockReady,
			'error': function (e) {
				console.log(e["statusText"])
			}
		});
	}, 1000)


	checkLanguage();

	$("#range").on("input", function () {
		$(".secondNumber").text($(this).val())
		$("#price2").text((price - $(this).val()).toLocaleString('ru-RU') + " ₽")
		$("#ResultAmount").val(price - $(this).val())
		if ($(this).val() === "0") {
			$("#getBonuses").text(getBonuses);
			$("#ResultBonusesToSpend").val(0)
			if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
				$(".bonusPlusText").text("Бонусов получите");
			else
				$(".bonusPlusText").text("Get points");
		}
		else {
			$("#getBonuses").text($(this).val());
			if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
				$(".bonusPlusText").text("Бонусы");
			else
				$(".bonusPlusText").text("Points");
			$("#ResultBonusesToSpend").val($(this).val());
		}

	})

	$("#TotalAmount").on("input", () => {
		if ($("#TotalAmount").val() > 350000) $("#TotalAmount").val(350000)
		initParams();
		getInfo()
	})

	$(".impPriceBlock").click(() => {
		$("#TotalAmount").focus();
	})

	$("#sendButton").click(() => {
		//Отправка данных на сервер
	})

	var el = document.getElementById('TotalAmount');
	el.focus();
	el.setSelectionRange(el.value.length, el.value.length);

	$('#TotalAmount').keypress(function (e) {
		if (!(e.which == 8 || e.which == 46 || (e.which > 47 && e.which < 58))) return false;
	});

	var cards = $("#GivenCards").val().split("\\");
	cards = cards.filter(el => el !== "")
	var prevCheck = Number.MAX_VALUE, nowCheck = Number.MIN_VALUE;
	var cvcHeight = 0;
	if (cards.length !== 0) {
		for (let j = 0; j < cards.length; j++) {
			let crd = cards[j].split(" ")
			let image = $("<img/>").attr("src", checkSaveCard(crd[0])[0])
			let block = $("<div/>").attr("class", "card-block");
			let cardInfo = $("<div/>").attr("class", "card-info");
			let leftBlock = $("<div/>").attr("class", "left-card-block");
			let cardNumber = $("<div/>").attr("class", "card-number").text(cardForm(crd[0]))
			let check = $("<div/>").attr("class", "ch");
			let cvcBlock = $("<div/>").attr("class", "cvc-block");
			let cvcText;
			if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
				cvcText = $("<div/>").attr("class", "cvc-text").text("Введите CVC номер");
			else
				cvcText = $("<div/>").attr("class", "cvc-text").text("Enter CVC number");
			let cvcNumber = $("<input/>").attr({ "class": "cvc-number", "maxLength": 3 })
			cvcBlock.append(cvcText, cvcNumber);
			leftBlock.append(check, cardNumber);
			cardInfo.append(leftBlock, image);
			block.append(cardInfo, cvcBlock).click(() => {
				prevCheck = nowCheck;
				nowCheck = j;
				if (prevCheck !== nowCheck) {
					$(".ch").eq(nowCheck).css("background", "#248ce4")
					$(".ch").eq(prevCheck).css("background", "white")
					$(".newCard").css({
						"border-color": "rgb(219, 219, 219)"
					})
					$(".cvc-block").eq(nowCheck).css({
						"height": cvcHeight,
						"padding-top": "10px",
						"transition": "0.3s"
					})
					$(".cvc-block").eq(prevCheck).css({
						"height": "0",
						"padding-top": "0"
					})
					$(".cvc-number").eq(nowCheck).focus()
					$("#CendCard").val("")
					$(".cvc-number").eq(nowCheck).on("input", () => {
						$("#SendCard").val(crd[1] + " " + $(".cvc-number").eq(nowCheck).val())
					})
					if (prevCheck !== Number.MIN_VALUE) $(".cvc-number").eq(prevCheck).val("")
				}
			});
			$("#addCards").append(block)
		}
		cvcHeight = $(".cvc-block").eq(0).height() + 10
		$(".cvc-block").css({
			"height": "0",
			"padding": "0"
		})
	}
	else $(".cards").hide()

	$(".newCard").click(() => {
		prevCheck = Number.MAX_VALUE;
		nowCheck = Number.MIN_VALUE;
		$(".newCard").css({
			"border-color": "green"
		})
		$(".ch").css("background", "white");
		$(".cvc-block").css({
			"height": "0",
			"padding-top": "0"
		})
		$(".cvc-number").val("");
		$("#SendCard").val("");
	})

})

function checkLanguage() {
	var userLang = (navigator.language || navigator.userLanguage).substring(0, 2);
	if (userLang !== "ru") {
		$(".bonusText").html("on balance <br>points");
		$(".infoHead").html("Payment for tickets");
		$("#orderHeader").html("Order: ");
		$("#individualHeader").html("Seller: ");
		$(".bonusInfoText").html("You <br>will be charged");
		$("#money").html("Funds");
		$(".bonusPlusText").html("Got points");
		$(".cards-name").html("Your saved cards");
		$("#new-card").html("Pay with another card");
		$("#addComm").html("Add comment");
		$("#hideComm").html("To hide the form<img src = \"./img/hide.png\" alt = \"\">");
		$("#sendButton").html("Pay");
		$("#footerText").html("The details page is certified according to the international security standard of the payment card industry");
		$(".commArea").attr("placeholder", "Please write here additional information (optional)");
		$(".pay-text").html("By continuing, you are agree to <a href = \"#\">Terms of Service</a>")
	}
}

function checkSaveCard(cardCode) {
	var ret, name = "";
	switch (checkOper(cardCode)) {
		case "МИР": ret = "img/mir-logo.svg"; name = "МИР"; break;
		case "Мастеркард": ret = "img/mastercar.svg"; name = "MasterCard"; break;
		case "Маэстро": ret = "img/maestro.svg"; name = "Maestro"; break;
		case "China UnionPay": ret = "img/UnionPay.svg"; name = "China UnionPay"; break;
		case "Visa Electron": ret = "img/visa-electron.svg"; name = "Visa Electron"; break;
		case "Visa": ret = "img/visa.svg"; name = "Visa"; break;
		default: ret = "img/card.svg"; break;
	}
	return [ret, name];
}

function cardForm(numb) {
	var form = "xxxx xxxx xxxx xxxx"
	var formCard = "";
	for (var k = 0, l = 0; k < form.length; k++) {
		if (numb[0] === "3" && k === 0) form = "xxxx xxxxxx xxxxx"
		if (numb.length > 16) form = "xxxx xxxx xxxx xxxx xxx"
		if (numb[0] == 3) {
			if (form[k] === "x") {
				if (k >= 13 || k <= 7) {
					formCard += numb[l]
					l++;
				}
				else {
					formCard += "*"
					l++;
				}
			}
			else formCard += " "
		}
		else {
			if (form[k] === "x") {
				if (k >= 15 || k <= 7) {
					formCard += numb[l]
					l++;
				}
				else {
					formCard += "*"
					l++;
				}
			}
			else formCard += " "
		}
		if (l === numb.length) break
	}

	return formCard;
}

function checkOper(code) {
	var a = code, oper = "";
	for (var i = 0; i < 6; i++) {
		if (a.substring(0, i) === "4") oper = "Visa"
		else if (a.substring(0, i) === "4026" || a.substring(0, i) === "417500" || a.substring(0, i) === "4405" ||
			a.substring(0, i) === "4508" || a.substring(0, i) === "4844" || a.substring(0, i) === "4913" || a.substring(0, i) === "4917") oper = "Visa Electron";
		else if (parseInt(a.substring(0, i)) >= 51 && parseInt(a.substring(0, i)) <= 55) oper = "Мастеркард"
		else if (a.substring(0, i) === "5018" || a.substring(0, i) === "5020" || a.substring(0, i) === "5038" || a.substring(0, i) === "5893"
			|| a.substring(0, i) === "6304" || a.substring(0, i) === "6759" || a.substring(0, i) === "6761" || a.substring(0, i) === "6762"
			|| a.substring(0, i) === "6763" || a.substring(0, i) === "0604") oper = "Маэстро"
		else if (a.substring(0, i) === "62") oper = "China UnionPay"
		else if (a.substring(0, i) === "2") oper = "МИР"
	}
	return oper;
}

function initParams() {
	bonuses = parseInt($("#TotalBonuses").val());
	if (isNaN(price)) price = 0;
	order = "676662, Иванов Иван Иванович";
	flight = "U6-750, Новосибирск-Москва, Airbus A320";
	getProcentDown = parseInt($("#BonusesToSpend").val());
	getProcentUp = parseInt($("#BonusesToFill").val());
	getBonuses = Math.floor(price / 100 * getProcentUp);
	bonuseDown = Math.floor(price / 100 * getProcentDown);
	if ($("#IndividualInfo").val() !== "") $("#individual").text($("#IndividualInfo").val())
	else $(".individual").hide()
}

function getInfo() {

	$("#numberOfBonuses").text(bonuses);
	$("#order").text(order);
	$("#flight").text(flight);
	$("#price").text(price.toLocaleString('ru-RU') + " ₽");
	$("#price2").text(price.toLocaleString('ru-RU') + " ₽");
	$("#getBonuses").text(getBonuses);
	if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
		$(".bonusHead").text("За эту покупку вы получите бонусы");
	else
		$(".bonusHead").text("You will receive points for this purchase.");

	$("#ResultBonusesToSpend").val(0);
	$("#ResultAmount").val(price)

	bon = (bonuses / price * 100).toFixed(0);

	if (bonuses > 0 && getProcentDown > 0) {
		if (bonuseDown > bonuses) {
			if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
				$(".bonusHead").text("Вы можете оплатить до " + Math.min(bonuseDown, bonuses) + " руб бонусами (" + bon + "% от суммы)");
			else
				$(".bonusHead").text("You may pay up to " + Math.min(bonuseDown, bonuses) + " bonuses (" + bon + "% of payment amount)");
		}
		else {
			if ((navigator.language || navigator.userLanguage).substring(0, 2) === "ru")
				$(".bonusHead").text("Вы можете оплатить до " + Math.min(bonuseDown, bonuses) + " руб бонусами (" + getProcentDown + "% от суммы)");
			else
				$(".bonusHead").text("You may pay up to " + Math.min(bonuseDown, bonuses) + " bonuses (" + getProcentDown + "% of payment amount)");
		}
		$("#range").attr("max", Math.min(bonuseDown, bonuses));
		$(".maxNumber").text(Math.min(bonuseDown, bonuses))
		$(".range").show();
	}

}
