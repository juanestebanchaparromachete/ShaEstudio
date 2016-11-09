var attemptGrading = {};

attemptGrading.inlineGrader = Class.create();

attemptGrading.inlineGrader.prototype = {

  initialize : function( id, saveDraftUrl, submitUrl, ajax )
  {
    this.id = id;
    this.gradeInput = $( this.id + "_grade" );
    this.initialGrade = this.gradeInput.value;

    this.makeOverRubricButton();
    this.rubricList = $("collabRubricList");
    
    this.ajax = ajax;
    this.saveDraftUrl = saveDraftUrl;
    this.submitUrl = submitUrl;

    this.disabled = ( !this.saveDraftUrl || this.saveDraftUrl.empty() ) && ( !this.submitUrl || this.submitUrl.empty() );

    this.gradingDataPanel = $( this.id + "_gradeDataPanel" );
    this.gradingDataPanelToggle = $( this.id + "_gradeDataPanelLink" );
    this.saveButton = $( this.id + "_saveButton" );
    this.submitButton = $( this.id + "_submitButton" );

    attemptGrading.pageMonitor.getInstance().reset();
    this.attachEventListeners();
  },

  attachEventListeners : function( )
  {
    var submissions = $$(".filesList li a.attachment");
    submissions.each( function( submission )
    {
      submission.observe( "click", this.onSubmissionClick.bind( this ) );
      submission.observe( "keydown", this.onKeyDownSubmission.bind( this ) );
    }.bind( this ));


    if ( !this.disabled )
    {
      this.gradeInput.observe( "change", function(){ attemptGrading.pageMonitor.getInstance().onInputChange( this.gradeInput.id ); }.bind( this ) );
      this.gradeInput.observe( "focus", function() { this.toggleGradingDataPanel( true ); }.bind( this ) );
      this.gradeInput.observe( "keydown", this.onKeyDownInput.bind( this ) );
      
      if (this.gradingDataPanelToggle) 
      {
        // only users who can grade see the grading data panel
        this.gradingDataPanelToggle.observe("click", this.toggleGradingDataPanelOnClick.bind(this) );
      }
    }

    if ( !this.disabled && this.saveButton ) this.saveButton.observe( "click", this.onSaveClick.bind( this ) );
    if ( !this.disabled && this.submitButton ) this.submitButton.observe( "click", this.onSubmitClick.bind( this ) );
    
    if ( this.rubricList )
    {
      document.observe( "bb:saveInlineRubricCallback", this.onRubricSubmit.bind( this ) );
    }
  },

  onKeyDownInput : function( event )
  {
    var key = event.keyCode || event.which;

    // expand grading panel
    this.toggleGradingDataPanel( true );

    if ( key == Event.KEY_RETURN  )
    {
      this.gradeInput.blur();

      this.onSubmitClick(event);
    }
  },

  onSubmissionClick : function( event )
  {
    attemptGrading.inlineGrader._markSubmissionSelected( Event.findElement( event, "a" ).id );
  },

  onKeyDownSubmission : function( event )
  {
    var key = event.keyCode;
    var item = Event.findElement( event, "a");

    switch (key) {

      case Event.KEY_LEFT :

      // weird to navigate to left from unselected item and come back to selected - make it only work on selected
      if ( item.hasClassName("selected") )
      {
        var previewer = $("previewer");
        if ( previewer )
        {
          previewer.focus();
          previewer.observe( "keydown", this.onKeyDownPreviewer.bind(this) );
        }

        Event.stop( event );
      }

      break;

      case Event.KEY_DOWN:

        var next = item.up(0).next("li");
        if ( next )
        {
          next.down("a").focus();
        }

        Event.stop( event );
        break;


      case Event.KEY_UP:

        var previous = item.up(0).previous("li");
        if ( previous )
        {
          previous.down("a").focus();
        }

        Event.stop( event );
        break;

    }
  },

  onKeyDownPreviewer : function( event )
  {
    if ( event.keyCode === Event.KEY_RIGHT )
    {
      var currentSubmission = $$('.filesList li a.selected')[0];
      if ( currentSubmission )
      {
        currentSubmission.focus();
      }

      Event.stop( event );
    }
  },

  validateAttemptGrade : function()
  {
    return gradebook_utils.validateGradeEntry(
    {
        inputField : this.gradeInput,
        label : page.bundle.getString( "attempt_grading.grade.input.label" ),
        confirmClearMsg : page.bundle.getString( "attempt_grading.grade.clear.confirm" )
    } );
  },

  onSaveClick : function( event )
  {
    if ( this.gradeInput.value !== "" && !this.validateAttemptGrade() ) return;

    this._onSubmitClick( event, this.saveDraftUrl );
  },

  onSubmitClick : function( event )
  {
    if ( !this.validateAttemptGrade() ) return;

    this._onSubmitClick( event, this.submitUrl );
  },

  _onSubmitClick : function( event, submitUrl )
  {
    if ( event ) Event.stop( event );

    // make sure textareas are up to date
    commentBox.updateTextareas( true );

    this.toggleGradingDataPanel( false );

    var form = $( document.gradeAttemptForm );

    if ( this.ajax && this.ajax === "true" )
    {
      var paramHash = form.serialize( true );
      paramHash[ "blackboard.platform.security.NonceUtil.nonce.ajax" ] = $( 'ajaxNonceId' ).value;
      paramHash.ajax = true;

      var contentContainer = $(this.id + '_content');

      new Ajax.Request( submitUrl,
                        {
                            method : 'post',
                            parameters : paramHash,
                            onSuccess : function( response, headerJSON )
                            {
                              // TODO: need to get detailed status of persist
                              new inlineGrading.MiniReceipt( response.responseJSON.success,
                                                             null,
                                                             response.responseJSON.receiptMessage,
                                                             contentContainer, 0 );

                              attemptGrading.pageMonitor.getInstance().clearInputChange( this.gradeInput.id );
                              attemptGrading.pageMonitor.getInstance().forceSkipConfirm();

                              this.initialGrade = this.gradeInput.value;
                              
                              //Attempts are created when no attempt ID is found. 
                              //Setting the newly created attempt value passed from the action.
								var attemptID = response.responseJSON.attemptId;
								if ( attemptID )
								{
									$('attempt_id').value = attemptID;
								}

                              //After Grading removing needs grading icon for the current user
                              if ( $('needsGradingCurrent') )
                              {
                                var parent = $('needsGradingCurrent').parentNode;
                                parent.removeChild( $('needsGradingCurrent') );
                              }

                              // This is for taking the user to the next item displayed from the Needs Grading page
                              if (typeof (theAttemptNavController) !== 'undefined'&& typeof (theAttemptNavController.saveAndNext) == "function")
                              {
                                theAttemptNavController.saveAndNext();
                              }

								//Close the override grade when the attempt grade is submitted
								if ( $('aggregateGradeContainer') &&  $('aggregateGradeContent').hasClassName("readOnly")  )
								{
									$('aggregateGradeContainer').setStyle("display:none");
								}
                            }.bind( this ),
                            onException : function( request, exception )
                            {
                              var messageKey = page.bundle.getString( "attempt_grading.receipt.error" );
                              new inlineGrading.MiniReceipt( false, messageKey, null, contentContainer, 0 );
                            }
                        } );
    }
    else
    {
      attemptGrading.pageMonitor.getInstance().clearInputChange( this.gradeInput.id );
      attemptGrading.pageMonitor.getInstance().forceSkipConfirm();

      form.action = submitUrl;
      form.submit();
    }

  },

  onDownloadClick : function( event, fileName, attemptId, courseId )
  {
    var link = Event.findElement( event, 'a' );
    if ( link && "" !== link.href )
    {
      var params = $H( link.href.toQueryParams() );

      params.set( "fileName", fileName );
      if ( !params.index( "attempt_id" ) )
      {
        params.set( "attempt_id", attemptId );
      }
      if ( !params.index( "course_id" ) )
      {
        params.set( "course_id", courseId );
      }

      var baseUrl = link.href.split("?")[0];
      link.href = baseUrl + "?" + params.toQueryString();

      return true;
    }
    else
    {
      Event.stop( event );
      return false;
    }
  },


  toggleGradingDataPanelOnClick : function( event )
  {
    Event.stop( event );

    this.toggleGradingDataPanel( !this.gradingDataPanel.visible()  );

    return false;
  },

  toggleGradingDataPanel : function( show )
  {
    if ( show )
    {
      if ( !this.gradingDataPanel.visible() )
      {
        new Effect.SlideDown( this.gradingDataPanel, {duration:0.3});
        this.gradingDataPanelToggle.addClassName( "expanded" );
        this.gradingDataPanelToggle.setAttribute("aria-expanded","true");

        window.setTimeout(dockMenu,300);
      }
    }
    else
    {
      if ( this.gradingDataPanel.visible() )
      {
        new Effect.SlideUp( this.gradingDataPanel, {duration:0.3});
        this.gradingDataPanelToggle.removeClassName( "expanded" );
        this.gradingDataPanelToggle.setAttribute("aria-expanded","false");
      }
    }
  },

  revertGrade : function()
  {
    this.gradeInput.value = this.initialGrade;
  },

  makeOverRubricButton : function()
  {
    $$('input[onclick^="rubricGradingService.gradeRubric"]').each( function( rubricButton )
    {
      rubricButton.removeClassName("genericButton");
      rubricButton.addClassName("inlineButton");
      rubricButton.addClassName("rubric");

      rubricButton.value = "";
    }.bind( this ));
  },

  onRubricSubmit : function( event )
  { 
    if ( event && event.memo.focusOnGradingTextBox )
    {  
      this.gradeInput.focus();
    }
    var msg = page.bundle.getString( "attempt_grading.rubric.receipt" );
    new inlineGrading.MiniReceipt( true, null, msg, this.gradingDataPanel, 0 );
  },
  
  showGradingNotes : function (event, prefix, notesButton)
  {
    var notesWrapper = $(prefix + '_gradingNotes_wrapper');
    inlineGrading.gradingUtil.toggleOnEvent( event, notesWrapper, false, 'a' ); 
    notesButton.remove();
    notesWrapper.down('span.helphelp').focus();
  },
  
  // Typically called after canceling the grading form to make sure the focus is correct.
  focusOnToggleButton : function()
  {
    this.gradingDataPanelToggle.focus();
  }
};

