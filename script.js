window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    // tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header') ,
        tabContent = document.querySelectorAll('.info-tabcontent');

    function HideTabContent(a){
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add('hide');
        }
    }
    HideTabContent(1);
    function showTabContent(b){
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if (target == tab[i]){
                    HideTabContent(0);
                    showTabContent(i);
                }
            }
        }
    });

    //Slider
    let SliderIndex = 1,
        Slider = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    
    showSliders(SliderIndex); 

    function showSliders(n){

        if (n > Slider.length){
            SliderIndex = 1;
        }
        if (n < 1){
            SliderIndex = Slider.length;
        }
        Slider.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        Slider[SliderIndex - 1].style.display = 'block';
        dots[SliderIndex - 1].classList.add('dot-active');

    }

    function plusSlider(n){
        showSliders(SliderIndex += n);
    }

    function currentSlider(n){
        showSliders(SliderIndex = n);
    }

    prev.addEventListener('click', function(){
        plusSlider(-1);
    });

    next.addEventListener('click', function(){
        plusSlider(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for (let i = 0;i < dots.length + 1;i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1] ){
                currentSlider(i);
            }
        }
    });

    //Timer
    let deadline = '2020-01-01';

    function getTimeRaminig(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t/1000) % 60);
        let minutes = Math.floor((t/1000/60) % 60);
        let hours = Math.floor((t/(1000*60*60)));

        return {
            'total': t,
            'house': hours,
            'minutes': minutes,
            'seconds': seconds 
        };
    }

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            house = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timerInterval = setInterval(upDate, 1000);

        function upDate(){
            let t = getTimeRaminig(endtime);
            house.textContent = t.house;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            if (t.total <=0){
                clearInterval(timerInterval);
            }
        }
    }

    setClock('timer', deadline);

    //Modal window

    let more = document.querySelector(".more"),
        close = document.querySelector('.popup-close'),
        overlay = document.querySelector('.overlay');

    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    //AJAX
    let message = {
        loading : 'loading',
        succses : 'succses',
        fail : 'fail'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        
        statusMessage.classList.add('status');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        

        let formData = new FormData(form);

        let obj = {};

        formData.forEach(function(value, key){
            obj[key] = value;
        });

        let json = JSON.stringify(obj);
        request.send(json);

        request.addEventListener('readystatechange', function(){
            if(request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            }else if (request.readyState === 4 && request.readyState.status == 200 ){
                statusMessage.innerHTML = message.succses;
            }else {
                statusMessage.innerHTML = message.fail;
            }
            for (let i = 0; i <= input.length; i++){
                input[i].value = '';
            }
        });

    });

    //FORM 2
    let form_2 = document.getElementById('form'),
        input_2 = form_2.getElementsByTagName('input'),
        statusMessage_2 = document.createElement('div');
        
        statusMessage_2.classList.add('status');
    form_2.addEventListener('submit', function(event){
        event.preventDefault();
        form_2.appendChild(statusMessage_2);
        let request_2 = new XMLHttpRequest();
        request_2.open('POST', "server.php");
        request_2.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        let formData_2 = new FormData(form_2);
        let obj_2 = {};
        formData_2.forEach(function(value, key){
            obj_2[key]= value;
        });
        let json_2 = JSON.stringify(obj_2);
        request_2.send(json_2);
        request_2.addEventListener('readystatechange', function(){
            if(request_2.readyState < 4){
                statusMessage_2.innerHTML = message.loading;
            }else if (request_2.readyState === 4 && request_2.readyState.status == 200 ){
                statusMessage_2.innerHTML = message.succses;
            }else {
                statusMessage_2.innerHTML = message.fail;
            }
            for (let i = 0; i <= input_2.length; i++){
                input_2[i].value = '';
            }
        });
    });
});