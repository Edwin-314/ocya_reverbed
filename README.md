# Ocoya Remade

A local dashboard prototype informed by Ocoya’s public product pages and passive observation of its brand onboarding. This is an independent implementation, not a verified reproduction of paid screens.

Run `npm start`, then open http://localhost:3000. No dependencies are required. Run `npm run check` for JavaScript syntax validation.

For browser tests, run `npm install`, start the app, then run `npm test`. The smoke test uses Chrome at its standard Windows install location; set `CHROME_PATH` to override it. `PLAYWRIGHT_MODULE` can select an existing playwright-core installation. `npm run test:full` runs the separate Playwright suite and starts the server automatically. The verified smoke test covers drafts, editing, persistence, escaped content, scheduling validation, network filters, brand settings, campaign drafts, search, mobile overflow and malformed storage recovery. No page errors were observed. Dependency installation was unavailable during verification, so the smoke test used an existing local Playwright runtime.

Implemented: monthly calendar with navigation and network filters; create/edit/delete posts; draft and future scheduling validation; local image uploads; searchable content library; brand settings; template-based campaign drafts. Data persists in browser localStorage. The browser profile used for research is ignored by Git and never served by the local server.

Limitations: schedules are local records, not background publishing jobs. AI generation, OAuth social connections, analytics, inbox and workflow execution are not implemented. There is no backend or multi-user authentication. Clearing browser storage removes saved work.

Research: https://www.ocoya.com/ and https://www.ocoya.com/features/campaigns describe calendar publishing, draft review and campaign creation. The onboarding observed through REA has website, details, logos, color palette and keywords steps (Evidence ev_6c82a1c7112adafef326dde294d6f8f734d739e0c558fb41f01de0f8829f933a). Layout and implementation choices in this prototype are our own; paid dashboard interactions remain unverified.
