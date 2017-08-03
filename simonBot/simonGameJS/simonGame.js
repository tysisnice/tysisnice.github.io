  //  material ripple
$.fn.materialripple = function(options) {
	var defaults = {
		rippleClass: 'ripple-wrapper'
	}
	$.extend(defaults, options);

	$('body').on('animationend webkitAnimationEnd oAnimationEnd', '.' + defaults.rippleClass, function () {
    removeRippleElement(this);
});

	var addRippleElement = function(element, e) {
		$(element).append('<span class="added '+defaults.rippleClass+'"></span>');
		newRippleElement = $(element).find('.added');
		newRippleElement.removeClass('added');

		// get Mouse Position
		var mouseX = e.pageX;
		var mouseY = e.pageY;

		// for each ripple element, set sizes
		elementWidth = $(element).outerWidth();
		elementHeight = $(element).outerHeight();
		d = Math.max(elementWidth, elementHeight);
		newRippleElement.css({'width': d, 'height': d});

		var rippleX = e.clientX - $(element).offset().left - d/2 + $(window).scrollLeft();
		var rippleY = e.clientY - $(element).offset().top - d/2 + $(window).scrollTop();

		// Position the Ripple Element
		newRippleElement.css('top', rippleY+'px').css('left', rippleX+'px').addClass('animated');
	}

	var removeRippleElement = function($element) {
		$element.remove();
	}

	// add Ripple-Wrapper to all Elements
	$(this).addClass('has-ripple');

	// Let it ripple on click
	$(this).bind('click', function(e){
		addRippleElement(this, e);
	});
	
	  document.activeElement.blur();
  $('.endPage').hide();
  $('.redScreen').hide();
  $('.greenScreen').hide();
  $('.gBtn').hide();
  $('#menuMidGame').hide();
  $('#menu').hide();
  $('body').show();
// set up all global variables /////////////////////////////////////////////
  var timing,
    str = false;
    currentlyTiming = false;
    replaySimon = false,
    playing = false,
    playerMove = false,
    strict = false;
    simonSays = [],
    simonLevel = -2,
    highScore = 0,
    playerAction = 0,
    time = 1000,
    reachThisScoreToWin = 20,
    lives = 3,
    aud1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    aud2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    aud3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    aud4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  aud1.oncanplaythrough = aud1;
  aud2.oncanplaythrough = aud2;
  aud3.oncanplaythrough = aud3;
  aud4.oncanplaythrough = aud4;
    
  
  ////////////////////////////////////////////////////////////////////////////
  // simon gives the sequence
  function simonSpeaks(){
    currentlyTiming = true;
    playerMove = false;
    playerLevel = 0;
    speakLevel = 0;
    time = (1000 - (simonLevel * 30));
    console.log(time);
    if (!replaySimon){
      simonLevel++;
    }
    // simon speaks a step in the sequence
    function speak(){
      var q = simonSays[speakLevel];
      simonButtonPress(q);
      
      if ( speakLevel === simonLevel ) {
        clearInterval(timing);
        setTimeout(function(){
          playerMove = true;
          $('.simonBot').transition({height:'76px',width:'76px',x:'-50%',y:'-50%',opacity:1,delay:50});
        },time);
      }
      speakLevel++;
    }
    
    // start speaking
    timing = setInterval(speak, time);
  }
  
  function simonButtonPress(button){
    var b = button;
    var obj = {'height':'62px', 'width':'62px'};
    var x = 'x';
    var y = 'y';
    setTimeout(function(){
      var butt = playerMove;
      playerMove = false;
      $('#b'+b).trigger('click');
      playerMove = butt;
      buttonSound(b);
    }, time/3);
    
    switch(b){
      case 1:
        obj[x] = '-180px';
        obj[y] = '-180px';
        break;
      case 2:
        obj[x] = '120px';
        obj[y] = '-180px';
        break;
      case 3:
        obj[x] = '-180px';
        obj[y] = '120px';
        break;
      case 4:
        obj[x] = '120px';
        obj[y] = '120px';
        break;
      default:
        console.log('not a valid button');
        break;
    }
    $('.simonBot').transition(obj, time/3)
      .transition({scale:1.15},time/4)
      .transition({scale:1},time/4);
  }
  //////////////////////////////////////////////////////////////////////////
  
  
  
  
  //////////////////////////////////////////////////////////////////////////
  // player presses a button to follow sequence during player turn
  function playerBtnPress(bn){
    playerAction = bn;
    if (playing && playerMove){
      var simonAction = simonSays[playerLevel];
      if (playerAction === simonAction){
        buttonSound(playerAction);
        playerLevel++;
        if (highScore < playerLevel){
          highScore = playerLevel;
          $('#score').text(highScore);
        }
        if (playerLevel === reachThisScoreToWin){
          playerMove = false;
          setTimeout(function(){winGame();}, 1000);
          return false;
        }
        var m = simonLevel + 1;
        if (playerLevel === m){
        playerMove = false;
          setTimeout(function(){simonSpeaks();}, time/2);
        }
      }
      else{
        playerMove = false;
        playerMistake();
        lives--;
        simonLevel--;
        $('#lives').text(lives);
        if (lives === 0){
          loseGame();
          return false;
        }
        else{
          replaySimon = true;
          setTimeout(function(){simonSpeaks();}, time+time/3);
          replaySimon = false;
        }
      }
    }
  }//////////////////////////////////////////////////////////////////////////
  
  
  function startGame(strictMode){
    str = strictMode;
    playerScore = 0;
    highScore = 0;
    simonScore = 0;
    simonLevel = -1;
    playing = true;
    playerMove = false;
    simonSays = [];
    if (strictMode){
      lives = 1;
      reachThisScoreToWin = 25;
      time = time - 100;
    }
    else{
      lives = 3;
      reachThisScoreToWin = 20;
    }
    $('#lives').text(lives);
    $('#score').text('0');
    $('#menu').fadeOut();
    $('.simonBot').transition({height:'74px',width:'74px',x:'-50%',y:'-50%'});
    for (i = 0; i <= reachThisScoreToWin; i++){
      var newButton = ((Math.floor(Math.random() * 4)) + 1);
      simonSays.push(newButton);
    }
    console.log(simonSays);
    simonSpeaks();
  }
  
  
  $(function(){
		$('.ripple').materialripple();
	});
  
  
  function buttonSound(button){
    switch (button){
      case 1:
        aud1.play(); break;
      case 2:
        aud2.play(); break;
      case 3:
        aud3.play(); break;
      case 4:
        aud4.play(); break;
      default: break;
    }
  }
  
  function loseGame(){
    playerMistake();
    setTimeout(function(){playerMistake();},300);
    setTimeout(function(){
      $('.simonBot').transition({height:'800px',width:'800px',delay:400});
      $('.endMessage').text('Game Over');
      $('#score').text(highScore);
      setTimeout(function(){$('.endPage').fadeIn();},700);
    },1100);
  }
  
  function winGame(){
    aud1.play();
    setTimeout(function(){aud2.play();
      setTimeout(function(){aud3.play();
        setTimeout(function(){aud4.play(); $('.greenScreen').fadeIn();
        },300);
      },300);
    },300);
    setTimeout(function(){
      $('.greenScreen').fadeOut();
      $('.simonBot').transition({height:'800px',width:'800px',delay:400});
      $('.endPage').fadeIn();
      $('.endMessage').text('Winner!');
      var goop = str ? 25 : 20;
      $('#score').text(goop);
    },1100);
  }
  
  function playerMistake(){
    $('.simonBot').transition({height:'76px',width:'76px',x:'-50%',y:'-50%',opacity:1,delay:200});
    aud3.play();
    aud4.play();
    aud1.play();
    aud2.play();
    $('.redScreen').fadeIn().fadeOut();
  }
  
  function openMenu(){
    
    if (playerMove && !anotherButton){
      $('.simonBot').transition({height:'800px',width:'800px',x:'-50%',y:'-50%'});
      $('#menuMidGame').show();
    }
    anotherButton = false;
  }
  
  function restart(){
    playerMistake();
    $('#menuMidGame').fadeOut();
    $('.simonBot').transition({height:'76px',width:'76px',opacity:1,delay:100})
      .transition({height:'800px',width:'800px',delay:100});
    setTimeout(function(){
      $('#menu').fadeIn();
    },1200);
  }
  
  function playOn(){
    anotherButton = true;
    $('#menuMidGame').fadeOut();
    $('.simonBot').transition({height:'76px',width:'76px',opacity:1});
  }
  ///////////////////////////////////////////////////////////////////////////
  // intro animations and map buttons to functions
  $(document).ready(function(){
    
    setTimeout(function(){$('.gBtn').fadeIn();}, 640);
    setTimeout(function(){
      $('#menu').fadeIn();
      $('.gameBox').css('overflow', 'hidden');
    }, 950);
    $('.simonBot')
    .css({height:'400%',width:'400%',opacity:0.7})
    .transition({height:'76px',width:'76px',opacity:1,delay:200})
    .transition({height:'800px',width:'800px',delay:400});
    
    
    
    //map buttons to functions
    $('#b1').click(function(){playerBtnPress(1);});
    $('#b2').click(function(){playerBtnPress(2);});
    $('#b3').click(function(){playerBtnPress(3);});
    $('#b4').click(function(){playerBtnPress(4);});
    
    $('.newRegular').click(function(){startGame(false);});
    
    $('.newStrict').click(function(){startGame(true);});
    
    $('.simonBot').click(function(){openMenu();});
    
    $('.restart').click(function(){restart();});
    
    $('.playOn').click(function(){playOn();});
    
    $('.playAgain').click(function(){
      $('.endPage').fadeOut(500);
      $('.simonBot').transition({height:'76px',width:'76px',opacity:1,delay:100})
      .transition({height:'800px',width:'800px',delay:100});
      setTimeout(function(){
        $('#menu').fadeIn();
      },700);
    });
    
  });///////////////////////////////////////////////////////////////////////