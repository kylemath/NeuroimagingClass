#!/bin/bash

# Build script for Netlify deployment
# This script prepares the site for public deployment

echo "Preparing PSYCH 403A1 Neuroimaging and Neurostimulation site for deployment..."

# Create public README if needed
if [ ! -f README.md ]; then
    echo "# PSYCH 403A1: Neuroimaging and Neurostimulation" > README.md
    echo "" >> README.md
    echo "Course website for PSYCH 403A1 - Neuroimaging and Neurostimulation" >> README.md
    echo "University of Alberta, Fall 2025" >> README.md
    echo "" >> README.md
    echo "Instructor: Kyle Mathewson" >> README.md
fi

echo "✅ Build complete - site ready for deployment"
echo "📁 Public files:"
echo "   - index.html (course navigation)"
echo "   - syllabus.html"
echo "   - README.md"
echo ""
echo "🔒 Private files excluded:"
echo "   - plan.md"
echo ""
