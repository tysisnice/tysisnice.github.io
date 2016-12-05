  var opList = [],
    solution = 0,


    solve = function(){
      solution = eval(opList.join(''));
      $('.answerWindow').text(solution);
    },

    calcOp = function(num){
      if (opList.length > 17){
        num = opList.pop();
      }
      opList.push(num);
      $('.textWindow').text(opList.join(''));
      solve();
    },

    equals = function(){
      var solString = solution.toString();
      $('.answerWindow').text(0);
      $('.textWindow').text(solString);
      solution = 0;
      opList = solString.split('');
    },

    clearAll = function(){
      $('.textWindow').text(0);
      $('.answerWindow').text('ans');
      opList = [];
      solution = 0;
    },

    deleter = function(){
      opList.pop();
      $('.textWindow').text(opList.join(''));
      solve();
    },

    newWindow = function(){
      window.open(window.location.href, '_blank', 'height=570,width=550');
    }
