✋React Query?
    A library for fetching data in a React application
    Since React is a UI library, there is no specific pattern for data fetching
    useEffect hook for data fetching and useState hook to maintain component state like loading, error or resulting data
    If the data is needed throughout the app, we tend to use state management libraries.
    State management libraries are not great for working with asynchronous or server state.

✋Client State:
    Persisted in your app memory and accessing or updating it is synchronous

✋Server state: 
    Persisted remotely and require asynchronous APIs for fetching or updating.

Challenging when you have to deal with caching, deduping multiple requests for the same data, updating stale data in the background, performance optimizations etc.

✋Course Content:
    Basic Queries
    Poll data
    RQ dev tool
    Create reusable query hooks
    Query by ID
    Parallel Queries
    Dynamic Queries
    Dependent Queries
    Infinite & paginated Queries
    Update data using mutations
    invalidate Queries
    Optimistic Updates
    Axios Interceptor

✋ Command to run the Project
    npm run serve-json to run the server

✋ Querying by Id setup
    1. Create a new page that will eventually display the details about one single supper hero
    2. configure the route to that page and add a link from the super heroes list page to the super hero details page
    3. Fetch superhero by id and display the details in the UI