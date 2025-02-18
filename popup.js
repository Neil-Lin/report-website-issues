'use strict';

document.addEventListener("DOMContentLoaded", function() {
  const getCurrentBrowser = navigator.userAgent;
  let tempUrl = window.location.href;
  
  const currentBrowserDom = document.getElementById("user-agent");
  const currentPathDom = document.getElementById("current-path");
  if (currentBrowserDom) {
    currentBrowserDom.value = getCurrentBrowser;
  }
  if (currentPathDom) {
    currentPathDom.value = tempUrl;
  }

  // 取得當前活動頁籤的資訊
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length && tabs[0].url) {
      tempUrl = tabs[0].url;
      if (currentPathDom) {
        currentPathDom.value = tempUrl;
      }
    }
  });

  // 如果選取其他，就打開 input
  const checkboxOther = document.getElementById("checkbox-13");
  const otherInput = document.getElementById("others");
  if (checkboxOther && otherInput) {
    checkboxOther.addEventListener("change", function() {
      if (checkboxOther.checked) {
        otherInput.style.display = "block";
        otherInput.setAttribute("required", "true");
        const checkOthersInput = document.querySelector('.checkbox-others');
        if (checkOthersInput) {
          setTimeout(() => {
            checkOthersInput.focus();
          }, 100);
        }
      } else {
        otherInput.style.display = "none";
        otherInput.removeAttribute("required");
      }
    });
  }
  
  const form = document.getElementById('reply-gform');
  const resetButton = document.querySelector('.send-reset-btn');
  const errorMessage = document.querySelector('.message--error');
  const successMessage = document.querySelector('.message--success');

  // 表單提交時驗證至少選擇一項
  if (form) {
    form.addEventListener('submit', function(event) {
      const checkboxes = document.querySelectorAll('[type="checkbox"]:checked');
      if (checkboxes.length === 0) {
        event.preventDefault();
        if (errorMessage) {
          errorMessage.textContent = '請至少選擇一個問題項目。 Please select at least one issue item.';
        }
        if (successMessage) {
          successMessage.textContent = '';
        }
      } else {
        if (successMessage) {
          successMessage.textContent = '表單發送成功，感謝您的回報！ Form submitted successfully. Thank you for your feedback!';
        }
        if (errorMessage) {
          errorMessage.textContent = '';
        }
        setTimeout(() => {
          form.reset();
          if (otherInput) {
            otherInput.style.display = "none";
            otherInput.removeAttribute("required");
          }
          if (currentBrowserDom) {
            currentBrowserDom.value = getCurrentBrowser;
          }
          if (currentPathDom) {
            currentPathDom.value = tempUrl;
          }
        }, 200);
      }
    });
  }
  
  // 重新填寫按鈕事件處理
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      form.reset();
      if (errorMessage) errorMessage.textContent = '';
      if (successMessage) successMessage.textContent = '';
      const firstCheckbox = document.querySelector('input[type="checkbox"]');
      if (firstCheckbox) {
        firstCheckbox.focus();
      }
      if (otherInput) {
        otherInput.style.display = "none";
        otherInput.removeAttribute("required");
      }
      setTimeout(() => {
        if (currentBrowserDom) {
          currentBrowserDom.value = getCurrentBrowser;
        }
        if (currentPathDom) {
          currentPathDom.value = tempUrl;
        }
      }, 200);
    });
  }
});
