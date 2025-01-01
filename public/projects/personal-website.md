---
projectName: 'Personal Website'
description: 'My personal website made with Next.js and Tailwind CSS.'
repoUrl: 'https://github.com/Shimeming/shimeming.github.io'
---

# Personal Website 個人網站

## Motivation 動機

差不多兩個月的寒假，好短。從寒假開始那天，就有不斷被追逐的感覺，轉眼間竟然已經過了六分之一。
一段神聖的假期，好想做各種事情，總感覺不早點做就來不急，寒假要一溜煙飛走了。

我打算寫個網站，讓我有地方方便找 projects 、把各 projects 的心得整理在那，想著純前端的靜態網站，網路上找找模板應該很快。

我花了幾個小時在 github 上狂掃[各個個人網站](https://github.com/stars/Shimeming/lists/portfolio-website)，然後選了[心儀的模板](https://minimal-nextjs-portfolio-website.vercel.app/)，沒想到 npm i 一 run 下去，一堆 package 過舊的 warning、error 噴出來，正好他有教學影片，那乾脆直接跟著影片從 0 開始寫。影片只有 5 個小時，我放兩倍速，撐死十個小時內應該寫得出來吧。

## Notes of Development 開發紀錄

### Journey Start
前陣子從 UbuntuWSL 換到 ArchWSL ，電腦裡還沒有 node 和 npm ，剛好藉這個機會載一載。

Next JS 的教學算非常完善、易懂的，有[新手向的教學](https://nextjs.org/learn)，文檔也有許多範例，比 C# 好多了。(前陣子在寫 [unity 遊戲](/projects?projectName=hallucination)，C# 的文檔真的是一字千金)

執行個
```shell
npx create-next-app@latest
```
然後 Enter 按到底就開好 project 了(當然，你需要幫你的 project 命名)！

之後就是無情抄影片，不過因為影片用的是 Page Router + Javascript，而我用的是比較新的 App Router + Typescript，過程還是有些不同。做一做感覺寫純靜態網站的話，App Router 有些限制反而會讓事情變得比較麻煩(因為最後都會 build 成靜態，一堆 server side 的東西都不能用)。

### [Framer Motion](https://github.com/motiondivision/motion)
抄的過程中，學到最多的就是 Framer Motion ！
這是我第一次寫動畫，以前頂多用 native CSS 寫比較簡單的線條變化，這次寫了逐字出現、胡亂變色還有動的多餘的莫名其妙的時間軸(它的點會閃爍、軸會跟著目前的頁面位置延伸！)，實在挺好玩的。

### Dark Mode
影片中， Dark Mode toggle 會在 sunIcon & moonIcon 間切換，有個流暢的動畫，一看，是由[一串謎樣長的 code](https://github.com/codebucks27/Next.js-Developer-Portfolio-Starter-Code/blob/main/public/All-Texts/Icons.txt) 組成的。

不相信那簡單小動畫那麼複雜，於是我上網找[其他人的教學](https://jfelix.info/blog/using-react-spring-to-animate-svg-icons-dark-mode-toggle)，它還很貼心的在開頭註明，如果不想自己寫，它有寫好的 [package](https://github.com/JoseRFelix/react-toggle-dark-mode) 可以直接使用。

跟著做，在 [Feather](https://feathericons.com/) 從 inspector 中把 raw svg 複製出來(我不知道有沒有更聰明的做法)，我才知道 svg 可以直接用 html 畫。
一切都很順利，直到開始動畫，教學使用 [React Spring](https://github.com/pmndrs/react-spring)，但我的 react 版本太新，沒辦法使用。

我猜 force 載下來用應該也行，不過我覺得這樣髒髒的不喜歡，順便測驗自己有沒有學會 Framer Motion，索性用 Framer Motion 重寫了。此時，我花的時間已經超過十小時了。

在教學影片中， DarkMode 的 Tailwind 設定把 dark 跟 light 分開，所以每個 class 都要指定 `dark:*`。：
```ts
theme: {
  extend: {
    colors: {
      dark: "#171717", // neutral-900
      light: "#f5f5f5", // neutral-100
      primary: "#1d4ed8", // blue-700
      primaryDark: "#a78bfa" // violet-400
    },
  },
},
```

我覺得這樣的做法很不聰明，應該要讓 primary 可以直接自動切換。[tailwind 關於 Color 的頁面](https://tailwindcss.com/docs/customizing-colors)找不到解決方法，一籌莫展時，靈機一動想到可以抄專案剛生出來時， dark mode 的作法，再結合自訂 color，我的 config 變成：
```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
    },
  },
},
```

```css
// src/app/global.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
  --color-primary: #1d4ed8; /* blue-700 */
  --color-secondary: #6b7280; /* gray-500 */
}

[data-theme='dark'] {
  --background: #0a0a0a;
  --foreground: #ededed;
  --color-primary: #a78bfa; /* violet-400 */
  --color-secondary: #d1d5db; /* gray-300 */
}

body {
  color: var(--foreground);
  background: var(--background);
  /* font-family: Arial, Helvetica, sans-serif; */
}

```

To be continue...



### Fill In Content
我參考的 personal websites 每個都像是要求職用的，一個比一個牛逼，導致我的網頁也像是 LinkedIn 可以直接貼過來的樣子。
我本意不是要做求職網站，原本各種填牛逼語句的地方挺讓我困擾，我根本沒想過網站上會需要寫 About。
但都幫那頁做了酷炫動畫，不用實在太可惜，就只好隨便亂填充些字，等未來有時間再

### ESLint

### Should I Have a Backend?

## Reflection
