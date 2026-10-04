# Solution

## Overview

I approached the application by building the frontend first and then introducing the backend once the core search experience was working.

The frontend was built with Svelte and TypeScript using local dummy data initially. Search, category filtering and sorting were implemented and tested before moving the search responsibility to the backend.

The backend was then built with Node.js, Express and TypeScript. It owns the catalogue, search logic and simulated provider integration.

The final application is intentionally small and avoids unnecessary infrastructure or dependencies.

## Architecture

The application has two main parts.

### Frontend

The Svelte frontend is responsible for:

- Search input
- Category selection
- Sort selection
- Triggering search requests
- Loading state
- Empty results state
- Error handling and retry
- Rendering search results

The frontend communicates with the backend through a small API layer in:

```text
client/src/api/search.ts
```

This keeps HTTP-related code out of the Svelte components.

### Backend

The Express backend is responsible for:

- Reading the local catalogue
- Filtering search results
- Enriching results with provider data
- Sorting enriched results
- Handling simulated provider failures
- Exposing the HTTP API

The main backend flow is:

```text
HTTP Request
    ↓
Express route
    ↓
searchCatalog()
    ↓
filterAndSortCatalog()
    ↓
provider enrichment
    ↓
final sorting
    ↓
HTTP Response
```

## Catalogue and Provider Separation

The local catalogue contains:

- ID
- Name
- Category
- Description
- Popularity

The simulated provider supplies:

- Price
- Availability
- Delivery estimate

This separation was intentional.

Catalogue data is hardcoded, while price and availability are information that can change at runtime.

It also affects the order of operations.

The backend first filters the local catalogue, then enriches the matching items with provider data and only then performs the final sort.

This is necessary because price is not available until the provider has been called.

The resulting flow is:

```text
Catalogue
    ↓
Filter
    ↓
Provider enrichment
    ↓
Price / availability / delivery
    ↓
Sort
    ↓
Search results
```

## Search and Filtering

Free-text search is performed against:

- Item name
- Category

Category filtering can be applied at the same time.

For example:

```text
Query: burger
Category: Burgers
```

returns items that match "burger" and belong to the Burgers category.

## Sorting

The application supports:

- Popularity
- Price low to high
- Price high to low

Popularity is available in the local catalogue.

Price is provided by the simulated upstream provider, which is why price sorting happens after enrichment.

Unavailable results are kept below available results so that products that cannot currently be ordered do not appear at the top of the list simply because their fallback price is low.

## Simulated Upstream Provider

The assignment required an upstream dependency with variable latency and occasional failure.

Instead of introducing a real third-party service, the provider is simulated in-process.

The provider:

- Waits for a random amount of time
- Occasionally throws an error
- Returns a price
- Returns availability
- Returns a delivery estimate

This gives the application realistic asynchronous behaviour while keeping the project completely self-contained and easy to run locally.

## Handling Provider Failures

An individual provider failure does not cause the entire search to fail.

When the provider fails for an item, the backend returns the catalogue item with:

```text
available: false
deliveryEstimate: "Currently unavailable"
```

The item is then placed below available results.

This was chosen because partial results are more useful to the user than losing the entire search because one provider lookup failed.

## Frontend State Handling

The frontend handles four main states:

### Loading

Displayed while a search request is in progress.

### Success

Displayed when results are returned.

### Empty

Displayed when no items match the search and filters.

### Error

Displayed when the API request itself fails.

The error state includes a retry action so the user can attempt the request again without refreshing the page.

## Backend Structure

The backend is split into a few focused areas:

```text
server/src/
├── data/
│   ├── catalog.json
│   └── catalog.ts
├── routes/
│   └── search.ts
├── services/
│   ├── searchService.ts
│   └── upstreamProvider.ts
├── types/
│   └── catalog.ts
└── server.ts
```

### Routes

The route layer is responsible for HTTP concerns such as reading query parameters and returning responses.

### Services

The service layer contains the search and provider-related behaviour.

This avoids putting search logic directly inside the Express route.

### Data

The catalogue is kept in a local JSON file as required by the assignment.

## Testing

The backend uses Node's built-in test runner.

This allows the tests to cover:

- Searching by name
- Category filtering
- Empty results
- Popularity sorting
- Price sorting
- Unavailable result ordering

## Trade-offs

### No External State Management

Svelte's state handling is sufficient for the amount of application state involved.

Adding another state management library would increase complexity without solving an actual problem.

### No UI Framework

The UI uses standard Svelte components and CSS.

The application is small enough that a component library would not provide enough benefit to justify the additional dependency.

### In-process Provider

The provider is simulated in-process rather than as a separate service.

This keeps the application simple to run locally while still demonstrating asynchronous upstream behaviour.

### Backend-owned Catalogue

The frontend initially used local dummy data while the UI was being developed. Once the backend was introduced, the backend became the source of truth.

The frontend now receives catalogue and provider data through the API rather than maintaining its own copy of the catalogue.

## AI Assistance

AI assistance was used during development to help with:

- Exploring implementation approaches
- Explaining unfamiliar backend concepts
- Reviewing and debugging code
- Identifying implementation issues
- Suggesting simpler approaches where appropriate
- Writing and improving documentation

AI was used as a development aid rather than as a replacement for understanding the implementation.

The application was built incrementally, with the resulting code reviewed and tested throughout development.

## Future Improvements

Given more time, I would consider:

### URL-synchronised Search

Search text, category and sort state could be reflected in the URL so searches can be refreshed or shared.

Example:

```text
/search?q=burger&category=Burgers&sort=price-low
```

### Debounced Typeahead

Search could be triggered while typing with a small debounce to avoid sending a request for every keystroke.

### Request Cancellation

If typeahead search were introduced, previous requests could be cancelled when a newer search is submitted.

### Provider Caching

Provider responses could be cached for a short period to reduce repeated upstream calls.

### Additional API Tests

The current tests focus on service behaviour. Additional tests could cover the Express HTTP layer and validation responses directly.
