// Grabs class lists from Blackboard. Plays with javascript framesets.
// based on jQuerify:
// http://www.learningjquery.com/2009/04/better-stronger-safer-jquerify-bookmarklet

javascript:(function() {
  var el=document.createElement('div'),
      b=window.parent.frames[1].document.getElementsByTagName('body')[0],
      otherlib=false,
      msg='';
  el.style.position='fixed';
  el.style.height='300px';
  el.style['overflow-y']='scroll';
  el.style.width='220px';
  el.style.marginLeft='-110px';
  el.style.top='0';
  el.style.left='50%';
  el.style.padding='5px 10px';
  el.style.zIndex = 1001;
  el.style.fontSize='12px';
  el.style.color='#222';
  el.style.backgroundColor='#f99';
 
  // more or less stolen form jquery core and adapted by paul irish
  function getScript(url,success){
    var script=document.createElement('script');
    script.src=url;
    var head=document.getElementsByTagName('head')[0],
        done=false;
    // Attach handlers for all browsers
    script.onload=script.onreadystatechange = function(){
      if ( !done && (!this.readyState
           || this.readyState == 'loaded'
           || this.readyState == 'complete') ) {
        done=true;
        success();
        script.onload = script.onreadystatechange = null;
        head.removeChild(script);
      }
    };
    head.appendChild(script);
  }
  getScript('http://code.jquery.com/jquery-latest.min.js',function() {
    if (typeof jQuery=='undefined') {
      msg='Sorry, but jQuery wasn\'t able to load';
    } else {
      msg = '';
      jQuery('select#USERS_AVAIL', window.parent.frames[1].document).children('option').each(function(i,o) 
      { 
        if (o.innerHTML == 'Zzzzz, Library Blackboard') return; 
        msg += o.innerHTML.split(',').reverse().join(' ') + '<br/>'});
      
    }
    return showMsg();
  });
  function showMsg() {
    el.innerHTML=msg;
    b.appendChild(el);
    window.setTimeout(function() {
      if (typeof jQuery=='undefined') {
        b.removeChild(el);
      } else {
        jQuery(el).fadeOut(5000,function() {
          jQuery(this).remove();
        });
      }
    } ,15000);    
  }
})();