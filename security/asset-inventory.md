# SpatialHunt Asset Inventory

## Purpose

This document identifies the key assets that require protection within the SpatialHunt application.

The inventory will be updated as the backend, database, authentication services and other infrastructure components become available.

## Asset Inventory

| Asset ID | Asset | Type | Location | Criticality | CIA Impact | Security Considerations |
|---|---|---|---|---|---|---|
| AST-001 | SpatialHunt Web Application | Web Application | Cloud | High | High | Protect against web application vulnerabilities and unauthorized access |
| AST-002 | User Accounts | Identity/Data | Application | High | High | Authentication, password protection, session security and account recovery |
| AST-003 | User Personal Information | Data | Database | High | High | Protect PII from unauthorized access or disclosure |
| AST-004 | Property Listings | Application Data | Database | Medium | Medium | Prevent unauthorized modification or deletion |
| AST-005 | Property Images | Files/Media | Cloud Storage | Medium | Medium | Validate uploads and restrict malicious file types |
| AST-006 | User Documents | Sensitive Data | Cloud Storage/Database | High | High | Access control, encryption and secure file handling |
| AST-007 | Authentication/API Endpoints | API | Backend | High | High | Authentication, authorization, rate limiting and input validation |
| AST-008 | Payment Information | Sensitive Data | Payment Service | Critical | High | Use secure payment provider integration and avoid storing sensitive card data |
| AST-009 | Application Source Code | Source Code | GitHub | High | High | Access control, secret protection and code review |
| AST-010 | Security Logs | Monitoring Data | Backend/Cloud | Medium | High | Prevent unauthorized modification and protect sensitive log information |

## Key Assets Requiring Priority Protection

The following assets should receive the highest security priority:

1. User accounts and authentication data
2. Personal information
3. User-uploaded documents
4. Backend/API endpoints
5. Payment-related information
6. Application source code

## Security Priorities

### Confidentiality

Prevent unauthorized access to:

- Personal information
- User documents
- Authentication information
- Payment-related information
- Security logs

### Integrity

Prevent unauthorized modification of:

- User accounts
- Property listings
- User documents
- Application configuration
- Security records

### Availability

Ensure that users can safely access:

- The SpatialHunt application
- Property listings
- Authentication services
- Required APIs

## Review Status

**Status:** Phase 1 — Initial Security Asset Inventory

This inventory is based on the currently available application structure. It should be reviewed and updated when the backend, database and infrastructure architecture are provided.

**Prepared by:** Esther Ebube Cosmas  
**Role:** Cybersecurity Analyst — SpatialHunt
