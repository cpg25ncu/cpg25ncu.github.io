---
title: Hinger 博弈 AI
fullTitle: Hinger 棋类博弈 AI：搜索、精确求解与对弈智能体
order: 3
kicker: 搜索与博弈
tagline: 用图算法、可证明的启发函数与精确求解来研究 Hinger 棋局。
period: 2025.10 – 2026.11
stack: [Python, pytest, GitHub Actions]
visual: hinger
repo: https://github.com/cpg25ncu/hinger-ai
metric:
  value: "5×5"
  label: 基于记忆化 negamax 与对称性约简，精确求解完整棋盘。
chapters:
  - kicker: 制胜判定
    title: 把制胜位置归约为割点。
    body: 将制胜位置判定归约为棋盘图的割点问题，基于 Tarjan 算法实现线性时间检测。
  - kicker: 搜索
    title: 推导并证明启发函数。
    body: 推导并证明可采纳且一致的 A* 启发函数。
  - kicker: 精确求解
    title: 5×5 完整棋盘，精确求解。
    body: 基于记忆化 negamax 与对称性约简，精确求解 5×5 完整棋盘。
  - kicker: 对弈智能体
    title: 以精确解为基准。
    body: 实现 minimax、alpha-beta 与蒙特卡洛树搜索对弈智能体，并以精确解为基准评估各算法的走法质量。
---
