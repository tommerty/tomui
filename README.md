# TomUI

TomUI is a custom registry of components built on top of shadcn/ui. It is designed to be used with React projects, expanding the amazing components of shadcn/ui, while also adding a new flavor and features on top.

Getting started is easy. Just simply have a React project with shadcn/ui installed, and then you can install any of our components through shadcn/ui's CLI.

## Contributing

### Semantic Versioning

This project follows [Semantic Versioning](https://semver.org/) (SemVer) principles. The versioning is automatically handled through our CI/CD pipeline based on conventional commit messages.

#### Commit Message Format

For automatic versioning to work properly, please format your commit messages according to the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `fix: message` - for bug fixes (triggers a PATCH version bump `x.x.0 -> x.x.1`)
- `feat: message` - for new features (triggers a MINOR version bump `x.0.x -> x.1.x`)
- `feat!: message` or `fix!: message` - for breaking changes (triggers a MAJOR version bump `1.x.x -> 2.x.x`)
- `docs: message` - for documentation changes (no version bump)
- `style: message` - for formatting changes (no version bump)
- `refactor: message` - for code refactoring (no version bump)
- `perf: message` - for performance improvements (no version bump)
- `test: message` - for adding tests (no version bump)
- `chore: message` - for maintenance tasks (no version bump)
