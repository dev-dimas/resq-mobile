# Resq Mobile

<p align="center">
<img src="https://github.com/dev-dimas/resq-mobile/blob/master/assets/images/logo.png?raw=true" width="200" height="200" />
</p>
<p align="center">
<img src="https://github.com/dev-dimas/resq-mobile/blob/master/assets/images/feature-graphic.png?raw=true" style="padding-bottom: 15px" />
</p>

Welcome to the Resq Backend repository! This project contains the code for the Resq Mobile App, a platform dedicated to connecting leftover food sellers with potential buyers. Leftover food refers to items that need to be sold quickly as they are nearing their expiration date. In a world where food waste is a pressing issue, Resq provides an innovative solution to reduce waste by making leftover food accessible to those nearby, while also benefiting both sellers and buyers.

## Table of Contents

1. [Introduction](#introduction)

2. [Features](#features)

3. [Tech Stack](#tech-stack)

4. [Installation](#installation)

5. [Configuration](#configuration)

6. [Usage](#usage)

7. [Haversine Formula](#haversine-formula)

## Introduction

Resq is a service that bridges the gap between leftover food sellers and buyers. By utilizing geolocation and the Haversine formula, Resq allows users to find leftover food within a 25 km radius. This not only helps in reducing food waste but also offers a cost-effective option for consumers.

Resq Mobile app are built using cutting-edge and reliable technologies, including Expo, Tanstack React Query, and Flash List. This combination ensures the application is both efficient, scalable, and delivering optimal performance.

## Features

- 📌 Mapbox Integration: Seller and buyer can set their locations on an interactive map.

- 🌏 Geolocation-Based Search: Computes the distance between sellers and buyers to ensure only those within a 25 km radius are displayed.

- ✅ Interactive Forms: Manages forms with strict data validation.

- ⚙️ Simple State Management: Handles app state efficiently with a lightweight approach.

- 🧑‍💻 Code Quality: Ensure clean and consistent code with Prettier and ESLint.

- ⚡ Performance List: Presents food listings with high performance and responsiveness.

## Tech Stack

- Expo: React Native framework for efficient and easy mobile app development.
- Flash List: Component for displaying lists with high performance.
- Mapbox: Mapping platform that provides customizable maps with relevant data.
- Nativewind: Tailwind CSS-based utility for styling in React Native applications.
- Tanstack React Query: Tool for managing asynchronous data with caching and efficient data fetching.
- React Hook Form: Library for high-performance form management with a clean API.
- Eslint: Linting tool to ensure code quality and consistency.
- Prettier: Automated code formatting tool to maintain consistent code style.
- Zod: TypeScript-first schema declaration and validation library.
- Zustand: High-performance state management library for React.

## Installation

To get started with Resq Backend, follow these steps:

1. Clone the repository

```bash
git  clone  https://github.com/dev-dimas/resq-mobile.git
```

```bash
cd  resq-mobile
```

2. Install dependencies

```bash
npm  install
```

3. Set up your environment variables:

   Copy `.env.example` to `.env` and fill in your configuration details.

4. Create prebuild:

```bash
expo prebuild --clean
```

5. Start within Development mode:

```bash
npm run android
```

or

```bash
npm run ios
```

Note: The application must be run in development mode and cannot be run in Expo Go mode. This is due to the use of Mapbox which requires the application to run in development mode.

## Configuration

The application requires several environment variables to function properly. Below is a list of the key variables you need to set up in your .env file:

- `EXPO_PUBLIC_API_URL`: The string of base api url
- `EXPO_PUBLIC_MAPBOX_PUBLIC`: Your Mapbox public key
- `MAPBOX_SECRET`: Your Mapbox secret key

## Usage

After setting up the environment and starting the server, you can interact with the app via emulator or physical devices.

Note : Expo Notifications are only available on physical devices. You can read more about Expo Notifications [here](https://docs.expo.dev/versions/latest/sdk/notifications/#usage).

## Haversine Formula

The Haversine formula is utilized in Resq to calculate the great-circle distance between two points on a sphere, given their longitudes and latitudes. This is particularly useful for determining the proximity of leftover food sellers to potential buyers within a defined radius (25 km). You can read more about haversine formula [here](https://en.wikipedia.org/wiki/Haversine_formula).
