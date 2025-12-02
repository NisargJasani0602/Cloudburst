# ☕ First Week Sprint Plan — Hybrid Cloud-Bursting for Coffee-Project

## 🎯 Sprint Goal
Set up the foundational DevOps pipeline components to enable automated builds, testing, and deployment for the hybrid cloud-bursting system described in the proposal.


## ✅ To-Do Checklist (Week 1 Tasks)

| # | Task | Description | Assigned To | Status |
|---|------|--------------|-------------|--------|
| 1 | 🧱 **Initialize Repository & Project** | Create GitHub repository, add `coffee-project` code, configure main & release branches, and link to the new Project board. | **Jinish Shah** | ☐ |
| 2 | 🧾 **Set Up GitHub Project Board** | Create a Kanban-style project under the repo, add columns for *To-Do*, *In Progress*, *Done*, and connect issues/tasks. | **Smeet Nagda** | ☐ |
| 3 | 🔍 **Implement Linting Workflow** | Add a GitHub Actions workflow (`ci.yml`) to run language-appropriate lint checks on every PR. | **Nisarg Jasani** | ☐ |
| 4 | 🧪 **Add Testing Workflow** | Extend CI workflow to include test matrix (e.g., Jest/Pytest) with status checks required before merge. | **Smeet Nagda** | ☐ |
| 5 | 🚀 **Create Ansible Deployment Playbook** | Write a basic playbook to deploy a Docker container to the on-prem server (mock for now). | **Jinish Shah** | ☐ |
| 6 | 🐋 **Build and Push Docker Image** | Set up a GitHub Action to build and push the Docker image to GHCR with appropriate tags (`:sha`, `:release`). | **Nisarg Jasani** | ☐ |
| 7 | 🌐 **Configure Branch Protection Rules** | Enforce PR reviews, passing checks, and restricted release branch merges. | **Smeet Nagda** | ☐ |
| 8 | 🩺 **Draft Monitoring & Webhook Plan** | Define how Prometheus or CloudWatch metrics will trigger GitHub Actions “burst” workflow. | **Jinish Shah** | ☐ |

---

## 📆 End-of-Week Deliverables
- Functional GitHub Actions pipeline (`ci.yml`, `cd-release.yml` placeholders).
- Basic Ansible playbook committed to `ansible/`.
- Docker image builds and pushes successfully to GHCR.
- Project board linked and showing progress for all Week 1 tasks.

---

## 👥 Team Members
- **Smeet Nagda**
- **Jinish Shah**
- **Nisarg Jasani**

---

🕒 *Sprint Duration:* Week 1 — Initial setup and CI/CD foundation.
💬 *Next Sprint Focus:* Monitoring integration and hybrid burst automation trigger.
