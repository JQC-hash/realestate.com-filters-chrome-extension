execuate();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  if (request.executeContentScript == true) {
		execuate();
	  }
});

function execuate(){
	setTimeout(() => {
		hideNoPrice();
		hideAds();
	}, 100);
	// document.addEventListener("DOMContentLoaded", function() {

	// });
}

function hideNoPrice(){
	document.querySelectorAll('[role="presentation"]').forEach( el => {
		var priceDiv = el.querySelector('.residential-card__content-wrapper .property-price');
		if (priceDiv){
			var price = priceDiv.innerHTML;
			//if (price.charAt(0) !== '$' && !(price.charAt(0) >= '0' && price.charAt(0) <= '9')){
			if (price.indexOf('$') < 0){
				el.style.display = "none";
			}
		}
		else{
			el.style.display = "none";
		}
	});
}

function hideAds(){
	document.querySelectorAll('aside').forEach(el => el.style.display = "none");
}