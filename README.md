# AssetKu - Personal Asset Tracker

![Open Source](https://img.shields.io/badge/Open%20Source-Yes-green)
![Built With](https://img.shields.io/badge/Built%20With-Google%20Antigravity%20Gemini%203%20Pro-blue)

AssetKu is an open-source personal asset tracking application designed to help you monitor your portfolio's performance in real-time. Whether you hold stocks, crypto, or other assets, AssetKu provides a unified view of your net worth with beautiful visualizations.

**Built with the power of Google Antigravity Gemini 3 Pro.**

## 📸 Screenshots

![Dashboard Screenshot](placeholder-dashboard.png)

## ✨ Features

*   **Asset Tracking**: Monitor stocks, cryptocurrencies, and other assets in one place (Real-time soon).
*   **Multi-Currency Support**: Automatically converts USD assets to IDR using real-time exchange rates (CurrencyFreaks API).
*   **Intra-day Portfolio History**: Tracks every change in your portfolio value throughout the day, providing granular history charts.
*   **Interactive Charts**:
    *   **Portfolio Value**: Visualize your net worth growth over time.
    *   **Asset Allocation**: See exactly how your portfolio is diversified.
*   **PWA Support**: Install AssetKu as a native app on your desktop or mobile device for offline access and a premium experience.
*   **Timezone Aware**: Optimized for UTC+7 (WIB) to ensure accurate daily tracking and greetings.
*   **Beautiful UI**: A modern, dark-themed interface built for clarity and aesthetics.

## 🛠️ Tech Stack

*   **Frontend**: React, TypeScript, Vite
*   **Styling**: Tailwind CSS v4
*   **Backend / Database**: Supabase
*   **Visualization**: Chart.js, React-Chartjs-2
*   **State Management**: React Hooks
*   **APIs**: CurrencyFreaks (Exchange Rates)

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ZumaAkbarID/assetku.git
    cd assetku
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your keys:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_CURRENCY_API_KEY=your_currency_api_key
    VITE_TIMEZONE_OFFSET=7
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
