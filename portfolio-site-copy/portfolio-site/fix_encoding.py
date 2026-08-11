import os, glob
for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f: content = f.read()
    try:
        content = content.encode('windows-1252').decode('utf-8')
        with open(file, 'w', encoding='utf-8') as f: f.write(content)
        print(f'Fixed {file}')
    except Exception as e:
        print(f'Failed on {file}: {e}')
