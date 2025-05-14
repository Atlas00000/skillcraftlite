# Backend API Endpoints Reference

This file tracks all backend endpoints and their usage for the SkillCraft frontend. Update this file as new endpoints are added or changed.

---

## Courses
- **List all courses**
  - **Endpoint:** `/api/courses` (Next.js API route, returns mock data)
  - **Backend:** `GET /courses` (NestJS, supports skip, take, orderBy, category, level)
  - **Usage:** Homepage (featured courses), Courses List page

- **Get course by ID**
  - **Endpoint:** `/api/courses/[id]` (to be implemented)
  - **Backend:** `GET /courses/:id`
  - **Usage:** Course Detail page

- **Create course**
  - **Backend:** `POST /courses` (auth required)
  - **Usage:** Admin Dashboard (course creation)

- **Update course**
  - **Backend:** `PUT /courses/:id` (auth required)
  - **Usage:** Admin Dashboard (course editing)

- **Delete course**
  - **Backend:** `DELETE /courses/:id` (auth required)
  - **Usage:** Admin Dashboard (course deletion)

- **Enroll in course**
  - **Backend:** `POST /courses/:id/enroll` (auth required)
  - **Usage:** Course Detail page

- **Mark lesson as completed**
  - **Backend:** `POST /courses/lessons/:id/complete` (auth required)
  - **Usage:** Course Detail page

---

## Testimonials
- **Endpoint:** `/api/testimonials` (to be implemented)
- **Backend:** (to be implemented)
- **Usage:** Homepage, Testimonials page

---

## Stats
- **Endpoint:** `/api/stats` (to be implemented)
- **Backend:** (to be implemented)
- **Usage:** Homepage (stats bar)

---

## Other Endpoints
- Add more as needed for user, analytics, certificates, etc. 