---
title: 实时手势识别
fullTitle: 基于 MediaPipe 与机器学习的实时手势识别系统
order: 2
kicker: 实时视觉
tagline: 面向复杂场景下的实时人机交互需求，端到端的实时手势识别系统。
period: 2025.10 – 2026.11
stack: [Python, MediaPipe, OpenCV, scikit-learn]
visual: gesture
repo: https://github.com/cpg25ncu/asl-gesture-recognition
metric:
  value: "93.8%"
  label: 端到端测试准确率。
chapters:
  - kicker: 问题
    title: 无接触的人机交互。
    body: 面向复杂场景下的实时人机交互需求，设计并实现端到端手势识别系统。
  - kicker: 特征
    title: 21 个关键点，归一化。
    body: 利用 MediaPipe 提取手部关键点，并进行位置与尺度归一化，让分类器关注手形本身，而不是手在画面中的位置和大小。
  - kicker: 模型
    title: 三种分类器，其中一个从零实现。
    body: 对比逻辑回归、决策树及从零实现的 kNN 分类器。
  - kicker: 鲁棒性
    title: 适应弱光与噪声。
    body: 通过自适应 gamma 校正与中值滤波，提升低光及噪声场景下的手部检测效果；端到端测试准确率达 93.8%。
---
