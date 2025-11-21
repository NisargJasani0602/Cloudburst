# Status Report — CloudBurst (Sprint 2)

_Team Members_

- _Smeet Nagda_ — snagda
- _Jinish Shah_ — jrshah6
- _Nisarg Jasani_ — nhjasani

---

## Accomplishments

### _Nisarg Jasani — Cloud-Bursting Workflows & VCL Scaling Automation_

- Implemented _burst.yml_ and _unburst.yml_ GitHub Actions workflows supporting automatic cloud-bursting and rollback based on alert triggers.
- Established preliminary _webhook integration_ between Prometheus Alertmanager / CloudWatch and GitHub Actions for dynamic scaling (partially complete; webhook validation and delivery stability still in progress).
- Developed and tested _scaling scripts for the VCL Kubernetes cluster_, enabling replica adjustments based on CPU utilization thresholds.
- Transitioned scaling logic from AWS ECS/EKS to the _NCSU VCL Kubernetes cluster_, reducing cost, minimizing AWS infrastructure overhead, and allowing direct kubectl-based scaling over 3–6 replicas depending on load.

### _Jinish Shah — Monitoring, Alerting & Webhook Receiver_

- Configured _Prometheus + Alertmanager_ (and optionally CloudWatch Alarms) to gather CPU metrics and generate scaling alerts aligned with CloudBurst’s thresholds.
- Built a _webhook receiver_ to parse Alertmanager payloads and trigger GitHub Actions workflows (currently partially operational due to callback and signature validation issues).
- Added structured logging and diagnostic visibility to support debugging of alert delivery, retry flows, and alert-to-action mapping.
- Updated alert rules to support the shift from AWS-based services to the NCSU VCL environment.

### _Smeet Nagda — Production Deployment & VCL Cluster Integration_

- Extended the _Ansible playbook_ to support staging and production environments with roles for services, deployment structure, and environment configuration.
- Integrated the _burst/unburst_ workflows into CI/CD to unify orchestration from alert → workflow → Kubernetes scaling operations.
- Migrated Kubernetes deployments from Minikube to the _VCL kubecluster_, enabling realistic horizontal scaling and stable multi-node replica management.
- Configured manifests and registry secrets for VCL compatibility and verified scaling between _3–6 replicas_ based on load.

---

## Pipeline Overview

1. _Pull Request Stage_

   - Triggered on PRs to main, dev, and release/\*\*.
   - Runs Node.js tests and Ansible linting (ansible-lint, yamllint, syntax checks).
   - Controlled by branch protection requiring all checks to pass prior to merging.

2. _Release Stage_

   - Merge to a release branch triggers Docker build and push to Docker Hub.
   - Images tagged with semantic versions and commit SHAs for traceability.

3. _Deployment Stage_
   - Kubernetes manifests deployed to the VCL cloudburst namespace.
   - HPA combined with scaling scripts manages replicas dynamically (3–6 replicas).
   - Cloud-bursting workflows (burst/unburst) influence expansions or rollbacks automatically.

---

## Sprint Retrospective

### _What Worked Well_

- Cloud-bursting workflows integrated successfully into the CI/CD pipeline.
- Prometheus + Alertmanager consistently generated CPU-based scaling alerts.
- Transitioning from AWS ECS/EKS to _NCSU VCL_ reduced cost, simplified setup, and avoided AWS provisioning overhead.
- Deployment on the VCL kubecluster validated realistic horizontal scaling behavior.
- Logging improvements and workflow-level traceability enhanced team collaboration.

### _What Didn’t Work_

- Webhook → GitHub Actions trigger pipeline is only partially functional due to unstable callback handling and missing signature validation.
- VCL CPU throttling produced occasional _false-positive_ scaling alerts.
- Early conflicts between HPA and custom scaling scripts required cooldown logic to avoid rapid scale oscillation.
- Mid-sprint shift away from AWS required reconfiguration and revalidation of deployment workflows.

### _What Improvements Can Be Done_

- Harden webhook validation and implement retry/deduplication to stabilize alert delivery.
- Automate provisioning of Kubernetes namespaces, secrets, and configs via Ansible.
- Improve monitoring noise reduction and alert suppression for VCL-specific CPU behavior.
- Add load-testing tools (k6, Locust) to simulate traffic and validate scaling/recovery.
- Improve Docker build caching and concurrency for faster CI execution.

---

## Next Steps

### _Nisarg_

- Finalize webhook-to-GitHub Actions integration with HMAC signature validation.
- Add memory-based trigger support and refine VCL scaling scripts.
- Strengthen rollback logic during burst failures or unstable conditions.

### _Jinish_

- Improve Alertmanager templates, payload formatting, and retry/backoff algorithms.
- Implement secure webhook authentication and signature verification.
- Enhance logging and metrics visibility for alert delivery and processing.

### _Smeet_

- Expand Ansible automation for provisioning cluster namespaces, secrets, and monitoring.
- Integrate prod-ready ingress, routing, and load balancing.
- Perform complete burst/unburst simulations on VCL to verify stability and responsiveness.

---

## Summary

The _CloudBurst Sprint 2_ phase delivered functional cloud-bursting automation, alert-driven scaling workflows, and a successful migration from AWS ECS/EKS to the _NCSU VCL Kubernetes cluster_, resulting in reduced cost, minimized setup overhead, and more realistic on-campus scalability testing. While webhook reliability remains a key area of improvement, the monitoring → alerting → scaling pipeline is now implemented, tested, and operational, forming a strong foundation for the final sprint.
