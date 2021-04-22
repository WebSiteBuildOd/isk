//js-phone-input

$(function(){
    
    var codeMask = new Inputmask({
		mask: "9-9-9-9-9-9",
		clearMaskOnLostFocus: true,
		clearIncomplete: false,
	});
	
    var btnConfirmPhone = $('#btn-confirm-phone'),
        btnConfirmCode = $('#btn-confirm-phone-step-2'),
        inputCode = $('#form-confirm-sms [name="sms"]');
        
    var confirmCode = 0;
        
    codeMask.mask(inputCode);
   
    // проверяем, заполнен ли номер телефона, и открываем кнопку Подтвердить номер
    $(".div_js_phone_val").on("keyup blur", function () {
        let val = $(this).val(),
            error = 0;
        if(val.length != 8 && val.indexOf('_') != -1) { error = 1; }
        !error ? showConfCode(1) : showConfCode(0);
    });
    
    function showConfCode(show){
        btnConfirmCode.hide(200);
        $('.js-sms').fadeOut(100);
        $('input[name="sms"]').val('').next('label').removeClass('is-focus');
        if(show) {
            // показываем 
            btnConfirmPhone.fadeIn(200);
        } else {
            // не показываем
            btnConfirmPhone.fadeOut(200);
        }
        
    }
    
    // событи на кнопке Подтвердить номер
    btnConfirmPhone.click(function(e){
        e.preventDefault();
        
        // проверяем, заполнен ли номер телефона
        let error = 0,
            inputValWithPhone = $('input.div_js_phone_val').val();
        
        if(inputValWithPhone.length != 8 && inputValWithPhone.indexOf('_') != -1) { error = 1; }
        if(error) { return false; }
        
        
        $.ajax({
            url: 'assets/snippets/confirmPhone.php',
            method: 'GET',
            data: 'phone='+$('#form-confirm-sms input[name="phone"]').val(),
            beforeSend: function(){
                btnConfirmPhone.hide(200);
                btnConfirmCode.show(200);
            },
            success: function(data){
                
                if(!data.length) { return false; }
                let d = JSON.parse(data);
                if(d.status) {
                    $(".js-sms").slideDown(300);
                    $(".js-confirm-number").addClass("is-active");
                }
                

            }
            
        });
    });
   
    btnConfirmCode.click(function(e){
        e.preventDefault();
        // проверяем, заполнен ли проверочный код
        let val = inputCode.val();
        val = val.replace(/-/g,'');
        
        if(val.length != 6) {
            return false;
        } 
        
        $.ajax({
            url: 'assets/snippets/confirmCode.php',
            method: 'GET',
            data: 'code='+val,
            beforeSend: function(){
                btnConfirmCode.hide(200);
                $('.js-sms').fadeOut(100);
                $('input[name="sms"]').val('').next('label').removeClass('is-focus');
            },
            success: function(data){
                
                if(!data.length) { return false; }
                let d = JSON.parse(data);
                if(d.status) {
                    $(".js-confirm-number").removeClass("is-active");
                    if($('[name="take"]').prop('checked')) {
                        $('.js-toggle-sesult').prop('disabled', false);    
                    }
                    $('.js-sucsess').fadeIn(200);
                  /*  setTimeout(function(){
                        $('.js-sucsess').fadeOut(200);
                    },3000);*/
                    confirmCode = 1;
                } else {
                    $('.js-toggle-sesult').prop('disabled', true);
                    confirmCode = 0;
                }
                
            }
            
        });
        
        
    });
    
    // input take
    
    $('[name="take"]').change(function(){
       if(confirmCode && $(this).prop('checked')) {
           $('.js-toggle-sesult').prop('disabled', false);
       } else {
           $('.js-toggle-sesult').prop('disabled', true);
       }
    });
    
    $(".js-toggle-sesult").click(function (e) {
                
        e.preventDefault();
        let form = $('#form-confirm-possibility-divorce'),
            events = '',
            findCol = '';
        
        if(form.find('[name="g_1_1"]:checked').val() == '1') { // мужской
            findCol = '[name^="g_2"]:checked';
        } else { // женский
            findCol = '[name^="g_3"]:checked';
        }
        form.find(findCol).each(function(){
            if(events.length) { events +='|'; }
            events += $(this).val();
        });
        
        let dataForm = 'pol='+form.find('[name="g_1_1"]:checked').val();
        dataForm += '&events='+events;
        dataForm += '&childrens='+form.find('[name="g_4_1"]:checked').val();
        
        $.ajax({
            url: 'assets/snippets/confirm-possibility-divorce.php',
            method: 'GET',
            data: dataForm,
            beforeSend: function(){
                $('#result-text').html('');
            },
            success: function(data){
                
                
                if(!data.length) { return false; }
                $('.js-result-box').fadeIn(300);

                let dataRes = JSON.parse(data);
                console.log(dataRes.type);
                if(dataRes.type == 2 || dataRes.type == 1) {
                    $('#link-validate-isk').hide();
                }
                if(dataRes.type == 3) {
                    $('#link-validate-isk').show();
                }
                $('#result-text').html(dataRes.text);
                
            }
            
        });
    });
   
    
    
});