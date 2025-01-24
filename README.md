# google-form-responder

This library is designed to make it easy to submit responses to Google Forms from the browser or Node.js without the need for a server or backend service.

You can simply create a Google Form and submit answers to it directly from your web or mobile application.

This allows quick and easy development of contact forms, surveys, and other data collection widgets without the need for extra infrastructure of development time. This can be especially useful for static websites and single page applications.

For these reasons, the library is designed to be as lightweight as possible with no dependencies on other NPM packages, enabling ease of use and fast loading times.

## Installation

```bash
npm install --save google-form-responder

yarn add google-form-responder

pnpm add google-form-responder
```

## Usage

### Quick Use:

```ts
import GoogleFormResponder from 'google-form-responder';

const result = await GoogleFormResponder.send('<google-form-id>', { 
  'entry.1234561': 'John Doe', 
  'entry.1234562': 'john.doe@example.com', 
  'entry.1234563': 42,
  'entry.1234564': 'My Feedback\nWith\nLine Breaks',
});

console.log(result); // true
```

### Form Mapping:

This is useful when using the form in multiple places throughout an application. This approach also allows you to assign meaningful names to the form fields as opposed to the default `entry.123456` format.

```ts
import GoogleFormResponder from 'google-form-responder';

const form = GoogleFormResponder.create('<google-form-id>', {
  name: 'entry.1234561',
  email: 'entry.1234562',
  count: 'entry.1234563',
  feedback: 'entry.1234564',
});

... your form ...

const result = await form.send({ 
  name: 'John Doe', 
  email: 'john.doe@example.com', 
  count: 42,
  feedback: 'My Feedback\nWith\nLine Breaks' 
});

console.log(result); // true
```

## Instructions:

1) Create a new Google Form
2) Get the Form ID from the URL (between /d/ and /edit)
2) Add all questions to the form
3) Link a Google Sheet to the form for responses
4) To get Form IDs:
  - Click on "Pre-Fill Form"
  - Type in answers for each in the form
  - Click "Get Link"
  - Copy the link and break apart the query string
  - Each query parameter will have the `entry.123456` style key that maps to each answer
5) Apply the mapping to the GoogleFormResponder.send / create functions
  - Use the Form ID as the first argument
  - Send the mapped data as the second argument


## E-Mail Notifications

You will likely want to enable "notification" to get an email when a response is submitted. In order to enable this, you need to do the following:

- Go to the Google Sheet (not the Google Form)
- Navigate to "Tools -> Notification Settings -> Edit notifications"
- Choose the notification you prefer

You will now receive an email from Google Sheets when a response is submitted.

## Debugging

If the form result is `false`, there is likely an error with the form mapping. Ensure you have the correct form ID and mapping.

You can also check the network tab in your browser's developer tools to see the request and response to `POST formResponse`. If the status is 400 this likely means the form data is invalid.
