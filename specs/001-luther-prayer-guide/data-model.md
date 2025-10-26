# Data Model: Luther Prayer Guide

**Date**: 2025-10-26
**Feature**: Luther Prayer Guide (001)
**Phase**: 1 - Design

## Overview

This document defines the data structures for the Luther Prayer Guide application based on Martin Luther's "A Simple Way to Pray" (1535). Luther uses different methods for different texts:

- **Lord's Prayer (7 petitions)**: Each short petition is expanded into a fuller prayer meditation
- **Ten Commandments**: Uses the four-stranded garland method (instruction, thanksgiving, confession, prayer)
- **Apostle's Creed**: Uses the four-stranded garland method (instruction, thanksgiving, confession, prayer)

## Core Entities

### 1. Petition (Lord's Prayer)

Represents one of the seven petitions with Luther's expanded prayer meditation.

**Structure**:
```javascript
{
  id: Number,              // Unique identifier (1-7)
  type: 'petition',
  title: String,           // e.g., "The First Petition"
  petitionText: String,    // The short petition text (e.g., "Hallowed be thy name")
  meditation: String       // Luther's expanded prayer meditation on this petition
}
```

**Example** (based on the PDF):
```javascript
{
  id: 1,
  type: 'petition',
  title: 'The First Petition',
  petitionText: 'Hallowed be your name',
  meditation: `Yes, Lord God, dear Father, hallowed be your name, both in us and throughout the whole world. Destroy and root out the abominations, idolatry, and heresy of the Turk, the pope, and all false teachers and factious spirits who falsely bear your name and thus shamefully abuse it and horribly blaspheme it...

Dear Lord God, convert and restrain [them]. Convert those who are still to be converted that they with us and we with them may hallow and praise your name, both with true and pure doctrine and with a good and holy life. Restrain those who are unwilling to be converted so that they are forced to cease from misusing, defiling, and dishonoring your holy name and from misleading the poor people. Amen.`
}
```

### 2. Commandment (Ten Commandments)

Represents one commandment using Luther's four-stranded garland method.

**Structure**:
```javascript
{
  id: Number,              // Unique identifier (1-10)
  type: 'commandment',
  title: String,           // e.g., "The First Commandment"
  commandmentText: String, // The commandment text
  garland: {
    instruction: String,   // What does this teach or command? (Strand 1)
    thanksgiving: String,  // What reasons for gratitude? (Strand 2)
    confession: String,    // What sin or shortcoming revealed? (Strand 3)
    prayer: String         // What to pray based on this? (Strand 4)
  }
}
```

**Luther's Description** (from the PDF, page 11):
> "I divide each commandment into four parts, thereby fashioning a garland of four strands. That is, I think of each commandment as, first, **instruction**, which is really what it is intended to be, and consider what the Lord God demands of me so earnestly. Second, I turn it into a **thanksgiving**; third, a **confession**; and fourth, a **prayer**."

**Example**:
```javascript
{
  id: 1,
  type: 'commandment',
  title: 'The First Commandment',
  commandmentText: 'You shall have no other gods before me',
  garland: {
    instruction: 'We should fear, love, and trust God above all things. This commandment requires that we look to God alone for every good thing.',
    thanksgiving: 'I thank You, Lord God, that You desire to be my God, to care for me, protect me, and provide all that I need.',
    confession: 'I confess that I often place other things before You—money, comfort, success, the approval of others. I trust in my own abilities more than in Your provision.',
    prayer: 'Grant me grace to fear, love, and trust in You above all things. Help me recognize and forsake the idols in my life. I pray for those enslaved to false gods—draw them to You.'
  }
}
```

### 3. CreedArticle (Apostle's Creed)

Represents one article of the Creed using Luther's four-stranded garland method.

**Structure**:
```javascript
{
  id: Number,              // Unique identifier (1-3)
  type: 'creed',
  title: String,           // e.g., "The First Article: Creation"
  creedText: String,       // The creed article text
  garland: {
    instruction: String,   // What does this teach? (Strand 1)
    thanksgiving: String,  // What reasons for gratitude? (Strand 2)
    confession: String,    // What shortcoming revealed? (Strand 3)
    prayer: String         // What to pray based on this? (Strand 4)
  }
}
```

