$(function($){
    
    // обработка кнопки Назад браузера
    
    $('#form-quiz-all').submit(function(e){
        e.preventDefault();
    });
    
    var phone = document.querySelectorAll("input[type='tel']");
    var date = document.querySelectorAll("[data-input-type='date']");
    
	var phoneMask = new Inputmask({
		mask: "+7 (999) 999-99-99",
		clearMaskOnLostFocus: true,
		clearIncomplete: false,
	});
	
	var dateMask = new Inputmask({
		mask: "99.99.9999",
		clearMaskOnLostFocus: true,
		clearIncomplete: false,
	});
	
	phoneMask.mask(phone);
	
	$('[data-mask]').each(function(){
	   
	   let mask = $(this).attr('data-mask');
	   let tplMask = new Inputmask({
    		mask: mask,
    		clearMaskOnLostFocus: true,
    		clearIncomplete: false,
    	});
    	tplMask.mask($(this));
	});
	
	
	$('.quiz__select').select2({
	    minimumResultsForSearch: 10
	});
    
    // слайдер
    
    $('.picture-slider').each(function(){
       let th = $(this),
           countItems = th.find('.item-slide').length;
        th.attr('data-count', countItems);  
       th.slick({
            slidesToShow: 1,
            prevArrow: th.next('.picture-slider__arrows').find('.prev'),
            nextArrow: th.next('.picture-slider__arrows').find('.next'),
            dots: true
        });
    });
    
    // проверка на минимум символов
    function validateMin(val, min){
        return val.length >= parseInt(min);
    }
    
    // проверка на email
    function validateEmail(val){
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(val.match(mailformat)) {
            return true;
        } else {
            return false;
        }
    }
    
    // проверка на phone
    function validatePhone(val){
        if(val.indexOf('_') == -1) {
            return true;
        } else {
            return false;
        }
    }
    
    // проверка на date
    function validateDate(val){
        if(val.indexOf('_') == -1) {
            let split = val.split('.');
            if(parseInt(split[0]) > 31) {
                return false; 
            }
            if(parseInt(split[1]) > 12) {
                return false; 
            }
            if(parseInt(split[2]) > 2020) {
                return false; 
            }
            return true;
        } 
        else {
            return false; 
        }
    }
    
    // проверка на selecy
    function validateSelect(val){
        if(val.length) {
            return true;
        } else {
            return false;
        }
    }
    
    // проверка по адресу
    function validateAddress(val){
        let reg = /\d/g;
        return val.match(reg);
    }
    
    // проверка по ФИО
    function validateFio(val){
        let reg = /([а-яА-ЯёЁ|a-zA-z]{2,})\s+[а-яА-ЯёЁ|a-zA-z]{2,}/g;
        return val.match(reg);
    }
    
    // проверка по Option
    function validateOption(th){
    
        return true;
    }
    
   
    function switchInput(item){
        let th = item,
            error = 0;
        // определяем тип поля
        let type = th.attr('data-input-type');
        if(!type.length) {error = 1; return 1;}
        if(!th.val().length) { error = 1; return 1; }
        switch (type) {
            case 'min':
                if(!validateMin(th.val(), th.attr('min'))) {
                    error = 1
                }
                break;
            case 'email':
                if(!validateEmail(th.val())) {
                    error = 1
                } 
                break;
            case 'phone':
                // проверяем, есть ли в номере телефона нижнее подчеркивание (с маски)
                if(!validatePhone(th.val())) {
                    error = 1
                }
                break;
            case 'date':
                if(!validateDate(th.val())) {
                    error = 1
                } 
            case 'select':
                if(!validateSelect(th.val())){
                    error = 1
                }
                
                break;
            case 'address':
                if(!validateAddress(th.val())){
                    error = 1
                }
                break;
            case 'fio':
                if(!validateFio(th.val())){
                    error = 1
                }
                break;
            case 'option':
                if(!validatePhone(th.val())) {
                    error = 1
                }
                break;
        }
        return error;
    }
   
    
    function validateInputsInBoxs(item){
        
        let boxs = item.closest('.quiz__step'), // родитель со всеми полями
            error = 0;                          // ошибка, по default 0
        
        // обходим все поля в данном блоке, 
        // и проверяем на валидацию
        boxs.find('.quiz__boxs [data-input-type]').each(function(){
            if((!$(this).closest('.quiz_type_optional').length && !$(this).closest('.quiz_inclide_optional').length) && switchInput($(this))){
                error = 1;
            }
        });
        if(boxs.find('.quiz_inclide_optional').length) {
            
            boxs.find('.quiz_inclide_optional').each(function(){
                
                // если не скрыт - проверяем
               if(!$(this).hasClass('quiz_inclide_hide')) {
                    $(this).find('[data-input-type]').each(function(){
                        
                        if(switchInput($(this))){
                            error = 1;
                        }
                    });
               } 
            });
        }
        
        boxs.find('.quiz__box.quiz_type_optional').each(function(){
            if($(this).hasClass('quiz_inclide_hide')) { return true; }
            $(this).find('[data-input-type]').each(function(){
                if(switchInput($(this))){
                    error = 1;
                }
            });
        });
        
        // если все поля прошли проверку - открываем кнопку Далее
        if(!error) {
            boxs.closest('[data-step]').find('.quiz__bottom .js-next-step').removeClass('is-hidden');
        } else {
            boxs.closest('[data-step]').find('.quiz__bottom .js-next-step').addClass('is-hidden');
        }
        //console.log(error);
        
    }
    
    // button next step
    
    $(".js-next-step").click(function (e) {
        e.preventDefault();
        let countSteps = parseInt($(".quiz__line").attr('data-count-steps'));
        let t = $(".quiz__line").width() / countSteps + $(".quiz__scale").width();
        let isActive = $(".quiz__step.is-active");
        let nextBox = $(".quiz__step.is-active").next();
        isActive.hide().removeClass("is-active").next('.quiz__step').addClass("is-active").fadeIn(500),
        $(".quiz__top-item.is-active").addClass("is-complete").removeClass("is-active").next().addClass("is-active"),
        $(".quiz__scale").css("width", t);
        nextBox.find('.picture-slider').slick('unslick').slick({
            slidesToShow: 1,
            prevArrow: nextBox.find('.picture-slider').next('.picture-slider__arrows').find('.prev'),
            nextArrow: nextBox.find('.picture-slider').next('.picture-slider__arrows').find('.next'),
            dots: true
        });
        /*nextBox.find('[data-input-type]').eq(0).focus();*/
    });
    
    // button prev step
    $('.js-prev-step').click(function(){
			
		let prevBox = $('.quiz__step.is-active').prev('.quiz__step');
		$('.quiz__step.is-active').hide().removeClass('is-active').prev('.quiz__step').addClass('is-active').fadeIn(500);
		/*prevBox.find('[data-input-type]').eq(0).focus();*/
		return false;
		
	});
	
	function initValid(){
	    // типы проверок
        $('[data-input-type]').unbind('keyup').keyup(function(){
            validateInputsInBoxs($(this));
        });
        
         $('[data-input-type]').focusout(function(){
            // если возвращает true - значит ошибка есть 
            if(switchInput($(this))) {
                $(this).closest('.quiz__field').addClass('quiz__field__error');
            }
        });
        $('[data-input-type]').focusin(function(){
            $(this).closest('.quiz__field').removeClass('quiz__field__error');
        });
        dateMask.mask($("[data-input-type='date']"));
	}
	
	initValid();
		
    $('[data-input-type="select"]').change(function(){
        validateInputsInBoxs($(this));
    });
    
    // событие enter
    /*$('[data-input-type]').keyup(function(i){
        if(i['originalEvent']['keyCode'] == 13) { // Enter
            let boxs = $(this).closest('.quiz__boxs'),
                next = boxs.closest('[data-step]').find('.quiz__bottom .js-next-step');
            if(!next.hasClass('is-hidden')) {
                next.click();
            }
        }
    });*/
    
    // при потере фокуса проверяем валидацию
    // если не проходит валидацию - добавляем класс error
   
    
    $('.quiz__select__show__block').change(function(){
        
        if($(this).attr('data-input-type') == 'select') {
            
            let id = $(this).val();
            if($(this).attr('data-id') && $('#'+$(this).attr('data-id')).length) {
                
                $('.quiz__select__hide__include').each(function(){
                   $(this).find('.quiz__field__error').removeClass('quiz__field__error'); 
                   $(this).addClass('quiz_inclide_hide');
                });
                
                $('#'+$(this).attr('data-id')).show();
                $('.quiz__select__hide__include').hide();
                let act =  $('#'+$(this).attr('data-id')+'_'+id);
                act.show().removeClass('quiz_inclide_hide');
                validateInputsInBoxs($('input', act).eq(0));
            }
            
        } else {
            if($(this).attr('data-id') && $(this).attr('data-id').length) {
                $('#'+$(this).attr('data-id')).show();
            }    
        }
        
        
    });
    
    // Добавить ребенка
    
    function addNewChildren(){
        $.ajax({
            url: 'assets/snippets/addChildren.php',
            method: 'GET',
            data: 'event=add-children',
            beforeSend: function(){
                
            },
            success: function(data){
                if(data.length) {
                    $('#quiz__section__childrens').append(data);
                    $('.quiz__box__include:not(:last-of-type) .quiz-add-children').hide();
                    $('.quiz-add-children').unbind('click').click(function(e){
                       e.preventDefault(); 
                       addNewChildren();
                    });
                    
                    $('.quiz__delete-children').click(function(e){
                        e.preventDefault(); 
                        $(this).closest('.quiz__box__include').remove();
                        $('.quiz__box__include .quiz-add-children').show();
                        $('.quiz__box__include:not(:last-of-type) .quiz-add-children').hide();
                    });
                    
                    initValid();
                    
                }
                
            }
            
        });
    }
    
    $('.quiz-add-children').click(function(e){
       e.preventDefault(); 
       addNewChildren();
    });
    
    // отслеживаем data-type-radio
    
    $('[data-type-radio]').change(function(e){
        let th = $(this),
            id = th.attr('data-id');
        if(th.attr('data-type-radio') == 'show') {
            $(id).removeClass('quiz_inclide_hide').show();
            $(id).prev('.quiz__box').removeClass('quiz_inclide_show');
        } else if(th.attr('data-type-radio') == 'hide') {
            $(id).addClass('quiz_inclide_hide').hide();
            $(id).prev('.quiz__box').addClass('quiz_inclide_show');
        }
        validateInputsInBoxs($(this));
    });
    
    // Работа с галереей на мобильном
    
    $('.mini-prev-slider').click(function(e){
        e.preventDefault(); 
        let id = $(this).attr('data-id');
        if(id.length) {
            $('.quiz').addClass('open-quiz-galley');
            $(id).addClass('show');
            let slider = $(id).find('.picture-slider');
            slider.slick('unslick').slick({
                slidesToShow: 1,
                prevArrow: slider.next('.picture-slider__arrows').find('.prev'),
                nextArrow: slider.next('.picture-slider__arrows').find('.next'),
                dots: true
            });
        }
    });
    
    // закрываем галерею - подсказку
    $('.quiz-click-close-galley, .quiz-btn-close-galley-popup').click(function(e){
        e.preventDefault(); 
        let id = $(this).closest('.quiz__column_right');
        if(id.length) {
            $('.quiz').removeClass('open-quiz-galley');
            id.removeClass('show');
        }
    });
    
    /*$('.quiz__field textarea.field__input').keyup(function(){
       if($(this)[0].scrollHeight > $(this)[0].clientHeight ){
         $(this).css('line-height', '1.2');
       } else {
           $(this).css('line-height', '1.6');
       }
    });*/
    
    autosize($('textarea.field__input'));
    
    
});

















