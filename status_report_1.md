# Status Report — CloudBurst (Sprint 2)

**Team Members**
- **Smeet Nagda** — snagda
- **Jinish Shah** — jrshah6
- **Nisarg Jasani** — nhjsani

---

## Accomplishments

### **Nisarg Jasani — Ansible Linting & Infrastructure CI**
- Set up Continuous Integration (CI) for infrastructure linting and syntax validation, ensuring early failure detection and uniform coding standards across Ansible configurations.
- Created and hardened the base Ansible playbook used for server bootstrapping. This included installing Node.js 20, NGINX, Curl, and Build-Essential, and ensuring NGINX service enablement with restart handlers.
- Integrated strict linting and validation workflows (ansible-lint, yamllint, syntax checks) under .github/workflows/release-lint-ansible.yaml, triggered on PRs to main, dev, and release/**.
- Uploaded lint reports as build artifacts for traceability and quality assurance.

### **Jinish Shah — CI Checks, Docker Push, and Branch Protection**
- Implemented automated CI pipelines to test, build, and push Docker images to Docker Hub upon merges to release branches.
- Developed .github/workflows/ci-checks.yml for Node-based app testing and .github/workflows/docker-push.yml for Docker publishing.
- Configured Docker Hub login using repository secrets and established tagging conventions (latest, semantic versions, and commit SHAs).
- Created branch protection rules requiring CI checks and PR reviews before merges.
- Documented CI secret management procedures and pinned action versions.

### **Smeet Nagda — Kubernetes Deployment, Scaling & Repo Administration**
- Deployed the built Docker image to a Kubernetes cluster using a unified cloudburst.yaml manifest defining Deployment, Service, HPA, and optional PVC.
- Configured namespace isolation (cloudburst), integrated Docker registry credentials, and implemented health checks (livenessProbe, readinessProbe).
- Exposed the service using LoadBalancer (via minikube tunnel) and validated auto-scaling with metrics-server integration.
- Established CPU/memory thresholds and HPA targeting 70% CPU utilization with a replica range of 2–10.
- Set up a project dashboard to monitor PRs, CI runs, releases, and deployments.

---

## Pipeline Overview

1. **Pull Request Stage**
   - Triggered on PRs to main or release/**.
   - Runs Node.js app tests and Ansible linting workflows.
   - Protected by branch rules requiring all checks to pass.

2. **Release Stage**
   - Merge to release branch triggers Docker build and push to Docker Hub.
   - Uses semantic and SHA-based tagging for traceability.

3. **Deployment Stage**
   - Kubernetes manifests applied to cloudburst namespace using pinned image tags.
   - LoadBalancer and HPA handle scaling and traffic balancing.

---

## Sprint Retrospective

### **What Worked Well**
- CI/CD automation prevented regressions via linting and syntax enforcement on every PR.
- Docker image publishing and tagging produced reproducible builds and reduced manual intervention.
- Kubernetes deployment validated end-to-end integration with load balancing and scaling.
- Collaboration improved through standardized branch protection and documentation.

### **What Didn’t Work**
- Occasional Ansible test failures due to missing inventory path configuration.
- Docker builds initially slow due to lack of caching and concurrent build handling.
- Minikube LoadBalancer required a persistent terminal session.

### **What improvements can be done**
- Automate namespace and secret provisioning in Ansible to reduce manual Kubernetes setup.
- Add caching and concurrency strategies to speed up Docker builds.
- Document and test teardown workflows for better reproducibility.

---

## Next Steps

### **Nisarg**
- Implement GitHub Actions workflows (burst.yml, unburst.yml) for automated cloud-bursting and rollback on alert triggers.
- Develop webhook integration between Alertmanager or CloudWatch and GitHub Actions for dynamic scaling.
- Write and test ECS/EKS scaling scripts handling upscaling and downscaling based on CPU thresholds.

### **Jinish**
- Configure Prometheus + Alertmanager or CloudWatch Alarms to collect metrics and generate scaling alerts.
- Implement webhook receiver for parsing alerts and forwarding parameters to Actions.
- Integrate NGINX reverse proxy or AWS ALB for dynamic backend registration between on-prem and cloud.

### **Smeet**
- Extend Ansible playbook for production deployment (staging and prod environments).
- Integrate burst/unburst workflows into the CI/CD chain for unified orchestration.
- Transition Kubernetes deployment from Minikube to AWS EKS or ECS Fargate for realistic scalability.

---

## Summary
The **CloudBurst** project has achieved an end-to-end automated CI/CD pipeline with:
- Ansible-based infrastructure validation,
- Docker-based build and publish workflows, and
- Kubernetes-managed deployment and scaling.
