---
title: SERMS
fullTitle: SERMS 共享设备预约与维护管理系统
order: 4
kicker: 全栈系统
tagline: 由 5 人敏捷团队开发，并发布至 HTTPS 生产服务器的共享设备预约与维护管理系统。
period: 2026.08 – 2026.11
role: Scrum 负责人 · 5 人团队
stack: [Java 17, Spring Boot, React/TypeScript, PostgreSQL, Docker]
visual: serms
repo: https://github.com/cpg25ncu/shared-equipment-reservation-and-maintenance-system
metric:
  value: "5"
  label: 个用例模块，由我协调集成。
chapters:
  - kicker: 团队
    title: 带领 5 人敏捷团队。
    body: 基于 GitHub Issues/Projects 分配任务、协调五个用例模块集成，成员缺位时重新分配并接手。
  - kicker: 模块
    title: 一个模块，从头做到尾。
    body: 负责故障报修与维护模块从分析设计、REST 接口、数据库迁移到 React 前端的全流程开发，并接手搜索与预约模块。
  - kicker: 交付
    title: 通过门禁流水线上线。
    body: 搭建集成主线与前端基础框架，主导通过 GitHub Actions 流水线将系统发布至 HTTPS 生产服务器，流水线集成 CodeQL、Trivy、gitleaks 安全扫描与覆盖率门禁。
---
