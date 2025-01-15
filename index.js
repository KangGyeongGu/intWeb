// 맨 위로 이동 버튼
let moveToTop = function () {
  document.body.scrollIntoView({ behavior: "smooth" });
};

// 타이핑 효과
const $txt = document.querySelector(".txt-title");
const content = "안녕하세요 :)\n13기 4반 강경구입니다.";
let contentIndex = 0;

let typing = function () {
  $txt.innerHTML += content[contentIndex];
  contentIndex++;
  if (content[contentIndex] === "\n") {
    $txt.innerHTML += "<br />";
    contentIndex++;
  }
  if (contentIndex > content.length) {
    $txt.textContent = "";
    contentIndex = 0;
  }
};

setInterval(typing, 200);

// 이미지 슬라이드
let imgIndex = 0;
let position = 0;
const IMG_WIDTH = 438;
const $btnPrev = document.querySelector(".btn-prev");
const $btnNext = document.querySelector(".btn-next");
const $slideImgs = document.querySelector(".slide-images");

let prev = function () {
  if (imgIndex > 0) {
    $btnNext.removeAttribute("disabled");
    position += IMG_WIDTH;
    $slideImgs.style.transform = `translateX(${position}px)`;
    imgIndex = imgIndex - 1;
  }
  if (imgIndex == 0) {
    $btnPrev.setAttribute("disabled", "true");
  }
};

let next = function () {
  if (imgIndex < 5) {
    $btnPrev.removeAttribute("disabled");
    position -= IMG_WIDTH;
    $slideImgs.style.transform = `translateX(${position}px)`;
    $slideImgs.style.transition = "transform .5s ease-out";
    imgIndex = imgIndex + 1;
  }
  if (imgIndex == 4) {
    $btnNext.setAttribute("disabled", "true");
  }
};

let init = function () {
  $btnPrev.setAttribute("disabled", "true");
  $btnPrev.addEventListener("click", prev);
  $btnNext.addEventListener("click", next);
};

init();

// 모달
const $modalBg = document.getElementsByClassName("modal-background");
const $btnOpen = document.getElementsByClassName("btn-open");
const $btnClose = document.getElementsByClassName("btn-close");

function modal(num) {
  $btnOpen[num].addEventListener("click", () => {
    $modalBg[num].style.display = "flex";
    document.body.style.overflow = "hidden";
  });
  $btnClose[num].addEventListener("click", () => {
    $modalBg[num].style.display = "none";
    document.body.style.overflow = "unset";
  });
}

for (let i = 0; i < $btnOpen.length; i++) {
  modal(i);
}

// 스크롤바
let scrollTop = 0;
let bar = document.getElementsByClassName("bar-ing")[0];

window.addEventListener(
  "scroll",
  () => {
    scrollTop = document.documentElement.scrollTop;
    let per = Math.ceil(
      (scrollTop / (document.body.scrollHeight - window.outerHeight)) * 100
    );
    bar.style.width = per + "%";
  },
  false
);

//Chat-GPT responser
document.getElementById('chatgptButton').addEventListener('click', async () => {
  const chatgptResponse = document.getElementById('chatgptResponse');
  chatgptResponse.innerHTML = '<p>Loading...</p>';
  
  const apiKey = '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'; // OpenAI API 키
  const prompt = '한국에서 최근 유행하는 트렌트를 한 가지 소개해줘.';


  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.choices && data.choices.length > 0) {
      chatgptResponse.innerHTML = `<p>${data.choices[0].text.trim()}</p>`;
    } else {
      throw new Error('API returned an empty or unexpected response format.');
    }
  } catch (error) {
    console.error(error);
    chatgptResponse.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
