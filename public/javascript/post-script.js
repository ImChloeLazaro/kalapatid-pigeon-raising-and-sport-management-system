$(function () {
	for (var fc of $(".font-sizer")) {
		let txtlen = $(fc).text().length;
		let classes = ''
		if (txtlen <= 20) {
			classes = 'h1 fw-bolder'
		} else if (txtlen <= 30 || txtlen > 20) {
			classes = 'h4 fw-bolder'
		} else if (txtlen <= 50 || txtlen > 30) {
			classes = 'fw-bolder'
		}

		$(fc).addClass(classes);
	}
})