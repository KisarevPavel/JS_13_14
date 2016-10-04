'use strict;'
$(function() {

   var data = {
      Title: 'Мой тест',

      quest: [{
         questionName: "Какая планета третья по счету от Солнца?",
         variant: [{
            answer: 'Земля',
            rigth: true,
			class: 'right_answer'
         }, {
            answer: 'Марс',
            rigth: false,
			class: 'wrong_answer'
         }, {
            answer: 'Юпитер',
            rigth: false,
			class: 'wrong_answer'
         }]
      }, {
         questionName: "Сколько спутников у планеты Земля?",
         variant: [{
            answer: '1 спустник',
            rigth: true,
			class: 'right_answer'
         }, {
            answer: '2 спутника',
            rigth: false,
			class: 'wrong_answer'
         }, {
            answer: 'Нет спутников',
            rigth: false,
			class: 'wrong_answer'
         }]
      }, {
         questionName: "Из каких химических елементов состоит вода?",

         variant: [{
            answer: 'Кислород',
            rigth: true,
			class: 'right_answer'
         }, {
            answer: 'Водород',
            rigth: true,
			class: 'right_answer'
         }, {
            answer: 'Азот',
            rigth: false,
			class: 'wrong_answer'
         }]
      }],
      result: "Проверить"
   };
   
   localStorage.setItem('data', JSON.stringify(data));
   var page = localStorage.getItem('data');
   var myData = JSON.parse(page);

   var html = $('#test_template').html();
   var $body = $('body');

   var content = tmpl(html, {
      data: myData
   });

   $body.append(content);

   var $popup = $('.js-popup');
   var $close = $('.js-close');
   var $result = $('.js-result');
   var $overlay = $('.overlay');
   var $checkedAnswers = $('.test');

   function showPopup(e) {
      e.preventDefault();
      $close.one('click', hidePopup);

      $popup.fadeIn(300);
	  $overlay.fadeIn(300);
	  $checkedAnswers.addClass('show_answers');


      var rightAnswers = [];
      for (var i = 0; i < myData.quest.length; i++) {
         for (var j = 0; j < myData.quest[i].variant.length; j++) {
            var currentAnswer = myData.quest[i].variant[j].rigth;
            rightAnswers.push(currentAnswer);
         }
      }

      var givenAnswers = [];
      $('input[type="checkbox"]').each(function() {
         if ($(this).prop('checked')) {
            givenAnswers.push(true);
         } else {
            givenAnswers.push(false);
         }
      });

      var result = JSON.stringify(givenAnswers) === JSON.stringify(rightAnswers);
      if (result) {
         $result.text('УСПЕХ')
      } else {
         $result.text('ПРОВАЛ');
      }

      $('input[type="checkbox"]').each(function() {
         $(this).removeAttr("checked");
      });

   };
   
   $('.js-check').on('click', showPopup);

   function hidePopup() {
	  $overlay.fadeOut(300);
      $popup.fadeOut(300);
   }
 
	localStorage.clear();
});