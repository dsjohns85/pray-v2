# Content Schema

**Feature**: Luther Prayer Guide (001)
**Date**: 2025-10-26

## Overview

This document defines the content data structures (JavaScript object schemas) for the Luther Prayer Guide. Since this is a static application with no API, these schemas define the shape of data in content modules.

## Petition Schema

**File**: `docs/content/petitions.js`

```typescript
interface Petition {
  id: number;              // Unique ID (1-7)
  type: 'petition';        // Literal type
  title: string;           // Display title
  petitionText: string;    // Short petition from Lord's Prayer
  meditation: string;      // Luther's expanded prayer meditation
}

interface AmenSection {
  title: 'Amen';
  content: string;         // Explanation of "Amen"
}

// Export from petitions.js
export const petitions: Petition[];  // Array of 7
export const amen: AmenSection;
```

**Example**:
```javascript
{
  id: 1,
  type: 'petition',
  title: 'The First Petition',
  petitionText: 'Hallowed be your name',
  meditation: 'Yes, Lord God, dear Father...'
}
```

## Commandment Schema

**File**: `docs/content/commandments.js`

```typescript
interface Commandment {
  id: number;                 // Unique ID (1-10)
  type: 'commandment';        // Literal type
  title: string;              // Display title
  commandmentText: string;    // The commandment text
  garland: {
    instruction: string;      // What this teaches/commands
    thanksgiving: string;     // Reasons for gratitude
    confession: string;       // Sins/shortcomings revealed
    prayer: string;           // Prayer petition based on this
  };
}

// Export from commandments.js
export const commandments: Commandment[];  // Array of 10
```

**Example**:
```javascript
{
  id: 1,
  type: 'commandment',
  title: 'The First Commandment',
  commandmentText: 'You shall have no other gods before me',
  garland: {
    instruction: 'We should fear, love, and trust God...',
    thanksgiving: 'I thank You, Lord God...',
    confession: 'I confess that I often place other things...',
    prayer: 'Grant me grace to fear, love, and trust...'
  }
}
```

## Creed Schema

**File**: `docs/content/creed.js`

```typescript
interface CreedArticle {
  id: number;              // Unique ID (1-3)
  type: 'creed';           // Literal type
  title: string;           // Display title
  creedText: string;       // The creed article text
  garland: {
    instruction: string;   // What this teaches
    thanksgiving: string;  // Reasons for gratitude
    confession: string;    // Shortcomings revealed
    prayer: string;        // Prayer based on this
  };
}

// Export from creed.js
export const creed: CreedArticle[];  // Array of 3
```

**Example**:
```javascript
{
  id: 1,
  type: 'creed',
  title: 'The First Article: Creation',
  creedText: 'I believe in God, the Father Almighty, Maker of heaven and earth',
  garland: {
    instruction: 'I believe that God has created me...',
    thanksgiving: 'I thank You, Father in heaven...',
    confession: 'I confess that I often take Your gifts for granted...',
    prayer: 'Help me to trust in Your fatherly care...'
  }
}
```

## State Schema

**Storage**: `localStorage` key: `pray-v2-state`

```typescript
interface AppState {
  currentSection: 'petitions' | 'commandments' | 'creed' | 'amen';
  currentIndex: number;       // 0-based index within section
  currentView: 'text' | 'meditation' | 'instruction' | 'thanksgiving' | 'confession' | 'prayer';
  startTime?: string;         // ISO date string (optional)
  preferences?: {
    theme?: 'light' | 'dark';
    fontSize?: 'normal' | 'large';
  };
}
```

**Example**:
```javascript
{
  currentSection: 'petitions',
  currentIndex: 2,
  currentView: 'meditation',
  startTime: '2025-10-26T10:30:00.000Z'
}
```

## Validation Rules

### All Content Types
- `id`: Must be unique within its array
- `type`: Must match the literal string
- `title`: Non-empty string
- All text fields: Non-empty strings, properly escaped quotes/apostrophes

### Petitions
- Array length: Exactly 7
- `petitionText`: Short form from Lord's Prayer
- `meditation`: Luther's expanded prayer (can be multi-paragraph)

### Commandments
- Array length: Exactly 10
- `commandmentText`: Traditional commandment wording
- All 4 garland fields required and non-empty

### Creed
- Array length: Exactly 3 (three articles)
- `creedText`: Traditional creed article wording
- All 4 garland fields required and non-empty

### Amen
- Exactly one object (not in array)
- `title`: Must be "Amen"
- `content`: Multi-paragraph explanation allowed

## Notes

- No runtime validation (rely on manual testing)
- JavaScript syntax errors caught by browser console
- Content correctness verified through manual review
- No backend API - these are static data structures only
