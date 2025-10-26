# Tasks: Luther Prayer Guide

**Input**: Design documents from `/specs/001-luther-prayer-guide/`
**Prerequisites**: plan.md, spec.md, data-model.md

**Tests**: Tests are NOT included in this task list as the constitution specifies manual testing is sufficient for this low-risk static content feature.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Static site**: `docs/` directory served by GitHub Pages
- All files referenced with absolute paths from repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create docs/ directory for GitHub Pages serving
- [X] T002 [P] Create docs/content/ directory for prayer content modules
- [X] T003 [P] Create docs/assets/ directory for static assets (optional)
- [X] T004 Create README.md with project overview and setup instructions

**Checkpoint**: Project structure ready for content and code

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core HTML structure and JavaScript foundation that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create docs/index.html with basic HTML5 structure, semantic markup, and container elements for content display
- [X] T006 Create docs/styles.css with base styling (typography, colors, layout, minimal distraction-free design)
- [X] T007 Create docs/app.js with ES6 module structure, state management foundation, and navigation framework
- [X] T008 Implement state management in docs/app.js (AppState object, currentSection, currentIndex, currentView tracking)
- [X] T009 Implement navigation functions in docs/app.js (next(), previous(), show/hide content logic based on state)
- [X] T010 Implement localStorage persistence in docs/app.js (saveState(), loadState(), graceful fallback if unavailable)
- [X] T011 Implement content rendering engine in docs/app.js (renderContent() function that displays petition/commandment/creed based on current state)
- [X] T012 Add keyboard navigation support in docs/app.js (Enter for next, Escape for end session)
- [X] T013 Style navigation controls in docs/styles.css (Next button, End Session button, unobtrusive placement)
- [X] T014 Test local development setup (verify ES6 modules load correctly with local web server)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Guided Prayer Through Seven Petitions (Priority: P1) 🎯 MVP

**Goal**: Deliver complete prayer experience through 7 petitions from Lord's Prayer to "Amen"

**Independent Test**: Walk through all 7 petitions from start to "Amen", verify each displays petition text and meditation, user can pace themselves, session ends gracefully

### Content Creation for User Story 1

- [X] T015 [P] [US1] Research and extract First Petition content from Luther's "A Simple Way to Pray" (petition text + meditation)
- [X] T016 [P] [US1] Research and extract Second Petition content from Luther's "A Simple Way to Pray" (petition text + meditation)
- [X] T017 [P] [US1] Research and extract Third Petition content from Luther's "A Simple Way to Pray" (petition text + meditation)
- [X] T018 [P] [US1] Research and extract Fourth Petition content from Luther's "A Simple Way to Pray" (petition text + meditation)
- [X] T019 [P] [US1] Research and extract Fifth Petition content from Luther's "A Simple Way to Pray" (petition text + meditation)
- [X] T020 [P] [US1] Research and extract Sixth Petition content from Luther's "A Simple Way to Pray" (petition text + meditation)
- [X] T021 [P] [US1] Research and extract Seventh Petition content from Luther's "A Simple Way to Pray" (petition text + meditation)
- [X] T022 [P] [US1] Research and extract "Amen" explanation content from Luther's "A Simple Way to Pray"

### Implementation for User Story 1

- [X] T023 [US1] Create docs/content/petitions.js with petitions array (7 items, each with id, type, title, petitionText, meditation fields per data-model.md)
- [X] T024 [US1] Add all 7 petition objects to petitions array in docs/content/petitions.js (populate with researched content from T015-T021)
- [X] T025 [US1] Add amen object to docs/content/petitions.js (title: "Amen", content from T022)
- [X] T026 [US1] Import petitions content in docs/app.js (import { petitions, amen } from './content/petitions.js')
- [X] T027 [US1] Implement petition display logic in docs/app.js (show petitionText view, then meditation view for each petition)
- [X] T028 [US1] Implement petition navigation flow in docs/app.js (text → meditation → next petition, handle 7th petition → amen transition)
- [X] T029 [US1] Implement "Amen" screen display in docs/app.js (render amen.content, show End Session and Continue options)
- [X] T030 [US1] Style petition display in docs/styles.css (petition text prominent, meditation readable with good line-height and spacing)
- [X] T031 [US1] Style "Amen" screen in docs/styles.css (distinct visual treatment, clear action buttons)
- [X] T032 [US1] Add session end functionality in docs/app.js (reset state, return to start, clear localStorage option)

**Checkpoint**: User Story 1 complete - users can pray through 7 petitions to "Amen" and end session

---

## Phase 4: User Story 2 - Extended Prayer into Ten Commandments (Priority: P2)

**Goal**: Allow users to continue from "Amen" into Ten Commandments with four-stranded garland method

**Independent Test**: Complete 7 petitions, choose to continue, verify 10 commandments display with all 4 garland strands (instruction, thanksgiving, confession, prayer), can navigate through all and end

### Content Creation for User Story 2

