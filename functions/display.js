var transitionsAllowed = M.csstransitions;

var NS = 'bop.display';
var SELNS = 'bop-display';

var DATA = {
  action:SELNS,
  hidden:NS+'.hidden'
};
var EVENT = {
  click:'click.'+NS,
  hide:'hide.'+NS,
  hidden:'hidden.'+NS,
  show:'show.'+NS,
  shown:'shown.'+NS,
  remove:'remove.'+NS
};
var SELECTOR = {
  button:'data-'+SELNS,
  target:'data-'+SELNS+'-target'
};
var CLASSES = {
  hide:'bop-hide',
  hidden:'bop-hidden',
  show:'bop-show',
  shown:'bop-shown'
};

$('body').on(EVENT.click, SELECTOR.button, function(e){
	e.preventDefault();
	var $btn = $(this);
	var sel = $btn.data(DATA.target);
	var $el = $btn.closest(sel);
	$el = $el.length ? $el : $(sel);
	
	if(!$el.length) return;
	
	var action = $btn.data(DATA.action);
	
	if(action == 'toggle'){
    if($el.data(DATA.hidden)){
      action = 'show';
    }else{
      action = 'hide';
    }
	}
	
	switch(action){
	  case 'hide':
      $el.trigger($.Event(EVENT.hide, {relatedTarget: this}));
    	
    	if(transitionsAllowed){
    	  $el.removeClass(CLASSES.shown).addClass(CLASSES.hide);
    	  $el.on('transitionend', function(){
    	    $el.removeClass(CLASSES.hide).addClass(CLASSES.hidden);
    	  });
    	}else{
    	  $el.css('display', 'none');
    	}
    	
    	$el.data(DATA.hidden, true);
    	$el.trigger($.Event(EVENT.hidden, {relatedTarget: this}));
      break;
    case 'show':
      $el.trigger($.Event(EVENT.show, {relatedTarget: this}));
    	
    	if(transitionsAllowed){
    	  $el.removeClass(CLASSES.hidden).addClass(CLASSES.show);
    	  $el.on('transitionend', function(){
    	    $el.removeClass(CLASSES.hidden).addClass(CLASSES.shown);
    	  });
    	}else{
    	  $el.css('display', '');
    	}
    	
    	$el.data(DATA.hidden, false);
    	$el.trigger($.Event(EVENT.shown, {relatedTarget: this}));
      break;
    case 'remove':
      $el.trigger($.Event(EVENT.remove, {relatedTarget: this}));
    	
    	if(transitionsAllowed){
    	  $el.removeClass(CLASSES.shown).addClass(CLASSES.hide);
    	  $el.on('transitionend', function(){
    	    $el.remove();
    	  });
    	}else{
    	  $el.remove();
    	}
      break;
	}
});
