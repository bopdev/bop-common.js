//object-fit polyfill
  $.fn.objectFitFix = function(val){
    if( typeof HTMLImageElement !== 'function' || M.objectfit )
      return this;
    
    return this.each(function(){
      if( ! this instanceof HTMLImageElement || val == 'none' )
        return true; //continue;
      
      var $img = $(this);
      var $replacement = $($img.data('object-fit-fix-replacement'));
      if( $replacement.length ){
        $replacement.detach().css($img.css(['width', 'height', 'display', 'margin', 'padding', 'display']));
      }else{
        $replacement = $('<div>').css($img.css(['width', 'height', 'display', 'margin', 'padding', 'display']));
      }
      
      var position = $img.position();
      
      $replacement.css({'background-image':'url('+$img.attr('src')+')', 'background-position':'center center', 'position':'absolute', 'top':position.top+'px', 'left':position.left+'px'});
      
      $img.css('visibility', 'hidden');
      
      switch(val){
        case 'contain':
        case 'cover':
          $replacement.css('background-size', val);
        break;
        case 'scale-down':
          if( ! ( iw < w && ih < h ) ){
            $img.objectFitFix('contain');
          }
        break;
        case 'fill':
        case 'initial':
        default:
          $replacement.css('background-size', 'auto');
        break;
      }
      
      $img.before($replacement);
      $img.data('object-fit-fix-replacement', $replacement.get(0));
    });
  };
  
  $(document).ready(function(){
    function objectFitFix(){
      var $this = $(this);
      $this.objectFitFix($this.data('object-fit'));
    }
    $('img[data-object-fit]').onceLoaded(objectFitFix);
    $(window).on('resize.object-fit.bop', function(){
      window.setTimeout(function(){
        $('img[data-object-fit]').each(objectFitFix);
      }, 200);
    });
  });
