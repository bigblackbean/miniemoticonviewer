document.addEventListener("DOMContentLoaded", () => {
  const viewerButton = document.querySelector("#viewerButton"); // 뷰어 창 띄우기 버튼
  const chatArea = document.querySelector("#chatArea"); // 채팅이 입력되는 영역
  const chatImageWrap = document.querySelector("#chatImageWrap"); // 채팅영역에 들어가기 전 이미지
  const imageUploader = document.querySelector("#imageUploadButton"); // 이미지 업로드 버튼
  const pullButton = document.querySelector("#pullButton"); // 이미지 받기 버튼
  const sendButton = document.querySelector("#sendButton"); // 이미지 보내기 버튼

  const imoticonGroup = [];

  if (viewerButton) {
    viewerButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("./viewer.html", "_blank", "width=380, height=700");
    });
  }

  if (imageUploader) {
    imageUploader.addEventListener("change", (e) => {
      console.log("[reader]", e.target.files);
      for (let i = 0; i < e.target.files.length; i += 1) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);

        reader.onload = (event) => {
          console.log(event);
          const img = document.createElement("img");
          imoticonGroup[i] = event.target.result;
          img.setAttribute("src", event.target.result);
          img.setAttribute("class", "emoticon-image");
          chatImageWrap.appendChild(img);
        };
      }
    });
  }
  pullButton.addEventListener("click", () => {
    const wrap = document.createElement("div");
    wrap.setAttribute("class", "pull-message-wrap");
    const message = document.createElement("div");
    message.setAttribute("class", "pull-message");
    imoticonGroup.forEach((imgUrl) => {
      const img = document.createElement("img");
      img.setAttribute("src", imgUrl);
      img.setAttribute("class", "emoticon");
      message.appendChild(img);
    });
    wrap.appendChild(message);
    chatArea.appendChild(wrap);
    chatImageWrap.childNodes.remove();
  });

  sendButton.addEventListener("click", () => {
    const wrap = document.createElement("div");
    wrap.setAttribute("class", "send-message-wrap");
    const message = document.createElement("div");
    message.setAttribute("class", "send-message");
    imoticonGroup.forEach((imgUrl) => {
      const img = document.createElement("img");
      img.setAttribute("src", imgUrl);
      img.setAttribute("class", "emoticon");
      message.appendChild(img);
    });
    wrap.appendChild(message);
    chatArea.appendChild(wrap);
  });
  console.log("[imoticonGroup]", imoticonGroup);
});
