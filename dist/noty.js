/**
 * @author: jarek@psyll.com (Jarosław Szulc)
 * @license: MIT
 * @description:
 * Versatile javascript plugin designed to provide a simple and efficient
 * solution for notifications and confirmations on any website or web application.
 */
class Noty {
	constructor({
		timeout = 0,
		position = "right-bottom",
		animation = null,
		hoverPause = false,
	}) {
		this.timeout = timeout;
		this.position = position;
		this.animation = animation;
		this.hoverPause = hoverPause;
	}
	push({
		type = "log",
		text,
		title = null,
		timeout = this.timeout,
		clickClose = true,
		buttons = null,
	}) {
		var NotyBox = document.getElementById("noty");
		if (!NotyBox) {
			var NotyBox_create = document.createElement("div");
			NotyBox_create.setAttribute("id", "noty");
			NotyBox_create.setAttribute(
				"class",
				"noty noty-box noty-box-" + this.position + " " + this.animation
			);
			document.body.appendChild(NotyBox_create);
			var NotyBox = document.getElementById("noty");
		}
		var NotyID = "noty-" + (Math.random() + 1);
		NotyID = NotyID.replaceAll(".", "");
		var NotySingleHTML =
			`
        <div class="noty-line"><div id="` +
			NotyID +
			`" class="noty-single noty-single-` +
			type +
			`">`;
		if (title != null) {
			NotySingleHTML += `<div class="noty-title">` + title + `</div>`;
		}
		NotySingleHTML += `<div class="noty-text">` + text + `</div>`;
		let buttonsActions = {};
		let buttonsClose = [];
		if (buttons != null) {
			NotySingleHTML += `<div class="noty-buttons">`;
			for (const buttonName in buttons) {
				if (Object.prototype.hasOwnProperty.call(buttons, buttonName)) {
					const item = buttons[buttonName];
					let classname = "";
					if (typeof item.classname !== "undefined") {
						classname = " " + item.classname;
					}
					var id_gen = "";
					var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
					for (var i = 0; i < 20; i++) {
						id_gen += characters.charAt(
							Math.floor(Math.random() * characters.length)
						);
					}
					id_gen = "noty-button-" + id_gen;
					NotySingleHTML +=
						`<button id="` +
						id_gen +
						`" class="noty-button` +
						classname +
						`">` +
						item.text +
						`</button>`;
					if (typeof item.action !== "undefined") {
						buttonsActions[id_gen] = function () { item.action() };
					}
					if (
						typeof item.close !== "undefined" ||
						item.close == true
					) {
						buttonsClose.push(id_gen);
					}
				}
			};
			NotySingleHTML += `</div>`;
		}
		if (timeout != 0) {
			NotySingleHTML += `<div class="noty-bar"></div>`;
		}
		NotySingleHTML += `</div></div>`;
		NotyBox.insertAdjacentHTML("beforeend", NotySingleHTML);
		for (const id in buttonsActions) {
			if (Object.prototype.hasOwnProperty.call(buttonsActions, id)) {
				const action = buttonsActions[id];
				document.getElementById(id).addEventListener('click', action);
			}
		}
		var NotySingle = document.getElementById(NotyID);
		buttonsClose.forEach((id) => {
			const element = document.getElementById(id);
			if (element) {
				element.addEventListener('click', function () {
					NotySingle.classList.remove("noty-active");
					setTimeout(function () {
						NotySingle.parentNode.remove();
					}, 500);
				});
			}
		});
		if (clickClose == true){
			NotySingle.addEventListener('click', function () {
                NotySingle.classList.remove("noty-active");
                setTimeout(function () {
                    NotySingle.parentNode.remove();
                }, 500);
            });
		}
		setTimeout(function () {
			NotySingle.classList.add("noty-active");
		}, 100);
		if (timeout != 0) {
			const NotyBar = NotySingle.querySelector(".noty-bar");
			let minus = 0;
			let isPaused = false;
			let progress = setInterval(function () {
				if (!isPaused) {
					minus = minus + 100;
					let perecent = (100 * (timeout - minus)) / timeout;
					NotyBar.style.width = perecent + "%";
					if (perecent < 0) {
						NotySingle.classList.remove("noty-active");
						setTimeout(function () {
							NotySingle.parentNode.remove();
						}, 500);
						var NotyCheck =
							document.getElementsByClassName("noty-single");
						if (NotyCheck.length == 0) {
							NotyBox.remove();
						}
					}
				}
			}, 100);
			if (this.hoverPause == true) {
				NotySingle.addEventListener(
					"mouseenter",
					(event) => {
						NotyBar.style.width = "100%";
						isPaused = true;
					},
					false
				);
				NotySingle.addEventListener(
					"mouseleave",
					(event) => {
						minus = 0;
						isPaused = false;
					},
					false
				);
			}
		}
		return true;
	}
}
