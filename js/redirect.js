const $main = document.querySelector("main");
let targetCode; //결제한 제품의 결제코드

// 구매한 제품의 결제코드를 변수에 저장한 뒤, 배열에서 삭제 후 업데이트 한다.
function updateStock() {
    temp = location.href.split("?")[1];
    productType = temp.split("=")[1];

    if (productType === "type1") {
        arr = JSON.parse(sessionStorage.getItem("maskCode1"));
        targetCode = arr.pop();
        sessionStorage.setItem("maskCode1", JSON.stringify(arr));
    } else {
        arr = JSON.parse(sessionStorage.getItem("maskCode2"));
        targetCode = arr.pop();
        sessionStorage.setItem("maskCode2", JSON.stringify(arr));
    }
}

// 로딩 애니메이션을 보여준 뒤 구매한 제품의 결제코드를 렌더링 한다.
function renderAfterPage() {
    setTimeout(() => {
        $main.innerHTML = 
            `<div class="code-wrapper">
            <p>결제코드는</p>
            <div class="code-box"><span class="code">${targetCode}</span></div>
            <p>입니다.</p>
            </div>
            <div class="btn-wrapper">    
            <button class="btn" onclick="onClickBtn()">홈으로 돌아가기</button>
            </div>
            `;
        console.log("time out");
    }, 3000);    
}

// 홈 페이지로 이동하는 버튼 이벤트
function onClickBtn() {
    location.href = "index.html";
}

function init() {
    updateStock();
    renderAfterPage();
}

init();