attemptGrading.inlineGrader.markSubmissionSelected = function( widgetId, submissionId )
{
  var linkId = widgetId + "_attemptFile" + submissionId;
  attemptGrading.inlineGrader._markSubmissionSelected( linkId );
};

attemptGrading.inlineGrader._markSubmissionSelected = function( linkId )
{
  var link = $( linkId );
  if ( !link ) return;

  $$('.filesList li a.selected').each( function( submission )
  {
    submission.removeClassName('selected');
  });
  link.addClassName('selected');
};

attemptGrading.pageMonitor = Class.create();

attemptGrading.pageMonitor.getInstance = function()
{
  if ( ! attemptGrading.pageMonitor.instance )
  {
    attemptGrading.pageMonitor.instance = new attemptGrading.pageMonitor() ;
  }
  return attemptGrading.pageMonitor.instance;
};

attemptGrading.pageMonitor.prototype = {

  initialize : function(msg)
  {
    this.inputList = [];
    this.skipConfirm = false;

    window.onbeforeunload = this.confirmExit.bind( this );
  },

  onInputChange : function( elementId )
  {
    this.inputList.push( elementId );
  },

  clearInputChange : function( elementId )
  {
    this.inputList.pop( elementId );
  },

  reset : function()
  {
    $A( this.inputList ).clear();
    this.skipConfirm = false;
  },

  forceSkipConfirm : function()
  {
    this.skipConfirm = true;
  },

  confirmExit : function()
  {
    if ( this.skipConfirm )
    {
      return;
    }
    else if ( this.inputList.length > 0  )
    {
      return "";
    }
    else if ( commentBox.isDirty( "gradingNotestext" ) || commentBox.isDirty( "feedbacktext" ) )
    {
      return "";
    }
    else
    {
      return;
    }
  }
};

