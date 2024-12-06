
# Synchrony Savings Calculator

This project contains modular React components to render calculators for HYS, CD, These components are designed to be used in a CMS environment, with built-in support for:

1. **Manual mode switching** via CMS `div` attributes.
2. **Dynamic switching** between favorable/unfavorable based on API data.
3. **Mobile and desktop layout handling** automatically within each component.

---

## CMS Integration Instructions

To use the components in your CMS, follow the examples below:

### **1. CD Calculator Example:**

```html
<div id="product-cds-rate-component" data-mode="favorable"></div>
```

- **ID**: The React component for the CD Calculator will attach to the `<div>` with `id="product-cds-rate-component"`.
- **Manual Mode (Optional)**:  
  Use the `data-mode` attribute to **manually control the mode**.  
  Possible values:
    - `favorable`
    - `unfavorable`

**If no `data-mode` attribute is provided**, the component will **fetch a rate from the API** and determine the mode based on a **4% threshold**:
- **Above 4%**: Shows the favorable version.
- **4% or below**: Shows the unfavorable version.

---

### **2. HYS Calculator Example:**

```html
<div id="product-hys-rate-component" data-mode="unfavorable"></div>
```

- **ID**: The React component for the HYS Calculator will attach to the `<div>` with `id="product-hys-rate-component"`.
- **Manual Mode Override**: If the `data-mode` attribute is present, it will override any API-based logic.

---

## Development and Preview Instructions

- Use the **view components** (like `CDView.jsx`) for **local development and previews**. These allow for testing the calculators without CMS integration.

---

## Exporting Components

In `src/index.js`, the following components are exported for CMS use:

```javascript
export { default as HYSCalculator } from './components/HYSCalculator';
export { default as CDCalculator } from './components/CDCalculator';
```

You can **import these components** in the CMS or other environments like so:

```javascript
import { CDCalculator, HYSCalculator,} from 'synchrony-savings-calculator';
```

---

## API Logic

If no manual override is provided, the calculators will fetch data from the API:

- **API Endpoint**: `/api/rates` (Replace with actual endpoint).
- **Rate Threshold**:
    - **Above 4%**: Displays favorable version.
    - **4% or below**: Displays unfavorable version.

If the API call fails or returns invalid data, the component will **default to the unfavorable mode**.

---

## Accessibility and Compliance

- Ensure all components follow **ADA guidelines** for accessibility.
- Use appropriate **ARIA labels**, focus management, and semantic HTML for all interactive elements.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more information.



















# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
