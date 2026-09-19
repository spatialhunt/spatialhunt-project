# SpatialHunt Threat Model

## Purpose

This threat model identifies potential security threats affecting the SpatialHunt application and its users.

The STRIDE methodology is used to organize threats across the application's authentication, property listings, user data, documents, APIs and administrative functions.

## Scope

The current assessment focuses on the application features visible in the available SpatialHunt frontend.

Backend APIs, database infrastructure, authentication implementation and third-party services will be reviewed and updated when their implementation becomes available.

---

## STRIDE Threat Analysis

| Threat Category | Potential Threat | Affected Area | Risk | Recommended Control |
|---|---|---|---|---|
| Spoofing | An attacker gains access to another user's account | Login/User accounts | High | Strong authentication, secure password storage, MFA where appropriate, secure sessions |
| Tampering | Unauthorized modification of property listings | Property management | High | Authorization checks, input validation and audit logging |
| Repudiation | A user denies performing a sensitive action | Accounts/Transactions | Medium | Security logging and audit trails |
| Information Disclosure | Personal information is exposed to unauthorized users | User data | High | Access controls, encryption and least-privilege permissions |
| Denial of Service | Excessive requests make the application unavailable | Web/API | High | Rate limiting, request validation and monitoring |
| Elevation of Privilege | A normal user accesses landlord or admin functions | User roles | Critical | Server-side RBAC and authorization checks |

---

## 1. Spoofing

### Threat

An attacker may attempt to impersonate a legitimate SpatialHunt user by obtaining credentials or exploiting weaknesses in authentication or session management.

### Potential Impact

- Unauthorized account access
- Exposure of personal information
- Unauthorized property management
- Fraudulent activity

### Recommended Controls

- Secure password hashing
- Strong authentication requirements
- Secure session management
- Multi-factor authentication where appropriate
- Login rate limiting
- Account recovery protection
- Avoid exposing authentication tokens in client-side storage where inappropriate

---

## 2. Tampering

### Threat

An unauthorized user may attempt to modify property information, account information or other application data.

### Potential Impact

- False property information
- Financial or reputational damage
- Loss or corruption of application data

### Recommended Controls

- Server-side authorization
- Input validation
- Ownership checks
- Database access controls
- Audit logging
- Secure API design

---

## 3. Repudiation

### Threat

A user may deny performing an important action if the application does not maintain adequate security logs.

### Examples

- Changing property information
- Uploading or deleting a document
- Changing account information
- Performing a sensitive transaction

### Recommended Controls

- Maintain security-relevant audit logs
- Record user ID and action
- Record timestamp
- Protect logs from unauthorized modification
- Avoid storing unnecessary sensitive information in logs

---

## 4. Information Disclosure

### Threat

Sensitive user or application information may be exposed to unauthorized users.

### Potential Sensitive Information

- Names and contact information
- User account information
- Uploaded documents
- Property-related information
- Authentication information
- Payment-related information

### Recommended Controls

- Role-based access control
- Least-privilege access
- Encryption in transit
- Encryption at rest where appropriate
- Secure file access
- Input and output validation
- Avoid exposing sensitive information through API responses

---

## 5. Denial of Service

### Threat

An attacker may send excessive requests to the application or APIs in an attempt to make services unavailable.

### Potential Impact

- Slow application performance
- Service disruption
- Increased infrastructure costs
- Users being unable to access properties

### Recommended Controls

- Rate limiting
- Request size limits
- Input validation
- Monitoring and alerting
- Infrastructure-level protection
- Abuse detection

---

## 6. Elevation of Privilege

### Threat

A low-privileged user may attempt to access functions intended for landlords or administrators.

### Example

A tenant attempts to access an administrative endpoint
