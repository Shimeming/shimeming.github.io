---
projectName: 'Hallucination'
coverImage: 'cover.png'
description: 'A single player 2D platformer game made by Unity.'
overview: [
  'Utilized multiple design patterns, including Observer, State, Singleton, Event-Driven Architecture, Command, Component, and Prototype, to create a well-organized and scalable codebase.',
  'Contributed to both gameplay mechanics and architectural decisions, ensuring smooth development and extensibility.'
]
links: [
  {
    href: 'https://github.com/seantsao00/Hallucination',
    icon: 'FaGithub',
    description: 'Repo'
  },
  {
    href: 'https://seantsao00.itch.io/hallucination',
    icon: 'FaGamepad',
    description: 'Game'
  },
]
---

<!-- ([`remark-toc`](https://github.com/remarkjs/remark-toc)). -->

# Hallucination
<iframe frameborder="0" src="https://itch.io/embed-upload/12351752?color=333333" allowfullscreen="" width="960" height="603"><a href="https://seantsao00.itch.io/hallucination">Play GP 2024 Group 12 - Hallucination on itch.io</a></iframe>

## Notes of Development 開發紀錄

### Environment Setup
- 從 UnityHub create 一個新的 Universal 2D (Universal Render Pipeline (URP)) 專案。
- 從 [gitignore Repo](https://github.com/github/gitignore) 把對應的 `.gitignore` template 貼上來。
- 設置以下 editorconfig 來讓大括號不換行
  ```yaml
  root = true

  [*.cs]
  csharp_new_line_before_catch = false
  csharp_new_line_before_else = false
  csharp_new_line_before_finally = false
  csharp_new_line_before_open_brace = none
  ```

### Journey Start
這是我第一次使用 Unity 做專案，也是第一次做目標是要好玩的遊戲，不太知道如何開始。

和組員討論後，決定做 2D platformer 遊戲，整組只有我玩比較多這類遊戲，有幾個是完全沒玩過，於是我趁機推銷我大 [Celeste](https://store.steampowered.com/app/504230/Celeste/)，大家都應該要去玩！

一開始我提了一個預想需要很難操作的跑酷遊戲，但有組員不喜歡跑酷遊戲（他覺得 Celeste 不好玩），所以我又想了新的遊戲。

遊戲大概方向為，有一隻熊與一隻瘋掉的精靈，兩人所看到的世界不同，但因為實際在上同個空間所以一些操作會在兩者看到的世界都產生影響，要玩家切換操控的角色，使熊可以幫助精靈克服障礙、前進。可以參見當時做的[遊戲構想簡報](https://1drv.ms/p/c/21e438e91fc2cb45/ETpAFP_fo0VBjwzhZy_RFeQB9Eq4VdWHeaFxgph_7IgagQ)，大致上想縫合部分 Celeste 與 Bokura 的特色，再加一些創意。

### Develop
然後就來快樂做遊戲，邊學邊想邊做，慢慢築城。
#### World Switch
World Switch 是整個遊戲最大的 feature，但它很模糊，在最初的構想中，不同關卡的物件對應方式不同。
像是最直覺的，物件在兩個世界的位置一樣，只是有部分物件只存在在某一個世界。
還想過兩世界座標系相反、Scale 不同、或是在一個世界的狀態會影響另一世界的狀態……。

要怎麼切換世界、同步/更新兩世界的對應物品，保持其彈性，這大概是這專案數一數二難，又沒什麼網路資源可以參考的問題了，到專案末期，我們還是常常需要修改 World Switch 相關的 code。

World Switch 在玩家看起來的效果是整個場景改變，但在實作的時候因為需要另一個世界物件的資訊，所以是透過在同一個 Scene 中切換 camera 座標達成的。
具體來說，我們以資料夾結構區分物件所屬世界。
同一時間只會有一個世界的物件是 active 的，切換世界的瞬間才會把需要同步物件的資訊同步到另一個世界，並 deactivate 原世界物件、activate 新世界物件。這樣的好處是我們不需要擔心沒有在操作的世界發生非預期的變化，不過也使我們在實作某些比較複雜的同步機制時造成麻煩。
我們討論過許多次不是應該改成兩個世界都 active，不過最後還是維持原本的做法。


#### 2D Physics
> 可參考資料：[Why Does Celeste Feel So Good to Play?](https://www.youtube.com/watch?v=yorTG9at90g&t=314s)

2D Physics 真的是大學問，跟真實世界物理差很多，但不遵守物理法則效果就是比較好。
##### Move
> 可參考資料：[Secrets to a Great Platformer Character with Unity](https://www.youtube.com/watch?v=KKGdDBFcu0Q)

```cs
rb.velocity = new Vector2(direction * currentSpeed, rb.velocity.y);
```

不可能只靠力實作移動，不然角色會越動會快、很難停下來。

我們使用的方式是在玩家按下按鍵瞬間直接改變角色目前的水平速度，也就是加速、停止都是瞬間達到目標速度。
這應該是效果不差，實作上又最簡單的方法。

順帶一提，如果撞到有質量的物體，效果應該是用動量守恆算的。

##### Jump
> 可參考資料：[Improve your Platformer’s Jump (and Wall Jump) | Unity](https://www.youtube.com/watch?v=2S3g8CgBG1g&t=151s)

```cs
void Jump(InputAction.CallbackContext context) {
    if (context.performed) {
        jumpBufferCounter = jumpBufferTime;
    }
    if (context.canceled && rb.velocity.y > 0) {
        rb.velocity = new Vector2(rb.velocity.x, releaseJumpSpeedMultiplier * rb.velocity.y);
        rb.gravityScale = normalGravityScale;
    }
}
void Update() {
    if (characterStateController.HasState(CharacterState.StandingOnGround)) {
        coyoteTimeCounter = coyoteTime;
    } else {
        coyoteTimeCounter -= Time.deltaTime;
    }
    jumpBufferCounter -= Time.deltaTime;

    if (jumpBufferCounter > 0f && coyoteTimeCounter > 0f) {
        rb.velocity = new Vector2(rb.velocity.x, jumpPower);
        jumpBufferCounter = 0f;
        coyoteTimeCounter = 0f;
        rb.gravityScale = NormalGravityScale * gravityMultiplier;
    }
}
```

這是實作起來最複雜的操作，還好有一頭拉庫的參考資料。

##### Dash
實作時想要達成的效果為：減少所受重力、向目前方向持續衝刺一段時間、無法在途中操縱角色移動(但可以像 Celeste 一樣跳躍)

這意外的遇到很多問題。
因為在持續時間結束時，要把重力設回來，但有其他操作會改變重力，導致 race condition 或出現非預期的結果。
後來解決方式是給 Character 一個 States Set ，根據目前身上所有的 State 決定該給什麼重力，
就不會有 Dash 結束時重力一定回到正常狀態導致覆蓋掉其他狀態效果的問題。

##### Wind


##### Spring

##### Climb

#### Camera

#### Tilemap

#### 存檔

#### Game State

#### 邊框

#### 語言

#### 水晶

#### 鍵位

