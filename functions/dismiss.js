$('body').on('click', '[data-bop-dismiss]', function(e){
	e.preventDefault();
	var $btn = $(this);
	var sel = $btn.data('bop-dismiss');
	var $dismiss = $dismissBtn.parents(sel);
	
	if($dismiss.length){
		$dismiss.css('display', 'none');
		return;
	}
	
	$dismiss = $btn.parent().find(sel);
	if($dismiss.length){
		$dismiss.css('display', 'none');
	}
	
}).on('click', '[data-bop-dismiss-with-wiping]', function(e){
	e.preventDefault();
	var $btn = $(this);
	var sel = $btn.data('bop-dismiss-with-wiping');
	var $dismiss = $btn.parents(sel);
	
	if($dismiss.length){
		$dismiss.remove();
		return;
	}
	
	$dismiss = $btn.parent().find(sel);
	if($dismiss.length){
		$dismiss.remove();
	}
	
});
