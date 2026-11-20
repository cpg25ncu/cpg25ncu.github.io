---
title: 宿舍管理系统
fullTitle: 宿舍管理系统
order: 6
featured: false
kicker: 全栈系统
tagline: 面向高校宿舍运营的 Web 应用：不超额的床位分配、调换宿舍，以及保留完整修改记录的缺勤管理。
period: "2024.12"
stack: [Java 17, Spring Boot, Spring Security, MySQL, Flyway, Docker, Playwright]
cover:
  src: /media/dorm/overview.png
  alt: 管理员总览：空余床位、各楼入住率与近期缺勤
repo: https://github.com/cpg25ncu/dormitory-management-system
demo: https://tongyaoliu.com/dormitory-management-system/
metric:
  value: "90%"
  label: CI 中的行覆盖率门禁（分支覆盖率 70%），并通过 Testcontainers 在 MySQL 8.4 上运行集成测试。
chapters:
  - kicker: 角色
    title: 两个工作台，一套规则。
    body: 管理员管理楼栋、房间、学生与员工账号，办理入住、调换宿舍与退宿；宿管员为其负责的楼栋登记和更正缺勤记录。
    media:
      src: /media/dorm/overview.png
      alt: 管理员总览：空余床位、各楼入住率与近期缺勤
  - kicker: 分配
    title: 不超额，也不死锁。
    body: 入住、调换与楼栋政策变更都按固定顺序加行锁——先学生、再房间、最后楼栋——两个争抢最后一张床位的请求不可能同时成功，各条路径也不会死锁。楼栋可设为混住、仅女生或仅男生，系统只提供符合条件的房间。
    media:
      src: /media/dorm/room-allocation.png
      alt: 按楼栋政策显示各房间分配情况的房间列表
  - kicker: 记录
    title: 每一次修改都有据可查。
    body: 调换宿舍在同一事务中结束旧的入住记录并开启新记录，失败时原分配保持不变；缺勤的更正与撤销会记录修改人和修改时间，日期按宿舍所在时区计算。
    media:
      src: /media/dorm/staff-absences.png
      alt: 宿管员缺勤记录，含一条已更正和一条已撤销的记录
  - kicker: 交付
    title: 每一层都经过验证。
    body: 集成测试同时在 H2 与（通过 Testcontainers）MySQL 8.4 上运行，并有覆盖率门禁与 OpenAPI 契约测试；Playwright 驱动打包后的应用，CI 部署 Docker Compose 环境并做冒烟测试，发布时自动推送镜像。会话登录配合 CSRF 防护、BCrypt 与按楼栋的权限检查保护数据。
    media:
      src: /media/dorm/student-housing.png
      alt: 带住宿状态与筛选条件的学生列表
---
