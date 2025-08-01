# Knowledge Transfer Platform

This is the backend for the Knowledge Transfer Platform, designed to facilitate the management of artifacts and onboarding paths without the use of a database. The application is built using Flask and is structured to provide a clear separation of concerns.

## Project Structure

```
knowledge-transfer-backend
├── src
│   ├── app.py               # Entry point of the application
│   ├── artifacts.py         # Endpoints related to artifacts
│   ├── onboarding.py        # Endpoints for onboarding paths
│   ├── utils.py             # Utility functions
│   └── __init__.py          # Package initialization
├── requirements.txt         # Project dependencies
└── README.md                # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd knowledge-transfer-backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

## Usage

1. **Run the application:**
   ```
   python src/app.py
   ```

2. **API Endpoints:**
   - **Add Artifact:** `POST /add-artifact`
   - **Get Artifacts:** `GET /get-artifacts`
   - **Search Artifacts:** `GET /search-artifacts`
   - **Delete Artifact:** `DELETE /delete-artifact`
   - **Onboarding Paths:** `GET /onboarding-paths`

## Contributing

Feel free to submit issues or pull requests for any enhancements or bug fixes. 

## License

This project is licensed under the MIT License.