- [X] T033 [P] [US2] Research and extract First Commandment with 4 garland strands from Luther's work
- [X] T034 [P] [US2] Research and extract Second Commandment with 4 garland strands from Luther's work
- [X] T035 [P] [US2] Research and extract Third Commandment with 4 garland strands from Luther's work
- [X] T036 [P] [US2] Research and extract Fourth Commandment with 4 garland strands from Luther's work
- [X] T037 [P] [US2] Research and extract Fifth Commandment with 4 garland strands from Luther's work
- [X] T038 [P] [US2] Research and extract Sixth Commandment with 4 garland strands from Luther's work
- [X] T039 [P] [US2] Research and extract Seventh Commandment with 4 garland strands from Luther's work
- [X] T040 [P] [US2] Research and extract Eighth Commandment with 4 garland strands from Luther's work
- [X] T041 [P] [US2] Research and extract Ninth Commandment with 4 garland strands from Luther's work
- [X] T042 [P] [US2] Research and extract Tenth Commandment with 4 garland strands from Luther's work

### Implementation for User Story 2

- [X] T043 [US2] Create docs/content/commandments.js with commandments array structure (10 items, each with id, type, title, commandmentText, garland object per data-model.md)
- [X] T044 [US2] Add all 10 commandment objects to commandments array in docs/content/commandments.js (populate with researched content, each garland has instruction, thanksgiving, confession, prayer)
- [X] T045 [US2] Import commandments content in docs/app.js (import { commandments } from './content/commandments.js')
- [X] T046 [US2] Implement "Continue to Commandments" button logic in docs/app.js (show on amen screen, transition to commandments[0])
- [X] T047 [US2] Implement garland display logic in docs/app.js (show commandmentText, then cycle through 4 garland strands: instruction → thanksgiving → confession → prayer)
- [X] T048 [US2] Implement commandment navigation flow in docs/app.js (5 views per commandment, advance to next commandment after prayer strand)
- [X] T049 [US2] Update state management for commandments in docs/app.js (handle currentView transitions for garland strands)
- [X] T050 [US2] Style commandment display in docs/styles.css (commandment text bold, garland strands with clear visual hierarchy)
- [X] T051 [US2] Style garland strand headers in docs/styles.css (Instruction, Thanksgiving, Confession, Prayer labels)
- [X] T052 [US2] Add commandment completion options in docs/app.js (after 10th commandment prayer: Continue to Creed or End Session)

**Checkpoint**: User Story 2 complete - users can continue from petitions into commandments with full garland method

---

## Phase 5: User Story 3 - Extended Prayer into Apostle's Creed (Priority: P3)

**Goal**: Allow users to continue from Commandments into Apostle's Creed with four-stranded garland method

**Independent Test**: Complete commandments, choose to continue, verify 3 creed articles display with all 4 garland strands, can navigate through all and end session

### Content Creation for User Story 3

- [X] T053 [P] [US3] Research and extract First Article of Creed (Creation) with 4 garland strands from Luther's work
- [X] T054 [P] [US3] Research and extract Second Article of Creed (Redemption) with 4 garland strands from Luther's work
- [X] T055 [P] [US3] Research and extract Third Article of Creed (Sanctification) with 4 garland strands from Luther's work

### Implementation for User Story 3

- [X] T056 [US3] Create docs/content/creed.js with creed array structure (3 items, each with id, type, title, creedText, garland object per data-model.md)
- [X] T057 [US3] Add all 3 creed article objects to creed array in docs/content/creed.js (populate with researched content, each garland has instruction, thanksgiving, confession, prayer)
- [X] T058 [US3] Import creed content in docs/app.js (import { creed } from './content/creed.js')
- [X] T059 [US3] Implement "Continue to Creed" button logic in docs/app.js (show after commandments, transition to creed[0])
- [X] T060 [US3] Implement creed display logic in docs/app.js (reuse garland display: creedText → instruction → thanksgiving → confession → prayer)
- [X] T061 [US3] Implement creed navigation flow in docs/app.js (5 views per article, advance to next article after prayer strand)
- [X] T062 [US3] Update state management for creed in docs/app.js (handle currentSection='creed', same garland view logic as commandments)
- [X] T063 [US3] Style creed display in docs/styles.css (creed text styling, consistent with commandments but distinct header)
- [X] T064 [US3] Add final session completion in docs/app.js (after 3rd creed article prayer: End Session with completion message)

**Checkpoint**: User Story 3 complete - full prayer sequence available (petitions → commandments → creed)

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final deployment

