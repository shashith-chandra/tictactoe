import json
import os
import re
import subprocess
import sys
# Load coding standards
with open("coding-standards.json") as f:
    standards = json.load(f)
# Get PR diff
diff = subprocess.getoutput("git diff origin/main...HEAD")
violations = []
for standard in standards:
    if re.search(standard["pattern"], diff):
        violations.append(standard)
if violations:
    high_severity = [v for v in violations if v["severity"] == "high"]
    # Print report
    print("Code Review Report:")
    for v in violations:
        print(f"- {v['severity'].upper()}: {v['rule']} → {v['message']}")
    # Save to file (optional for comment/report upload)
    with open("code_review_report.txt", "w") as f:
        for v in violations:
            f.write(f"{v['severity'].upper()}: {v['rule']} - {v['message']}\n")
    if high_severity:
        print("High severity issues found. Failing the check.")
        sys.exit(1)  # Fail Action
else:
    print(" No issues found. Safe to review.")