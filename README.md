# RELIGHT

RELIGHT is a sophisticated web application designed for sharing and viewing digital light novels. This platform provides a seamless reading experience by integrating modern web technologies with a robust backend architecture, ensuring efficient document management and secure user interactions.

## Project Overview

The primary objective of RELIGHT is to offer a centralized platform where users can manage and share their digital light novel collections. The application emphasizes performance and security, utilizing a decoupled architecture with a React-based frontend and a Django REST Framework backend.

**API Repository:** [kkumber/relight-api](https://github.com/kkumber/relight-api)

## Key Technical Features

*   **Secure Authentication:** Developed a secure REST API utilizing Django REST Framework and JWT (JSON Web Tokens) to manage user sessions and protect private resources.
*   **Native Document Viewing:** Integrated PDF.js to provide a native, high-performance document viewing experience directly within the browser, eliminating the need for external plugins.
*   **Advanced Search and Indexing:** Implemented a comprehensive search system that allows users to quickly locate and organize resources across large digital libraries.
*   **Optimized Asset Management:** Utilized Cloudinary for reliable storage and optimized delivery of digital assets, ensuring fast load times and efficient media handling.
*   **Responsive and Interactive UI:** Built with React and TypeScript, the frontend features a responsive design and interactive components for an enhanced user experience.

## Technical Stack

### Frontend
*   **React:** For building a dynamic and responsive user interface.
*   **TypeScript:** Ensuring type safety and maintainability across the codebase.
*   **PDF.js:** For high-fidelity document rendering in the browser.
*   **Tailwind CSS:** For modern, utility-first styling.
*   **Axios:** For streamlined communication with the backend API.

### Backend
*   **Django / Django REST Framework:** A robust Python framework for building the scalable REST API.
*   **JWT (JSON Web Token):** For secure, stateless user authentication.
*   **Cloudinary:** For cloud-based media management and optimized asset delivery.
*   **PostgreSQL:** A powerful, open-source relational database for reliable data storage.

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/kkumber/relight-frontend.git
    cd relight-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env` file in the root directory and add your API base URL:
    ```env
    VITE_API_BASE_URL=your_api_url
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```