- [X] T065 [P] Add responsive design media queries in docs/styles.css (mobile < 768px, tablet 768-1024px, desktop > 1024px)
- [X] T066 [P] Add focus styles for keyboard navigation in docs/styles.css (clear focus indicators on interactive elements)
- [X] T067 [P] Add loading states in docs/app.js (show loading indicator while content loads, handle errors gracefully)
- [X] T068 [P] Optimize typography in docs/styles.css (font sizes, line heights, readability on all devices)
- [X] T069 [P] Add noscript message in docs/index.html (inform users that JavaScript is required)
- [ ] T070 [P] Create favicon in docs/assets/favicon.ico (optional, simple cross or prayer hands icon)
- [ ] T071 Validate HTML/CSS/JS (check browser console for errors, validate HTML5 syntax)
- [ ] T072 Test across browsers (Chrome, Firefox, Safari, Edge - verify ES6 module support and rendering)
- [ ] T073 Test on mobile devices (verify touch interactions, readability, responsive layout)
- [ ] T074 Test localStorage functionality (verify state persistence, resume mid-session, handle localStorage disabled)
- [ ] T075 Test long session scenario (verify multi-hour sessions work without performance issues)
- [ ] T076 Verify content accuracy (manual review of all petitions/commandments/creed against Luther's source)
- [ ] T077 Enable GitHub Pages in repository settings (Settings → Pages → Source: docs folder on 001-luther-prayer-guide branch)
- [ ] T078 Verify GitHub Pages deployment (visit deployed URL, test full prayer flow in production)
- [ ] T079 Update README.md with live URL and usage instructions
- [X] T080 Create quickstart guide or link to quickstart.md in README for developers

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase - No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational phase - Independent of US1 but logically follows it in prayer sequence
- **User Story 3 (Phase 5)**: Depends on Foundational phase - Independent of US1/US2 but logically follows them in prayer sequence
- **Polish (Phase 6)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
  - Delivers: Complete MVP prayer experience (7 petitions + amen)
  - Can ship this alone as v1.0

- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Technically independent of US1
  - Requires: US1 for Continue button from amen screen
  - Delivers: Extended prayer into Ten Commandments
  - Logical dependency: US1 should be complete first for prayer flow

- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Technically independent of US1/US2
  - Requires: US2 for Continue button from commandments end
  - Delivers: Extended prayer into Apostle's Creed
  - Logical dependency: US1 and US2 should be complete first for prayer flow

### Within Each User Story

- **Content tasks (T015-T022, T033-T042, T053-T055)**: All marked [P] - can run in parallel, different content items
- **Create content file**: Must wait for content research tasks to complete
- **Populate content file**: Depends on content file creation
- **Import and implement logic**: Depends on content file being populated
- **Styling**: Can happen in parallel with logic implementation ([P] where applicable)
- **Story complete**: All tasks in that story phase must be done

### Parallel Opportunities

- **Setup phase**: All tasks T001-T004 are independent (though T002-T003 depend on T001 for directory)
- **Foundational phase**: T006 (CSS) and T007-T014 (JS) can run in parallel after T005 (HTML)
- **User Story 1 content**: T015-T022 all [P] - can research all 7 petitions + amen simultaneously
- **User Story 2 content**: T033-T042 all [P] - can research all 10 commandments simultaneously
- **User Story 3 content**: T053-T055 all [P] - can research all 3 creed articles simultaneously
- **Polish phase**: Most tasks (T065-T070) marked [P] - can run in parallel
- **Different user stories**: After Foundational phase, US1, US2, US3 could theoretically be worked on by different developers in parallel (though logical flow suggests sequential)

---

## Parallel Example: User Story 1

```bash
# Launch all content research for User Story 1 together:
Task: "Research and extract First Petition content..." (T015)
Task: "Research and extract Second Petition content..." (T016)
Task: "Research and extract Third Petition content..." (T017)
Task: "Research and extract Fourth Petition content..." (T018)
Task: "Research and extract Fifth Petition content..." (T019)
Task: "Research and extract Sixth Petition content..." (T020)
Task: "Research and extract Seventh Petition content..." (T021)
Task: "Research and extract Amen explanation content..." (T022)

# After content research complete, create and populate content file:
Task: "Create docs/content/petitions.js..." (T023)
Task: "Add all 7 petition objects..." (T024)
Task: "Add amen object..." (T025)

# Then implement logic and styling (some can run in parallel):
Task: "Import petitions content..." (T026)
Task: "Implement petition display logic..." (T027) - can run with T030 [P]
Task: "Style petition display..." (T030) - can run with T027 [P]
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test US1 independently - full prayer flow through 7 petitions to "Amen"
5. Deploy to GitHub Pages - users can pray through Lord's Prayer with Luther's method
6. Optionally do partial Polish (T065-T074 for responsive and testing)

**This is a complete, shippable product at this point.**

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy (MVP! 15 screens)
3. Add User Story 2 → Test independently → Deploy (Extended: 65 screens total)
4. Add User Story 3 → Test independently → Deploy (Complete: 80 screens total)
5. Polish phase → Final refinements → Deploy

Each increment adds value without breaking previous functionality.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (7 petitions + amen)
   - Developer B: User Story 2 (10 commandments) - starts content research
   - Developer C: User Story 3 (3 creed articles) - starts content research
3. Sequential integration: Merge US1 → test → merge US2 → test → merge US3 → test
4. Team tackles Polish phase together

**Note**: Due to logical prayer flow (petitions → commandments → creed), sequential development is recommended even though technical dependencies are minimal.

---

## Notes

- [P] tasks = different files, no dependencies (can run in parallel)
- [Story] label maps task to specific user story for traceability
- Each user story delivers independently testable prayer experience
- Content research is most time-consuming aspect - parallelize across team
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Tests are NOT included per constitution (manual testing sufficient for low-risk static content)
- Total of 80 tasks for complete implementation
- MVP (User Story 1) requires 32 tasks (T001-T032)
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
