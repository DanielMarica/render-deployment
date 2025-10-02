# Validation Rules with Zod

## Expense Form Validation

The expense form uses **Zod** for schema validation, integrated with **React Hook Form**.

### Validation Rules

#### 1. **Payer**
- **Type**: Enum
- **Allowed values**: `"Alice"` or `"Bob"`
- **Error message**: "Payer must be either Alice or Bob"

#### 2. **Date**
- **Type**: String (ISO date format)
- **Required**: Yes
- **Error message**: "Date is required"

#### 3. **Description**
- **Type**: String
- **Required**: No (optional)
- **Max length**: 200 characters
- **Error message**: "Description cannot be longer than 200 characters"

#### 4. **Amount**
- **Type**: Number (positive float)
- **Required**: Yes
- **Minimum**: 0.01
- **Must be**: Positive number
- **Error messages**:
  - "Amount must be a valid number"
  - "Amount must be a positive number"
  - "Amount must be at least 0.01"

## Benefits of Using Zod

✅ **Type Safety**: TypeScript types are automatically inferred from the schema  
✅ **Centralized Validation**: Single source of truth for validation logic  
✅ **Better Error Messages**: Clear, customizable error messages  
✅ **Runtime Validation**: Validates data at runtime, not just compile time  
✅ **Reusable**: Same schema can be used in frontend and backend  

## Example Usage

```typescript
const expenseSchema = z.object({
  payer: z.enum(['Alice', 'Bob']),
  date: z.string().min(1),
  description: z.string().max(200).optional(),
  amount: z.number().positive().min(0.01)
});

// TypeScript type automatically inferred
type FormData = z.infer<typeof expenseSchema>;
```
