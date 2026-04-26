const reasonInput = document.getElementById("reason");
const charCount = document.getElementById("charCount");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");
const couponBtn = document.getElementById("couponBtn");
const couponMessage = document.getElementById("couponMessage");
const applyCount = document.getElementById("applyCount");
const tabApply = document.getElementById("tabApply");
const tabCancel = document.getElementById("tabCancel");
const applyPanel = document.getElementById("applyPanel");
const cancelPanel = document.getElementById("cancelPanel");
const submittedReason = document.getElementById("submittedReason");
const cancelApplyBtn = document.getElementById("cancelApplyBtn");
const cancelMessage = document.getElementById("cancelMessage");

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;

let isCouponIssued = false;
let isApplied = false;

// 글자 수 / 버튼 상태
function updateFormState() {
  const trimmedLength = reasonInput.value.trim().length;

  charCount.textContent = `${trimmedLength} / ${MAX_LENGTH}`;

  if (trimmedLength >= MIN_LENGTH && trimmedLength <= MAX_LENGTH) {
    submitBtn.disabled = false;
    submitBtn.textContent = "체험단 신청하기";
  } else {
    submitBtn.disabled = true;
    const remain = Math.max(MIN_LENGTH - trimmedLength, 0);
    submitBtn.textContent = `${remain}자 더 입력 시 신청 가능`;
  }
}

reasonInput.addEventListener("input", updateFormState);

// 체험단 신청
submitBtn.addEventListener("click", () => {
  const trimmedValue = reasonInput.value.trim();
  const trimmedLength = trimmedValue.length;

  formMessage.classList.remove("hidden", "success", "error");

  if (trimmedLength < MIN_LENGTH || trimmedLength > MAX_LENGTH) {
    formMessage.classList.add("error");
    formMessage.textContent = `신청 이유는 공백 제외 ${MIN_LENGTH}자 이상 ${MAX_LENGTH}자 이하로 입력해주세요.`;
    return;
  }

  if (isApplied) {
    formMessage.classList.add("error");
    formMessage.textContent = "이미 신청이 완료된 상태입니다.";
    return;
  }

  isApplied = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "신청 완료";

  // 신청 내용 저장
  submittedReason.textContent = trimmedValue;

  // applyCount 증가
  applyCount.textContent = Number(applyCount.textContent) + 1;

  formMessage.classList.add("success");
  formMessage.textContent = "체험단 신청이 정상적으로 접수되었습니다.";
});

//  탭 전환 
tabApply.addEventListener("click", () => {
  tabApply.classList.add("active");
  tabCancel.classList.remove("active");
  applyPanel.classList.remove("hidden");
  cancelPanel.classList.add("hidden");
});

tabCancel.addEventListener("click", () => {
  tabCancel.classList.add("active");
  tabApply.classList.remove("active");
  cancelPanel.classList.remove("hidden");
  applyPanel.classList.add("hidden");

  // 신청 전 안내 메시지
  if (!isApplied) {
    submittedReason.textContent = "";
    cancelApplyBtn.disabled = true;
    cancelMessage.classList.remove("hidden", "success", "error");
    cancelMessage.classList.add("info");
    cancelMessage.textContent = "아직 신청된 내역이 없습니다.";
  } else {
    cancelApplyBtn.disabled = false;
    cancelMessage.classList.add("hidden");
    cancelMessage.classList.remove("success", "error", "info");
  }
});

  // 신청 취소 
cancelApplyBtn.addEventListener("click", () => {
  cancelMessage.classList.remove("hidden", "success", "error", "info");

  isApplied = false;

  // applyCount 감소
  applyCount.textContent = Math.max(Number(applyCount.textContent) - 1, 0);

  // 신청 폼 초기화
  reasonInput.value = "";
  submittedReason.textContent = "";
  submitBtn.disabled = true;
  submitBtn.textContent = `${MIN_LENGTH}자 더 입력 시 신청 가능`;
  formMessage.classList.add("hidden");
  formMessage.classList.remove("success", "error");
  charCount.textContent = `0 / ${MAX_LENGTH}`;

  cancelApplyBtn.disabled = true;
  cancelMessage.classList.add("success");
  cancelMessage.textContent = "신청이 취소되었습니다.";
});

// 쿠폰 발급
couponBtn.addEventListener("click", () => {
  couponMessage.classList.remove("hidden", "info", "error");

  if (isCouponIssued) {
    couponMessage.classList.add("error");
    couponMessage.textContent = "이미 발급된 쿠폰입니다.";
    return;
  }

  isCouponIssued = true;
  couponBtn.disabled = true;
  couponBtn.textContent = "발급 완료";

  couponMessage.classList.add("info");
  couponMessage.textContent = "10% 할인 쿠폰이 발급되었습니다.";
});

updateFormState();
