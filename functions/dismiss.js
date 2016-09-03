$('body').on('click.bop.dismiss', '[data-bop-dismiss]', function(e){
	e.preventDefault();
	var $btn = $(this);
	var sel = $btn.data('bop-dismiss');
	var $dismiss = $btn.closest(sel);
	$dismiss = $dismiss.length ? $dismiss : $(sel);
	
	if($btn.hasClass('bop-dismiss-with-wiping')){
		$dismiss.remove();
	}else{
		$dismiss.css('display', 'none');
	}
});
