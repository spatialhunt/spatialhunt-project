# SpatialHunt Security Testing Checklist

## Purpose

This checklist defines the security tests that should be performed on the SpatialHunt application.

The objective is to identify security weaknesses before production deployment and verify that security controls are working as expected.

Testing must only be performed against authorized development or test environments.

---

## 1. Authentication Testing

- [ ] Verify that users can securely register accounts
- [ ] Verify password requirements are enforced
- [ ] Verify passwords are securely hashed
- [ ] Verify login requires valid credentials
- [ ] Test invalid login attempts
- [ ] Test protection against brute-force attacks
- [ ] Verify login rate limiting
- [ ] Test password reset functionality
- [ ] Verify password reset tokens expire appropriately
- [ ] Verify user sessions are securely managed
- [ ] Verify logout invalidates the session
- [ ] Test session timeout where applicable

---

## 2. Authorization and RBAC Testing

### Tenant/User

- [ ] Verify tenant users cannot access landlord functions
- [ ] Verify tenant users cannot access admin functions
- [ ] Verify users cannot modify another user's profile
- [ ] Verify users cannot access another user's private documents
- [ ] Verify users can only modify resources they own

### Landlord

- [ ] Verify landlords can manage their own properties
- [ ] Verify landlords cannot modify another landlord's properties
- [ ] Verify landlords cannot access admin-only functions
- [ ] Verify landlords cannot manage other user accounts

### Administrator

- [ ] Verify authorized administrators can access administrative functions
- [ ] Verify administrative actions are logged
- [ ] Verify sensitive administrative operations require appropriate authorization

---

## 3. API Security Testing

When backend APIs are available:

- [ ] Identify all API endpoints
- [ ] Verify protected endpoints require authentication
- [ ] Test unauthorized requests
- [ ] Test access using an invalid or expired session
- [ ] Test access-control enforcement
- [ ] Test resource ownership validation
- [ ] Test for IDOR/BOLA vulnerabilities
- [ ] Test input validation
- [ ] Test API rate limiting
- [ ] Test request-size limits
- [ ] Check API responses for sensitive information
- [ ] Check error responses for information leakage

---

## 4. Input Validation Testing

Test all user-controlled input fields.

- [ ] Test registration fields
- [ ] Test login fields
- [ ] Test property listing fields
- [ ] Test search fields
- [ ] Test profile fields
- [ ] Test document metadata
- [ ] Test API parameters

Check for:

- [ ] SQL injection
- [ ] Cross-Site Scripting (XSS)
- [ ] Command injection
- [ ] Malicious input
- [ ] Unexpected data types
- [ ] Excessively long input
- [ ] Invalid characters

---

## 5. File Upload Testing

For property images and user documents:

- [ ] Test allowed file types
- [ ] Test disallowed file types
- [ ] Test oversized files
- [ ] Test files with misleading extensions
- [ ] Verify file names are handled safely
- [ ] Verify uploaded files cannot execute as code
- [ ] Verify private documents require authorization
- [ ] Verify users cannot access another user's files
- [ ] Verify malware scanning where implemented

---

## 6. Sensitive Data Testing

- [ ] Verify HTTPS/TLS is used
- [ ] Check that passwords are never exposed
- [ ] Check that authentication tokens are protected
- [ ] Check API responses for unnecessary personal information
- [ ] Check browser storage for sensitive information
- [ ] Check logs for sensitive information
- [ ] Verify private documents are protected
- [ ] Verify sensitive data is accessible only to authorized users

---

## 7. Security Configuration Testing

- [ ] Review security headers
- [ ] Check Content Security Policy where applicable
- [ ] Check HSTS configuration
- [ ] Check secure cookie settings
- [ ] Check error handling
- [ ] Check production configuration
- [ ] Verify debug information is not exposed in production
- [ ] Verify secrets are stored securely

---

## 8. Dependency Security

- [ ] Review project dependencies
- [ ] Run dependency vulnerability checks
- [ ] Identify outdated packages
- [ ] Review high-severity dependency vulnerabilities
- [ ] Update vulnerable dependencies where appropriate
- [ ] Review third-party packages before adding them

---

## 9. GitHub and Source-Code Security

- [ ] Check for accidentally committed secrets
- [ ] Review repository permissions
- [ ] Review pull requests before merging
- [ ] Review security-sensitive code changes
- [ ] Use environment variables for secrets
- [ ] Verify `.env` files are not committed
- [ ] Enable secret scanning where available
- [ ] Review dependency alerts

---

## 10. Rate Limiting and Abuse Testing

- [ ] Test repeated login attempts
- [ ] Test repeated API requests
- [ ] Test repeated registration attempts
- [ ] Test excessive file uploads
- [ ] Verify rate limits are enforced
- [ ] Verify suspicious activity can be detected

---

## 11. Security Logging

Verify that important security events are recorded.

- [ ] Successful login
- [ ] Failed login
- [ ] Password changes
- [ ] Permission changes
- [ ] Administrative actions
- [ ] Important property changes
- [ ] Sensitive document actions
- [ ] Suspicious activity

Ensure:

- [ ] Logs do not contain passwords
- [ ] Logs do not contain authentication tokens
- [ ] Logs are protected from unauthorized modification
- [ ] Logs contain useful timestamps

---

## 12. Vulnerability Management

For every confirmed security issue:

1. [ ] Document the vulnerability
2. [ ] Determine severity
3. [ ] Identify affected component
4. [ ] Recommend a mitigation
5. [ ] Implement the fix
6. [ ] Retest the vulnerability
7. [ ] Record the final status

---

## Security Testing Status

| Testing Area | Status |
|---|---|
| Authentication | Pending backend |
| Authorization/RBAC | Design completed |
| API Security | Pending backend |
| Input Validation | Pending implementation review |
| File Upload Security | Pending implementation review |
| Sensitive Data Protection | Pending backend |
| Security Configuration | Pending deployment review |
| Dependency Security | To be reviewed |
| GitHub Security | In progress |
| Security Logging | Pending backend |

---

## Testing Evidence

Security testing evidence should be collected when testing begins.

Possible evidence includes:

- Screenshots
- Test results
- Vulnerability reports
- API responses
- Security scan results
- GitHub security alerts
- Before-and-after screenshots
- Retest results

Sensitive information must be removed or redacted before evidence is shared.

---

## Current Assessment Status

**Phase:** 1 — Security Baseline

**Status:** Security testing checklist prepared

The checklist will be updated as the backend, APIs, database and deployment environment become available.

**Prepared by:** Esther Ebube Cosmas  
**Role:** Cybersecurity Analyst — SpatialHunt
