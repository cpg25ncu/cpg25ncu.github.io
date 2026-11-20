---
title: Last Stand
fullTitle: Last Stand：丧尸波次生存射击游戏
order: 7
featured: false
kicker: 游戏开发
tagline: 基于 Unity 6 的第三人称波次生存射击游戏：撑过五波逐渐升级的敌人，再杀出一条路抵达撤离点。
period: "2026.05"
stack: [Unity 6, C#, NavMesh, ScriptableObjects, Input System]
cover:
  src: /media/laststand/combat-ads.jpg
  alt: 瞄准逼近的敌人
repo: https://github.com/cpg25ncu/unity-game-last-stand
metric:
  value: "27"
  label: 个 C# 脚本，分属 7 个命名空间，把第三方角色控制器与美术资源组织成一款完整的游戏。
chapters:
  - kicker: 玩法
    title: 撑过五波，然后撤离。
    body: 每一波敌人更多、类型更新——先是徒手近战，再是持刀近战，最后是远程枪手；击杀可能掉落血包或弹药。清完第五波后出现撤离标记，抵达即获胜。
    media:
      src: /media/laststand/gameplay.mp4
      poster: /media/laststand/gameplay-poster.jpg
      alt: 游戏实录：瞄准、狙杀敌人、跑向撤离标记并进入撤离成功画面
  - kicker: 系统
    title: 在现成组件之上构建游戏。
    body: 角色控制器、武器、敌人 AI 行为与美术资源来自 Asset Store；把它们变成一款游戏的部分全部为自行开发——流程状态机、波次管理、刷怪调度、统计与计分、掉落、撤离目标以及全部界面。
    media:
      src: /media/laststand/wave3-hud.jpg
      alt: 第 3 波时的 HUD：波次、剩余敌人、生命值、击杀、得分、时间与当前目标
  - kicker: 工程
    title: 不改动任何第三方代码。
    body: 自研代码从不引用第三方控制器的命名空间，而是通过基于反射的小型适配器绑定 AI 目标、检测敌人死亡，并用事件连接各系统，避免硬引用。波次、敌人与掉落表均为 ScriptableObject，可直接在 Inspector 中调参。
    media:
      src: /media/laststand/extraction-marker.jpg
      alt: 带实时距离显示的撤离标记
  - kicker: 测试
    title: 修好试玩中发现的问题。
    body: 刷怪按敌人角色选择出生点，经 NavMesh 校验并与玩家保持最小距离。试玩发现第 4 波可能因刷怪失败而卡住，修复后保留排队中的敌人并重试，确保每一波都能完成。
    media:
      src: /media/laststand/extraction-complete.jpg
      alt: 撤离成功画面，显示最终击杀、得分、用时与波次
---
