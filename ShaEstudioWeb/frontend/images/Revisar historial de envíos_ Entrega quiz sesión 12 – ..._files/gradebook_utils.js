var gradebook_utils = {};

//called by grade detail page
gradebook_utils.getNextUserId = function(visibleUserIds, userId)
{
  for ( var i = 0; i < visibleUserIds.length - 1; i++)
  {
    if (visibleUserIds[i] == userId)
    {
      return visibleUserIds[i + 1];
    }
  }
  return null;
},

// called by grade detail page
gradebook_utils.getPrevUserId = function(visibleUserIds, userId)
{
  for ( var i = 1; i < visibleUserIds.length; i++)
  {
    if (visibleUserIds[i] == userId)
    {
      return visibleUserIds[i - 1];
    }
  }
  return null;
},

gradebook_utils.initPreviewDivs = function( previewDivClass, inlineExpansion )
{
  // loop through preview divs
  $A(document.getElementsByTagName('div')).each( function( div )
  {
    if ( page.util.hasClassName( div, previewDivClass ) )
    {
        div = $(div);
        if ( div.empty() || div.scrollWidth <= div.clientWidth && div.scrollHeight <= div.clientHeight )
        {
          // if div is empty or no overflow remove style so it's width & height shrink to fit the div contents
          div.removeClassName( previewDivClass );
        }
        else
        {
          // open lightbox with div contents when view full link is clicked
          var viewFullLink = div.next('a');
            if ( viewFullLink )
            {
              viewFullLink.removeClassName( 'hideoff' );
              if (inlineExpansion)
              {
                Event.observe( viewFullLink, 'click', function( event )
                 {
                  if (div.alreadyExpanded)
                  {
                    div.style.height = '';
                    div.style.width = '';
                    div.alreadyExpanded = false;
                  }
                  else
                  {
                    div.style.height = 'auto';
                    div.style.width = 'auto';
                    div.alreadyExpanded = true;
                  }
                   Event.stop( event );
                 });
              }
              else
              {
                Event.observe( viewFullLink, 'click', function( event )
                {
                  new lightbox.Lightbox({
                    defaultDimensions : { w :500, h :375 },
                    useDefaultDimensionsAsMinimumSize :true,
                    verticalBorder :125,
                    horizontalBorder :125,
                    title : div.readAttribute('bb:lbTitle'),
                    contents : '<div class="container">' + div.innerHTML + '</div>'
                  }).open();
                  Event.stop( event );
                });
              }
            }
        }
    }
  });
};

gradebook_utils.getNumberLocalizer = function()
{
  if( !gradebook_utils.numberLocalizer )
  {
    gradebook_utils.numberLocalizer = new NumberLocalizer();
  }
  return gradebook_utils.numberLocalizer;
};

// Takes a number that is unlocalized and converts it to the current locale format with minimum two decimal places.
// If the number can't be parsed into a number, then the number will be returned without formatting.
gradebook_utils.formatNumberMin2Digits = function( num, maxPrecision )
{
  var numParsed = gradebook_utils.parseNumber( num );
  if( isNaN( numParsed ) )
  {
    return num;
  }

  var numLocalizer = gradebook_utils.getNumberLocalizer();
  if ( 2 == maxPrecision )
  {
    return numLocalizer.formatNumber( numParsed.toFixed( 2 ) );
  }
  else
  {
    if ( !maxPrecision )
    {
      maxPrecision = 5;
    }

    // now will try to get as little extra digits as needed, up to 5
    var roundBase = 100;
    var maxRoundBase = Math.pow( 10, maxPrecision );
    var mostPreciseRounding = Math.round( numParsed * maxRoundBase ) / maxRoundBase;

    for ( var i = 2; i < maxPrecision; ++i )
    {
      var floatRound = Math.round( numParsed * roundBase ) / roundBase;
      roundBase *= 10;
      if ( floatRound == mostPreciseRounding )
      {
        // adding any more digit will not add any more precision
        return numLocalizer.formatNumber( numParsed.toFixed( i ) );
      }
    }
    return numLocalizer.formatNumber( numParsed.toFixed( maxPrecision ) );
  }
};

// Takes a number that is in the current locale format and converts it back to an unlocalized number.
gradebook_utils.parseNumber = function( num )
{
  var numLocalizer = gradebook_utils.getNumberLocalizer();
  return ( typeof num === "string" ) ? numLocalizer.parseNumber( num ) : num; //only parse if num is already localized (i.e. in string format)
};

gradebook_utils.validateGradeEntry = function( options )
{
  options = Object.extend(
  {
      inputField : null,
      label : null,
      confirmClearMsg : null,
      gradingSchema : null // TODO: Not supported yet, but when it is, pass in an object from gradebookgridmodel_schema.js
  }, options );

  if ( !options.inputField )
  {
    // If we don't have an input field then it can't be valid
    return false;
  }

  options.inputField.value = gradebook_utils.trimString( options.inputField.value );

  if ( options.confirmClearMsg )
  {
    // Only check for clearing the grade if we have a clear msg
    if ( options.inputField.value === '-' ||
         ( options.inputField.value === '' && !options.inputField.defaultValue.blank() ) )
    {
      if ( !confirm( options.confirmClearMsg ) )
      {
        // The user doesn't want to clear the grade - revert the field back to the defaultValue
        options.inputField.value = options.inputField.defaultValue;
        return false;
      }
      // They've confirmed the clearing of the attempt -force the field to '-' as that is what the server expects
      // to clearly indicate 'clear' grade.
      options.inputField.value = '-';
      return true;
    }
  }

  var validationPassed = false;
  if ( options.label )
  {
    // Only check the numeric value if we're given a label to display
    var gradeInput = new inputText(
    {
        ref_label : options.label,
        id : options.inputField.id,
        trim : true,
        valid_efloat : true,
        minlength : 1,
        maxlength : 8
    } );

    validationPassed = gradeInput.check();
  }

  if (!validationPassed && options.gradingSchema)
  {
    validationPassed = options.gradingSchema(options.inputField.value, true);
  }

  return validationPassed;
};

gradebook_utils.trimString = function( strintToTrim )
{
  if( typeof String.prototype.trim === 'function' )
  {
    return strintToTrim.trim();
  }
  else
  { // we need this until we stop supporting IE8
    return strintToTrim.replace(/^\s+|\s+$/gm,'');
  }
};
