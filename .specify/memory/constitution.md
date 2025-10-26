<!--
=============================================================================
CONSTITUTION SYNC IMPACT REPORT
=============================================================================
Version Change: [INITIAL] → 1.0.0

Change Type: INITIAL RATIFICATION
- First version of the constitution established

Modified Principles: N/A (new document)

Added Sections:
- Core Principles (3 principles: Simplicity, Flexibility, Clarity)
- Development Standards
- Quality Expectations
- Governance

Removed Sections: N/A

Templates Requiring Updates:
✅ plan-template.md - Constitution Check section aligns with new principles
✅ spec-template.md - User story and requirements structure supports principles
✅ tasks-template.md - Task organization supports flexible approach
✅ All command files reviewed - no agent-specific references found

Follow-up TODOs: None

Rationale for v1.0.0:
- Initial ratification of project constitution
- Establishes baseline governance for the Pray project
- MAJOR version (1.x.x) indicates this is the first stable governance framework
=============================================================================
-->

# Pray Constitution

## Core Principles

### I. Simplicity (YAGNI)

Start simple and evolve only when necessary. Every feature, abstraction, and architectural decision must be justified by current needs, not speculative future requirements.

**Rules**:
- MUST begin with the simplest solution that solves the immediate problem
- MUST NOT introduce patterns, frameworks, or abstractions without documented justification
- MUST favor clarity over cleverness in all implementations
- MUST remove unused code, dependencies, and abstractions during refactoring

**Rationale**: Premature optimization and over-engineering create maintenance burdens and cognitive overhead. Simple systems are easier to understand, test, modify, and debug. Complexity should only be added when the cost of simplicity exceeds the cost of complexity.

### II. Flexibility

Development practices should serve the project's needs, not constrain them. Testing strategies, architectural patterns, and tooling choices are means to quality ends, not ends in themselves.

**Rules**:
- MUST define quality standards for each feature (correctness, performance, maintainability)
- MAY choose testing strategies appropriate to the feature's risk and complexity
- SHOULD prefer pragmatic solutions that deliver value over dogmatic adherence to practices
- MUST document the reasoning when deviating from common patterns or practices

**Rationale**: Different features have different risk profiles and quality requirements. A flexible approach allows teams to optimize for delivery speed when appropriate and rigor when necessary, rather than applying uniform practices regardless of context.

### III. Clarity

Code, documentation, and decisions must be clear to future readers. Implicit knowledge, undocumented assumptions, and unclear reasoning create technical debt.

**Rules**:
- MUST write code that communicates intent clearly (naming, structure, comments)
- MUST document architectural decisions with context and rationale
- MUST provide clear acceptance criteria for features
- MUST maintain up-to-date documentation for public interfaces and key systems
- SHOULD prefer explicit over implicit behavior

**Rationale**: Software is read far more often than written. Clear code reduces onboarding time, decreases bug introduction, and enables confident refactoring. Documentation of decisions prevents repetition of past mistakes and preserves institutional knowledge.

## Development Standards

### Feature Development

- All features MUST have clear acceptance criteria before implementation begins
- User stories SHOULD be independently testable and deliverable
- Features SHOULD be broken into incremental deliverables when feasible
- Complex features MUST include a design document (plan.md) before implementation

### Code Quality

- Code MUST be reviewed before merging to main branches
- Breaking changes MUST be documented with migration guidance
- Public APIs MUST have clear contracts and versioning
- Error messages MUST be actionable and user-friendly

### Testing Strategy

Testing is required but the approach is flexible based on feature characteristics:

- **High-risk features** (security, data integrity, financial): Comprehensive test coverage including contract, integration, and edge case tests
- **Medium-risk features** (user-facing functionality): Integration tests for primary paths, contract tests for APIs
- **Low-risk features** (internal tools, prototypes): Test coverage appropriate to longevity and blast radius

Test selection should be documented in the feature plan or specification.

## Quality Expectations

### Maintainability

- Code MUST be structured to minimize coupling between modules
- Dependencies MUST be explicitly declared and version-pinned
- Configuration MUST be externalized from code
- Secrets MUST NEVER be committed to version control

### Observability

- Errors MUST be logged with sufficient context for debugging
- Critical operations SHOULD emit structured logs
- Performance bottlenecks SHOULD be identifiable through instrumentation when relevant

### Documentation

- README MUST explain project purpose, setup, and basic usage
- Feature specifications MUST capture user scenarios and requirements
- API contracts MUST be documented (via OpenAPI, code comments, or dedicated docs)
- Architectural decisions SHOULD be recorded in ADRs or plan documents

## Governance

### Authority

This constitution is the authoritative guide for development practices in the Pray project. All contributors must comply with the principles and rules defined herein.

### Amendments

Amendments to this constitution require:

1. **Proposal**: Document the proposed change with rationale and impact analysis
2. **Review**: Share with project stakeholders for feedback
3. **Approval**: Obtain approval from project maintainers/owners
4. **Migration**: Update all dependent templates and documentation
5. **Version**: Increment constitution version according to semantic versioning

### Versioning Policy

Constitution versions follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Backward-incompatible changes (principle removal, rule reversals)
- **MINOR**: Additive changes (new principles, expanded guidance)
- **PATCH**: Clarifications, wording improvements, non-semantic refinements

### Compliance

- All pull requests MUST verify compliance with applicable constitution principles
- Feature plans MUST include a "Constitution Check" section addressing relevant principles
- Deviations from principles MUST be justified and documented in complexity tracking
- Constitution violations without justification MAY be grounds for rejecting changes

### Review Cycle

The constitution SHOULD be reviewed annually or when project scale/needs significantly change to ensure principles remain relevant and appropriate.

**Version**: 1.0.0 | **Ratified**: 2025-10-26 | **Last Amended**: 2025-10-26
