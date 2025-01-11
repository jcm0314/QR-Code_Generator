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

  // QR 코드 생성
  const qrCode = new QRCode(qrCodeDiv, {
    text: inputValue, // QR 코드에 포함될 데이터
    width: 200, // QR 코드 너비
    height: 200, // QR 코드 높이
  });

  // 다운로드 버튼 활성화
  downloadBtn.style.display = "block";

  // QR 코드 생성 후 다운로드 기능 추가
  setTimeout(() => {
    const qrCanvas = qrCodeDiv.querySelector("canvas"); // 생성된 QR 코드의 Canvas 가져오기
    const qrImage = qrCanvas.toDataURL("image/png");   // Canvas를 PNG 이미지로 변환

    // 다운로드 버튼에 이미지 연결
    downloadBtn.href = qrImage;
    downloadBtn.download = "qr-code.png"; // 다운로드 파일명 설정
  }, 100); // QR 코드 생성 후 약간의 지연 시간 추가
}

// 이벤트 리스너 추가
generateBtn.addEventListener("click", generateQRCode); // "QR 코드 생성" 버튼 클릭 시 동작

