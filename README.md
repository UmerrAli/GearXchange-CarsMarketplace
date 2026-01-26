# GearXchange - Cars Marketplace

GearXchange is a modern web application designed solely for buying and selling used cars. It provides a seamless experience for users to browse listings, view detailed car information, and post their own ads.

## Features

- **Browse & Search:** Easily search for cars by make, city, price range, and more.
- **Detailed Listings:** View comprehensive details for each car, including specifications, features, and high-quality images.
- **User Authentication:** Secure sign-up and login functionality powered by Supabase.
- **Ad Management:** Users can post new ads with images and manage their listings via their profile.
- **Responsive Design:** Fully responsive interface built with Tailwind CSS, ensuring a great experience on both desktop and mobile devices.
- **Modern UI:** A polished user interface using Shadcn UI components.

## Live Demo

Check out the live application here: [Live Site Link](https://gear-xchange-cars-marketplace.vercel.app/)

## 🛠️ Tech Stack

- **Frontend:** React 
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Routing:** React Router DOM
- **Backend / Database:** Supabase (Auth, Database, Storage)

## How to Run Locally

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/GearXchange-CarsMarketplace.git
    cd GearXchange-CarsMarketplace
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**

    Create a `.env.local` file in the root directory and add your Supabase credentials. You need a Supabase project set up for this.

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build via Production

To create a production build:

```bash
npm run build
```

## 📄 License

This project is licensed under the MIT License.
