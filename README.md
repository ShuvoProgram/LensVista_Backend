![Logo](./github/logo.png)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


# Lens Vista

LensVista skillfully captures moments! 📸 We specialize in providing expert photography services for events, portraits, and special occasions. 🌟 Allow us to elegantly frame your cherished memories. #PreserveMoments

# Demo

![Project Screenshot](./github/images/LensVista.png)

<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Role based](#role_based)
- [Project Features](#project_features)
- [Tech Stack](#tech_stack)
- [Authors](#authors)

</details>

# Role_based

| Role                | Credential
|-----------------------------------------|------------------------------------------------------|
| Admin               | Email: admin@gmail.com password: ********
| User                | Email: user@gmail.com password: 123456

# Entity-Relationship Diagram (ERD)

+----------------+       +---------------+      +---------------+      +------------+
|      User      |       |    Booking    |      |    Service    |      |   Review   |
+----------------+       +---------------+      +---------------+      +------------+
| id: Int        |       | id: Int       |      | id: Int       |      | id: Int    |
| role: String   |1      | userId: Int   |      | title: String |      | userId: Int|
| name: String   |-------| serviceId: Int|      | banner: Str   |------| serviceId: |
| email: String  |       | bookingInfo: J|      | isBooked: Boo |      | message: St|
| password: Str  |       | status: Str   |      | description:  |      | rating: Str|
| location: Str? |       | createdAt: Dat|      | category: Str |      | createdAt: |
| phone: Str?    |       | updatedAt: Dat|      | price: Float  |      | updatedAt: |
| profileImage: S|       +---------------+      | availabilit: B|      +------------+
| createdAt: Dat |                              | createdAt: Dat|
| updatedAt: Dat |                              | updatedAt: Dat|
+----------------+                              +---------------+
         |                                                |
         |                                                |
         v                                                v
+----------------+                               +----------------+
|   Feedback     |                               |      FAQ       |
+----------------+                               +----------------+
| id: Int        |                               | id: Int        |
| email: String  |                               | title: String  |
| message: Str   |                               | content: String|
| createdAt: Dat |                               | createdAt: Dat |
| updatedAt: Dat |                               | updatedAt: Dat |
+----------------+                               +----------------+
         |
         v
+----------------+
|      News      |
+----------------+
| id: Int        |
| title: String  |
| content: String|
| contentType: S |
| banner: String?|
| createdAt: Dat |
| updatedAt: Dat |
+----------------+


# Project_Features

## User Management

- **User Authentication:** Secure user authentication for creating accounts and logging in.

- **User Profile Management:** Users can easily manage their profiles, including personal information and preferences.

## Event Booking

- **Event Booking System:** Users can book events seamlessly, providing a convenient way to participate in various activities.

- **Booking Tracking:** Users have the ability to track and manage their booked events in one central location.

- **Event Reviews:** Users can leave reviews for events they attended, contributing to a feedback system.

## Admin Panel

- **Admin Profile Management:** Admins have control over their profiles, ensuring accurate and up-to-date information.

- **Event Management:**
  - Create New Event: Admins can add new events to the system.
  - Update Existing Event: Modify details of existing events.
  - Delete Event: Remove outdated or canceled events from the platform.

- **Customer Booking Management:**
  - Accept Bookings: Admins can approve customer bookings.
  - Cancel Bookings: Admins have the ability to cancel bookings as necessary.

- **News and FAQ Management:**
  - News Updates: Admins can post and manage news updates.
  - FAQ Management: Admins can add, edit, or remove frequently asked questions.

