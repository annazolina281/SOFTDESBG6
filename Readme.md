# Pothole Detection System
### SOFTDESBG6 — Road Infrastructure Monitoring Web Application

A computer vision web application that detects potholes in real time using a trained YOLO model. Supports webcam (including dashcam footage for moving vehicles), image uploads, and video file analysis. All detections are stored in Supabase, with daily priority reports and CSV alert emails per barangay.

---

## Features

- **Webcam / Dashcam Detection** — Live pothole detection using a laptop webcam or attached dashcam. Works while a vehicle is moving.
- **Image Upload** — Upload a road photo and get bounding boxes with confidence scores drawn on detected potholes.
- **Video Upload** — Upload dashcam or road footage. Samples every 2 seconds with real-time bounding box overlay while the video plays.
- **Severity Classification** — Each pothole is classified as High, Medium, or Low severity based on size relative to the frame.
- **Daily Reports** — Auto-generated end-of-day summary sorted by priority (High → Medium → Low) with image links, location, barangay, and source.
- **Detection History** — View trends across 1 Week, 1 Month, 6 Months, or 1 Year — broken down by severity, barangay, and source.
- **Supabase Storage** — Every processed image/video is saved to Supabase Storage for permanent archiving with public URLs.
- **CSV Alert System** — Generate CSV reports per barangay for any time period. Download directly or send via email.
- **Barangay Management** — Configure which barangays to monitor, alert thresholds, and recipient emails.

---

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 19, Vite, React Router DOM |
| Backend    | Python, Flask, Flask-CORS |
| Detection  | YOLOv8 (Ultralytics) — pothole-trained weights |
| Database   | Supabase (PostgreSQL) |
| Storage    | Supabase Storage (pothole-media bucket) |
| Email      | Gmail SMTP via Python smtplib |

---

## Project Structure

```
SOFTDESBG6/
├── backend/
│   ├── App.py                  # Flask API — detection + stats + reports + alerts
│   ├── .env                    # Environment variables (DO NOT commit to GitHub)
│   ├── requirements.txt        # Python dependencies
│   └── weights/
│       └── best.pt             # YOLO pothole detection model (MIT License)
│
├── frontend/
│   ├── public/
│   │   └── samples/            # Sample videos from Mendeley dataset
│   │       ├── sample1.mp4     # Place files from test/rgb/ here
│   │       └── ...
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── AppLayout.jsx
│       ├── Sidebar.jsx
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── Dashboard.jsx       # Stats + history + daily report
│       ├── ImageUpload.jsx     # Image detection with bounding box overlay
│       ├── VideoUpload.jsx     # Video detection — scan all frames + live mode
│       ├── Webcam.jsx          # Live webcam/dashcam real-time detection
│       ├── Settings.jsx        # Account + barangay alerts + storage status
│       └── index.css
│
└── supabase_setup.sql          # Run once in Supabase SQL Editor
```

---

## Database Schema

### `pothole_detections`
| Column         | Type        | Description                             |
|----------------|-------------|-----------------------------------------|
| id             | UUID        | Primary key                             |
| detected_at    | TIMESTAMPTZ | Timestamp of detection                  |
| severity       | TEXT        | High / Medium / Low                     |
| confidence     | FLOAT       | YOLO confidence score (0–100)           |
| bbox           | JSONB       | Bounding box [x, y, w, h]              |
| source         | TEXT        | image / video / webcam / dashcam        |
| image_url      | TEXT        | Supabase Storage public URL             |
| video_url      | TEXT        | Supabase Storage public URL             |
| frame_number   | INTEGER     | Frame index (video detections)          |
| barangay       | TEXT        | Barangay name                           |
| location_label | TEXT        | Free-text location note                 |

### `barangay_alert_config`
| Column          | Type    | Description                          |
|-----------------|---------|--------------------------------------|
| barangay_name   | TEXT    | Unique barangay identifier           |
| recipient_email | TEXT    | Alert email address                  |
| alert_threshold | INTEGER | Potholes before alert triggers       |
| is_active       | BOOLEAN | Whether alerts are enabled           |

### `alert_history` — log of all sent email reports

### `daily_reports` — aggregated daily detection summaries

---

## API Endpoints

