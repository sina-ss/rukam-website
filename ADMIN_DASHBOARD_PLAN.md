# Admin Dashboard Implementation Plan

## Overview

The admin dashboard will provide a comprehensive interface for managing form submissions and user data. The dashboard will be protected by authentication and will display data from two main endpoints.

## Authentication & Route Protection

- Only authenticated users can access `/admin` routes
- Authentication check using JWT token stored in localStorage
- Redirect to login page if not authenticated
- Logout functionality with token cleanup

## Dashboard Structure

### 1. Layout Components

- **AdminLayout**: Main layout wrapper with sidebar and header
- **AdminSidebar**: Navigation sidebar with menu items
- **AdminHeader**: Top header with user info and logout
- **AdminBreadcrumb**: Breadcrumb navigation

### 2. Main Dashboard Pages

#### 2.1 Dashboard Overview (`/admin`)

- **Statistics Cards**: Total forms, department forms, recent submissions
- **Recent Activity**: Latest 5 submissions from both endpoints
- **Quick Actions**: Links to view all forms
- **Charts**: Visual representation of form submissions by department

#### 2.2 Contact Forms Management (`/admin/forms`)

- **Forms Table**: Display all contact form submissions
- **Features**:
  - Pagination (10 items per page)
  - Search by name, email, or phone
  - Filter by date range
  - Export to CSV
  - View full message in modal
  - Mark as read/unread
  - Delete functionality

#### 2.3 Department Forms Management (`/admin/department-forms`)

- **Department Forms Table**: Display all membership applications
- **Features**:
  - Pagination (10 items per page)
  - Search by name, email, phone, or department
  - Filter by department
  - Filter by date range
  - Export to CSV
  - View full opinion in modal
  - Mark as processed/unprocessed
  - Delete functionality

### 3. Component Architecture

#### 3.1 Data Components

- **FormsTable**: Reusable table component for contact forms
- **DepartmentFormsTable**: Reusable table component for department forms
- **FormModal**: Modal for viewing full form details
- **StatsCard**: Reusable statistics card component
- **DataTable**: Generic table component with sorting and pagination

#### 3.2 UI Components

- **SearchInput**: Search functionality with debouncing
- **DateRangePicker**: Date range selection
- **DepartmentFilter**: Department selection dropdown
- **ExportButton**: CSV export functionality
- **StatusBadge**: Status indicator (read/unread, processed/unprocessed)

### 4. API Integration

#### 4.1 Admin Services (`src/services/admin.ts`)

```typescript
// GET /forms - Fetch all contact forms
// GET /department_forms - Fetch all department forms
// Additional endpoints for CRUD operations if available
```

#### 4.2 Data Interfaces

```typescript
interface ContactForm {
  id: number;
  content: string;
  full_name: string;
  phone_number: string;
  email: string;
  created_at?: string;
  status?: "read" | "unread";
}

interface DepartmentForm {
  id: number;
  content: string;
  full_name: string;
  email: string;
  website: string;
  department: string;
  phone_number: string;
  created_at?: string;
  status?: "processed" | "unprocessed";
}
```

### 5. Features Implementation

#### 5.1 Authentication Guard

- **ProtectedRoute**: HOC component to protect admin routes
- **useAuth**: Custom hook for authentication state
- **AuthContext**: Context provider for auth state management

#### 5.2 Data Management

- **React Query**: For data fetching, caching, and synchronization
- **Optimistic Updates**: For better UX during CRUD operations
- **Error Handling**: Comprehensive error handling with toast notifications

#### 5.3 Search & Filtering

- **Debounced Search**: Real-time search with 300ms delay
- **Multiple Filters**: Combine search, date range, and department filters
- **URL State**: Persist filters in URL for bookmarking

#### 5.4 Export Functionality

- **CSV Export**: Export filtered data to CSV format
- **Custom Columns**: Select which columns to export
- **Date Formatting**: Proper Persian date formatting

### 6. UI/UX Design

#### 6.1 Design System

- **Consistent Styling**: Follow existing globals.css and shadcn theme
- **Persian Typography**: Proper RTL layout and Persian fonts
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Support for light/dark theme switching

#### 6.2 User Experience

- **Loading States**: Skeleton loaders and spinners
- **Empty States**: Meaningful empty state messages
- **Error States**: User-friendly error messages
- **Success Feedback**: Toast notifications for actions

### 7. File Structure

```
src/
├── app/(admin)/
│   ├── admin/
│   │   ├── page.tsx                 # Dashboard overview
│   │   ├── forms/
│   │   │   └── page.tsx            # Contact forms management
│   │   └── department-forms/
│   │       └── page.tsx            # Department forms management
│   └── layout.tsx                  # Admin layout
├── components/admin/
│   ├── layout/
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   └── AdminBreadcrumb.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── RecentActivity.tsx
│   │   └── DashboardCharts.tsx
│   ├── forms/
│   │   ├── FormsTable.tsx
│   │   ├── DepartmentFormsTable.tsx
│   │   ├── FormModal.tsx
│   │   └── FormActions.tsx
│   ├── ui/
│   │   ├── DataTable.tsx
│   │   ├── SearchInput.tsx
│   │   ├── DateRangePicker.tsx
│   │   ├── DepartmentFilter.tsx
│   │   ├── ExportButton.tsx
│   │   └── StatusBadge.tsx
│   └── auth/
│       ├── ProtectedRoute.tsx
│       └── AuthGuard.tsx
├── services/
│   └── admin.ts                    # Admin API services
├── hooks/
│   ├── useAuth.ts                  # Authentication hook
│   ├── useForms.ts                 # Forms data hook
│   └── useExport.ts                # Export functionality hook
└── contexts/
    └── AuthContext.tsx             # Authentication context
```

### 8. Implementation Priority

#### Phase 1: Core Setup

1. Authentication guard and protected routes
2. Basic admin layout with sidebar and header
3. Dashboard overview page with basic stats

#### Phase 2: Data Display

1. Contact forms table with basic functionality
2. Department forms table with basic functionality
3. Form detail modals

#### Phase 3: Advanced Features

1. Search and filtering functionality
2. Pagination and sorting
3. Export to CSV functionality

#### Phase 4: Polish & UX

1. Loading and error states
2. Responsive design improvements
3. Performance optimizations

### 9. Technical Considerations

#### 9.1 Performance

- **Virtual Scrolling**: For large datasets
- **Memoization**: React.memo for expensive components
- **Code Splitting**: Lazy loading for admin routes

#### 9.2 Security

- **Token Validation**: Verify JWT tokens on each request
- **CSRF Protection**: If applicable
- **Input Sanitization**: Sanitize user inputs

#### 9.3 Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and descriptions
- **Color Contrast**: WCAG compliant color schemes

### 10. Testing Strategy

- **Unit Tests**: Component testing with Jest and React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: Critical user flows with Playwright

This plan provides a comprehensive roadmap for implementing a robust, user-friendly admin dashboard that follows modern React best practices and provides excellent user experience.
