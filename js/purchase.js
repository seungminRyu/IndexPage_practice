const $productName = document.querySelector(".name");
const $productType = document.querySelector(".type");
const $productImg = document.querySelectorAll(".img");
const $modal = document.querySelector(".modal");
const $btn = document.querySelector(".btn");

// 카카오페이 결제 api, 카카오 페이로 결제요청을 보낸다.
function requestPay() {
    const REDIRECT_URL = "https://seungminryu.github.io/SmartMaskVender/redirect";
    var IMP = window.IMP;
    IMP.init('imp85600338');
    IMP.request_pay({
        pg : 'kakaopay',
        pay_method : 'vbank',
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : '주문명:결제테스트',
        amount : 1000,
        buyer_email : 'iamport@siot.do',
        buyer_name : '구매자이름',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456',
    }, function(rsp) {
        if ( rsp.success ) {
            var msg = '결제가 완료되었습니다.';
            msg += '고유ID : ' + rsp.imp_uid;
            msg += '상점 거래ID : ' + rsp.merchant_uid;
            msg += '결제 금액 : ' + rsp.paid_amount;
            msg += '카드 승인번호 : ' + rsp.apply_num;
        } else {
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
        }
        
        alert(msg);
        window.location.href = REDIRECT_URL + `?type=${productType}`; // 결제코드 제공 페이지로 이동
    });
}

// 제품선택에서 선택한 제품정보를 렌더링한다.
function renderMaskInfo() {
    temp = location.href.split("?")[1];
    productType = temp.split("=")[1];

    if (productType === "type1") {
        $productType.innerHTML = "제품 1";
        $productName.innerHTML = "황사마스크<br>KF80 [대형]";
        $productImg[0].src = "img/kf80.png";
        $productImg[1].src = "img/kf80.png";
    } else {
        $productType.innerHTML = "제품 2";
        $productName.innerHTML = "황사마스크<br>KF94 [대형]";
        $productImg[0].src = "img/kf94.png";
        $productImg[1].src = "img/kf94.png";
    }
}

// 요소들의 이벤트 셋팅한다.
function setElementEvent() {
    // 모달의 활성화 및 비활성화 이벤트
    $productImg[0].addEventListener("click", () => {
        $modal.classList.toggle("modal-active");
    });
    $modal.addEventListener("click", () => {
        $modal.classList.toggle("modal-active");
    });

    // 결제하기 버튼을 누를 경우 Api 호출 이벤트
    $btn.addEventListener("click", () => {
        requestPay();
    });
}

function init() {
    renderMaskInfo();
    setElementEvent();
}

init();