---
title: 视听语音识别
fullTitle: 基于多模态特征融合的鲁棒视听语音识别系统
order: 1
kicker: 多模态学习
tagline: 融合声学特征与唇形视觉特征的端到端系统，在噪声环境下依然保持识别能力。
period: 2025.10 – 2026.11
stack: [Python, PyTorch, TensorFlow/Keras, MediaPipe, OpenCV]
visual: avsr
repo: https://github.com/cpg25ncu/audio-visual-speech-recognition
metric:
  value: "77.7%"
  label: 多条件训练后，0 dB 下的音频识别准确率由 30.5% 提升至 77.7%。
chapters:
  - kicker: 问题
    title: 听声音，也读唇形。
    body: 噪声会让语音识别迅速失准。本项目设计并实现端到端视听语音识别系统，融合声学特征与唇形视觉特征，提升噪声环境下的识别能力。
  - kicker: 音频分支
    title: 自行实现 MFCC。
    body: 音频分支自行实现 MFCC 特征提取，并采用时序 CNN 模型。
  - kicker: 视觉分支
    title: 用人脸关键点追踪唇部。
    body: 视觉分支基于 MediaPipe 人脸关键点追踪唇部区域，提取 2D-DCT 与唇形特征，同样采用时序 CNN 模型。
  - kicker: 融合
    title: 早期融合、晚期融合，再到自适应。
    body: 设计并对比特征级早期融合与决策级晚期融合，基于后验熵自适应调整音视频权重，视频质量下降时自动偏向音频。
  - kicker: 结果
    title: 覆盖多种噪声与信噪比。
    body: 在多种噪声类型及信噪比下开展对比实验，多条件训练使 0 dB 下音频识别准确率由 30.5% 提升至 77.7%；模型分别以 PyTorch 与 Keras 实现，并导出为 ONNX/TFLite 格式。
---
