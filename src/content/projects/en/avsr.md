---
title: Audio-Visual Speech Recognition
fullTitle: Robust Audio-Visual Speech Recognition via Multimodal Feature Fusion
short: AV Speech Recognition
order: 1
kicker: Multimodal learning
tagline: An end-to-end system that combines acoustic and lip-motion features to stay accurate in noisy environments.
period: Oct 2025 – Nov 2026
stack: [Python, PyTorch, TensorFlow/Keras, MediaPipe, OpenCV]
visual: avsr
repo: https://github.com/cpg25ncu/audio-visual-speech-recognition
metric:
  value: "77.7%"
  label: Audio recognition accuracy at 0 dB after multi-condition training, up from 30.5%.
chapters:
  - kicker: Problem
    title: Listen, and read lips.
    body: Speech recognition loses accuracy quickly in noise. This project designs and implements an end-to-end audio-visual system that combines acoustic and lip-motion features, so recognition holds up when the audio gets noisy.
  - kicker: Audio branch
    title: MFCC, written from scratch.
    body: The audio branch uses MFCC feature extraction implemented from scratch, feeding a temporal CNN model.
  - kicker: Visual branch
    title: Tracking the mouth with face-mesh landmarks.
    body: The visual branch tracks the mouth region with MediaPipe face-mesh landmarks and extracts 2D-DCT and lip-shape features, also modelled with a temporal CNN.
  - kicker: Fusion
    title: Early, late — and adaptive.
    body: Feature-level early fusion and decision-level late fusion were designed and compared. Entropy-based adaptive weighting favours audio when video quality drops.
  - kicker: Results
    title: Tested across noise types and SNR levels.
    body: Comparative experiments ran across noise types and signal-to-noise ratios. Multi-condition training raised audio recognition accuracy at 0 dB from 30.5% to 77.7%. The models are implemented in both PyTorch and Keras and exported to ONNX/TFLite.
---
