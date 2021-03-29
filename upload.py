import sys
import os

version = sys.argv[1]
os.system("cmd /c git fetch")
os.system("cmd /c git pull")
os.system("cmd /c git add .")
os.system(f"cmd /c git commit -m \"Added {version}\"")
os.system("cmd /c git push -u origin downloads")