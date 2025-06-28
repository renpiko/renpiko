// 📍 HTMLからGASと連携するJavaScript関数セット
// 🔗 `scriptURL` をGASでデプロイしたウェブアプリURLに書き換えてください

const scriptURL = 'https://script.google.com/macros/s/AKfycbyg3HQEOsGDDisymnnYKUkFOlpvxAy5eIWgGwy6tcAJ7BolM8D8FHcb_UICuEzFSNY1GA/exec';

// 🔄 一覧データ取得用 (GET)
async function loadFriendCodes() {
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();

    const tbody = document.getElementById("listBody");
    tbody.innerHTML = '';

    data.forEach(entry => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${entry["ユーザー名"]}</td>
        <td>${entry["ゲーム名"]}</td>
        <td>${entry["フレンドコード"]}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("読み込みエラー:", err);
  }
}

// ➕ 新規登録用 (POST)
async function registerFriendCode(username, game, friendCode) {
  const body = JSON.stringify({ username, game, friendCode })
  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
    });

    const text = await res.text();
    alert(text === "Success" ? "登録完了！" : "登録失敗:", text);
    if (text === "Success") location.href = "index.html";
  } catch (err) {
    console.error("送信エラー:", err);
    alert("送信中にエラーが発生しました。");
  }
}
