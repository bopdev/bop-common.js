var cssTransformsAllowed = M.csstransforms;
//centralize polyfill;
$.fn.centralize = function(dir){
  return this.each(function(){
    var $this = $(this);
    //var $container = $this.parent();

    //$container.css({position:'relative'});
    $this.css({position:'absolute'});

    switch(dir){
      case 'h':
        $this.css('left', '50%');
        if(cssTransformsAllowed){
          $this.css('transform', 'translateX(-50%)');
        }else{
          $this.css('margin-left', -$this.outerWidth()/2);
        }
      break;
      case 'v':
        $this.css('top', '50%');
        if(cssTransformsAllowed){
          $this.css('transform', 'translateY(-50%)');
        }else{
          $this.css('margin-top', -$this.outerHeight()/2);
        }
      break;
      case 'both':
      default:
        $this.centralize('h').centralize('v');
      break;
    }
  });
};
