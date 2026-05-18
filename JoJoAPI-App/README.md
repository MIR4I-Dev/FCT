# ✨ JoJo Stats Application

A full-stack project designed to showcase the statistics of Stands from *JoJo's Bizarre Adventure* in a stylish, clear, and modern way. Unlike traditional wikis, this project prioritizes visual experience and the readability of each Stand’s attributes.

## 🚀 Main Features

### 📊 Stand Visualization

* **Initial Catalog**: Displays the protagonists and antagonists from each part of the series.
* **Detailed Information**: Each card includes the Stand’s name, user, description, originating part, and a visual statistics panel (Power, Speed, Range, etc.).
* **Aesthetic Design**: An interface optimized to avoid confusing tables, making Stand Stats easier and more enjoyable to read.

### 🔍 Filters and Navigation

* **Part Filtering**: Allows users to filter Stands by the animated parts of the story (currently from *Stardust Crusaders* to *Stone Ocean*).
* **Real-Time Search**: Text input for quickly finding Stands by name.
* **Dynamic Sorting**: Checkbox to switch between ascending and descending order.
* **Numeric Pagination**: Smooth pagination system for uninterrupted navigation.

### 🔐 User System and Feedback

* **Hybrid Authentication**:

  * Local registration and login (Username/Password).
  * **Google OAuth2** integration for quick access.
* **Suggestions System**: Authenticated users can submit improvement suggestions for the platform.

## 🛠️ Tech Stack

* **Frontend**: [React](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/)
* **Backend**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
* **Database**: [MySQL](https://www.mysql.com/)
* **Authentication**: [Passport.js](https://www.passportjs.org/) (Google Strategy) + [JWT](https://jwt.io/) (Access & Refresh Tokens)

## 🗄️ Database Structure

The system currently contains three main tables:

1. `stands`: Stores the technical, descriptive, and statistical information for each entity.
2. `users`: Manages both local accounts and Google-linked profiles.
3. `submissions`: Collects suggestions submitted by the community.

## 🎨 Added Value

The core of this project is its **aesthetic approach**. While other websites rely on dense data tables, this project transforms those statistics into intuitive visual components, allowing any JoJo fan to instantly recognize a Stand’s potential at a glance.

---

Powered by the strength of a **Full-Stack-type Stand**.
