// 세션스토리지로 부터 마스크의 품절여부를 체크하고 품절된 제품은 비활성화한다.
function checkSoldOut() {
    const $soldOutBoxs = document.querySelectorAll(".soldOut-box");
    
    const maskStock1 = JSON.parse(sessionStorage.getItem("maskCode1")).length;
    const maskStock2 = JSON.parse(sessionStorage.getItem("maskCode2")).length;

    if (maskStock1 < 4) {
        $soldOutBoxs[0].classList.add("soldOut-active");
    }
    if (maskStock2 < 4) {
        $soldOutBoxs[1].classList.add("soldOut-active");
    }
}

// 세션스토리지에 마스크 결제코드를 셋팅한다.
function setMaskStock() {
    sessionStorage.setItem("maskCode1", JSON.stringify(["0000", "0000", "0000", 4444, 2222]));
    sessionStorage.setItem("maskCode2", JSON.stringify(["0000", "0000", "0000", 9999, 3333]));
}

// 제품박스 클릭 시 제품 자세히보기로 이동하는 이벤트
function onClickBox(id) {
    typeValue = id;
    location.href = `productDetail.html?type=${typeValue}`;
}

function init() {
    // 세션스토리지에 결제코드 없을경우 결제코드 셋팅
    if (null === sessionStorage.getItem("maskCode1") 
        && null === sessionStorage.getItem("maskCode2")) {
        setMaskStock();
    }
    checkSoldOut();
}

init();