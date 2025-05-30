# API Integration Documentation

## Contact Form Integration (Home Page)

The contact form in `ContactForm.tsx` has been integrated with the backend API to handle general contact submissions.

## Contact Section Form Integration (Contact Page)

The contact section form in `ContactSection.tsx` has been integrated with the same backend API endpoint for general contact requests.

## Membership Form Integration

The membership form in `MembershipForm.tsx` has been integrated with the backend API for department membership requests.

### API Configuration

- **Base URL**: `http://localhost:8090`

### API Endpoints

1. **Contact Forms (Home Page & Contact Page)**: `/form` (POST)
2. **Membership Form**: `/department_form` (POST)

### API Request Formats

#### Contact Forms (Home Page & Contact Page) - `/form`

```json
{
  "content": "خوشحال میشوم با همدیگر همکاری داشته باشیم",
  "full_name": "رضا احمدپور",
  "phone_number": "09339876543",
  "email": "reza.ahmadpour@example.com"
}
```

#### Membership Form - `/department_form`

```json
{
  "content": "سلام من از کسب و کارتان خوشم می آید.",
  "full_name": "سارا جعفری",
  "email": "sara.jafari@example.com",
  "website": "www.departmentform.com",
  "department": "فن‌آوری اطلاعات رکام",
  "phone_number": "09121234567"
}
```

### Form Fields Comparison

#### Contact Forms (Home Page & Contact Page)

1. **Name** (`full_name`): Required, 2-50 characters, Persian/English letters only
2. **Phone** (`phone_number`): Required, 11 digits, must start with 09
3. **Email** (`email`): Optional, valid email format
4. **Message** (`content`): Required, 10-1000 characters

#### Membership Form

1. **Name** (`full_name`): Required, 2-50 characters, Persian/English letters only
2. **Mobile** (`phone_number`): Required, 11 digits, must start with 09
3. **Email** (`email`): Optional, valid email format
4. **Website** (`website`): Optional, valid URL format
5. **Department** (`department`): Required, must be one of the available departments
6. **Opinion** (`content`): Required, 20-2000 characters (longer than other forms)

### Available Departments (for Membership Form only)

- بازرگانی رکام
- حقوقی رکام
- آموزش رکام
- بهداشت و ارتقاء سلامت رکام
- فرهنگی، هنری، اجتماعی رکام
- فن‌آوری اطلاعات رکام

### Validation

Form validation is handled using **Zod v3** with the following rules:

#### Contact Forms (`src/schemas/contact-form.ts`)

- **Name**: Persian/English characters, 2-50 length
- **Phone**: Iranian mobile format (09XXXXXXXXX)
- **Email**: Valid email format (optional)
- **Message**: 10-1000 characters

#### Membership Form (`src/schemas/membership.ts`)

- **Name**: Persian/English characters, 2-50 length
- **Mobile**: Iranian mobile format (09XXXXXXXXX)
- **Email**: Valid email format (optional)
- **Website**: Valid URL format (optional)
- **Department**: Must be selected from available options
- **Opinion**: 20-2000 characters (longer requirement for membership applications)

### Error Handling

- Network errors are caught and displayed to the user
- Validation errors are shown inline with each field
- Success/error messages are displayed using Sonner toast notifications
- Forms are reset after successful submission

### Files Modified

1. `src/lib/api.ts` - Axios configuration
2. `src/services/contact.ts` - Contact service for department forms (Membership only)
3. `src/services/contact-form.ts` - Contact service for general contact forms (Home Page & Contact Page)
4. `src/schemas/contact.ts` - Zod validation schema for department-specific forms (deprecated for contact section)
5. `src/schemas/contact-form.ts` - Zod validation schema for contact forms (Home Page & Contact Page)
6. `src/schemas/membership.ts` - Zod validation schema for membership form
7. `src/components/contact/ContactForm.tsx` - Updated contact form component (Home Page)
8. `src/components/sections/ContactSection.tsx` - Updated contact section form component (Contact Page)
9. `src/components/departments/MembershipForm.tsx` - Updated membership form component
10. `src/app/(website)/departments/page.tsx` - Updated to use new form component
11. `src/lib/utils.ts` - Utility functions for error handling

### Dependencies Added

- `axios` - HTTP client for API calls
- `zod` - Schema validation
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Zod integration with react-hook-form
- `sonner` - Toast notifications (shadcn component)

### Usage

All forms automatically handle:

- Real-time validation
- API submission
- Loading states
- Error handling
- Success notifications with Sonner toasts
- Form reset after submission

#### Contact Forms (Home Page & Contact Page)

Simple contact forms for general inquiries without department selection. Both use the same `/form` endpoint.

#### Membership Form

Detailed membership application form with opinion field and department selection for joining specific departments. Uses the `/department_form` endpoint.

Each form validates the data and sends it to the appropriate backend API endpoint.
