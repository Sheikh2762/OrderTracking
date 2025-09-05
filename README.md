# Parcel Tracking Application

A complete parcel/order tracking web application built with React and Firebase, featuring an admin dashboard for order management and a public tracking interface for customers.

## Features

### Admin Panel
- Firebase Authentication for admin login
- Dashboard to view all orders
- Add new orders with auto-generated order IDs
- Update order status with real-time synchronization
- Responsive design with clean UI

### Customer Tracking
- Public order tracking page
- Real-time order status updates
- Visual progress timeline
- Order details display
- Mobile-responsive interface

### Technical Features
- Real-time updates using Firestore listeners
- Protected admin routes
- Auto-generated unique order IDs (ORD + timestamp)
- Status progression: Packed → Dispatched → In Transit → Out for Delivery → Delivered
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Authentication
1. In Firebase Console, go to **Authentication** → **Get Started**
2. Go to **Sign-in method** tab
3. Enable **Email/Password** provider
4. Create an admin user:
   - Go to **Users** tab
   - Click **Add user**
   - Enter email and password for admin access

### 3. Create Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Choose **Start in test mode** (for development)
3. Select your preferred location
4. The database will be created with collection `orders`

### 4. Configure Firebase in Your App
1. In Firebase Console, go to **Project Settings** → **General**
2. Scroll down to "Your apps" section
3. Click **Web app** icon (`</>`)
4. Register your app with a name
5. Copy the Firebase configuration object
6. Update `src/firebase/config.ts` with your config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com", 
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 5. Firestore Security Rules (Optional - for production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to orders for everyone (public tracking)
    match /orders/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users (admin) can write
    }
  }
}
```

## Installation & Setup

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Update Firebase configuration**:
   - Edit `src/firebase/config.ts` with your Firebase project details

3. **Create admin user**:
   - Use Firebase Console to create an admin account in Authentication

4. **Start development server**:
```bash
npm run dev
```

## Usage

### Admin Access
1. Navigate to `/admin/login`
2. Sign in with the admin credentials you created
3. Access the dashboard to manage orders

### Customer Tracking  
1. Navigate to `/` (home page)
2. Enter order ID (format: ORD123456)
3. View real-time order status and progress

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.tsx    # Main admin interface
│   │   ├── AdminLogin.tsx        # Admin authentication
│   │   ├── AddOrderForm.tsx      # Form to add new orders
│   │   └── UpdateOrderForm.tsx   # Form to update order status
│   ├── customer/
│   │   ├── TrackingPage.tsx      # Public tracking interface
│   │   └── OrderDetails.tsx      # Order details display
│   ├── shared/
│   │   ├── StatusBadge.tsx       # Status indicator component
│   │   ├── ProgressBar.tsx       # Visual progress timeline
│   │   ├── ProtectedRoute.tsx    # Route protection
│   │   └── LoadingSpinner.tsx    # Loading indicator
│   └── Layout.tsx                # App layout wrapper
├── contexts/
│   └── AuthContext.tsx           # Authentication context
├── firebase/
│   └── config.ts                 # Firebase configuration
├── types/
│   └── Order.ts                  # TypeScript interfaces
├── utils/
│   └── orderUtils.ts             # Utility functions
└── App.tsx                       # Main app component
```

## Order Status Flow

The application supports the following status progression:

1. **Packed** - Order is prepared and packed
2. **Dispatched** - Order has left the warehouse  
3. **In Transit** - Order is being transported
4. **Out for Delivery** - Order is out for final delivery
5. **Delivered** - Order has been successfully delivered

## Development

- **Development server**: `npm run dev`
- **Build**: `npm run build`
- **Preview production build**: `npm run preview`

## Security Notes

- Admin authentication is required for order management
- Public read access for order tracking
- Firebase security rules should be configured for production
- Environment variables should be used for sensitive configuration

## Customization

- Update branding in `Layout.tsx` and page titles
- Modify order statuses in `types/Order.ts`
- Customize styling in component files
- Add additional fields to orders as needed