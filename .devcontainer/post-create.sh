#!/bin/bash

# Exit immediately on error, treat unset variables as an error, and fail if any command in a pipeline fails.
set -euo pipefail

# Function to run a command and show logs only on error
run_command() {
    local command_to_run="$*"
    local output
    local exit_code
    
    # Capture all output (stdout and stderr)
    output=$(eval "$command_to_run" 2>&1) || exit_code=$?
    exit_code=${exit_code:-0}
    
    if [ $exit_code -ne 0 ]; then
        echo -e "\033[0;31m[ERROR] Command failed (Exit Code $exit_code): $command_to_run\033[0m" >&2
        echo -e "\033[0;31m$output\033[0m" >&2
        
        exit $exit_code
    fi
}

echo "🚀 Setting up Pray V2 development environment..."

# Install specify CLI for Specification-Driven Development workflow
echo -e "\n📋 Installing specify CLI (spec-kit)..."
run_command "uv tool install specify-cli --from git+https://github.com/github/spec-kit.git"
echo "✅ Done"

echo -e "\n🧹 Cleaning cache..."
run_command "sudo apt-get autoclean"
run_command "sudo apt-get clean"

echo "✅ Setup completed. Happy coding! 🚀"
echo ""
echo "📖 To get started:"
echo "   • Run 'cd docs && python3 -m http.server 8000' to start the dev server"
echo "   • Run 'specify check' to verify your development environment"
echo "   • Open http://localhost:8000 to view the prayer guide"
echo ""
echo "📝 For Specification-Driven Development:"
echo "   • See specs/001-luther-prayer-guide/ for project specifications"
echo "   • Use /speckit.* commands in your AI agent for spec-driven workflows"
echo "   • Learn more: https://github.com/github/spec-kit"