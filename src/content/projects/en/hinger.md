---
title: Hinger AI
fullTitle: "Hinger AI: Search, Exact Solving and Game-Playing Agents"
order: 3
kicker: Search & game AI
tagline: Graph algorithms, a provable heuristic and an exact solution for the board game Hinger.
period: Oct 2025 – Nov 2026
stack: [Python, pytest, GitHub Actions]
visual: hinger
repo: https://github.com/cpg25ncu/hinger-ai
metric:
  value: "5×5"
  label: Full board solved exactly with memoised negamax and symmetry reduction.
chapters:
  - kicker: Win detection
    title: Winning moves as articulation points.
    body: Winning-position detection reduces to finding articulation points in the board graph, implemented in linear time with Tarjan’s algorithm.
  - kicker: Search
    title: A heuristic, derived and proved.
    body: An admissible and consistent heuristic for A* search, derived and proved.
  - kicker: Exact solving
    title: The full 5×5 board, solved.
    body: The full 5×5 board is solved exactly using memoised negamax with symmetry reduction.
  - kicker: Agents
    title: Measured against the exact solution.
    body: Minimax, alpha-beta and Monte Carlo tree search agents, with their move quality evaluated against the exact solution.
---