| Method | Endpoint                       | Description                            |
|--------|--------------------------------|----------------------------------------|
| POST   | `/api/pothole/detect`          | Detect in uploaded image               |
| POST   | `/api/pothole/detect-webcam`   | Detect from base64 webcam frame        |
| POST   | `/api/pothole/detect-video`    | Process full video file                |
| GET    | `/api/stats/dashboard`         | Quick stats: total, today, week        |
| GET    | `/api/stats/history`           | History by period + charts             |
| GET    | `/api/reports/daily`           | Today's report sorted by priority      |
| GET    | `/api/reports/daily/download`  | Download daily CSV report              |
| GET    | `/api/barangays`               | List all barangay configs              |
| POST   | `/api/barangays`               | Add or update barangay config          |
| POST   | `/api/alerts/generate`         | Generate CSV + send email              |
| POST   | `/api/alerts/download-csv`     | Download CSV directly                  |
| GET    | `/api/alerts/history`          | View past alert sends                  |
| GET    | `/api/storage/status`          | Storage file counts                    |
| GET    | `/health`                      | Server health check                    |

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/SOFTDESBG6.git
cd SOFTDESBG6
```

### 2. Run Supabase Setup
1. Go to your Supabase project → SQL Editor → New Query
2. Paste the entire contents of `supabase_setup.sql` → Run
3. Go to Storage → confirm `pothole-media` bucket exists (create manually if needed)
4. Copy your Project URL and Service Role Key from Settings → API

### 3. Configure Backend
```bash
cd backend

# Windows
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Create `backend/.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SMTP_EMAIL=your_gmail@gmail.com
SMTP_PASSWORD=your_16char_app_password
PORT=5000
```

**Gmail App Password setup:**
1. Go to myaccount.google.com
2. Security → How you sign in to Google → 2-Step Verification → turn it ON
3. Search "App passwords" in the search bar at the top
4. Create a new app password → name it "Pothole Alert"
5. Copy the 16-character code into SMTP_PASSWORD in your .env

> If you don't want email alerts yet, leave SMTP fields blank — the system will skip email and still generate downloadable CSV reports.

Place YOLO model weights:
```
backend/weights/best.pt
```
Download from: https://github.com/Nocluee100/Pothole_Detection_AI_YOLO

### 4. Run Backend
```bash
cd backend
.\venv\Scripts\activate
python App.py
```

Wait for:
```
✅ Supabase connected
✅ Loaded pothole model
Running on http://127.0.0.1:5000
```

### 5. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

Open: **http://localhost:5173**

### 6. Add Sample Videos (optional)
Place `.mp4` files from the [Mendeley Pothole Dataset](https://data.mendeley.com/datasets/5bwfg4v4cd/3) into `frontend/public/samples/` named `sample1.mp4` through `sample5.mp4`.

---

## How It Works

```
User (webcam / image / video)
        │
        ▼
Flask API (/api/pothole/detect*)
        │
        ├── YOLOv8 runs on frame → weights/best.pt
        │
        ├── Upload to Supabase Storage
        │     └── pothole-media / images | videos | webcam
        │
        ├── Save detection to pothole_detections table
        │     └── severity, confidence, bbox, source, barangay, image_url
        │
        ├── Update daily_reports aggregate for today
        │
        └── Return JSON → frontend draws bounding boxes on canvas
```

---

## Daily Report Flow

At any point during the day:
- Dashboard shows today's detections sorted by priority (High → Medium → Low)
- Click **Download Today's Report** → downloads a CSV with all fields
- Go to Settings → Barangay Alerts → select barangay + period → Send via Email
- The CSV is emailed to the configured barangay recipient automatically

---

## Attribution

- Pothole YOLO model: [Nocluee100/Pothole_Detection_AI_YOLO](https://github.com/Nocluee100/Pothole_Detection_AI_YOLO) — MIT License
- Sample video dataset: [Mendeley Data — Pothole Videos 5bwfg4v4cd](https://data.mendeley.com/datasets/5bwfg4v4cd/3)
- Detection framework: [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics)

---

## Notes

- Do **not** commit `.env` to GitHub — add it to `.gitignore`
- The `venv/` folder should also be in `.gitignore`
- Supabase service role key grants full DB access — keep it server-side only
- For production deployment, replace Flask dev server with `gunicorn`

---

## License

MIT License — see LICENSE file for details.