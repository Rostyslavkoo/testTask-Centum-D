# Currency Exchange Rate Viewer

This is a Single Page Application (SPA) for displaying currency exchange rates using the NBU API.

## Features

- **Homepage**: Displays current exchange rates for various currencies.
- **Changed Rates**: Shows the currencies that the user has modified. Editing and saving currency rates are local operations without server communication.
- **Search Rates**: Allows the user to view historical exchange rates for a specific date. Includes a date filter for easy navigation.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/currency-exchange-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd my-vue-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm run serve
   ```


## Usage

- **Homepage (Current Exchange Rates)**: Navigate to the "Головна" page to view the current exchange rates for various currencies.

- **Changed Rates**: Visit the "Змінені курси" page to see the currencies that you have modified. Editing and saving currency rates are local operations.

- **Search Rates (Historical Exchange Rates)**: Explore the "Пошук курсу" page to view historical exchange rates for a specific date. Use the date filter to choose the desired date.

- **Currency Editing**: On any page with a list of currency rates, click on a currency to navigate to its editing page. After saving the modified rate, the currency will appear on the "Changed Rates" page.

- **Pagination**: Enjoy pagination on pages that display a list of currencies. Each page displays 10 currencies, and pagination is handled locally.

- **Currency Search**: Utilize the search functionality to find a specific currency by its name. This is a local search operation.


## Technologies Used

- Vue.js 3 (Composition API)
- Pinia (State management)
- Vue Router (Routing)
- Vuetify (Styling)