**Example**:
```javascript
{
  id: 1,
  type: 'creed',
  title: 'The First Article: Creation',
  creedText: 'I believe in God, the Father Almighty, Maker of heaven and earth',
  garland: {
    instruction: 'I believe that God has created me and all that exists. He has given me my body and soul, eyes, ears, and all my members, my reason and all my senses.',
    thanksgiving: 'I thank You, Father in heaven, for creating me and giving me life. I thank You for my body, my mind, and all the gifts You have bestowed upon me.',
    confession: 'I confess that I often take Your gifts for granted. I fail to recognize Your hand in all things. I worry as if You were not my loving Father.',
    prayer: 'Help me to trust in Your fatherly care. Teach me to see Your goodness in all creation. I pray for those who do not know You as Creator—open their eyes to Your work.'
  }
}
```

---

## AppState

Represents the current state of the prayer session.

**Structure**:
```javascript
{
  currentSection: String,     // 'petitions' | 'commandments' | 'creed' | 'amen'
  currentIndex: Number,       // Index within current section (0-based)
  currentView: String,        // For commandments/creed: 'text' | 'instruction' | 'thanksgiving' | 'confession' | 'prayer'
                              // For petitions: 'text' | 'meditation'
  startTime: Date,            // Session start timestamp (optional)
  preferences: {
    theme: String,            // 'light' | 'dark' (future)
    fontSize: String          // 'normal' | 'large' (future)
  }
}
```

**State Transitions**:

**For Petitions (P1)**:
```
[Start] → petitions[0].text (show short petition)
petitions[0].text → petitions[0].meditation (show Luther's expanded prayer)
petitions[0].meditation → petitions[1].text (next petition)
...
petitions[6].meditation → amen
amen → [End] or → commandments[0]
```

**For Commandments (P2)**:
```
commandments[0].text → commandments[0].instruction
commandments[0].instruction → commandments[0].thanksgiving
commandments[0].thanksgiving → commandments[0].confession
commandments[0].confession → commandments[0].prayer
commandments[0].prayer → commandments[1].text (next commandment)
...
commandments[9].prayer → [End] or → creed[0]
```

**For Creed (P3)**:
```
creed[0].text → creed[0].instruction
creed[0].instruction → creed[0].thanksgiving
creed[0].thanksgiving → creed[0].confession
creed[0].confession → creed[0].prayer
creed[0].prayer → creed[1].text (next article)
...
creed[2].prayer → [End]
```

---

## ContentCollection

Container for all prayer content, organized by type.

**Structure**:
```javascript
{
  petitions: Array<Petition>,         // 7 items (P1) - The Lord's Prayer
  commandments: Array<Commandment>,   // 10 items (P2) - The Ten Commandments with garland
  creed: Array<CreedArticle>,         // 3 items (P3) - Three articles of the Creed with garland
  amen: {                             // Special end section for petitions
    title: String,
    content: String
  }
}
```

**Screen Counts**:
- **P1 (MVP)**: 7 petitions × 2 screens (text + meditation) + amen = 15 screens
- **P2**: 10 commandments × 5 screens (text + 4 garland strands) = 50 screens
- **P3**: 3 creed articles × 5 screens (text + 4 garland strands) = 15 screens
- **Total**: 80 screens for complete experience

---

## Luther's Two Methods

### Method 1: Lord's Prayer (Expanded Meditation)

Luther takes each short petition and expands it into a fuller prayer. From the PDF (page 7):

> "Pray through the whole prayer, word for word, then repeat one part or as much as you wish, perhaps the first petition: 'Hallowed be your name,' and say: 'Yes, Lord God, dear Father, hallowed be your name, both in us and throughout the whole world...'"

**Pattern**: Short petition → Expanded prayer meditation

### Method 2: Ten Commandments & Creed (Four-Stranded Garland)

Luther divides each text into four parts. From the PDF (page 11):

> "I divide each commandment into four parts, thereby fashioning a garland of four strands. That is, I think of each commandment as, first, **instruction**, which is really what it is intended to be, and consider what the Lord God demands of me so earnestly. Second, I turn it into a **thanksgiving**; third, a **confession**; and fourth, a **prayer**."

**The Four Strands**:
1. **Instruction**: What does this teach or command?
2. **Thanksgiving**: What reasons for gratitude does this provide?
3. **Confession**: What sin or shortcoming does this reveal?
4. **Prayer**: What should I pray based on this?

