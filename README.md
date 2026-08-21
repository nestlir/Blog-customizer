# Blog Customizer — Configurable Reading Experience

> Interactive article customization panel demonstrating state management, reusable UI components and CSS variables.

## Overview

A frontend interface that lets readers customize an article's visual presentation. Settings are edited in a side panel and applied only after confirmation, while reset restores the initial state.

## Key features

- collapsible settings sidebar;
- controlled form state separate from rendered page state;
- Apply / Reset workflow;
- CSS custom properties for typography, width, color and spacing;
- click-outside and keyboard-friendly interaction;
- reusable component library;
- Storybook-driven component development.

## Engineering decisions

The important product behavior is the separation between **draft settings** and **applied settings**. This prevents every form change from immediately mutating the reading experience and makes the interaction predictable.

## Quality tooling

```bash
npm run storybook
npm run lint
npm run stylelint
npm run format
```

## Stack

**React · TypeScript · CSS Custom Properties · Storybook · ESLint · Stylelint**

## Context

Originally created during frontend training; presented here as a focused case study in state modeling, component architecture and interactive UI behavior.
