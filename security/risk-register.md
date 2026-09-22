# SpatialHunt Security Risk Register

## Purpose

This risk register records security risks identified during the initial cybersecurity assessment of the SpatialHunt application.

The register will be reviewed and updated as the backend, database, authentication system and APIs become available.

---

## Risk Rating

| Rating | Meaning |
|---|---|
| Critical | Could result in severe compromise, major data exposure or administrative takeover |
| High | Could cause significant security, privacy or business impact |
| Medium | Could cause moderate impact or requires additional controls |
| Low | Limited impact but should still be monitored |

---

## Security Risk Register

| ID | Risk | Affected Area | Likelihood | Impact | Risk Level | Recommended Mitigation | Status |
|---|---|---|---|---|---|---|---|
| RISK-001 | Unauthorized access to user accounts | Authentication | Medium | High | High | Strong authentication, secure password hashing, session protection and rate limiting | Open |
| RISK-002 | Broken access control allows users to access unauthorized functions | Authorization/RBAC | Medium | Critical | Critical | Implement server-side RBAC and resource ownership checks | Open |
| RISK-003 | Sensitive personal information is exposed | User Data | Medium | High | High | Apply least privilege, access controls and encryption | Open |
| RISK-004 | Malicious file uploaded through property/document upload functionality | File Uploads | Medium | High | High | Validate file type and size, scan uploads and restrict executable content | Open |
| RISK-005 | API endpoints are accessible without proper authorization | API | Medium | Critical | Critical | Require authentication and authorization for protected endpoints | Open |
| RISK-006 | User input is not properly validated | Web Application/API | Medium | High | High | Apply server-side input validation and output encoding | Open |
| RISK-007 | Excessive requests affect application availability | Web/API | Medium | High | High | Implement rate limiting and monitoring | Open |
| RISK-008 | Sensitive information is accidentally exposed through errors or API responses | Application/API | Medium | High | High | Use safe error messages and review API responses | Open |
| RISK-009 | Payment integration exposes sensitive payment information | Payment System | Low/Medium | Critical | High | Use a trusted payment provider and avoid storing sensitive card data unnecessarily | Open |
| RISK-010 | Security events cannot be investigated due to insufficient logging | Monitoring | Medium | Medium | Medium | Implement security-relevant audit logging and monitoring | Open |
| RISK-011 | Secrets or credentials are accidentally committed to the repository | Source Code | Low/Medium | Critical | High | Use environment variables, secret scanning and `.gitignore` protections | Open |
| RISK-012 | Privilege escalation from normal user to landlord/admin | User Roles | Medium | Critical | Critical | En
