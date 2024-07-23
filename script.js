(function(){

    var Memory = {

        init: function(cards){
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.restart");
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },

        shuffleCards: function(cardsArray){
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function(){
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.paused = false;
            this.guess = null;
            this.binding();
        },

        binding: function(){
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },

        cardClicked: function(){
            var _ = Memory;
            var $card = $(this);
            if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
                $card.find(".inside").addClass("picked");
                var verb = $card.find(".verb").text();
                _.speak(verb); // Adiciona a chamada para a função de fala
                if(!_.guess){
                    _.guess = $(this).attr("data-id");
                } else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function(){
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }
                if($(".matched").length == $(".card").length){
                    _.win();
                }
            }
        },

        speak: function(text) {
            if ('speechSynthesis' in window) {
                var utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US'; // Define o idioma como inglês (EUA)
                window.speechSynthesis.speak(utterance);
            } else {
                console.log('Speech synthesis not supported');
            }
        },

        win: function(){
            this.paused = true;
            setTimeout(function(){
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1000);
        },

        showModal: function(){
            this.$overlay.show();
            this.$modal.fadeIn("slow");
        },

        hideModal: function(){
            this.$overlay.hide();
            this.$modal.hide();
        },

        reset: function(){
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show("slow");
        },

        shuffle: function(array){
            var counter = array.length, temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function(){
            var frag = '';
            this.$cards.each(function(k, v){
                frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
                <div class="front"><img src="'+ v.img +'"\ alt="'+ v.name +'" /><div class="verb">'+ v.name +'</div></div>\
                <div class="back"></div></div>\
                </div>';
            });
            return frag;
        }
    };

    var cards = [
        {
            name: "run",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Run",
            id: 1,
        },
        {
            name: "walk",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Walk",
            id: 2
        },
        {
            name: "eat",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Eat",
            id: 3
        },
        {
            name: "drink",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Drink",
            id: 4
        },
        {
            name: "sleep",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Sleep",
            id: 5
        },
        {
            name: "write",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Write",
            id: 6
        },
        {
            name: "read",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Read",
            id: 7
        },
        {
            name: "play",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Play",
            id: 8
        },
        {
            name: "jump",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Jump",
            id: 9
        },
        {
            name: "swim",
            img: "https://via.placeholder.com/150/000000/FFFFFF/?text=Swim",
            id: 10
        }
    ];

    Memory.init(cards);

})();
