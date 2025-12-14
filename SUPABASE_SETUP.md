# Supabase Setup Guide

## What's Included

The following services from Supabase are used:

- **Authentication**: Email/Password authentication for admin login
- **PostgreSQL Database**: Stores exam status and configuration data
- **Storage**: Stores and serves PDF files (question papers and results)
- **Realtime**: Real-time updates when exam status changes

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **New project**
3. Fill in:
   - **Name**: Choose a name (e.g., "scholarship-hub")
   - **Database password**: Create a strong password
   - **Region**: Select the closest region to your users
4. Click **Create new project** and wait for it to finish (2-5 minutes)

## Step 2: Get Your API Keys

1. Go to **Project Settings** → **API** (in the left sidebar)
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon (public) key** (starts with `eyJh...`)

3. Create or update `.env.local` in your project root:
   ```
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key-here"
   ```

## Step 3: Create the Database Table

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New query** and paste this SQL:

```sql
-- Create the exam_status table
CREATE TABLE IF NOT EXISTS exam_status (
  id TEXT DEFAULT 'default',
  phase INTEGER NOT NULL DEFAULT 0,
  phaseLabel TEXT,
  examDate TIMESTAMP WITH TIME ZONE NOT NULL,
  questionPaperURL TEXT,
  resultsURL TEXT,
  announcement TEXT NOT NULL DEFAULT '',
  updatedAt TIMESTAMP WITH TIME ZONE,
  updatedBy UUID,
  CONSTRAINT exam_status_pkey PRIMARY KEY (id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE exam_status ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public READ access
CREATE POLICY "Allow public read" ON exam_status
  FOR SELECT USING (true);

-- Policy: Allow authenticated users UPDATE access
CREATE POLICY "Allow authenticated update" ON exam_status
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users INSERT access
CREATE POLICY "Allow authenticated insert" ON exam_status
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

3. Click **Run** to execute the query
4. You should see success message

## Step 4: Create a Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **Create a new bucket**
3. Name it: `suvigyasrijanfoundation`
4. Make it **Public** (toggle the public option)
5. Click **Create bucket**

## Step 5: Configure Storage Policies

1. Click on the `suvigyasrijanfoundation` bucket
2. Go to **Policies** tab
3. Click **New policy** and select **For full customization**
4. Paste this policy:

```sql
-- Allow public read access
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'suvigyasrijanfoundation');

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'suvigyasrijanfoundation' AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'suvigyasrijanfoundation' AND auth.role() = 'authenticated'
  ) WITH CHECK (
    bucket_id = 'suvigyasrijanfoundation' AND auth.role() = 'authenticated'
  );
```

5. Click **Review** and then **Save policy**

## Step 6: Create an Admin User

1. Go to **Authentication** in the left sidebar
2. Click **Users** tab
3. Click **Create a new user**
4. Fill in:
   - **Email**: Your admin email (e.g., admin@example.com)
   - **Password**: A strong password
5. Click **Create user**

## Step 7: (Optional) Seed Initial Data

The app will create a default exam status if it doesn't exist. However, you can seed it manually:

1. Go to **SQL Editor**
2. Run this query:

```sql
INSERT INTO exam_status (id, phase, phaseLabel, examDate, announcement)
VALUES (
  'default',
  0,
  'Not Started',
  NOW() + INTERVAL '90 days',
  'Welcome! Exam details will be announced soon.'
) ON CONFLICT (id) DO NOTHING;
```

## Step 8: Install Dependencies & Run

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

## Testing

### Test Public Read Access
1. Visit the homepage (you should see the exam status)
2. The status should load without authentication

### Test Admin Login
1. Navigate to `/admin/login`
2. Sign in with your admin email and password from Step 6
3. You should be redirected to `/admin/dashboard`

### Test PDF Upload
1. In the admin dashboard, try uploading a PDF for the question paper
2. You should see the progress bar
3. After upload, the URL should appear in both the Supabase Storage and the exam status

## Troubleshooting

### "Invalid API key" error
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
- Make sure you're using the **Anon (public) key**, not the service role key

### "Could not connect to database"
- Check that your Supabase project is running (go to Dashboard and verify)
- Verify the URL and key are correct

### PDF upload fails
- Ensure the storage bucket `suvigyasrijanfoundation` exists and is public
- Check that the storage policies are correctly set
- Verify the authenticated user has upload permissions

### Realtime updates not working
- Go to **Project Settings** → **Realtime** and ensure Realtime is enabled (it should be by default)
- The table needs `REPLICA IDENTITY FULL` for realtime to work:
  ```sql
  ALTER TABLE exam_status REPLICA IDENTITY FULL;
  ```

## Database Schema Reference

**exam_status table:**
- `id` (TEXT, PRIMARY KEY): Unique identifier (use "default" for single config)
- `phase` (INTEGER): Exam phase (0-3)
- `phaseLabel` (TEXT, nullable): Custom phase description
- `examDate` (TIMESTAMP): Exam date and time
- `questionPaperURL` (TEXT, nullable): URL to question paper PDF
- `resultsURL` (TEXT, nullable): URL to results PDF
- `announcement` (TEXT): Important announcement for students
- `updatedAt` (TIMESTAMP, nullable): Last update timestamp
- `updatedBy` (UUID, nullable): User ID who made the update


## Production Deployment

When deploying to production:

1. Update `.env.local` with your production Supabase credentials
2. Ensure RLS (Row Level Security) policies are properly configured
3. Consider:
   - Setting up backups in Supabase settings
   - Enabling PITR (Point in Time Recovery) if available in your plan
   - Monitoring database performance in Supabase dashboard
   - Setting up alerts for storage quota

## More Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
