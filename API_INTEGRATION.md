# API Integration Documentation

## Contact Form Integration

The contact form in `ContactSection.tsx` has been integrated with the backend API to handle form submissions.

### API Configuration

- **Base URL**: `http://localhost:8090`
- **Endpoint**: `/department_form`
- **Method**: `POST`

### API Request Format

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

### Form Fields

1. **Name** (`full_name`): Required, 2-50 characters, Persian/English letters only
2. **Phone** (`phone_number`): Required, 11 digits, must start with 09
3. **Email** (`email`): Optional, valid email format
4. **Website** (`website`): Optional, valid URL format
5. **Department** (`department`): Required, must be one of the available departments
6. **Message** (`content`): Required, 10-1000 characters

### Available Departments

- بازرگانی رکام
- حقوقی رکام
- آموزش رکام
- بهداشت و ارتقاء سلامت رکام
- فرهنگی، هنری، اجتماعی رکام
- فن‌آوری اطلاعات رکام

### Validation

Form validation is handled using **Zod v3** with the following rules:

- **Name**: Persian/English characters, 2-50 length
- **Phone**: Iranian mobile format (09XXXXXXXXX)
- **Email**: Valid email format (optional)
- **Website**: Valid URL format (optional)
- **Department**: Must be selected from available options
- **Message**: 10-1000 characters

### Error Handling

- Network errors are caught and displayed to the user
- Validation errors are shown inline with each field
- Success/error messages are displayed using Sonner toast notifications
- Form is reset after successful submission

### Files Modified

1. `src/lib/api.ts` - Axios configuration
2. `src/services/contact.ts` - Contact service with API calls
3. `src/schemas/contact.ts` - Zod validation schema
4. `src/components/sections/ContactSection.tsx` - Updated form component
5. `src/lib/utils.ts` - Utility functions for error handling

### Dependencies Added

- `axios` - HTTP client for API calls
- `zod` - Schema validation
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Zod integration with react-hook-form
- `sonner` - Toast notifications (shadcn component)

### Usage

The form automatically handles:

- Real-time validation
- API submission
- Loading states
- Error handling
- Success notifications with Sonner toasts
- Form reset after submission

Users can fill out the form, select their preferred department, and submit their contact request. The system will validate the data and send it to the backend API.
