#!/bin/bash

DIRECTORY="public/projects"
OUTPUT_FILE="src/data/projects.ts"
echo "export const projects = [" > $OUTPUT_FILE
for file in "$DIRECTORY"/*; do
  filename=$(basename "$file")
  echo "  '$filename'," >> $OUTPUT_FILE
done
echo "];" >> $OUTPUT_FILE
