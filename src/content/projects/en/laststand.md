---
title: Last Stand
fullTitle: Last Stand — Zombie Wave-Survival Shooter
order: 7
featured: false
kicker: Game development
tagline: A third-person wave-survival shooter in Unity 6. Survive five escalating waves, then fight your way to the extraction point.
period: May 2026
stack: [Unity 6, C#, NavMesh, ScriptableObjects, Input System]
cover:
  src: /media/laststand/combat-ads.jpg
  alt: Aiming down sights at an approaching enemy
repo: https://github.com/cpg25ncu/unity-game-last-stand
metric:
  value: "27"
  label: C# scripts across 7 namespaces that turn third-party controller and art packages into a complete game.
chapters:
  - kicker: The game
    title: Survive five waves, then extract.
    body: Each wave brings more enemies and new types — brawlers first, then blade wielders, then gunmen who shoot from range — and kills can drop health or ammo. Clear the fifth wave and an extraction marker appears; reach it to win.
    media:
      src: /media/laststand/gameplay.mp4
      poster: /media/laststand/gameplay-poster.jpg
      alt: "Gameplay: aiming, sniping an enemy, running to the extraction marker and the Extraction Complete screen"
  - kicker: Systems
    title: The game built on top.
    body: The player controller, weapons, enemy AI behaviours and art come from Asset Store packages. Everything that turns them into a game is custom — the run state machine, wave manager, spawn director, stats and scoring, drops, the extraction objective and all of the UI.
    media:
      src: /media/laststand/wave3-hud.jpg
      alt: HUD during wave 3 showing wave, enemies remaining, health, kills, score, time and objective
  - kicker: Engineering
    title: No changes to third-party code.
    body: The custom code never imports the third-party controller's namespace. Small reflection-based adapters bind the player as the AI target and detect defeats, and events connect the systems without hard references. Waves, enemies and drop tables are ScriptableObjects, tuned in the Inspector.
    media:
      src: /media/laststand/extraction-marker.jpg
      alt: Extraction marker with a live distance readout
  - kicker: Playtesting
    title: Fixed what playtests found.
    body: Spawning picks points by enemy role, validates them against the NavMesh and keeps a minimum distance from the player. When playtesting showed that wave 4 could stall after a failed spawn, the fix kept the queued enemy and retried, so a wave always completes.
    media:
      src: /media/laststand/extraction-complete.jpg
      alt: Extraction Complete screen with final kills, score, time and waves
---
