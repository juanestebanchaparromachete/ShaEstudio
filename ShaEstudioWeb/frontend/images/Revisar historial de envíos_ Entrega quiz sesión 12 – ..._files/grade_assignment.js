var gradeAssignment = {
   
  CROCODOC_FRAME_ID_PREFIX : 'inlineView',
  CROCODOC_FRAME_CLASS : 'crocodoc_iframe_embed',
  SUBMISSION_TEXT : 'submissionText',
  SESSION_EXP_WARN_TIMEOUT : 3300,
  
  sessionExpWarnTimerId : null,
  
  touchUp : function( editMode )
  {
    // move feedback file picker inside of feedback section & hide
    var feedback = $("currentAttempt_feedback");
    var feedbackFilePicker = $("feedback_filePicker");
    if ( feedback && feedbackFilePicker )
    {
      feedbackFilePicker.remove();
      feedback.insert( { bottom: feedbackFilePicker } );
      feedbackFilePicker.down('li').hide();
    }

    if ( editMode )
    {
      // move feedback file picker inside of feedback section & hide
      var feedbackAttachButton = $("feedback_attachFile");
      if ( feedback && feedbackAttachButton )
      {
        // place feedback attach button on vtbe bottom bar
        feedbackAttachButton.remove();
        feedback.down("a.textboxToolbarBtn").insert( { after : feedbackAttachButton } );
      }

    
      // move grading notes file picker inside of grading notes section & hide
      var gradingNotes = $( "currentAttempt_gradingNotes" );
      var notesFilePicker = $("notes_filePicker").remove();
      if ( gradingNotes && notesFilePicker )
      {
        gradingNotes.insert( { bottom: notesFilePicker } );
        notesFilePicker.down('li').hide();
       
        // place grading notes attach button on vtbe bottom bar
        var notesAtFile = $("notes_attachFile");
        if (notesAtFile)
        {
          var notesAttachButton = notesAtFile.remove();
          gradingNotes.down("a.textboxToolbarBtn").insert( { after : notesAttachButton } );
        }
      }
    }
    
  },
  
  init : function( attemptGradingTagId, inlineViewResponse )
  {
    var selectedSubmissionId = gradeAssignment.SUBMISSION_TEXT;
    
    if ( inlineViewResponse )
    {
      var responseJSON = inlineViewResponse.evalJSON();
      gradeAssignment.handleInlineViewResponse( responseJSON );

      selectedSubmissionId = responseJSON.file_id;
    }
    
    attemptGrading.inlineGrader.markSubmissionSelected( attemptGradingTagId, selectedSubmissionId );     
  },

  inlineView : function( event, fileId, attemptId )
  {
    gradeAssignment._inlineView( event, "/webapps/assignment/inlineView", fileId, attemptId );
  },
  
  inlineViewGroupFile : function( event, fileId, attemptId )
  {
    gradeAssignment._inlineView( event, "/webapps/assignment/inlineView?group=true", fileId, attemptId );
  },
  
  _inlineView : function( event, requestUrl, fileId, attemptId )
  {
    gradeAssignment.hideAllViews();
    
    if ( $( gradeAssignment.getViewContainerId( fileId ) ) )
    {
      $( gradeAssignment.getViewContainerId( fileId ) ).show(); 
    }
    else
    {
      // call to hide currently displayed view - new iframe will be inserted as visible          
      gradeAssignment.toggleLoadingMessage( true );

      var params = { 'file_id' : fileId, 
                     'attempt_id' : attemptId,
                     'course_id' : courseId };
      
      new Ajax.Request( requestUrl,
                        {
                          method : 'get',
                          parameters : params,
                          onSuccess : function( response, headerJSON )
                          {
                            gradeAssignment.handleInlineViewResponse( response.responseJSON );
                          }
                        });
    }
    
    Event.stop( event );
  },
  
  handleInlineViewResponse : function( responseJSON )
  {
    // See constants in AssignmentManager for the JSON member names.
    var status = responseJSON.status;
    
    var fileId = responseJSON.file_id;
    var fileName = responseJSON.fileName;
    var viewUrl = responseJSON.viewUrl;
    var downloadUrl = responseJSON.downloadUrl;
    var editMode = responseJSON.editMode;
    
    if ( viewUrl )
    {
      var crocodocFrame = gradeAssignment.createViewContainer( viewUrl, fileId );
      $('previewerInner').insert( { bottom : crocodocFrame } );      
      
      // set crocodoc session expiration warning for instructors. do this for the first viewed doc only - only if timer id is null
      if ( "true" === editMode && !gradeAssignment.sessionExpWarnTimerId )
      {
        gradeAssignment.setupSessionExpWarning();
      }
    }
    else if ( downloadUrl )
    {
      var timeEstimate = responseJSON.timeEstimate;
      var extraMessageEl = $('downloadPanelExtraMessage');
      if ( timeEstimate )
      {
        var seconds = Math.ceil( timeEstimate / 1000 );
        if ( seconds < 1 )
        {
          // Make sure we never tell the user "0 seconds remaining".
          seconds = 1;
        }
        var convertMessage = page.bundle.getString('attachment.conversion.in.progress',seconds);
        extraMessageEl.show();
        extraMessageEl.innerHTML = convertMessage;
      }
      else
      {
        extraMessageEl.hide();
      }
      // TODO: show line receipt type  message based on status      
      $('downloadPanelFileName').innerHTML = fileName;
      $('downloadPanelButton').href = downloadUrl;
      
      $('downloadPanel').show();
    }
    else
    {
      // TODO: shouldn't happen. still should say something back. not sure yet
    }
    
    gradeAssignment.toggleLoadingMessage( false );                       
  },
  
  toggleLoadingMessage : function( show )
  {
    if ( show )
    {
      $('loadingMessage').show();
    }
    else
    {
      $('loadingMessage').hide();
    }
  },
  
  createViewContainer : function( viewUrl, fileId )
  {
    var attributes = { 'id' : gradeAssignment.getViewContainerId( fileId ), 
                       'src' : viewUrl,
                       'class' : 'crocodoc_iframe_embed',
                       'data-auto-height' : true,
                       'width' : '100%',
                       'height' : '100%',
                       'frameborder' : '0' };
    
    return new Element('iframe', attributes );
  },

  
  getViewContainerId : function( fileId )
  {
    if ( fileId == gradeAssignment.SUBMISSION_TEXT )
    {
      return gradeAssignment.SUBMISSION_TEXT + "View";
    }
    else
    {
      return gradeAssignment.CROCODOC_FRAME_ID_PREFIX + fileId;
    }
  },
  
  hideAllViews : function()
  {
    var panels = $('previewerInner').immediateDescendants().each( function( viewContainer )
    {
      viewContainer.hide();
    });
    
  },
  
  setupSessionExpWarning : function()
  {
    var warn = function() { alert( page.bundle.getString( "grade.assignment.warn.crocodoc.session.expiration" ) ); };
    gradeAssignment.sessionExpWarnTimerId = warn.delay( gradeAssignment.SESSION_EXP_WARN_TIMEOUT );
    
    window.onunload = function () { 
      window.clearTimeout( gradeAssignment.sessionExpWarnTimerId ); 
      gradeAssignment.sessionExpWarnTimerId = null;
    };
  }
};

gradeAssignment.deleteGroupAttempt = function( event, url )
{
  Event.stop( event );
  
  if ( confirm( page.bundle.getString( "grade.assignment.delete.group.attempt.confirm" ) ) )
  {
    attemptInlineGrader.toggleGradingDataPanel( false );
    var form = $( document.gradeAttemptForm );
    form.action = url;
    form.submit();
  }
};

gradeAssignment.cancel = function()
{
  attemptInlineGrader.toggleGradingDataPanel( false );
  attemptInlineGrader.revertGrade();
  
  attemptGrading.pageMonitor.getInstance().forceSkipConfirm();
  
  // TODO: Adding this code for now even though it doesn't work yet.  To fix, change grade_assignment.jsp to return false; and fix inlinegrader.revertGrade to work for feedback and notes as well
  // and then we can avoid reloading the page
  attemptInlineGrader.focusOnToggleButton();

  return true;
};