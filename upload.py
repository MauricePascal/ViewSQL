from git import Repo
import sys

version = sys.argv[1]
try:
    repo = Repo("D:\\Development and Engineering\\JavaScript_TypeScript\\ViewSQL\\downloads\\.git")
    repo.git.add(update=True)
    repo.index.commit(f'Added {version}')
    repo.head.set_reference("downloads")
    origin = repo.remote(name='origin')
    origin.push()
except Exception:
    print('Some error occured while pushing the code')