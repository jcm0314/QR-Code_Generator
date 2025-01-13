// 주요 요소 가져오기
const qrInput = document.getElementById("qrInput"); // 입력 필드
const generateBtn = document.getElementById("generateBtn"); // 생성 버튼
const qrCodeDiv = document.getElementById("qrCode"); // QR 코드 출력 영역
const downloadBtn = document.getElementById("downloadBtn"); // 다운로드 버튼

// QR 코드 생성 함수
function generateQRCode() {
  const inputValue = qrInput.value.trim(); // 입력값 가져오기 및 공백 제거

  // 입력값 검증
  if (!inputValue) {
    alert("텍스트 또는 URL을 입력해주세요."); // 입력값 없을 시 경고
    return;
  }

  // 기존 QR 코드 초기화
  qrCodeDiv.innerHTML = "";
  downloadBtn.style.display = "none"; // 초기화 시 다운로드 버튼 숨기기

  // QR 코드 생성
  const qrCode = new QRCode(qrCodeDiv, {
    text: inputValue, // QR 코드에 포함될 데이터
    width: 200, // QR 코드 너비
    height: 200, // QR 코드 높이
    correctLevel: QRCode.CorrectLevel.H,
  });

  // 다운로드 버튼 활성화
  setTimeout(() => {
    downloadBtn.style.display = "inline-block"; // 다운로드 버튼 표시
  }, 100);
}

// QR 코드 다운로드 함수
function downloadQRCode() {
  const qrCanvas = qrCodeDiv.querySelector("canvas");
  if (qrCanvas) {
    qrCanvas.toBlob((blob) => {
      if (blob) {
        const qrImageURL = URL.createObjectURL(blob); // Blob URL 생성
        console.log("QR Image Blob URL: ", qrImageURL); // 디버그 로그

        // 다운로드 링크 생성 및 클릭 실행
        const link = document.createElement("a");
        link.href = qrImageURL;
        link.download = "qr-code.png"; // 다운로드 파일명 설정
        document.body.appendChild(link);
        link.click(); // 다운로드 강제 실행
        document.body.removeChild(link);
        URL.revokeObjectURL(qrImageURL); // 메모리 해제
      } else {
        alert("QR 코드를 Blob으로 변환하지 못했습니다.");
      }
    }, "image/png");
  } else {
    alert("QR 코드를 생성하지 못했습니다.");
  }
}

// 이벤트 리스너 추가
generateBtn.addEventListener("click", generateQRCode); // "QR 코드 생성" 버튼 클릭 시 동작
downloadBtn.addEventListener("click", downloadQRCode); // 다운로드 버튼 클릭 시 동작
