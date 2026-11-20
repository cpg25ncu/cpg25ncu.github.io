---
title: FlowGate
fullTitle: FlowGate — API Gateway for AI Coding Tools
order: 5
featured: false
kicker: AI infrastructure · team project
tagline: A scalable API gateway that checks access and quota, routes AI coding-tool requests to approved model channels, streams the output back and records usage. Built by SWE5001 Team 1.
period: Oct 2026 – Nov 2026
role: Team member · metering, observability, load testing
stack: [Go, PostgreSQL, Prometheus, Grafana, Helm, k6, Python]
visual: gateflow
repo: https://github.com/bibi45c/gateflow
metric:
  value: "6"
  label: Merged pull requests of mine — metering, observability, load testing, the Grafana dashboard and two client guides.
chapters:
  - kicker: The system
    title: One gateway for model access.
    body: Developers point a coding tool at the gateway with a gateway key. FlowGate checks access and quota, routes the request to an approved model channel, streams the output back and records usage. The team took it from a local stack to Helm on kind and to Terraform-managed AWS EKS. The highlighted parts in the following chapters are my contributions.
  - kicker: Metering
    title: Reserve first, settle after.
    body: The metering service's reserve and settle endpoints. Before a model call, the maximum cost is reserved against the tenant's balance in one short transaction; afterwards the real cost is written to the ledger and the hold is released. Replays are idempotent through SHA-256 digests of the request content, and nothing stays open between the two calls — no transaction, connection or lock.
  - kicker: Observability
    title: Metrics with a measured cost.
    body: A shared Go observability library with Prometheus metrics and structured request logs, a design note, and a probe that compares the overhead of logging and metrics on plain and streaming replies. Labels are fixed to service, route and result, so request ids and tenants never become metric labels.
  - kicker: Load & scaling
    title: Measured under load.
    body: k6 arrival-rate scenarios with a Python reporter that flags missing or duplicate results, and a Grafana dashboard, provisioned through Helm, that shows outcomes, demand, first-output latency and replicas on one time axis.
  - kicker: Clients
    title: From a coding tool to the gateway.
    body: Step-by-step guides for using OpenCode and Codex CLI through the gateway, an optional Ollama profile for the local stack, and a request fixture recorded from Codex for the parser tests.
---
