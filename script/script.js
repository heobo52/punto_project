const pScrollSection = document.querySelector('#punto_scroll_section');
        const pScrollWrapper = document.querySelector('.p_scroll_wrapper');
        const onePageContent = document.querySelectorAll('.scroll_content');
        const upFixedContainer = document.querySelector('.introduction_up_fixed_container');
        const pScrollContainer = document.querySelector('.p_scroll_container');
        const slideScrollTextContentContainer = document.getElementsByClassName('slide_scroll_text_content_container');
        const scrollContentImg = document.querySelectorAll('.scroll_content_img');
        let range;
        let isThrottled = false;



        window.addEventListener('scroll', () => {
            if(isThrottled) return;

            isThrottled = true;

            const topPosition = upFixedContainer.getBoundingClientRect().top;

            if(topPosition < window.innerHeight){
                upFixedContainer.classList.add('active');
            }else{
                upFixedContainer.classList.remove('active');
            }

            setTimeout(() => {
                isThrottled = false;
            }, 100);
        })


        const init = () => {
            range = pScrollWrapper.getBoundingClientRect().width - window.innerWidth;
            pScrollSection.style.height = `${range + window.innerHeight}px`
        }


        init();
        window.addEventListener('resize', init)
        window.addEventListener('scroll',(e)=>{
            const translateX = pScrollSection.getBoundingClientRect().top;

            if(translateX > 0){
                pScrollWrapper.style.transform = `translateX(${0}px)`

            }else if(translateX < -range){
                pScrollWrapper.style.transform = `translateX(${-range}px)`

            }else {
                pScrollWrapper.style.transform = `translateX(${translateX}px)`
            }

        })

    

    document.addEventListener('DOMContentLoaded', () => {

        function openPuntoContent(index) {
        if(boxes[index].classList.contains('active')){
                boxes[index].classList.remove('active');
                description[index].classList.remove('active');
                boxes[index].querySelector('.letter').classList.remove('hidden')
                boxes[index].querySelector('.word').classList.add('hidden')
        }else{
            boxes.forEach((box,index) => {
                box.classList.remove('active')
                description[index].classList.remove('active')
                box.querySelector('.letter').classList.remove('hidden')
                box.querySelector('.word').classList.add('hidden')
            });

            boxes[index].classList.add('active')
            description[index].classList.add('active')
            boxes[index].querySelector('.letter').classList.add('hidden')
            boxes[index].querySelector('.word').classList.remove('hidden')
            }
        
    }


        const boxes = document.querySelectorAll('.value_box');
        const description = document.getElementsByClassName('data_description');


        boxes.forEach((box,index) => {
            const letter = box.textContent;
            const word = box.getAttribute('data_word');
            box.innerHTML = `<span class="letter">${letter}</span><span class="hidden word">${letter}${word.slice(1)}</span>`;

            box.addEventListener('click', () => {
                openPuntoContent(index)
            });
        });
           
            const puntoObserver = new IntersectionObserver((entries)=>{
                entries.forEach((entry) =>{
                    if(entry.isIntersecting && window.innerWidth < 1300 && !boxes[0].classList.contains('active')){
                        openPuntoContent(0)
                    }
                });

            })

            puntoObserver.observe(boxes[0]);
    });
    
    
    const scrollContent = document.querySelectorAll('.slide_scroll_text_content_container');

    const backgroundImagePlace =document.querySelector('.background_image_place');

    scrollContentImg

    const observer = new IntersectionObserver((entries) =>{
    
        entries.forEach((entry)=>{
            
            if(entry.isIntersecting) {
                for(let i = 0 ; i < backgroundImagePlace.childElementCount ; i ++) {
                    backgroundImagePlace.children[i].style.opacity = `0`;
                }
                backgroundImagePlace.children[entry.target.user_index].style.opacity = `1`;
            }else {
                backgroundImagePlace.children[entry.target.user_index].style.opacity = `0`;
            }
        })
    }, {
        root:null,
        rootMargin: '0px',
        threshold: 1
    });

    for(let i = 0 ; i <scrollContent.length ; i ++) {
        observer.observe(scrollContent[i])
        scrollContent[i].user_index=i;
    }


        const openBtn = document.querySelector('.menu_icon_container')
        const closeBtn = document.querySelector('.menu_close_icon_container')
        const menuFullPage = document.querySelector('.nav_total_menu_container')
        const menuPage = document.querySelector('.nav_menu_container')
        
        openBtn.addEventListener('click',()=>{
            menuFullPage.classList.toggle('active')
            menuPage.classList.toggle('active')
        })

        closeBtn.addEventListener('click',()=>{
            menuClose();
        })

        window.addEventListener('click',(e)=>{
            if(e.target.classList.contains('active')){
                menuFullPage.classList.remove('active')
                menuPage.classList.remove('active')
            }
        })

    
        function menuClose(){
            menuFullPage.classList.remove('active')
            menuPage.classList.remove('active')
        }