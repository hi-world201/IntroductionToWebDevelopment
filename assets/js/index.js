'use strict';

/* Chức năng tìm kiếm dữ liệu */
const searchForm = document.querySelector('.search-form');

if (searchForm) {
    const searchInput = searchForm.querySelector('.search-form__input');
    const searchButton = searchForm.querySelector('.search-form__btn');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    searchInput.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            sendData();
        }
    });

    searchButton.addEventListener('click', sendData);

    function sendData() {
        if (searchInput.value.length !== 0)
            searchForm.submit();
    }

}

/* Xác thực form */

function minLength(value, length) {
    return value.length >= length;
}

function isEmail(input, errorMessage) {
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailReg.test(input.value) === true) {
        return true;
    }
    alert(errorMessage || 'Emal không hợp lệ');
    return false;
}

function isPassword(input, errorMessage) {
    if (minLength(input.value, 8)) {
        return true;
    }
    alert(errorMessage || 'Mật khẩu ít nhất 8 kí tự');
    return false;
}

function isConfirmedPassword(input, password, errorMessage) {
    if (input.value === password)
        return true;
    alert(errorMessage || 'Nhập lại mật khẩu không chính xác');
    return false;
}

function isFullName(input, errorMessage) {
    if (minLength(input.value, 4))
        return true;
    alert(errorMessage || 'Họ tên ít nhất 4 kí tự');
    return false;
}

function isContactInformation(input, errorMessage) {
    if (minLength(input.value, 10))
        return true;
    alert(errorMessage || 'Nội dung liên hệ ít nhất 10 kí tự');
    return false;
}


const registerForm = document.querySelector('.register-form');

if (registerForm) {
    const emailInput = registerForm.querySelector('#email');
    const passwordInput = registerForm.querySelector('#password1');
    const confirmedPasswordInput = registerForm.querySelector('#password2');
    const submitButton = registerForm.querySelector('input[type="submit"]');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    submitButton.addEventListener('click', sendData);

    function sendData() {
        if (isEmail(emailInput) && isPassword(passwordInput) && isConfirmedPassword(confirmedPasswordInput, passwordInput.value))
            registerForm.submit();
    }
}

const loginForm = document.querySelector('.login-form');

if (loginForm) {
    const emailInput = loginForm.querySelector('#email');
    const passwordInput = loginForm.querySelector('#password');
    const submitButton = loginForm.querySelector('input[type="submit"]');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    submitButton.addEventListener('click', sendData);

    function sendData() {
        if (isEmail(emailInput) && isPassword(passwordInput))
            loginForm.submit();
    }
}

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const contentInput = contactForm.querySelector('#content');
    const submitButton = contactForm.querySelector('input[type="submit"');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    submitButton.addEventListener('click', sendData);

    function sendData() {
        if (isFullName(nameInput) && isEmail(emailInput) && isContactInformation(contentInput))
            contactForm.submit();
    }
}

/* Thêm sản phẩm vào giỏ hàng */

var itemList = {
    "sp001": {
        "name": "Sữa Chua Vị Kiwi",
        "price": 21000,
        "photo": "images/sanpham/kiwi.jpg"
    },
    "sp002": {
        "name": "Sữa Chua Vị Xoài",
        "price": 22000,
        "photo": "images/sanpham/mango.jpg"
    },
    "sp003": {
        "name": "Sữa Chua Vị Dưa lưới",
        "price": 23000,
        "photo": "images/sanpham/cantaloupe.jpg"
    },
    "sp004": {
        "name": "Sữa Chua Vị Mâm Xôi",
        "price": 24000,
        "photo": "images/sanpham/blackberry.jpg"
    },
    "sp005": {
        "name": "Sữa Chua Vị Dâu Tây",
        "price": 25000,
        "photo": "images/sanpham/strawberry.jpg"
    },
    "sp006": {
        "name": "Sữa Chua Vị Việt Quất",
        "price": 26000,
        "photo": "images/sanpham/blueberry.jpg"
    },
    "sp007": {
        "name": "Sữa Chua Vị Bưởi",
        "price": 27000,
        "photo": "images/sanpham/grapes.jpg"
    },
    "sp008": {
        "name": "Sữa Chua Vị Táo Xanh",
        "price": 28000,
        "photo": "images/sanpham/green-apple.jpg"
    },
    "sp009": {
        "name": "Sữa Chua Vị Dứa",
        "price": 29000,
        "photo": "images/sanpham/pineapple.jpg"
    }
};

function addCart(code) {
    let productItem = document.querySelector('.item-' + code);
    let inputNumber = productItem.querySelector('input[type="number"');

    if (typeof localStorage[code] === 'undefined' && inputNumber.value !== '0') {
        localStorage.setItem(code, inputNumber.value);
    } else {
        let sum = parseInt(localStorage[code]) + parseInt(inputNumber.value);
        localStorage[code] = Math.min(sum, 100);
    }
}

/* Đơn hàng */
document.querySelector('.cart-btn').addEventListener('click', function () {
    window.location.href = 'donhang.html';
});

const tbody = document.querySelector('.order-details tbody');

function currencyFormat(value) {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

function renderProductItem(root, item, orderNumber, code) {
    let row = document.createElement('tr');
    row.innerHTML =
        `<tr>
            <td>
                <img class="round-figure" width="100px" src="./assets/${item.photo}" alt="">
            </td>
            <td>${item.name}</td>
            <td class="text-right">${orderNumber}</td>
            <td class="text-right">${currencyFormat(item.price)}</td>
            <td class="text-right">${currencyFormat(item.price * orderNumber)}</td>
            <td class="text-center"><i class="fa-solid fa-trash-can remove-btn"></i></td>
        </tr>`;
    row.querySelector('.remove-btn').addEventListener('click', function (event) {
        console.log(code);
        if (typeof localStorage[code] !== 'undefined') {
            localStorage.removeItem(code);
            root.innerHTML = '';
            showCart();
        }
    });
    root.appendChild(row);
}

function showCart() {
    let totalPretax = 0;

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            let item = itemList[key];
            let orderNumber = parseInt(localStorage[key]);
            renderProductItem(tbody, item, orderNumber, key);

            totalPretax += orderNumber * item['price'];
        }
    }

    function getDiscountRate() {
        let d = new Date();
        let weekday = d.getDay();
        let totalMins = d.getHours() * 60 + d.getMinutes();

        if (weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660) || (totalMins >= 780 && totalMins <= 1020)))
            return 0.1;
        return 0;
    }

    const totalPretaxElement = document.querySelector('#total-pretax');
    const discountRateElement = document.querySelector('#discount-rate');
    const discountElement = document.querySelector('#discount');
    const taxElement = document.querySelector('#tax');
    const totalElement = document.querySelector('#total');
    let discountRate = getDiscountRate();
    let discount = totalPretax * discountRate;
    let tax = (totalPretax - discount) * 0.1;

    totalPretaxElement.textContent = currencyFormat(totalPretax);
    discountRateElement.textContent = currencyFormat(discountRate);
    discountElement.textContent = currencyFormat(discount);
    taxElement.textContent = currencyFormat(tax);
    totalElement.textContent = currencyFormat(totalPretax - discount + tax);
}


if (tbody) {
    window.addEventListener('load', showCart);
}
window.addEventListener('storage', showCart);