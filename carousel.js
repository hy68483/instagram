window.addEventListener('load', function () {
    var carousels = document.getElementsByClassName('carousel');
    // 캐러셀 이벤트를 등록하는 로직
    for (var i = 0; i < carousels.length; i++) {
        addEventToCarousel(carousels[i]);
    }
});

function addEventToCarousel(carouselElement) {
    var ulElement = carouselElement.querySelector('ul');
    var liElements = ulElement.querySelectorAll('li');

    // 너비 값 조정
    var liWidth = liElements[0].clientWidth;
    var adjustedWidth = liElements.length * liWidth;
    ulElement.style.width = adjustedWidth + 'px';

    // 슬라이드 버튼 이벤트 등록
    var slideButtons = carouselElement.querySelectorAll('.slide');
    for (var i = 0; i < slideButtons.length; i++) {
        slideButtons[i].addEventListener('click', function (e) {
            createListenerSlide(carouselElement)(e);
        });
    }
}

function createListenerSlide(carouselElement) {
    return function (e) {
        // 클릭 이벤트가 발생했을 때 호출
        var clickedButton = e.currentTarget;

        // 값 가져오기
        var liElements = carouselElement.querySelectorAll('li');
        var liCount = liElements.length;
        var currentIndex = parseInt(carouselElement.getAttribute('data'), 10);

        // 슬라이드 버튼 체크
        if (clickedButton.className.includes('right') && currentIndex < liCount - 1) {
            currentIndex++;
            scrollDiv(carouselElement, currentIndex);
        } else if (clickedButton.className.includes('left') && currentIndex > 0) {
            currentIndex--;
            scrollDiv(carouselElement, currentIndex);
        }

        // 인디케이터 업데이트
        updateIndicator(carouselElement, currentIndex);

        // 슬라이드 버튼 보여줌 여부 업데이트
        updateSlideButtonVisible(carouselElement, currentIndex, liCount);

        // 새롭게 보여지는 이미지 인덱스 값을 현재 data 값으로 업데이트
        carouselElement.setAttribute('data', currentIndex);
    };
}

function scrollDiv(carouselElement, nextIndex) {
    var scrollable = carouselElement.querySelector('div');
    var liWidth = scrollable.clientWidth;
    var newLeft = liWidth * nextIndex;

    scrollable.scrollTo({ left: newLeft, behavior: 'smooth' });
}

function updateIndicator(carouselElement, currentIndex) {
    var indicators = carouselElement.querySelectorAll('footer > div');
    for (var i = 0; i < indicators.length; i++) {
        if (currentIndex === i) {
            indicators[i].classList.add('active');
        } else {
            indicators[i].classList.remove('active');
        }
    }
}

function updateSlideButtonVisible(carouselElement, currentIndex, liCount) {
    var left = carouselElement.querySelector('.slide-left');
    var right = carouselElement.querySelector('.slide-right');

    if (currentIndex > 0) {
        left.style.display = 'block';
    } else {
        left.style.display = 'none';
    }

    if (currentIndex < liCount - 1) {
        right.style.display = 'block';
    } else {
        right.style.display = 'none';
    }
}
