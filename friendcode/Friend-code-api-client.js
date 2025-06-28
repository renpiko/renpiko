// 📍 HTMLからGASと連携するJavaScript関数セット
// 🔗 `scriptURL` をGASでデプロイしたウェブアプリURLに書き換えてください

const scriptURL = 'https://script.google.com/macros/s/AKfycbws8hQlDVsp6U7bDvyTatgI7tDI3qOUKWXx70fNZz4aPagik5CYLCxR-4mDqzSsNO6O1A/exec';

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

async function loadFilterOptions() {
  const res = await fetch(`${scriptURL}?unique=true`);
  const { users, games } = await res.json();

  const userSelect = document.getElementById("filterUsername");
  const gameSelect = document.getElementById("filterGame");

  users.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    userSelect.appendChild(option);
  });

  games.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    gameSelect.appendChild(option);
  });
}