---

## Data Flow

```
┌─────────────────┐
│  content/*.js   │ ← Content files (static data)
│  - petitions.js │   Petitions: text + meditation
│  - commands.js  │   Commandments: text + 4 garland strands
│  - creed.js     │   Creed: text + 4 garland strands
└────────┬────────┘
         │ import
         ↓
┌─────────────────┐
│     app.js      │ ← Application logic
│  - loadContent()│   Different navigation for petitions vs commandments/creed
│  - next()       │   Petitions: text → meditation → next
│  - saveState()  │   Garland: text → instruction → thanksgiving → confession → prayer → next
│  - loadState()  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  localStorage   │ ← Persistent state (optional)
│  - currentIndex │
│  - currentView  │
│  - currentType  │
└─────────────────┘
         │
         ↓
┌─────────────────┐
│   index.html    │ ← DOM rendering
│  - render()     │   Displays appropriate view based on content type
└─────────────────┘
```

---

## Storage Strategy

### In-Memory (JavaScript)

```javascript
// app.js
import { petitions, amen } from './content/petitions.js';
import { commandments } from './content/commandments.js';
import { creed } from './content/creed.js';

const content = {
  petitions,    // Array of 7 petitions with text + meditation
  commandments, // Array of 10 commandments with text + garland
  creed,        // Array of 3 articles with text + garland
  amen
};
```

### Persistent Storage (localStorage)

```javascript
// Save state
localStorage.setItem('pray-v2-state', JSON.stringify({
  currentSection: appState.currentSection,
  currentIndex: appState.currentIndex,
  currentView: appState.currentView
}));
```

---

## Content File Structure

### /docs/content/petitions.js

```javascript
export const petitions = [
  {
    id: 1,
    type: 'petition',
    title: 'The First Petition',
    petitionText: 'Hallowed be your name',
    meditation: 'Yes, Lord God, dear Father, hallowed be your name...'
  },
  // ... 6 more petitions (7 total)
];

export const amen = {
  title: 'Amen',
  content: 'Finally, mark this, that you must always speak the "Amen" firmly. Never doubt that God in his mercy will surely hear you and say "yes" to your prayers...'
};
```

### /docs/content/commandments.js

```javascript
export const commandments = [
  {
    id: 1,
    type: 'commandment',
    title: 'The First Commandment',
    commandmentText: 'You shall have no other gods before me',
    garland: {
      instruction: '...',
      thanksgiving: '...',
      confession: '...',
      prayer: '...'
    }
  },
  // ... 9 more commandments (10 total)
];
```

### /docs/content/creed.js

```javascript
export const creed = [
  {
    id: 1,
    type: 'creed',
    title: 'The First Article: Creation',
    creedText: 'I believe in God, the Father Almighty, Maker of heaven and earth',
    garland: {
      instruction: '...',
      thanksgiving: '...',
      confession: '...',
      prayer: '...'
    }
  },
  {
    id: 2,
    type: 'creed',
    title: 'The Second Article: Redemption',
    creedText: 'And in Jesus Christ, His only Son, our Lord...',
    garland: { /* ... */ }
  },
  {
    id: 3,
    type: 'creed',
    title: 'The Third Article: Sanctification',
    creedText: 'I believe in the Holy Spirit...',
    garland: { /* ... */ }
  }
];
```

---

## Content Validation

Manual validation checklist:
- [ ] **Petitions**: Each has petitionText + meditation
- [ ] **Commandments**: Each has commandmentText + all four garland strands
- [ ] **Creed**: Each has creedText + all four garland strands
- [ ] No duplicate IDs within type
- [ ] Text content properly escaped
- [ ] Content faithful to Luther's "A Simple Way to Pray"
- [ ] Modern English clear and accessible

---

## Technical Notes

- **Two navigation patterns**: Simple for petitions (2 views per item), garland for commandments/creed (5 views per item)
- **No database**: All content is static JavaScript arrays
- **No API**: No server-side requests, everything is client-side
- **Immutable content**: Content files are read-only after deployment
- **Mutable state**: Only application state changes during session

This approach faithfully implements Luther's actual method while maintaining simplicity (Constitution principle I).
