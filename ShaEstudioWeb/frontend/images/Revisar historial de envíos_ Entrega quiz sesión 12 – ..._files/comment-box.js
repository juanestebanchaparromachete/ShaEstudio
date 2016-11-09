var commentBox = {
                  
  onLightboxButtonClick : function( event, textareaId, title, lightboxUrl )
  {
    Event.stop( event );
    
    var textarea = $(textareaId);
    
    textarea.value = commentBox.getVtbe( textareaId ).innerHTML;
    commentBox.lightBox( textarea.value, title, lightboxUrl, "commentBox.onLightboxSubmit", textarea.id, false );
  },

  onLightboxSubmit : function( content, textareaId )
  {
    // update both hidden textarea and vtbe editor
    commentBox.getVtbe( textareaId ).innerHTML = content;
    $(textareaId).value = content;
    
    attemptGrading.pageMonitor.getInstance().onInputChange( textareaId );
  },
  
  getVtbe : function( textareaId )
  {
    var vtbeIframe = $( textareaId + '_ifr' );
    if ( vtbeIframe )
    {
      return vtbeIframe.contentDocument.getElementById( 'tinymce' );
    }
  },
  
  updateTextareas : function( clearTextareaChange )
  {
    $$('table.textboxtable textarea').each( function( textarea )
    {
      var  vtbe = commentBox.getVtbe( textarea.id );
      if ( vtbe )
      {
        if ( clearTextareaChange )
        {
          attemptGrading.pageMonitor.getInstance().clearInputChange( textarea.id );
        }  
        textarea.value = vtbe.innerHTML;
      }
    });
  },
  
  isDirty : function( textareaId )
  {
    if ( editors )
    {
      var editor = editors[ textareaId ];
      if ( editor && editor._tinyMceEditor )
      {
        return editor._tinyMceEditor.isDirty();
      }
    }
    
    return false;
  },

  lightBox : function( content, title, vtbeLightboxUrl, callback, callbackParams, reuseLightbox )
  {
    var openLightBox = ( reuseLightbox === null || reuseLightbox === false ); //Do not reuse the lightbox
    
    //If we need to openLightbox, if the current lightbox is not found and editor with contenttext not found we need to open the lightbox
    if ( openLightBox || lightbox.getCurrentLightbox() === null  )
    {
      var lightboxParam =
      {
          defaultDimensions :
          {
              w : 1000,
              h : 300
          },
          ajax :
          {
              url : vtbeLightboxUrl,
              method : 'post',
              asyn : false,
              params :
              {
                content : content,
                callback : callback,
                callbackParams : Object.toJSON( callbackParams ),
                isSpellcheckOnly : false,
                reuseLightbox : !openLightBox
              },
              loadExternalScripts : true
          },
          title : title,
          closeOnBodyClick : false,
          showCloseLink : false,
          contents : content,
          useDefaultDimensionsAsMinimumSize : true
      };
      var lightboxInstance = new lightbox.Lightbox( lightboxParam );
      lightboxInstance.open();
      return false;
    }
    else
    {
      lightbox.getCurrentLightbox().show();
      return true;
    }
  }
                
};
