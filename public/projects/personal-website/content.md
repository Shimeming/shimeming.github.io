---
projectName: 'Personal Website'
description: 'My personal website made with Next.js and Tailwind CSS.'
overview: [
  'Utilized NextJS, Typescript, TailwindCSS, Framer Motion, to create a responsive personal website.',
]
links: [
  {
    href: 'https://github.com/Shimeming/shimeming.github.io',
    icon: 'FaGithub',
    description: 'Repo',
  },
  {
    href: 'https://shimeming.github.io/',
    icon: 'FaUserCircle',
    description: 'Website',
  }
]
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

Next JS 的教學算非常完善、易懂的，有[新手向的教學](https://nextjs.org/learn)，文檔也有許多範例，比 Unity 好多了。(前陣子在寫 [unity 遊戲](/projects/project-page?projectName=hallucination)，Unity 的文檔真的是一字千金)

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
}
```

再搭配 [next-themes](https://github.com/pacocoursey/next-themes) 控制黑白，效果不錯。因為 `<Theme Provider>` 只能在 client side 用，但整個 app 都需要，所以我額外包了個 Wrapper ，再從 RootLayout 中 import ，把整個 body 內的東西包起來:
```ts
'use client';
import { ThemeProvider } from 'next-themes';

const ThemeProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <ThemeProvider attribute='data-mode' enableSystem={true}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
```

沒想到 Tailwind `dark:*` selector 壞掉了，嘗試了很多方法，才發現是我耍笨把 config 中的 `  darkMode: ['selector', '[data-mode="dark"]']` 塞在錯的位置，移到對的位置就好了。

再來是感覺黑白的切畫過於生硬，想在中間加個酷炫的動畫，但查了查[教學](https://www.youtube.com/watch?v=oIHuvg38qLE)感覺很麻煩，花很多時間在這上面，寫心得的最初目標會一直被往後拖，於是改成在 global CSS 加淡入淡出，效果也挺不錯：
```css
/* globals.css */
body {
  color: var(--foreground);
  background: var(--background);
  @apply transition-colors duration-1000;
}
```

如果在 `body *` 也 apply 一樣的 transition，會產生一個個元素漸漸變色的效果，我不太知道其中的原理(我猜跟 tag 的層數有關)，一開始覺得很酷炫，後來看多了覺得太花，就刪掉了。有一些本來就有動畫的物件則需要手動加上 transition 。

### GitHub API
在找模板的過程中，[有個模板](https://github.com/hashirshoaeb/home)的 project 頁面我很喜歡，想要復刻到自己的頁面中。
從 [Flowbite](https://flowbite.com/) 選個 [Card](https://flowbite.com/docs/components/card/) 的 code 貼上來，看起來就不錯。

模板有使用 [axios](https://github.com/axios/axios) 向 github fetch Language & Last update 等資訊，查了查發現官方有提供 [Octokit](https://github.com/octokit/octokit.js) ，使用這個 package 就不用手動處理 type 的問題了~

寫一寫，突然 fetch 不到資訊，才發現超過 API 的 rate limit (60 requests per hour per IP)，不知道怎麼解決只好在 component 加個 switch ，把 fetch 的部分先關了。

### Fill In Content
我參考的 personal websites 每個都像是要求職用的，一個比一個牛逼，導致我的網頁也像是 LinkedIn 可以直接貼過來的樣子。
我本意不是要做求職網站，原本各種填牛逼語句的地方挺讓我困擾，我根本沒想過網站上會需要寫 About。
但都幫那頁做了酷炫動畫，不用實在太可惜，就只好隨便亂填充些字，等未來有時間再說。

### Markdown
Build 這個網站的主要目的就是讓我有地方丟我的心得、可以有更高的自由度。
想了一陣子心得文要用什麼格式，最後還是選擇 Markdown，這是我想到最容易、方便的。

有幾個可選的 packages：
[`react-markdown`](https://github.com/remarkjs/react-markdown)、
[`remark`](https://github.com/remarkjs/remark/tree/main)、
[`marked`](https://github.com/markedjs/marked)、
[`markdown-it](https://github.com/markdown-it/markdown-it)

因為有個有 react ，我就使用了 react-markdown 。
再搭配 [tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography)，
效果還不錯。
就是 code 的高亮不知道為什麼加了 `rehypeHighlight` 的 plugin 後依然不會動，我猜它和 topography 有點打架之類的。

原本我打算把 Markdown 的部分包成一個 Wrapper，像是
```ts
const MarkdownWrapper = ({
  content,
  className = '',
}: {
  content: string
  className?: string
}) => {
  return (
    <ReactMarkdown
      className={`prose dark:prose-invert ${className}`}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  );
};
```
但不知道為何包起來後 topography 就不會動了，只好作罷。

我發現為什麼了！在 `tailwind.config.ts` 中，有個 `content`，要把 `'./src/helpers/**/*.{js,ts,jsx,tsx,mdx}',`
也加上去(因為我把 Wrapper 丟在 helpers)，其他東西放在 `components` 會動是因為 tailwind 最一開始很貼心地也把 `components` 放在 list 裡面。

### Should I Have a Backend?
寫好的 markdown 應該丟在哪ㄋ？
因為不想維護一個後端，就把 content 全部丟到 public 去，再用 query fetch。
原本我是用 dynamic routing，像是
```ts
// src/app/projects/[slug]/page.tsx
'use client';
const Page = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { slug } = await params;
      const res = await fetch(`/projects/${slug}.md`);
      if (res.ok) {
        const text = await res.text();
        const { content, data } = matter(text);
        setContent(content);
      } else {
        setContent('Article not found');
      }
    })();
  }, [params]);

  // ...
}
```
再用 [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) 來生靜態網頁，不過這 function 只能用在 server component， fetch public 又只能在 client side，要的話應該是也可以切開，但太麻煩了。乾脆就用同一個網址，加 query 就好：
```ts
'use client';
const Page = () => {
  const searchParams = useSearchParams();
  const projectName = searchParams.get('projectName');
  // ...
};
```

不過有個簡單的後端還是挺有吸引力的，
像是用另一個 github repo 、 google drive 之類的，這樣只是要更新 content 的內容時，不需要創造額外的 commit。
維護修改時間、查詢所有文章之類的也比較容易，不過比起真正的 database，還是頗麻煩。

當然，只是要拿修改時間的話，大概也可以以直接向這個 repository 發 request 的方式拿到，不過就當未來展望吧。

## Reflection
過程中學到挺多不知道有沒有用的知識，就是比較費時間。
想到去年暑假後半，我也在寫網頁，明明有些經驗了，寫起來還是不太順-w-
