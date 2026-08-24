# Registries

ID: `DOC-REG-0001`
Version: v0.2
Status: proposed

## Purpose

This domain owns structured source-of-truth records for the program.

## Scope

- registry inventory
- schema conventions
- validation rules
- migration from markdown-defined concepts to structured records
- ownership boundaries for hypotheses, journeys, runs, evidence, metrics, failures, interventions, treatments, findings, assumptions, risks, and decisions

## Initial Artifacts

- `REGISTRY_INDEX.md`
- `SCHEMA_CONVENTIONS.md`

## Source Of Truth

- Registry inventory: `REGISTRY_INDEX.md`
- Schema conventions: `SCHEMA_CONVENTIONS.md`

## Boundary

This domain owns record semantics and validation. `05-platform/` owns the execution systems that read, write, and analyze those records.
