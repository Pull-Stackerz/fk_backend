# Gen AI-based Fashion Recommendation

Welcome to the **Gen AI-based Fashion Recommendation** project! This project aims to provide personalized fashion recommendations based on user input. Whether you're preparing for a special event, looking for a casual outfit, or just want to upgrade your wardrobe, this AI-powered assistant is here to help.

## Description

In this project, we've developed an AI-based fashion recommendation system that takes user input in natural language. Users can provide details about their preferences, the event they're dressing for, their body type, and more. The AI then processes this information and generates fashion recommendations that include clothing and accessories.

This project is just a part of a larger endeavor, focusing specifically on handling user requests for fashion recommendations.

## Installation and Local Setup

To set up and run the Gen AI-based Fashion Recommendation project locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3. Install the project dependencies using npm:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory of the project.

5. Obtain a Replicate API token from the Replicate platform.

6. Add the Replicate API token to your `.env` file:

    ```
    REPLICATE_API_TOKEN=<your_replicate_api_token>
    apiUrl=<your_ml_model_endpoint>
    ```

7. Save the `.env` file.

## Running the Project

After completing the installation and setup process, you can run the Gen AI-based Fashion Recommendation project locally:

1. Start the server using npm:

    ```bash
    npm start
    ```

2. Make a POST request to the `/chat` endpoint with the initial user input. You can use tools like Postman or `curl`:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
        "initialInput": "I'm looking for a formal outfit for a wedding. I'm a tall person with an athletic body type."
    }' http://localhost:3000/chat
    ```

3. Receive a JSON response with the AI-generated fashion recommendations based on the user's input.

## Technologies Used

This project is built using the following technologies and packages:

-   Node.js
-   Express.js
-   Google Translate API
-   Replicate

Thank you for exploring the Gen AI-based Fashion Recommendation project!

---
