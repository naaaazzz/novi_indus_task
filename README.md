# NexLearn Frontend

This project is a Next.js 16 application for the NexLearn assessment flow. It includes:

- mobile OTP login
- profile creation for new users
- instruction page for the exam
- question answering flow with timer and review states
- result page after answer submission

## Tech Stack

- Next.js 16
- React
- Tailwind CSS
- shadcn/ui
- Axios
- Sonner toast

## Environment Setup

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_API_BASE_URL="https://nexlearn.noviindusdemosites.in/"
```

This value is used in [lib/api.js](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/lib/api.js) as the Axios `baseURL`.

## Install and Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## App Workflow

### 1. Login Flow

The login flow starts from `/`.

- User enters mobile number
- App calls `POST /auth/send-otp`
- User enters OTP
- App calls `POST /auth/verify-otp`
- If user already exists:
  - `access_token` is stored in `sessionStorage`
  - user is redirected to `/dashboard`
- If user is new:
  - profile form is shown
  - app calls `POST /auth/create-profile`
  - `access_token` is stored in `sessionStorage`
  - user is redirected to `/dashboard`

Auth token handling:

- token is stored in `sessionStorage` as `token`
- every API request adds `Authorization: Bearer <token>` using the Axios request interceptor in [lib/api.js](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/lib/api.js)

### 2. Dashboard Entry

Route:

- `/dashboard`

Behavior:

- automatically redirects to `/dashboard/instructions`

### 3. Instruction Page

Route:

- `/dashboard/instructions`

Main component:

- [mcqInstructions.jsx](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/components/pages/dashboardPages/instructions/mcqInstructions.jsx)

Hook:

- [useInstruction.js](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/hooks/dashboardHooks/useInstruction.js)

Flow:

- app calls `GET /question/list`
- response includes:
  - question list
  - instruction HTML
  - question count
  - total marks
  - total time
- complete response is stored in `sessionStorage` as `examData`
- user clicks `Start Test`
- app routes to `/dashboard/questions`

### 4. Questions Page

Route:

- `/dashboard/questions`

Main files:

- [questions.jsx](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/components/pages/dashboardPages/Questions/questions.jsx)
- [questionShow.jsx](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/components/pages/dashboardPages/Questions/questionShow.jsx)
- [noContainer.jsx](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/components/pages/dashboardPages/Questions/noContainer.jsx)
- [comprehensivePara.jsx](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/components/pages/dashboardPages/Questions/comprehensivePara.jsx)
- [alertContent.jsx](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/components/pages/dashboardPages/Questions/alertContent.jsx)

Hook:

- [useQuestions.js](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/hooks/dashboardHooks/useQuestions.js)

Flow:

- question page reads `examData` from `sessionStorage`
- hook safely parses stored data
- timer starts from `total_time`
- user can:
  - choose answers
  - move previous/next
  - mark question for review
  - jump from right-side question sheet
- right-side sheet shows statuses:
  - answered
  - not answered
  - marked for review
  - answered and marked for review

Important stored UI state:

- selected answers
- marked-for-review question ids
- visited question ids
- remaining timer

### 5. Submit Answers

API:

- `POST /answers/submit`

Implementation:

- [submitAnswers](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/lib/api.js)

Payload behavior:

- app sends `FormData`
- `answers` is appended as a JSON string
- each item is normalized as:

```json
{
  "question_id": 1,
  "selected_option_id": 2
}
```

- unanswered questions are submitted as:

```json
{
  "question_id": 3,
  "selected_option_id": null
}
```

On successful submit:

- API result is saved in `sessionStorage` as `resultData`
- app redirects to `/dashboard/result`

### 6. Result Page

Route:

- `/dashboard/result`

Main component:

- [resultPage.jsx](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/components/pages/dashboardPages/result/resultPage.jsx)

Flow:

- page reads `resultData` from `sessionStorage`
- shows:
  - score
  - total marks
  - remaining time
  - correct answers
  - wrong answers
  - not attended
  - submitted time
- `Done` button redirects back to `/dashboard/instructions`

## API Summary

Defined in [lib/api.js](/c:/Users/pro/Desktop/workspace/work/novi_indus_task/lib/api.js):

- `POST /auth/send-otp`
- `POST /auth/verify-otp`
- `POST /auth/create-profile`
- `POST /auth/logout`
- `GET /question/list`
- `POST /answers/submit`

## Session Storage Keys

The app currently uses:

- `token`
- `examData`
- `resultData`

## Project Structure

```text
app/
  page.js
  Login/page.jsx
  (main)/dashboard/
    page.jsx
    layout.js
    instructions/page.jsx
    questions/page.jsx
    result/page.jsx

components/pages/
  loginPages/
  dashboardPages/
    instructions/
    Questions/
    result/

hooks/
  dashboardHooks/

lib/
  api.js
```

## Notes

- This project depends on `sessionStorage` for assessment flow data.
- If `examData` is missing or invalid, the question screen cannot continue normally.
- API base URL must be set correctly in `.env.local` before running the app.
