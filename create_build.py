import os
import zipfile
import subprocess
import time
    
def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        if not root.startswith("./dist") and not root.startswith("./node_modules") and not root.startswith("./.git"):
            for file in files:
                if not file == "starter.c" or not "enc_keys.vsqlk":
                    ziph.write(os.path.join(root, file), 
                               os.path.relpath(os.path.join(root, file), 
                                               os.path.join("ViewSQL", '..')))
      
version = input("Enter Version name here: ")      
zipf = zipfile.ZipFile(f'../downloads/ViewSQL-{version}.zip', 'w', zipfile.ZIP_DEFLATED)
zipdir('./', zipf)
zipf.close()
time.sleep(5)
result = subprocess.check_output(f"py ../downloads/upload.py {version}".split(" "), shell=True)