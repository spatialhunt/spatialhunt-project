# SpatialHunt Access Control Matrix

## Purpose

This document defines the recommended access permissions for different user roles within the SpatialHunt application.

The objective is to ensure that users can only access the resources and functions required for their role.

Access control should be enforced on the backend/server side and not only through frontend interface restrictions.

---

## User Roles

The initial security model considers the following roles:

- Tenant/User
- Landlord/Property Owner
- Administrator

---

## Access Control Matrix

| Resource / Action | Tenant/User | Landlord | Administrator |
|---|---:|---:|---:|
| View public property listings | Allow | Allow | Allow |
| Search properties | Allow | Allow | Allow |
| Create account | Allow | Allow | Controlled |
| Manage own profile | Allow | Allow | Allow |
| View own documents | Allow | Allow | Allow |
| Upload permitted documents | Allow | Allow | Allow |
| Create property listing | Deny | Allow | Allow |
| Edit own property listing | Deny | Allow | Allow |
| Delete own property listing | Deny | Allow | Allow |
| Edit another user's listing | Deny | Deny | Allow |
| View another user's private information | Deny | Deny | Controlled |
| Manage own account | Allow | Allow | Allow |
| Manage other user accounts | Deny | Deny | Allow |
| Manage user roles | Deny | Deny | Allow |
| Review security logs | Deny | Deny | Allow |
| Manage system settings | Deny | Deny | Allow |
| Access administrative functions | Deny | Deny | Allow |

---

## Access Control Principles

### 1. Least Privilege

Users should receive only the permissions necessary to perform their intended activities.

For example, a tenant should not receive permission to modify another user's property listing.

### 2. Deny by Default

Access should be denied unless the user has explicitly been granted permission.

### 3. Server-Side Authorization

Security controls must be enforced on the backend.

Hiding a button or page in the frontend is not sufficient protection because users can directly send requests to backend endpoints.

### 4. Resource Ownership

Users should only be able to modify resources they own unless they have an authorized administrative role.

For example:

```text
Tenant A → Cannot edit Tenant B's profile
Landlord A → Cannot edit Landlord B's property
Admin → Can manage authorized administrative resources
