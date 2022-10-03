//Hide properties without price
$$('[role="presentation"]').forEach( el => {
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

//Hide ads
$$('aside').forEach(el => el.style.display = "none")