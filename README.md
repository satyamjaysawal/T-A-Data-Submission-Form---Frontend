

---

## Project Overview

The T&A Data Submission Form simplifies the tracking and submission of data for fabric and production requirements. Users can dynamically add multiple fabric sections, trims, accessories, and specific production details like color and quantity per fabric. The form also includes dropdown selections for process steps and allows for flexible customization based on different production requirements.

---

## Features

- **Dynamic Input Sections**: Users can add multiple sections for fabric, trims, and accessories.
- **Real-Time Validation**: Ensures correct input values for all form fields.
- **Date Selection**: Start and end date selection for project timelines.
- **Dropdown Selections**: Major fabric type, trims, accessories, and process stages can be selected from dropdowns.
- **Dynamic Forms**: Option to add more trims, accessories, and fabric sections as needed.
- **Responsive Design**: Built with Tailwind CSS for responsive and user-friendly design.

---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Flask
- **Database**: MongoDB
- **Icons**: Heroicons

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/satyamjaysawal/T-A-Data-Submission-Form---Frontend.git
   cd T-A-Data-Submission-Form---Frontend
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   pip install -r requirements.txt
   ```

4. **Start MongoDB** (Ensure MongoDB is running on your system)

5. **Start the Backend Server**
   ```bash
   cd server
   python app.py
   ```

6. **Start the Frontend Development Server**
   ```bash
   cd client
   npm start
   ```

---

## Usage

1. Fill in the form fields, selecting the start and end dates, daily production per machine, and total order quantity.
2. Use the dropdowns and buttons to select and add fabric sections, trims, and accessories as needed.
3. Select processes and stages to be skipped for each fabric section.
4. Click **Submit** to send the form data to the backend for storage in MongoDB.

---

## API Endpoints

- **POST** `/submit`: Submits the form data to be stored in MongoDB.

---
