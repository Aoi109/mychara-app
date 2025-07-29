function drawGacha() {
    var rarity = generateRarity();
    var name = generateName();
    var word = generateWord(rarity);

    var result = document.getElementById('result');
    result.textContent = rarity + word + name;

    // クラスを一度リセット
    result.className = ''; // 全クラス削除

    // アニメーションのクラスだけ除外してレアリティクラスを先に追加（任意）
    result.classList.add('rarity-' + rarity);

    // アニメーションクラスを一旦削除 → リフロー → 再追加
    result.classList.remove('result-animation');
    void result.offsetWidth; // ← ブラウザに「再描画しろ」と伝える
    result.classList.add('result-animation');
}


function clearGachaResults() {
    var resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.innerHTML = '';
    }
}

function drawGachaTenTimes() {
    var results = [];

    for (var i = 0; i < 10; i++) {
        var rarity = generateRarity();
        var name = generateName();
        var word = generateWord(rarity, name);

        results.push(rarity + word + name);
    }

    var resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    showNextResult(results, resultContainer, 0);
}

function showNextResult(results, container, index) {
    if (index >= results.length) {
        return;
    }

    var resultElement = document.createElement('div');

    // レアリティだけ抽出する
    var rarity = results[index].match(/^(N|R|SR|SSR|SUR)/)[0];

    resultElement.textContent = results[index];
    resultElement.className = 'result-animation rarity-' + rarity;

    container.appendChild(resultElement);

    setTimeout(function () {
        showNextResult(results, container, index + 1);
    }, 100);
}

function generateRarity() {
    var random = Math.random() * 100;

    if (random < 45) {
        return 'N';
    } else if (random < 70) {
        return 'R';
    } else if (random < 85) {
        return 'SR';
    } else if (random < 95) {
        return 'SSR';
    } else {
        return 'SUR';
    }
}

function generateName() {
    var names = ['恵', '斗真', '麗也', '結夏', '秀次郎', '蒼太', 'タンザナイト', '朱色', '輝', '黄色', '夢', '悠桔',
        '花憐', '紅波', '詩音', 'ルト', '望生', '綺芽', '七', '守裕', '実玖', '藍', '睦月', 'リュカ', '松来', '珀亜',
        '空色', '海色', '桜司', '雪華', '翔', '弥宵', '一桜', '氷雅', '六', '月蜜', 'ラウ', '暁鶯', '九八', 'ファイ',
        'ローレンス', 'ツナ', '双波', 'ハル', 'デルタ', '廻', '仮名', '哉', 'ねおん', '二色', '竜之介', '佐乃', '春留'];
    var randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

function generateWord(rarity, name) {
    var words = nicknames[rarity];

    if (words) {
        if (Array.isArray(words)) {
            // N, R, SR, SSR のように配列の場合
            var randomIndex = Math.floor(Math.random() * words.length);
            var word = words[randomIndex];
            return word !== undefined ? '[' + word + ']' : '';
        } else if (typeof words === 'object') {
            // SUR のようにオブジェクトの場合
            var charWords = words[name] || words['default'];  // ← ここでデフォルトを使う
            if (charWords) {
                var randomIndex = Math.floor(Math.random() * charWords.length);
                var charWord = charWords[randomIndex];
                return charWord !== undefined ? '[' + charWord + ']' : '';
            }
        }
    }

    return '';
}

