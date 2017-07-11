var qsRegex;

$(function () {
	$.getJSON("https://api.myjson.com/bins/gzmrv", onDataReady)
})

function onDataReady(serverData) {
	printBooks(serverData);

	// quick search regex
	/*var qsRegex;*/

	// init Isotope
	var $grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		layoutMode: 'fitRows',
		filter: function () {
			// ? if : else 
			return qsRegex ? $(this).text().match(qsRegex) : true;
		}
	});

	// use value of search field to filter
	var $quicksearch = $('.quicksearch').keyup(debounce(function () {
		qsRegex = new RegExp($quicksearch.val(), 'gi');
		$grid.isotope();
	}, 200));

	// debounce so filtering doesn't happen every millisecond
	function debounce(fn, threshold) {
		var timeout;
		return function debounced() {
			if (timeout) {
				clearTimeout(timeout);
			}
			function delayed() {
				fn();
				timeout = null;
			}
			timeout = setTimeout(delayed, threshold || 100);
		}
	}
}

function printBooks(data) {
	var output = "";
	$.each(data.books, function(index){
		output += Mustache.render($("#myTemplate").html(), data.books[index]);
	});
	$(".grid").html(output);
}
