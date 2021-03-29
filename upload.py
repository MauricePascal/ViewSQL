import sys
import os
import time

version = sys.argv[1]
os.system("cmd /c git pull origin downloads")
time.sleep(1)
os.system("cmd /c git add .")
time.sleep(1)
os.system(f"cmd /c git commit -m \"Added {version}\"")
time.sleep(1)
os.system("cmd /c git push -u origin downloads")