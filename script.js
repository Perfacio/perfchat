for(let el of document.getElementsByClassName('arrow')){
    // Нажать на стрелку направления
    el.addEventListener('click', function(){
        // Смещение активной картинки влево/вправо на всю ее ширину
        let count = parseInt(document.getElementsByClassName('slider-wrap')[0].style.transform.replace('translateX', '')
                                                                                     .replace('(', '')
                                                                                     .replace(')', '')
                                                                                     .replace('%', ''));

        if(!count){
            count = 0;
        }

        

        if(this.classList.contains('left')){
            if(count === 0){
                // Прокрутить в конец
                for(let i = 0; i >= -75; i-=5){
                    setTimeout(
                        function(){
                            document.getElementsByClassName('slider-wrap')[0].style.transform = `translateX(${i}%)`;  
                        },
                        50 * ((Math.abs(i) + count) / 10)
                    );
                }
            }
            else{
                for(let i = count; i <= count + 25; i+=5){
                    setTimeout(
                        function(){
                            document.getElementsByClassName('slider-wrap')[0].style.transform = `translateX(${i}%)`;  
                        },
                        50 * ((i - count) / 5)
                    );
                }
            }
        }
        else if(this.classList.contains('right')){
            if(count === -75){
                // Прокрутить в начало
                for(let i = 75; i >= 0; i-=5){
                    setTimeout(
                        function(){
                            document.getElementsByClassName('slider-wrap')[0].style.transform = `translateX(${-i}%)`;  
                        },
                        50 * ((-i - count) / 10)
                    );
                }
            }
            else{
                for(let i = count; i >= count - 25; i-=5){
                    setTimeout(
                        function(){
                            document.getElementsByClassName('slider-wrap')[0].style.transform = `translateX(${i}%)`;  
                        },
                        50 * ((Math.abs(i) + count) / 5)
                    );
                }
            }
        }
        // Смещение активного текста влево/вправо за картинкой
        // Установка новой картинки и текста в активную область
    });
}

for(let el of document.querySelectorAll('div.feedbacks table td label')){
    el.addEventListener('click', function() {
        this.parentElement.parentElement.classList.toggle('checked');
    });
}

// document => <Element>(html)
// document.[getElementById, querySelector] => <Element>
// document.[getElementsByClassName, getElementsByTagName, querySelectorAll] => <Element>[]
// document.createElement('div') => <Element>
// Element.appendChild(<Element>)
// Element.classList.[add, remove, toggle, contains]
// Element.style => {<css property name>: <css property value>}
// InputElement.[value, checked, type]
// Element.[id, name, method, action] 
// Element.parentElement => <Element>

// for(let i = 0; i < <array>.length; i++);
// for(let i in <array|object>);