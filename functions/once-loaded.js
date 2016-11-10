$.fn.onceLoaded = function(selector, handler){
  return this.each(function(){
    $(this).on('load.bop', selector, handler);
    if(!!this.complete) {
      $(this).trigger('load.bop');
    }
  });
};
