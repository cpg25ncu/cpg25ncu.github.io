---
title: Real-Time Hand Gesture Recognition
fullTitle: Real-Time Hand Gesture Recognition with MediaPipe and Machine Learning
short: Gesture Recognition
order: 2
kicker: Real-time vision
tagline: An end-to-end, real-time gesture recognition system for touch-free human-computer interaction in complex scenes.
period: Oct 2025 – Nov 2026
stack: [Python, MediaPipe, OpenCV, scikit-learn]
visual: gesture
repo: https://github.com/cpg25ncu/asl-gesture-recognition
metric:
  value: "93.8%"
  label: End-to-end test accuracy.
chapters:
  - kicker: Problem
    title: Touch-free interaction.
    body: An end-to-end, real-time gesture recognition system built for touch-free human-computer interaction in complex scenes.
  - kicker: Features
    title: 21 landmarks, normalised.
    body: MediaPipe extracts hand landmarks from each frame. They are normalised for position and scale, so the classifier sees the shape of the hand rather than where it is or how large it appears.
  - kicker: Models
    title: Three classifiers, one written from scratch.
    body: Logistic Regression, a Decision Tree and a k-nearest-neighbours classifier written from scratch were compared.
  - kicker: Robustness
    title: Built for poor lighting.
    body: Adaptive gamma correction and median filtering improve hand detection in low-light and noisy conditions. The pipeline reaches 93.8% end-to-end test accuracy.
---
