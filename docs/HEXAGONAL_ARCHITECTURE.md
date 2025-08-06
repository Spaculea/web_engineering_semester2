# Hexagonal Architecture Implementation

This document describes the hexagonal architecture implementation for the DHBW Klausuren Archive application.

## Directory Structure

```
/src
  /domain              # Business logic layer (no external dependencies)
    /entities          # Domain entities (Klausur, Loesung, User)
    /usecases          # Business use cases
  /ports               # Interfaces/contracts for external dependencies
  /adapters
    /api               # HTTP/Express adapters (REST API)
    /db                # Database adapters (PostgreSQL, Auth)
  Container.js         # Dependency injection container
  server.js            # Main application entry point
```

## Architecture Principles

1. **Domain Layer**: Contains pure business logic with no external dependencies
   - Entities: Core business objects
   - Use Cases: Business operations and rules

2. **Ports Layer**: Defines interfaces for external systems
   - Repository interfaces for data access
   - Service interfaces for external operations

3. **Adapters Layer**: Implements the port interfaces
   - API adapters: Express routes and HTTP handling
   - Database adapters: PostgreSQL implementations
   - Service adapters: Authentication, file handling

4. **Dependency Flow**: All dependencies point inward
   - Adapters depend on ports
   - Use cases depend on ports (not adapters)
   - Container wires everything together

## Migration Benefits

- **Separation of Concerns**: Business logic is isolated from infrastructure
- **Testability**: Domain logic can be tested without external dependencies
- **Flexibility**: Easy to swap implementations (e.g., different databases)
- **Maintainability**: Clear structure and responsibilities
- **SOLID Principles**: Especially Dependency Inversion Principle

## Usage

The refactored application maintains the same external API and functionality while providing a cleaner, more maintainable internal structure.