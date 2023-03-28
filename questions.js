if($('#contest-game-type').val() == "CathTheEgg") {
    questions.counter = $(container_selector + " .counter_box");

    var url = _baseURL + "/qgamestart/" + _view_key;
    $.get(url, {}, function (response, status) {
        questions.counter.reset = function () {
            $('#CathTheEgg_counter').html("0");
            _st = Date.now();
            questions.counter.interval = setInterval(function () {
                var currentTimerDisplay = Math.floor((Date.now() - _st) / 1000);
                $('#CathTheEgg_counter').html(currentTimerDisplay);
            }, 1000);
        }

        _ready();
        preload(eggArr,
                done,
                "contestCathTheEgg",
                /* $('#contest-game-level').val(), */ 
                _st, 
                _scoreToWin,
                _increseScoreCount);


                
        console.log('response',response);
        if (response == "OK") {
            questions.counter.reset();
            var image1 = document.getElementById('bag').innerText;
            var image2 = document.getElementById('chips').innerText;
            var image3 = document.getElementById('skull').innerText;
            // var image4 = document.getElementById('bio').innerText;

            
            var eggArr = [];
            eggArr.push(
                {background_image: image1, type: 1, index: null}, {background_image: image1, type: 1, index: null},
                {background_image: image2, type: 1, index: null}, {background_image: image2, type: 1, index: null},
                {background_image: image3, type: 1, index: null}, {background_image: image3, type: 1, index: null});
                //{background_image: image4, type: 1, index: null}, {background_image: image4, type: 1, index: null});

            _st = Date.now();
        }    
    });  
}