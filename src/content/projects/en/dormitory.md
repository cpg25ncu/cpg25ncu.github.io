---
title: Dormitory Management System
fullTitle: Dormitory Management System
order: 6
featured: false
kicker: Full-stack systems
tagline: A web application for university residence operations — room allocation without overbooking, transfers, and absence tracking with a full audit history.
period: Dec 2024
stack: [Java 17, Spring Boot, Spring Security, MySQL, Flyway, Docker, Playwright]
cover:
  src: /media/dorm/overview.png
  alt: Administrator overview with available beds, occupancy by building and recent absences
repo: https://github.com/cpg25ncu/dormitory-management-system
demo: https://cpg25ncu.github.io/dormitory-management-system/
metric:
  value: "90%"
  label: Line-coverage gate in CI (70% for branches), with integration tests on MySQL 8.4 through Testcontainers.
chapters:
  - kicker: Roles
    title: Two workspaces, one set of rules.
    body: Administrators manage buildings, rooms, students and staff accounts, and check students in, transfer them between rooms and check them out. Dormitory staff record and correct absences for the buildings assigned to them.
    media:
      src: /media/dorm/overview.png
      alt: Administrator overview with available beds, occupancy by building and recent absences
  - kicker: Allocation
    title: No overbooking, no deadlocks.
    body: Check-ins, transfers and policy changes lock rows in one fixed order — student, rooms, then building — so two requests for the last bed cannot both succeed, and the paths cannot deadlock. Buildings can be mixed, female-only or male-only, and only rooms that fit the student are offered.
    media:
      src: /media/dorm/room-allocation.png
      alt: Rooms table showing each room's allocation by building policy
  - kicker: History
    title: Every change on the record.
    body: A transfer closes one stay and opens the next in a single transaction, so a failed transfer leaves the original assignment untouched. Absence corrections and withdrawals keep who changed what and when, and calendar days follow the residence's time zone.
    media:
      src: /media/dorm/staff-absences.png
      alt: Staff absence log with a corrected record and a withdrawn record
  - kicker: Delivery
    title: Verified at every level.
    body: Integration tests run on H2 and, through Testcontainers, on MySQL 8.4, behind a coverage gate and an OpenAPI contract test. Playwright drives the packaged application, CI deploys the Docker Compose stack and smoke-tests it, and releases publish the image automatically. Session sign-in with CSRF protection, BCrypt and per-building scope checks guard the data.
    media:
      src: /media/dorm/student-housing.png
      alt: Student table with housing status and filters
---
