$(".noty-confirm").each(function (index) {
	let thisone = $(this);
	thisone.click(function (event) {
		event.preventDefault();
		let type = "warning";
		if (thisone.data("type")) {
			type = thisone.data("type");
		}
		let title = null;
		if (thisone.data("title")) {
			title = thisone.data("title");
		}
		let timeout = 7000;
		if (thisone.data("timeout")) {
			timeout = thisone.data("timeout");
		}
		noty.push({
			type: type,
			title: title,
			text: thisone.data("text"),
			timeout: timeout,
			buttons: {
				logout: {
					classname: "noty-button-true",
					text: thisone.data("true"),
					action: function () {
						window.location.href = thisone.attr("href");
					},
					close: true,
				},
				cancel: {
					classname: "noty-button-false",
					text: thisone.data("false"),
					close: true,
				},
			},
		});
	});
});
