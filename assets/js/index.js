'use strict';

const searchForm = document.querySelector('.search-form');
if (searchForm) {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-btn');

    function sendData() {
        if (searchInput.value !== '') {
            searchForm.submit();
        }
    }

    searchForm.onsubmit = function(e) {
        e.preventDefault();
    }

    searchInput.addEventListener('keydown', function(key) {
        if (key.keyCode === 13) {
            sendData();
        }
    });

    searchButton.addEventListener('click', function(){
        sendData();
    });
}


