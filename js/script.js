const idiomData = [
  {
      "derivation": "语出《法华经·法师功德品》下至阿鼻地狱。”",
      "example": "但也有少数意志薄弱的……逐步上当，终至堕入～。★《上饶集中营·炼狱杂记》",
      "explanation": "阿鼻梵语的译音，意译为无间”，即痛苦无有间断之意。常用来比喻黑暗的社会和严酷的牢狱。又比喻无法摆脱的极其痛苦的境地。",
      "pinyin": "ā bí dì yù",
      "word": "阿鼻地狱",
      "abbreviation": "abdy"
  }
  // ...其他数据
];

const fetchWordButton = document.getElementById('fetchWord');
const wordDisplay = document.getElementById('word');
const derivationDisplay = document.getElementById('derivation');
const exampleDisplay = document.getElementById('example');
const explanationDisplay = document.getElementById('explanation');
const translationDisplay = document.getElementById('translation');

fetchWordButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * idiomData.length);
  const idiom = idiomData[randomIndex];
  wordDisplay.textContent = idiom.word;
  derivationDisplay.textContent = idiom.derivation;
  exampleDisplay.textContent = idiom.example;
  explanationDisplay.textContent = idiom.explanation;

  // 使用百度翻译API
  const appid = '20200211000382774';
  const salt = '54567';
  const key = 'b1imCNk_EdXIHM0zX2bD';
  const query = idiom.word;
  const sign = md5(appid + query + salt + key);

  fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate?q=${query}&from=zh&to=en&appid=${appid}&salt=${salt}&sign=${sign}`)
      .then(response => response.json())
      .then(data => {
          const translation = data.trans_result[0].dst;
          translationDisplay.textContent = translation;
      })
      .catch(error => {
          console.error('Error fetching translation:', error);
          translationDisplay.textContent = '翻译失败';
      });
});
