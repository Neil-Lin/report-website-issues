'use strict';
const getCurrentBrowser = navigator.userAgent;
const getCurrentPath = window.location.href;
var currentBrowserDom = document.getElementById("user-agent");
var currentPathDom = document.getElementById("current-path");
currentBrowserDom.value = getCurrentBrowser;
var tempUrl = ''

// 監聽 popup 頁面載入完成事件
document.addEventListener("DOMContentLoaded", function() {
  // 取得當前活動頁籤的資訊
  chrome.tabs.query(
    { 
      active: true,
      currentWindow: true 
    }, function(tabs) {
      // 提取目前頁籤的 URL
      currentPathDom.value = tabs[0].url;
      tempUrl = tabs[0].url;
    }
  );
});

// 如果選取其他，就打開 input
const checkboxOther = document.getElementById("checkbox-13");
const otherInput = document.getElementById("others");

checkboxOther.addEventListener("change", function() {
  if (checkboxOther.checked) {
    otherInput.style.display = "block";
    otherInput.setAttribute("required", "true");
    const checkOthersInput = document.querySelector('.checkbox-others');
    setTimeout(() => {
      checkOthersInput.focus();
    },100);
  } else {
    otherInput.style.display = "none";
    otherInput.removeAttribute("required");
  }
});

const form = document.getElementById('reply-gform');
const resetButton = document.querySelector('.send-reset-btn');
const errorMessage = document.querySelector('.message--error');
const successMessage = document.querySelector('.message--success');

form.addEventListener('submit', function(event) {
  const checkboxes = document.querySelectorAll('[type="checkbox"]:checked');
  if (checkboxes.length === 0) {
    event.preventDefault();
    errorMessage.textContent = '請至少選擇一個問題項目。 Please select at least one issue item.';
    successMessage.textContent = '';
  } else {
    successMessage.textContent = '表單發送成功，感謝您的回報！ Form submitted successfully. Thank you for your feedback!';
    errorMessage.textContent = '';
    setTimeout(() => {
      form.reset();
      otherInput.style.display = "none";
      otherInput.removeAttribute("required");
      currentBrowserDom.value = getCurrentBrowser;
      currentPathDom.value =  tempUrl;
    }, 200);
  }
});

// 重新填寫按鈕被點擊時觸發的事件處理函式
resetButton.addEventListener('click', function() {
  form.reset(); // 清空輸入欄位的值
  errorMessage.textContent = ''; // 清空錯誤訊息
  successMessage.textContent = '';
  const firstCheckbox = document.querySelector('input[type="checkbox"]');
  if (firstCheckbox) {
    firstCheckbox.focus(); // 將焦點聚焦到第一個 checkbox
  }
  otherInput.style.display = "none";
  otherInput.removeAttribute("required");
  setTimeout(() => {
    currentBrowserDom.value = getCurrentBrowser;
    currentPathDom.value =  tempUrl;
  }, 200);
});
