### 🧪 Sample Test Cases

| Test Case | Description                        | Expected Result                  |
| --------- | ---------------------------------- | -------------------------------- |
| TC_01     | Admin login with valid credentials | Success & redirect to dashboard  |
| TC_02     | Add a new shop                     | Shop appears in Firestore and UI |
| TC_03     | Add an invalid offer               | Error message displayed          |
| TC_04     | View shops on index                | List all shops from Firestore    |

### Functional Test Cases

| TC_ID | Test Scenario | Input         | Expected Output  |
| ----- | ------------- | ------------- | ---------------- |
| TC_01 | Admin Login   | valid creds   | Success login    |
| TC_02 | Admin Login   | invalid creds | Error message    |
| TC_03 | Create Shop   | valid data    | Shop created     |
| TC_04 | Create Shop   | empty fields  | Validation alert |
| TC_05 | Add Offer     | valid offer   | Offer listed     |
| TC_06 | View Shops    | n/a           | Shops loaded     |
| TC_07 | View Offers   | n/a           | Offers listed    |
