# Static 2026 World Cup Dashboard

## Summary

Create a fast, responsive, one-page static website for the men’s 2026 World Cup. Match data will be collected securely during scheduled builds, producing updated static HTML and JSON without exposing API keys. The site will emphasize deeper analytics alongside fixtures, standings, events, and all 48 teams.

## Page and Features

- Hero with tournament stage, latest update time, next-match countdown, and major tournament story.
- Upcoming and completed matches with date, team, group/stage, venue, score, and importance rating.
- Groups A–L tables with qualification status, goal difference, form, and concise advancement scenarios.
- Agenda/calendar view covering fixtures, rest days, knockout rounds, third-place match, and final.
- Searchable team grid with expandable profiles: form, key players, tactics, strengths, weaknesses, history, fixtures, and editorial analysis.
- “Games to Watch” section ranking important fixtures by qualification stakes, team strength, rivalry, and knockout consequences.

## Deeper Analytics Additions

- Power rankings with transparent scoring methodology and update date.
- Team comparison tool for form, scoring, defending, possession, and tournament progress.
- Attack-versus-defence matchup analysis for highlighted games.
- Momentum charts showing recent results and scoring trends.
- Qualification-pressure index indicating which teams most urgently need points.
- Knockout-path explorer showing likely opponents and route difficulty.
- Tournament leaders for goals, clean sheets, scoring efficiency, and defensive performance.
- Surprise-team and underperformer features based on performance versus pre-tournament expectations.
- Confidence labels distinguishing recorded facts, statistical projections, and editorial opinions.

## Static Architecture and Data

- Build with Astro, TypeScript, and Tailwind CSS; use small JavaScript islands only for filters, comparisons, countdowns, and expandable panels.
- Store normalized generated data as static JSON:
  - `Match`
  - `Standing`
  - `TeamProfile`
  - `CalendarEvent`
  - `TeamMetrics`
  - `MatchAnalysis`
- Fetch fixtures, results, standings, and statistics from API-Football during deployment. Validate schedule and format information against FIFA.
- Generate standings, rankings, momentum, pressure, matchup, and route-difficulty metrics deterministically during each build.
- Keep editorial profiles and tactical observations in version-controlled content files.
- Rebuild every 10 minutes during active match windows, hourly on tournament days, and daily on rest days.
- Preserve the previous successful dataset if the provider fails; display the data timestamp and a stale-data notice when necessary.
- Clearly describe the website as “regularly updated” rather than truly live.

## User Experience

- Sticky section navigation with smooth anchored movement.
- Filters for team, group, stage, date, venue, and match status.
- Visitor-local kickoff times with venue-time switching.
- Mobile-friendly tables, accessible chart summaries, keyboard-operated panels, and reduced-motion support.
- URL parameters for shareable team, group, match, and comparison views.
- Lazy-load flags, charts, and detailed team content to keep the initial page fast.
- Use a broadcast-inspired dark theme with vivid accents and restrained animation.

## Testing and Acceptance

- Validate generated fixtures and standings against the provider and official tournament rules.
- Unit-test tie-breakers, qualification scenarios, rankings, pressure scores, route calculations, and timezone conversion.
- Test scheduled builds with complete, missing, delayed, postponed, and failed provider data.
- Confirm filters, comparison selections, expandable profiles, countdowns, and shareable URLs work without a backend.
- Verify responsive layouts, keyboard navigation, screen-reader descriptions, contrast, and reduced motion.
- Target strong Core Web Vitals, minimal layout shift, and a usable experience when JavaScript is disabled.

## Assumptions

- Deployment supports scheduled static rebuilds and encrypted build-time secrets.
- Updates may appear up to approximately ten minutes after changes during matches.
- Analytics use transparent statistical formulas rather than opaque AI-generated predictions.
- The initial release is English-only and excludes accounts, comments, ticket sales, betting odds, and general host-city entertainment.
