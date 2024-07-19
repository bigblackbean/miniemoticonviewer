document.addEventListener("DOMContentLoaded", () => {
  const viewerButton = document.querySelector("#viewerButton"); // 뷰어 창 띄우기 버튼
  const chatArea = document.querySelector("#chatArea"); // 채팅이 입력되는 영역
  const chatImageWrap = document.querySelector("#chatImageWrap"); // 채팅영역에 들어가기 전 이미지
  const imageUploadButton = document.querySelector("#imageUploadButton"); // 이미지 업로드 버튼
  const imageUploadLabel = document.querySelector("#imageUploadLabel"); // 이미지 업로드 버튼
  const pullButton = document.querySelector("#pullButton"); // 이미지 받기 버튼
  const sendButton = document.querySelector("#sendButton"); // 이미지 보내기 버튼

  let imoticonGroup = [];

  if (viewerButton) {
    viewerButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("./viewer.html", "_blank", "width=380, height=700");
    });
  }

  const readImageFile = (files) => {
    for (let i = 0; i < files.length; i += 1) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);

      reader.onload = (event) => {
        const img = document.createElement("img");
        imoticonGroup[i] = event.target.result;
        img.setAttribute("src", event.target.result);
        img.setAttribute("class", "emoticon-image");
        chatImageWrap.appendChild(img);
      };
    }
  };

  if (imageUploadButton) {
    imageUploadButton.addEventListener("change", (e) => {
      console.log("[e]", e.target.files);
      readImageFile(e.target.files);
    });
  }
  if (imageUploadLabel) {
    imageUploadLabel.addEventListener("dragover", (e) => {
      e.preventDefault();
      imageUploadLabel.classList.add("drag-over");
    });
    imageUploadLabel.addEventListener("drop", (e) => {
      e.preventDefault();
      readImageFile(e.dataTransfer.files);
      imageUploadLabel.classList.remove("drag-over");
    });
  }

  const putMessage = (main) => {
    if (chatImageWrap.childNodes.length > 0) {
      const wrap = document.createElement("div");
      wrap.setAttribute("class", `${main}-message-wrap message-wrap`);
      if (chatImageWrap.childNodes.length === 1) {
        wrap.classList.add("solo");
      }
      const message = document.createElement("div");
      message.setAttribute("class", `${main}-message`);
      imoticonGroup.forEach((imgUrl) => {
        const img = document.createElement("img");
        img.setAttribute("src", imgUrl);
        img.setAttribute("class", "emoticon");
        message.appendChild(img);
      });
      wrap.appendChild(message);
      chatArea.appendChild(wrap);
      while (chatImageWrap.firstChild) {
        chatImageWrap.removeChild(chatImageWrap.firstChild);
      }
      imoticonGroup = [];
    }
  };

  if (pullButton) {
    pullButton.addEventListener("click", () => {
      putMessage("pull");
    });
  }

  if (sendButton) {
    sendButton.addEventListener("click", () => {
      putMessage("send");
    });
  }
});
