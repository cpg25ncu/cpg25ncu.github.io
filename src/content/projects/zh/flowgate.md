---
title: FlowGate
fullTitle: FlowGate：面向 AI 编程工具的 API 网关
order: 5
featured: false
kicker: AI 基础设施 · 团队项目
tagline: 可扩展的 API 网关：校验访问权限与配额，把 AI 编程工具的请求路由到经批准的模型通道，流式返回输出并记录用量。由 SWE5001 第 1 组开发。
period: 2026.10 – 2026.11
role: 团队成员 · 计量、可观测性、负载测试
stack: [Go, PostgreSQL, Prometheus, Grafana, Helm, k6, Python]
visual: gateflow
repo: https://github.com/bibi45c/gateflow
metric:
  value: "6"
  label: 个由我提交并合并的 PR，涵盖计量服务、可观测性、负载测试、Grafana 看板与两份客户端指南。
chapters:
  - kicker: 系统
    title: 一个网关，统一管理模型访问。
    body: 开发者用网关密钥把编程工具指向网关；FlowGate 校验访问权限与配额，把请求路由到经批准的模型通道，流式返回输出并记录用量。团队把它从本地环境推进到 kind 上的 Helm 部署，以及 Terraform 管理的 AWS EKS。后面几章中高亮的部分是我负责的工作。
  - kicker: 计量
    title: 先预留，后结算。
    body: 负责计量服务的预留与结算接口：模型调用前，在一个短事务中按最大费用冻结租户余额；调用结束后把实际费用写入账本并释放冻结。通过请求内容的 SHA-256 摘要实现幂等重放，两次调用之间不保留任何事务、连接或锁。
  - kicker: 可观测性
    title: 指标开销，可以量化。
    body: 编写共享的 Go 可观测性库（Prometheus 指标与结构化请求日志）、设计说明，以及一个对比普通响应与流式响应下日志和指标开销的探针程序。标签固定为服务、路由与结果，请求 ID 和租户不会成为指标标签。
  - kicker: 负载与扩缩容
    title: 在负载下度量。
    body: 编写 k6 到达率场景与 Python 结果汇总脚本（可标记缺失或重复的结果），并通过 Helm 部署 Grafana 看板，在同一时间轴上展示结果分布、请求量、首个输出延迟与副本数。
  - kicker: 客户端
    title: 从编程工具接入网关。
    body: 编写 OpenCode 与 Codex CLI 经网关调用模型的分步指南，为本地环境加入可选的 Ollama 配置，并录制来自 Codex 的请求样例用于解析器测试。
---