function dockMenu() {
  var buttons, buttonTop, panel, panelHeight, panelTop, panelBottom, heightOffset;
  var viewportHeight = document.viewport.getHeight(); // height of the viewport

  //checks to see if we are opening an AttemptPanel or RubricsPanel
  if( $('currentAttempt_actions').up().visible() )
  {
    buttons = $('currentAttempt_actions');
    panel = $('currentAttempt_gradeDataPanel');
  }
  else if( $('currentAttempt_inlineRubric') )
  {
    buttons = $$('#currentAttempt_inlineRubric .rubricGradingComments + .taskbuttondiv')[0];
    panel = $('currentAttempt_inlineRubric');
  }

  if ( buttons && panel )
  {
    panelHeight = panel.getHeight();       // height of the panel
    panelTop = panel.viewportOffset().top; // how far down the panel is from the top
    panelBottom = panelHeight + panelTop;  // the bottom edge of the panel
    heightOffset = panelBottom - viewportHeight; // where to position the buttons (relative to the bottom edge of the panel) so they sit at the bottom of the screen

    // if buttonset overflows, make it dock
    if ( panelBottom > viewportHeight )
    {
      buttons.addClassName('dockMenu');
      buttons.setStyle({
          bottom: heightOffset  + 'px'
      });

      // make sure the buttons are not positioned outside the top of the gradePanel. recalculate buttonTop based on its new position
      buttonTop = buttons.viewportOffset().top;

      if ( buttonTop <= ( panelTop + 16) ) //16 is the value of the top drop shadow. want to make sure the shadow does not overlap the top edge
      {
        buttons.removeClassName('dockMenu');
        buttons.setStyle({
            bottom: '0'
        });
      }
    }
    else
    {
      //if there is no overflow, show the buttons inline
      buttons.removeClassName('dockMenu');
      buttons.setStyle({
          bottom: '0'
      });
    }
  }
}

document.observe("dom:loaded", function() {

 if ( $('currentAttempt_gradeDataPanel') )
 {
  $( 'globalNavPageContentArea' ).observe( 'scroll', function() {
    if( $( 'currentAttempt_gradeDataPanel' ).visible() ) {
      dockMenu();
    }
  });

  Event.observe(window, "resize", function() {
    if( $('currentAttempt_gradeDataPanel').visible() ) {
      dockMenu();
    }
  });
  // observes scrolling in the inlineGrader when it is maximized
  $('inlineGrader').observe('scroll', function(event){
    if( $('currentAttempt_gradeDataPanel').visible() ) {
      dockMenu();
    }
  });
 }
});
