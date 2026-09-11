// スライダーと表示用要素の取得
const sliderC = document.getElementById('slider-c');
const sliderM = document.getElementById('slider-m');
const sliderY = document.getElementById('slider-y');
const sliderK = document.getElementById('slider-k');

const valC = document.getElementById('val-c');
const valM = document.getElementById('val-m');
const valY = document.getElementById('val-y');
const valK = document.getElementById('val-k');

const colorBox = document.getElementById('color-preview');
const cmykDisplay = document.getElementById('cmyk-display');
const hexDisplay = document.getElementById('hex-display');

// CMYK → RGB 簡易変換ロジック
function cmykToRgb(c, m, y, k) {
  // 0-100 のパーセンテージを 0-1 の小数に変換
  const cPercent = c / 100;
  const mPercent = m / 100;
  const yPercent = y / 100;
  const kPercent = k / 100;

  // 標準変換式
  const r = Math.round(255 * (1 - cPercent) * (1 - kPercent));
  const g = Math.round(255 * (1 - mPercent) * (1 - kPercent));
  const b = Math.round(255 * (1 - yPercent) * (1 - kPercent));

  return { r, g, b };
}

// RGB → HEX 変換
function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// プレビューの更新
function updateColor() {
  const c = parseInt(sliderC.value);
  const m = parseInt(sliderM.value);
  const y = parseInt(sliderY.value);
  const k = parseInt(sliderK.value);

  // ラベルの数値表示を更新
  valC.textContent = c;
  valM.textContent = m;
  valY.textContent = y;
  valK.textContent = k;

  // RGB値を計算
  const { r, g, b } = cmykToRgb(c, m, y, k);
  const hex = rgbToHex(r, g, b);

  // 背景色とテキストを更新
  colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  cmykDisplay.textContent = `C: ${c}% | M: ${m}% | Y: ${y}% | K: ${k}%`;
  hexDisplay.textContent = `(画面表示近似値: ${hex})`;
}

// イベントリスナーの追加
[sliderC, sliderM, sliderY, sliderK].forEach(slider => {
  slider.addEventListener('input', updateColor);
});

// 初期実行
updateColor();
